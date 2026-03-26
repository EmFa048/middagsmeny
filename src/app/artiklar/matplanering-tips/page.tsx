import React from 'react';
import { Clock, Users, CheckCircle2, ShoppingCart, Calendar } from 'lucide-react';

export const metadata = {
  title: '5 tips för en stressfri matvecka för barnfamiljer – Middagsmeny',
  description: 'Att få vardagspusslet att gå ihop är en utmaning. Läs våra 5 bästa tips för att planera veckans middagar, spara tid och minska stressen vid matbordet.',
};

export default function ArticleTipsPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12">
      <header className="bg-[#051c2c] text-white py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="bg-brand-yellow text-brand-dark px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Vardagstips</span>
          <h1 className="text-3xl md:text-5xl font-black leading-tight">5 tips för en stressfri matvecka med barn</h1>
          <div className="flex items-center justify-center gap-6 text-sm text-slate-300 pt-4">
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> 20 mars 2026</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 5 min läsning</span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 mt-12">
        <article className="prose prose-slate lg:prose-lg mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100">
          <p className="lead text-xl text-slate-600 font-medium">
            Att planera middagar för en hel vecka kan kännas som en oöverstiglig uppgift när man redan jonglerar jobb, skola, förskola och fritidsaktiviteter. Men sanningen är att de 20 minuterna du lägger på planering på söndagen kan spara dig timmar av stress under veckan.
          </p>

          <h2 className="text-2xl font-bold text-[#051c2c] mt-8 mb-4">1. Synka med skollunchen</h2>
          <p>
            Det absolut vanligaste misstaget många föräldrar gör är att planera middagen helt isolerat från vad barnen ätit tidigare under dagen. Om skolan serverat fiskgratäng till lunch är chansen stor att barnen (och du själv) inte är särskilt sugna på lax till middag. 
          </p>
          <p>
            Genom att använda verktyg som <strong>Middagsmeny.se</strong> får du direkt koll på skollunchen och kan välja en middag som kompletterar istället för att repetera. Detta skapar en naturlig variation och gör att maten hemma ofta uppskattas mer.
          </p>

          <h2 className="text-2xl font-bold text-[#051c2c] mt-8 mb-4">2. Använd "Allt-i-ett"-recept</h2>
          <p>
            Under vardagarna är diskberget ofta lika avskräckande som själva matlagningen. Satsa på rätter som kan tillagas i en enda form i ugnen eller i en stor gryta. Ugnsrostade rotsaker med kyckling eller en mustig linsgryta är inte bara näringsrikt utan drar också ner på tiden för både förberedelse och efterarbete.
          </p>

          <h2 className="text-2xl font-bold text-[#051c2c] mt-8 mb-4">3. Handla online och följ listan</h2>
          <p>
            Impulsköp i mataffären på väg hem från hämtningen är den största boven för både budgeten och tidsplanen. Genom att handla online en gång i veckan ser du till att du har allt hemma för dina planerade middagar. Du slipper också stressen i affären med hungriga barn.
          </p>

          <div className="bg-slate-50 p-6 rounded-xl border-l-4 border-brand-yellow my-8 italic text-slate-700">
            "En bra inköpslista är som en karta i en djungel – den ser till att du kommer ut på andra sidan snabbt och med det du faktiskt behöver."
          </div>

          <h2 className="text-2xl font-bold text-[#051c2c] mt-8 mb-4">4. Laga dubbelt och frys in</h2>
          <p>
            När du ändå lagar en lasagne eller en sats köttfärssås, varför inte göra dubbelt? Det tar nästan ingen extra tid men ger dig en "gratis" middag till nästa vecka eller en perfekt matlåda. Att ha ett par näringsrika, hemgjorda alternativ i frysen är den perfekta räddningen de dagar då allt skiter sig.
          </p>

          <h2 className="text-2xl font-bold text-[#051c2c] mt-8 mb-4">5. Involvera barnen (på rätt sätt)</h2>
          <p>
            Barn som känner sig delaktiga äter ofta bättre. Låt barnen välja mellan två olika förslag (som du redan vet fungerar). Istället för att fråga "Vad vill ni äta?", fråga "Vill ni ha pastasallad eller hemgjorda köttbullar på tisdag?". Det ger dem en känsla av kontroll utan att det skapar kaos i din planering.
          </p>

          <section className="mt-12 p-8 bg-brand-blue text-white rounded-2xl space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-brand-yellow" />
              Sammanfattning
            </h3>
            <p className="text-sm text-slate-200">
              Matplanering handlar inte om att vara perfekt, utan om att göra det enklare för sig själv. Genom att börja med att kolla skollunchen lägger du grunden för en varierad och stressfri vecka.
            </p>
          </section>

          <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center">
             <a href="/artiklar" className="text-brand-blue font-bold hover:underline">&larr; Tillbaka till alla artiklar</a>
             <a href="/" className="px-6 py-2 bg-slate-100 text-slate-800 rounded-lg font-bold hover:bg-slate-200 transition-colors">Gör din planering nu</a>
          </div>
        </article>
      </main>
    </div>
  );
}
