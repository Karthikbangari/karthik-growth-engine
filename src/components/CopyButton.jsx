import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CopyButton({ text, label = "Copy", className = "" }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback for older browsers / insecure contexts.
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 rounded-lg border border-olive/30 bg-olive/10 px-3 py-1.5 font-grotesk text-xs font-semibold text-olive-700 transition hover:bg-olive/20 ${className}`}
      aria-label={copied ? "Copied" : label}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
      {copied ? "Copied!" : label}
    </button>
  );
}
