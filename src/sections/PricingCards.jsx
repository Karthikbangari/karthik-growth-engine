import { Check, MessageCircle } from "lucide-react";
import { PACKAGES } from "../data/pricing";
import { waLink } from "../lib/whatsapp";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";

export default function PricingCards() {
  return (
    <section id="pricing" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <SectionHeading
        eyebrow="Packages"
        title="Pick your perfect package"
        subtitle="Choose the option that fits you best — message me on WhatsApp and I'll share a custom quote."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {PACKAGES.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.06}>
            <div
              className={`relative flex h-full flex-col p-7 ${
                p.highlight
                  ? "glass-dark scale-[1.02] shadow-lift transition-all duration-300 ease-out hover:-translate-y-1"
                  : "glass glass-hover"
              }`}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-olive px-3 py-1 font-grotesk text-[10px] font-bold uppercase tracking-widest text-sand">
                  Most popular
                </span>
              )}
              <h3 className={`font-grotesk text-sm font-semibold uppercase tracking-wide ${p.highlight ? "text-olive-200" : "text-olive-700"}`}>
                {p.name}
              </h3>
              <p className={`mt-3 font-display text-3xl font-bold ${p.highlight ? "text-sand" : "text-ink"}`}>
                Custom quote
              </p>
              <p className={`mt-2 text-sm ${p.highlight ? "text-sand/70" : "text-ink/60"}`}>{p.blurb}</p>

              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check size={16} className={p.highlight ? "mt-0.5 text-olive-200" : "mt-0.5 text-olive-600"} />
                    <span className={p.highlight ? "text-sand/90" : "text-ink/80"}>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={waLink(`Hi Karthik, I'm interested in the ${p.name} package. Please share details and pricing.`)}
                target="_blank"
                rel="noreferrer"
                className={`mt-7 ${p.highlight ? "btn-wa" : "btn-primary"} w-full`}
              >
                <MessageCircle size={16} /> Choose {p.name}
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
