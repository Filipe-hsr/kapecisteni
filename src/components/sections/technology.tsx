"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "voda", label: "Voda" },
  { id: "vzduch", label: "Vzduch" },
  { id: "tlak", label: "Tlak a teplo" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function Technology() {
  const [tab, setTab] = useState<TabId>("voda");

  return (
    <section id="technologie" className="spray-field overflow-hidden">
      <div className="spray-band top-24" />
      <div className="spray-band bottom-32 opacity-70" />

      <div className="relative z-10 mx-auto max-w-[86rem] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="display-title text-[clamp(2.4rem,7vw,5.4rem)] text-navy">
            Voda. Vzduch. Tlak a teplo.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base text-mist sm:text-lg">
            Tři technologie, díky kterým u vás nemusí stát plošina ani lešení.
          </p>
        </div>

        <div className="mt-10 flex justify-center">
          <div
            className="inline-flex flex-wrap items-center justify-center gap-1 rounded-full bg-white p-1.5 shadow-[0_12px_40px_rgb(15_35_80/10%)]"
            role="tablist"
            aria-label="Technologie"
          >
            {tabs.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={tab === item.id}
                onClick={() => setTab(item.id)}
                className={cn(
                  "rounded-full px-5 py-2.5 text-sm font-semibold transition-colors sm:px-6",
                  tab === item.id
                    ? "bg-navy text-white"
                    : "text-navy/70 hover:bg-ice hover:text-navy"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10" role="tabpanel">
          {tab === "voda" ? <WaterCard /> : null}
          {tab === "vzduch" ? <AirCard /> : null}
          {tab === "tlak" ? <HeatCard /> : null}
        </div>
      </div>
    </section>
  );
}

function WaterCard() {
  return (
    <div className="soft-card grid overflow-hidden rounded-[2rem] lg:grid-cols-[1.05fr_0.95fr]">
      <div className="p-6 sm:p-10 lg:p-12">
        <p className="text-sm font-semibold text-primary">PuraQleen · exteriér</p>
        <h3 className="mt-3 display-title text-[clamp(2rem,4vw,3.4rem)] text-navy">
          Čistá voda místo plošiny
        </h3>
        <p className="mt-5 max-w-xl text-base leading-7 text-mist">
          Stroj PuraQleen zbaví vodu z řádu minerálů iontovou výměnou. Taková
          voda po sobě nenechá vodní kámen ani mapy, takže sklo uschne samo a
          bez šmouh. Myjeme jí okna, výlohy a skleněné, plastové i další hladké
          fasády.
        </p>
        <dl className="mt-8 divide-y divide-black/8 border-y border-black/8">
          <Metric term="Co potřebujeme" detail="přípojku vody" />
          <Metric term="Výsledek" detail="bez ručního leštění" />
        </dl>
      </div>
      <div className="relative flex min-h-[22rem] flex-col justify-between bg-[linear-gradient(180deg,#f7fbff_0%,#e7f1ff_100%)] p-6 sm:p-10">
        <WaterGraphic />
        <p className="display-title text-[clamp(3.8rem,10vw,7.5rem)] text-primary">
          18&nbsp;m
        </p>
        <p className="text-sm font-medium text-mist">dosah ze země v exteriéru</p>
      </div>
    </div>
  );
}

function AirCard() {
  return (
    <div className="soft-card grid overflow-hidden rounded-[2rem] lg:grid-cols-[1.05fr_0.95fr]">
      <div className="p-6 sm:p-10 lg:p-12">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[clamp(2.4rem,6vw,4.4rem)] font-extrabold tracking-[-0.06em] text-primary">
            vzduchem
          </p>
          <div className="text-right text-sm text-mist">
            <p className="font-semibold text-navy">SpaceVac</p>
            <p>interiér</p>
          </div>
        </div>
        <h3 className="mt-6 display-title text-[clamp(2rem,4vw,3.2rem)] text-navy">
          Prach ze stropu, provoz bez přerušení
        </h3>
        <p className="mt-5 max-w-xl text-base leading-7 text-mist">
          Výkonný vysavač se soustavou karbonových tyčí a sadou nástavců odsaje
          prach, nečistoty a pavučiny ze stěn, stropů, konstrukcí i
          vzduchotechniky. Pod námi se dál vyrábí, prodává nebo sportuje.
        </p>
        <dl className="mt-8 divide-y divide-black/8 border-y border-black/8">
          <Metric
            term="Bez čeho se obejdeme"
            detail="plošiny, lešení i odstávky provozu"
          />
          <Metric
            term="Kde ho využijete"
            detail="haly, obchodní centra, autosalony, školy, stadiony"
          />
        </dl>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <Step n="1" title="Složíme tyče" />
          <Step n="2" title="Odsajeme ze země" />
          <Step n="3" title="Provoz běží dál" />
        </div>
      </div>
      <div className="relative flex min-h-[22rem] flex-col justify-end bg-[linear-gradient(180deg,#f7fbff_0%,#e7f1ff_100%)] p-6 sm:p-10">
        <FunnelGraphic />
        <p className="display-title text-[clamp(3.8rem,10vw,7.5rem)] text-primary">
          15&nbsp;m
        </p>
        <p className="text-sm font-medium text-mist">dosah v interiéru</p>
      </div>
    </div>
  );
}

function HeatCard() {
  return (
    <div className="soft-card grid overflow-hidden rounded-[2rem] lg:grid-cols-[1.05fr_0.95fr]">
      <div className="p-6 sm:p-10 lg:p-12">
        <p className="text-sm font-semibold text-heat">
          Kränzle + Oertzen · opláštění a fasády
        </p>
        <h3 className="mt-3 display-title text-[clamp(2rem,4vw,3.2rem)] text-navy">
          Horká voda pod tlakem na opláštění hal
        </h3>
        <p className="mt-5 max-w-xl text-base leading-7 text-mist">
          Na opláštění průmyslových budov a silně znečištěné plochy nasazujeme
          horkovodní vysokotlakou sestavu postavenou na technice Kränzle a
          Oertzen. Je soběstačná, takže ji rozjedeme i tam, kde není k dispozici
          elektrická přípojka.
        </p>
        <dl className="mt-8 divide-y divide-black/8 border-y border-black/8">
          <Metric term="Průtok" detail="16 l/min" />
          <Metric term="Napájení" detail="nezávislé na el. přípojce" />
        </dl>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <Step n="1" title="Přijedeme" />
          <Step
            n="2"
            title="Ohřejeme vodu"
            detail="Až na 120 °C, na mastnotu a staré nánosy."
          />
          <Step
            n="3"
            title="Smyjeme tlakem"
            detail="250 bar vrátí opláštění původní barvu."
          />
        </div>
      </div>
      <div className="relative flex min-h-[22rem] flex-col justify-center bg-[linear-gradient(180deg,#fff6f1_0%,#ffe8df_100%)] p-6 sm:p-10">
        <p className="display-title text-[clamp(3.8rem,10vw,7.2rem)] text-heat">
          250 bar
        </p>
        <p className="text-sm font-medium text-mist">až 120 °C horká voda</p>
      </div>
    </div>
  );
}

function Metric({ term, detail }: { term: string; detail: string }) {
  return (
    <div className="grid gap-1 py-4 sm:grid-cols-[13rem_1fr] sm:items-baseline">
      <dt className="text-sm text-mist">{term}</dt>
      <dd className="font-semibold text-navy">{detail}</dd>
    </div>
  );
}

function Step({
  n,
  title,
  detail,
}: {
  n: string;
  title: string;
  detail?: string;
}) {
  return (
    <div className="rounded-[1.3rem] bg-white p-4 shadow-sm ring-1 ring-black/4">
      <span className="inline-flex size-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
        {n}
      </span>
      <p className="mt-3 font-semibold leading-5 text-navy">{title}</p>
      {detail ? <p className="mt-1 text-sm leading-5 text-mist">{detail}</p> : null}
    </div>
  );
}

function FunnelGraphic() {
  return (
    <svg
      viewBox="0 0 320 260"
      className="absolute top-6 right-4 w-[70%] max-w-[22rem] opacity-80"
      aria-hidden="true"
    >
      <path
        d="M40 18h240l-88 222H128L40 18Z"
        fill="url(#funnel)"
        opacity="0.9"
      />
      <defs>
        <linearGradient id="funnel" x1="160" y1="0" x2="160" y2="260">
          <stop stopColor="#8eb6ff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#0066ff" stopOpacity="0.55" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function WaterGraphic() {
  return (
    <svg
      viewBox="0 0 200 160"
      className="absolute top-8 right-6 w-40 opacity-80"
      aria-hidden="true"
    >
      <path
        d="M100 8c42 48 62 82 62 108 0 34-28 60-62 60S38 150 38 116c0-26 20-60 62-108Z"
        fill="#00A8FF"
        opacity="0.2"
      />
      <path
        d="M100 28c32 38 48 64 48 84 0 26-21 46-48 46s-48-20-48-46c0-20 16-46 48-84Z"
        fill="#0066FF"
        opacity="0.35"
      />
    </svg>
  );
}
