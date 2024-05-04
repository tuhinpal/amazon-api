export const buildApiUrl = ({
  path,
  query,
  amazonCountry,
}: {
  path: string;
  query?: Record<string, string>;
  amazonCountry: string;
}) => {
  return `/api/${amazonCountry}${path}${
    query ? `?${new URLSearchParams(query)}` : ""
  }`;
};
