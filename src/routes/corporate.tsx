import { createFileRoute } from "@tanstack/react-router";
import { contactFields, EnquiryForm, FeatureGrid, Notice, PageHero, Section } from "@/components/site/Blocks";
import { images } from "@/data/site";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/corporate")({
  head: () => meta("Corporate Travel", "Corporate flight desks, group travel, relocation contracts and travel management."),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero image={images.hotel} eyebrow="Corporate Travel" title="Business travel, handled end to end." sub="Corporate flight desks, group travel, relocation contracts and travel management." />
      <Section eyebrow="What we offer" title="Support at every step">
        <FeatureGrid items={["Dedicated corporate flight desk","Group & event travel","Staff relocation contracts","Travel policy management","Consolidated invoicing"]} />
        <div className="mt-8"><Notice>Corporate terms are agreed in writing before any booking.</Notice></div>
      </Section>
      <section className="pb-20"><div className="mx-auto max-w-3xl px-5">
        <EnquiryForm title="Talk to a consultant" fields={[...contactFields, { name: "notes", label: "How can we help?", type: "textarea", full: true }]} />
      </div></section>
    </>
  );
}
