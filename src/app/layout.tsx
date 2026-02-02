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

export const metadata: Metadata = {
  title: "Middagsmeny",
  description: "Synka skollunchen med smarta middagsförslag",
  manifest: "/manifest.json",
  themeColor: "#051c2c",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0",
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
        <link rel="icon" href="/favicon.png?v=10" type="image/png" />
        <link rel="shortcut icon" href="/favicon.png?v=10" type="image/png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
