import { Star } from "lucide-react";
import { site } from "@/lib/site";

const reviews = [
  {
    name: "Martina Dinková",
    initial: "M",
    text: "Kluci z KAPE si při čištění poradí i s těžko dostupnými místy. Naprostá spokojenost.",
  },
  {
    name: "David Bílý",
    initial: "D",
    text: "Profesionální úroveň servisu, kterou KAPE disponuje, je pro mě na prvním místě. Proto jejich služeb využívám opakovaně.",
  },
  {
    name: "Luboš Mašek",
    initial: "L",
    text: "Kvalitně odvedená práce za rozumnou cenu.",
  },
];

export function Reviews() {
  return (
    <section id="recenze" className="spray-field overflow-hidden">
      <div className="relative z-10 mx-auto max-w-[86rem] px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <h2 className="display-title max-w-3xl text-[clamp(2.2rem,5.5vw,4.2rem)] text-navy">
            Co o nás píšou zákazníci na Googlu
          </h2>
          <a
            href={site.googleReviews}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 text-sm font-semibold text-primary hover:underline"
          >
            Přečíst všechny recenze na Googlu
          </a>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {reviews.map((review) => (
            <article key={review.name} className="soft-card rounded-[1.8rem] p-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex size-11 items-center justify-center rounded-full bg-primary/10 text-base font-extrabold text-primary">
                  {review.initial}
                </span>
                <div>
                  <p className="font-semibold text-navy">{review.name}</p>
                  <p className="text-xs text-mist">Recenze z webu KAPE</p>
                </div>
              </div>
              <div className="mt-4 flex gap-0.5 text-[#f4b400]" aria-label="5 z 5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="size-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-6 text-navy/80">„{review.text}“</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
