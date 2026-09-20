import { ContactForm } from "@/components/contact-form";
import { site } from "@/lib/site";

export function Contact() {
  return (
    <section id="kontakt" className="spray-field overflow-hidden">
      <div className="spray-band top-20" />
      <div className="relative z-10 mx-auto max-w-[86rem] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <h2 className="display-title max-w-4xl text-[clamp(2.8rem,8vw,6.4rem)] text-navy">
          Dáme se do práce?
        </h2>

        <div className="mt-12 grid items-start gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[2rem] bg-[#e8eef8] p-6 sm:p-8">
            <p className="max-w-lg text-mist">
              Napište nám, co potřebujete umýt. Připravíme nezávaznou cenovou
              kalkulaci.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <div className="grid gap-4">
            <article className="soft-card rounded-[2rem] p-6 sm:p-8">
              <p className="text-sm text-mist">Zavolejte nám</p>
              <a
                href={`tel:${site.primaryPhone.tel}`}
                className="mt-3 block display-title text-[clamp(2rem,4vw,3rem)] text-navy"
              >
                {site.primaryPhone.display}
              </a>
              <p className="mt-6 text-sm text-mist">Napište nám</p>
              <a
                href={`mailto:${site.email}`}
                className="mt-1 block text-xl font-semibold text-navy"
              >
                {site.email}
              </a>
            </article>

            <article className="soft-card rounded-[2rem] p-6 sm:p-8">
              <p className="text-sm text-mist">{site.address.street}</p>
              <p className="font-semibold text-navy">
                {site.address.postalCode} {site.address.city}
              </p>
              <p className="mt-6 text-sm text-mist">Fakturační údaje</p>
              <p className="mt-1 display-title text-2xl text-navy">{site.name}</p>
              <p className="mt-1 text-navy">IČO {site.ico}</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
