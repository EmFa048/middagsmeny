import React from 'react';
import { Heart, Users, Target, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Om oss – Vilka är vi bakom Middagsmeny.se?',
  description: 'Middagsmeny skapades av föräldrar för föräldrar. Läs om vårt mål att förenkla vardagspusslet och minska middagsstressen för barnfamiljer.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12">
      <header className="bg-[#051c2c] text-white py-12 px-6 text-center">
        <h1 className="text-3xl md:text-5xl font-black mb-4">Om Middagsmeny</h1>
        <p className="text-brand-yellow font-bold uppercase tracking-widest text-sm">Förenklar vardagen för tusentals föräldrar</p>
      </header>

      <main className="max-w-3xl mx-auto px-6 mt-12 space-y-12">
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-6 h-6 text-rose-500" />
            <h2 className="text-2xl font-bold text-[#051c2c]">Varför skapade vi Middagsmeny?</h2>
          </div>
          <p className="leading-relaxed">
            Middagsmeny föddes ur en klassisk vardagssituation som nästan alla barnföräldrar känner igen: klockan är 16:30, barnen är hungriga och man har ingen aning om vad man ska laga till middag. Den eviga frågan ”Vad ska vi äta?” blir ofta en stressfaktor i en redan hektisk vardag.
          </p>
          <p className="leading-relaxed">
            Vi som skapat tjänsten är själva föräldrar som insåg att den viktigaste pusselbiten för en stresfri middagsplanering ofta saknas: <strong>vad barnen redan har ätit till lunch i skolan</strong>. Genom att synka middagen hemma med skollunchen kan vi skapa en mer varierad kost, minska matsvinnet och framför allt – slippa servera fisk två gånger på samma dag.
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-brand-blue">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#051c2c]">Vårt Mål</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Vårt mål är att vara det självklara verktyget för svenska barnfamiljer när det kommer till matplanering. Vi vill hjälpa föräldrar att spara tid, pengar och mental energi genom smarta, automatiserade förslag.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#051c2c]">Drivs av gemenskap</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Middagsmeny är en oberoende tjänst som inte tillhör något stort mediebolag. Vi drivs av användarnas feedback och de receptförslag som skickas in av vår community av föräldrar över hela Sverige.
            </p>
          </div>
        </section>

        <section className="bg-[#051c2c] text-white p-8 md:p-12 rounded-2xl shadow-xl space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="w-6 h-6 text-brand-yellow" />
            <h2 className="text-2xl font-bold text-brand-yellow">Helt gratis och transparent</h2>
          </div>
          <p className="text-slate-200 leading-relaxed">
            Vi tror på att bra verktyg ska vara tillgängliga för alla. Därför är Middagsmeny helt gratis att använda. För att täcka kostnader för servrar och utveckling använder vi diskret annonsering och möjligheten för användare att ”bjuda på en kaffe” via Buy Me a Coffee.
          </p>
          <p className="text-slate-200 leading-relaxed">
            Vi samlar aldrig in personuppgifter utan din tillåtelse. All information om dina sparade skolor och favoriter sparas lokalt i din egen webbläsare, vilket innebär att du har full kontroll över din data.
          </p>
          <div className="pt-4">
             <a href="/" className="inline-block px-8 py-3 bg-brand-yellow text-brand-dark rounded-full font-bold hover:scale-105 transition-transform">
               Tillbaka till startsidan
             </a>
          </div>
        </section>
      </main>
    </div>
  );
}
