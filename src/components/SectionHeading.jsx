// Consistent section heading used across the site.
export default function SectionHeading({ eyebrow, title, subtitle, center = true }) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-ink/65">{subtitle}</p>}
    </div>
  );
}
