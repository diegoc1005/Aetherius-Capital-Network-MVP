import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Aetherius Capital Network — Institutional Dashboard",
  description:
    "Plataforma institucional de Capital Privado tokenizado sobre Avalanche. Gestión de portafolio, compliance regulatorio y mercado secundario de RWAs con protocolo eERC20.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${firaCode.variable} h-full dark`}
    >
      <body className="min-h-full bg-[#09090B] text-[#F4F4F5] antialiased">
        {children}
      </body>
    </html>
  );
}
