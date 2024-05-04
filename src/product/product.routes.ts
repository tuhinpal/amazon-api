import { Hono } from "hono";
import * as productController from "@/product/product.controller";

const product = new Hono();

product.get("/:id", productController.get);

export default product;
