import React from 'react';
import { Shield, CheckCircle2, Calendar, Clock, Zap } from 'lucide-react';

export const metadata = {
  title: 'Så överlever du "Hell Hour": Tips för stressiga eftermiddagar – Middagsmeny',
  description: 'Klockan är 17:00, barnen är hungriga och tålamodet trötter. Här är våra bästa strategier för att överleva eftermiddagskaoset.',
};

export default function HellHourArticle() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12">
      <header className="bg-[#051c2c] text-white py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="bg-brand-yellow text-brand-dark px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Överlevnadsguide</span>
          <h1 className="text-3xl md:text-5xl font-black leading-tight">Så överlever du "Hell Hour"</h1>
          <div className="flex items-center justify-center gap-6 text-sm text-slate-300 pt-4">
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> 15 april 2026</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 6 min läsning</span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 mt-12">
        <article className="prose prose-slate lg:prose-lg mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100">
          <p className="lead text-xl text-slate-600 font-medium">
            Vi har alla varit där. Glappet mellan hämtning och middag, när energinivåerna är på noll och konflikterna hänger i luften. Här är strategierna som faktiskt fungerar.
          </p>

          <h2 className="text-2xl font-bold text-[#051c2c] mt-8 mb-4">Vad är "Hell Hour"?</h2>
          <p>
            Det är den där timmen (eller två) när barnen är trötta efter skolan, föräldrarna är trötta efter jobbet, och alla är hungriga. Det är en perfekt storm för utbrott och stress. Men med rätt förberedelser kan du lugna ner stormen.
          </p>

          <h2 className="text-2xl font-bold text-[#051c2c] mt-8 mb-4">5 strategier för lugnare eftermiddagar</h2>
          <div className="space-y-6 my-8">
            <div className="p-6 bg-slate-50 rounded-xl border-t-4 border-brand-yellow">
              <h3 className="font-bold text-[#051c2c] mt-0 flex items-center gap-2">
                <Zap className="w-5 h-5 text-brand-yellow" />
                1. Mellis direkt vid dörren
              </h3>
              <p className="text-sm">Vänta inte till 17:00. Ge barnen något litet och näringsrikt direkt när ni kommer hem för att stabilisera blodsockret innan middagen ens är påtänkt.</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-xl border-t-4 border-brand-yellow">
              <h3 className="font-bold text-[#051c2c] mt-0">2. Förberedelser är A och O</h3>
              <p className="text-sm">Använd de 10 minuterna på morgonen till att hacka grönsaker eller ta fram det som ska tinas. Att slippa tänka och planera när man är trött är halva segern.</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-xl border-t-4 border-brand-yellow">
              <h3 className="font-bold text-[#051c2c] mt-0">3. Involvera eller underhåll?</h3>
              <p className="text-sm">Vissa dagar fungerar det att låta barnen hjälpa till. Andra dagar är en ljudbok eller 15 minuter framför en skärm den bästa lösningen för att du ska få laga mat i fred.</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-xl border-t-4 border-brand-yellow">
              <h3 className="font-bold text-[#051c2c] mt-0">4. Sänk ribban för rätter</h3>
              <p className="text-sm">Tisdagar behöver inte vara tre-rätters. En snabb pastasallad eller hemgjord tomatsoppa räcker gott. Spara de mer avancerade rätten till helgen.</p>
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-xl border-l-4 border-brand-yellow my-8 italic text-slate-700">
            "Det handlar inte om att vara den perfekta föräldern, utan om att komma fram till middagsbordet med förståndet i behåll."
          </div>

          <section className="mt-12 p-8 bg-brand-blue text-white rounded-2xl space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-brand-yellow" />
              Proffstips: För-vaskning
            </h3>
            <p className="text-sm text-slate-200">
              Ställ fram en skål med morötter, gurka eller tomater medan du lagar maten. Om barnen äter sig mätta på grönsaker innan middagen är det faktiskt en vinst!
            </p>
          </section>

          <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center">
             <a href="/artiklar" className="text-brand-blue font-bold hover:underline">&larr; Tillbaka till alla artiklar</a>
             <a href="/" className="px-6 py-2 bg-slate-100 text-slate-800 rounded-lg font-bold hover:bg-slate-200 transition-colors">Vad äter vi idag?</a>
          </div>
        </article>
      </main>
    </div>
  );
}
