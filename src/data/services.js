import {
  Briefcase,
  Building2,
  Heart,
  Images,
  Rocket,
  Megaphone,
  Boxes,
} from "lucide-react";

// Services offered to customers (Karthik also builds websites for clients).
export const SERVICES = [
  {
    id: "career-portfolio",
    name: "Career Portfolio Website",
    icon: Briefcase,
    description: "A clean, modern personal site that helps you stand out to recruiters.",
    features: ["About + experience", "Projects gallery", "Resume download", "WhatsApp contact"],
  },
  {
    id: "business-website",
    name: "Business Website",
    icon: Building2,
    description: "A professional presence that builds trust and brings in enquiries.",
    features: ["Services", "Enquiry form", "Google Maps", "Lead button"],
  },
  {
    id: "wedding-memory",
    name: "Wedding Memory Website",
    icon: Heart,
    description: "A beautiful site to relive and share your big day with everyone you love.",
    features: ["Couple intro", "Photo & video gallery", "Event details", "Private share link"],
  },
  {
    id: "photo-memory",
    name: "Photo Memory Website",
    icon: Images,
    description: "Turn your favourite moments into a private, organised online gallery.",
    features: ["Albums", "Slideshows", "Captions", "Private sharing"],
  },
  {
    id: "landing-page",
    name: "Marketing Landing Page",
    icon: Rocket,
    description: "A single high-converting page built to capture leads from your ads.",
    features: ["Strong headline", "Offer block", "Lead form", "Fast loading"],
  },
  {
    id: "instagram-poster",
    name: "Instagram Promotion Poster",
    icon: Megaphone,
    description: "Eye-catching poster text and layout to promote any offer beautifully.",
    features: ["Story + post sizes", "Punchy copy", "Hashtags", "Clear CTA"],
  },
  {
    id: "3d-portfolio",
    name: "3D Interactive Portfolio Website",
    icon: Boxes,
    description: "A premium, cinematic 3D portfolio — exactly like the site you're viewing now.",
    features: ["Realistic 3D hero", "Smooth animations", "Glassmorphism UI", "Fully responsive"],
    featured: true,
  },
];
