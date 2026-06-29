import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, FileText } from "lucide-react";
import { waLink } from "../lib/whatsapp";
import { CONTACT } from "../lib/constants";

// Lazy-load the 3D scene so three.js downloads as its own chunk.
const ThreeHeroScene = lazy(() => import("./ThreeHeroScene"));

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden">
      {/* faint grid backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-grid [background-size:46px_46px] opacity-[0.5] [mask-image:radial-gradient(70%_60%_at_50%_0%,#000,transparent)]" />

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-28 sm:px-6 lg:min-h-screen lg:grid-cols-2 lg:gap-6 lg:pt-24">
        {/* Left: copy */}
        <div className="relative z-10">
          <motion.span variants={fade} initial="hidden" animate="show" custom={0} className="chip">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-green" /> Available for opportunities
          </motion.span>

          <motion.h1
            variants={fade}
            initial="hidden"
            animate="show"
            custom={1}
            className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
          >
            Hi, I'm <span className="gradient-text">Karthik Bangari</span>
          </motion.h1>

          <motion.p
            variants={fade}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-5 max-w-xl text-lg font-medium text-ink/90"
          >
            DevOps &amp; Cloud Engineer building reliable, automated, and scalable cloud infrastructure.
          </motion.p>

          <motion.p
            variants={fade}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-3 max-w-xl text-sm leading-relaxed text-muted"
          >
            I design CI/CD pipelines, automate infrastructure, manage Kubernetes platforms, and build
            cloud systems that are secure, observable, and production-ready.
          </motion.p>

          <motion.div
            variants={fade}
            initial="hidden"
            animate="show"
            custom={4}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a href="#projects" className="btn-primary">
              View Projects <ArrowRight size={16} />
            </a>
            <a href="#contact" className="btn-ghost">
              <MessageCircle size={16} /> Contact Me
            </a>
            {/* No resume file yet — link to contact. Drop a /resume.pdf in /public and
                point this href there + change the label to "Download Resume". */}
            <a href="#contact" className="btn-ghost">
              <FileText size={16} /> Request Resume
            </a>
          </motion.div>
        </div>

        {/* Right: 3D scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-[340px] w-full sm:h-[440px] lg:h-[560px]"
        >
          <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-accent-blue/10 via-accent-purple/10 to-transparent blur-2xl" />
          <Suspense
            fallback={
              <div className="grid h-full place-items-center font-mono text-sm text-muted">
                Loading 3D scene…
              </div>
            }
          >
            <ThreeHeroScene />
          </Suspense>

          {/* floating glass labels for a "dashboard" feel */}
          <div className="pointer-events-none absolute left-2 top-6 hidden rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 font-mono text-[11px] text-accent-blue backdrop-blur-md sm:block">
            ⬡ EKS · healthy
          </div>
          <div className="pointer-events-none absolute bottom-8 right-2 hidden rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 font-mono text-[11px] text-accent-green backdrop-blur-md sm:block">
            ✓ deploy · synced
          </div>
        </motion.div>
      </div>
    </section>
  );
}
