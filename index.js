import search from "./src/search";
import header from "./src/header";
import product from "./src/product";

async function handleRequest(request) {
  /* Handle the incoming request */
  const headers = header(request.headers);
  const path = new URL(request.url).pathname; /* Get the pathname */

  if (request.method === "GET") {
    /* Respond for GET request method */
    if (path.startsWith("/search/")) {
      /* Search */
      return new Response(
        await search(path.replace("/search/", ""), request.headers.get("host")),
        {
          status: 200,
          headers,
        }
      );
    } else if (path.startsWith("/product/")) {
      /* Product Page */
      return new Response(await product(path.replace("/product/", "")), {
        status: 200,
        headers,
      });
    } else {
      return new Response(
        JSON.stringify(
          {
            /* Extra curricular activities */ alive: true,
            repository_name: "amazon-scraper",
            repository_description:
              "Serverless Amazon India Scraper with search and product API, made with Cloudflare worker",
            repository_url:
              "https://github.com/cachecleanerjeet/amazon-scraper",
            made_by: "https://github.com/cachecleanerjeet",
            api_endpoints:
              "https://github.com/cachecleanerjeet/amazon-scraper#api-endpoint",
          },
          null,
          2
        ),
        {
          status: 200,
          headers,
        }
      );
    }
  } else if (request.method === "OPTIONS") {
    /* Respond for OPTIONS request method */
    return new Response("🤝", {
      status: 200,
      headers,
    });
  } else {
    /* Respond for other request methods */
    return Response.redirect(
      "https://github.com/cachecleanerjeet/amazon-scraper",
      301
    );
  }
}

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});
