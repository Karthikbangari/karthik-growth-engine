import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { waLink } from "../lib/whatsapp";

export default function FloatingWhatsApp() {
  return (
    <motion.a
      href={waLink("Hi Karthik, I'd like a free quote for a website. Please share details and samples.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Get a free quote on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.8, type: "spring", stiffness: 260, damping: 18 }}
      className="group fixed bottom-5 right-5 z-50 inline-flex items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-6px_rgba(37,211,102,0.6)] transition hover:brightness-105"
    >
      <span className="relative grid h-14 w-14 place-items-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-30" />
        <MessageCircle size={26} />
      </span>
      <span className="max-w-0 overflow-hidden whitespace-nowrap font-grotesk text-sm font-bold transition-all duration-300 group-hover:max-w-[160px] group-hover:pr-5">
        Get a free quote
      </span>
    </motion.a>
  );
}
