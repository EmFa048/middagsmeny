import React from 'react';
import { Mail, MessageSquare, Coffee, ExternalLink } from 'lucide-react';

export const metadata = {
  title: 'Kontakt – Hör av dig till oss på Middagsmeny',
  description: 'Har du frågor, förslag på nya skolor eller vill du dela med dig av ett favoritrecept? Kontakta oss på Middagsmeny.se.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12">
      <header className="bg-[#051c2c] text-white py-12 px-6 text-center">
        <h1 className="text-3xl md:text-5xl font-black mb-4">Kontakta oss</h1>
        <p className="text-brand-yellow font-bold uppercase tracking-widest text-sm">Vi vill gärna höra från dig!</p>
      </header>

      <main className="max-w-3xl mx-auto px-6 mt-12 space-y-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-6">
          <p className="leading-relaxed text-slate-600">
            Har du upptäckt att en skola saknas, eller har du förslag på hur vi kan göra Middagsmeny ännu bättre? Vi är ett litet team som bygger den här tjänsten på vår fritid, och vi uppskattar all feedback vi kan få.
          </p>

          <div className="grid md:grid-cols-2 gap-6 pt-4">
            <a 
              href="mailto:hej@middagsmeny.se" 
              className="flex items-center gap-4 p-6 bg-slate-50 rounded-xl hover:bg-brand-yellow/10 border border-transparent hover:border-brand-yellow/30 transition-all group"
            >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6 text-brand-blue" />
              </div>
              <div>
                <h3 className="font-bold text-[#051c2c]">E-post</h3>
                <p className="text-xs text-slate-500">hej@middagsmeny.se</p>
              </div>
            </a>

            <a 
              href="https://buymeacoffee.com/edysweden" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-6 bg-slate-50 rounded-xl hover:bg-brand-yellow/10 border border-transparent hover:border-brand-yellow/30 transition-all group"
            >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <Coffee className="w-6 h-6 text-[#FFDD00]" />
              </div>
              <div>
                <h3 className="font-bold text-[#051c2c]">Stöd oss</h3>
                <p className="text-xs text-slate-500">Bjud på en kaffe</p>
              </div>
            </a>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <MessageSquare className="w-6 h-6 text-brand-blue" />
            <h2 className="text-xl font-bold text-[#051c2c]">Vanliga frågor</h2>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            Innan du skickar ett mail, kika gärna på vår <a href="/hur-det-fungerar" className="text-brand-blue hover:underline">Hur det fungerar</a>-sida. Där svarar vi på de vanligaste frågorna om hur vi hämtar menyer och hur algoritmen fungerar.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            <strong>Saknas din skola?</strong> Vi hämtar menyer från de flesta skolor som använder Matilda Menu-systemet. Om din skola använder ett annat system kan det vara svårare för oss att lägga till den, men skicka gärna länken så ska vi se vad vi kan göra!
          </p>
        </div>

        <div className="text-center pt-8">
          <a href="/" className="text-slate-400 hover:text-brand-blue transition-colors text-sm font-medium">
            &larr; Tillbaka till startsidan
          </a>
        </div>
      </main>
    </div>
  );
}
