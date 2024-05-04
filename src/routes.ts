import { Hono } from "hono";
import search from "@/search/search.routes";

const routes = new Hono();

routes.route("/search", search);

export default routes;
