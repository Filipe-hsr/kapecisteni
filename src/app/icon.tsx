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
          background: "#1B1B4C",
          borderRadius: 12,
          border: "4px solid #00BFF3",
        }}
      >
        <div
          style={{
            width: 22,
            height: 30,
            background: "#00BFF3",
            borderRadius: "50% 50% 46% 46%",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
