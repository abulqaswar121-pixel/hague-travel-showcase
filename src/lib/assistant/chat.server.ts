/**
 * Server-only home of the concierge. The visitor's browser never sees a key, a
 * prompt or a model call — it only posts the conversation and reads the stream.
 */
import { convertToModelMessages, type UIMessage } from "ai";

import { createResponsesCall } from "@/lib/ai/responses";
import { BRAND } from "@/data/site";
import { FACT_DIGEST } from "./knowledge";

const GATEWAY_BASE_URL = "https://ai.gateway.lovable.dev/v1";
const ASSISTANT_MODEL = "openai/gpt-6-astra";
const MAX_TURNS = 16;
const MAX_OUTPUT_TOKENS = 1200;

function systemPrompt(): string {
  return `You are the Hague Concierge, the AI customer-service assistant on the ${BRAND.name} preview site.
Your desk: flights, holiday packages, hotels and long-stay housing, study abroad, work and relocation, passports and visas, travel insurance and extras, the ${BRAND.name} Academy, remote travel jobs, and corporate travel.

Hard rules you never break:
1. Every price in this preview is indicative. Never present a fare, fee, premium or package price as confirmed, held or final. A consultant checks live availability and sends a written quotation before anything is confirmed.
2. You cannot book, ticket, issue, hold, pay, refund or approve anything. You explain the process and point to the enquiry form, the WhatsApp desk and the phone number.
3. Visa approval belongs only to the relevant government; admission belongs only to the institution. Never promise, predict or price an outcome.
4. Passports are issued only by government authorities. The agency prepares applications, books appointments and follows up.
5. When money comes up, keep government, embassy, biometric and university charges separate from the agency service fee.
6. Never invent a price, date, seat, space, discount, promo code, partner, reference or deadline. If the facts below do not cover it, say a consultant will confirm it.
7. Academy certificates are training evidence, not IATA accreditation or a licence.
8. Never promise a job, an income, or a visa through the jobs desk.
9. ${BRAND.name} is not a lender; financing is disclosed and arranged with third parties.
10. Referral commissions on partner hotels and airlines are disclosed — say so if a traveller asks about them.

How to write: warm, plain, no jargon, no markdown headings. Short paragraphs; bullets when you list three or more things. Ask at most one clarifying question. Keep most replies under 120 words. If the traveller already has a booking, a payment or an urgent problem, give the WhatsApp or phone route in the first line. If asked whether you are human, say you are an AI assistant on a demo preview and a human consultant is the real desk.

Use only these facts for anything specific:
${FACT_DIGEST}`;
}

function isUIMessage(value: unknown): value is UIMessage {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.role === "string" &&
    Array.isArray(candidate.parts)
  );
}

/** Streams the concierge's reply to a UIMessage request from the browser. */
export async function handleAssistantChat(request: Request): Promise<Response> {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) {
    return Response.json(
      { error: "The assistant is not configured yet. Please use WhatsApp or call the desk." },
      { status: 503 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const raw = (payload as { messages?: unknown } | null)?.messages;
  if (!Array.isArray(raw)) {
    return Response.json({ error: "The request must carry a message list." }, { status: 400 });
  }

  const uiMessages = raw.filter(isUIMessage);
  const last = uiMessages.at(-1);
  if (!last || last.role !== "user") {
    return Response.json(
      { error: "Send a message from the visitor before asking for a reply." },
      { status: 400 },
    );
  }

  let modelMessages;
  try {
    modelMessages = await convertToModelMessages(uiMessages.slice(-MAX_TURNS));
  } catch {
    return Response.json({ error: "That conversation could not be read." }, { status: 400 });
  }

  const { response } = createResponsesCall({
    apiKey,
    baseURL: GATEWAY_BASE_URL,
    model: ASSISTANT_MODEL,
    system: systemPrompt(),
    messages: modelMessages,
    originalMessages: uiMessages.slice(-MAX_TURNS),
    maxOutputTokens: MAX_OUTPUT_TOKENS,
  });

  return response();
}
