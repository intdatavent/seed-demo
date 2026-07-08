import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seed Demo — Lista della Spesa AI",
  description:
    "App demo per il piano Seed: lista della spesa con suggerimenti intelligenti.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body
        style={{
          margin: 0,
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          background: "#f5f7fa",
          color: "#1a1a2e",
        }}
      >
        {children}
      </body>
    </html>
  );
}
