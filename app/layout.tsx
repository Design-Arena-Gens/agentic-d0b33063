import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Landing Page Generator",
  description: "Generate beautiful landing pages in seconds with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
