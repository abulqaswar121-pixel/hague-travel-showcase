import { createFileRoute } from "@tanstack/react-router";
import { contactFields, EnquiryForm, FeatureGrid, Notice, PageHero, Section } from "@/components/site/Blocks";
import { images } from "@/data/site";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/passports")({
  head: () => meta("Passports & Documentation", "Guidance for new passports, renewals and travel document checklists."),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero image={images.hero} eyebrow="Passports & Documentation" title="Your documents, ready and right." sub="Guidance for new passports, renewals and travel document checklists." />
      <Section eyebrow="What we offer" title="Support at every step">
        <FeatureGrid items={["New passport guidance","Renewal assistance","Appointment preparation","Travel document checklists","Secure document handling"]} />
        <div className="mt-8"><Notice>Passport issuance, biometrics and approvals are handled solely by the government authority. Government fees are shown separately from agency fees.</Notice></div>
      </Section>
      <section className="pb-20"><div className="mx-auto max-w-3xl px-5">
        <EnquiryForm title="Talk to a consultant" fields={[...contactFields, { name: "notes", label: "How can we help?", type: "textarea", full: true }]} />
      </div></section>
    </>
  );
}
