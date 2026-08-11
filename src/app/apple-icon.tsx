import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1F3A5F",
          color: "#F5A623",
          fontSize: 108,
          fontWeight: 700,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        G
      </div>
    ),
    { ...size },
  );
}
