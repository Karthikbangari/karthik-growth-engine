import { Quote } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

// Placeholder testimonials — easy to replace with real ones later.
const TESTIMONIALS = [
  { quote: "Premium design and fast delivery.", name: "Happy Client" },
  { quote: "Very clean portfolio website.", name: "Happy Client" },
  { quote: "Professional and mobile-friendly work.", name: "Happy Client" },
];

export default function Testimonials() {
  return (
    <section className="section">
      <SectionHeading eyebrow="Testimonials" title="What people say" />

      <div className="mt-12 grid gap-5 sm:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div className="glass glass-hover flex h-full flex-col p-6">
              <Quote size={22} className="text-accent-purple" />
              <p className="mt-3 flex-1 text-base leading-relaxed text-ink/90">"{t.quote}"</p>
              <p className="mt-4 font-mono text-xs text-muted">— {t.name}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
