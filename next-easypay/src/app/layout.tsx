import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PluxNet Fibre - EasyPay Generator",
  description: "Generate your EasyPay reference number for PluxNet Fibre payments. Fast, secure, and convenient online payment solution.",
  keywords: ["PluxNet", "Fibre", "EasyPay", "Payment", "Reference", "Internet", "South Africa"],
  authors: [{ name: "PluxNet Fibre", url: "https://www.pluxnet.co.za" }],
  creator: "PluxNet Fibre",
  publisher: "PluxNet Fibre",
  metadataBase: new URL("https://www.pluxnet.co.za"),
  openGraph: {
    title: "PluxNet Fibre - EasyPay Generator",
    description: "Generate your EasyPay reference number for PluxNet Fibre payments",
    url: "https://www.pluxnet.co.za",
    siteName: "PluxNet Fibre",
    type: "website",
    locale: "en_ZA",
  },
  twitter: {
    card: "summary_large_image",
    title: "PluxNet Fibre - EasyPay Generator",
    description: "Generate your EasyPay reference number for PluxNet Fibre payments",
    creator: "@PluxNet",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
