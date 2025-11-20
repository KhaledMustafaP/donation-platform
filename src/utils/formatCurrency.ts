import i18n from "../i18n";

export default function formatCurrency(
  amount: number,
  options?: { locale?: string; currency?: string; decimals?: number }
) {
  const locale = options?.locale || (i18n && i18n.language) || "en";

  // Prefer explicit currency, otherwise read from localStorage if available, fall back to USD
  let currency = options?.currency;
  try {
    if (!currency && typeof localStorage !== "undefined") {
      const stored = localStorage.getItem("currency");
      if (stored) currency = stored;
    }
  } catch (e) {
    // ignore
  }
  currency = currency || "USD";

  const decimals =
    options?.decimals ??
    (typeof window !== "undefined" && typeof localStorage !== "undefined"
      ? Number(localStorage.getItem("currency_decimals")) || 0
      : 0);

  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      maximumFractionDigits: decimals,
      minimumFractionDigits: decimals,
    }).format(amount);
  } catch (e) {
    return `${amount.toLocaleString()}`;
  }
}

