import { Link } from "@tanstack/react-router";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SIGNATURE_DISHES } from "@/data/site";
import { Reveal } from "./reveal";

export function SignatureDishes() {
  const trackRef = useRef<HTMLUListElement | null>(null);

  const scrollBy = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <section id="dishes" className="grain bg-ink py-24 text-ink-foreground sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
          <Reveal className="min-w-0">
            <p className="eyebrow text-gold">Signature</p>
            <h2 className="mt-3 text-4xl sm:text-5xl">What we cook best</h2>
          </Reveal>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Scroll dishes left"
              className="grid size-11 place-items-center rounded-full border border-gold/40 transition-colors hover:bg-gold hover:text-ink"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Scroll dishes right"
              className="grid size-11 place-items-center rounded-full border border-gold/40 transition-colors hover:bg-gold hover:text-ink"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        <ul
          ref={trackRef}
          className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4"
        >
          {SIGNATURE_DISHES.map((dish, i) => (
            <Reveal
              as="li"
              key={dish.id}
              delay={i * 80}
              className="w-[78vw] shrink-0 snap-start sm:w-[46vw] lg:w-[26rem]"
            >
              <article className="group h-full overflow-hidden rounded-3xl border border-gold/15 bg-white/[0.03] transition-transform duration-500 hover:-translate-y-2">
                <div className="aspect-4/3 overflow-hidden">
                  <img
                    src={dish.image}
                    alt={`Placeholder photograph representing ${dish.name}`}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl">{dish.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-foreground/70">{dish.note}</p>
                  <Link
                    to="/menu"
                    className="mt-5 inline-block text-sm tracking-widest text-gold uppercase underline-offset-8 hover:underline"
                  >
                    View menu
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
        <p className="mt-2 text-xs text-ink-foreground/50">
          Swipe or drag to browse. Dish names and prices are pending confirmation from the
          restaurant.
        </p>
      </div>
    </section>
  );
}
