import { useEffect, useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { waLink } from "../lib/whatsapp";
import { CONTACT } from "../lib/constants";

const NAV = [
  ["About", "#about"],
  ["Skills", "#skills"],
  ["Pipeline", "#pipeline"],
  ["Projects", "#projects"],
  ["Experience", "#experience"],
  ["Services", "#services"],
  ["Contact", "#contact"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-white/10 bg-bg/70 backdrop-blur-xl" : ""
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6">
        <a href="#hero" className="flex items-center gap-2 font-display font-bold">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-accent-blue to-accent-purple text-bg shadow-glow">
            KB
          </span>
          <span className="hidden text-ink sm:block">Karthik Bangari</span>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {NAV.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="font-mono text-sm text-muted transition-colors hover:text-ink"
            >
              {label}
            </a>
          ))}
          <a
            href={waLink(CONTACT.defaultMessage)}
            target="_blank"
            rel="noreferrer"
            className="btn-primary !px-4 !py-2 text-xs"
          >
            <MessageCircle size={15} /> Let's talk
          </a>
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-lg text-ink lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-bg/95 backdrop-blur-xl lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4">
            {NAV.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 font-mono text-sm text-muted hover:bg-white/5 hover:text-ink"
              >
                {label}
              </a>
            ))}
            <a
              href={waLink(CONTACT.defaultMessage)}
              target="_blank"
              rel="noreferrer"
              className="btn-primary mt-2"
              onClick={() => setOpen(false)}
            >
              <MessageCircle size={16} /> Let's talk
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
