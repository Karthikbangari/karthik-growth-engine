import { useState, useMemo, useEffect } from "react";
import { SERVICES } from "../data/services";
import { FOLLOWUP_TYPES, generateFollowUp, generateAIFollowUp } from "../data/content";
import { waLink } from "../lib/whatsapp";
import { MessageCircle, Sparkles, RefreshCw } from "lucide-react";
import CopyButton from "../components/CopyButton";

export default function FollowUpGenerator() {
  const [name, setName] = useState("");
  const [service, setService] = useState(SERVICES[0].name);
  const [type, setType] = useState(FOLLOWUP_TYPES[0].id);
  const [aiMessage, setAiMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const template = useMemo(
    () => generateFollowUp({ name, service, type }),
    [name, service, type]
  );

  // Whenever the inputs change, drop any previous AI version.
  useEffect(() => setAiMessage(null), [name, service, type]);

  const message = aiMessage || template;

  async function improveWithAI() {
    setLoading(true);
    try {
      setAiMessage(await generateAIFollowUp({ name, service, type }));
    } finally {
      setLoading(false);
    }
  }

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
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <button className="btn-ghost w-full sm:w-auto" onClick={improveWithAI} disabled={loading}>
            {loading ? <RefreshCw size={16} className="animate-spin" /> : <Sparkles size={16} />}
            {loading ? "Improving…" : aiMessage ? "Regenerate with AI" : "Improve with AI"}
          </button>
          <a href={waLink(message)} target="_blank" rel="noreferrer" className="btn-wa w-full sm:flex-1">
            <MessageCircle size={16} /> Send on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
