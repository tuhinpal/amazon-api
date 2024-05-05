import { Hono } from "hono";
import routes from "@/routes";
import graphql from "@/graphql";
import { HTTPException } from "hono/http-exception";

const app = new Hono();

app.route("/api/:country", routes);
app.route("/graphql", graphql);

app.onError((err, c) => {
  return c.json(
    {
      message: err.message,
    },
    {
      status: err instanceof HTTPException ? err.status : 500,
    }
  );
});

export default app;
