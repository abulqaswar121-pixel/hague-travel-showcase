import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Set a new password — Hague Travel" },
      { name: "description", content: "Choose a new password for your Hague Travel account." },
      { property: "og:title", content: "Set a new password — Hague Travel" },
      { property: "og:description", content: "Choose a new password for your Hague Travel account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ResetPassword,
});

function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  return (
    <div className="min-h-screen bg-secondary/35 px-4 pb-16 pt-36">
      <form
        className="mx-auto grid max-w-md gap-4 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8"
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          const { error } = await supabase.auth.updateUser({ password });
          setBusy(false);
          if (error) return toast.error(error.message);
          toast.success("Password updated.");
          navigate({ to: "/portal", replace: true });
        }}
      >
        <h1 className="font-display text-3xl">Set a new password</h1>
        <div><Label htmlFor="pw">New password</Label>
          <Input id="pw" type="password" minLength={8} required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1.5" /></div>
        <button disabled={busy} className="rounded-full bg-gold-gradient py-3 text-sm font-bold text-gold-foreground shadow-gold">
          {busy ? "Saving…" : "Save password"}
        </button>
      </form>
    </div>
  );
}
