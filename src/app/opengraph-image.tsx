import { ImageResponse } from "next/og";

import { currentRole } from "@/data/experiences";
import { site } from "@/data/site";

export const alt =
  "George Vlassis — engineering and product leadership in blockchain security";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// No request data or external assets: Next.js generates this card at build time.
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: 64,
        background: "#09090b",
        color: "#fafafa",
      }}
    >
      <div style={{ display: "flex", color: "#a1a1aa", fontSize: 26 }}>
        {new URL(site.url).hostname}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 700 }}>
          {site.name}
        </div>
        <div style={{ display: "flex", fontSize: 38, lineHeight: 1.25 }}>
          Engineering and product in blockchain security
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          borderTop: "1px solid #3f3f46",
          paddingTop: 28,
          color: "#a1a1aa",
          fontSize: 26,
        }}
      >
        <div style={{ display: "flex" }}>{currentRole.title}</div>
        <div style={{ display: "flex" }}>{currentRole.company}</div>
      </div>
    </div>,
    size,
  );
}
