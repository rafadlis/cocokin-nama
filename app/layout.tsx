import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cocokin Nama",
  description: "Cocokin Nama buat murid yang namanya ngaco",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
