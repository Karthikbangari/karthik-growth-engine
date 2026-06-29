import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { STATS } from "../data/experience";

export default function About() {
  return (
    <section id="about" className="section">
      <SectionHeading
        eyebrow="About"
        title="The engineer behind the infrastructure"
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-5">
        <Reveal className="lg:col-span-3">
          <div className="glass h-full p-8 sm:p-10">
            <p className="text-lg leading-relaxed text-ink/90">
              I'm a <span className="text-accent-blue">DevOps and Cloud Engineer</span> with experience in
              AWS, Kubernetes, Terraform, Docker, Jenkins, GitHub Actions, ArgoCD, monitoring, automation,
              and cloud infrastructure. I focus on building{" "}
              <span className="text-accent-purple">reliable deployment systems</span>, secure infrastructure,
              and scalable platforms.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-2">
          <div className="grid h-full grid-cols-2 gap-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="glass glass-hover flex flex-col justify-center p-5 text-center sm:text-left"
              >
                <p className="font-display text-2xl font-bold">
                  <span className="gradient-text">{s.value}</span>
                </p>
                <p className="mt-1 text-xs leading-snug text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
