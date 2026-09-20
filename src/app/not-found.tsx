import Link from "next/link";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="spray-field flex-1">
        <div className="relative z-10 mx-auto max-w-3xl px-4 py-32">
          <p className="font-semibold text-primary">404</p>
          <h1 className="mt-3 display-title text-[clamp(2.4rem,6vw,4.4rem)] text-navy">
            Tady nic není — ani ve výšce.
          </h1>
          <p className="mt-4 text-mist">
            Stránka neexistuje. Vraťte se na úvod a pošlete nám poptávku.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex h-12 items-center rounded-full bg-primary px-6 font-semibold text-white"
          >
            Zpět na úvod
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
