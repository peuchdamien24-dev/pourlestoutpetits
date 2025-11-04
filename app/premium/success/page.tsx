"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function SuccessInner() {
  const router = useRouter();
  const params = useSearchParams();
  const [status, setStatus] = useState<"idle"|"ok"|"error">("idle");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const sessionId = params.get("session_id");
    if (!sessionId) {
      setStatus("error");
      setMsg("Session Stripe introuvable.");
      return;
    }
    (async () => {
      try {
        const res = await fetch("/api/subscription/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Erreur inconnue");
        setStatus("ok");
        setMsg("Abonnement activé ✅");
        setTimeout(() => router.replace("/premium"), 1500);
      } catch (e: any) {
        setStatus("error");
        setMsg(e?.message || "Erreur");
      }
    })();
  }, [params, router]);

  return (
    <main style={{ padding: 24 }}>
      <h1>Confirmation</h1>
      <p>{status === "idle" ? "Traitement..." : msg}</p>
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<main style={{padding:24}}>Chargement…</main>}>
      <SuccessInner />
    </Suspense>
  );
}
