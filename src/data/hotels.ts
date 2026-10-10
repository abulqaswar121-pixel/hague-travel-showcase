import city from "@/assets/city.jpg";
import dubai from "@/assets/dubai.jpg";
import hotel from "@/assets/hotel.jpg";
import island from "@/assets/island.jpg";
import campus from "@/assets/campus.jpg";
import relocation from "@/assets/relocation.jpg";
import resort from "@/assets/resort.jpg";
import culture from "@/assets/culture.jpg";
import type { Hotel, StudentHousing } from "./types";

const HOTELS: Hotel[] = [
  {
    id: "palm-residence",
    name: "The Palm Residence",
    city: "Dubai",
    country: "UAE",
    stars: 5,
    pricePerNight: 285000,
    amenities: ["Pool", "Spa", "Airport shuttle", "Breakfast", "Gym"],
    image: dubai,
    kind: "hotel",
    tags: ["Family rooms", "Airport hotel"],
    reviewScore: 9.1,
    description:
      "Marina-facing rooms, a rooftop pool and a 12-minute drive to DXB — the default for festive and layover stays.",
  },
  {
    id: "kensington-suites",
    name: "Kensington Gardens Suites",
    city: "London",
    country: "United Kingdom",
    stars: 4,
    pricePerNight: 240000,
    amenities: ["Kitchenette", "Breakfast", "Gym", "Laundry"],
    image: city,
    kind: "apartment",
    tags: ["Family rooms", "Long stay"],
    reviewScore: 8.7,
    description:
      "Serviced apartments near Gloucester Road with kitchenettes — popular with families visiting students.",
  },
  {
    id: "azure-lagoon",
    name: "Azure Lagoon Villas",
    city: "Baa Atoll",
    country: "Maldives",
    stars: 5,
    pricePerNight: 610000,
    amenities: ["Private pool", "All-inclusive", "Spa", "Snorkelling", "Butler"],
    image: island,
    kind: "villa",
    tags: ["Honeymoon"],
    reviewScore: 9.6,
    description:
      "Overwater villas with glass floor panels, house-reef access and half- or full-board options.",
  },
  {
    id: "harbourfront-studios",
    name: "Harbourfront Studios",
    city: "Toronto",
    country: "Canada",
    stars: 4,
    pricePerNight: 96000,
    amenities: ["Furnished", "Bills included", "Gym", "Study rooms"],
    image: relocation,
    kind: "apartment",
    tags: ["Long stay", "Students"],
    reviewScore: 8.4,
    description:
      "Furnished studio apartments on monthly terms, walking distance to the waterfront and transit.",
  },
  {
    id: "sultanahmet-riad",
    name: "Sultanahmet Cave Hotel",
    city: "Istanbul",
    country: "Türkiye",
    stars: 4,
    pricePerNight: 148000,
    amenities: ["Breakfast", "Hammam", "Terrace bar"],
    image: hotel,
    kind: "hotel",
    tags: ["City break"],
    reviewScore: 8.9,
    description:
      "Boutique stone rooms five minutes from Hagia Sophia, with a terrace built for sunset.",
  },
  {
    id: "victoria-falls-lodge",
    name: "Zambezi River Lodge",
    city: "Victoria Falls",
    country: "Zimbabwe",
    stars: 4,
    pricePerNight: 210000,
    amenities: ["Pool", "Breakfast", "Dinner", "Safari desk"],
    image: culture,
    kind: "hotel",
    tags: ["Group", "Honeymoon"],
    reviewScore: 9.0,
    description:
      "Riverside chalets with elephant views and an easy hop to the falls on both sides.",
  },
  {
    id: "kigali-hills",
    name: "Kigali Heights Conference Hotel",
    city: "Kigali",
    country: "Rwanda",
    stars: 4,
    pricePerNight: 165000,
    amenities: ["Meeting rooms", "Breakfast", "Gym", "Wi-Fi"],
    image: resort,
    kind: "hotel",
    tags: ["Corporate"],
    reviewScore: 8.6,
    description: "Break-out rooms, reliable fibre and a rooftop for the evening debrief.",
  },
  {
    id: "cape-town-guesthouse",
    name: "Atlantic Family Guesthouse",
    city: "Cape Town",
    country: "South Africa",
    stars: 4,
    pricePerNight: 132000,
    amenities: ["Family suites", "Pool", "Breakfast", "Childcare on request"],
    image: city,
    kind: "guesthouse",
    tags: ["Family rooms"],
    reviewScore: 9.2,
    description:
      "Connecting family suites in Green Point, ten minutes from the waterfront and the aquarium.",
  },
];

const HOUSING: StudentHousing[] = [
  {
    id: "manchester-firs",
    name: "Firs Village Halls",
    city: "Manchester",
    country: "United Kingdom",
    monthlyBudget: 520000,
    deposit: "6 weeks' rent, held by the provider",
    moveInDates: ["14 Sep 2026", "12 Jan 2027", "5 Sep 2027"],
    near: "5 min walk to the business school; free campus bus",
    roomTypes: ["En-suite", "Studio", "Shared flat (4)"],
    bills: "Water, heating and Wi-Fi included; electricity capped",
    image: campus,
  },
  {
    id: "toronto-lakeshore",
    name: "Lakeshore Student Lofts",
    city: "Toronto",
    country: "Canada",
    monthlyBudget: 640000,
    deposit: "One month rent",
    moveInDates: ["1 Sep 2026", "5 Jan 2027"],
    near: "Two TTC stops from UTSC; grocery below",
    roomTypes: ["Private room", "Studio", "1-bed share"],
    bills: "All-inclusive up to a 200kWh monthly cap",
    image: relocation,
  },
  {
    id: "dublin-docklands",
    name: "Docklands Co-Living",
    city: "Dublin",
    country: "Ireland",
    monthlyBudget: 710000,
    deposit: "One month rent + agency fee",
    moveInDates: ["18 Aug 2026", "11 Jan 2027"],
    near: "Luas red line to UCD in 22 minutes",
    roomTypes: ["En-suite", "Studio"],
    bills: "Bills included; bike store and study lounges",
    image: city,
  },
  {
    id: "berlin-neukoelln",
    name: "Neukölln Furnished Flats",
    city: "Berlin",
    country: "Germany",
    monthlyBudget: 430000,
    deposit: "Two months' deposit (legal maximum)",
    moveInDates: ["Rolling — 30 days' notice"],
    near: "S-Bahn to HU Berlin in 18 minutes",
    roomTypes: ["1-room flat", "Shared WG room"],
    bills: "Cold rent; heating and internet contracts assisted",
    image: culture,
  },
  {
    id: "nairobi-westlands",
    name: "Westlands Executive Apartments",
    city: "Nairobi",
    country: "Kenya",
    monthlyBudget: 380000,
    deposit: "Two months",
    moveInDates: ["Rolling — immediate"],
    near: "10 min to Strathmore; gym and pool",
    roomTypes: ["Studio", "1-bed", "2-bed family"],
    bills: "Service charge includes water, backup power, Wi-Fi",
    image: hotel,
  },
];

export function getHotels(): Hotel[] {
  return HOTELS;
}

export function getHotelById(id: string): Hotel | undefined {
  return HOTELS.find((h) => h.id === id);
}

export function getStudentHousing(): StudentHousing[] {
  return HOUSING;
}

export const HOTEL_AMENITIES = [
  "Breakfast",
  "Pool",
  "Gym",
  "Spa",
  "Airport shuttle",
  "Family rooms",
  "Kitchenette",
  "Wi-Fi",
  "Parking",
  "Pet friendly",
  "Bills included",
  "Study rooms",
];
