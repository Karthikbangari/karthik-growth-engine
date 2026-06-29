import { useState, useMemo } from "react";
import { MessageCircle, Link2, ExternalLink } from "lucide-react";
import { SERVICES, serviceById } from "../data/services";
import { waLink, serviceMessage } from "../lib/whatsapp";
import { CONTACT } from "../lib/constants";
import CopyButton from "../components/CopyButton";

export default function WhatsAppGenerator() {
  const [service, setService] = useState(SERVICES[0].id);
  const [custom, setCustom] = useState("");

  const message = custom.trim() || serviceMessage(serviceById(service)?.name || "website");
  const link = useMemo(() => waLink(message), [message]);

  return (
    <div className="glass p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label">Service</label>
          <select className="input" value={service} onChange={(e) => setService(e.target.value)}>
            {SERVICES.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Sending to</label>
          <input className="input" value={CONTACT.whatsappDisplay} readOnly />
        </div>
      </div>

      <div className="mt-4">
        <label className="label">Custom message (optional)</label>
        <textarea
          className="input min-h-[90px]"
          placeholder="Leave blank to use the default service message…"
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
        />
      </div>

      <div className="mt-5 rounded-xl border border-olive/20 bg-olive/5 p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-2 font-grotesk text-xs font-semibold uppercase tracking-wide text-olive-700">
            <Link2 size={14} /> Your shareable link
          </span>
          <CopyButton text={link} label="Copy link" />
        </div>
        <p className="mt-2 break-all font-body text-sm text-ink/70">{link}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <a href={link} target="_blank" rel="noreferrer" className="btn-wa">
          <MessageCircle size={16} /> Test link
        </a>
        <a href={link} target="_blank" rel="noreferrer" className="btn-ghost">
          <ExternalLink size={16} /> Open chat
        </a>
      </div>

      <p className="mt-4 text-xs text-ink/50">
        Tip: use a different link per service (or platform) so you instantly know what each customer wants.
      </p>
    </div>
  );
}
