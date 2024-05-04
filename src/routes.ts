import { Hono } from "hono";
import searchRoutes from "@/search/search.routes";
import productRoutes from "@/product/product.routes";
import { countryMiddleware } from "./common/middlewares/country.middlewware";

const routes = new Hono();

routes.use(countryMiddleware);

routes.route("/search", searchRoutes);
routes.route("/product", productRoutes);

export default routes;
