import Link from "next/link";
import { LogoMark } from "@/components/logo-mark";
import { KapeNav } from "@/components/kape-nav";
import { nav, site } from "@/lib/site";

export function KapeHeader({ home = false }: { home?: boolean }) {
  const prefix = home ? "" : "/";

  return (
    <header className="nav is-solid" id="nav">
      <KapeNav />
      <div className="wrap nav__in">
        <Link className="logo" href={home ? "#uvod" : "/#uvod"} aria-label="KAPE čištění s.r.o., na začátek stránky">
          <LogoMark />
          <span className="logo__txt">
            <b>KAPE</b>
            <small>čištění s.r.o.</small>
          </span>
        </Link>
        <button className="burger" aria-label="Otevřít menu" aria-expanded="false" aria-controls="menu">
          <i />
          <i />
        </button>
        <ul className="nav__pill" id="menu">
          {nav.map((item) => (
            <li key={item.href}>
              <Link href={`${prefix}${item.href}`}>{item.label}</Link>
            </li>
          ))}
          <li>
            <Link className="btn btn--blue" href={`${prefix}#kontakt`}>
              Chci kalkulaci
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export function KapeFooter() {
  return (
    <footer className="foot">
      <div className="wrap foot__in">
        <span className="foot__id">
          <span className="logo logo--foot">
            <LogoMark />
            <span className="logo__txt">
              <b>KAPE</b>
              <small>čištění s.r.o.</small>
            </span>
          </span>
          © 2026 {site.name}, IČO {site.ico}
        </span>
        <ul>
          <li>
            <a href={site.social.facebook} target="_blank" rel="noopener">
              Facebook
            </a>
          </li>
          <li>
            <a href={site.social.instagram} target="_blank" rel="noopener">
              Instagram
            </a>
          </li>
          <li>
            <a href={site.social.youtube} target="_blank" rel="noopener">
              YouTube
            </a>
          </li>
        </ul>
        <span>
          Návrh webu{" "}
          <a href="https://mjwebstudio.cz" target="_blank" rel="noopener">
            MJWebStudio
          </a>
        </span>
      </div>
    </footer>
  );
}
