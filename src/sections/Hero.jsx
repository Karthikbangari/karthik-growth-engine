import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MessageCircle, ArrowRight, Sparkles } from "lucide-react";
import { waLink } from "../lib/whatsapp";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* soft ambient glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-olive/20 blur-3xl" />

      <div className="mx-auto max-w-6xl px-4 pb-10 pt-16 sm:px-6 sm:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="chip mx-auto">
            <Sparkles size={13} /> Portfolio • Wedding • Business • Marketing
          </span>

          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.08] tracking-[-0.01em] text-ink sm:text-5xl md:text-6xl">
            Get more customers with a{" "}
            <span className="relative whitespace-nowrap text-gradient">
              beautiful
              <svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 200 10" preserveAspectRatio="none">
                <path
                  d="M2 7 Q100 0 198 6"
                  stroke="#6B7A3A"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.55"
                  strokeDasharray="220"
                  className="animate-draw-underline"
                />
              </svg>
            </span>{" "}
            portfolio website
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base text-ink/70 sm:text-lg">
            I create career portfolios, wedding memory websites, business websites, photo
            galleries and marketing landing pages that help people and businesses look
            professional online.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={waLink("Hi Karthik, I'd like a website. Please share details and samples.")}
              target="_blank"
              rel="noreferrer"
              className="btn-wa w-full sm:w-auto"
            >
              <MessageCircle size={18} /> Chat on WhatsApp
            </a>
            <Link to="/services" className="btn-ghost w-full sm:w-auto">
              View services <ArrowRight size={16} />
            </Link>
            <Link to="/tools" className="btn-dark w-full sm:w-auto">
              Free tools
            </Link>
          </div>
        </motion.div>

        {/* signature: three floating mini-cards hinting at the work */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { delayChildren: 0.35, staggerChildren: 0.12 } },
          }}
          className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {[
            { k: "Delivered in", v: "3–5 days", d: "Fast turnaround, no fuss." },
            { k: "Pricing", v: "Tailored", d: "A custom quote, just for you." },
            { k: "Made for", v: "Mobile-first", d: "Looks great on every screen." },
          ].map((c, i) => (
            <motion.div
              key={c.k}
              variants={{
                hidden: { opacity: 0, y: 22 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
              }}
              className={`glass glass-hover p-5 ${i === 1 ? "animate-float" : ""}`}
            >
              <p className="eyebrow">{c.k}</p>
              <p className="mt-1 font-display text-2xl font-bold text-ink">{c.v}</p>
              <p className="mt-1 text-sm text-ink/60">{c.d}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
