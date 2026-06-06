import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const runtime = "edge";
export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#0A0A0B",
          color: "#ECECEE",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: "16px",
            color: "#8A8A92",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "999px",
              background: "#C6FF3D",
            }}
          />
          {site.role}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: "180px",
              fontWeight: 600,
              lineHeight: 0.9,
              letterSpacing: "-0.04em",
              color: "#ECECEE",
              display: "flex",
            }}
          >
            {site.name}.
          </div>
          <div
            style={{
              fontSize: "44px",
              fontStyle: "italic",
              color: "#8A8A92",
              marginTop: "16px",
              display: "flex",
            }}
          >
            I build the web end-to-end.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "20px",
            color: "#8A8A92",
          }}
        >
          <div style={{ display: "flex" }}>{site.email}</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#C6FF3D",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              fontSize: "16px",
            }}
          >
            Portfolio · 2025
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
