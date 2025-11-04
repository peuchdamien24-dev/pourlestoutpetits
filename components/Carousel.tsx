"use client";
import { useEffect, useRef, useState } from "react";

type Slide = { src: string; alt: string; caption?: string };
type Props = {
  slides: Slide[];
  intervalMs?: number;
  className?: string;
};

export default function Carousel({ slides, intervalMs = 4000, className = "" }: Props) {
  const [index, setIndex] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const count = slides.length;

  useEffect(() => {
    if (count <= 1) return;
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, intervalMs);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [count, intervalMs]);

  const goTo = (i: number) => setIndex((i + count) % count);
  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);

  return (
    <div className={"relative overflow-hidden rounded-3xl border border-gray-200 bg-white " + className} aria-roledescription="carousel">
      {/* Slides */}
      <div className="relative aspect-[16/9]">
        {slides.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"}`}
            aria-hidden={i !== index}
          >
            <img src={s.src} alt={s.alt} className="h-full w-full object-cover" />
            {s.caption && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                <p className="text-sm font-medium text-white drop-shadow">{s.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Controls */}
      {count > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border bg-white/80 px-3 py-2 text-sm shadow-sm hover:bg-white"
            aria-label="Précédent"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border bg-white/80 px-3 py-2 text-sm shadow-sm hover:bg-white"
            aria-label="Suivant"
          >
            ›
          </button>

          {/* Dots */}
          <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center gap-2">
            {slides.map((_, i) => (
              <span
                key={i}
                className={`h-2 w-2 rounded-full border border-white/70 ${i === index ? "bg-white" : "bg-white/50"}`}
                aria-hidden="true"
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}