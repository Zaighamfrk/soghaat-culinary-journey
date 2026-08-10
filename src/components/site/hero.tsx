import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { IMAGES, RESTAURANT } from "@/data/site";

export function Hero() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setOffset(window.scrollY * 0.25));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="relative isolate flex min-h-dvh items-center overflow-hidden bg-ink">
      <img
        src={IMAGES.heroFeast}
        alt="Placeholder photograph of a Pakistani feast with karahi, naan, rice and kebabs"
        width={1920}
        height={1280}
        fetchPriority="high"
        style={{ transform: `translate3d(0, ${offset}px, 0) scale(1.12)` }}
        className="absolute inset-0 -z-10 size-full object-cover will-change-transform"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/85 via-ink/60 to-ink"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-7xl px-5 pt-28 pb-28 sm:px-8">
        <p className="eyebrow text-gold">Multan · Pakistan</p>
        <h1 className="mt-5 max-w-4xl font-display text-5xl leading-[0.95] text-ink-foreground sm:text-7xl lg:text-8xl">
          Soghaat Cuisine
        </h1>
        <p className="mt-6 max-w-xl font-display text-2xl text-gold-soft italic sm:text-3xl">
          {RESTAURANT.tagline}
        </p>
        <p className="mt-5 max-w-xl text-ink-foreground/75">
          A Pakistani &amp; desi restaurant in A Block Gulgasht Colony, Multan — serving
          traditional flavours in a warm, family-friendly setting.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            to="/menu"
            className="rounded-full bg-gold px-8 py-4 text-sm tracking-widest text-ink uppercase transition-transform hover:-translate-y-0.5"
          >
            View Menu
          </Link>
          <Link
            to="/"
            hash="find-us"
            className="rounded-full border border-gold/50 px-8 py-4 text-sm tracking-widest text-ink-foreground uppercase transition-colors hover:bg-gold/15"
          >
            Find Us
          </Link>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-7 flex justify-center text-gold/70"
      >
        <ChevronDown className="size-6 animate-bounce" />
      </div>
    </section>
  );
}
