export const parseNumber = (input: string | null | undefined): number => {
  if (!input) return -1;
  const parsed = parseFloat(input.replace(/[^0-9.]/g, ""));
  return isNaN(parsed) ? -1 : parsed;
};
