import { createFileRoute } from "@tanstack/react-router";
import { contactFields, EnquiryForm, FeatureGrid, Notice, PageHero, Section } from "@/components/site/Blocks";
import { images } from "@/data/site";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/relocation")({
  head: () => meta("Work & Relocation", "Work visa guidance, overseas pathways, family relocation and settlement support."),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero image={images.relocation} eyebrow="Work & Relocation" title="Move abroad with a plan, not a guess." sub="Work visa guidance, overseas pathways, family relocation and settlement support." />
      <Section eyebrow="What we offer" title="Support at every step">
        <FeatureGrid items={["Readiness assessment","Pathway consultation","Document & qualification guidance","Family relocation planning","Temporary & long-term housing","Moving & baggage","Airport pickup & settlement","Education financing referrals"]} />
        <div className="mt-8"><Notice>Partner referral fees are disclosed. We never guarantee visas or employment.</Notice></div>
      </Section>
      <section className="pb-20"><div className="mx-auto max-w-3xl px-5">
        <EnquiryForm title="Talk to a consultant" fields={[...contactFields, { name: "notes", label: "How can we help?", type: "textarea", full: true }]} />
      </div></section>
    </>
  );
}
