"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SellPage() {
  // (optionnel car on a le middleware) : garde côté client pour UX
  const { status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") router.replace("/signin");
  }, [status, router]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Mode",
    condition: "good",
    priceCents: 1000,
    city: "",
    photoUrl: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState<string | null>(null);

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] || null;
    setFile(f);
    setPreview(f ? URL.createObjectURL(f) : null);
  }

  async function uploadToCloudinary(f: File): Promise<string> {
    const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME;
    const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || process.env.CLOUDINARY_UPLOAD_PRESET;
    if (!cloud || !preset) throw new Error("Cloudinary non configuré (.env)");

    const fd = new FormData();
    fd.append("file", f);
    fd.append("upload_preset", preset);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/image/upload`, {
      method: "POST",
      body: fd,
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json?.error?.message || "Upload échoué");
    return json.secure_url as string;
  }

  async function createItem(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setDone(null);
    try {
      let photoUrl = form.photoUrl;
      if (file) {
        photoUrl = await uploadToCloudinary(file);
      }
      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, photoUrl, priceCents: Number(form.priceCents) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Erreur");
      setDone(data.id);
      // Reset minimal
      setForm({ ...form, title: "", description: "", priceCents: 1000, city: "", photoUrl: "" });
      setFile(null); setPreview(null);
    } catch (err: any) {
      alert(err.message || "Erreur");
    } finally {
      setLoading(false);
    }
  }

  if (status !== "authenticated") return null;

  return (
    <div style={{ maxWidth: 720 }}>
      <h1>Vendre un article</h1>
      <form onSubmit={createItem} style={{ display: "grid", gap: 12 }}>
        <input
          placeholder="Titre"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <div style={{ display: "flex", gap: 12 }}>
          <input
            placeholder="Catégorie"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
          />
          <input
            placeholder="État (good/new/...)"
            value={form.condition}
            onChange={(e) => setForm({ ...form, condition: e.target.value })}
            required
          />
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <input
            type="number"
            min={1}
            placeholder="Prix (€)"
            value={form.priceCents / 100}
            onChange={(e) => setForm({ ...form, priceCents: Math.round(Number(e.target.value) * 100) })}
            required
          />
          <input
            placeholder="Ville"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
          />
        </div>

        {/* Upload Cloudinary */}
        <div style={{ display: "grid", gap: 8 }}>
          <label>Photo</label>
          <input type="file" accept="image/*" onChange={onFileChange} />
          {preview ? (
            <img src={preview} alt="preview" style={{ width: 200, height: "auto", borderRadius: 8 }} />
          ) : (
            <input
              placeholder="…ou URL (https://...)"
              value={form.photoUrl}
              onChange={(e) => setForm({ ...form, photoUrl: e.target.value })}
            />
          )}
        </div>

        <button disabled={loading} style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #ccc" }}>
          {loading ? "Envoi..." : "Créer l’annonce"}
        </button>
      </form>

      {done && <p>Annonce créée ✅</p>}
    </div>
  );
}
export const dynamic = "force-dynamic";
