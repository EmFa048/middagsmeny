import React from 'react';
import { Apple, CheckCircle2, Calendar, Clock } from 'lucide-react';

export const metadata = {
  title: 'Näring för växande barn: En guide för föräldrar – Middagsmeny',
  description: 'Vad behöver barn egentligen äta? Lär dig om de viktigaste näringsämnena och hur du skapar balanserade måltider som barn faktiskt vill äta.',
};

export default function NutritionArticle() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12">
      <header className="bg-[#051c2c] text-white py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="bg-brand-yellow text-brand-dark px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Hälsa & Kost</span>
          <h1 className="text-3xl md:text-5xl font-black leading-tight">Näring för växande barn</h1>
          <div className="flex items-center justify-center gap-6 text-sm text-slate-300 pt-4">
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> 15 april 2026</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 7 min läsning</span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 mt-12">
        <article className="prose prose-slate lg:prose-lg mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100">
          <p className="lead text-xl text-slate-600 font-medium">
            Barn som växer behöver massor av energi, men det är också viktigt var den energin kommer ifrån. Här går vi igenom grunderna i barnnäring utan att göra det komplicerat.
          </p>

          <h2 className="text-2xl font-bold text-[#051c2c] mt-8 mb-4">Tallriksmodellen för barn</h2>
          <p>
            Livsmedelsverkets tallriksmodell är fortfarande det bästa verktyget för att skapa balanserade måltider. För barn som rör sig mycket kan man öka delen med kolhydrater (potatis, pasta, matvete), medan barn som är lugnare mår bra av en större del grönsaker.
          </p>

          <h2 className="text-2xl font-bold text-[#051c2c] mt-8 mb-4">Viktiga näringsämnen</h2>
          <div className="grid md:grid-cols-2 gap-6 my-8">
            <div className="p-4 bg-slate-50 rounded-xl">
              <h3 className="font-bold text-[#051c2c] text-base mt-2">D-vitamin & Kalcium</h3>
              <p className="text-sm">Viktigt för skelettet och tänderna. Finns i mejeriprodukter, berikade växtdrycker och fet fisk.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <h3 className="font-bold text-[#051c2c] text-base mt-2">Järn</h3>
              <p className="text-sm">Behövs för blodets syretransport. Finns i kött, bönor, linser och fullkornsprodukter.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <h3 className="font-bold text-[#051c2c] text-base mt-2">Fleromättat fett (Omega-3)</h3>
              <p className="text-sm">Viktigt för hjärnans utveckling. Finns i fet fisk, rapsolja och valnötter.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <h3 className="font-bold text-[#051c2c] text-base mt-2">Fibrer</h3>
              <p className="text-sm">Håller magen igång och ger jämn energi. Finns i fullkorn, frukt och grönt.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-[#051c2c] mt-8 mb-4">Hur får man barnen att äta nyttigt?</h2>
          <p>
            Det största hindret är ofta inte kunskap, utan att barnen vägrar äta de nyttiga alternativen. Här är tre snabba tips:
          </p>
          <ol>
            <li><strong>Var en förebild:</strong> Barn gör som du gör, inte som du säger. Ät grönsaker själv!</li>
            <li><strong>Tvinga aldrig:</strong> Mat ska vara förknippat med glädje. Erbjud nya smaker många gånger utan press.</li>
            <li><strong>Göm grönsakerna:</strong> Mixa ner linser i köttfärssåsen eller spenat i smoothien om det krävs.</li>
          </ol>

          <div className="bg-slate-50 p-6 rounded-xl border-l-4 border-brand-yellow my-8 italic text-slate-700">
            "Det är inte den enskilda måltiden som räknas, utan helheten över tid. En middag med bara pannkakor är helt okej om lunchen var näringsrik!"
          </div>

          <section className="mt-12 p-8 bg-brand-blue text-white rounded-2xl space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-brand-yellow" />
              Kom ihåg!
            </h3>
            <p className="text-sm text-slate-200">
              Vatten är den bästa törstsläckaren. Undvik saft och läsk till vardags för att skydda tänderna och hålla blodsockret jämnt.
            </p>
          </section>

          <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center">
             <a href="/artiklar" className="text-brand-blue font-bold hover:underline">&larr; Tillbaka till alla artiklar</a>
             <a href="/" className="px-6 py-2 bg-slate-100 text-slate-800 rounded-lg font-bold hover:bg-slate-200 transition-colors">Planera middagen</a>
          </div>
        </article>
      </main>
    </div>
  );
}
