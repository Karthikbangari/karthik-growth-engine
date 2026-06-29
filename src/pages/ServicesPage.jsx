import ServicesGrid from "../sections/ServicesGrid";
import PricingCards from "../sections/PricingCards";
import { Process } from "../sections/Extras";
import SectionHeading from "../components/SectionHeading";

export default function ServicesPage() {
  return (
    <div className="pt-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Services & pricing"
          title="Everything I can build for you"
          subtitle="From a single landing page to a full wedding memory site — all mobile-first and made to convert."
        />
      </div>
      <ServicesGrid heading={false} />
      <PricingCards />
      <Process />
    </div>
  );
}
