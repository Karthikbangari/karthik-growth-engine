import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";

// Reusable cursor-driven 3D tilt. Wrap any card to give it real depth on hover.
// `glare` adds a soft light highlight that follows the cursor.
export default function Tilt({ children, className = "", max = 10, glare = false }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [max, -max]), { stiffness: 220, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-max, max]), { stiffness: 220, damping: 18 });

  const gx = useTransform(mx, [-0.5, 0.5], ["0%", "100%"]);
  const gy = useTransform(my, [-0.5, 0.5], ["0%", "100%"]);
  const glareBg = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.4), transparent 45%)`;

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
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={`group relative [transform-style:preserve-3d] ${className}`}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden
          style={{ backgroundImage: glareBg }}
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      )}
    </motion.div>
  );
}
