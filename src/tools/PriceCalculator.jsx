import { useState, useMemo } from "react";
import { MessageCircle, Calculator } from "lucide-react";
import { SERVICES, serviceById } from "../data/services";
import { CALC } from "../data/pricing";
import { waLink, priceMessage } from "../lib/whatsapp";

const formatINR = (n) => "₹" + n.toLocaleString("en-IN");

function Toggle({ label, checked, onChange, hint }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition ${
        checked ? "border-olive bg-olive/10" : "border-ink/15 bg-white/60"
      }`}
    >
      <span>
        <span className="block font-grotesk text-sm font-medium text-ink">{label}</span>
        {hint && <span className="block text-xs text-ink/50">{hint}</span>}
      </span>
      <span className={`relative h-5 w-9 rounded-full transition ${checked ? "bg-olive" : "bg-ink/20"}`}>
        <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition ${checked ? "left-4" : "left-0.5"}`} />
      </span>
    </button>
  );
}

export default function PriceCalculator() {
  const [service, setService] = useState(SERVICES[0].id);
  const [pages, setPages] = useState(1);
  const [gallery, setGallery] = useState(false);
  const [video, setVideo] = useState(false);
  const [animation, setAnimation] = useState(false);
  const [premium, setPremium] = useState(false);
  const [urgent, setUrgent] = useState(false);

  const price = useMemo(() => {
    let total = CALC.base[service] || 0;
    total += Math.max(0, pages - 1) * CALC.perExtraPage;
    if (gallery) total += CALC.addOns.gallery;
    if (video) total += CALC.addOns.video;
    if (animation) total += CALC.addOns.animation;
    if (premium) total += CALC.addOns.premiumDesign;
    if (urgent) total = Math.round(total * CALC.urgentMultiplier);
    return total;
  }, [service, pages, gallery, video, animation, premium, urgent]);

  const serviceName = serviceById(service)?.name || "website";

  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      <div className="glass p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label">Service type</label>
            <select className="input" value={service} onChange={(e) => setService(e.target.value)}>
              {SERVICES.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Number of pages</label>
            <input
              type="number"
              min={1}
              max={30}
              className="input"
              value={pages}
              onChange={(e) => setPages(Math.max(1, Number(e.target.value) || 1))}
            />
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Toggle label="Photo gallery" hint={`+${formatINR(CALC.addOns.gallery)}`} checked={gallery} onChange={setGallery} />
          <Toggle label="Video section" hint={`+${formatINR(CALC.addOns.video)}`} checked={video} onChange={setVideo} />
          <Toggle label="Animations" hint={`+${formatINR(CALC.addOns.animation)}`} checked={animation} onChange={setAnimation} />
          <Toggle label="Premium design" hint={`+${formatINR(CALC.addOns.premiumDesign)}`} checked={premium} onChange={setPremium} />
          <Toggle label="Urgent delivery" hint={`+${Math.round((CALC.urgentMultiplier - 1) * 100)}%`} checked={urgent} onChange={setUrgent} />
        </div>
      </div>

      <div className="glass-dark flex flex-col p-6">
        <span className="flex items-center gap-2 font-grotesk text-xs font-semibold uppercase tracking-wide text-olive-200">
          <Calculator size={15} /> Estimated price
        </span>
        <p className="mt-3 font-display text-5xl font-bold">{formatINR(price)}</p>
        <p className="mt-2 text-sm text-sand/60">
          For a {serviceName.toLowerCase()} with {pages} page{pages > 1 ? "s" : ""}. Final quote confirmed on WhatsApp.
        </p>
        <a
          href={waLink(priceMessage(serviceName, formatINR(price)))}
          target="_blank"
          rel="noreferrer"
          className="btn-wa mt-auto w-full"
        >
          <MessageCircle size={16} /> Send this to WhatsApp
        </a>
      </div>
    </div>
  );
}
