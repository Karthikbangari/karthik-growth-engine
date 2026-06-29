import { MessageCircle, Mail, Instagram } from "lucide-react";
import { waLink } from "../lib/whatsapp";
import { CONTACT, BRAND } from "../lib/constants";

const QUICK = [
  ["About", "#about"],
  ["Skills", "#skills"],
  ["Pipeline", "#pipeline"],
  ["Projects", "#projects"],
];

const SERVICES_LINKS = [
  ["Experience", "#experience"],
  ["Services", "#services"],
  ["Testimonials", "#contact"],
  ["Contact", "#contact"],
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-bg/60">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 font-display font-bold">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-accent-blue to-accent-purple text-bg">
                KB
              </span>
              <span className="text-ink">{BRAND.name}</span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              {BRAND.role} — {BRAND.tagline}
            </p>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-muted/70">Quick links</p>
            <ul className="mt-3 space-y-2 text-sm">
              {QUICK.map(([l, h]) => (
                <li key={h}>
                  <a href={h} className="text-muted transition hover:text-ink">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-muted/70">More</p>
            <ul className="mt-3 space-y-2 text-sm">
              {SERVICES_LINKS.map(([l, h]) => (
                <li key={l}>
                  <a href={h} className="text-muted transition hover:text-ink">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-muted/70">Contact</p>
            <div className="mt-3 flex flex-col gap-2 text-sm">
              <a href={waLink(CONTACT.defaultMessage)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-muted hover:text-ink">
                <MessageCircle size={15} /> {CONTACT.whatsappDisplay}
              </a>
              <a href={`mailto:${CONTACT.email}`} className="inline-flex items-center gap-2 text-muted hover:text-ink">
                <Mail size={15} /> {CONTACT.email}
              </a>
              <a href={CONTACT.instagramUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-muted hover:text-ink">
                <Instagram size={15} /> @{CONTACT.instagramHandle.replace(/\s+/g, "")}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center font-mono text-xs text-muted/60">
          © {new Date().getFullYear()} {BRAND.name}. Built with React, Three.js &amp; Tailwind.
        </div>
      </div>
    </footer>
  );
}
