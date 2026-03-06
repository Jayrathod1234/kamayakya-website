/**
 * Google Analytics 4 (gtag) helpers.
 * Requires gtag to be loaded (e.g. in _app.tsx). Purchase events show in
 * GA4 Reports > Monetization > Ecommerce purchases.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export type GAPurchaseItem = {
  item_id: string;
  item_name: string;
  price: number;
  quantity: number;
  item_category?: string;
};

export type GAPurchaseParams = {
  transaction_id: string;
  value: number;
  currency?: string;
  tax?: number;
  coupon?: string;
  items: GAPurchaseItem[];
};

export function trackPurchase(params: GAPurchaseParams): void {
  if (typeof window === "undefined" || !window.gtag) return;
  const { transaction_id, value, currency = "INR", tax, coupon, items } = params;
  window.gtag("event", "purchase", {
    transaction_id,
    value,
    currency,
    ...(tax != null && { tax }),
    ...(coupon && { coupon }),
    items,
  });
}
