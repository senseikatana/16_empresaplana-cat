import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Empresa Plana | Transport públic de viatgers - Costa Daurada i Camp de Tarragona",
  description:
    "Empresa Plana ofereix serveis de transport públic de viatgers a la Costa Daurada i el Camp de Tarragona. Buscador de línies, rutes amb mapa OpenStreetMap en directe, transfers aeroport de Barcelona i Reus, i serveis discrecionales.",
  keywords: [
    "Empresa Plana",
    "autobusos Tarragona",
    "Costa Daurada",
    "Camp de Tarragona",
    "aeroport Barcelona",
    "aeroport Reus",
    "bus Salou",
    "bus Cambrils",
    "línees regulars",
    "transfers",
  ],
  authors: [{ name: "Empresa Plana, SL" }],
  openGraph: {
    title: "Empresa Plana | Transport públic de viatgers",
    description:
      "Línies regulars d'autobús per la Costa Daurada, Camp de Tarragona i connexions amb Barcelona i els aeroports. Buscador de rutes amb mapa en directe.",
    siteName: "Empresa Plana",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Empresa Plana | Transport públic de viatgers",
    description:
      "Buscador de línies i rutes amb mapa OpenStreetMap en directe per la Costa Daurada i el Camp de Tarragona.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ca" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
