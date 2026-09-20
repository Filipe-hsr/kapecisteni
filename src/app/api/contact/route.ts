import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: {
    name?: string;
    email?: string;
    need?: string;
    company?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Neplatný požadavek." }, { status: 400 });
  }

  if (body.company) {
    return NextResponse.json({ ok: true });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const need = body.need?.trim() ?? "";

  if (name.length < 2 || !EMAIL_RE.test(email) || need.length < 5) {
    return NextResponse.json(
      { ok: false, error: "Vyplňte jméno, e-mail a stručný popis zakázky." },
      { status: 400 }
    );
  }

  const accessKey =
    process.env.WEB3FORMS_ACCESS_KEY || process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] mock submit", { name, email, need });
      return NextResponse.json({ ok: true, mocked: true });
    }

    return NextResponse.json(
      {
        ok: false,
        error:
          "Formulář ještě není napojený. Zavolejte nám na +420 732 686 010 nebo napište na info@kapecisteni.cz.",
      },
      { status: 503 }
    );
  }

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: accessKey,
      subject: `Poptávka z webu KAPE — ${name}`,
      from_name: "KAPE čištění web",
      name,
      email,
      message: need,
      to: "info@kapecisteni.cz",
    }),
  });

  const payload = (await response.json()) as { success?: boolean; message?: string };

  if (!response.ok || payload.success === false) {
    return NextResponse.json(
      {
        ok: false,
        error: payload.message || "Odeslání se nepodařilo. Zkuste to znovu nebo zavolejte.",
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
