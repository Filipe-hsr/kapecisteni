"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Status = "idle" | "sending" | "ok" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!consent) {
      setStatus("error");
      setMessage("Potřebujeme souhlas se zpracováním osobních údajů.");
      return;
    }

    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          need: String(data.get("need") ?? ""),
          company: String(data.get("company") ?? ""),
        }),
      });
      const payload = (await response.json()) as {
        ok?: boolean;
        error?: string;
        mocked?: boolean;
      };

      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || "Odeslání se nepodařilo.");
      }

      form.reset();
      setConsent(false);
      setStatus("ok");
      setMessage(
        payload.mocked
          ? "Děkujeme. Formulář je v tomto prostředí v testovacím režimu — naostro ho zapnete klíčem Web3Forms."
          : "Děkujeme. Ozveme se s nezávaznou kalkulací."
      );
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Odeslání se nepodařilo. Zavolejte nám, prosím."
      );
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <Field label="Jméno" htmlFor="name">
        <Input
          id="name"
          name="name"
          required
          autoComplete="name"
          className="h-12 rounded-2xl border-0 bg-white px-4 text-base shadow-none"
        />
      </Field>

      <Field label="E-mail" htmlFor="email">
        <Input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="h-12 rounded-2xl border-0 bg-white px-4 text-base shadow-none"
        />
      </Field>

      <Field label="Co potřebujete umýt nebo vyčistit?" htmlFor="need">
        <Textarea
          id="need"
          name="need"
          required
          rows={5}
          className="min-h-36 rounded-2xl border-0 bg-white px-4 py-3 text-base shadow-none"
        />
      </Field>

      <label className="flex items-start gap-3 text-sm leading-5 text-mist">
        <Checkbox
          checked={consent}
          onCheckedChange={(value) => setConsent(value === true)}
          className="mt-0.5"
          required
        />
        <span>
          Souhlasím se zpracováním osobních údajů.{" "}
          <a
            href="/zasady-ochrany-osobnich-udaju"
            className="font-medium text-navy underline underline-offset-2"
          >
            Zásady ochrany osobních údajů
          </a>
        </span>
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-7 text-base font-semibold text-white transition-colors hover:bg-primary/90 disabled:opacity-60"
      >
        {status === "sending" ? "Odesílám…" : "Odeslat poptávku"}
      </button>

      <div aria-live="polite">
        {message ? (
          <p
            className={
              status === "error"
                ? "text-sm text-red-600"
                : "text-sm text-navy"
            }
          >
            {message}
          </p>
        ) : null}
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={htmlFor} className="text-sm font-medium text-navy">
        {label}
      </label>
      {children}
    </div>
  );
}
