export interface Image {
  original: string | null;
  small: string | null;
  medium: string | null;
  large: string | null;
}

export const CommonSchema = /* GraphQL */ `
  type Image {
    original: String
    small: String
    medium: String
    large: String
  }
`;
