import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Zásady ochrany osobních údajů",
  description: `Jak ${site.name} zpracovává osobní údaje z poptávkového formuláře.`,
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main id="obsah" className="spray-field flex-1">
        <article className="relative z-10 mx-auto max-w-3xl px-4 py-28 sm:px-6">
          <h1 className="display-title text-[clamp(2.2rem,5vw,3.8rem)] text-navy">
            Zásady ochrany osobních údajů
          </h1>
          <p className="mt-6 text-mist">
            Správcem osobních údajů je {site.name}, IČO {site.ico}, sídlem{" "}
            {site.address.street}, {site.address.postalCode} {site.address.city}.
            Kontakt: {site.email}, {site.primaryPhone.display}.
          </p>

          <div className="mt-10 space-y-8 text-[0.95rem] leading-7 text-navy/80">
            <section>
              <h2 className="text-xl font-extrabold text-navy">Jaké údaje zpracováváme</h2>
              <p className="mt-2">
                Z poptávkového formuláře zpracováváme jméno, e-mail a popis
                zakázky, které nám sami pošlete. Pokud zavoláte, zpracováváme
                telefonní číslo a údaje, které nám sdělíte kvůli kalkulaci.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-extrabold text-navy">Účel a právní základ</h2>
              <p className="mt-2">
                Údaje používáme výhradně k vyřízení poptávky, přípravě
                nezávazné kalkulace a případné další komunikaci o zakázce.
                Právním základem je váš souhlas (čl. 6 odst. 1 písm. a GDPR) a
                naše oprávněné zájmy na vyřízení obchodní poptávky (čl. 6 odst.
                1 písm. f GDPR).
              </p>
            </section>
            <section>
              <h2 className="text-xl font-extrabold text-navy">Doba uložení</h2>
              <p className="mt-2">
                Poptávky uchováváme po dobu vyřízení zakázky a nejdéle 3 roky,
                pokud nevznikne delší zákonná archivační povinnost.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-extrabold text-navy">Příjemci</h2>
              <p className="mt-2">
                Formulář může být doručen e-mailem přes službu Web3Forms.
                Údaje nepředáváme k marketingu třetích stran.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-extrabold text-navy">Vaše práva</h2>
              <p className="mt-2">
                Máte právo na přístup, opravu, výmaz, omezení zpracování,
                námitku a stížnost u Úřadu pro ochranu osobních údajů. Souhlas
                můžete kdykoli odvolat e-mailem na {site.email}.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
