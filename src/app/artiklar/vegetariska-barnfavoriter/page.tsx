import React from 'react';
import { Leaf, CheckCircle2, Calendar, Clock } from 'lucide-react';

export const metadata = {
  title: 'Vegetariska barnfavoriter: Enkla recept för hela familjen – Middagsmeny',
  description: 'Sugen på att äta mer grönt? Här är våra bästa tips på vegetariska rätter som även de mest kräsna barnen brukar gilla.',
};

export default function VeggieArticle() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12">
      <header className="bg-[#051c2c] text-white py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="bg-brand-yellow text-brand-dark px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Recept & Inspiration</span>
          <h1 className="text-3xl md:text-5xl font-black leading-tight">Vegetariska barnfavoriter</h1>
          <div className="flex items-center justify-center gap-6 text-sm text-slate-300 pt-4">
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> 15 april 2026</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 5 min läsning</span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 mt-12">
        <article className="prose prose-slate lg:prose-lg mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100">
          <p className="lead text-xl text-slate-600 font-medium">
            Att introducera mer vegetariskt i hemmet behöver inte innebära krångliga recept eller protester vid matbordet. Hemligheten ligger i att använda bekanta smaker.
          </p>

          <h2 className="text-2xl font-bold text-[#051c2c] mt-8 mb-4">Varför äta mer vegetariskt?</h2>
          <p>
            Det finns många anledningar till att dra ner på köttet. Förutom att det är bra för miljön så är vegetarisk mat ofta billigare och innehåller mycket fibrer och nyttiga näringsämnen som barn behöver för att växa.
          </p>

          <h2 className="text-2xl font-bold text-[#051c2c] mt-8 mb-4">Tre rätter som alltid funkar</h2>
          <div className="space-y-6">
            <div className="p-6 bg-slate-50 rounded-xl">
              <h3 className="font-bold text-[#051c2c] text-lg mt-0">1. Lins-bolognese</h3>
              <p className="text-sm">Byt ut köttfärsen mot röda linser. De kokar sönder och ger samma krämiga konsistens som vanlig köttfärssås. Krydda med massor av basilika och oregano.</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-xl">
              <h3 className="font-bold text-[#051c2c] text-lg mt-0">2. Halloumiburgare</h3>
              <p className="text-sm">En stekt halloumi (eller grillost) har en salt och god smak som barn ofta älskar. Servera i bröd med klassiska burgartillbehör.</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-xl">
              <h3 className="font-bold text-[#051c2c] text-lg mt-0">3. Vegansk nuggets</h3>
              <p className="text-sm">Det finns fantastiska alternativ i frysdisken som smakar nästan identiskt med kycklingnuggets. Perfekt för en snabb vardagsmiddag.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-[#051c2c] mt-8 mb-4">Gör det till en lek</h2>
          <p>
            Låt barnen vara med och välja "veckans gröna rätt". Om de känner att de har varit med och bestämt är chansen mycket större att de faktiskt smakar. Istället för att fokusera på vad som *inte* är i maten, fokusera på de goda smakerna.
          </p>

          <div className="bg-slate-50 p-6 rounded-xl border-l-4 border-brand-yellow my-8 italic text-slate-700">
            "Vegetarisk mat är inte bara mat utan kött – det är mat med massor av färg och energi!"
          </div>

          <section className="mt-12 p-8 bg-brand-blue text-white rounded-2xl space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-brand-yellow" />
              Tänk på proteinet
            </h3>
            <p className="text-sm text-slate-200">
              Se till att rätten innehåller en bra proteinkälla, t.ex. bönor, linser, tofu, ägg eller mejeriprodukter, så att barnen håller sig mätta länge.
            </p>
          </section>

          <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center">
             <a href="/artiklar" className="text-brand-blue font-bold hover:underline">&larr; Tillbaka till alla artiklar</a>
             <a href="/" className="px-6 py-2 bg-slate-100 text-slate-800 rounded-lg font-bold hover:bg-slate-200 transition-colors">Hitta recept</a>
          </div>
        </article>
      </main>
    </div>
  );
}
