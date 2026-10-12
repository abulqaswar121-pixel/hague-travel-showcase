import { createFileRoute } from "@tanstack/react-router";
import { contactFields, EnquiryForm, FeatureGrid, Notice, PageHero, Section } from "@/components/site/Blocks";
import { images } from "@/data/site";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/academy")({
  head: () => meta("Hague Travel Academy", "Paid virtual travel-industry training every quarter — February, May, August and November cohorts."),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero image={images.academy} eyebrow="Hague Travel Academy" title="Launch your travel career in 12 weeks." sub="Paid virtual travel-industry training every quarter — February, May, August and November cohorts." />
      <Section eyebrow="What we offer" title="Support at every step">
        <FeatureGrid items={["Live virtual classes","Recorded lessons","Practical booking exercises","Customer service & sales","Tour operations","Final assessment & certificate","Cohorts: Feb, May, Aug, Nov"]} />
        <div className="mt-8"><Notice>Certificates are issued by Hague Travel Academy and are not IATA or government accreditation.</Notice></div>
      </Section>
      <section className="pb-20"><div className="mx-auto max-w-3xl px-5">
        <EnquiryForm title="Talk to a consultant" fields={[...contactFields, { name: "notes", label: "How can we help?", type: "textarea", full: true }]} />
      </div></section>
    </>
  );
}
