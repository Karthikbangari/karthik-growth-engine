import { useState } from "react";
import { MessageCircle, Mail, Instagram, Send, CheckCircle2 } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { waLink } from "../lib/whatsapp";
import { CONTACT } from "../lib/constants";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    // Frontend-only: show a success message (no backend yet).
    setSent(true);
  };

  return (
    <section id="contact" className="section">
      <SectionHeading
        eyebrow="Contact"
        title="Let's build something reliable"
        subtitle="Have a project, a role, or a website in mind? Send a message — I'll get back to you."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-5">
        {/* Form */}
        <Reveal className="lg:col-span-3">
          <div className="glass p-7 sm:p-8">
            {sent ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <CheckCircle2 size={44} className="text-accent-green" />
                <p className="mt-4 font-display text-xl font-bold text-ink">Thank you!</p>
                <p className="mt-1 text-sm text-muted">I will contact you soon.</p>
                <a
                  href={waLink(CONTACT.defaultMessage)}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-wa mt-6"
                >
                  <MessageCircle size={16} /> Chat on WhatsApp now
                </a>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label className="label" htmlFor="c-name">Name</label>
                  <input id="c-name" className="input" required value={form.name} onChange={set("name")} placeholder="Your name" />
                </div>
                <div>
                  <label className="label" htmlFor="c-email">Email</label>
                  <input id="c-email" type="email" className="input" required value={form.email} onChange={set("email")} placeholder="you@example.com" />
                </div>
                <div>
                  <label className="label" htmlFor="c-msg">Message</label>
                  <textarea id="c-msg" rows={4} className="input resize-none" required value={form.message} onChange={set("message")} placeholder="Tell me about your project…" />
                </div>
                <button type="submit" className="btn-primary w-full">
                  <Send size={16} /> Send Message
                </button>
              </form>
            )}
          </div>
        </Reveal>

        {/* Direct contact */}
        <Reveal delay={0.1} className="lg:col-span-2">
          <div className="glass flex h-full flex-col gap-3 p-7 sm:p-8">
            <p className="font-display text-lg font-bold text-ink">Reach me directly</p>
            <a href={waLink(CONTACT.defaultMessage)} target="_blank" rel="noreferrer" className="btn-wa">
              <MessageCircle size={16} /> WhatsApp · {CONTACT.whatsappDisplay}
            </a>
            <a href={`mailto:${CONTACT.email}`} className="btn-ghost">
              <Mail size={16} /> {CONTACT.email}
            </a>
            <a href={CONTACT.instagramUrl} target="_blank" rel="noreferrer" className="btn-ghost">
              <Instagram size={16} /> @{CONTACT.instagramHandle.replace(/\s+/g, "")}
            </a>
            <p className="mt-auto pt-4 font-mono text-xs leading-relaxed text-muted/70">
              Prefer WhatsApp for the fastest reply. The form above is frontend-only for now.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
