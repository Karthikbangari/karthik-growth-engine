import {
  Briefcase,
  Heart,
  Images,
  Building2,
  Rocket,
  Megaphone,
} from "lucide-react";

// Each service has an `id` used across the tools (post generator, calculator, etc.)
export const SERVICES = [
  {
    id: "career-portfolio",
    name: "Career Portfolio Website",
    icon: Briefcase,
    short: "Stand out to recruiters with a clean, modern personal site.",
    points: ["About + experience", "Projects gallery", "Resume download", "WhatsApp contact"],
    from: "₹1,999",
  },
  {
    id: "wedding-memory",
    name: "Wedding Memory Website",
    icon: Heart,
    short: "A beautiful personal site to relive and share your big day.",
    points: ["Couple intro", "Photo & video gallery", "Event details", "Share link"],
    from: "₹7,999",
  },
  {
    id: "photo-memory",
    name: "Photo Memory Website",
    icon: Images,
    short: "Turn your favourite moments into a private online gallery.",
    points: ["Albums", "Slideshows", "Captions", "Private sharing"],
    from: "₹2,999",
  },
  {
    id: "business-website",
    name: "Business Website",
    icon: Building2,
    short: "A professional presence that builds trust and brings enquiries.",
    points: ["Services", "Enquiry form", "Google Maps", "WhatsApp lead button"],
    from: "₹5,999",
  },
  {
    id: "landing-page",
    name: "Marketing Landing Page",
    icon: Rocket,
    short: "A single high-converting page built to capture leads.",
    points: ["Strong headline", "Offer block", "Lead form", "Fast loading"],
    from: "₹2,999",
  },
  {
    id: "instagram-poster",
    name: "Instagram Promotion Poster",
    icon: Megaphone,
    short: "Eye-catching poster text and layout to promote any service.",
    points: ["Story + post size", "Offer copy", "Hashtags", "Call to action"],
    from: "₹499",
  },
];

export const SERVICE_OPTIONS = SERVICES.map((s) => ({ id: s.id, name: s.name }));

export function serviceById(id) {
  return SERVICES.find((s) => s.id === id);
}
