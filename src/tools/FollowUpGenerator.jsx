import { useState, useMemo } from "react";
import { SERVICES } from "../data/services";
import { FOLLOWUP_TYPES, generateFollowUp } from "../data/content";
import { waLink } from "../lib/whatsapp";
import { MessageCircle } from "lucide-react";
import CopyButton from "../components/CopyButton";

export default function FollowUpGenerator() {
  const [name, setName] = useState("");
  const [service, setService] = useState(SERVICES[0].name);
  const [type, setType] = useState(FOLLOWUP_TYPES[0].id);

  const message = useMemo(
    () => generateFollowUp({ name, service, type }),
    [name, service, type]
  );

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="glass p-6">
        <div className="space-y-4">
          <div>
            <label className="label">Customer name</label>
            <input
              className="input"
              placeholder="e.g. Priya"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="label">Service</label>
            <select className="input" value={service} onChange={(e) => setService(e.target.value)}>
              {SERVICES.map((s) => (
                <option key={s.id} value={s.name}>{s.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Follow-up type</label>
            <select className="input" value={type} onChange={(e) => setType(e.target.value)}>
              {FOLLOWUP_TYPES.map((t) => (
                <option key={t.id} value={t.id}>{t.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="glass flex flex-col p-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-grotesk text-sm font-semibold text-olive-700">Your message</span>
          <CopyButton text={message} />
        </div>
        <pre className="flex-1 whitespace-pre-wrap break-words font-body text-sm leading-relaxed text-ink/80">
          {message}
        </pre>
        <a href={waLink(message)} target="_blank" rel="noreferrer" className="btn-wa mt-5">
          <MessageCircle size={16} /> Send on WhatsApp
        </a>
      </div>
    </div>
  );
}
