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
          background: "linear-gradient(135deg, #0B1220 0%, #12203a 55%, #0066FF 140%)",
          color: "white",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              border: "3px solid #00A8FF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
            }}
          >
            ●
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 36, fontWeight: 800, color: "#00A8FF" }}>KAPE</div>
            <div style={{ fontSize: 18, color: "rgba(255,255,255,0.6)" }}>čištění s.r.o.</div>
          </div>
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
            maxWidth: 900,
          }}
        >
          Nic není tak vysoké, abychom tam nedosáhli.
        </div>
        <div style={{ fontSize: 24, color: "rgba(255,255,255,0.7)" }}>
          Teplice · PuraQleen 18 m · SpaceVac 15 m
        </div>
      </div>
    ),
    { ...size }
  );
}
