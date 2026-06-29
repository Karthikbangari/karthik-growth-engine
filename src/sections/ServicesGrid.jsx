import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "../data/services";
import { waLink, serviceMessage } from "../lib/whatsapp";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import Tilt from "../components/Tilt";

export default function ServicesGrid({ heading = true }) {
  return (
    <section id="services" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      {heading && (
        <SectionHeading
          eyebrow="What I build"
          title="Services"
          subtitle="Pick what you need — every site is custom, mobile-first and ready to share."
        />
      )}

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s, i) => {
          const Icon = s.icon;
          return (
            <Reveal key={s.id} delay={i * 0.05} className="h-full">
              <Tilt max={8} glare className="h-full rounded-2xl">
              <div className="glass glass-hover group flex h-full flex-col p-6">
                <div className="flex items-center">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-olive/12 text-olive-700 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-3">
                    <Icon size={22} />
                  </span>
                </div>
                <h3 className="mt-4 font-display text-xl font-bold text-ink">{s.name}</h3>
                <p className="mt-1.5 text-sm text-ink/65">{s.short}</p>
                <ul className="mt-4 space-y-1.5 text-sm text-ink/70">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-olive" /> {p}
                    </li>
                  ))}
                </ul>
                <a
                  href={waLink(serviceMessage(s.name))}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-1 font-grotesk text-sm font-semibold text-olive-700 group-hover:gap-2"
                >
                  Enquire on WhatsApp <ArrowUpRight size={16} />
                </a>
              </div>
              </Tilt>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
