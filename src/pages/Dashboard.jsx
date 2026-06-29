import { useState, useEffect } from "react";
import {
  Lock, LogOut, Plus, Trash2, Search, MessageCircle, Phone, X,
} from "lucide-react";
import { useLeads, LEAD_STATUSES } from "../lib/storage";
import { ADMIN_PASSWORD, CONTACT } from "../lib/constants";
import { waLink } from "../lib/whatsapp";
import LeadForm from "../tools/LeadForm";
import SectionHeading from "../components/SectionHeading";

const AUTH_KEY = "kge_admin_ok";

const STATUS_COLOR = {
  New: "bg-blue-100 text-blue-700",
  Contacted: "bg-amber-100 text-amber-700",
  "Sample Sent": "bg-violet-100 text-violet-700",
  "Price Shared": "bg-cyan-100 text-cyan-700",
  "Advance Paid": "bg-teal-100 text-teal-700",
  Designing: "bg-indigo-100 text-indigo-700",
  Delivered: "bg-olive-100 text-olive-700",
  Closed: "bg-green-100 text-green-700",
  Lost: "bg-rose-100 text-rose-700",
};

// -------------------- Login gate --------------------
function Login({ onUnlock }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);

  function submit() {
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, "1");
      onUnlock();
    } else {
      setErr(true);
    }
  }

  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24">
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-olive/12 text-olive-700">
        <Lock size={24} />
      </span>
      <h1 className="mt-5 font-display text-2xl font-bold text-ink">Lead Dashboard</h1>
      <p className="mt-1 text-center text-sm text-ink/60">
        This area is private. Enter your password to manage leads.
      </p>
      <div className="glass mt-8 w-full p-6">
        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          value={pw}
          onChange={(e) => { setPw(e.target.value); setErr(false); }}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="••••••••"
          autoFocus
        />
        {err && <p className="mt-2 text-sm text-red-700">Incorrect password. Try again.</p>}
        <button className="btn-primary mt-4 w-full" onClick={submit}>Unlock</button>
      </div>
    </div>
  );
}

// -------------------- Single lead card --------------------
function LeadCard({ lead, onUpdate, onRemove }) {
  return (
    <div className="glass p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-bold text-ink">{lead.name}</h3>
          <p className="text-sm text-ink/60">{lead.service}</p>
        </div>
        <span className={`rounded-full px-2.5 py-1 font-grotesk text-[11px] font-semibold ${STATUS_COLOR[lead.status] || "bg-ink/10 text-ink/70"}`}>
          {lead.status}
        </span>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm text-ink/70">
        <span><b className="font-medium text-ink/50">Phone:</b> {lead.phone}</span>
        <span><b className="font-medium text-ink/50">Budget:</b> {lead.budget || "—"}</span>
        <span><b className="font-medium text-ink/50">Source:</b> {lead.source}</span>
        <span><b className="font-medium text-ink/50">Deadline:</b> {lead.deadline || "—"}</span>
      </div>

      {lead.message && (
        <p className="mt-3 rounded-lg bg-sand2/50 p-3 text-sm text-ink/70">{lead.message}</p>
      )}

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <label className="label">Status</label>
          <select
            className="input !py-2"
            value={lead.status}
            onChange={(e) => onUpdate(lead.id, { status: e.target.value })}
          >
            {LEAD_STATUSES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="label">Follow-up date</label>
          <input
            type="date"
            className="input !py-2"
            value={lead.followUpDate || ""}
            onChange={(e) => onUpdate(lead.id, { followUpDate: e.target.value })}
          />
        </div>
      </div>

      <div className="mt-3">
        <label className="label">Notes</label>
        <textarea
          className="input min-h-[60px]"
          placeholder="Add a note…"
          defaultValue={lead.notes}
          onBlur={(e) => onUpdate(lead.id, { notes: e.target.value })}
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <a href={waLink(`Hi ${lead.name},`)} target="_blank" rel="noreferrer" className="btn-wa !px-3 !py-2 text-xs">
          <MessageCircle size={14} /> WhatsApp
        </a>
        <a href={`tel:${lead.phone}`} className="btn-ghost !px-3 !py-2 text-xs">
          <Phone size={14} /> Call
        </a>
        <button
          onClick={() => { if (confirm(`Delete lead "${lead.name}"? This cannot be undone.`)) onRemove(lead.id); }}
          className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 font-grotesk text-xs font-semibold text-rose-700 transition hover:bg-rose-100"
        >
          <Trash2 size={14} /> Delete
        </button>
      </div>
    </div>
  );
}

// -------------------- Dashboard --------------------
export default function Dashboard() {
  const [authed, setAuthed] = useState(false);
  const { leads, add, update, remove } = useLeads();
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem(AUTH_KEY) === "1") setAuthed(true);
  }, []);

  if (!authed) return <Login onUnlock={() => setAuthed(true)} />;

  const logout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    setAuthed(false);
  };

  const filtered = leads.filter((l) => {
    const matchStatus = filter === "All" || l.status === filter;
    const q = query.trim().toLowerCase();
    const matchQuery = !q ||
      l.name.toLowerCase().includes(q) ||
      l.phone.toLowerCase().includes(q) ||
      (l.service || "").toLowerCase().includes(q);
    return matchStatus && matchQuery;
  });

  const open = leads.filter((l) => !["Closed", "Lost"].includes(l.status)).length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <SectionHeading center={false} eyebrow="Admin" title="Lead Dashboard" />
        <div className="flex items-center gap-2">
          <button className="btn-primary !py-2.5" onClick={() => setShowForm((s) => !s)}>
            {showForm ? <X size={16} /> : <Plus size={16} />} {showForm ? "Close" : "Add lead"}
          </button>
          <button className="btn-ghost !py-2.5" onClick={logout}>
            <LogOut size={16} /> Lock
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { k: "Total leads", v: leads.length },
          { k: "Open", v: open },
          { k: "Closed", v: leads.filter((l) => l.status === "Closed").length },
          { k: "New", v: leads.filter((l) => l.status === "New").length },
        ].map((s) => (
          <div key={s.k} className="glass p-4">
            <p className="eyebrow">{s.k}</p>
            <p className="mt-1 font-display text-3xl font-bold text-ink">{s.v}</p>
          </div>
        ))}
      </div>

      {/* Add lead form */}
      {showForm && (
        <div className="glass mt-6 p-6">
          <h3 className="mb-4 font-display text-lg font-bold text-ink">Add a new lead</h3>
          <LeadForm
            onSave={(lead) => { add(lead); setShowForm(false); }}
            submitLabel="Save lead"
          />
        </div>
      )}

      {/* Filters */}
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40" />
          <input
            className="input !pl-9"
            placeholder="Search name, phone or service…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <select className="input max-w-[180px]" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All statuses</option>
          {LEAD_STATUSES.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Leads */}
      {filtered.length === 0 ? (
        <div className="glass mt-8 p-12 text-center">
          <p className="font-display text-lg font-bold text-ink">No leads yet</p>
          <p className="mt-1 text-sm text-ink/60">
            Add leads manually, or they'll appear here when someone submits the contact form on this device.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {filtered.map((lead) => (
            <LeadCard key={lead.id} lead={lead} onUpdate={update} onRemove={remove} />
          ))}
        </div>
      )}

      <p className="mt-8 text-center text-xs text-ink/40">
        Leads are stored in this browser only. Open the dashboard on the same device where you add them. WhatsApp: {CONTACT.whatsappDisplay}
      </p>
    </div>
  );
}
