import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { RESTAURANT } from "@/data/site";

const LINKS = [
  { label: "Home", to: "/", hash: undefined },
  { label: "Our Story", to: "/", hash: "story" },
  { label: "Menu", to: "/menu", hash: undefined },
  { label: "Gallery", to: "/", hash: "gallery" },
  { label: "Find Us", to: "/", hash: "find-us" },
  { label: "Contact", to: "/", hash: "contact" },
] as const;

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-gold/20 bg-ink/95 py-2 backdrop-blur-md"
          : "bg-gradient-to-b from-ink/80 to-transparent py-5",
      )}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 sm:px-8"
      >
        <Link
          to="/"
          className="min-w-0 leading-none text-ink-foreground"
          aria-label={`${RESTAURANT.name} home`}
        >
          <span className="block font-display text-xl tracking-wide sm:text-2xl">
            SOGHAAT
          </span>
          <span className="eyebrow block text-gold">Cuisine</span>
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {LINKS.map((l) => (
            <li key={l.label}>
              <Link
                to={l.to}
                {...(l.hash ? { hash: l.hash } : {})}
                className="text-sm tracking-wide text-ink-foreground/80 transition-colors hover:text-gold"
                activeOptions={{ exact: true }}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              to="/menu"
              className="rounded-full border border-gold/60 px-5 py-2 text-sm tracking-widest text-gold uppercase transition-colors hover:bg-gold hover:text-ink"
            >
              View Menu
            </Link>
          </li>
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid size-11 place-items-center rounded-full border border-gold/40 text-ink-foreground lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      <div
        id="mobile-nav"
        className={cn(
          "grid overflow-hidden bg-ink transition-[grid-template-rows,opacity] duration-400 lg:hidden",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <ul className="min-h-0 px-5 sm:px-8">
          {LINKS.map((l) => (
            <li key={l.label} className="border-b border-gold/10 last:border-0">
              <Link
                to={l.to}
                {...(l.hash ? { hash: l.hash } : {})}
                onClick={() => setOpen(false)}
                className="block py-4 font-display text-2xl text-ink-foreground"
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="py-5">
            <Link
              to="/menu"
              onClick={() => setOpen(false)}
              className="block rounded-full bg-gold px-5 py-3 text-center text-sm tracking-widest text-ink uppercase"
            >
              View Menu
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
