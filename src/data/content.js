import { CONTACT } from "../lib/constants";

// ---------------------------------------------------------------------------
// Per-service marketing copy building blocks. The generator below assembles
// these into ready-to-post content for each platform.
// ---------------------------------------------------------------------------
const SERVICE_COPY = {
  "career-portfolio": {
    label: "Career Portfolio Website",
    noun: "career portfolio website",
    benefit: "stand out to recruiters and land more interviews",
    features: ["your bio & experience", "a projects gallery", "resume download", "one-tap WhatsApp contact"],
    hashtags: ["#portfolio", "#careerportfolio", "#resumewebsite", "#jobsearch", "#personalbranding", "#webdesign", "#gethired"],
    pin: "Modern Career Portfolio Website Ideas",
  },
  "wedding-memory": {
    label: "Wedding Memory Website",
    noun: "wedding memory website",
    benefit: "relive and share your big day with everyone you love",
    features: ["a couple intro", "photo & video galleries", "event details", "a private share link"],
    hashtags: ["#weddingwebsite", "#wedding", "#weddingmemories", "#indianwedding", "#savethedate", "#weddinginvites", "#couplegoals"],
    pin: "Beautiful Wedding Memory Website Inspiration",
  },
  "photo-memory": {
    label: "Photo Memory Website",
    noun: "photo memory website",
    benefit: "keep your favourite moments in one beautiful place",
    features: ["organised albums", "slideshows", "captions", "private sharing"],
    hashtags: ["#photogallery", "#memories", "#photoalbum", "#familyphotos", "#keepsake", "#webdesign"],
    pin: "Photo Memory Gallery Website Ideas",
  },
  "business-website": {
    label: "Business Website",
    noun: "business website",
    benefit: "build trust and turn visitors into enquiries",
    features: ["your services", "an enquiry form", "Google Maps", "a WhatsApp lead button"],
    hashtags: ["#businesswebsite", "#smallbusiness", "#webdesign", "#digitalmarketing", "#startup", "#entrepreneur", "#onlinepresence"],
    pin: "Professional Small Business Website Designs",
  },
  "landing-page": {
    label: "Marketing Landing Page",
    noun: "marketing landing page",
    benefit: "capture more leads from your ads and promotions",
    features: ["a strong headline", "an offer block", "a lead form", "lightning-fast loading"],
    hashtags: ["#landingpage", "#leadgeneration", "#digitalmarketing", "#marketing", "#conversion", "#webdesign"],
    pin: "High-Converting Landing Page Designs",
  },
  "instagram-poster": {
    label: "Instagram Promotion Poster",
    noun: "promotion poster",
    benefit: "grab attention and promote any offer beautifully",
    features: ["story & post sizes", "punchy offer copy", "matching hashtags", "a clear call to action"],
    hashtags: ["#instagrampost", "#poster", "#socialmediamarketing", "#promotion", "#graphicdesign", "#contentcreator"],
    pin: "Instagram Promotion Poster Templates",
  },
};

export const TONES = [
  { id: "professional", label: "Professional" },
  { id: "luxury", label: "Luxury" },
  { id: "friendly", label: "Friendly" },
  { id: "sales", label: "Sales-focused" },
  { id: "wedding", label: "Wedding emotional" },
  { id: "business", label: "Business formal" },
];

const TONE_STYLE = {
  professional: { hook: "Looking professional online matters.", emoji: "✨", close: "Message me to get started." },
  luxury: { hook: "Some things deserve a premium finish.", emoji: "🤍", close: "DM me to craft yours." },
  friendly: { hook: "Hey! Want something that truly feels like you?", emoji: "😊", close: "Drop me a message — let's chat!" },
  sales: { hook: "Limited slots this week — don't miss out.", emoji: "🔥", close: "Message NOW to book your spot." },
  wedding: { hook: "Your love story deserves to be remembered forever.", emoji: "💍", close: "Message me to begin your wedding website." },
  business: { hook: "A strong online presence builds real trust.", emoji: "📈", close: "Contact me to discuss your project." },
};

const list = (items) => items.slice(0, -1).join(", ") + " and " + items[items.length - 1];
const tags = (arr) => arr.join(" ");

