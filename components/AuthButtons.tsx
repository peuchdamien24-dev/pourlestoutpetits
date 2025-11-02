"use client";
import { useSession, signOut } from "next-auth/react";

export default function AuthButtons(){
  const { data, status } = useSession();
  if (status === "loading") return null;
  if (!data?.user) return (
    <div style={{display:"flex", gap:12}}>
      <a href="/signup">S’inscrire</a>
      <a href="/signin">Se connecter</a>
    </div>
  );
  return (
    <div style={{display:"flex", gap:12, alignItems:"center"}}>
      <span style={{color:"#666"}}>Bonjour {data.user.name || data.user.email}</span>
      <button onClick={()=>signOut()} style={{border:"1px solid #ccc", padding:"4px 8px", borderRadius:6}}>
        Se déconnecter
      </button>
    </div>
  );
}