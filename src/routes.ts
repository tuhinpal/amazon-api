import { Hono } from "hono";
import searchRoutes from "@/search/search.routes";
import productRoutes from "@/product/product.routes";

const routes = new Hono();

routes.route("/search", searchRoutes);
routes.route("/product", productRoutes);

export default routes;
