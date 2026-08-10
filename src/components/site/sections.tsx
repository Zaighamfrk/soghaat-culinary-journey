import { Instagram, Navigation, Users, UtensilsCrossed, PartyPopper } from "lucide-react";
import { DIRECTIONS_URL, GALLERY, IMAGES, RESTAURANT } from "@/data/site";
import { Reveal } from "./reveal";

export function Story() {
  return (
    <section id="story" className="bg-background py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
        <Reveal className="overflow-hidden rounded-[2rem]">
          <img
            src={IMAGES.story}
            alt="Placeholder photograph of naan and a clay bowl of curry served at a table"
            loading="lazy"
            width={1200}
            height={1504}
            className="h-full w-full object-cover"
          />
        </Reveal>
        <Reveal delay={120}>
          <p className="eyebrow text-primary">Our Story</p>
          <h2 className="mt-3 text-4xl leading-tight sm:text-5xl">
            A Taste Worth Gathering For
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-8 text-muted-foreground">
            <p>
              Soghaat Cuisine is a Pakistani and desi restaurant in A Block Gulgasht
              Colony, Multan — a place built around familiar, home-style flavours and the
              simple pleasure of eating together.
            </p>
            <p>
              We're keeping this page free of invented history and claims. Details about
              the kitchen, the team and the full story will be published here once
              confirmed directly with the restaurant.
            </p>
          </div>
          <div className="pattern-band mt-8 h-px w-40" aria-hidden="true" />
        </Reveal>
      </div>
    </section>
  );
}

const EXPERIENCES = [
  {
    icon: Users,
    title: "Family Dining",
    body: "A comfortable setting for families and groups sharing a meal together.",
  },
  {
    icon: UtensilsCrossed,
    title: "Authentic Pakistani Cuisine",
    body: "Traditional desi flavours — karahi, grills and rice dishes cooked the familiar way.",
  },
  {
    icon: PartyPopper,
    title: "Gather & Celebrate",
    body: "Room for get-togethers over a shared table. Group booking details to be confirmed.",
  },
];

export function Experience() {
  return (
    <section id="experience" className="relative isolate overflow-hidden bg-ink py-24 text-ink-foreground sm:py-32">
      <img
        src={IMAGES.interior}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 -z-10 size-full object-cover opacity-25"
      />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-gold">The Experience</p>
          <h2 className="mt-3 text-4xl sm:text-5xl">Dining at Soghaat</h2>
        </Reveal>
        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {EXPERIENCES.map((e, i) => (
            <Reveal as="li" key={e.title} delay={i * 100}>
              <div className="h-full rounded-3xl border border-gold/20 bg-ink/70 p-8 backdrop-blur-sm transition-transform duration-500 hover:-translate-y-1.5">
                <e.icon className="size-7 text-gold" aria-hidden="true" />
                <h3 className="mt-5 font-display text-2xl">{e.title}</h3>
                <p className="mt-3 text-sm leading-7 text-ink-foreground/70">{e.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function FromOurKitchen() {
  return (
    <section className="bg-secondary py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="text-center">
          <p className="eyebrow text-primary">Instagram</p>
          <h2 className="mt-3 text-4xl sm:text-5xl">From Our Kitchen</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            This grid is manually curated — no simulated Instagram posts. Swap in the
            latest photographs from @soghaatcuisine any time.
          </p>
        </Reveal>
        <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {GALLERY.map((img, i) => (
            <Reveal as="li" key={`k-${img.src}`} delay={i * 50}>
              <a
                href={RESTAURANT.instagram}
                target="_blank"
                rel="noreferrer"
                className="group block aspect-square overflow-hidden rounded-2xl"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ContactCta() {
  return (
    <section id="contact" className="grain bg-ink py-24 text-ink-foreground sm:py-32">
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Reveal>
          <p className="eyebrow text-gold">Contact</p>
          <h2 className="mt-3 text-5xl sm:text-6xl">Come Dine With Us</h2>
          <p className="mt-6 text-ink-foreground/75">
            {RESTAURANT.street}, {RESTAURANT.city}, {RESTAURANT.country}
          </p>
          <p className="mt-3 text-sm text-ink-foreground/55">
            Phone, WhatsApp, opening hours and reservation details are not shown because
            they have not been verified. Send them over and they'll appear here as
            call-to-action buttons.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-sm tracking-widest text-ink uppercase transition-transform hover:-translate-y-0.5"
            >
              <Navigation className="size-4" aria-hidden="true" /> Get Directions
            </a>
            <a
              href={RESTAURANT.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-gold/50 px-8 py-4 text-sm tracking-widest uppercase transition-colors hover:bg-gold/15"
            >
              <Instagram className="size-4" aria-hidden="true" /> Message on Instagram
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
