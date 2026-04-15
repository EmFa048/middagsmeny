import React from 'react';
import { ChefHat, CheckCircle2, Calendar, Clock } from 'lucide-react';

export const metadata = {
  title: 'Matlagning med barn: Hur du inkluderar barnen i köket – Middagsmeny',
  description: 'Att laga mat tillsammans med barnen kan vara kaotiskt, men också lärorikt och roligt. Läs våra tips på hur du gör köket till en trygg och kreativ plats för hela familjen.',
};

export default function CookingWithKidsArticle() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12">
      <header className="bg-[#051c2c] text-white py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="bg-brand-yellow text-brand-dark px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Familj & Lek</span>
          <h1 className="text-3xl md:text-5xl font-black leading-tight">Laga mat med barnen</h1>
          <div className="flex items-center justify-center gap-6 text-sm text-slate-300 pt-4">
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> 15 april 2026</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 5 min läsning</span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 mt-12">
        <article className="prose prose-slate lg:prose-lg mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100">
          <p className="lead text-xl text-slate-600 font-medium">
            Barn som får vara med och laga maten äter ofta mer varierat. Men hur får man det att fungera i en stressig vardag utan att köket förvandlas till en krigszon?
          </p>

          <h2 className="text-2xl font-bold text-[#051c2c] mt-8 mb-4">Anpassa uppgifterna efter ålder</h2>
          <p>
            Det viktigaste är att ge barnen uppgifter de faktiskt klarar av. Det stärker deras självförtroende och minskar frustrationen för dig som förälder.
          </p>
          <ul>
            <li><strong>2-4 år:</strong> Tvätta grönsaker, hälla i ingredienser, röra om i kalla röror.</li>
            <li><strong>5-7 år:</strong> Skala morötter, duka bordet, knäcka ägg, skära mjuka saker med en trubbig kniv.</li>
            <li><strong>8-12 år:</strong> Följa enkla recept, koka pasta, använda spisen under uppsikt.</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#051c2c] mt-8 mb-4">Sänk kraven</h2>
          <p>
            Välj dagar då ni inte har bråttom. Helger är perfekta för "familjekock"-projekt. Det gör inget om det blir lite mjöl på golvet eller om morötterna inte är helt jämnt skivade. Det viktiga är att barnen får utforska dofter, färger och texturer.
          </p>

          <h2 className="text-2xl font-bold text-[#051c2c] mt-8 mb-4">Lärande på köpet</h2>
          <p>
            I köket gömmer sig massor av lärdomar:
          </p>
          <ul>
            <li><strong>Matematik:</strong> Att mäta upp dl och ml, eller att halvera ett recept.</li>
            <li><strong>Biologi:</strong> Varifrån kommer ägget? Hur växer en lök?</li>
            <li><strong>Samarbete:</strong> Att jobba tillsammans mot ett gemensamt mål – en god middag!</li>
          </ul>

          <div className="bg-slate-50 p-6 rounded-xl border-l-4 border-brand-yellow my-8 italic text-slate-700">
            "Barn som har varit med och lagat maten känner en stolthet som ofta leder till större matglädje."
          </div>

          <section className="mt-12 p-8 bg-brand-blue text-white rounded-2xl space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-brand-yellow" />
              Säkerhet först!
            </h3>
            <p className="text-sm text-slate-200">
              Prata alltid om farorna i köket. Att spisen är varm, att knivar är vassa och att man ska tvätta händerna noga före och efter matlagningen.
            </p>
          </section>

          <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center">
             <a href="/artiklar" className="text-brand-blue font-bold hover:underline">&larr; Tillbaka till alla artiklar</a>
             <a href="/" className="px-6 py-2 bg-slate-100 text-slate-800 rounded-lg font-bold hover:bg-slate-200 transition-colors">Vad ska vi laga?</a>
          </div>
        </article>
      </main>
    </div>
  );
}
