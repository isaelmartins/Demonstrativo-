import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata: Metadata = {
  title: "Prestação de Contas - The Sovereign Ledger",
  description: "Demonstrativo de Execução Financeira",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="light" suppressHydrationWarning>
      <body className={`${inter.variable} ${manrope.variable} bg-surface font-body text-on-surface antialiased`}>
        {children}
      </body>
    </html>
  );
}
