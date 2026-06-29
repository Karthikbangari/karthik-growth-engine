import { useState } from "react";
import { Wand2, RefreshCw, AlertCircle } from "lucide-react";
import { SERVICES } from "../data/services";
import { TONES, generateAIContent } from "../data/content";
import CopyButton from "../components/CopyButton";

export default function PostGenerator() {
  const [service, setService] = useState(SERVICES[0].id);
  const [tone, setTone] = useState(TONES[0].id);
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function run() {
    setLoading(true);
    setError("");
    try {
      const result = await generateAIContent(service, tone);
      setBlocks(result);
    } catch {
      setError("Something went wrong generating content. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
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
            <label className="label">Tone</label>
            <select className="input" value={tone} onChange={(e) => setTone(e.target.value)}>
              {TONES.map((t) => (
                <option key={t.id} value={t.id}>{t.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <button className="btn-primary" onClick={run} disabled={loading}>
            {loading ? <RefreshCw size={16} className="animate-spin" /> : <Wand2 size={16} />}
            {loading ? "Generating…" : "Generate content"}
          </button>
          {blocks.length > 0 && !loading && (
            <button className="btn-ghost" onClick={run}>
              <RefreshCw size={16} /> Regenerate
            </button>
          )}
        </div>

        {error && (
          <p className="mt-4 flex items-center gap-2 text-sm text-red-700">
            <AlertCircle size={16} /> {error}
          </p>
        )}
      </div>

      {blocks.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          {blocks.map((b) => (
            <div key={b.id} className="glass flex flex-col p-5">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-grotesk text-sm font-semibold text-olive-700">{b.platform}</span>
                <CopyButton text={b.text} />
              </div>
              <pre className="flex-1 whitespace-pre-wrap break-words font-body text-sm leading-relaxed text-ink/80">
                {b.text}
              </pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
