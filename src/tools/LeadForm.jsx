import { useState } from "react";
import { Check, Send } from "lucide-react";
import { SERVICES } from "../data/services";

const SOURCES = ["Instagram", "Facebook", "LinkedIn", "WhatsApp", "Fiverr", "PeoplePerHour", "Google", "Referral", "Other"];

const EMPTY = {
  name: "",
  phone: "",
  service: SERVICES[0].name,
  budget: "",
  deadline: "",
  source: SOURCES[0],
  message: "",
};

// `onSave` receives the lead object. Used on the public site (saves to storage)
// and inside the dashboard (manual add).
export default function LeadForm({ onSave, compact = false, submitLabel = "Submit enquiry" }) {
  const [form, setForm] = useState(EMPTY);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  function submit() {
    if (!form.name.trim() || !form.phone.trim()) {
      setErr("Please add at least a name and phone number.");
      return;
    }
    setErr("");
    onSave({ ...form });
    setForm(EMPTY);
    setDone(true);
    setTimeout(() => setDone(false), 2500);
  }

  return (
    <div className="space-y-4">
      <div className={`grid gap-4 ${compact ? "" : "sm:grid-cols-2"}`}>
        <div>
          <label className="label">Name *</label>
          <input className="input" value={form.name} onChange={set("name")} placeholder="Customer name" />
        </div>
        <div>
          <label className="label">Phone *</label>
          <input className="input" value={form.phone} onChange={set("phone")} placeholder="+91 …" />
        </div>
        <div>
          <label className="label">Service needed</label>
          <select className="input" value={form.service} onChange={set("service")}>
            {SERVICES.map((s) => (
              <option key={s.id} value={s.name}>{s.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Budget</label>
          <input className="input" value={form.budget} onChange={set("budget")} placeholder="e.g. ₹5,000" />
        </div>
        <div>
          <label className="label">Deadline</label>
          <input className="input" type="date" value={form.deadline} onChange={set("deadline")} />
        </div>
        <div>
          <label className="label">Lead source</label>
          <select className="input" value={form.source} onChange={set("source")}>
            {SOURCES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="label">Message</label>
        <textarea className="input min-h-[80px]" value={form.message} onChange={set("message")} placeholder="Anything specific you need…" />
      </div>

      {err && <p className="text-sm text-red-700">{err}</p>}

      <button className={done ? "btn-primary !bg-olive-600" : "btn-primary"} onClick={submit}>
        {done ? <><Check size={16} /> Saved!</> : <><Send size={16} /> {submitLabel}</>}
      </button>
    </div>
  );
}
