export const buildApiUrl = ({
  path,
  query,
}: {
  path: string;
  query?: Record<string, string>;
}) => {
  return `/api${path}${query ? `?${new URLSearchParams(query)}` : ""}`;
};
