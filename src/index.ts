import { Hono } from "hono";
import routes from "@/routes";
import { HTTPException } from "hono/http-exception";

const app = new Hono();
app.route("/api", routes);

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
