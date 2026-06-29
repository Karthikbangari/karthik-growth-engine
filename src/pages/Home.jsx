import Hero from "../sections/Hero";
import ServicesGrid from "../sections/ServicesGrid";
import PricingCards from "../sections/PricingCards";
import PortfolioGrid from "../sections/PortfolioGrid";
import ContactSection from "../sections/ContactSection";
import { Process, Testimonials, FAQ } from "../sections/Extras";

export default function Home() {
  return (
    <>
      <Hero />
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
