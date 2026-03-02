import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  themeColor: "#051c2c",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Middagsmeny",
  description: "Synka skollunchen med smarta middagsförslag",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Middagsmeny",
  },
  openGraph: {
    title: "Middagsmeny",
    description: "Slut på middagspaniken! Vi matchar skollunchen med goda receptförslag hemma.",
    url: "https://middagsmeny.se",
    siteName: "Middagsmeny",
    images: [
      {
        url: "/logo.png",
        width: 1024,
        height: 1024,
      },
    ],
    locale: "sv_SE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Middagsmeny",
    description: "Synka skollunchen med smarta middagsförslag",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-72x72.png?v=2" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png?v=2" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5713849466989513" crossOrigin="anonymous"></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
