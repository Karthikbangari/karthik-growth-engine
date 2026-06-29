import { Fragment, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Hammer,
  FlaskConical,
  ShieldCheck,
  Container,
  Boxes,
  GitBranch,
  Server,
  Activity,
  ChevronRight,
} from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const STEPS = [
  { id: "github", label: "GitHub", icon: Github, desc: "Code push triggers the pipeline." },
  { id: "build", label: "Build", icon: Hammer, desc: "Application is built and dependencies are installed." },
  { id: "test", label: "Test", icon: FlaskConical, desc: "Unit tests and quality checks run automatically." },
  { id: "scan", label: "Security Scan", icon: ShieldCheck, desc: "Dependencies and container images are scanned." },
  { id: "docker", label: "Docker Image", icon: Container, desc: "Application is packaged into a container image." },
  { id: "registry", label: "Registry", icon: Boxes, desc: "Image is pushed to a secure registry." },
  { id: "argocd", label: "ArgoCD", icon: GitBranch, desc: "GitOps deployment syncs the desired state." },
  { id: "k8s", label: "Kubernetes / EKS", icon: Server, desc: "Application is deployed to EKS with rolling updates." },
  { id: "monitor", label: "Monitoring", icon: Activity, desc: "Prometheus, Grafana, and CloudWatch track health." },
];

export default function Pipeline() {
  const [active, setActive] = useState(0);
  const Step = STEPS[active];

  return (
    <section id="pipeline" className="section">
      <SectionHeading
        eyebrow="CI/CD Pipeline"
        title="From commit to production"
        subtitle="Hover or tap any stage to see what happens. This is the flow I automate, end to end."
      />

      {/* flow of stages */}
      <Reveal className="mt-12">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const on = active === i;
            return (
              <Fragment key={s.id}>
                <button
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 font-mono text-xs transition-all duration-200 ${
                    on
                      ? "border-accent-blue/50 bg-white/[0.08] text-ink shadow-glow"
                      : "border-white/10 bg-white/[0.03] text-muted hover:-translate-y-0.5 hover:text-ink"
                  }`}
                >
                  <Icon size={15} className={on ? "text-accent-blue" : ""} />
                  {s.label}
                </button>
                {i < STEPS.length - 1 && (
                  <ChevronRight size={16} className="hidden shrink-0 text-muted/40 sm:block" />
                )}
              </Fragment>
            );
          })}
        </div>
      </Reveal>

      {/* explanation card */}
      <Reveal delay={0.05} className="mt-8">
        <div className="glass mx-auto max-w-2xl overflow-hidden p-0">
          {/* animated flow line */}
          <div className="h-1 w-full animate-gradient-shift bg-gradient-to-r from-accent-blue via-accent-purple to-accent-green [background-size:200%_100%]" />
          <div className="p-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="flex items-start gap-4"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 text-accent-blue">
                  <Step.icon size={20} />
                </span>
                <div>
                  <p className="font-display text-lg font-bold text-ink">{Step.label}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{Step.desc}</p>
                  <p className="mt-2 font-mono text-[11px] text-muted/60">
                    stage {active + 1} / {STEPS.length}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