// ---------------------------------------------------------------------------
// Template-based generator (works with no API key). Returns an array of
// { id, platform, text } blocks for the chosen service + tone.
// ---------------------------------------------------------------------------
export function generateContent(serviceId, toneId = "professional") {
  const s = SERVICE_COPY[serviceId];
  if (!s) return [];
  const t = TONE_STYLE[toneId] || TONE_STYLE.professional;
  const feat = list(s.features);

  return [
    {
      id: "instagram",
      platform: "Instagram Caption",
      text: `${t.emoji} ${t.hook}\n\nI design a beautiful ${s.noun} that helps you ${s.benefit}.\n\nEach one includes ${feat}.\n\n${t.close} 📲 WhatsApp ${CONTACT.whatsappDisplay}\n\n${tags(s.hashtags)}`,
    },
    {
      id: "facebook",
      platform: "Facebook Post",
      text: `${t.hook}\n\nI create a custom ${s.noun} designed to ${s.benefit}. It comes with ${feat} — fully mobile-friendly and ready to share.\n\nNo coding needed from your side. You share the details, I build it.\n\n${t.close}\n📱 WhatsApp: ${CONTACT.whatsappDisplay}\n📧 ${CONTACT.email}`,
    },
    {
      id: "linkedin",
      platform: "LinkedIn Post",
      text: `${t.emoji} ${t.hook}\n\nI help people and businesses ${s.benefit} with a professionally designed ${s.noun}.\n\nWhat's included:\n• ${s.features.join("\n• ")}\n\nClean, fast, mobile-first and made to convert.\n\n${t.close} Connect or message me directly.`,
    },
    {
      id: "whatsapp",
      platform: "WhatsApp Status",
      text: `${t.emoji} ${s.label} available!\nGet a ${s.noun} that helps you ${s.benefit}.\n${t.close} ${CONTACT.whatsappDisplay}`,
    },
    {
      id: "fiverr",
      platform: "Fiverr Gig",
      text: `TITLE: I will design a stunning ${s.noun} for you\n\nDESCRIPTION:\nDo you want to ${s.benefit}? I'll build you a clean, modern, mobile-friendly ${s.noun}.\n\nYou get ${feat}.\n\nWhy me:\n✅ Fast delivery\n✅ Premium, modern design\n✅ Unlimited communication\n✅ Revisions until you're happy\n\nMessage me before ordering so I can tailor it to your needs.\n\nTAGS: ${s.hashtags.map((h) => h.replace("#", "")).slice(0, 5).join(", ")}`,
    },
    {
      id: "pph",
      platform: "PeoplePerHour Proposal",
      text: `Hi there,\n\nI'd love to help you with your ${s.noun}. I specialise in designs that ${s.benefit}, and I can include ${feat}.\n\nMy process is simple: you share the details, I design, you review, I deliver — usually within a few days.\n\nHappy to share samples and answer any questions.\n\nBest regards,\nKarthik`,
    },
    {
      id: "google",
      platform: "Google Business Description",
      text: `I design beautiful, mobile-friendly websites — including ${s.label.toLowerCase()}s — that help people and businesses ${s.benefit}. Affordable packages, fast delivery, and friendly support over WhatsApp. ${CONTACT.whatsappDisplay}`,
    },
    {
      id: "pinterest",
      platform: "Pinterest Pin Title",
      text: s.pin,
    },
    {
      id: "ad",
      platform: "Short Ad Copy",
      text: `${s.label} from a price that fits you. ${t.hook} ${t.close} ${CONTACT.whatsappDisplay}`,
    },
    {
      id: "hashtags",
      platform: "Hashtags",
      text: tags(s.hashtags),
    },
  ];
}

// ---------------------------------------------------------------------------
// Async wrapper around the template generator (kept so the Post tool can show
// its brief "Generating…" state). Returns the same template blocks.
// ---------------------------------------------------------------------------
export async function generateAIContent(serviceId, toneId = "professional") {
  return new Promise((resolve) => {
    setTimeout(() => resolve(generateContent(serviceId, toneId)), 400);
  });
}

// ---------------------------------------------------------------------------
// Follow-up message generator templates.
// ---------------------------------------------------------------------------
export const FOLLOWUP_TYPES = [
  { id: "first", label: "First reply" },
  { id: "sample", label: "Sample sent" },
  { id: "price", label: "Price shared" },
  { id: "payment", label: "Payment reminder" },
  { id: "delivery", label: "Delivery update" },
  { id: "thanks", label: "Final thank you" },
];

export function generateFollowUp({ name = "there", service = "website", type = "first" }) {
  const n = name.trim() || "there";
  const map = {
    first: `Hi ${n}, thanks for reaching out! I'd love to help you with your ${service}. To get started, could you share a few details about what you have in mind? I'll send over some samples right away. 😊`,
    sample: `Hi ${n}, just checking if you had a chance to look at the ${service} samples I shared. I can create a clean, mobile-friendly design for you with a gallery and WhatsApp contact. Would you like me to start with a basic design?`,
    price: `Hi ${n}, sharing the pricing for your ${service} as discussed. The package includes design, mobile responsiveness and revisions. Shall I lock your slot for this week so we can begin?`,
    payment: `Hi ${n}, hope you're doing well! Whenever you're ready, a small advance lets me start your ${service} design. I'll share the first draft within a couple of days of starting. 🙂`,
    delivery: `Hi ${n}, quick update on your ${service} — the design is coming along nicely! I'll have the next version ready for your review shortly. Let me know if there's anything specific you'd like changed.`,
    thanks: `Hi ${n}, your ${service} is delivered — thank you so much for trusting me with it! 🙏 If you're happy with it, a quick referral or a kind word on Instagram would mean a lot. I'm here whenever you need updates.`,
  };
  return map[type] || map.first;
}
