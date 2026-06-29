import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import ServiceCard from "./ServiceCard";
import { SERVICES } from "../data/services";

export default function Services() {
  return (
    <section id="services" className="section">
      <SectionHeading
        eyebrow="Services"
        title="I also build websites for clients"
        subtitle="Premium, mobile-first sites — including 3D interactive portfolios like this one."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s, i) => (
          <Reveal key={s.id} delay={i * 0.04}>
            <ServiceCard service={s} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
