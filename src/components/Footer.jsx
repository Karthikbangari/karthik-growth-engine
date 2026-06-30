import { Link } from "react-router-dom";
import { MessageCircle, Instagram, Mail } from "lucide-react";
import Logo from "./Logo";
import { CONTACT } from "../lib/constants";
import { waLink } from "../lib/whatsapp";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/50 bg-sand2/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-ink/60">
            Beautiful, mobile-friendly websites for people and businesses — designed to bring you customers.
          </p>
        </div>

        <div>
          <h4 className="eyebrow mb-3">Explore</h4>
          <ul className="space-y-2 text-sm text-ink/70">
            <li><Link to="/services" className="hover:text-olive-700">Services</Link></li>
            <li><Link to="/tools" className="hover:text-olive-700">Tools</Link></li>
            <li><Link to="/contact" className="hover:text-olive-700">Contact</Link></li>
            <li><Link to="/dashboard" className="hover:text-olive-700">Lead dashboard</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="eyebrow mb-3">Get in touch</h4>
          <ul className="space-y-2.5 text-sm text-ink/70">
            <li>
              <a href={waLink()} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-olive-700">
                <MessageCircle size={16} /> {CONTACT.whatsappDisplay}
              </a>
            </li>
            <li>
              <a href={CONTACT.instagramUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-olive-700">
                <Instagram size={16} /> {CONTACT.instagramHandle}
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT.email}`} className="inline-flex items-center gap-2 hover:text-olive-700">
                <Mail size={16} /> {CONTACT.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/40 py-5 text-center text-xs text-ink/50">
        © {new Date().getFullYear()} Portfolio Designs. Built to grow.
      </div>
    </footer>
  );
}
