"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [form, setForm] = useState({ email:"", password:"", name:"", isSeller:true });
  const [err, setErr] = useState<string>();
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setErr(undefined);
    const r = await fetch("/api/auth/signup", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify(form) });
    if (r.ok) router.push("/signin"); else { const j = await r.json(); setErr(j.error || "Erreur"); }
  }
  return (
    <div style={{ maxWidth: 480, margin: "40px auto" }}>
      <h1>Créer un compte</h1>
      <form onSubmit={submit} style={{ display:"grid", gap:12 }}>
        <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required />
        <input type="password" placeholder="Mot de passe (min 8)" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} required />
        <input placeholder="Nom (optionnel)" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
        <label style={{ display:"flex", gap:8, alignItems:"center" }}>
          <input type="checkbox" checked={form.isSeller} onChange={e=>setForm({...form, isSeller:e.target.checked})} />
          Je veux vendre (compte vendeur)
        </label>
        <button>S’inscrire</button>
      </form>
      {err && <p style={{ color:"crimson" }}>{err}</p>}
      <p style={{ marginTop:12 }}>Déjà inscrit ? <a href="/signin">Se connecter</a></p>
    </div>
  );
}