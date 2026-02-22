import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "./_components/Navigation";

export const metadata: Metadata = {
  title: "Wallet",
  description: "Demo app. Creating wallets and transactions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
