"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [email, setEmail] = useState(""); const [password, setPassword] = useState("");
  const [err, setErr] = useState<string>(); const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setErr(undefined);
    const r = await signIn("credentials", { redirect: false, email, password });
    if (r?.ok) router.push("/"); else setErr("Identifiants invalides");
  }
  return (
    <div style={{ maxWidth: 420, margin: "40px auto" }}>
      <h1>Connexion</h1>
      <form onSubmit={submit} style={{ display:"grid", gap:12 }}>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input type="password" placeholder="Mot de passe" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button>Se connecter</button>
      </form>
      {err && <p style={{ color:"crimson" }}>{err}</p>}
      <p style={{ marginTop:12 }}>Pas de compte ? <a href="/signup">S’inscrire</a></p>
    </div>
  );
}
