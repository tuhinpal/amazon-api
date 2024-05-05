import { Image } from "./Common";

export interface SearchItem {
  id: string;
  productUrl: string;
  title: string;
  image: Image;
  currency: string;
  price: number;
  originalPrice: number;
  starRating: number;
  totalRatings: number;
  apiUrl: string;
}

export interface SearchResult {
  metadata: {
    totalResults: number;
    thisPageResults: number;
    page: number;
    query: string;
  };
  pagination: {
    nextPage: string | null;
    prevPage: string | null;
  };
  results: SearchItem[];
}

export const SearchSchema = /* GraphQL */ `
  type SearchItem {
    id: ID
    productUrl: String
    title: String
    image: Image
    currency: String
    price: Float
    originalPrice: Float
    starRating: Float
    totalRatings: Int
    apiUrl: String
  }

  type Metadata {
    totalResults: Int
    thisPageResults: Int
    page: Int
    query: String
  }

  type Pagination {
    nextPage: String
    prevPage: String
  }

  type SearchResult {
    metadata: Metadata
    pagination: Pagination
    results: [SearchItem]
  }
`;
