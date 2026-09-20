"use client";

import Image from "next/image";
import { useState } from "react";
import { Plus } from "lucide-react";
import { photos } from "@/lib/photos";
import { cn } from "@/lib/utils";

const services = [
  {
    id: "okna",
    title: "Okna a výlohy",
    badge: "PuraQleen",
    badgeTone: "default" as const,
    image: photos.showroom,
    lead: "Výšková okna, prosklené vstupy a výlohy obchodů i autosalonů. Myjeme za provozu, zákazníci chodí dál a vjezd zůstává volný.",
    points: ["demineralizovaná voda", "bez šmouh a leštění", "za plného provozu"],
  },
  {
    id: "fasady",
    title: "Skleněné a hladké fasády",
    badge: "PuraQleen",
    badgeTone: "default" as const,
    image: photos.roka,
    lead: "Skleněné, plastové i další hladké fasády myjeme ze země. Bez map, bez lešení a bez omezení okolí budovy.",
    points: ["hladké fasády i výlohy", "sklo uschne samo", "bez vysokozdvižné techniky"],
  },
  {
    id: "oplaste",
    title: "Opláštění průmyslových budov",
    badge: "Kränzle + Oertzen",
    badgeTone: "heat" as const,
    image: photos.facadePole,
    lead: "Horká voda pod tlakem vrátí opláštění hal původní barvu. Sestava je soběstačná i bez elektrické přípojky.",
    points: ["250 bar", "až 120 °C", "16 l/min"],
  },
  {
    id: "interiery",
    title: "Interiéry hal ve výškách",
    badge: "SpaceVac",
    badgeTone: "default" as const,
    image: photos.hall,
    lead: "Prach, nečistoty a pavučiny ze stěn, stropů, konstrukcí i vzduchotechniky. Pod námi se dál vyrábí, prodává nebo sportuje.",
    points: ["dosah 15 m", "bez plošiny a lešení", "provoz bez přerušení"],
  },
  {
    id: "postavebni",
    title: "Postavební úklidy",
    badge: "S plošinou",
    badgeTone: "default" as const,
    image: photos.elevator,
    lead: "Po stavbě i rekonstrukci uklidíme tam, kam běžný úklid nedosáhne — včetně výtahových šachet, hal a výloh.",
    points: ["haly a stadiony", "výtahové šachty", "kde je potřeba, přijedeme s plošinou"],
  },
  {
    id: "dlazba",
    title: "Dlažba, garáže a střechy",
    badge: "Nově",
    badgeTone: "new" as const,
    image: photos.terrace,
    lead: "Nově čistíme zámkovou dlažbu, garážová stání i střechy. Šedý povrch a mech ve spárách nahradí jednotný, čistý vjezd.",
    points: ["zámková dlažba", "garážová stání", "střechy"],
  },
  {
    id: "solary",
    title: "Solární panely",
    badge: "PuraQleen",
    badgeTone: "default" as const,
    image: photos.signage,
    lead: "Demineralizovanou vodou omyjeme solární panely bez šmouh a bez poškození povrchu. Čistý panel zase vyrábí, jak má.",
    points: ["šetrné mytí", "bez minerálních map", "ze země i ze střechy"],
  },
];

export function Services() {
  const [active, setActive] = useState(services[0].id);
  const current = services.find((item) => item.id === active) ?? services[0];

  return (
    <section id="co-cistime" className="spray-field overflow-hidden">
      <div className="spray-band top-16" />
      <div className="relative z-10 mx-auto max-w-[86rem] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="max-w-3xl">
          <h2 className="display-title text-[clamp(2.4rem,6vw,4.8rem)] text-navy">
            Co pro vás vyčistíme
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-mist sm:text-lg">
            Všude tam, kam běžnými prostředky nedosáhnete. Většinu zvládneme ze
            země, a kde to nejde, přijedeme s plošinou.
          </p>
        </div>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-[1fr_1.05fr]">
          <div className="divide-y divide-black/8">
            {services.map((item) => {
              const selected = item.id === active;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActive(item.id)}
                  aria-expanded={selected}
                  className="flex w-full items-center gap-3 py-5 text-left"
                >
                  <span
                    className={cn(
                      "flex-1 display-title text-[clamp(1.45rem,3vw,2.15rem)] transition-colors",
                      selected ? "text-navy" : "text-navy/80"
                    )}
                  >
                    {item.title}
                  </span>
                  <Badge tone={item.badgeTone}>{item.badge}</Badge>
                  <span
                    className={cn(
                      "inline-flex size-10 shrink-0 items-center justify-center rounded-full ring-1 transition-colors",
                      selected
                        ? "bg-navy text-white ring-navy"
                        : "bg-white text-navy ring-black/8"
                    )}
                  >
                    <Plus
                      className={cn(
                        "size-4 transition-transform",
                        selected && "rotate-45"
                      )}
                    />
                  </span>
                </button>
              );
            })}
          </div>

          <article className="soft-card overflow-hidden rounded-[2rem]">
            <div className="relative aspect-[16/11]">
              <Image
                src={current.image.src}
                alt={current.image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 44vw"
                className="object-cover"
              />
            </div>
            <div className="p-6 sm:p-8">
              <p className="text-sm font-semibold text-mist">{current.badge}</p>
              <h3 className="mt-2 display-title text-[clamp(2rem,4vw,3.2rem)] text-primary">
                {current.title}
              </h3>
              <p className="mt-4 text-base leading-7 text-mist">{current.lead}</p>
              <ul className="mt-6 divide-y divide-black/8 border-t border-black/8">
                {current.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-3 py-3 text-navy"
                  >
                    <span className="size-2 rounded-full bg-primary" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function Badge({
  children,
  tone,
}: {
  children: string;
  tone: "default" | "heat" | "new";
}) {
  return (
    <span
      className={cn(
        "hidden rounded-full px-3 py-1 text-xs font-semibold sm:inline-flex",
        tone === "new" && "bg-[#fff1e4] text-[#c05612]",
        tone === "heat" && "bg-[#fff1ea] text-heat",
        tone === "default" && "bg-ice text-navy/70"
      )}
    >
      {children}
    </span>
  );
}
