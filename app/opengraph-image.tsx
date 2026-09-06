import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const runtime = "nodejs";
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
          background: "#f4f3ed",
          color: "#141817",
          padding: "72px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontFamily: "sans-serif",
              color: "#5a615e",
            }}
          >
            {site.name} · {site.role}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 64,
              lineHeight: 1.15,
              maxWidth: 980,
            }}
          >
            {site.headline}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 22,
            fontFamily: "sans-serif",
            color: "#5a615e",
          }}
        >
          {site.positioning}
        </div>
      </div>
    ),
    size,
  );
}
