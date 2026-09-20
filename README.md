# KAPE čištění

Jednostránkový marketingový web pro **KAPE čištění s.r.o.** (Teplice) — výškové mytí oken, fasád a interiérů ze země.

- Stack: Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui
- Jazyk: čeština
- Produkční doména: [https://www.kapecisteni.cz/](https://www.kapecisteni.cz/)

## Spuštění lokálně

```bash
npm install
cp .env.example .env.local   # doplňte klíč, až ho budete mít
npm run dev
```

Vývojový server běží na [http://127.0.0.1:43127](http://127.0.0.1:43127).

```bash
npm run build
npm start
```

## Formulář a env

Poptávkový formulář posílá data na `/api/contact`. Route ho doručí přes [Web3Forms](https://web3forms.com) na **info@kapecisteni.cz**.

1. Na Web3Forms založte access key a jako příjemce nastavte `info@kapecisteni.cz`.
2. Do `.env.local` (lokálně) nebo do Environment Variables na Vercelu vložte:

```
WEB3FORMS_ACCESS_KEY=váš_klíč
```

Bez klíče:

- ve vývoji (`next dev`) formulář uspěje v testovacím režimu a nic neodešle
- v produkci vrátí chybu a vyzve k telefonu / e-mailu

## SEO

- metadata a Open Graph v `src/app/layout.tsx` + `opengraph-image.tsx`
- `sitemap.xml` a `robots.txt` (App Router)
- LocalBusiness JSON-LD: IČO 06930077, Skupova 569/19, 415 01 Teplice-Trnovany

## Nasazení na Vercel a doména kapecisteni.cz

1. Importujte repo do Vercelu (MJWS / Filipe účet).
2. Nastavte `WEB3FORMS_ACCESS_KEY`.
3. Deploy — nejdřív preview URL, DNS zatím neměňte.
4. Až bude preview v pořádku, ve Vercelu přidejte custom domains:
   - `www.kapecisteni.cz`
   - `kapecisteni.cz`
5. U registrátora DNS:
   - `www` → CNAME na hodnotu, kterou ukáže Vercel (obvykle `cname.vercel-dns.com`)
   - apex `@` → A `76.76.21.21` (nebo ALIAS/ANAME, pokud to registrátor umí)
6. SSL vystaví Vercel automaticky.
7. Starý hosting nechte do vypršení TTL, pak ho vypněte.
8. Pokud se liší staré cesty (`#uvod`, `#o-nas`…), Vercel zvládne 301 v `vercel.json`.

## Fotky

Akční fotky z aktuálního webu jsou v `public/photos/`. Sekce **Dlažba zase jako nová** má připravenou mřížku Před / Při práci / Po — stačí doplnit tři JPEG a napojit je v `src/components/sections/paving.tsx`.
