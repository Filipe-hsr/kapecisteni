import { Logo } from "@/components/logo";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto flex max-w-[86rem] flex-col gap-8 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
          <Logo inverted />
          <p className="text-sm text-white/55">
            © {new Date().getFullYear()} {site.name}, IČO {site.ico}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium">
          <a
            href={site.social.facebook}
            className="text-white/80 transition-colors hover:text-white"
            target="_blank"
            rel="noreferrer"
          >
            Facebook
          </a>
          <a
            href={site.social.instagram}
            className="text-white/80 transition-colors hover:text-white"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
          <a
            href={site.social.youtube}
            className="text-white/80 transition-colors hover:text-white"
            target="_blank"
            rel="noreferrer"
          >
            YouTube
          </a>
          <span className="hidden h-4 w-px bg-white/15 sm:block" />
          <p className="text-white/70">Návrh webu MJWebStudio</p>
        </div>
      </div>
    </footer>
  );
}
