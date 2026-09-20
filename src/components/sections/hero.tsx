import Image from "next/image";
import { photos } from "@/lib/photos";

const stats = [
  {
    value: "18 m",
    label: "ze země, bez vysokozdvižné techniky",
    className: "left-0 top-[16%] max-w-[13.5rem] lg:-left-8",
  },
  {
    value: "Bez šmouh",
    label: "demineralizovaná voda, sklo uschne samo",
    className: "bottom-[26%] left-0 max-w-[15rem] lg:-left-6",
  },
  {
    value: "15 m",
    label: "odsávání prachu v interiéru",
    className: "right-0 top-2 max-w-[11rem] lg:-right-4",
  },
  {
    value: "4,9 z 5",
    label: "hodnocení na Googlu",
    className: "right-0 bottom-6 max-w-[10.5rem] lg:-right-2",
  },
];

export function Hero() {
  return (
    <section
      id="uvod"
      className="relative overflow-hidden bg-navy pt-24 text-white sm:pt-28"
    >
      <div className="absolute inset-0">
        <Image
          src={photos.highReach.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_40%] opacity-55"
        />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,#f7f9fd_0%,#f7f9fd_42%,rgba(11,18,32,0.2)_62%,rgba(11,18,32,0.58)_100%)] sm:bg-[linear-gradient(105deg,#f7f9fd_0%,#f7f9fd_34%,rgba(247,249,253,0.55)_46%,rgba(11,18,32,0.28)_68%,rgba(11,18,32,0.62)_100%)]" />
      </div>

      <div className="relative mx-auto grid max-w-[86rem] items-center gap-10 px-4 pb-16 pt-6 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:px-8 lg:pb-24 lg:pt-10">
        <div className="max-w-2xl text-navy">
          <h1 className="display-title text-[clamp(2.7rem,8vw,5.6rem)]">
            Nic není tak vysoké, abychom tam nedosáhli.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-navy/70 sm:text-lg">
            Myjeme okna, fasády a opláštění hal. Ze země, do 18 metrů bez
            vysokozdvižné techniky a bez omezení vašeho provozu.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#kontakt"
              className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-base font-semibold text-white transition-colors hover:bg-primary/90"
            >
              Chci nezávaznou kalkulaci
            </a>
            <a
              href="#technologie"
              className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-base font-semibold text-navy shadow-sm ring-1 ring-black/5 transition-colors hover:bg-ice"
            >
              Čím to děláme
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[36rem] lg:max-w-none">
          <div className="relative mx-auto aspect-[4/5] w-full overflow-hidden rounded-[2rem] shadow-[0_30px_80px_rgb(8_16_36/40%)] ring-1 ring-white/40 sm:w-[78%] lg:w-[72%]">
            <Image
              src={photos.facadePole.src}
              alt={photos.facadePole.alt}
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 420px"
              className="object-cover object-[center_28%]"
            />
            <p className="absolute inset-x-4 bottom-4 rounded-2xl bg-navy/75 px-4 py-3 text-sm leading-5 text-white/90 backdrop-blur-sm">
              Takhle to vypadá v praxi. Tyč, čistá voda a my pevně na zemi.
            </p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 lg:hidden">
            {stats.map((stat) => (
              <StatCard key={stat.value} value={stat.value} label={stat.label} />
            ))}
          </div>

          {stats.map((stat) => (
            <StatCard
              key={`desk-${stat.value}`}
              value={stat.value}
              label={stat.label}
              className={`absolute hidden lg:block ${stat.className}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <article className={`navy-card rounded-[1.4rem] px-4 py-3.5 sm:px-5 ${className ?? ""}`}>
      <p className="text-[1.45rem] font-extrabold leading-none tracking-tight sm:text-[1.8rem]">
        {value}
      </p>
      <p className="mt-1.5 text-[0.78rem] leading-4 text-white/65">{label}</p>
    </article>
  );
}
