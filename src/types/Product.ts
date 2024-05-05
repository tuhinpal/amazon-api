import { Image } from "./Common";

export interface InsightAspect {
  aspect: string;
  totalResponses: number;
  positiveResponses: number;
  negativeResponses: number;
  gist: string;
  responses: string[];
}

export interface Insight {
  overallResponseFromCustomer: string;
  aspects: InsightAspect[];
}

export interface Review {
  title: string;
  content: string;
  rating: number;
  reviewedBy: string;
  reviewDate: string;
}

export interface RatingReview {
  starRating: number;
  totalRatings: number;
  insights: Insight;
  reviews: Review[];
}

export interface ProductDetais {
  id: string;
  productLink: string;
  title: string;
  price: number;
  currency: string;
  originalPrice: number;
  images: Image[];
}

export interface OtherDetails {
  features: { key: string; value: string }[];
  technicalSpecifications: { key: string; value: string }[];
  additionalInformations: { key: string; value: string }[];
}

export interface Product {
  id: string;
  productDetails: ProductDetais;
  ratingReview: RatingReview;
  otherDetails: OtherDetails;
}

export const ProductSchema = /* GraphQL */ `
  type InsightAspect {
    aspect: String
    totalResponses: Int
    positiveResponses: Int
    negativeResponses: Int
    gist: String
    responses: [String]
  }

  type Insight {
    overallResponseFromCustomer: String
    aspects: [InsightAspect]
  }

  type Review {
    title: String
    content: String
    rating: Float
    reviewedBy: String
    reviewDate: String
  }

  type RatingReview {
    starRating: Float
    totalRatings: Int
    insights: Insight
    reviews: [Review]
  }

  type KeyValue {
    key: String
    value: String
  }

  type ProductDetais {
    id: ID
    productLink: String
    title: String
    price: Float
    currency: String
    originalPrice: Float
    images: [Image]
  }

  type OtherDetails {
    features: [KeyValue]
    technicalSpecifications: [KeyValue]
    additionalInformations: [KeyValue]
  }

  type Product {
    id: ID
    productDetails: ProductDetais
    ratingReview: RatingReview
    otherDetails: OtherDetails
  }
`;
