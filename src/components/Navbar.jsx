import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X, MessageCircle } from "lucide-react";
import Logo from "./Logo";
import { waLink } from "../lib/whatsapp";

const NAV = [
  { to: "/", label: "Home", end: true },
  { to: "/services", label: "Services" },
  { to: "/tools", label: "Tools" },
  { to: "/dashboard", label: "Leads" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass = ({ isActive }) =>
    `relative font-grotesk text-sm font-medium transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:rounded-full after:bg-olive-600 after:transition-all after:duration-300 after:content-[''] ${
      isActive
        ? "text-olive-700 after:w-full"
        : "text-ink/70 hover:text-ink after:w-0 hover:after:w-full"
    }`;

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        scrolled ? "border-b border-white/50 bg-sand/80 backdrop-blur-md" : ""
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />

        <div className="hidden items-center gap-7 md:flex">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end} className={linkClass}>
              {n.label}
            </NavLink>
          ))}
          <a
            href={waLink("Hi Karthik, I'd like to know more about your website services.")}
            target="_blank"
            rel="noreferrer"
            className="btn-wa !px-4 !py-2"
          >
            <MessageCircle size={16} /> WhatsApp
          </a>
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-lg text-ink md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-white/50 bg-sand/95 backdrop-blur-md md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.end}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2.5 font-grotesk text-sm font-medium ${
                    isActive ? "bg-olive/10 text-olive-700" : "text-ink/80"
                  }`
                }
              >
                {n.label}
              </NavLink>
            ))}
            <a
              href={waLink("Hi Karthik, I'd like to know more about your website services.")}
              target="_blank"
              rel="noreferrer"
              className="btn-wa mt-2 w-full"
            >
              <MessageCircle size={16} /> Chat on WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
