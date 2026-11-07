import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Generated at build time by Next's opengraph-image convention, which also
 * wires og:image and twitter:image into the metadata. Drawn with flexbox only
 * because Satori, the renderer behind ImageResponse, does not implement grid.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0B1220",
          color: "#E8EDF8",
          padding: 72,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 30,
            letterSpacing: -0.5,
            color: "#E8EDF8",
          }}
        >
          <div
            style={{
              display: "flex",
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "#2F4FE0",
            }}
          />
          {site.name}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              display: "flex",
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -3,
            }}
          >
            Software that has to work.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 32,
              lineHeight: 1.35,
              color: "#9AA6C0",
              maxWidth: 900,
            }}
          >
            {site.tagline}
          </div>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ width: 132, height: 8, borderRadius: 4, background: "#2F4FE0" }} />
          <div style={{ width: 132, height: 8, borderRadius: 4, background: "#FFB627" }} />
          <div style={{ width: 132, height: 8, borderRadius: 4, background: "#FF0000" }} />
        </div>
      </div>
    ),
    size,
  );
}
