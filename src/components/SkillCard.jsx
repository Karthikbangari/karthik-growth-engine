export default function SkillCard({ label }) {
  return (
    <div className="glass glass-hover flex items-center gap-2.5 px-4 py-3">
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-blue shadow-glow" />
      <span className="font-mono text-sm text-ink/90">{label}</span>
    </div>
  );
}
