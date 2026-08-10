import { MapPin, Navigation } from "lucide-react";
import { DIRECTIONS_URL, MAP_EMBED_URL, RESTAURANT } from "@/data/site";
import { Reveal } from "./reveal";

export function FindUs() {
  return (
    <section id="find-us" className="bg-secondary py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_1.3fr] lg:items-center">
        <Reveal>
          <p className="eyebrow text-primary">Find Us</p>
          <h2 className="mt-3 text-4xl sm:text-5xl">Gulgasht Colony, Multan</h2>
          <address className="mt-6 flex items-start gap-3 text-lg leading-8 not-italic">
            <MapPin className="mt-1.5 size-5 shrink-0 text-primary" aria-hidden="true" />
            <span>
              <strong className="font-display text-2xl">{RESTAURANT.name}</strong>
              <br />
              {RESTAURANT.street}
              <br />
              {RESTAURANT.city}, {RESTAURANT.country}
            </span>
          </address>
          <a
            href={DIRECTIONS_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm tracking-widest text-ink-foreground uppercase transition-transform hover:-translate-y-0.5"
          >
            <Navigation className="size-4" aria-hidden="true" /> Get Directions
          </a>
        </Reveal>

        <Reveal delay={120} className="overflow-hidden rounded-3xl border border-border shadow-lg">
          <iframe
            title={`Google Map showing ${RESTAURANT.name} in Gulgasht Colony, Multan`}
            src={MAP_EMBED_URL}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[380px] w-full border-0 sm:h-[460px]"
          />
        </Reveal>
      </div>
    </section>
  );
}
