import Link from "next/link";
import { KapeFooter, KapeHeader } from "@/components/kape-chrome";

export default function NotFound() {
  return (
    <div className="page">
      <KapeHeader />
      <main className="nf">
        <div className="wrap">
          <p className="k">404</p>
          <h1>Tady nic není — ani ve výšce.</h1>
          <p className="lead">
            Stránka neexistuje. Vraťte se na úvod a pošlete nám poptávku.
          </p>
          <p>
            <Link className="btn btn--blue" href="/">
              Zpět na úvod
            </Link>
          </p>
        </div>
      </main>
      <KapeFooter />
    </div>
  );
}
