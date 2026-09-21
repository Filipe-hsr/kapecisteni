"use client";

import { useEffect } from "react";

export function KapeNav() {
  useEffect(() => {
    const nav = document.getElementById("nav");
    const burger = document.querySelector<HTMLButtonElement>(".burger");
    if (!nav || !burger) return;

    const close = () => {
      nav.classList.remove("is-open");
      document.body.style.overflow = "";
      burger.setAttribute("aria-expanded", "false");
      burger.setAttribute("aria-label", "Otevřít menu");
    };

    const onClick = () => {
      if (nav.classList.contains("is-open")) {
        close();
        return;
      }
      nav.classList.add("is-open");
      document.body.style.overflow = "hidden";
      burger.setAttribute("aria-expanded", "true");
      burger.setAttribute("aria-label", "Zavřít menu");
    };

    burger.addEventListener("click", onClick);
    nav.querySelectorAll('a[href]').forEach((link) => {
      link.addEventListener("click", close);
    });

    return () => {
      burger.removeEventListener("click", onClick);
      close();
    };
  }, []);

  return null;
}
