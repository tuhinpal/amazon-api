import { Context, Next } from "hono";
import { createMiddleware } from "hono/factory";
import { parseCountry } from "../utils/country";

export const countryMiddleware = createMiddleware(
  async (c: Context, next: Next) => {
    const country = c.req.param("country");
    const parsed = parseCountry(country);
    c.req.country = parsed;

    await next();
  }
);
