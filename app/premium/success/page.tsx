"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function PremiumSuccessPage() {
  const sp = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading"|"ok"|"error">("loading");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const session_id = sp.get("session_id");
    if (!session_id) {
      setStatus("error");
      setMsg("Aucune session Stripe fournie.");
      return;
    }
    (async () => {
      try {
        const res = await fetch("/api/subscription/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ session_id }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Erreur inconnue");
        setStatus("ok");
        setMsg(`Abonnement activé: ${data.tier || "starter"}`);
        setTimeout(() => router.replace("/premium"), 1500);
      } catch (e: any) {
        setStatus("error");
        setMsg(e.message || "Erreur");
      }
    })();
  }, [sp, router]);

  return (
    <div style={{maxWidth:600, margin:"40px auto", fontFamily:"system-ui"}}>
      <h1>Activation Premium</h1>
      {status === "loading" && <p>Validation en cours…</p>}
      {status === "ok" && <p style={{color:"green"}}>{msg}</p>}
      {status === "error" && <p style={{color:"crimson"}}>{msg}</p>}
    </div>
  );
}