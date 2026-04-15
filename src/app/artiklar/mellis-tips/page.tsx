import React from 'react';
import { Coffee, CheckCircle2, Calendar, Clock } from 'lucide-react';

export const metadata = {
  title: 'Nyttiga och snabba mellis-tips för hungriga barn – Middagsmeny',
  description: 'Mellanmålet är ofta dagens svåraste mål. Här får du inspiration till enkla och näringsrika mellanmål som håller barnen mätta fram till middagen.',
};

export default function SnacksArticle() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12">
      <header className="bg-[#051c2c] text-white py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="bg-brand-yellow text-brand-dark px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Vardagstips</span>
          <h1 className="text-3xl md:text-5xl font-black leading-tight">Snabba & nyttiga mellis</h1>
          <div className="flex items-center justify-center gap-6 text-sm text-slate-300 pt-4">
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> 15 april 2026</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 4 min läsning</span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 mt-12">
        <article className="prose prose-slate lg:prose-lg mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100">
          <p className="lead text-xl text-slate-600 font-medium">
            Klockan är 15:00 och energin börjar tryta efter skolan. Istället för att ta första bästa bulle eller kex, satsa på ett mellis som ger jämn energi utan sockerdippar.
          </p>

          <h2 className="text-2xl font-bold text-[#051c2c] mt-8 mb-4">Varför är mellanmålet viktigt?</h2>
          <p>
            Ett bra mellanmål hjälper barnen att hålla koncentrationen uppe och minskar risken för att de blir "hangry" (hungriga och arga) innan middagen är klar. Målet är att få i sig lite protein, bra fett och långsamma kolhydrater.
          </p>

          <h2 className="text-2xl font-bold text-[#051c2c] mt-8 mb-4">5 enkla mellis-tips</h2>
          <div className="grid md:grid-cols-2 gap-4 my-8">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <h3 className="font-bold text-[#051c2c] mb-2">1. Bananpannkakor</h3>
              <p className="text-sm">Mosa en banan, blanda med två ägg och stek. Snabbt, naturligt sött och fullt med proteiner.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <h3 className="font-bold text-[#051c2c] mb-2">2. Keso med bär</h3>
              <p className="text-sm">En proteinbomb som mättar otroligt bra. Toppa med frysta eller färska bär och lite frön.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <h3 className="font-bold text-[#051c2c] mb-2">3. Grönsaksstavar med dipp</h3>
              <p className="text-sm">Skär upp morötter, gurka och paprika. Servera med en klick hummus eller lite gräddfilsdipp.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <h3 className="font-bold text-[#051c2c] mb-2">4. Smoothie</h3>
              <p className="text-sm">Mixa yoghurt, spenat, banan och lite bär. Ett perfekt sätt att "smyga" ner lite grönt.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-[#051c2c] mt-8 mb-4">Mellis on-the-go</h2>
          <p>
            Om ni ska direkt på träning eller aktivitet behövs något som är enkelt att äta i farten. Ett kokt ägg, en näve nötter (om ingen i gruppen är allergisk) eller ett grovt bröd med ost är klassiker som fungerar.
          </p>

          <div className="bg-slate-50 p-6 rounded-xl border-l-4 border-brand-yellow my-8 italic text-slate-700">
            "Ett bra mellanmål är inte en ersättning för middagen, utan bryggan som gör att orken räcker ända fram."
          </div>

          <section className="mt-12 p-8 bg-brand-blue text-white rounded-2xl space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-brand-yellow" />
              Tänk på tänderna
            </h3>
            <p className="text-sm text-slate-200">
              Välj vatten som dryck till mellanmålet. Juice och mjölk innehåller socker som kan skada tänderna om man dricker det för ofta mellan målen.
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
