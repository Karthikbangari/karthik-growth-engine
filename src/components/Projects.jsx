import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Check } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import ProjectCard from "./ProjectCard";
import { PROJECTS } from "../data/projects";

export default function Projects() {
  const [sel, setSel] = useState(null);

  // Close modal on Escape
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setSel(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="projects" className="section">
      <SectionHeading
        eyebrow="Projects"
        title="Selected work"
        subtitle="Production infrastructure, pipelines, and platforms — built to be reliable and observable."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.06}>
            <ProjectCard project={p} onOpen={setSel} />
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {sel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSel(null)}
            className="fixed inset-0 z-[60] grid place-items-center bg-bg/80 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="glass relative w-full max-w-lg overflow-hidden p-0"
            >
              <div className={`h-1.5 w-full bg-gradient-to-r ${sel.accent}`} />
              <button
                onClick={() => setSel(null)}
                aria-label="Close"
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-lg text-muted transition hover:bg-white/10 hover:text-ink"
              >
                <X size={18} />
              </button>

              <div className="p-7 sm:p-8">
                <span
                  className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${sel.accent} text-bg shadow-glow`}
                >
                  <sel.icon size={22} />
                </span>
                <h3 className="mt-4 font-display text-2xl font-bold text-ink">{sel.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{sel.description}</p>

                <p className="mt-6 font-mono text-xs uppercase tracking-wide text-muted/70">Highlights</p>
                <ul className="mt-3 space-y-2">
                  {sel.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-ink/90">
                      <Check size={16} className="mt-0.5 shrink-0 text-accent-green" /> {f}
                    </li>
                  ))}
                </ul>

                <p className="mt-6 font-mono text-xs uppercase tracking-wide text-muted/70">Tech</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {sel.tech.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
