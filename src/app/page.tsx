import { Suspense } from 'react';
import DinnerApp from '@/components/DinnerApp';
import { ChefHat, Leaf, Heart, Coffee } from 'lucide-react';

export const metadata = {
  title: 'Middagsmeny – Veckans matsedel för skolor',
  description: 'Se vad barnen ätit i skolan och få smarta middagsförslag som kompletterar lunchen. Gratis tjänst för enklare vardagspussel.',
};

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Header - Server Rendered for Speed */}
      <header className="w-full bg-[#051c2c] shadow-xl overflow-hidden relative">
        <div className="relative w-full">
          <img
            src="/header-bg-clean-final.png"
            alt="Bakgrund"
            className="w-full h-auto block"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
            <div className="transform translate-y-2 md:translate-y-6 lg:translate-y-10">
              <h1 className="text-white text-3xl md:text-5xl lg:text-7xl font-black drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] tracking-tight">
                Middagsmeny
              </h1>
              <div className="h-0.5 w-12 md:w-20 bg-brand-yellow mx-auto my-2 md:my-3 rounded-full shadow-sm"></div>
              <p className="text-brand-yellow text-[10px] md:text-sm lg:text-base font-bold uppercase tracking-[0.2em] drop-shadow-md">
                veckans menyer & smarta middagsförslag
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <Suspense fallback={
        <div className="min-h-screen flex flex-col items-center justify-center space-y-4 pt-20">
          <div className="w-12 h-12 border-4 border-brand-yellow border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium">Laddar menyn...</p>
        </div>
      }>
        <DinnerApp />
      </Suspense>

      {/* SEO Content & Information - TONS OF TEXT FOR GOOGLE */}
      <main className="max-w-4xl mx-auto px-6 pb-12">
        <section className="mt-8 space-y-12">

          {/* Main Info Section */}
          <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <h2 className="text-3xl font-black text-[#051c2c]">Slipp middagspaniken med Middagsmeny</h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                Varje dag ställs hundratusentals föräldrar inför samma fråga: <em>"Vad ska vi äta till middag?"</em>. Med Middagsmeny blir beslutet enklare än någonsin.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 pt-6">
              <div className="space-y-3 p-4 bg-slate-50 rounded-xl">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-bold text-[#051c2c] text-lg">Varierad kost</h3>
                <p className="text-sm text-slate-600">Vår algoritm analyserar barnens skollunch och ser till att middagen hemma blir ett bra komplement. Om skolan serverar fisk, föreslår vi något annat till kvällen.</p>
              </div>

              <div className="space-y-3 p-4 bg-slate-50 rounded-xl">
                <div className="w-10 h-10 bg-brand-yellow/20 rounded-lg flex items-center justify-center">
                  <ChefHat className="w-6 h-6 text-brand-yellow" />
                </div>
                <h3 className="font-bold text-[#051c2c] text-lg">Enkla vardagsrecept</h3>
                <p className="text-sm text-slate-600">Alla våra förslag är valda för att passa en stressig vardag. Vi fokuserar på mat som går snabbt att laga, ingredienser som barn gillar och recept som inte kräver timmar i köket.</p>
              </div>

              <div className="space-y-3 p-4 bg-slate-50 rounded-xl">
                <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center">
                  <Heart className="w-6 h-6 text-rose-600" />
                </div>
                <h3 className="font-bold text-[#051c2c] text-lg">Bättre matglädje</h3>
                <p className="text-sm text-slate-600">Genom att planera veckan minskar du matsvinnet och sparar pengar. Middagsmeny är helt gratis att använda och hjälper dig att bygga en hållbar och god matvecka för hela familjen.</p>
              </div>
            </div>
          </div>

          {/* Detailed Content for Google AdSense Approval */}
          <div className="grid md:grid-cols-2 gap-12 text-slate-600">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#051c2c]">Hur fungerar det?</h3>
              <p>
                Middagsmeny hämtar automatiskt veckans matsedel för de flesta grundskolor och förskolor i Sverige. Genom att söka på din skola får du direkt koll på vad barnen äter till lunch.
              </p>
              <p>
                När vi vet lunchen kan vi föreslå en middag som balanserar dagens totala näringsintag och smakvariation. Om lunchen är en mustig soppa föreslår vi kanske en fräsch sallad eller pasta till middag. Är det fisk i skolan? Då siktar vi på kyckling eller kött hemma.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#051c2c]">Spara dina favoriter</h3>
              <p>
                Du kan enkelt spara din skola som en genväg för att snabbt komma åt veckans meny varje gång du öppnar appen. Du kan också markera dina favoriträtter bland våra förslag för att få upp dem oftare i framtiden.
              </p>
              <p>
                För att göra din vardag ännu enklare kan du dela hela veckans middagsplanering direkt till din partner eller familj via SMS, WhatsApp eller e-post med ett enkelt klick på "Dela veckomeny".
              </p>
            </div>
          </div>

          {/* FAQ Section - Excellent for AdSense Value */}
          <div className="bg-[#051c2c] text-white rounded-2xl p-8 md:p-12 space-y-8 shadow-xl">
            <h2 className="text-2xl md:text-3xl font-black text-center text-brand-yellow">Vanliga frågor om Middagsmeny</h2>

            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
              <div className="space-y-2">
                <h4 className="font-bold text-brand-yellow text-lg">Är tjänsten gratis?</h4>
                <p className="text-slate-300 text-sm">Ja, Middagsmeny är helt kostnadsfritt för alla användare. Vi finansierar driften genom annonser och frivilliga kaffebidrag.</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-brand-yellow text-lg">Hur många skolor finns med?</h4>
                <p className="text-slate-300 text-sm">Vi täcker de skolor som använder Matilda Menu som verktyg.</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-brand-yellow text-lg">Kan jag lägga till egna recept?</h4>
                <p className="text-slate-300 text-sm">Ja! Du kan lägga till egna favoriträtter som sedan blandas in bland förslagen för att göra din matsedel personlig.</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-brand-yellow text-lg">Vem ligger bakom sidan?</h4>
                <p className="text-slate-300 text-sm">Middagsmeny drivs av engagerade föräldrar som själva ville lösa problemet med middagsplanering i en hektisk vardag.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-8 pb-4 text-center border-t border-slate-100 mt-12">
          <a
            href="https://buymeacoffee.com/edysweden"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFDD00] text-slate-900 rounded-full font-bold shadow-md hover:shadow-lg hover:scale-105 transition-all text-sm mb-6"
          >
            <Coffee className="w-5 h-5" />
            Bjud på en kaffe!
          </a>

          <div className="flex flex-col gap-2 mt-2">
            <p className="text-slate-400 text-xs">
              Middagsmeny © {new Date().getFullYear()} — Din guide till en enklare vardag.
            </p>
            <div className="flex justify-center gap-4">
              <a href="/privacy" className="text-slate-400 text-[10px] hover:text-slate-600 underline">Integritetspolicy</a>
              <span className="text-slate-300 text-[10px]">|</span>
              <span className="text-slate-400 text-[10px]">Version 1.2.0</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
