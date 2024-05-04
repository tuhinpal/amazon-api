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
