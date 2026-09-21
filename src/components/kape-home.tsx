"use client";

import { useEffect } from "react";
import { HOME_HTML } from "@/content/home-markup";
import { initKape } from "@/lib/kape-runtime";

export function KapeHome() {
  useEffect(() => initKape(), []);

  return <div dangerouslySetInnerHTML={{ __html: HOME_HTML }} />;
}
