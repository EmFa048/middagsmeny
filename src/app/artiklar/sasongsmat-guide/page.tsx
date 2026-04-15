import React from 'react';
import { Sun, CheckCircle2, Calendar, Clock } from 'lucide-react';

export const metadata = {
  title: 'Säsongsmat: Ät gott, billigt och miljövänligt året runt – Middagsmeny',
  description: 'Att följa årstiderna i köket är bra för både plånboken och planeten. Upptäck vilka råvaror som är bäst just nu i Sverige.',
};

export default function SeasonalFoodArticle() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12">
      <header className="bg-[#051c2c] text-white py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="bg-brand-yellow text-brand-dark px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Miljö & Smak</span>
          <h1 className="text-3xl md:text-5xl font-black leading-tight">Ät efter säsong</h1>
          <div className="flex items-center justify-center gap-6 text-sm text-slate-300 pt-4">
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> 15 april 2026</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 6 min läsning</span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 mt-12">
        <article className="prose prose-slate lg:prose-lg mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100">
          <p className="lead text-xl text-slate-600 font-medium">
            I en värld där nästan allt finns i matbutiken året runt är det lätt att glömma bort att mat har säsonger. Men när vi äter de råvaror som växer naturligt just nu får vi mat som är både mer smakrik och mer näringsrik.
          </p>

          <h2 className="text-2xl font-bold text-[#051c2c] mt-8 mb-4">Fördelarna med säsongsmat</h2>
          <p>
            Det finns tre starka argument för att följa säsongerna:
          </p>
          <ul>
            <li><strong>Priset:</strong> När utbudet är stort sjunker priserna. Att köpa sparris i maj är betydligt billigare än i december.</li>
            <li><strong>Smaken:</strong> En solmogen sommartomat smakar oändligt mycket mer än en blek växthustomat mitt i vintern.</li>
            <li><strong>Miljön:</strong> Råvaror i säsong kräver ofta mindre energi för odling och kortare transporter.</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#051c2c] mt-8 mb-4">Säsongsguide (Sverige)</h2>
          <div className="space-y-4">
             <div className="p-4 bg-slate-50 rounded-lg">
                <h3 className="font-bold text-[#051c2c] mt-0">Vinter (Dec-Feb)</h3>
                <p className="text-sm">Fokus på rotfrukter (morötter, kålrot, palsternacka), alla sorters kål (grönkål, rödkål) och lök.</p>
             </div>
             <div className="p-4 bg-slate-50 rounded-lg">
                <h3 className="font-bold text-[#051c2c] mt-0">Vår (Mars-Maj)</h3>
                <p className="text-sm">Säsong för de första färska primörerna som sparris, nässlor, ramslök och tidig rabarber.</p>
             </div>
             <div className="p-4 bg-slate-50 rounded-lg">
                <h3 className="font-bold text-[#051c2c] mt-0">Sommar (Juni-Aug)</h3>
                <p className="text-sm">Högsäsong för bär, svenska tomater, gurka, färskpotatis, sockerärtor och blomkål.</p>
             </div>
             <div className="p-4 bg-slate-50 rounded-lg">
                <h3 className="font-bold text-[#051c2c] mt-0">Höst (Sept-Nov)</h3>
                <p className="text-sm">Skördetid för äpplen, päron, all sorts svamp, zucchini, pumpor och rödbeta.</p>
             </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-xl border-l-4 border-brand-yellow my-8 italic text-slate-700">
            "Säsongsmat handlar om att njuta av det bästa naturen har att erbjuda just nu."
          </div>

          <section className="mt-12 p-8 bg-brand-blue text-white rounded-2xl space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-brand-yellow" />
              Tips!
            </h3>
            <p className="text-sm text-slate-200">
              Kolla alltid ursprungsmärkningen i affären. "Från Sverige" är en bra guide för att hitta råvaror som är i säsong här hemma.
            </p>
          </section>

          <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center">
             <a href="/artiklar" className="text-brand-blue font-bold hover:underline">&larr; Tillbaka till alla artiklar</a>
             <a href="/" className="px-6 py-2 bg-slate-100 text-slate-800 rounded-lg font-bold hover:bg-slate-200 transition-colors">Planera med säsongen</a>
          </div>
        </article>
      </main>
    </div>
  );
}
