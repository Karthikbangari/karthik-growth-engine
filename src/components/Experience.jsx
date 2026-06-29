import { Briefcase } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { EXPERIENCE } from "../data/experience";

export default function Experience() {
  const e = EXPERIENCE;
  return (
    <section id="experience" className="section">
      <SectionHeading eyebrow="Experience" title="The work, on a timeline" />

      <div className="mx-auto mt-12 max-w-3xl">
        <Reveal>
          <div className="glass p-7 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-accent-blue to-accent-purple text-bg shadow-glow">
                  <Briefcase size={20} />
                </span>
                <div>
                  <p className="font-display text-lg font-bold text-ink">{e.role}</p>
                  <p className="text-sm text-muted">{e.org}</p>
                </div>
              </div>
              <span className="chip">{e.period}</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">{e.summary}</p>
          </div>
        </Reveal>

        <div className="relative mt-8">
          <span className="absolute bottom-0 left-3 top-0 w-px bg-gradient-to-b from-accent-blue/60 via-white/10 to-transparent" />
          {e.milestones.map((m, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="relative mb-5 pl-9">
                <span className="absolute left-[6px] top-1.5 h-3 w-3 rounded-full border-2 border-accent-blue bg-bg shadow-glow" />
                <p className="text-sm leading-relaxed text-ink/90">{m}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
