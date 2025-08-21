import type { Metadata } from "next";
import { Geist_Mono, Playfair_Display, Oswald } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/header";

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Wahlino",
  description: "Spela bingo, poker och andra casinospel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${playfair.variable} ${oswald.variable} ${geistMono.variable} antialiased`}
        >
          <Header />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
