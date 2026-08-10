import { useState } from "react";
import { Mail, MessageCircle } from "lucide-react";
import { z } from "zod";
import { CONTACT, mailtoUrl, whatsappUrl } from "@/data/site";
import { Reveal } from "./reveal";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  phone: z.string().trim().min(6, "Please enter a contact number").max(30),
  guests: z.coerce.number().int().min(1, "At least 1 guest").max(60),
  date: z.string().trim().min(1, "Please pick a date").max(20),
  time: z.string().trim().min(1, "Please pick a time").max(20),
  notes: z.string().trim().max(500).optional(),
});

type Values = z.infer<typeof schema>;

const buildMessage = (v: Values) =>
  [
    "Reservation request — Soghaat Cuisine",
    `Name: ${v.name}`,
    `Contact: ${v.phone}`,
    `Guests: ${v.guests}`,
    `Preferred date: ${v.date}`,
    `Preferred time: ${v.time}`,
    v.notes ? `Notes: ${v.notes}` : "",
    "",
    "(Sent from the Soghaat Cuisine website — please confirm availability.)",
  ]
    .filter(Boolean)
    .join("\n");

export function Reservation() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = (event: React.FormEvent<HTMLFormElement>, channel: "whatsapp" | "email") => {
    event.preventDefault();
    const raw = Object.fromEntries(new FormData(event.currentTarget));
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    const message = buildMessage(parsed.data);
    const href =
      channel === "whatsapp"
        ? whatsappUrl(message)
        : mailtoUrl("Reservation request — Soghaat Cuisine", message);
    window.open(href, "_blank", "noopener,noreferrer");
  };

  const field =
    "mt-2 w-full rounded-xl border border-gold/25 bg-ink/40 px-4 py-3 text-ink-foreground outline-none placeholder:text-ink-foreground/40 focus:border-gold";
  const label = "eyebrow text-ink-foreground/60";

  return (
    <section id="reserve" className="grain bg-ink py-24 text-ink-foreground sm:py-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal className="text-center">
          <p className="eyebrow text-gold">Reservations</p>
          <h2 className="mt-3 text-4xl sm:text-5xl">Request a Table</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-ink-foreground/70">
            This form doesn't book a table automatically — it opens WhatsApp or your email
            with the details filled in, and the restaurant confirms availability directly.
            Opening hours are not published here because they haven't been verified.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <form
            onSubmit={(e) => submit(e, "whatsapp")}
            className="mt-10 rounded-3xl border border-gold/20 bg-ink/60 p-6 backdrop-blur-sm sm:p-8"
            noValidate
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={label} htmlFor="res-name">
                  Name
                </label>
                <input id="res-name" name="name" maxLength={80} className={field} placeholder="Your name" />
                {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
              </div>
              <div>
                <label className={label} htmlFor="res-phone">
                  Contact number
                </label>
                <input id="res-phone" name="phone" maxLength={30} className={field} placeholder="+92 ..." />
                {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
              </div>
              <div>
                <label className={label} htmlFor="res-date">
                  Preferred date
                </label>
                <input id="res-date" name="date" type="date" className={field} />
                {errors.date && <p className="mt-1 text-xs text-destructive">{errors.date}</p>}
              </div>
              <div>
                <label className={label} htmlFor="res-time">
                  Preferred time
                </label>
                <input id="res-time" name="time" type="time" className={field} />
                {errors.time && <p className="mt-1 text-xs text-destructive">{errors.time}</p>}
              </div>
              <div>
                <label className={label} htmlFor="res-guests">
                  Guests
                </label>
                <input
                  id="res-guests"
                  name="guests"
                  type="number"
                  min={1}
                  max={60}
                  defaultValue={2}
                  className={field}
                />
                {errors.guests && <p className="mt-1 text-xs text-destructive">{errors.guests}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className={label} htmlFor="res-notes">
                  Notes (optional)
                </label>
                <textarea
                  id="res-notes"
                  name="notes"
                  rows={3}
                  maxLength={500}
                  className={field}
                  placeholder="Seating preference, occasion, dietary notes…"
                />
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 text-sm tracking-widest text-ink uppercase transition-transform hover:-translate-y-0.5"
              >
                <MessageCircle className="size-4" aria-hidden="true" /> Send on WhatsApp
              </button>
              <button
                type="button"
                onClick={(e) =>
                  submit(
                    { preventDefault: () => {}, currentTarget: e.currentTarget.form! } as unknown as React.FormEvent<HTMLFormElement>,
                    "email",
                  )
                }
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-gold/50 px-8 py-4 text-sm tracking-widest uppercase transition-colors hover:bg-gold/15"
              >
                <Mail className="size-4" aria-hidden="true" /> Send by email
              </button>
            </div>
            <p className="mt-4 text-center text-xs text-ink-foreground/45">
              Requests go to {CONTACT.whatsapp} / {CONTACT.email}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
