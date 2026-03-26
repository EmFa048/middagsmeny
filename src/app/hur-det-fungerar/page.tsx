import React from 'react';
import { Settings, RefreshCw, ChefHat, Database, HelpCircle } from 'lucide-react';

export const metadata = {
  title: 'Hur det fungerar – Vetenskapen bakom Middagsmeny',
  description: 'Lär dig hur Middagsmeny hämtar skolmatssedlar och hur vår algoritm väljer ut de bästa middagsförslagen för din familj.',
};

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12">
      <header className="bg-[#051c2c] text-white py-12 px-6 text-center">
        <h1 className="text-3xl md:text-5xl font-black mb-4">Hur fungerar det?</h1>
        <p className="text-brand-yellow font-bold uppercase tracking-widest text-sm">Tekniken bakom smartare matplanering</p>
      </header>

      <main className="max-w-4xl mx-auto px-6 mt-12 space-y-12">
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <Database className="w-6 h-6 text-brand-blue" />
            <h2 className="text-2xl font-bold text-[#051c2c]">1. Vi hämtar dagens lunch</h2>
          </div>
          <p className="leading-relaxed">
            Middagsmeny är tekniskt integrerat med de största leverantörerna av skolmatssedlar i Sverige. Vi ansluter till system som Matilda Menu för att i realtid hämta den senaste matsedeln för tusentals skolor och förskolor. 
          </p>
          <p className="leading-relaxed">
            När du väljer din skola i sökfältet skickas en förfrågan till vår server, som i sin tur hämtar menyn direkt från skolans leverantör. På så sätt har du alltid tillgång till den senaste informationen utan att behöva leta på föråldrade PDF-filer eller skolans egna webbsidor.
          </p>
        </section>

        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <Settings className="w-6 h-6 text-brand-yellow" />
            <h2 className="text-2xl font-bold text-[#051c2c]">2. Algoritmen väljer middag</h2>
          </div>
          <p className="leading-relaxed">
            Hjärtat i vår tjänst är algoritmen som väljer fram middagsförslaget. Istället för att bara slumpa en rätt, väger algoritmen samman flera faktorer:
          </p>
          <ul className="grid md:grid-cols-2 gap-4 pt-2">
            <li className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <strong className="block text-brand-blue mb-1">Proteinkontroll</strong>
              Vi ser till att om barnen ätit fisk till lunch, föreslår vi kött, kyckling eller vegetariskt till middag.
            </li>
            <li className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <strong className="block text-brand-blue mb-1">Variation i tillbehör</strong>
              Om skolan serverat potatismos försöker vi undvika potatisbaserade rätter till kvällen för att skapa variation.
            </li>
            <li className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <strong className="block text-brand-blue mb-1">Vardagssmart</strong>
              Alla våra 130+ recept är valda för att de går snabbt att laga och är barnvänliga.
            </li>
            <li className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <strong className="block text-brand-blue mb-1">Dina val</strong>
              Algoritmen prioriterar dina sparade favoriträtter och respekterar dina kostpreferenser (t.ex. vegetariskt).
            </li>
          </ul>
        </section>

        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <ChefHat className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-bold text-[#051c2c]">3. Full kontroll i din webbläsare</h2>
          </div>
          <p className="leading-relaxed">
            Vi bryr oss om din integritet. Därför sparas ingenting i någon central databas. När du sparar din favoritskola eller lägger till ett eget recept sparas det direkt i din webbläsares <em>Local Storage</em>. Detta innebär att tjänsten är blixtsnabb och att du alltid äger din egen data.
          </p>
        </section>

        <section className="bg-brand-blue text-white p-8 md:p-12 rounded-2xl shadow-xl space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <HelpCircle className="w-6 h-6 text-brand-yellow" />
            <h2 className="text-2xl font-bold text-white">Vanliga frågor om tekniken</h2>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-brand-yellow uppercase text-xs mb-1">Varför laddar menyn ibland långsamt?</h4>
              <p className="text-sm text-slate-200">Vi hämtar menyn live från skolans system. Om deras servrar är långsamma eller om matsedeln är mycket stor kan det ta några sekunder.</p>
            </div>
            <div>
              <h4 className="font-bold text-brand-yellow uppercase text-xs mb-1">Hur lägger jag till min egen skola?</h4>
              <p className="text-sm text-slate-200">Sök på din skola eller din ort i sökfältet. Om din skola finns i systemet kommer den att visas i sökresultatet direkt.</p>
            </div>
          </div>
          <div className="pt-4">
             <a href="/" className="inline-block px-8 py-3 bg-white text-brand-blue rounded-full font-bold hover:scale-105 transition-transform">
               Prova att söka nu!
             </a>
          </div>
        </section>
      </main>
    </div>
  );
}
