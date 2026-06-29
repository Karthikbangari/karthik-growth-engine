import { useState } from "react";
import { Plus, Minus, Quote } from "lucide-react";
import { PROCESS, TESTIMONIALS, FAQS } from "../data/portfolio";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";

export function Process() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <SectionHeading eyebrow="How it works" title="Four simple steps" />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {PROCESS.map((p, i) => (
          <Reveal key={p.step} delay={i * 0.06}>
            <div className="glass h-full p-6">
              <span className="font-display text-3xl font-bold text-olive/40">{p.step}</span>
              <h3 className="mt-2 font-display text-lg font-bold text-ink">{p.title}</h3>
              <p className="mt-1.5 text-sm text-ink/65">{p.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <SectionHeading eyebrow="Kind words" title="What clients say" />
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.06}>
            <figure className="glass flex h-full flex-col p-6">
              <Quote size={22} className="text-olive/50" />
              <blockquote className="mt-3 flex-1 text-sm text-ink/80">“{t.quote}”</blockquote>
              <figcaption className="mt-4">
                <p className="font-grotesk text-sm font-semibold text-ink">{t.name}</p>
                <p className="text-xs text-ink/55">{t.role}</p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <SectionHeading eyebrow="Good to know" title="Frequently asked questions" />
      <div className="mt-10 space-y-3">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} className="glass overflow-hidden">
              <button
                className="flex w-full items-center justify-between gap-4 p-5 text-left"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
              >
                <span className="font-grotesk text-sm font-semibold text-ink">{f.q}</span>
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-olive/12 text-olive-700">
                  {isOpen ? <Minus size={15} /> : <Plus size={15} />}
                </span>
              </button>
              {isOpen && <p className="px-5 pb-5 text-sm text-ink/65">{f.a}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
