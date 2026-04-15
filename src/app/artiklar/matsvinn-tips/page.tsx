import React from 'react';
import { Trash2, CheckCircle2, Calendar, Clock } from 'lucide-react';

export const metadata = {
  title: 'Minska matsvinnet: Smarta tips för barnfamiljer – Middagsmeny',
  description: 'Visste du att ett vanligt hushåll slänger mat för tusentals kronor varje år? Lär dig hur du minskar matsvinnet och sparar pengar samtidigt.',
};

export default function FoodWasteArticle() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12">
      <header className="bg-[#051c2c] text-white py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="bg-brand-yellow text-brand-dark px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Miljö & Ekonomi</span>
          <h1 className="text-3xl md:text-5xl font-black leading-tight">Minska matsvinnet hemma</h1>
          <div className="flex items-center justify-center gap-6 text-sm text-slate-300 pt-4">
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> 15 april 2026</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 6 min läsning</span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 mt-12">
        <article className="prose prose-slate lg:prose-lg mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100">
          <p className="lead text-xl text-slate-600 font-medium">
            Att kasta mat är som att kasta pengar direkt i soptunnan. För en barnfamilj handlar det ofta om att planeringen brister eller att barnen inte äter upp. Så här vänder du trenden.
          </p>

          <h2 className="text-2xl font-bold text-[#051c2c] mt-8 mb-4">Planera utifrån vad du har</h2>
          <p>
            Innan du går till affären eller handlar online: kolla i kylen, frysen och skafferiet. De flesta av oss har ingredienser hemma som kan bli basen i en ny middag. En "kylskåpstömning" en gång i veckan kan spara hundralappar.
          </p>

          <h2 className="text-2xl font-bold text-[#051c2c] mt-8 mb-4">Lita på dina sinnen</h2>
          <p>
            "Bäst före-datum" är en rekommendation, inte en lag. Många livsmedel håller betydligt längre.
          </p>
          <ul className="space-y-2">
            <li><strong>Titta:</strong> Ser maten okej ut? Ingen mögel eller konstig färg?</li>
            <li><strong>Lukta:</strong> Luktar det som det ska? Surnad mjölk märks direkt.</li>
            <li><strong>Smaka:</strong> Om det ser bra ut och luktar bra, smaka en liten bit.</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#051c2c] mt-8 mb-4">Smarta sätt att använda rester</h2>
          <p>
            Rester behöver inte vara tråkiga. De är fantastiska som bas i nya rätter:
          </p>
          <ul>
            <li><strong>Gårdagens potatis:</strong> Blir utmärkt pyttipanna eller stekt potatis dagen efter.</li>
            <li><strong>Överbliven pasta:</strong> Perfekt i en pastasallad eller en gratäng.</li>
            <li><strong>Trötta grönsaker:</strong> Hacka ner och koka en god soppa eller gör en grönsakssås till pastan.</li>
            <li><strong>Bröd som blivit torrt:</strong> Gör krutonger eller fattiga riddare.</li>
          </ul>

          <div className="bg-slate-50 p-6 rounded-xl border-l-4 border-brand-yellow my-8 italic text-slate-700">
            "Genom att använda Middagsmeny för din matplanering ser du till att du bara handlar det du faktiskt behöver för veckans middagar."
          </div>

          <section className="mt-12 p-8 bg-brand-blue text-white rounded-2xl space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-brand-yellow" />
              Tre snabba tips
            </h3>
            <ol className="text-sm text-slate-200 pl-5 space-y-2">
              <li>Låt barnen ta lite mat i taget. Det är bättre att de hämtar mer än att halva tallriken slängs.</li>
              <li>Frys in det du inte hinner äta upp. Många saker som nästan blivit för gamla går utmärkt att frysa.</li>
              <li>Använd genomskinliga lådor i kylen så att du ser vad som finns.</li>
            </ol>
          </section>

          <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center">
             <a href="/artiklar" className="text-brand-blue font-bold hover:underline">&larr; Tillbaka till alla artiklar</a>
             <a href="/" className="px-6 py-2 bg-slate-100 text-slate-800 rounded-lg font-bold hover:bg-slate-200 transition-colors">Börja planera</a>
          </div>
        </article>
      </main>
    </div>
  );
}
