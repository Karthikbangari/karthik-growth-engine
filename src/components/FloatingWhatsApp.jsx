import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { waLink } from "../lib/whatsapp";

export default function FloatingWhatsApp() {
  return (
    <motion.a
      href={waLink("Hi Karthik, I'm interested in getting a website. Please share details.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.8, type: "spring", stiffness: 260, damping: 18 }}
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-6px_rgba(37,211,102,0.6)] hover:brightness-105"
    >
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-30" />
      <MessageCircle size={26} />
    </motion.a>
  );
}
