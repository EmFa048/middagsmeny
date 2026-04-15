import React from 'react';
import { Sun, CheckCircle2, Calendar, Clock } from 'lucide-react';

export const metadata = {
  title: 'Frukost för skolbarn: Ge barnen de bästa förutsättningarna – Middagsmeny',
  description: 'En bra frukost lägger grunden för hela skoldagen. Här är tips på enkla och mättande frukostar som ger barnen energi att lära sig.',
};

export default function BreakfastArticle() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12">
      <header className="bg-[#051c2c] text-white py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="bg-brand-yellow text-brand-dark px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Morgonstund</span>
          <h1 className="text-3xl md:text-5xl font-black leading-tight">En bra start på dagen</h1>
          <div className="flex items-center justify-center gap-6 text-sm text-slate-300 pt-4">
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> 15 april 2026</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 5 min läsning</span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 mt-12">
        <article className="prose prose-slate lg:prose-lg mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100">
          <p className="lead text-xl text-slate-600 font-medium">
            Många barn har svårt att äta på morgonen, men energin behövs för att orka med de första lektionerna innan det är dags för skollunch.
          </p>

          <h2 className="text-2xl font-bold text-[#051c2c] mt-8 mb-4">Vad är en "bra" frukost?</h2>
          <p>
            En optimal frukost innehåller en mix av långsamma kolhydrater (fiber), protein och bra fett. Det ger ett stabilt blodsocker som håller i flera timmar.
          </p>

          <h2 className="text-2xl font-bold text-[#051c2c] mt-8 mb-4">3 frukostfavoriter för stressiga morgnar</h2>
          <div className="space-y-6 my-8">
            <div className="p-6 bg-slate-50 rounded-xl">
               <h3 className="font-bold text-[#051c2c] mt-0">Overnight Oats</h3>
               <p className="text-sm">Förbered kvällen innan! Blanda havregryn, mjölk/växtdryck, chiafrön och lite bär i en burk. Ställ i kylen. På morgonen är den klar att ätas direkt.</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-xl">
               <h3 className="font-bold text-[#051c2c] mt-0">Äggmacka</h3>
               <p className="text-sm">Ett kokt ägg på ett grovt bröd är en svårslagen klassiker. Ägg mättar otroligt bra och ger viktiga proteiner.</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-xl">
               <h3 className="font-bold text-[#051c2c] mt-0">Grekisk yoghurt med nötter</h3>
               <p className="text-sm">Välj en naturell yoghurt för att slippa onödigt socker. Toppa med hackade nötter och lite honung eller frukt.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-[#051c2c] mt-8 mb-4">För de som inte är hungriga</h2>
          <p>
            Om barnet verkligen inte orkar äta en hel frukost direkt kan en flytande variant fungera bättre. En smoothie med havregryn och banan är lättare att få i sig och ger ändå bra med energi.
          </p>

          <div className="bg-slate-50 p-6 rounded-xl border-l-4 border-brand-yellow my-8 italic text-slate-700">
            "Frukosten behöver inte vara avancerad – det viktigaste är att barnen får i sig något som ger dem kraft att börja dagen."
          </div>

          <section className="mt-12 p-8 bg-brand-blue text-white rounded-2xl space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-brand-yellow" />
              Sömnhygien
            </h3>
            <p className="text-sm text-slate-200">
              En bra frukost börjar egentligen kvällen innan med tillräckligt mycket sömn. Ett utvilat barn är oftast mer suget på frukost än ett barn som precis väckts ur en djup sömn.
            </p>
          </section>

          <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center">
             <a href="/artiklar" className="text-brand-blue font-bold hover:underline">&larr; Tillbaka till alla artiklar</a>
             <a href="/" className="px-6 py-2 bg-slate-100 text-slate-800 rounded-lg font-bold hover:bg-slate-200 transition-colors">Vad blir det till lunch?</a>
          </div>
        </article>
      </main>
    </div>
  );
}
