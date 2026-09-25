import { ImageResponse } from "next/og";
import { join } from "node:path";
import { readFile } from "node:fs/promises";

export const alt = "Wake — Wanjohi Kelvin, full-stack engineer building SaaS, mobile & AI products";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export const runtime = "nodejs";

const INK = "#09090b";
const INK_SOFT = "#131316";
const WAKE = "#ff5c00";
const EMBER = "#ff8a3d";
const SKY = "#0f0f12";

const FONT_700 = await readFile(join(process.cwd(), "assets/fonts/space-grotesk-700.ttf"));
const FONT_500 = await readFile(join(process.cwd(), "assets/fonts/space-grotesk-500.ttf"));

const SKYLINE = [
  { w: 3.4, h: 7 },
  { w: 4.2, h: 11 },
  { w: 3.4, h: 5 },
  { w: 4.6, h: 15 },
  { w: 6.6, h: 22 },
  { w: 4.6, h: 12 },
  { w: 3.4, h: 6 },
  { w: 4.2, h: 16 },
  { w: 5.0, h: 9 },
  { w: 4.0, h: 18 },
  { w: 6.0, h: 13 },
  { w: 4.0, h: 7 },
];

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: INK,
          color: "#fff",
          fontFamily: "SpaceGrotesk",
          display: "flex",
          flexDirection: "column",
          padding: "64px 76px 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {Array.from({ length: 27 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: "100%",
                height: "4px",
                borderBottom: "1px solid " + INK_SOFT,
                display: "flex",
                flexDirection: "row",
              }}
            >
              {Array.from({ length: 7 }).map((_, j) => (
                <div
                  key={j}
                  style={{
                    flex: 1,
                    height: "100%",
                    borderRight: "1px solid " + INK_SOFT,
                  }}
                />
              ))}
            </div>
          ))}
        </div>

        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: WAKE,
                }}
              />
              <div
                style={{
                  fontSize: 30,
                  fontWeight: 500,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#9a9da5",
                }}
              >
                Wanjohi Kelvin · Kenya
              </div>
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 176,
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: "-0.04em",
                marginTop: 22,
              }}
            >
              <span>Wake</span>
              <span style={{ color: WAKE }}>.</span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                fontSize: 30,
                fontWeight: 500,
                color: "#c6c8cf",
                maxWidth: 640,
                lineHeight: 1.3,
                marginTop: 16,
              }}
            >
              <span>Full-stack engineer building </span>
              <span style={{ color: EMBER }}>SaaS, mobile &amp; AI</span>
              <span> products — from first commit to production.</span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 10,
              fontSize: 22,
              fontWeight: 500,
              color: "#75787f",
              marginTop: 20,
            }}
          >
            <span>{"// 25+ projects shipped"}</span>
            <span>{"// 5 domains explored"}</span>
            <span>{"// open to work"}</span>
          </div>
        </div>

        <div
          style={{
            position: "relative",
            marginTop: "auto",
            height: 190,
            display: "flex",
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: -70,
              right: -30,
              width: 330,
              height: 330,
              borderRadius: "50%",
              background: "rgba(255,140,61,0.20)",
            }}
          />
          <div
            style={{
              display: "flex",
              flex: 1,
              height: 190,
              alignItems: "flex-end",
              gap: 12,
              position: "relative",
              zIndex: 1,
            }}
          >
            {SKYLINE.map((b, i) => (
              <div
                key={i}
                style={{
                  width: `${b.w}%`,
                  height: `${b.h * 7.5}px`,
                  background: SKY,
                  borderTop: "3px solid " + (i % 2 === 0 ? EMBER : "transparent"),
                  display: "flex",
                  flexDirection: "column-reverse",
                }}
              >
                {i % 3 === 0 ? (
                  <div
                    style={{
                      width: "34%",
                      height: "46%",
                      border: "2px solid #27272c",
                      borderBottom: "none",
                      marginBottom: 14,
                    }}
                  />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "SpaceGrotesk", data: FONT_700, weight: 700, style: "normal" },
        { name: "SpaceGrotesk", data: FONT_500, weight: 500, style: "normal" },
      ],
    }
  );
}