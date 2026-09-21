# KAPE čištění

Jednostránkový marketingový web pro **KAPE čištění s.r.o.** (Teplice) — výškové mytí oken, fasád a interiérů ze země.

Vizuál je tmavý Claude artifact (navy + particle spray na všech slidech): Archivo / Fredoka / Quicksand, `--bg #050918`, `--ink #F2F5FF`, `--cta #2A4BFF`, `--hot #FF8A5C`, WebGL spray, multi-step kalkulace. Copy a struktura zůstávají z SOURCE-web.html.

- Stack: Next.js (App Router), TypeScript, původní CSS z artifaktu
- Jazyk: `lang=cs`
- Produkční doména (později, DNS zatím neměnit): [https://www.kapecisteni.cz/](https://www.kapecisteni.cz/)

## Spuštění lokálně

```bash
npm install
cp .env.example .env.local
npm run dev
```

Vývojový server běží na [http://127.0.0.1:43127](http://127.0.0.1:43127).

```bash
npm run build
npm start
```

## Formulář a env

Multi-step kalkulace na `#kontakt` posílá JSON na `/api/contact`. Route ho doručí přes [Web3Forms](https://web3forms.com) na **info@kapecisteni.cz**.

1. Na Web3Forms založte access key a jako příjemce nastavte `info@kapecisteni.cz`.
2. Do `.env.local` (lokálně) nebo do Environment Variables na Vercelu vložte:

```
WEB3FORMS_ACCESS_KEY=váš_klíč
```

Bez klíče:

- ve vývoji (`next dev`) formulář uspěje v testovacím režimu, payload se zaloguje do konzole a nic se neodešle
- v produkci API vrátí chybu a prohlížeč otevře záložní `mailto:info@kapecisteni.cz` s předvyplněnou kalkulací

Volitelně stejný klíč jako `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` (nevyžadujeme).

## SEO

- title/description z artifaktu, Open Graph v `src/app/layout.tsx` + `opengraph-image.tsx`
- `sitemap.xml` a `robots.txt` (App Router)
- LocalBusiness JSON-LD: IČO 06930077, Skupova 569/19, 415 01 Teplice-Trnovany, hodnocení 4,9 / 13 recenzí

## Fotky

JPEG z artifaktu jsou v `public/images/` (`sky`, `roka`, `merc`, `cladding`, `showroom`, `office`, `flats`, `green`, `vac`, `facade`, `pave_*`). Portréty týmu v `public/images/team/`.

## Nasazení na Vercel

1. Importujte repo do Vercelu (MJWS / Filipe účet).
2. Nastavte `WEB3FORMS_ACCESS_KEY`.
3. Deploy — nejdřív preview URL. **DNS kapecisteni.cz zatím neměňte.**
4. Až bude preview v pořádku, ve Vercelu přidejte custom domains `www.kapecisteni.cz` a `kapecisteni.cz`.
5. U registrátora teprve potom CNAME/A podle hodnot z Vercelu.
6. SSL vystaví Vercel automaticky.

## Kontakty

- info@kapecisteni.cz
- Petr Jileček +420 732 686 010
- Kamil Jůzl +420 777 150 909
- Martina Pokorná +420 727 868 585
