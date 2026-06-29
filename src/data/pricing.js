// Three headline packages shown on the pricing section.
export const PACKAGES = [
  {
    id: "basic",
    name: "Basic",
    blurb: "Perfect for a simple, clean portfolio.",
    features: [
      "1–3 page website",
      "Mobile responsive",
      "WhatsApp contact button",
      "Basic photo gallery",
      "Delivery in 4–5 days",
    ],
    highlight: false,
  },
  {
    id: "premium",
    name: "Premium",
    blurb: "More pages, gallery and smooth animations.",
    features: [
      "Up to 6 pages",
      "Photo + video gallery",
      "Smooth animations",
      "Contact / enquiry form",
      "Priority delivery in 3 days",
    ],
    highlight: true,
  },
  {
    id: "royal",
    name: "Royal",
    blurb: "The full luxury treatment for weddings & business.",
    features: [
      "Unlimited sections",
      "Premium custom design",
      "Video + animations",
      "Lead form + analytics ready",
      "Express delivery + revisions",
    ],
    highlight: false,
  },
];

// ---------------------------------------------------------------------------
// Price Calculator configuration. Edit numbers here to retune pricing.
// All amounts are in INR.
// ---------------------------------------------------------------------------
export const CALC = {
  base: {
    "career-portfolio": 1999,
    "wedding-memory": 7999,
    "photo-memory": 2999,
    "business-website": 5999,
    "landing-page": 2999,
    "instagram-poster": 499,
  },
  perExtraPage: 600, // beyond the first page
  addOns: {
    gallery: 800,
    video: 1200,
    animation: 1000,
    premiumDesign: 1500,
  },
  urgentMultiplier: 1.25, // +25% for urgent delivery
};
