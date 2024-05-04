import { amazonApi } from "@/common/amazon-api";
import logger from "@/common/logger";
import { buildApiUrl } from "@/common/utils/api-url";
import { getCurrencyFromSymbol } from "@/common/utils/currency";
import { createImageVariants } from "@/common/utils/image";
import { parseNumber } from "@/common/utils/number";
import { AMAZON_BASE } from "@/config";
import { SearchItem, SearchResult } from "@/types/Search";
import { HTTPException } from "hono/http-exception";
import { parseHTML } from "linkedom";

export const search = async ({
  query,
  page = 1,
}: {
  query: string;
  page?: number;
}): Promise<SearchResult> => {
  const raw = await amazonApi<any[]>({
    method: "POST",
    path: `/s/query`,
    query: {
      k: query,
      page: page.toString(),
    },
    body: {},
  });

  const metadataObj = raw.find((r) => r[1] === "data-search-metadata");
  if (!metadataObj) {
    throw new HTTPException(500, {
      message: "Metadata not found",
    });
  }
  const metadataRaw = metadataObj[2].metadata;
  let metadata = {
    totalResults: metadataRaw.totalResultCount,
    thisPageResults: 0,
    page: metadataRaw.page,
    query: metadataRaw.keywords,
  };

  const searchResultsObj = raw
    .filter((r) => r[1]?.startsWith("data-main-slot:search-result"))
    .map((r: any) => r[2].html);

  const parsedSearchResults = searchResultsObj.map(parseSearch);
  const nonEmptyResults = parsedSearchResults.filter((r) => r) as SearchItem[];

  metadata.thisPageResults = nonEmptyResults.length;

  const pagination = {
    nextPage: buildApiUrl({
      path: "/search",
      query: {
        query: metadata.query,
        page: (page + 1).toString(),
      },
    }),
    prevPage:
      page === 1
        ? null
        : buildApiUrl({
            path: "/search",
            query: {
              query: metadata.query,
              page: (page - 1).toString(),
            },
          }),
  };

  return {
    metadata,
    pagination,
    results: nonEmptyResults,
  };
};

export const parseSearch = (raw: string): SearchItem | null => {
  try {
    const { document } = parseHTML(`<html><body>${raw}</body></html>`);

    // Extracting the title
    const titleElement = document.querySelector("h2 a");
    const title = titleElement ? titleElement.textContent?.trim() : null;

    // Extracting the price
    const priceElement = document.querySelector(
      "span.a-price span.a-price-whole"
    );
    const price = priceElement ? priceElement.textContent?.trim() : null;

    // Extracting the currency
    const currencyElement = document.querySelector("span.a-price-symbol");
    const currency = currencyElement
      ? currencyElement.textContent?.trim()
      : null;

    // Extracting the original price
    const originalPriceElement = document.querySelector(
      "span.a-text-price span.a-offscreen"
    );
    const originalPrice = originalPriceElement
      ? originalPriceElement.textContent?.trim()
      : null;

    // Extracting the product ID (ASIN)
    const productElement = document.querySelector("[data-asin]");
    const productId = productElement
      ? productElement.getAttribute("data-asin")
      : null;

    // Extracting the product Image
    const imageElement = document.querySelector(
      "img.s-image"
    ) as HTMLImageElement | null;
    const imageUrl = imageElement ? imageElement.src : null;

    if (!productId || !title || !price || !currency) {
      throw new Error("Missing required fields");
    }

    return {
      id: productId,
      productUrl: `${AMAZON_BASE}/dp/${productId}`,
      apiUrl: buildApiUrl({
        path: `/product/${productId}`,
      }),
      title,
      image: createImageVariants(imageUrl),
      currency: getCurrencyFromSymbol(currency) as string,
      price: parseNumber(price),
      originalPrice: parseNumber(originalPrice || price),
    };
  } catch (error) {
    logger.error("Error parsing search result:", error);
    return null;
  }
};
