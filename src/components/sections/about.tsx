import { site } from "@/lib/site";

const stats = [
  {
    value: "2018",
    label: "vzniklo KAPE spojením dvou teplických firem",
  },
  {
    value: "8. rok",
    label: "fungujeme a fungovat budeme dál",
  },
  {
    value: "20+ let",
    label: "úklidové praxe za KATO",
  },
  {
    value: "10+ let",
    label: "praxe za JP Clean servis",
  },
];

export function About() {
  return (
    <section id="kdo-jsme" className="spray-field overflow-hidden">
      <div className="spray-band top-40" />
      <div className="relative z-10 mx-auto max-w-[86rem] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="max-w-4xl">
          <h2 className="display-title text-[clamp(2.4rem,6.5vw,5rem)] text-navy">
            Kamil a Petr. Dohromady KAPE.
          </h2>
          <p className="mt-5 text-lg text-mist">
            <span className="font-extrabold tracking-tight text-primary">KA</span>
            mil a{" "}
            <span className="font-extrabold tracking-tight text-primary">PE</span>
            tr. Odtud jméno KAPE.
          </p>
        </div>

        <div className="relative mt-12 grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
          <ProfileCard name="KAMIL" person="Kamil Jůzl" phone="+420 777 150 909" />
          <div className="relative z-10 mx-auto flex size-16 items-center justify-center rounded-full bg-white text-3xl font-extrabold text-primary shadow-[0_12px_30px_rgb(15_35_80/12%)]">
            +
          </div>
          <ProfileCard name="PETR" person="Petr Jileček" phone="+420 732 686 010" />
        </div>

        <div className="mt-16 grid items-end gap-10 lg:grid-cols-[1.25fr_0.75fr]">
          <h3 className="display-title text-[clamp(2rem,5vw,3.8rem)] text-navy">
            Vaše budova je vaší vizitkou. Údržbu ve výškách přitom většina firem
            odkládá, protože znamená plošiny, lešení a omezený provoz. S námi
            nemusí.
          </h3>
          <p className="max-w-md text-mist">
            Ušetříte jinak nevyhnutelné náklady i čas a soustředíte se jen na
            svou práci. My zatím stojíme pevně na zemi.
          </p>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {stats.map((item) => (
            <article
              key={item.value}
              className="soft-card rounded-[1.6rem] px-6 py-6"
            >
              <p className="display-title text-[clamp(2.4rem,5vw,3.4rem)] text-primary">
                {item.value}
              </p>
              <p className="mt-2 text-sm leading-5 text-mist">{item.label}</p>
            </article>
          ))}
        </div>

        <div className="mt-16 flex flex-col justify-between gap-4 border-y border-black/8 py-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <span className="inline-flex size-14 items-center justify-center rounded-full bg-ice-deep text-lg font-extrabold text-navy">
              MP
            </span>
            <div>
              <p className="font-semibold text-navy">Martina Pokorná</p>
              <p className="text-sm text-mist">vedoucí personálního oddělení</p>
            </div>
          </div>
          <a
            href="tel:+420727868585"
            className="text-lg font-semibold text-navy"
          >
            +420 727 868 585
          </a>
        </div>

        <h3 className="mt-16 display-title text-[clamp(2.6rem,8vw,6.2rem)] text-primary">
          Nemusí pršet, stačí, když KAPE.
        </h3>

        <div className="mt-12 grid gap-10 md:grid-cols-3">
          <Story
            title="Co už máme za sebou"
            body="Doma v Teplicích jsme uklízeli po stavbě zimního stadionu, po rekonstrukci Lázní Beethoven i po dostavbě nového Kauflandu. Máme za sebou také Accolade Hostomice a spoustu dalšího. Teplickým školám pravidelně vracíme čistá okna."
          />
          <Story
            title="Pořád se posouváme"
            body="Školíme se, jsme pojištění a rozšiřujeme, co umíme. Umýjeme skleněné plochy ve výškách i tam, kam se plošina nedostane, poradíme si s fasádou i střechou a nově také se zámkovou dlažbou nebo garážovým stáním."
          />
          <Story
            title="Kam za vámi dojedeme"
            body="S technikou pravidelně jezdíme do Prahy a za zakázkou vyrazíme v podstatě kamkoli. Tady všude, a i o kus dál, jste mohli potkat naši bílou dodávku s modrou kapkou."
          />
        </div>

        <ul className="mt-12 grid gap-3 sm:grid-cols-3">
          {site.people.map((person) => (
            <li key={person.name} className="soft-card rounded-2xl px-5 py-4">
              <p className="font-semibold text-navy">{person.name}</p>
              <p className="text-sm text-mist">{person.role}</p>
              <a href={`tel:${person.tel}`} className="mt-1 block font-medium text-primary">
                {person.phone}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ProfileCard({
  name,
  person,
  phone,
}: {
  name: string;
  person: string;
  phone: string;
}) {
  return (
    <article className="navy-card relative overflow-hidden rounded-[1.8rem] px-8 py-12">
      <Wave />
      <p className="display-title text-[clamp(3rem,8vw,5.2rem)] text-white">
        {name}
      </p>
      <p className="mt-4 text-white/70">{person}</p>
      <a href={`tel:${phone.replace(/\s/g, "")}`} className="mt-1 block text-cyan">
        {phone}
      </a>
    </article>
  );
}

function Wave() {
  return (
    <svg
      viewBox="0 0 400 120"
      className="absolute inset-x-0 bottom-0 h-24 w-full text-primary"
      aria-hidden="true"
    >
      <path
        d="M0 70c40-28 80-28 120 0s80 28 120 0 80-28 120 0 40 28 40 28v40H0Z"
        fill="currentColor"
        opacity="0.85"
      />
    </svg>
  );
}

function Story({ title, body }: { title: string; body: string }) {
  return (
    <article className="border-t border-black/10 pt-5">
      <h4 className="text-xl font-extrabold tracking-tight text-navy">{title}</h4>
      <p className="mt-3 text-sm leading-6 text-mist">{body}</p>
    </article>
  );
}
