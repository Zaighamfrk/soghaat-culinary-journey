import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Mail, Minus, MessageCircle, Plus, Search, ShoppingBag, X } from "lucide-react";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { Reveal } from "@/components/site/reveal";
import {
  CONTACT,
  MENU_CATEGORIES,
  MENU_ITEMS,
  formatPrice,
  mailtoUrl,
  whatsappUrl,
  type MenuItem,
} from "@/data/site";
import { cn } from "@/lib/utils";

const TITLE = "Menu & Order | Soghaat Cuisine — Desi & BBQ Restaurant in Multan";
const DESC =
  "Browse sample dishes at Soghaat Cuisine, Gulgasht Colony Multan — karahi, BBQ, biryani and more — and send your order straight to WhatsApp or email.";

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

type Cart = Record<string, number>;

function MenuPage() {
  const [active, setActive] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<Cart>({});
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const tabs = useMemo(() => ["All", ...MENU_CATEGORIES], []);

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MENU_ITEMS.filter(
      (i) =>
        (active === "All" || i.category === active) &&
        (!q ||
          i.name.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q)),
    );
  }, [active, query]);

  const lines = useMemo(
    () =>
      Object.entries(cart)
        .map(([id, qty]) => ({ item: MENU_ITEMS.find((i) => i.id === id)!, qty }))
        .filter((l) => l.item && l.qty > 0),
    [cart],
  );
  const total = lines.reduce((sum, l) => sum + l.item.price * l.qty, 0);
  const count = lines.reduce((sum, l) => sum + l.qty, 0);

  const add = (item: MenuItem) =>
    setCart((c) => ({ ...c, [item.id]: (c[item.id] ?? 0) + 1 }));
  const remove = (item: MenuItem) =>
    setCart((c) => ({ ...c, [item.id]: Math.max(0, (c[item.id] ?? 0) - 1) }));

  return (
    <div className="min-h-dvh bg-background">
      <SiteNav />
      <main>
        <section className="grain bg-ink px-5 pt-36 pb-20 text-ink-foreground sm:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="eyebrow text-gold">Menu</p>
            <h1 className="mt-3 font-display text-5xl sm:text-6xl">The Soghaat Menu</h1>
            <p className="mt-5 max-w-2xl text-ink-foreground/75">
              A sample selection of Pakistani dishes with placeholder prices. Dish names
              and prices below are <strong>not yet confirmed</strong> by the restaurant —
              share the official menu and they'll be swapped in exactly.
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
                maxLength={60}
                placeholder="Search dishes…"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </label>
            <ul className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1">
              {tabs.map((c) => (
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

        <section className="mx-auto max-w-7xl px-5 py-16 pb-32 sm:px-8">
          {items.length === 0 ? (
            <p className="text-muted-foreground">
              No dish matches this selection yet. More items will be added once the
              official menu is confirmed.
            </p>
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item, i) => (
                <Reveal as="li" key={item.id} delay={(i % 3) * 80}>
                  <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={`${item.name} — placeholder photograph`}
                        loading="lazy"
                        className="h-44 w-full object-cover"
                      />
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-start justify-between gap-3">
                        <h2 className="font-display text-2xl">{item.name}</h2>
                        {item.signature && (
                          <span className="eyebrow rounded-full bg-primary/10 px-3 py-1 text-primary">
                            Signature
                          </span>
                        )}
                      </div>
                      <p className="mt-2 text-sm leading-7 text-muted-foreground">
                        {item.description}
                      </p>
                      <div className="mt-auto flex items-center justify-between pt-6">
                        <span className="font-display text-xl">
                          {formatPrice(item.price)}
                          <span className="ml-2 text-xs tracking-wide text-muted-foreground uppercase">
                            approx.
                          </span>
                        </span>
                        {(cart[item.id] ?? 0) > 0 ? (
                          <div className="flex items-center gap-3 rounded-full border border-border px-2 py-1">
                            <button
                              type="button"
                              onClick={() => remove(item)}
                              aria-label={`Remove one ${item.name}`}
                              className="grid size-8 place-items-center rounded-full hover:bg-secondary"
                            >
                              <Minus className="size-4" />
                            </button>
                            <span className="min-w-4 text-center text-sm">{cart[item.id]}</span>
                            <button
                              type="button"
                              onClick={() => add(item)}
                              aria-label={`Add one ${item.name}`}
                              className="grid size-8 place-items-center rounded-full hover:bg-secondary"
                            >
                              <Plus className="size-4" />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => add(item)}
                            className="rounded-full bg-ink px-5 py-2.5 text-xs tracking-widest text-ink-foreground uppercase transition-transform hover:-translate-y-0.5"
                          >
                            Add
                          </button>
                        )}
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </ul>
          )}
        </section>
      </main>

      {count > 0 && !checkoutOpen && (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-gold/20 bg-ink/95 px-5 py-4 backdrop-blur sm:px-8">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            <p className="text-sm text-ink-foreground">
              <ShoppingBag className="mr-2 inline size-4 text-gold" aria-hidden="true" />
              {count} item{count > 1 ? "s" : ""} · {formatPrice(total)}
            </p>
            <button
              type="button"
              onClick={() => setCheckoutOpen(true)}
              className="rounded-full bg-gold px-7 py-3 text-xs tracking-widest text-ink uppercase"
            >
              Checkout
            </button>
          </div>
        </div>
      )}

      {checkoutOpen && (
        <Checkout
          lines={lines}
          total={total}
          onClose={() => setCheckoutOpen(false)}
          onClear={() => {
            setCart({});
            setCheckoutOpen(false);
          }}
        />
      )}

      <SiteFooter />
    </div>
  );
}

type Line = { item: MenuItem; qty: number };

function Checkout({
  lines,
  total,
  onClose,
  onClear,
}: {
  lines: Line[];
  total: number;
  onClose: () => void;
  onClear: () => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [mode, setMode] = useState<"pickup" | "dine-in">("pickup");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const message = [
    "Order request — Soghaat Cuisine",
    `Name: ${name.trim()}`,
    `Contact: ${phone.trim()}`,
    `Type: ${mode === "pickup" ? "Pickup" : "Dine-in"}`,
    "",
    ...lines.map((l) => `${l.qty} × ${l.item.name} — ${formatPrice(l.item.price * l.qty)}`),
    "",
    `Estimated total: ${formatPrice(total)} (prices from the website are unconfirmed)`,
    notes.trim() ? `Notes: ${notes.trim()}` : "",
    "",
    "(Sent from the Soghaat Cuisine website — please confirm the order and total.)",
  ]
    .filter(Boolean)
    .join("\n");

  const send = (channel: "whatsapp" | "email") => {
    if (name.trim().length < 2 || phone.trim().length < 6) {
      setError("Please add your name and a contact number.");
      return;
    }
    setError("");
    const href =
      channel === "whatsapp"
        ? whatsappUrl(message)
        : mailtoUrl("Order request — Soghaat Cuisine", message);
    window.open(href, "_blank", "noopener,noreferrer");
  };

  const field =
    "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary";

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/70 backdrop-blur-sm sm:items-center">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Checkout"
        className="max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-card p-6 sm:rounded-3xl sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow text-primary">Checkout</p>
            <h2 className="mt-2 font-display text-3xl">Send your order</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close checkout"
            className="grid size-10 place-items-center rounded-full border border-border"
          >
            <X className="size-4" />
          </button>
        </div>

        <p className="mt-4 text-xs leading-6 text-muted-foreground">
          No online payment is taken here. Your order is sent to the restaurant on WhatsApp
          or by email; they confirm availability, the final total and timing.
        </p>

        <ul className="mt-5 divide-y divide-border rounded-2xl border border-border">
          {lines.map((l) => (
            <li key={l.item.id} className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
              <span>
                {l.qty} × {l.item.name}
              </span>
              <span className="font-display text-base">{formatPrice(l.item.price * l.qty)}</span>
            </li>
          ))}
          <li className="flex items-center justify-between gap-3 bg-secondary px-4 py-3">
            <span className="eyebrow">Estimated total</span>
            <span className="font-display text-xl">{formatPrice(total)}</span>
          </li>
        </ul>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="eyebrow text-muted-foreground" htmlFor="co-name">
              Name
            </label>
            <input
              id="co-name"
              value={name}
              maxLength={80}
              onChange={(e) => setName(e.target.value)}
              className={field}
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="eyebrow text-muted-foreground" htmlFor="co-phone">
              Contact number
            </label>
            <input
              id="co-phone"
              value={phone}
              maxLength={30}
              onChange={(e) => setPhone(e.target.value)}
              className={field}
              placeholder="+92 ..."
            />
          </div>
          <div className="sm:col-span-2">
            <span className="eyebrow text-muted-foreground">Order type</span>
            <div className="mt-2 flex gap-2">
              {(["pickup", "dine-in"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  aria-pressed={mode === m}
                  className={cn(
                    "min-h-11 flex-1 rounded-full border px-4 text-sm capitalize transition-colors",
                    mode === m
                      ? "border-ink bg-ink text-ink-foreground"
                      : "border-border bg-background",
                  )}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
          <div className="sm:col-span-2">
            <label className="eyebrow text-muted-foreground" htmlFor="co-notes">
              Notes (optional)
            </label>
            <textarea
              id="co-notes"
              value={notes}
              rows={2}
              maxLength={500}
              onChange={(e) => setNotes(e.target.value)}
              className={field}
              placeholder="Spice level, pickup time, allergies…"
            />
          </div>
        </div>

        {error && <p className="mt-3 text-xs text-destructive">{error}</p>}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => send("whatsapp")}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-ink px-6 py-4 text-xs tracking-widest text-ink-foreground uppercase"
          >
            <MessageCircle className="size-4" aria-hidden="true" /> WhatsApp
          </button>
          <button
            type="button"
            onClick={() => send("email")}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-border px-6 py-4 text-xs tracking-widest uppercase"
          >
            <Mail className="size-4" aria-hidden="true" /> Email
          </button>
        </div>
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <button type="button" onClick={onClear} className="underline underline-offset-4">
            Clear order
          </button>
          <span>
            {CONTACT.whatsapp} · {CONTACT.email}
          </span>
        </div>
      </div>
    </div>
  );
}
