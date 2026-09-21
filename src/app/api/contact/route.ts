import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Quote = {
  svc?: string;
  area?: number;
  h?: string | null;
  dirt?: string;
  freq?: string;
  from?: number;
  to?: number;
  custom?: boolean;
};

type ContactBody = {
  name?: string;
  email?: string;
  firm?: string;
  tel?: string;
  place?: string;
  msg?: string;
  need?: string;
  quote?: Quote;
  company?: string;
};

function formatMessage(body: ContactBody) {
  if (body.need?.trim()) return body.need.trim();

  const lines = [
    `Jméno: ${body.name ?? ""}`,
    body.firm ? `Firma: ${body.firm}` : "",
    `E-mail: ${body.email ?? ""}`,
    body.tel ? `Telefon: ${body.tel}` : "",
    body.place ? `Objekt: ${body.place}` : "",
    "",
    body.quote
      ? [
          "KALKULACE Z WEBU",
          body.quote.svc ? `Služba: ${body.quote.svc}` : "",
          body.quote.area != null ? `Plocha: ${body.quote.area} m²` : "",
          body.quote.h ? `Výška: ${body.quote.h}` : "",
          body.quote.dirt ? `Znečištění: ${body.quote.dirt}` : "",
          body.quote.freq ? `Frekvence: ${body.quote.freq}` : "",
          body.quote.custom
            ? "Orientační cena: na míru"
            : body.quote.from != null && body.quote.to != null
              ? `Orientační cena: ${body.quote.from} až ${body.quote.to} Kč bez DPH`
              : "",
        ]
          .filter(Boolean)
          .join("\n")
      : "",
    "",
    body.msg ?? "",
  ];

  return lines.filter((line, i, all) => line !== "" || all[i - 1] !== "").join("\n");
}

export async function POST(request: Request) {
  let body: ContactBody;

  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Neplatný požadavek." }, { status: 400 });
  }

  if (body.company) {
    return NextResponse.json({ ok: true });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = formatMessage(body);

  if (name.length < 2 || !EMAIL_RE.test(email) || message.length < 5) {
    return NextResponse.json(
      { ok: false, error: "Vyplňte jméno, e-mail a stručný popis zakázky." },
      { status: 400 },
    );
  }

  const payload = {
    name,
    email,
    firm: body.firm?.trim() ?? "",
    tel: body.tel?.trim() ?? "",
    place: body.place?.trim() ?? "",
    message,
    quote: body.quote ?? null,
    to: "info@kapecisteni.cz",
  };

  console.info("[contact]", payload);

  const accessKey =
    process.env.WEB3FORMS_ACCESS_KEY || process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    if (process.env.NODE_ENV !== "production") {
      return NextResponse.json({ ok: true, mocked: true });
    }

    return NextResponse.json(
      {
        ok: false,
        error:
          "Formulář ještě není napojený. Zavolejte nám na +420 732 686 010 nebo napište na info@kapecisteni.cz.",
      },
      { status: 503 },
    );
  }

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: accessKey,
      subject: `Poptávka z webu KAPE — ${name}${payload.quote?.svc ? ` (${payload.quote.svc})` : ""}`,
      from_name: "KAPE čištění web",
      name,
      email,
      message,
      to: "info@kapecisteni.cz",
    }),
  });

  const result = (await response.json()) as { success?: boolean; message?: string };

  if (!response.ok || result.success === false) {
    return NextResponse.json(
      {
        ok: false,
        error: result.message || "Odeslání se nepodařilo. Zkuste to znovu nebo zavolejte.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
