/** Pathway data for the Work & Relocation desk. */
export interface Pathway {
  id: string;
  label: string;
  region: string;
  fits: string;
  evidence: string;
  timeline: string;
  risk: "Lower" | "Medium" | "High";
}

const PATHWAYS: Pathway[] = [
  {
    id: "employer-sponsored",
    label: "Employer-sponsored work permit",
    region: "UK · Canada · Ireland · Germany",
    fits: "You already hold a genuine offer from a licensed sponsor.",
    evidence:
      "Certificate of sponsorship or LMIA/offer pack, salary at or above the going rate, English test where required.",
    timeline: "6 – 16 weeks after the offer",
    risk: "Medium",
  },
  {
    id: "intra-company",
    label: "Intra-company transfer",
    region: "UK · USA · Netherlands",
    fits: "You have 12+ months with a multinational moving you to another office.",
    evidence:
      "Employment history, role criticality, salary continuity and group structure documents.",
    timeline: "8 – 14 weeks",
    risk: "Lower",
  },
  {
    id: "shortage-occupation",
    label: "Shortage / critical skills route",
    region: "Canada · Germany · Ireland",
    fits: "Your occupation is on the destination's published shortage list.",
    evidence:
      "Credential evaluation, licence or registration, proof of experience, language score.",
    timeline: "3 – 9 months",
    risk: "Medium",
  },
  {
    id: "study-to-work",
    label: "Study then post-study work",
    region: "UK · Canada · Australia · Ireland",
    fits: "You can fund a one or two-year programme and want the graduate route afterwards.",
    evidence:
      "Admission, funds, language score, and a coherent study plan you can explain at interview.",
    timeline: "1 – 2 years to work rights",
    risk: "Lower",
  },
  {
    id: "talent",
    label: "Global talent / points-based",
    region: "UK · Canada · Australia",
    fits: "Recognised leader, senior researcher, or high points score.",
    evidence:
      "Awards, publications, salary evidence, endorsements — assembled as a case, not a folder.",
    timeline: "4 – 12 weeks",
    risk: "Medium",
  },
  {
    id: "dependant",
    label: "Dependant / spouse route",
    region: "Most destinations",
    fits: "Your partner already holds or is applying for a qualifying visa.",
    evidence:
      "Marriage certificate, relationship evidence, partner's status documents, funds where required.",
    timeline: "6 – 20 weeks",
    risk: "High",
  },
  {
    id: "seasonal",
    label: "Seasonal & agency hiring",
    region: "UK · Ireland · Gulf",
    fits: "Short-cycle work via a licensed labour supplier.",
    evidence: "Agency contract, recruitment-fee transparency, accommodation terms and insurance.",
    timeline: "4 – 10 weeks",
    risk: "High",
  },
  {
    id: "business",
    label: "Business & self-sponsorship",
    region: "UK · Canada · UAE · Rwanda",
    fits: "You are moving a company, opening a branch or relocating as a founder.",
    evidence: "Business plan, funds source, immigration rules for the entity and director role.",
    timeline: "3 – 9 months",
    risk: "High",
  },
];

export function getCountriesCoveredForWork(): Pathway[] {
  return PATHWAYS;
}

export function getRedFlags(): string[] {
  return [
    "Any 'visa guarantee' — only an authority decides a visa",
    "Recruiting fees charged to the candidate",
    "Offers without a named, registered employer",
    "Salaries only quoted in naira for overseas work",
    "Passports collected before an appointment",
    "Contracts in a language you cannot read, with no translation",
  ];
}
