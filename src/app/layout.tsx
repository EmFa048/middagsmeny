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
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <nav className="bg-[#051c2c] text-white border-b border-white/5 py-3 px-6">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <a href="/" className="font-black text-lg tracking-tighter hover:text-brand-yellow transition-colors">
              Middagsmeny<span className="text-brand-yellow">.se</span>
            </a>
            <div className="flex gap-4 md:gap-8 text-[10px] md:text-xs font-bold uppercase tracking-widest">
              <a href="/hur-det-fungerar" className="hover:text-brand-yellow transition-colors">Hur det fungerar</a>
              <a href="/artiklar" className="hover:text-brand-yellow transition-colors">Tips & Artiklar</a>
              <a href="/om-oss" className="hover:text-brand-yellow transition-colors hidden sm:block">Om oss</a>
            </div>
          </div>
        </nav>
        <div className="flex-grow">
          {children}
        </div>

        {/* Global Footer Expansion for SEO & Navigation */}
        <footer className="bg-slate-900 text-slate-300 py-12 px-6 mt-auto">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 space-y-4">
              <h3 className="text-white font-black text-xl">Middagsmeny<span className="text-brand-yellow">.se</span></h3>
              <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
                Vi hjälper svenska barnfamiljer att synka skollunchen med smarta, varierande och enkla middagsförslag för en stressfri vardag.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">Sidor</h4>
              <ul className="text-sm space-y-2">
                <li><a href="/" className="hover:text-brand-yellow">Startsida</a></li>
                <li><a href="/hur-det-fungerar" className="hover:text-brand-yellow">Hur det fungerar</a></li>
                <li><a href="/artiklar" className="hover:text-brand-yellow">Tips & Artiklar</a></li>
                <li><a href="/om-oss" className="hover:text-brand-yellow">Om oss</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">Support</h4>
              <ul className="text-sm space-y-2">
                <li><a href="/kontakt" className="hover:text-brand-yellow">Kontakt</a></li>
                <li><a href="/privacy" className="hover:text-brand-yellow">Integritetspolicy</a></li>
                <li><a href="https://buymeacoffee.com/edysweden" target="_blank" rel="noopener noreferrer" className="hover:text-brand-yellow">Bjud på en kaffe</a></li>
              </ul>
            </div>
          </div>
          <div className="max-w-4xl mx-auto border-t border-slate-800 mt-12 pt-8 text-center">
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
              Middagsmeny © {new Date().getFullYear()} — Din guide till en enklare vardag. version 1.3.0
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
