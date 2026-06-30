import { ArrowUpRight } from "lucide-react";
import { PORTFOLIO } from "../data/portfolio";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import Tilt from "../components/Tilt";

export default function PortfolioGrid() {
  return (
    <section id="portfolio" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <SectionHeading
        eyebrow="Recent work"
        title="My work"
        subtitle="Real websites I've designed and delivered. Tap any project to open the live site."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PORTFOLIO.map((item, i) => {
          // Live screenshot of the real site (Microlink — free, no key).
          const shot = item.link
            ? `https://api.microlink.io/?url=${encodeURIComponent(item.link)}&screenshot=true&meta=false&embed=screenshot.url`
            : null;
          const Card = (
            <div className="glass glass-hover group h-full overflow-hidden p-0">
              <div className={`relative flex h-44 items-end overflow-hidden bg-gradient-to-br ${item.accent} p-4`}>
                {shot && (
                  <img
                    src={shot}
                    alt={`${item.title} website preview`}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                    className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                )}
                {/* gradient veil keeps the category chip readable over any screenshot */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/45 via-ink/0 to-ink/10" />
                <span className="relative rounded-full bg-white/90 px-2.5 py-1 font-grotesk text-[10px] font-bold uppercase tracking-wider text-ink">
                  {item.category}
                </span>
                {item.link && (
                  <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-ink shadow-card transition group-hover:scale-110">
                    <ArrowUpRight size={16} />
                  </span>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-bold text-ink">{item.title}</h3>
                <p className="mt-1 text-sm text-ink/60">{item.desc}</p>
              </div>
            </div>
          );

          return (
            <Reveal key={item.id} delay={i * 0.05} className="h-full">
              <Tilt max={8} glare className="h-full rounded-2xl">
                {item.link ? (
                  <a href={item.link} target="_blank" rel="noreferrer" className="block h-full">
                    {Card}
                  </a>
                ) : (
                  Card
                )}
              </Tilt>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
