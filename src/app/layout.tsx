import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Footer } from "@/components/layout/Footer";
import { CommandPaletteProvider } from "@/components/search/CommandPalette";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Grimório das Exatas",
    template: "%s — Grimório das Exatas",
  },
  description:
    "Catálogo completo de fórmulas de Física e Matemática para estudo e consulta",
  keywords: ["fórmulas", "física", "matemática", "grimório", "exatas", "estudo"],
  openGraph: {
    title: "Grimório das Exatas",
    description:
      "Catálogo completo de fórmulas de Física e Matemática para estudo e consulta",
    type: "website",
    locale: "pt_BR",
    siteName: "Grimório das Exatas",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body
        className={`${geistSans.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <Header />
          <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 lg:ml-64">
              {children}
            </main>
          </div>
          <Footer />
        </div>
        <CommandPaletteProvider />
      </body>
    </html>
  );
}
