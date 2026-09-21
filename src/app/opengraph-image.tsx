import { ImageResponse } from "next/og";

export const alt = "KAPE čištění — Nic není tak vysoké, abychom tam nedosáhli.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0A1230 0%, #1437F5 140%)",
          color: "#F2F5FF",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 12,
              background: "#1B1B4C",
              border: "3px solid #00BFF3",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              color: "#00BFF3",
            }}
          >
            ●
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 36, fontWeight: 800, color: "#00BFF3" }}>KAPE</div>
            <div style={{ fontSize: 18, color: "rgba(242,245,255,0.62)" }}>čištění s.r.o.</div>
          </div>
        </div>
        <div
          style={{
            fontSize: 62,
            fontWeight: 800,
            lineHeight: 1.02,
            letterSpacing: "-0.04em",
            maxWidth: 920,
          }}
        >
          Nic není tak vysoké, abychom tam nedosáhli.
        </div>
        <div style={{ fontSize: 22, color: "rgba(242,245,255,0.72)" }}>
          Teplice · PuraQleen 18 m · SpaceVac 15 m · Kränzle + Oertzen
        </div>
      </div>
    ),
    { ...size },
  );
}
