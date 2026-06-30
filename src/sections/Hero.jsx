import { motion } from "framer-motion";
import { MessageCircle, ArrowRight, Sparkles, Star } from "lucide-react";
import { waLink } from "../lib/whatsapp";
import HeroShowcase from "../components/HeroShowcase";
import Tilt from "../components/Tilt";

const fade = {
  hidden: {},
  show: { transition: { delayChildren: 0.1, staggerChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const STATS = [
  { k: "Delivered in", v: "3–5 days", d: "Fast turnaround, no fuss." },
  { k: "Pricing", v: "Tailored", d: "A custom quote, just for you." },
  { k: "Made for", v: "Mobile-first", d: "Looks great on every screen." },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* ambient two-tone glows */}
      <div className="pointer-events-none absolute -top-24 left-1/4 h-72 w-[30rem] -translate-x-1/2 rounded-full bg-olive/20 blur-3xl" />
      <div className="pointer-events-none absolute -top-10 right-0 h-64 w-[26rem] rounded-full bg-gold/15 blur-3xl" />

      <div className="mx-auto max-w-6xl px-4 pb-14 pt-20 sm:px-6 sm:pt-28 lg:pt-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: copy */}
          <motion.div
            variants={fade}
            initial="hidden"
            animate="show"
            className="text-center lg:text-left"
          >
            <motion.span variants={item} className="chip-gold mx-auto lg:mx-0">
              <Sparkles size={13} /> Premium portfolio &amp; business websites
            </motion.span>

            <motion.h1
              variants={item}
              className="mt-6 font-display text-4xl font-bold leading-[1.08] tracking-[-0.01em] text-ink sm:text-5xl md:text-[3.4rem]"
            >
              Get more customers with a{" "}
              <span className="relative whitespace-nowrap text-lux">
                beautiful
                <svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 200 10" preserveAspectRatio="none">
                  <path
                    d="M2 7 Q100 0 198 6"
                    stroke="#D8B76A"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    opacity="0.7"
                    strokeDasharray="220"
                    className="animate-draw-underline"
                  />
                </svg>
              </span>{" "}
              website
            </motion.h1>

            <motion.p variants={item} className="mx-auto mt-6 max-w-xl text-base text-ink/70 sm:text-lg lg:mx-0">
              I craft career portfolios, wedding memory sites, business websites and landing pages
              that look premium, load fast, and turn visitors into enquiries.
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:items-start">
              <a
                href={waLink("Hi Karthik, I'd like a free quote for a website. Please share details and samples.")}
                target="_blank"
                rel="noreferrer"
                className="btn-gold w-full sm:w-auto"
              >
                <MessageCircle size={18} /> Get a free quote
              </a>
              <a href="#portfolio" className="btn-ghost w-full sm:w-auto">
                See examples <ArrowRight size={16} />
              </a>
            </motion.div>

            {/* trust row */}
            <motion.div
              variants={item}
              className="mt-7 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-ink/60 lg:justify-start"
            >
              <span className="inline-flex items-center text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className="fill-gold" />
                ))}
              </span>
              <span className="font-medium text-ink/75">Loved by clients</span>
              <span className="text-ink/30">·</span>
              <span>Fast replies on WhatsApp</span>
              <span className="text-ink/30">·</span>
              <span>3–5 day delivery</span>
            </motion.div>
          </motion.div>

          {/* Right: warm 2D website showcase that tilts toward the cursor */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative grid w-full place-items-center py-6 sm:py-10"
          >
            <div className="pointer-events-none absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-gold/15 via-olive/10 to-blush/20 blur-3xl" />
            <HeroShowcase />
          </motion.div>
        </div>

        {/* trust stat strip */}
        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {STATS.map((c) => (
            <motion.div key={c.k} variants={item}>
              <Tilt max={8} className="h-full">
                <div className="glass glass-hover h-full p-5">
                  <p className="eyebrow">{c.k}</p>
                  <p className="mt-1 font-display text-2xl font-bold text-ink">{c.v}</p>
                  <p className="mt-1 text-sm text-ink/60">{c.d}</p>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
