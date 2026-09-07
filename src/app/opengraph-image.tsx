import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = "Motivox — garage software voor werkplaatsen";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #05070d 0%, #0b1220 55%, #0f1a2e 100%)",
          padding: 72,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 14,
              background: "#0165fd",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: 700,
            }}
          >
            M
          </div>
          <div
            style={{
              fontSize: 40,
              fontWeight: 700,
              color: "#eef2f8",
              letterSpacing: "0.18em",
            }}
          >
            MOTIVOX
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 58,
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              maxWidth: 900,
            }}
          >
            Eén systeem voor de hele job
          </div>
          <div
            style={{
              fontSize: 28,
              color: "rgba(238,242,248,0.72)",
              maxWidth: 820,
              lineHeight: 1.35,
            }}
          >
            Intake, keuring, uren, onderdelen en factuur — zonder overtypen.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "rgba(238,242,248,0.55)",
            fontSize: 22,
          }}
        >
          <span>{siteConfig.company}</span>
          <span style={{ color: "#0165fd", fontWeight: 600 }}>www.motivox.nl</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
