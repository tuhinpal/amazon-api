import { Image } from "./Common";

export interface SearchItem {
  id: string;
  url: string;
  title: string;
  image: Image;
  currency: string;
  price: number;
  originalPrice: number;
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
