'use client';
export default function PremiumPage(){
  async function go(tier: 'starter'|'pro'|'power'){
    const r = await fetch('/api/subscription/checkout', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ tier }) });
    const j = await r.json(); if (j.url) location.href = j.url;
  }
  return (
    <div style={{ maxWidth: 720 }}>
      <h1>Premium</h1>
      <p>Boostez vos ventes et réduisez vos frais.</p>
      <div style={{ display:'grid', gap:12 }}>
        <button onClick={()=>go('starter')}>Starter 4,99 €/mois</button>
        <button onClick={()=>go('pro')}>Pro 9,99 €/mois</button>
        <button onClick={()=>go('power')}>Power 19,99 €/mois</button>
      </div>
    </div>
  );
}
