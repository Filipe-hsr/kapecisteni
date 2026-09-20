import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0B1220",
          borderRadius: 16,
        }}
      >
        <div
          style={{
            width: 28,
            height: 36,
            background: "#00A8FF",
            borderRadius: "50% 50% 50% 50%",
            transform: "rotate(0deg)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
