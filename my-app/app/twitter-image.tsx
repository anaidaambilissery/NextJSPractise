import { ImageResponse } from "next/og";

export const alt = "Technical Blog";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0f172a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            background: "#2563eb",
            color: "white",
            padding: "8px 16px",
            borderRadius: "6px",
            fontSize: "24px",
            fontWeight: 700,
            marginBottom: "24px",
          }}
        >
          Technical Blog
        </div>
        <div
          style={{
            fontSize: "60px",
            fontWeight: 800,
            lineHeight: 1.2,
            marginBottom: "20px",
          }}
        >
          Modern Web Development & Next.js
        </div>
        <div
          style={{
            fontSize: "28px",
            color: "#94a3b8",
          }}
        >
          High-performance articles, tutorials, and technical insights.
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
