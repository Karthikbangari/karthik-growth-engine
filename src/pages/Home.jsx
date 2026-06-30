import Hero from "../sections/Hero";
import ServicesGrid from "../sections/ServicesGrid";
import PricingCards from "../sections/PricingCards";
import PortfolioGrid from "../sections/PortfolioGrid";
import ContactSection from "../sections/ContactSection";
import { Process, Testimonials, FAQ } from "../sections/Extras";
import ScrollVelocity from "../components/ScrollVelocity";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Scrolling brand marquee — reacts to scroll speed */}
      <div className="border-y border-olive/15 bg-olive/[0.05] py-3.5 sm:py-4">
        <ScrollVelocity
          texts={[
            "Portfolio · Wedding · Business · Landing Pages ·",
            "Loved by clients · Free quote · No upfront payment · Fast delivery ·",
          ]}
          velocity={40}
          className="text-olive-700/70"
        />
      </div>

      <ServicesGrid />
      <PricingCards />
      <PortfolioGrid />
      <Process />
      <Testimonials />
      <FAQ />
      <ContactSection />
    </>
  );
}
