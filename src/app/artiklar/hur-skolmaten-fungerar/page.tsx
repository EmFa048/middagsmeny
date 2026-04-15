import React from 'react';
import { Info, CheckCircle2, Calendar, Clock } from 'lucide-react';

export const metadata = {
  title: 'Hur fungerar skolmaten i Sverige? Allt du behöver veta – Middagsmeny',
  description: 'Visste du att Sverige är ett av få länder med gratis skolmat? Läs om lagkrav, näringsrekommendationer och hur matsedeln tas fram.',
};

export default function SchoolFoodArticle() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12">
      <header className="bg-[#051c2c] text-white py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="bg-brand-yellow text-brand-dark px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Skolfakta</span>
          <h1 className="text-3xl md:text-5xl font-black leading-tight">Hur fungerar skolmaten i Sverige?</h1>
          <div className="flex items-center justify-center gap-6 text-sm text-slate-300 pt-4">
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> 15 april 2026</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 6 min läsning</span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 mt-12">
        <article className="prose prose-slate lg:prose-lg mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100">
          <p className="lead text-xl text-slate-600 font-medium">
            Sverige har en världsunik tradition av att servera avgiftsfri skolmat till alla elever i grundskolan. Men vad är det egentligen som styr vad som hamnar på tallriken?
          </p>

          <h2 className="text-2xl font-bold text-[#051c2c] mt-8 mb-4">Lagkrav på näringsriktig mat</h2>
          <p>
            Sedan 2011 finns det ett krav i skollagen (2010:800) på att skolmaten ska vara näringsriktig. Det innebär att kommuner och friskolor inte bara ska mätta magar, utan också se till att maten innehåller rätt balans av energi, protein, fett, vitaminer och mineraler.
          </p>

          <h2 className="text-2xl font-bold text-[#051c2c] mt-8 mb-4">Livsmedelsverkets roll</h2>
          <p>
            Det är Livsmedelsverket som tar fram de nationella riktlinjerna för skolmåltider. Dessa baseras på de nordiska näringsrekommendationerna (NNR). Riktlinjerna betonar vikten av att servera mycket grönsaker, fullkorn och fisk, samt att begränsa salt och mättat fett.
          </p>

          <h2 className="text-2xl font-bold text-[#051c2c] mt-8 mb-4">Från planering till tallrik</h2>
          <p>
            Matsedelsproceduren börjar ofta månader i förväg. Många kommuner använder digitala planeringsverktyg (som Matilda Menu, vilket vi på Middagsmeny hämtar data från) för att beräkna näringsinnehåll och klimatpåverkan för varje rätt.
          </p>
          <ul>
            <li><strong>Varierad matsedel:</strong> Matsedeln planeras ofta i cykler om 4-6 veckor.</li>
            <li><strong>Specialkost:</strong> Skolan är skyldig att erbjuda säker mat till elever med allergier eller intolerans.</li>
            <li><strong>Pedagogiska måltiden:</strong> Målet är att skollunchen ska vara en del av utbildningen där elever lär sig om hälsa, miljö och kultur.</li>
          </ul>

          <div className="bg-slate-50 p-6 rounded-xl border-l-4 border-brand-yellow my-8 italic text-slate-700">
            "Skolmaten är grunden för barnens prestation. En mätt elev orkar fokusera hela eftermiddagen."
          </div>

          <h2 className="text-2xl font-bold text-[#051c2c] mt-8 mb-4">Varför synka med Middagsmeny?</h2>
          <p>
            Genom att förstå komplexiteten bakom skollunchen blir det tydligt varför det är så smart att synka middagen hemma. Om skolan har lagt stor vikt vid ett visst protein eller en specifik smak, kan du enkelt balansera upp det hemma för att ge ditt barn den mest optimala kosten över hela dygnet.
          </p>

          <section className="mt-12 p-8 bg-brand-blue text-white rounded-2xl space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-brand-yellow" />
              Snabba fakta
            </h3>
            <ul className="text-sm text-slate-200 list-disc pl-5">
              <li>Sverige serverar ca 260 miljoner skolmåltider per år.</li>
              <li>Skolmaten ska stå för ca 1/3 av barnets dagliga energibehov.</li>
              <li>Miljömål: Allt fler skolor ökar andelen ekologiska och närproducerade råvaror.</li>
            </ul>
          </section>

          <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center">
             <a href="/artiklar" className="text-brand-blue font-bold hover:underline">&larr; Tillbaka till alla artiklar</a>
             <a href="/" className="px-6 py-2 bg-slate-100 text-slate-800 rounded-lg font-bold hover:bg-slate-200 transition-colors">Se din skola</a>
          </div>
        </article>
      </main>
    </div>
  );
}
