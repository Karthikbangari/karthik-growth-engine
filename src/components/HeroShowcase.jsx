import { motion } from "framer-motion";
import { Star, Smartphone, MessageCircle } from "lucide-react";
import Tilt from "./Tilt";

const tiles = ["from-gold-light to-gold", "from-olive-200 to-olive-400", "from-sand2 to-olive-200"];

// Interactive 3D "website preview" that tilts toward the cursor — gives the hero
// real depth without any heavy 3D engine.
export default function HeroShowcase() {
  return (
    <div className="relative mx-auto w-full max-w-md [perspective:1200px]">
      {/* soft stacked card behind — gives the centerpiece real depth in 2D */}
      <div className="pointer-events-none absolute inset-x-6 -bottom-4 top-6 -z-10 rotate-3 rounded-3xl bg-gradient-to-br from-gold-light/60 to-olive-100/50 blur-[2px]" />
      <Tilt max={9} glare className="rounded-2xl">
        <div className="glass overflow-hidden rounded-2xl shadow-float3d">
          {/* browser chrome */}
          <div className="flex items-center gap-2 border-b border-white/50 bg-white/40 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
            <div className="ml-2 flex-1 truncate rounded-full bg-white/70 px-3 py-1 text-center font-grotesk text-[10px] text-ink/45">
              yourname.studio
            </div>
          </div>

          {/* fake premium site preview */}
          <div className="space-y-3 p-4">
            <div className="relative h-28 overflow-hidden rounded-xl bg-gradient-to-br from-olive-300 via-olive-500 to-olive-700 p-4 text-sand">
              <p className="font-grotesk text-[9px] uppercase tracking-[0.2em] text-sand/80">Portfolio</p>
              <p className="mt-1 font-display text-lg font-bold leading-tight">Your Name</p>
              <p className="text-[10px] text-sand/85">Designer &amp; Creator</p>
              <span className="absolute right-3 top-3 h-9 w-9 rounded-full border-2 border-sand/70 bg-sand/20" />
            </div>

            <div className="grid grid-cols-3 gap-2">
              {tiles.map((g, i) => (
                <div key={i} className={`h-12 rounded-lg bg-gradient-to-br ${g}`} />
              ))}
            </div>

            <div className="space-y-1.5">
              <div className="h-2 w-3/4 rounded-full bg-ink/10" />
              <div className="h-2 w-1/2 rounded-full bg-ink/10" />
            </div>

            <div className="flex items-center justify-between rounded-lg bg-olive/10 px-3 py-2">
              <span className="font-grotesk text-[10px] font-semibold text-olive-700">Get in touch</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#25D366] px-2.5 py-1 font-grotesk text-[9px] font-bold text-white">
                <MessageCircle size={9} /> WhatsApp
              </span>
            </div>
          </div>
        </div>
      </Tilt>

      {/* floating depth chips */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="chip-gold absolute -left-3 top-8 shadow-card sm:-left-6"
      >
        <Star size={12} className="fill-gold text-gold" /> Loved by clients
      </motion.div>

      <motion.div
        animate={{ y: [0, 9, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        className="chip absolute -right-2 bottom-10 shadow-card sm:-right-5"
      >
        <Smartphone size={12} className="text-olive-600" /> Mobile-first
      </motion.div>

      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}
        className="chip absolute -bottom-3 left-10 shadow-card"
      >
        ⚡ Delivered in 3–5 days
      </motion.div>
    </div>
  );
}
