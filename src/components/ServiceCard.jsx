import { MessageCircle, Check } from "lucide-react";
import { waLink, serviceMessage } from "../lib/whatsapp";

export default function ServiceCard({ service }) {
  const Icon = service.icon;
  return (
    <div
      className={`glass glass-hover group flex h-full flex-col p-6 ${
        service.featured ? "ring-1 ring-accent-blue/40" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/[0.06] text-accent-blue transition-transform duration-300 group-hover:scale-110">
          <Icon size={22} />
        </span>
        {service.featured && <span className="chip !text-accent-blue">Featured</span>}
      </div>

      <h3 className="mt-4 font-display text-lg font-bold text-ink">{service.name}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">{service.description}</p>

      <ul className="mt-4 flex-1 space-y-1.5 text-sm text-muted">
        {service.features.map((f) => (
          <li key={f} className="flex items-center gap-2">
            <Check size={14} className="shrink-0 text-accent-green" /> {f}
          </li>
        ))}
      </ul>

      <a
        href={waLink(serviceMessage(service.name))}
        target="_blank"
        rel="noreferrer"
        className="btn-wa mt-5 w-full"
      >
        <MessageCircle size={16} /> Order on WhatsApp
      </a>
    </div>
  );
}
