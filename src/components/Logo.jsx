import { Link } from "react-router-dom";
import { BRAND } from "../lib/constants";

// The signature seal/monogram used in the navbar and footer.
export default function Logo({ withName = true, onClick }) {
  return (
    <Link to="/" onClick={onClick} className="group inline-flex items-center gap-2.5">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-olive font-display text-base font-bold text-sand shadow-olive transition group-hover:scale-105">
        PD
      </span>
      {withName && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-base font-bold text-ink">Portfolio</span>
          <span className="font-grotesk text-[10px] font-semibold uppercase tracking-[0.18em] text-olive-600">
            Designs
          </span>
        </span>
      )}
    </Link>
  );
}
