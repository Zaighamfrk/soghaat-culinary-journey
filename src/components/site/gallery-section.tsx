import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Instagram, X } from "lucide-react";
import { GALLERY, RESTAURANT } from "@/data/site";
import { Reveal } from "./reveal";

export function GallerySection() {
  const [index, setIndex] = useState<number | null>(null);
  const [touchX, setTouchX] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (d: number) => setIndex((i) => (i === null ? i : (i + d + GALLERY.length) % GALLERY.length)),
    [],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, close, step]);

  return (
    <section id="gallery" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-primary">Gallery</p>
          <h2 className="mt-3 text-4xl sm:text-5xl">From the pass</h2>
          <p className="mt-4 text-muted-foreground">
            Placeholder photography while authentic Soghaat Cuisine images are collected
            from the restaurant's own Instagram feed.
          </p>
        </Reveal>

        <div className="mt-12 columns-2 gap-4 md:columns-3 [&>*]:mb-4">
          {GALLERY.map((img, i) => (
            <Reveal key={img.src} delay={i * 60} className="break-inside-avoid">
              <button
                type="button"
                onClick={() => setIndex(i)}
                className="group block w-full overflow-hidden rounded-2xl"
                aria-label={`Open image ${i + 1} of ${GALLERY.length}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </button>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href={RESTAURANT.instagram}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3 text-sm tracking-widest text-ink-foreground uppercase transition-transform hover:-translate-y-0.5"
          >
            <Instagram className="size-4" aria-hidden="true" /> Follow @soghaatcuisine
          </a>
        </div>
      </div>

      {index !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/95 p-4"
          onClick={close}
          onTouchStart={(e) => setTouchX(e.touches[0]?.clientX ?? null)}
          onTouchEnd={(e) => {
            if (touchX === null) return;
            const dx = (e.changedTouches[0]?.clientX ?? touchX) - touchX;
            if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
            setTouchX(null);
          }}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close image viewer"
            className="absolute top-5 right-5 grid size-11 place-items-center rounded-full border border-gold/40 text-ink-foreground"
          >
            <X className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            className="absolute left-3 grid size-11 place-items-center rounded-full border border-gold/40 text-ink-foreground sm:left-8"
          >
            <ChevronLeft className="size-5" />
          </button>
          <img
            src={GALLERY[index]?.src}
            alt={GALLERY[index]?.alt ?? ""}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] w-auto max-w-full rounded-xl object-contain"
          />
          <button
            type="button"
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            className="absolute right-3 grid size-11 place-items-center rounded-full border border-gold/40 text-ink-foreground sm:right-8"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      )}
    </section>
  );
}
