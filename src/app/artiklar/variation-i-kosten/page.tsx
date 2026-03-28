import React from 'react';
import { ChefHat, Utensils, Heart, CheckCircle2, Calendar, Clock } from 'lucide-react';

export const metadata = {
  title: 'Så skapar du en varierad kost för kräsna barn – Middagsmeny',
  description: 'Det kan vara en utmaning att få barn att äta varierat. Här är våra bästa strategier för att introducera nya smaker utan konflikter vid matbordet.',
};

export default function ArticleVariationPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12">
      <header className="bg-[#051c2c] text-white py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="bg-brand-blue text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Näringslära</span>
          <h1 className="text-3xl md:text-5xl font-black leading-tight">Så skapar du en varierad kost för kräsna barn</h1>
          <div className="flex items-center justify-center gap-6 text-sm text-slate-300 pt-4">
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> 15 mars 2026</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 6 min läsning</span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 mt-12">
        <article className="prose prose-slate lg:prose-lg mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100">
          <p className="lead text-xl text-slate-600 font-medium">
            "Jag gillar inte det här" är en mening som ekat i de flesta småbarnshem. Rädslan för ny mat är en naturlig del av många barns utveckling, men det betyder inte att vi ska ge upp hoppet om en varierad kost.
          </p>

          <h2 className="text-2xl font-bold text-[#051c2c] mt-8 mb-4">Exponering utan tvång</h2>
          <p>
            Forskning visar att ett barn kan behöva smaka på en ny råvara upp till 15–20 gånger innan hen faktiskt börjar uppskatta smaken. Det viktigaste är att aldrig tvinga ett barn att äta upp, då det skapar negativa associationer till matstunden. Erbjud istället en liten "smakportion" utan press.
          </p>

          <h2 className="text-2xl font-bold text-[#051c2c] mt-8 mb-4">Smyg in näringen (men var ärlig ibland)</h2>
          <p>
            Att mixa ner grönsaker i en tomatsås eller biffar är ett klassiskt knep som faktiskt fungerar. En slätmixad sås med morötter, röd paprika och lök är en perfekt bas för både pasta och lasagne. Men det är också viktigt att barnen ibland får se råvaran i sin naturliga form så att de lär känna den.
          </p>

          <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-500 my-8 italic text-slate-700">
            "Förvandla matbordet från en arena för konflikter till en plats för upptäcktsfärd. Det tar tid, men det är värt det."
          </div>

          <h2 className="text-2xl font-bold text-[#051c2c] mt-8 mb-4">Gör maten rolig</h2>
          <p>
            Presentation spelar roll, särskilt för små barn. Att använda roliga former, bygga "träd" av broccoli eller servera maten som små plockbitar i en muffinform kan göra den mest skeptiska treåring nyfiken.
          </p>

          <h2 className="text-2xl font-bold text-[#051c2c] mt-8 mb-4">Var en förebild</h2>
          <p>
            Barn gör inte som vi säger, de gör som vi gör. Om du själv äter varierat och visar matglädje kommer barnen förr eller senare att följa efter. Undvik att prata negativt om viss mat inför barnen, även om du själv inte är ett fan av t.ex. brysselkål.
          </p>

          <section className="mt-12 p-8 bg-brand-blue text-white rounded-2xl space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-brand-yellow" />
              Tre steg mot mer variation
            </h3>
            <ul className="text-sm text-slate-200 space-y-2 list-decimal pl-4">
              <li><strong>Erbjud alltid grönsaker:</strong> Även om de inte äts upp, ska de finnas på bordet vid varje måltid.</li>
              <li><strong>Låt dem vara med:</strong> Barn som får hjälpa till att skölja sallad eller röra i grytan är oftare mer benägna att smaka resultatet.</li>
              <li><strong>Ha tålamod:</strong> Rom byggdes inte på en dag, och en varierad kost för ett barn kan ta år att utveckla.</li>
            </ul>
          </section>

          <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center">
            <a href="/artiklar" className="text-brand-blue font-bold hover:underline">&larr; Tillbaka till alla artiklar</a>
            <a href="/" className="px-6 py-2 bg-slate-100 text-slate-800 rounded-lg font-bold hover:bg-slate-200 transition-colors">Tillbaka hem</a>
          </div>
        </article>
      </main>
    </div>
  );
}
