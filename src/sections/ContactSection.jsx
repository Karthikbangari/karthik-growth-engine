import { MessageCircle, Instagram, Mail, Phone } from "lucide-react";
import { CONTACT } from "../lib/constants";
import { waLink } from "../lib/whatsapp";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";

export default function ContactSection() {
  const items = [
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: CONTACT.whatsappDisplay,
      href: waLink("Hi Karthik, I'd like to discuss a website."),
      cta: "Chat now",
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: CONTACT.instagramHandle,
      href: CONTACT.instagramUrl,
      cta: "Follow",
    },
    {
      icon: Mail,
      label: "Email",
      value: CONTACT.email,
      href: `mailto:${CONTACT.email}`,
      cta: "Send mail",
    },
  ];

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="glass-dark relative overflow-hidden p-8 sm:p-12">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-olive/30 blur-3xl" />
        <div className="relative grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="font-grotesk text-xs font-semibold uppercase tracking-[0.2em] text-olive-200">
              Let's build it
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
              Ready for a website that works as hard as you do?
            </h2>
            <p className="mt-4 max-w-md text-sand/70">
              Tell me what you need and I'll send samples and a quote on WhatsApp — usually within
              the hour.
            </p>
            <a
              href={waLink("Hi Karthik, I'm ready to start. Please send me details.")}
              target="_blank"
              rel="noreferrer"
              className="btn-wa mt-7"
            >
              <Phone size={16} /> Start on WhatsApp
            </a>
          </div>

          <div className="grid gap-3">
            {items.map((it, i) => {
              const Icon = it.icon;
              return (
                <Reveal key={it.label} delay={i * 0.06}>
                  <a
                    href={it.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
                  >
                    <span className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-lg bg-olive/25 text-olive-100">
                        <Icon size={18} />
                      </span>
                      <span>
                        <span className="block font-grotesk text-xs uppercase tracking-wide text-sand/50">
                          {it.label}
                        </span>
                        <span className="block text-sm font-medium text-sand">{it.value}</span>
                      </span>
                    </span>
                    <span className="font-grotesk text-xs font-semibold text-olive-200">{it.cta} →</span>
                  </a>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
