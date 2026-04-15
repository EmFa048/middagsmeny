import React from 'react';
import { Coffee, CheckCircle2, Calendar, Clock, Trophy } from 'lucide-react';

export const metadata = {
  title: 'Mellis för aktiva barn: Energi som räcker hela dagen – Middagsmeny',
  description: 'Aktiva barn behöver rätt sorts energi för att orka med både skola och träning. Här är våra bästa tips på näringsrika mellanmål som mättar bra.',
};

export default function SnacksArticle() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12">
      <header className="bg-[#051c2c] text-white py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="bg-brand-yellow text-brand-dark px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Aktiv Vardag</span>
          <h1 className="text-3xl md:text-5xl font-black leading-tight">Mellis för aktiva barn</h1>
          <div className="flex items-center justify-center gap-6 text-sm text-slate-300 pt-4">
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> 15 april 2026</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 5 min läsning</span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 mt-12">
        <article className="prose prose-slate lg:prose-lg mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100">
          <p className="lead text-xl text-slate-600 font-medium">
            När eftermiddagen fylls av fotbollsträning, gympa eller lek utomhus räcker det inte med ett äpple. Aktiva barn behöver mellanmål som ger både snabb energi och långvarig mättnad.
          </p>

          <h2 className="text-2xl font-bold text-[#051c2c] mt-8 mb-4">Balansen mellan protein och kolhydrater</h2>
          <p>
            För barn som rör på sig mycket är balansen viktig. Kolhydraterna fungerar som bränsle för musklerna, medan proteinet hjälper till med återhämtningen. Bra fettkällor ser till att energin räcker ända fram till middagen.
          </p>

          <h2 className="text-2xl font-bold text-[#051c2c] mt-8 mb-4">4 kraftfulla mellis för små idrottare</h2>
          <div className="grid md:grid-cols-2 gap-6 my-8">
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
              <div className="w-10 h-10 bg-brand-yellow/20 rounded-full flex items-center justify-center mb-4 text-brand-yellow">
                <Trophy className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-[#051c2c] mt-0">Energismörgås</h3>
              <p className="text-sm">Grovt bröd med jordnötssmör (om skolan tillåter) och skivad banan. Ger massor av bra energi och mättar länge.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <h3 className="font-bold text-[#051c2c] mb-2">Kvarg med nötter</h3>
              <p className="text-sm">Naturell kvarg eller grekisk yoghurt toppad med valnötter och en klick honung. Proteinet i kvargen är perfekt för återhämtning.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <h3 className="font-bold text-[#051c2c] mb-2">Hembakade energibars</h3>
              <p className="text-sm">Gör egna bars på havregryn, dadlar och solrosfrön. Perfekta att ha i väskan på väg till träningen.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <h3 className="font-bold text-[#051c2c] mb-2">Ägg & Avocado</h3>
              <p className="text-sm">Ett kokt ägg och en halv avocado. Enkelt att förbereda och packat med nyttiga fetter och proteiner.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-[#051c2c] mt-8 mb-4">Tajmingen är allt</h2>
          <p>
            Ett större mellanmål bör ätas ca 1,5–2 timmar före träning. Om det är kortare tid kvar räcker det med något lättsmält, som en banan, för att inte belasta magen under aktiviteten.
          </p>

          <div className="bg-slate-50 p-6 rounded-xl border-l-4 border-brand-yellow my-8 italic text-slate-700">
            "Målet är att barnen ska ha roligt och orka hela träningen, utan att energin tar slut halvvägs."
          </div>

          <section className="mt-12 p-8 bg-brand-blue text-white rounded-2xl space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-brand-yellow" />
              Vätska är A och O
            </h3>
            <p className="text-sm text-slate-200">
              Glöm inte vattenflaskan! Aktiva barn behöver dricka regelbundet under hela dagen, inte bara när de tränar.
            </p>
          </section>

          <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center">
             <a href="/artiklar" className="text-brand-blue font-bold hover:underline">&larr; Tillbaka till alla artiklar</a>
             <a href="/" className="px-6 py-2 bg-slate-100 text-slate-800 rounded-lg font-bold hover:bg-slate-200 transition-colors">Vad blir det till middag?</a>
          </div>
        </article>
      </main>
    </div>
  );
}
