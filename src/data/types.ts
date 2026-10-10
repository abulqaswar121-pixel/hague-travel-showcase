/**
 * Shared domain types for Hague Travel.
 * Everything the UI renders is typed here so a real API/database can replace
 * the mock accessors in `src/data/*` without touching components.
 */

export type CurrencyCode = "NGN" | "USD" | "GBP";

export type Category =
  | "Beach"
  | "Festive"
  | "Honeymoon"
  | "Family"
  | "Group"
  | "African Cultural"
  | "City Break"
  | "Pilgrimage"
  | "Corporate Retreat";

export type PackageStatus = "draft" | "scheduled" | "published" | "unpublished" | "archived";

export interface ItineraryDay {
  day: number;
  title: string;
  detail: string;
  meals: string;
}

export interface TourPackage {
  slug: string;
  title: string;
  destination: string;
  country: string;
  category: Category;
  cover: string;
  gallery: string[];
  blurb: string;
  /** ISO date strings — rendered with the shared date formatter. */
  departDate: string;
  returnDate: string;
  nights: number;
  days: number;
  /** Indicative pricing in NGN. A supplier quote is what gets invoiced. */
  pricePerPerson: number;
  singleSupplement: number;
  childPrice: number;
  flightsIncluded: boolean;
  flightNote: string;
  hotelCategory: string;
  roomBasis: string;
  meals: string[];
  activities: string[];
  transfers: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryDay[];
  depositPct: number;
  depositDue: string;
  balanceDue: string;
  cancellationPolicy: { window: string; charge: string }[];
  minGroup: number;
  maxGroup: number;
  spacesRemaining: number;
  visaRequirement: string;
  visaAssistance: string;
  bookingDeadline: string;
  earlyBird: boolean;
  earlyBirdSaving: number;
  promoCode?: string | undefined;
  status: PackageStatus;
  featured: boolean;
  rating: number;
  reviews: number;
}

export interface FlightRoute {
  id: string;
  from: string;
  fromCode: string;
  to: string;
  toCode: string;
  airline: string;
  stops: number;
  duration: string;
  /** Indicative return fare in NGN, economy. */
  indicativeFrom: number;
  seasonal: string;
}

export interface FlightResult {
  id: string;
  airline: string;
  flightNo: string;
  departs: string;
  arrives: string;
  arriveDayPlus: boolean;
  duration: string;
  stops: string;
  via?: string | undefined;
  cabin: string;
  baggage: string;
  fareConditions: string;
  /** Indicative fare in NGN — never a confirmed price. */
  price: number;
  seatsLeft: number;
}

export interface Hotel {
  id: string;
  name: string;
  city: string;
  country: string;
  stars: number;
  /** NGN per night, indicative. */
  pricePerNight: number;
  amenities: string[];
  image: string;
  kind: "hotel" | "apartment" | "villa" | "hostel" | "guesthouse";
  tags: string[];
  reviewScore: number;
  description: string;
}

export interface StudentHousing {
  id: string;
  name: string;
  city: string;
  country: string;
  /** NGN per month, indicative. */
  monthlyBudget: number;
  deposit: string;
  moveInDates: string[];
  near: string;
  roomTypes: string[];
  bills: string;
  image: string;
}

export interface StudyDestination {
  slug: string;
  name: string;
  flag: string;
  headline: string;
  heroImage: string;
  intakes: string[];
  tuitionRange: string;
  postStudyWork: string;
  visaRoute: string;
  partnerNote: string;
  benefits: string[];
  topInstitutions: string[];
  popularCourses: string[];
  documents: string[];
  costBreakdown: {
    label: string;
    amount: string;
    owner: "government" | "university" | "agency" | "third-party";
  }[];
  timeline: { week: string; task: string }[];
  faqs: { q: string; a: string }[];
}

export interface JobListing {
  id: string;
  title: string;
  category: string;
  employmentType: "Employed" | "Freelance" | "Commission-based" | "Independent agent";
  workMode: "Remote" | "Hybrid" | "On-site";
  country: string;
  experience: "Entry" | "Mid" | "Senior";
  employer: string;
  source: string;
  summary: string;
  responsibilities: string[];
  qualifications: string[];
  salary: string;
  deadline: string;
  /** Links a role to the Academy module that prepares for it. */
  academyModule: string;
  status: "approved" | "pending";
}

export interface AcademyCohort {
  id: string;
  cohort: string;
  month: string;
  year: number;
  title: string;
  focus: string;
  status: "Open" | "Closing soon" | "Upcoming";
  startDate: string;
  endDate: string;
  classes: string;
  seats: number;
  seatsTaken: number;
  fee: number;
  feeNote: string;
  registrationDeadline: string;
}

export interface CurriculumModule {
  number: number;
  title: string;
  summary: string;
  lessons: number;
  outcome: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  quote: string;
  rating: number;
  service: string;
}

export interface Faq {
  q: string;
  a: string;
  topic: string;
}

export interface InsuranceProduct {
  id: string;
  name: string;
  type: string;
  cover: string[];
  limits: string;
  excess: string;
  scope: string;
  exclusions: string[];
  /** NGN indicative premium. */
  from: number;
  insurer: string;
}

export interface TravelExtra {
  id: string;
  title: string;
  description: string;
  priceFrom: number;
  unit: string;
  icon: string;
  bullets: string[];
}

export interface Enquiry {
  id: string;
  service: string;
  subject: string;
  status: "New" | "Quote sent" | "Awaiting documents" | "In progress" | "Closed";
  updated: string;
  consultant: string;
}

export interface CaseRecord {
  id: string;
  client: string;
  service: "Study visa" | "Work permit" | "Relocation" | "Passport";
  country: string;
  step: number;
  consultant: string;
  priority: "Standard" | "High";
}

export interface PaymentRecord {
  ref: string;
  client: string;
  item: string;
  amount: number;
  balance: number;
  status: "Paid" | "Partial" | "Pending" | "Refunded";
  date: string;
}
