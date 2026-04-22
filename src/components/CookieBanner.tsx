"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already consented
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#051c2c] text-white p-4 md:p-6 shadow-2xl border-t border-slate-800">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-slate-300">
          <p>
            Vi använder cookies för att anpassa innehåll och annonser, erbjuda
            funktioner i sociala medier och analysera trafik till webbplatsen.
            Genom att klicka på "Acceptera" godkänner du vår användning av
            cookies.
          </p>
          <Link
            href="/privacy"
            className="text-brand-yellow hover:underline mt-1 inline-block"
          >
            Läs mer i vår integritetspolicy
          </Link>
        </div>
        <div className="flex shrink-0">
          <button
            onClick={handleAccept}
            className="bg-brand-yellow text-[#051c2c] font-bold px-6 py-3 rounded-full hover:bg-yellow-400 transition-colors shadow-lg whitespace-nowrap"
          >
            Acceptera cookies
          </button>
        </div>
      </div>
    </div>
  );
}
