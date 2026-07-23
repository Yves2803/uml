import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Forma — Votre parcours de formation",
  description: "Catalogue de formations personnalisé pour les collaborateurs",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
