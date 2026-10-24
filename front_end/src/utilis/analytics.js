// src/utils/analytics.js

/**
 * Google Analytics 4 — Track an event.
 */
export const trackGAEvent = (eventName, parameters = {}) => {
  if (typeof window.gtag !== "function") return;

  window.gtag("event", eventName, parameters);
};

/**
 * Meta Pixel — Track a standard event.
 */
export const trackMetaEvent = (eventName, parameters = {}) => {
  if (typeof window.fbq !== "function") return;

  window.fbq("track", eventName, parameters);
};

/**
 * Track adding a product to the cart.
 */
export const trackAddToCart = ({
  productId,
  name,
  price,
  quantity,
  currency,
}) => {
  const numericPrice = Number(price);
  const numericQuantity = Number(quantity);

  if (
    !Number.isFinite(numericPrice) ||
    numericPrice <= 0 ||
    !Number.isFinite(numericQuantity) ||
    numericQuantity <= 0
  ) {
    return;
  }

  const value = numericPrice * numericQuantity;

  trackGAEvent("add_to_cart", {
    currency,
    value,
    items: [
      {
        item_id: String(productId),
        item_name: name,
        price: numericPrice,
        quantity: numericQuantity,
      },
    ],
  });

  trackMetaEvent("AddToCart", {
    content_ids: [String(productId)],
    content_type: "product",
    value,
    currency,
  });
};

/**
 * Track checkout initiation.
 */
export const trackBeginCheckout = ({
  productId,
  name,
  price,
  quantity,
  currency,
}) => {
  const numericPrice = Number(price);
  const numericQuantity = Number(quantity);

  if (
    !Number.isFinite(numericPrice) ||
    numericPrice <= 0 ||
    !Number.isFinite(numericQuantity) ||
    numericQuantity <= 0
  ) {
    return;
  }

  const value = numericPrice * numericQuantity;

  trackGAEvent("begin_checkout", {
    currency,
    value,
    items: [
      {
        item_id: String(productId),
        item_name: name,
        price: numericPrice,
        quantity: numericQuantity,
      },
    ],
  });

  trackMetaEvent("InitiateCheckout", {
    content_ids: [String(productId)],
    content_type: "product",
    value,
    currency,
    num_items: numericQuantity,
  });
};