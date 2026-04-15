import React from 'react';
import { Apple, CheckCircle2, Calendar, Clock } from 'lucide-react';

export const metadata = {
  title: 'Livsmedelsverkets kostråd för barn: En guide – Middagsmeny',
  description: 'Vad säger egentligen Livsmedelsverket om barnmat? Lär dig om kostcirkeln, tallriksmodellen och hur du ger ditt barn en näringsriktig kost.',
};

export default function NutritionArticle() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12">
      <header className="bg-[#051c2c] text-white py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="bg-brand-yellow text-brand-dark px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Hälsa & Kost</span>
          <h1 className="text-3xl md:text-5xl font-black leading-tight">Livsmedelsverkets kostråd för barn</h1>
          <div className="flex items-center justify-center gap-6 text-sm text-slate-300 pt-4">
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> 15 april 2026</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 8 min läsning</span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 mt-12">
        <article className="prose prose-slate lg:prose-lg mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100">
          <p className="lead text-xl text-slate-600 font-medium">
            Svenska Livsmedelsverket ger tydliga rekommendationer för att säkra barnens behov av energi och näring. Här är de viktigaste delarna du behöver ha koll på för en enklare vardag.
          </p>

          <h2 className="text-2xl font-bold text-[#051c2c] mt-8 mb-4">Kostcirkeln – Basen i matlagningen</h2>
          <p>
            Kostcirkeln grupperar livsmedel efter deras näringsinnehåll. Genom att äta något från varje grupp varje dag säkrar man att kroppen får i sig alla nödvändiga vitaminer och mineraler:
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <li><strong>Frukt & Bär:</strong> Vitaminer och fibrer.</li>
            <li><strong>Grönsaker:</strong> Viktiga mineraler.</li>
            <li><strong>Potatis & Rotfrukter:</strong> Kolhydrater och energi.</li>
            <li><strong>Mjukt & Hårt bröd, Gryn:</strong> Fibrer och järn.</li>
            <li><strong>Mejeriprodukter:</strong> Kalcium och protein.</li>
            <li><strong>Kött, Fisk & Ägg:</strong> Protein och viktiga fettlösliga vitaminer.</li>
            <li><strong>Matfett:</strong> Nödvändiga fettsyror (Omega-3).</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#051c2c] mt-8 mb-4">Tallriksmodellen för aktiva barn</h2>
          <p>
            Livsmedelsverkets tallriksmodell hjälper dig att hitta rätt proportioner. För barn som växer och rör mycket på sig rekommenderas ofta den version där kolhydraterna (pasta, ris, potatis) tar upp en större del av tallriken för att täcka energibehovet.
          </p>

          <h2 className="text-2xl font-bold text-[#051c2c] mt-8 mb-4">Tre viktiga råd från experterna</h2>
          <div className="space-y-4 my-8">
            <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-r-xl">
              <h4 className="font-bold text-green-900 mt-0">Mer grönt och fisk</h4>
              <p className="text-sm text-green-800">Sikta på 500 gram frukt och grönt per dag och fisk 2-3 gånger i veckan, varav fet fisk en gång.</p>
            </div>
            <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl">
              <h4 className="font-bold text-blue-900 mt-0">Fullkorn framför vitt</h4>
              <p className="text-sm text-blue-800">Välj fullkornsalternativ för bröd, pasta och gryn för att hålla barnens blodsocker och mättnadskänsla stabil.</p>
            </div>
            <div className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl">
              <h4 className="font-bold text-amber-900 mt-0">Begränsa socker och salt</h4>
              <p className="text-sm text-amber-800">Var vaksam på dolt socker i yoghurt och drycker, och försök att inte salta maten för mycket.</p>
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-xl border-l-4 border-brand-yellow my-8 italic text-slate-700">
            "Att följa Livsmedelsverkets råd handlar inte om förbud, utan om att lägga en stabil grund för hälsa och ork."
          </div>

          <section className="mt-12 p-8 bg-brand-blue text-white rounded-2xl space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-brand-yellow" />
              Kom ihåg D-vitamin
            </h3>
            <p className="text-sm text-slate-200">
              I Sverige rekommenderas D-droppar till alla barn upp till 2 års ålder, och ibland längre för barn som inte äter berikad mat eller fet fisk regelbundet.
            </p>
          </section>

          <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center">
             <a href="/artiklar" className="text-brand-blue font-bold hover:underline">&larr; Tillbaka till alla artiklar</a>
             <a href="/" className="px-6 py-2 bg-slate-100 text-slate-800 rounded-lg font-bold hover:bg-slate-200 transition-colors">Se vad skolan serverar</a>
          </div>
        </article>
      </main>
    </div>
  );
}
