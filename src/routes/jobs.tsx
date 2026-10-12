import { createFileRoute } from "@tanstack/react-router";
import { contactFields, EnquiryForm, FeatureGrid, Notice, PageHero, Section } from "@/components/site/Blocks";
import { images } from "@/data/site";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/jobs")({
  head: () => meta("Remote Jobs", "Remote and hybrid travel-industry roles linked to Hague Travel Academy courses."),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero image={images.academy} eyebrow="Remote Jobs" title="Work in travel, from anywhere." sub="Remote and hybrid travel-industry roles linked to Hague Travel Academy courses." />
      <Section eyebrow="What we offer" title="Support at every step">
        <FeatureGrid items={["Travel Consultant — Remote","Travel Sales & Digital Marketing","Reservations & Customer Experience","CV & profile builder","Employer vacancy submissions (admin approved)"]} />
        <div className="mt-8"><Notice>These are example role categories, not live vacancies.</Notice></div>
      </Section>
      <section className="pb-20"><div className="mx-auto max-w-3xl px-5">
        <EnquiryForm title="Talk to a consultant" fields={[...contactFields, { name: "notes", label: "How can we help?", type: "textarea", full: true }]} />
      </div></section>
    </>
  );
}
