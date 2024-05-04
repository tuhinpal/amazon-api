import "hono";

declare module "hono" {
  interface HonoRequest {
    country: {
      code: string;
      base: string;
    };
  }
}
