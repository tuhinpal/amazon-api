import { Context } from "hono";
import * as productService from "@/product/product.service";

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
