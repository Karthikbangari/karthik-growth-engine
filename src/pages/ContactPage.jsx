import ContactSection from "../sections/ContactSection";
import LeadForm from "../tools/LeadForm";
import SectionHeading from "../components/SectionHeading";
import { addLead } from "../lib/storage";

export default function ContactPage() {
  return (
    <div className="pt-10">
      <ContactSection />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow="Or send the details"
          title="Tell me about your project"
          subtitle="Fill this in and I'll get back to you on WhatsApp with samples and a quote."
        />
        <div className="glass mt-10 p-6 sm:p-8">
          <LeadForm onSave={(lead) => addLead(lead)} submitLabel="Send my enquiry" />
        </div>
      </section>
    </div>
  );
}
