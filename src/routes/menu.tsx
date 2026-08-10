import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { Reveal } from "@/components/site/reveal";
import { MENU_CATEGORIES, RESTAURANT } from "@/data/site";
import { cn } from "@/lib/utils";

const TITLE = "Menu | Soghaat Cuisine — Desi & BBQ Restaurant in Multan";
const DESC =
  "Browse the menu categories at Soghaat Cuisine, Gulgasht Colony Multan: karahi, BBQ and grills, rice, Chinese, fast food and more.";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/menu" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/menu" }],
  }),
  component: MenuPage,
});

function MenuPage() {
  const [active, setActive] = useState<string>(MENU_CATEGORIES[0]);
  const [query, setQuery] = useState("");

  const categories = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? MENU_CATEGORIES.filter((c) => c.toLowerCase().includes(q)) : MENU_CATEGORIES;
  }, [query]);

  return (
    <div className="min-h-dvh bg-background">
      <SiteNav />
      <main>
        <section className="grain bg-ink px-5 pt-36 pb-20 text-ink-foreground sm:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="eyebrow text-gold">Menu</p>
            <h1 className="mt-3 font-display text-5xl sm:text-6xl">The Soghaat Menu</h1>
            <p className="mt-5 max-w-2xl text-ink-foreground/75">
              Categories below reflect the kind of desi kitchen Soghaat Cuisine runs. Dish
              names, descriptions and prices are intentionally left blank until they are
              confirmed against the restaurant's own menu — nothing here is invented.
            </p>
          </div>
        </section>

        <div className="sticky top-16 z-40 border-b border-border bg-background/95 backdrop-blur">
          <div className="mx-auto max-w-7xl px-5 py-3 sm:px-8">
            <label className="flex items-center gap-3 rounded-full border border-border bg-card px-4 py-2.5">
              <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
              <span className="sr-only">Search the menu</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search menu categories…"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </label>
            <ul className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1">
              {categories.map((c) => (
                <li key={c}>
                  <button
                    type="button"
                    onClick={() => setActive(c)}
                    aria-pressed={active === c}
                    className={cn(
                      "min-h-11 rounded-full border px-5 text-sm whitespace-nowrap transition-colors",
                      active === c
                        ? "border-ink bg-ink text-ink-foreground"
                        : "border-border bg-card text-foreground hover:border-primary",
                    )}
                  >
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          {categories.length === 0 ? (
            <p className="text-muted-foreground">No category matches “{query}”.</p>
          ) : (
            <Reveal key={active}>
              <h2 className="text-4xl">{active}</h2>
              <div className="mt-6 rounded-3xl border border-dashed border-border bg-card p-8">
                <p className="eyebrow text-primary">Pending verification</p>
                <p className="mt-3 max-w-2xl leading-8 text-muted-foreground">
                  Items and prices for <strong>{active}</strong> will appear here once the
                  restaurant's official menu is supplied. Share a menu photo or list and
                  this section will fill in with dishes, descriptions, vegetarian markers
                  and signature badges.
                </p>
                <a
                  href={RESTAURANT.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-block rounded-full bg-ink px-6 py-3 text-sm tracking-widest text-ink-foreground uppercase"
                >
                  See dishes on Instagram
                </a>
              </div>
            </Reveal>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
