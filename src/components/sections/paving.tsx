const steps = [
  {
    label: "Před",
    detail: "Zašedlý povrch, mech ve spárách.",
  },
  {
    label: "Při práci",
    detail: "Rozdíl je vidět po prvním průjezdu.",
  },
  {
    label: "Po",
    detail: "Celý vjezd čistý a jednotný.",
  },
];

export function Paving() {
  return (
    <section className="spray-field overflow-hidden">
      <div className="spray-band top-10 opacity-80" />
      <div className="relative z-10 mx-auto max-w-[86rem] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <h2 className="display-title text-[clamp(2.6rem,8vw,7rem)] text-navy/12">
          Dlažba zase jako nová
        </h2>
        <p className="mt-2 max-w-xl text-mist">
          Tři záběry ze zakázky. Fotky sem doplníme, jakmile budou ve stejném
          formátu jako zbytek galerie.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {steps.map((step) => (
            <article
              key={step.label}
              className="soft-card overflow-hidden rounded-[1.8rem]"
            >
              <div className="flex aspect-[4/3] items-center justify-center bg-[linear-gradient(180deg,#eef4fc_0%,#d9e6f7_100%)]">
                <div className="text-center">
                  <p className="display-title text-4xl text-primary/40">
                    {step.label}
                  </p>
                  <p className="mt-2 text-sm text-mist">Foto připravujeme</p>
                </div>
              </div>
              <div className="px-5 py-4">
                <p className="font-semibold text-navy">{step.label}</p>
                <p className="mt-1 text-sm text-mist">{step.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
