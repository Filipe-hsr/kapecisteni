import type { Metadata } from "next";
import { KapeFooter, KapeHeader } from "@/components/kape-chrome";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Zásady ochrany osobních údajů",
  description: `Jak ${site.name} zpracovává osobní údaje z poptávkového formuláře.`,
};

export default function PrivacyPage() {
  return (
    <div className="page">
      <KapeHeader />
      <main className="legal">
        <article className="wrap">
          <h1>Zásady ochrany osobních údajů</h1>
          <p>
            Správcem osobních údajů je {site.name}, IČO {site.ico}, sídlem{" "}
            {site.address.street}, {site.address.postalCode} {site.address.city}.
            Kontakt: {site.email}, {site.primaryPhone.display}.
          </p>

          <h2>Jaké údaje zpracováváme</h2>
          <p>
            Z poptávkového formuláře zpracováváme jméno, e-mail, telefon, firmu,
            místo objektu a popis zakázky, které nám sami pošlete. Pokud
            zavoláte, zpracováváme telefonní číslo a údaje, které nám sdělíte
            kvůli kalkulaci.
          </p>

          <h2>Účel a právní základ</h2>
          <p>
            Údaje používáme výhradně k vyřízení poptávky, přípravě nezávazné
            kalkulace a případné další komunikaci o zakázce. Právním základem je
            váš souhlas (čl. 6 odst. 1 písm. a GDPR) a naše oprávněné zájmy na
            vyřízení obchodní poptávky (čl. 6 odst. 1 písm. f GDPR).
          </p>

          <h2>Doba uložení</h2>
          <p>
            Poptávky uchováváme po dobu vyřízení zakázky a nejdéle 3 roky, pokud
            nevznikne delší zákonná archivační povinnost.
          </p>

          <h2>Příjemci</h2>
          <p>
            Formulář může být doručen e-mailem přes službu Web3Forms na{" "}
            {site.email}. Údaje nepředáváme k marketingu třetích stran.
          </p>

          <h2>Vaše práva</h2>
          <p>
            Máte právo na přístup, opravu, výmaz, omezení zpracování, námitku a
            stížnost u Úřadu pro ochranu osobních údajů. Souhlas můžete kdykoli
            odvolat e-mailem na {site.email}.
          </p>
        </article>
      </main>
      <KapeFooter />
    </div>
  );
}
