import { COUNTRYWISE_AMAZON_API_BASE } from "@/config";
import { HTTPException } from "hono/http-exception";

export const parseCountry = (country: string) => {
  const countryBase =
    COUNTRYWISE_AMAZON_API_BASE[
      country.toUpperCase() as keyof typeof COUNTRYWISE_AMAZON_API_BASE
    ];

  if (!countryBase) {
    throw new HTTPException(400, {
      message: "Invalid country code",
    });
  }

  return {
    base: countryBase,
    code: country,
  };
};
