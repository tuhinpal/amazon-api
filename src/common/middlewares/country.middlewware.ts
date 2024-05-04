import { COUNTRYWISE_AMAZON_API_BASE } from "@/config";
import { Context, Next } from "hono";
import { HTTPException } from "hono/http-exception";
import { createMiddleware } from "hono/factory";

export const countryMiddleware = createMiddleware(
  async (c: Context, next: Next) => {
    const country = c.req.param("country");

    const countryBase =
      COUNTRYWISE_AMAZON_API_BASE[
        country.toUpperCase() as keyof typeof COUNTRYWISE_AMAZON_API_BASE
      ];

    if (!countryBase) {
      throw new HTTPException(400, {
        message: "Invalid country code",
      });
    }

    console.log("Country middleware", c);

    c.req.country = {
      base: countryBase,
      code: country,
    };

    await next();
  }
);
