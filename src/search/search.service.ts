import { amazonApi } from "@/common/amazon-api";
import logger from "@/common/logger";
import { buildApiUrl } from "@/common/utils/api-url";
import { getCurrencyFromSymbol } from "@/common/utils/currency";
import { createImageVariants } from "@/common/utils/image";
import { parseNumber } from "@/common/utils/number";
import { SearchItem, SearchResult } from "@/types/Search";
import { HTTPException } from "hono/http-exception";
import { parseHTML } from "linkedom";

export const search = async ({
  query,
  page = 1,
  amazonBase,
  amazonCountry,
}: {
  query: string;
  page?: number;
  amazonBase: string;
  amazonCountry: string;
}): Promise<SearchResult> => {
  const raw = await amazonApi<any[]>({
    method: "POST",
    path: `/s/query`,
    query: {
      k: query,
      page: page.toString(),
    },
    body: {},
    amazonBase,
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

  const parsedSearchResults = searchResultsObj.map((r: string) =>
    parseSearch({ raw: r, amazonBase, amazonCountry })
  );
  const nonEmptyResults = parsedSearchResults.filter((r) => r) as SearchItem[];

  metadata.thisPageResults = nonEmptyResults.length;

  const pagination = {
    nextPage: buildApiUrl({
      path: "/search",
      query: {
        query: metadata.query,
        page: (page + 1).toString(),
      },
      amazonCountry,
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
            amazonCountry,
          }),
  };

  return {
    metadata,
    pagination,
    results: nonEmptyResults,
  };
};

export const parseSearch = ({
  raw,
  amazonBase,
  amazonCountry,
}: {
  raw: string;
  amazonBase: string;
  amazonCountry: string;
}): SearchItem | null => {
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

    // Extracting the star rating
    const starRatingElement = document.querySelector("span.a-icon-alt");
    const starRating = starRatingElement
      ? parseFloat(starRatingElement.textContent?.split(" ")[0] || "0")
      : 0;

    // Extracting the total ratings
    const totalRatingsElement = document.querySelector("span.a-size-base");
    const totalRatings = totalRatingsElement
      ? parseNumber(totalRatingsElement.textContent || "0")
      : 0;

    return {
      id: productId,
      productUrl: `${amazonBase}/dp/${productId}`,
      apiUrl: buildApiUrl({
        path: `/product/${productId}`,
        amazonCountry,
      }),
      title,
      image: createImageVariants(imageUrl),
      currency: getCurrencyFromSymbol(currency) as string,
      price: parseNumber(price),
      originalPrice: parseNumber(originalPrice || price),
      starRating: starRating,
      totalRatings: parseInt(totalRatings.toString()),
    };
  } catch (error) {
    logger.error("Error parsing search result:", error);
    return null;
  }
};
