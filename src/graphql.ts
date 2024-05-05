import { Hono } from "hono";
import { graphqlServer } from "@hono/graphql-server";
import { buildSchema } from "graphql";

import { SearchSchema } from "@/types/Search";
import { CommonSchema } from "@/types/Common";
import { ProductSchema } from "@/types/Product";
import * as searchController from "@/search/search.controller";
import * as productController from "@/product/product.controller";

import playgroundHandler from "@/common/playground";

const graphql = new Hono();

const schema = buildSchema(/* GraphQL */ `
  type Query {
    search(query: String!, page: Int, country: String!): SearchResult
    product(id: String!, country: String!): Product
  }

  ${CommonSchema}

  ${SearchSchema}

  ${ProductSchema}
`);

graphql.use(
  "/",
  graphqlServer({
    schema: schema,
    rootResolver: () => {
      return {
        search: searchController.searchGqlResolver,
        product: productController.productGqlResolver,
      };
    },
  })
);
graphql.get("/playground", playgroundHandler);

export default graphql;
