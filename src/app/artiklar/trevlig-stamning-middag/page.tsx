import React from 'react';
import { Heart, CheckCircle2, Calendar, Clock, Smile } from 'lucide-react';

export const metadata = {
  title: 'Skapa matglädje: Tips för en trevlig stämning vid middagen – Middagsmeny',
  description: 'Middagen ska vara dagens höjdpunkt, inte en källa till stress. Läs våra tips på hur du skapar en lugnare och mer lustfylld stämning för hela familjen.',
};

export default function DinnerVibeArticle() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12">
      <header className="bg-[#051c2c] text-white py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="bg-brand-yellow text-brand-dark px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Matglädje</span>
          <h1 className="text-3xl md:text-5xl font-black leading-tight">Trevlig stämning vid bordet</h1>
          <div className="flex items-center justify-center gap-6 text-sm text-slate-300 pt-4">
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> 15 april 2026</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 5 min läsning</span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 mt-12">
        <article className="prose prose-slate lg:prose-lg mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100">
          <p className="lead text-xl text-slate-600 font-medium">
            Middagsbordet är en av få platser där hela familjen samlas varje dag. Här är tipsen som förvandlar måltiden från ett måste till en trevlig stund tillsammans.
          </p>

          <h2 className="text-2xl font-bold text-[#051c2c] mt-8 mb-4">Släpp kraven på perfektion</h2>
          <p>
            Det viktigaste för en bra stämning är att sänka kraven. Det gör inget om barnen inte sitter helt stilla eller om det spills lite. Fokusera på samtalet och sällskapet istället för på bordsskick och etikett under vardagskvällarna.
          </p>

          <h2 className="text-2xl font-bold text-[#051c2c] mt-8 mb-4">Digitalfri zon</h2>
          <p>
            Gör middagsbordet till en mobilfri zon – för både barn och vuxna. Genom att lägga undan skärmarna visar ni varandra att den gemensamma tiden är viktigast. Det ger utrymme för de små, viktiga samtalen om hur dagen har varit.
          </p>

          <h2 className="text-2xl font-bold text-[#051c2c] mt-8 mb-4">2 tips för bättre samtal</h2>
          <div className="grid md:grid-cols-2 gap-6 my-8">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-4">
              <Smile className="w-6 h-6 text-brand-yellow shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-[#051c2c] text-base mt-0">Dagens bästa</h3>
                <p className="text-xs text-slate-600">Låt alla berätta om en bra sak som hänt under dagen. Det skapar en positiv grundton.</p>
              </div>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-4">
              <Heart className="w-6 h-6 text-rose-500 shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-[#051c2c] text-base mt-0">Tacksamhet</h3>
                <p className="text-xs text-slate-600">Berätta en sak ni är tacksamma för. En enkel övning som ökar välbefinnandet.</p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-[#051c2c] mt-8 mb-4">Låt maten vara lustfylld</h2>
          <p>
            Undvik att tjata om att barnen ska äta upp. Genom att låta maten vara något lustfyllt och frivilligt minskar du spänningarna vid bordet. Barn som känner sig trygga och avslappnade vågar ofta prova mer mat på sikt.
          </p>

          <div className="bg-slate-50 p-6 rounded-xl border-l-4 border-brand-yellow my-8 italic text-slate-700">
            "Middagen är hjärtat i familjelivet – vårda stämningen mer än tallriksmodellen."
          </div>

          <section className="mt-12 p-8 bg-brand-blue text-white rounded-2xl space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-brand-yellow" />
              Små medel, stor effekt
            </h3>
            <p className="text-sm text-slate-200">
              Tänd ett levande ljus, lägg på en fin duk eller sätt på lite lugn bakgrundsmusik. Dessa små detaljer signalerar att det är dags att varva ner och njuta av varandras sällskap.
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
