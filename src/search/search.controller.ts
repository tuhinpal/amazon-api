import { Context } from "hono";
import * as searchService from "@/search/search.service";
import { HTTPException } from "hono/http-exception";
import { parseCountry } from "@/common/utils/country";

export const search = async (c: Context) => {
  const query = c.req.query("query");
  if (!query) {
    throw new HTTPException(400, {
      message: "Query is required!",
    });
  }
  const page = parseInt(c.req.query("page") || "1");

  const data = await searchService.search({
    query: query,
    page: isNaN(page) ? 1 : page,
    amazonBase: c.req.country.base,
    amazonCountry: c.req.country.code,
  });

  return c.json({
    message: `Search results for ${query}`,
    amazonCountry: c.req.country,
    ...data,
  });
};

export const searchGqlResolver = (args: {
  query: string;
  page: number;
  country: string;
}) => {
  const p = parseCountry(args.country);

  return searchService.search({
    query: args.query,
    page: isNaN(args.page) ? 1 : args.page,
    amazonBase: p.base,
    amazonCountry: p.code,
  });
};
