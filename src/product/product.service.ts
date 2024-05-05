import { amazonApi } from "@/common/amazon-api";
import { parseHTML } from "linkedom";
import { HTTPException } from "hono/http-exception";
import { getCurrencyFromSymbol } from "@/common/utils/currency";
import { parseNumber } from "@/common/utils/number";
import { createImageVariants } from "@/common/utils/image";
import { parseTable } from "@/common/utils/table";
import { InsightAspect, Product, RatingReview } from "@/types/Product";
import parser from "any-date-parser";

export const get = async ({
  id,
  amazonBase,
}: {
  id: string;
  amazonBase: string;
}): Promise<Product> => {
  const raw = await amazonApi<string>({
    method: "GET",
    path: `/dp/${id}`,
    amazonBase,
  });

  const { document } = parseHTML(raw);
  const ppd = document.querySelector("#ppd");
  if (!ppd) {
    throw new HTTPException(500, {
      message: "Product parsing failed in ppd",
    });
  }

  // Extracting the title
  const titleElement = ppd.querySelector("#productTitle");
  const title = titleElement ? titleElement.textContent?.trim() : null;

  // Extracting the price
  const priceElement = ppd.querySelector("span.a-price span.a-price-whole");
  const price = priceElement ? priceElement.textContent?.trim() : null;

  // Extracting the currency
  const currencyElement = ppd.querySelector("span.a-price-symbol");
  const currency = currencyElement ? currencyElement.textContent?.trim() : null;

  // Extracting the original price
  const originalPriceElement = ppd.querySelector(
    "span.a-text-price span.a-offscreen"
  );
  const originalPrice = originalPriceElement
    ? originalPriceElement.textContent?.trim()
    : null;

  if (!title || !price || !currency) {
    throw new HTTPException(500, {
      message: "Product parsing failed in title, price or currency",
    });
  }

  // Extracting the features
  const featuresElement = ppd.querySelector("#feature-bullets ul");
  const features = featuresElement
    ? (Array.from(featuresElement.children)
        .map((child) => {
          try {
            const text = child.textContent?.trim();
            if (!text) return null;

            if (text.includes("】")) {
              const [key, value] = text.split("】");

              return {
                key: key.replace("【", "")?.trim(),
                value: value?.trim(),
              };
            } else if (text.includes(":")) {
              const [key, value] = text.split(":");
              return {
                key: key?.trim(),
                value: value?.trim(),
              };
            } else {
              return {
                key: "Description",
                value: text,
              };
            }
          } catch {}
        })
        .filter((s) => s) as { key: string; value: string }[])
    : [];

  // Extracting the images
  const imageElements = ppd.querySelectorAll(
    "#imageBlock #altImages li.item:not(.videoBlockIngress, .360IngressTemplate) img"
  ) as NodeListOf<HTMLImageElement>;
  const images = imageElements
    ? Array.from(imageElements)
        .map((image) => image.src)
        .filter((src) => src)
        .map(createImageVariants)
    : [];

  // Extracting technical specifications
  const technicalSpecificationsElement = document.querySelector(
    "table#productDetails_techSpec_section_1"
  ) as HTMLTableElement | null;
  const technicalSpecifications = (
    technicalSpecificationsElement
      ? parseTable(technicalSpecificationsElement)
      : []
  ).map(([key, value]) => ({ key, value })) as { key: string; value: string }[];

  // Extracting additional informations
  const additionalInformationsElement = document.querySelector(
    "table#productDetails_detailBullets_sections1"
  ) as HTMLTableElement | null;
  const additionalInformations = (
    additionalInformationsElement
      ? parseTable(additionalInformationsElement)
      : []
  ).map(([key, value]) => ({ key, value })) as { key: string; value: string }[];

  // Parse rating and review

  let ratingReview: RatingReview = {
    starRating: 0,
    totalRatings: 0,
    insights: {
      overallResponseFromCustomer: "",
      aspects: [],
    },
    reviews: [],
  };

  // Extracting the rating number and total reviews
  const reviewElement = document.querySelector("#reviewsMedley");
  if (reviewElement) {
    const totalReviewsText = reviewElement.querySelector(
      'span[data-hook="total-review-count"]'
    )?.textContent;
    if (totalReviewsText) {
      ratingReview.totalRatings = parseInt(
        totalReviewsText.replace(/[^\d]/g, ""),
        10
      );
    }

    const starRatingText = document.querySelector(
      'i[data-hook="average-star-rating"] .a-icon-alt'
    )?.textContent;
    if (starRatingText) {
      ratingReview.starRating = parseNumber(starRatingText.split(" ")[0]);
    }
  }

  // Extracting insights
  const insightsElement = document.querySelector("#cr-product-insights-cards");
  if (insightsElement) {
    const productSummaryElement = insightsElement.querySelector(
      "#product-summary p.a-spacing-small"
    );
    if (productSummaryElement) {
      ratingReview.insights.overallResponseFromCustomer =
        productSummaryElement.textContent?.trim() || "";
    }

    const aspectButtonsElement = insightsElement.querySelectorAll(
      "#aspect-button-group-0 button .a-size-base"
    );

    let aspectButtons = Array.from(aspectButtonsElement).map((button) => ({
      aspect: button.textContent?.trim(),
      totalResponses: 0,
      negativeResponses: 0,
      positiveResponses: 0,
      gist: "",
      responses: [],
    })) as InsightAspect[];

    const aspectDescriptionsElements = insightsElement.querySelectorAll(
      `[data-csa-c-slot-id="cr-product-insights-cards-popover"] div.a-box-inner`
    );
    aspectDescriptionsElements.forEach((element, index) => {
      try {
        const [numbersElement, gistElement, ...responseElements] = Array.from(
          element.children
        );

        const numbers = numbersElement.querySelectorAll("span");
        const totalResponses = parseNumber(numbers[0].textContent || "0");
        const positiveResponses = parseNumber(numbers[1].textContent || "0");
        const negativeResponses = parseNumber(numbers[2].textContent || "0");

        const gist = gistElement.textContent?.trim() || "";

        const responses = Array.from(responseElements)
          .map((response) => {
            // remove all a tags
            response.querySelectorAll("a").forEach((a) => a.remove());

            const t = response.textContent?.trim();
            if (!t) return null;

            return t;
          })
          .filter((response) => response) as string[];

        aspectButtons[index] = {
          ...aspectButtons[index],
          totalResponses,
          positiveResponses,
          negativeResponses,
          gist,
          responses,
        };
      } catch {}
    });

    ratingReview.insights.aspects = aspectButtons;
  }

  // Extracting reviews
  const reviewsElement = document.querySelectorAll(
    "#cm-cr-dp-review-list div[data-hook='review']"
  );
  reviewsElement.forEach((element) => {
    try {
      // Extracting the review title
      const titleElement = Array.from(
        element.querySelectorAll('a[data-hook="review-title"] span')
      ).pop();
      const title = titleElement ? titleElement.textContent?.trim() : null;

      // Extracting the review content
      const contentElement = element.querySelector(
        'span[data-hook="review-body"]'
      );
      const content = contentElement
        ? contentElement.textContent?.replace(/Read more/g, "")?.trim()
        : null;

      // Extracting the star rating
      const ratingElement = element.querySelector(
        'i[data-hook="review-star-rating"] .a-icon-alt'
      );
      const ratingText = ratingElement
        ? ratingElement.textContent?.trim()
        : null;

      const rating = ratingText ? parseFloat(ratingText.split(" ")[0]) : null;

      // Extracting the reviewer's name
      const reviewedByElement = element.querySelector(
        "div.a-profile-content span.a-profile-name"
      );
      const reviewedBy = reviewedByElement
        ? reviewedByElement.textContent?.trim()
        : null;

      // Extracting the review date
      const reviewDateElement = element.querySelector(
        'span[data-hook="review-date"]'
      );
      const reviewDate = reviewDateElement
        ? reviewDateElement.textContent?.trim()?.split("on")[1]
        : null;

      if (!title || !content || !reviewedBy || !reviewDate) return;

      const parsedDate = parser.attempt(reviewDate);
      if (!parsedDate) return;
      const objectDate = new Date(
        parsedDate.year,
        parsedDate.month,
        parsedDate.day
      );

      ratingReview.reviews.push({
        title,
        content,
        rating: rating || 0,
        reviewedBy: reviewedBy || "",
        reviewDate: objectDate.toISOString(),
      });
    } catch {}
  });

  return {
    id: id,
    productDetails: {
      id: id,
      productLink: `${amazonBase}/dp/${id}`,
      title,
      images,
      currency: getCurrencyFromSymbol(currency) as string,
      price: parseNumber(price),
      originalPrice: parseNumber(originalPrice || price),
    },
    ratingReview,
    otherDetails: {
      features,
      technicalSpecifications,
      additionalInformations,
    },
  };
};
