import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eden Empire Ventures | Thoughtful Security, Made Simple",
  description:
    "Meet thoughtful home security from Eden Empire Ventures. Shop cameras, door security, alarms, and sensors designed to bring a little more peace of mind.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
