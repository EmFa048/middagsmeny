import React from 'react';
import { Heart, CheckCircle2, Calendar, Clock } from 'lucide-react';

export const metadata = {
  title: 'Skapa en hälsosam relation till mat hos barn – Middagsmeny',
  description: 'Hur pratar man om mat och kropp med sina barn på ett sunt sätt? Läs våra råd för att främja matglädje och en positiv kroppsbild från tidig ålder.',
};

export default function BodyImageArticle() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12">
      <header className="bg-[#051c2c] text-white py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="bg-brand-yellow text-brand-dark px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Hälsa & Trygghet</span>
          <h1 className="text-3xl md:text-5xl font-black leading-tight">En hälsosam relation till mat</h1>
          <div className="flex items-center justify-center gap-6 text-sm text-slate-300 pt-4">
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> 15 april 2026</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 7 min läsning</span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 mt-12">
        <article className="prose prose-slate lg:prose-lg mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100">
          <p className="lead text-xl text-slate-600 font-medium">
            Grunden för en god hälsa läggs tidigt. Det handlar inte bara om vad vi äter, utan hur vi tänker och pratar om mat, energi och våra kroppar.
          </p>

          <h2 className="text-2xl font-bold text-[#051c2c] mt-8 mb-4">Mat som bränsle, inte belöning</h2>
          <p>
            Försök att prata om mat i termer av vad den gör för oss. "Den här maten ger dina muskler kraft att springa snabbt" eller "Grönsakerna hjälper dina ögon att se bra". Genom att fokusera på funktionen snarare än utseendet eller vikten skapar vi en positiv koppling till näring.
          </p>

          <h2 className="text-2xl font-bold text-[#051c2c] mt-8 mb-4">Undvik att "förbjuda" mat</h2>
          <p>
            Att kategorisera mat som "bra" eller "dålig" kan skapa onödig ångest hos barn. Prata istället om "vardagsmat" och "festmat". Det är helt okej att äta glass eller godis ibland, så länge grunden består av näringsrik vardagsmat. Totalförbud gör ofta det förbjudna mer lockande.
          </p>

          <h2 className="text-2xl font-bold text-[#051c2c] mt-8 mb-4">Prata snällt om din egen kropp</h2>
          <p>
            Barn är som svampar – de suger upp allt vi vuxna säger. Om du kommenterar din egen kropp negativt eller pratar om att du behöver "banta", lär du barnet att kroppens värde ligger i dess utseende. Var en förebild och prata om din kropp med respekt för allt den klarar av.
          </p>

          <div className="bg-slate-50 p-6 rounded-xl border-l-4 border-brand-yellow my-8 italic text-slate-700">
            "Målet är att barn ska känna matglädje och nyfikenhet, inte prestation eller press."
          </div>

          <h2 className="text-2xl font-bold text-[#051c2c] mt-8 mb-4">Lita på barnets mättnadskänsla</h2>
          <p>
            Tvinga aldrig ett barn att äta upp om det säger att det är mätt. Barn har en naturlig förmåga att reglera sitt matintag. Genom att respektera deras "nej" lär de sig att lyssna på sin egen kropp, vilket är en viktig skyddsfaktor för framtiden.
          </p>

          <section className="mt-12 p-8 bg-brand-blue text-white rounded-2xl space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Heart className="w-6 h-6 text-brand-yellow" />
              När ska man söka hjälp?
            </h3>
            <p className="text-sm text-slate-200">
              Om du märker att ett barn får ett extremt kontrollerat beteende kring mat, börjar undvika sociala måltider eller pratar mycket om sin vikt, kontakta skolsköterskan eller BVC för rådgivning. Tidigt stöd är avgörande.
            </p>
          </section>

          <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center">
             <a href="/artiklar" className="text-brand-blue font-bold hover:underline">&larr; Tillbaka till alla artiklar</a>
             <a href="/" className="px-6 py-2 bg-slate-100 text-slate-800 rounded-lg font-bold hover:bg-slate-200 transition-colors">Till startsidan</a>
          </div>
        </article>
      </main>
    </div>
  );
}
