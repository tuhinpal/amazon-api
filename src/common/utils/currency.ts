export const currencySymbols: Record<string, string> = {
  "€": "EUR",
  $: "USD",
  "£": "GBP",
  "¥": "JPY",
  "₽": "RUB",
  "₹": "INR",
  Rp: "IDR",
  "₪": "ILS",
  "₩": "KRW",
  RM: "MYR",
  "₱": "PHP",
  "฿": "THB",
  R: "ZAR",
  R$: "BRL",
  zł: "PLN",
  kr: "SEK",
  CHF: "CHF",
};

export const getCurrencyFromSymbol = (symbol: string | null | undefined) => {
  if (!symbol) return null;
  return currencySymbols[symbol] || symbol;
};
