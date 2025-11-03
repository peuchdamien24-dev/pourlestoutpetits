export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main style={{padding:20,fontFamily:'system-ui, sans-serif'}}>
      <h1>Pour les Tout Petits</h1>
      <p>Accueil en ligne ✅</p>
      <ul>
        <li><a href="/sell">Vendre</a></li>
        <li><a href="/premium">Premium</a></li>
        <li><a href="/signin">Se connecter</a></li>
      </ul>
    </main>
  );
}
