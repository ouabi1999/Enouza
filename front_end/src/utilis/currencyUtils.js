// Single source of truth — only currencies you actually support.
// `locale` here is only a fallback; UI language wins when passed.
// Single source of truth for currencies.
export const CURRENCY_CONFIG = {
  USD: { name: "US Dollar",          locale: "en-US", symbol: "$",   digits: 2 },
  EUR: { name: "Euro",               locale: "de-DE", symbol: "€",   digits: 2 },
  GBP: { name: "British Pound",      locale: "en-GB", symbol: "£",   digits: 2 },
  SAR: { name: "Saudi Riyal",        locale: "ar-SA", symbol: "﷼",   digits: 2 },
  AED: { name: "UAE Dirham",         locale: "ar-AE", symbol: "د.إ", digits: 2 },
  EGP: { name: "Egyptian Pound",     locale: "ar-EG", symbol: "ج.م", digits: 2 },
  MAD: { name: "Moroccan Dirham",    locale: "ar-MA", symbol: "د.م.",digits: 2 },
  DZD: { name: "Algerian Dinar",     locale: "ar-DZ", symbol: "د.ج", digits: 2 },
  TND: { name: "Tunisian Dinar",     locale: "ar-TN", symbol: "د.ت", digits: 3 },
  QAR: { name: "Qatari Riyal",       locale: "ar-QA", symbol: "ر.ق", digits: 2 },
  KWD: { name: "Kuwaiti Dinar",      locale: "ar-KW", symbol: "د.ك", digits: 3 },
  BHD: { name: "Bahraini Dinar",     locale: "ar-BH", symbol: ".د.ب",digits: 3 },
  OMR: { name: "Omani Rial",         locale: "ar-OM", symbol: "ر.ع.",digits: 3 },
  JOD: { name: "Jordanian Dinar",    locale: "ar-JO", symbol: "د.ا", digits: 3 },
  IQD: { name: "Iraqi Dinar",        locale: "ar-IQ", symbol: "ع.د", digits: 3 },
  LBP: { name: "Lebanese Pound",     locale: "ar-LB", symbol: "ل.ل", digits: 2 },
  SEK: { name: "Swedish Krona",      locale: "sv-SE", symbol: "kr",  digits: 2 },
  NOK: { name: "Norwegian Krone",    locale: "nb-NO", symbol: "kr",  digits: 2 },
  DKK: { name: "Danish Krone",       locale: "da-DK", symbol: "kr",  digits: 2 },
  CHF: { name: "Swiss Franc",        locale: "de-CH", symbol: "CHF", digits: 2 },
  CAD: { name: "Canadian Dollar",    locale: "en-CA", symbol: "$",   digits: 2 },
  AUD: { name: "Australian Dollar",  locale: "en-AU", symbol: "$",   digits: 2 },
  NZD: { name: "New Zealand Dollar", locale: "en-NZ", symbol: "$",   digits: 2 },
  JPY: { name: "Japanese Yen",       locale: "ja-JP", symbol: "¥",   digits: 0 },
  CNY: { name: "Chinese Yuan",       locale: "zh-CN", symbol: "¥",   digits: 2 },
  INR: { name: "Indian Rupee",       locale: "en-IN", symbol: "₹",   digits: 2 },
  KRW: { name: "South Korean Won",   locale: "ko-KR", symbol: "₩",   digits: 0 },
  TRY: { name: "Turkish Lira",       locale: "tr-TR", symbol: "₺",   digits: 2 },
  MXN: { name: "Mexican Peso",       locale: "es-MX", symbol: "$",   digits: 2 },
  BRL: { name: "Brazilian Real",     locale: "pt-BR", symbol: "R$",  digits: 2 },
  ARS: { name: "Argentine Peso",     locale: "es-AR", symbol: "$",   digits: 2 },
  CLP: { name: "Chilean Peso",       locale: "es-CL", symbol: "$",   digits: 0 },
  COP: { name: "Colombian Peso",     locale: "es-CO", symbol: "$",   digits: 0 },
  PEN: { name: "Peruvian Sol",       locale: "es-PE", symbol: "S/",  digits: 2 },
  PLN: { name: "Polish Zloty",       locale: "pl-PL", symbol: "zł",  digits: 2 },
  CZK: { name: "Czech Koruna",       locale: "cs-CZ", symbol: "Kč",  digits: 2 },
  HUF: { name: "Hungarian Forint",   locale: "hu-HU", symbol: "Ft",  digits: 0 },
  RON: { name: "Romanian Leu",       locale: "ro-RO", symbol: "lei", digits: 2 },
  ZAR: { name: "South African Rand", locale: "en-ZA", symbol: "R",   digits: 2 },
};

// Currency codes as an array (for iteration when object order matters)
export const CURRENCY_CODES = Object.keys(CURRENCY_CONFIG);

/**
 * Convert a USD base price to the target currency.
 * Returns { amount, currency } — never silently mislabels.
 */
export const convertPrice = (usdPrice, currency, rates) => {
  const price = Number(usdPrice);
  if (!Number.isFinite(price) || usdPrice === "" || usdPrice === null) {
    return { amount: 0, currency: "USD" };
  }

  if (currency === "USD") return { amount: price, currency: "USD" };

  const rate = rates?.[currency];
  if (!Number.isFinite(rate) || rate <= 0) {
    console.warn(`Missing/invalid rate for ${currency}; showing USD`);
    return { amount: price, currency: "USD" };
  }

  return { amount: price * rate, currency };
};

/**
 * Format a USD base price as a localized currency string.
 * @param usdPrice  amount in USD
 * @param currency  target currency code (must exist in CURRENCY_CONFIG)
 * @param rates     exchange rates keyed by currency code
 * @param uiLang    active UI language (e.g. "ar", "en", "fr") — drives number formatting
 */
export const formatPrice = (usdPrice, currency, rates, uiLang = "en") => {
  const { amount, currency: finalCurrency } = convertPrice(usdPrice, currency, rates);

  // If conversion failed, format as USD in the UI language.
  const config = CURRENCY_CONFIG[finalCurrency];
  const locale = uiLang || config?.locale || "en-US";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: finalCurrency,
    // ⚠️ Do NOT hard-code min/max digits — Intl respects ISO 4217:
    //    JPY → 0, KWD → 3, USD/EUR → 2
  }).format(amount);
};