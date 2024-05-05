import { Context } from "hono";
import * as productService from "@/product/product.service";
import { parseCountry } from "@/common/utils/country";

export const get = async (c: Context) => {
  const id = c.req.param("id");
  const product = await productService.get({
    id,
    amazonBase: c.req.country.base,
  });

  return c.json({
    message: "Product retrieved successfully",
    amazonCountry: c.req.country,
    ...product,
  });
};

export const productGqlResolver = (args: { id: string; country: string }) => {
  const p = parseCountry(args.country);

  return productService.get({
    id: args.id,
    amazonBase: p.base,
  });
};
