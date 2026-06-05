import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meeting Room Booking",
  description:
    "Simple meeting room booking app built with Next.js App Router, TypeScript, and Tailwind.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
