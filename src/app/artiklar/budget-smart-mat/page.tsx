import React from 'react';
import { Wallet, CheckCircle2, Calendar, Clock } from 'lucide-react';

export const metadata = {
  title: 'Budget-smart matplanering: Spara tusenlappar varje månad – Middagsmeny',
  description: 'Matpriserna stiger, men det går att äta gott och nyttigt utan att ruinera sig. Här är våra bästa tips för en budgetvänlig matvecka.',
};

export default function BudgetArticle() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12">
      <header className="bg-[#051c2c] text-white py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="bg-brand-yellow text-brand-dark px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Ekonomi</span>
          <h1 className="text-3xl md:text-5xl font-black leading-tight">Spara pengar på matkontot</h1>
          <div className="flex items-center justify-center gap-6 text-sm text-slate-300 pt-4">
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> 15 april 2026</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 6 min läsning</span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 mt-12">
        <article className="prose prose-slate lg:prose-lg mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100">
          <p className="lead text-xl text-slate-600 font-medium">
            Matkostnaderna är en av de största utgifterna för en barnfamilj. Men med lite planering och smarta val kan du sänka dina kostnader rejält utan att tumma på kvaliteten.
          </p>

          <h2 className="text-2xl font-bold text-[#051c2c] mt-8 mb-4">1. Handla efter säsong</h2>
          <p>
            Grönsaker och frukter är som billigast (och godast) när de är i säsong. Rotfrukter som morötter, palsternacka och kål är fantastiska budgethjältar under vinterhalvåret, medan tomater och gurka är billigare på sommaren.
          </p>

          <h2 className="text-2xl font-bold text-[#051c2c] mt-8 mb-4">2. Byt ut dyrt protein</h2>
          <p>
            Kött är ofta den dyraste komponenten i en måltid. Du kan spara mycket genom att:
          </p>
          <ul>
            <li><strong>Dryga ut köttfärsen:</strong> Blanda i rivna morötter eller linser i färsen. Det blir både nyttigare och billigare.</li>
            <li><strong>Använda bönor och linser:</strong> Dessa mättar bra och kostar bara en bråkdel av vad kött eller fisk gör.</li>
            <li><strong>Ägg:</strong> Ett fantastiskt och billigt protein som passar i allt från pannkakor till omelett.</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#051c2c] mt-8 mb-4">3. Sluta med spontanköp</h2>
          <p>
            Varje gång du går in i en mataffär utan en lista riskerar du att komma ut med saker du inte behöver. Genom att använda <strong>Middagsmeny.se</strong> för att planera din vecka skapar du en struktur som gör att du bara köper det du faktiskt ska äta.
          </p>

          <div className="bg-slate-50 p-6 rounded-xl border-l-4 border-brand-yellow my-8 italic text-slate-700">
            "De billigaste måltiderna är de du lagar av det du redan har hemma."
          </div>

          <h2 className="text-2xl font-bold text-[#051c2c] mt-8 mb-4">4. Storhandla online</h2>
          <p>
            Många upplever att de sparar pengar genom att handla online. Man ser totalsumman direkt och slipper lockas av "2 för 1"-erbjudanden på saker man egentligen inte behöver. Dessutom sparar du tid och slipper stressen med barn i butiken.
          </p>

          <section className="mt-12 p-8 bg-brand-blue text-white rounded-2xl space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-brand-yellow" />
              Budgethjältar i skafferiet
            </h3>
            <ul className="text-sm text-slate-200 list-disc pl-5">
              <li>Havregryn (frukost och bakning)</li>
              <li>Krossade tomater (bas i såser)</li>
              <li>Torkade linser och bönor</li>
              <li>Potatis och lök</li>
              <li>Pasta och ris i storpack</li>
            </ul>
          </section>

          <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center">
             <a href="/artiklar" className="text-brand-blue font-bold hover:underline">&larr; Tillbaka till alla artiklar</a>
             <a href="/" className="px-6 py-2 bg-slate-100 text-slate-800 rounded-lg font-bold hover:bg-slate-200 transition-colors">Planera och spara</a>
          </div>
        </article>
      </main>
    </div>
  );
}
