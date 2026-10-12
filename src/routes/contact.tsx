import { createFileRoute } from "@tanstack/react-router";
import { contactFields, EnquiryForm, FeatureGrid, Notice, PageHero, Section } from "@/components/site/Blocks";
import { images } from "@/data/site";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/contact")({
  head: () => meta("Contact", "Speak to a Hague Travel consultant by WhatsApp, phone or email."),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero image={images.resort} eyebrow="Contact" title="Speak to a real person." sub="Speak to a Hague Travel consultant by WhatsApp, phone or email." />
      <Section eyebrow="What we offer" title="Support at every step">
        <FeatureGrid items={["WhatsApp support 7 days","Callback within 2 hours","Lagos office consultations","After-trip support"]} />
        <div className="mt-8"><Notice>Our team replies 8am–10pm WAT.</Notice></div>
      </Section>
      <section className="pb-20"><div className="mx-auto max-w-3xl px-5">
        <EnquiryForm title="Talk to a consultant" fields={[...contactFields, { name: "notes", label: "How can we help?", type: "textarea", full: true }]} />
      </div></section>
    </>
  );
}
