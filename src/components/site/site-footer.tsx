import { Link } from "@tanstack/react-router";
import { Instagram, MapPin } from "lucide-react";
import { DIRECTIONS_URL, RESTAURANT } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="grain bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-3">
        <div>
          <p className="font-display text-3xl">Soghaat Cuisine</p>
          <p className="eyebrow mt-2 text-gold">{RESTAURANT.tagline}</p>
        </div>
        <address className="text-sm leading-7 text-ink-foreground/75 not-italic">
          <span className="flex items-start gap-2">
            <MapPin className="mt-1 size-4 shrink-0 text-gold" aria-hidden="true" />
            <span>
              {RESTAURANT.street}
              <br />
              {RESTAURANT.city}, {RESTAURANT.country}
            </span>
          </span>
          <a
            href={DIRECTIONS_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block text-gold underline-offset-4 hover:underline"
          >
            Get directions
          </a>
        </address>
        <div className="text-sm text-ink-foreground/75">
          <a
            href={RESTAURANT.instagram}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-gold underline-offset-4 hover:underline"
          >
            <Instagram className="size-4" aria-hidden="true" /> @soghaatcuisine
          </a>
          <p className="mt-4">
            Phone number, opening hours and reservation details are not published here
            yet — they will be added once confirmed by the restaurant.
          </p>
          <Link to="/menu" className="mt-4 inline-block text-gold hover:underline">
            View the menu
          </Link>
        </div>
      </div>
      <div className="border-t border-gold/15 px-5 py-6 text-center text-xs text-ink-foreground/50 sm:px-8">
        © {new Date().getFullYear()} Soghaat Cuisine, Multan.
      </div>
    </footer>
  );
}
