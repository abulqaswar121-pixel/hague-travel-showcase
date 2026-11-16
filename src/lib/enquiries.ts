import { supabase } from "@/integrations/supabase/client";

type Values = Record<string, unknown>;

function pick(values: Values, keys: string[]): string | null {
  for (const k of Object.keys(values)) {
    if (keys.some((key) => k.toLowerCase().includes(key))) {
      const v = values[k];
      if (typeof v === "string" && v.trim()) return v.trim();
    }
  }
  return null;
}

/** Saves any site enquiry so staff see it in the enquiry desk. */
export async function saveEnquiry(reference: string, service: string, values: Values) {
  const { data: auth } = await supabase.auth.getSession();
  const { error } = await supabase.from("enquiries").insert({
    reference,
    service,
    full_name: pick(values, ["fullname", "full_name", "name"]),
    email: pick(values, ["email"]),
    phone: pick(values, ["phone", "whatsapp"]),
    details: JSON.parse(JSON.stringify(values)),
    user_id: auth.session?.user.id ?? null,
  });
  if (error) throw error;
}
