"use client";

import Image from "next/image";
import { useState } from "react";
import { Maximize2, X } from "lucide-react";
import { photos } from "@/lib/photos";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

const items = [
  { title: "Roka Industry", photo: photos.roka },
  { title: "Autosalon", photo: photos.dealership },
  { title: "Opláštění haly", photo: photos.facadePole },
  { title: "Showroom za provozu", photo: photos.showroom },
  { title: "Administrativní budova", photo: photos.highReach },
  { title: "Bytový dům", photo: photos.terrace },
  { title: "Firemní areál", photo: photos.teamRoka },
  { title: "Skladová hala", photo: photos.hall },
  { title: "Fasáda a nápis", photo: photos.signage },
];

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const current = open !== null ? items[open] : null;

  return (
    <section id="reference" className="spray-field overflow-hidden">
      <div className="relative z-10 mx-auto max-w-[86rem] px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <h2 className="display-title text-[clamp(2.4rem,6vw,4.6rem)] text-navy">
            Ukázka čisté práce
          </h2>
          <p className="mt-4 text-mist">
            Fotky z realizací. Kliknutím je zvětšíte.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <button
              key={item.title}
              type="button"
              onClick={() => setOpen(index)}
              className="group relative aspect-[4/3] overflow-hidden rounded-[1.8rem] text-left"
            >
              <Image
                src={item.photo.src}
                alt={item.photo.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent" />
              <span className="absolute bottom-5 left-5 text-xl font-extrabold tracking-tight text-white">
                {item.title}
              </span>
              <span className="absolute right-4 bottom-4 inline-flex size-10 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/30 backdrop-blur-sm">
                <Maximize2 className="size-4" />
              </span>
            </button>
          ))}
        </div>

        <p className="mt-6 text-sm leading-6 text-mist">
          Další realizace: Herkul, Zimní stadion Teplice, Roka (původní
          reference), Galerie Teplice, Lázně Beethoven, Kaufland Teplice.
        </p>
      </div>

      <Dialog open={open !== null} onOpenChange={(value) => !value && setOpen(null)}>
        <DialogContent
          showCloseButton={false}
          className="max-w-4xl overflow-hidden rounded-[1.6rem] p-0 sm:max-w-4xl"
        >
          {current ? (
            <>
              <DialogTitle className="sr-only">{current.title}</DialogTitle>
              <DialogDescription className="sr-only">
                {current.photo.alt}
              </DialogDescription>
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={current.photo.src}
                  alt={current.photo.alt}
                  fill
                  sizes="90vw"
                  className="object-cover"
                />
              </div>
              <div className="flex items-center justify-between px-5 py-4">
                <p className="font-semibold text-navy">{current.title}</p>
                <DialogClose
                  className="inline-flex size-10 items-center justify-center rounded-full bg-ice text-navy"
                  aria-label="Zavřít"
                >
                  <X className="size-4" />
                </DialogClose>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
}
