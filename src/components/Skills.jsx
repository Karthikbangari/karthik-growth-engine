import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import SkillCard from "./SkillCard";
import { SKILLS } from "../data/skills";

export default function Skills() {
  const [active, setActive] = useState(SKILLS[0].id);
  const cat = SKILLS.find((c) => c.id === active);

  return (
    <section id="skills" className="section">
      <SectionHeading
        eyebrow="Skills"
        title="The stack I build with"
        subtitle="Cloud, automation, infrastructure-as-code, observability, and security — end to end."
      />

      {/* category tabs */}
      <Reveal className="mt-10 flex flex-wrap justify-center gap-2">
        {SKILLS.map((c) => {
          const Icon = c.icon;
          const on = c.id === active;
          return (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs font-medium transition-all ${
                on
                  ? "bg-gradient-to-r from-accent-blue to-accent-purple text-bg shadow-glow"
                  : "border border-white/10 bg-white/[0.04] text-muted hover:text-ink"
              }`}
            >
              <Icon size={15} /> {c.label}
            </button>
          );
        })}
      </Reveal>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
        >
          {cat.items.map((it) => (
            <SkillCard key={it} label={it} />
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
