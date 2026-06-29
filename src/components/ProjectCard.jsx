import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// Glass card with a subtle 3D tilt that follows the cursor.
export default function ProjectCard({ project, onOpen }) {
  const Icon = project.icon;
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 200, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 200, damping: 18 });

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="glass glass-hover group relative flex h-full flex-col overflow-hidden p-6"
    >
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${project.accent}`} />

      <span
        className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${project.accent} text-bg shadow-glow`}
      >
        <Icon size={22} />
      </span>

      <h3 className="mt-4 font-display text-lg font-bold text-ink">{project.title}</h3>
      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">
        {project.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tech.slice(0, 4).map((t) => (
          <span key={t} className="chip">
            {t}
          </span>
        ))}
      </div>

      <button
        onClick={() => onOpen(project)}
        className="mt-5 inline-flex items-center gap-1 font-mono text-sm font-medium text-accent-blue transition-all hover:gap-2"
      >
        View Details <ArrowUpRight size={15} />
      </button>
    </motion.div>
  );
}
