"use client";

import { useEffect } from "react";

export function KapeRuntime() {
  useEffect(() => {
    if (document.getElementById("kape-runtime")) return;
    const script = document.createElement("script");
    script.id = "kape-runtime";
    script.src = "/kape-runtime.js";
    script.async = false;
    document.body.appendChild(script);
  }, []);

  return null;
}
