import { CONTACT } from "./constants";

// Build a wa.me link with an optional pre-filled message.
export function waLink(message = "") {
  const base = `https://wa.me/${CONTACT.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

// Service-specific pre-filled messages so you instantly know what the
// customer is asking for when they land in your WhatsApp.
export function serviceMessage(serviceName) {
  return `Hi Karthik, I'm interested in a ${serviceName}. Please send me details and samples.`;
}

export function priceMessage(serviceName, price) {
  return `Hi Karthik, I checked the price calculator. I want a ${serviceName}. My estimated price is ${price}. Please send me details.`;
}
