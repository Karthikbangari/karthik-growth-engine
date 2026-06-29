import { ArrowUpRight } from "lucide-react";
import { PORTFOLIO } from "../data/portfolio";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";

export default function PortfolioGrid() {
  return (
    <section id="portfolio" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <SectionHeading
        eyebrow="Recent work"
        title="Portfolio samples"
        subtitle="A taste of the styles I design. Live demos coming soon — ask me for a walkthrough."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PORTFOLIO.map((item, i) => {
          const Card = (
            <div className="glass glass-hover group h-full overflow-hidden p-0">
              <div className={`relative flex h-40 items-end overflow-hidden bg-gradient-to-br ${item.accent} p-4 after:absolute after:inset-0 after:bg-white/0 after:transition-colors after:duration-300 group-hover:after:bg-white/10`}>
                <span className="rounded-full bg-white/85 px-2.5 py-1 font-grotesk text-[10px] font-bold uppercase tracking-wider text-ink">
                  {item.category}
                </span>
                {item.link && (
                  <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/85 text-ink transition group-hover:scale-110">
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
            <Reveal key={item.id} delay={i * 0.05}>
              {item.link ? (
                <a href={item.link} target="_blank" rel="noreferrer">{Card}</a>
              ) : (
                Card
              )}
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
