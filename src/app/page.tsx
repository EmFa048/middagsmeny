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
            <div className="transform -translate-y-1 md:translate-y-3 lg:translate-y-5">
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

      {/* SEO Content & Footer - VISIBLE IMMEDIATELY */}
      <main className="max-w-4xl mx-auto px-6 pb-12">
        <section className="mt-8 bg-white rounded-2xl p-8 border border-slate-100 shadow-sm space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl font-black text-[#051c2c]">Smartare middagsplanering för barnfamiljer</h2>
            <p className="text-slate-600 leading-relaxed">
              Att få ihop vardagspusslet är inte lätt. <strong>Middagsmeny</strong> är ett gratis verktyg som hjälper dig att se vad barnen ätit i skolan och automatiskt föreslår en middag som kompletterar lunchen.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 pt-6 text-sm text-slate-600">
            <div className="space-y-2">
              <h3 className="font-bold text-[#051c2c] flex items-center gap-2">
                <Leaf className="w-4 h-4 text-green-600" />
                Varierad kost
              </h3>
              <p>Vi ser till att du inte serverar pasta bolognese till middag om barnen redan ätit det till lunch.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-[#051c2c] flex items-center gap-2">
                <ChefHat className="w-4 h-4 text-brand-yellow" />
                Enkla recept
              </h3>
              <p>Våra förslag är anpassade för vardagar – snabbt, gott och barnvänligt.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-[#051c2c] flex items-center gap-2">
                <Heart className="w-4 h-4 text-brand-red" />
                Helt gratis
              </h3>
              <p>Tjänsten finansieras av annonser och frivilliga bidrag, så att den kan förbli gratis för alla.</p>
            </div>
          </div>
        </section>

        <footer className="pt-8 pb-4 text-center border-t border-slate-100 mt-12">
          <a
            href="https://buymeacoffee.com/edysweden"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFDD00] text-slate-900 rounded-full font-bold shadow-md hover:shadow-lg hover:scale-105 transition-all text-sm mb-6"
          >
            <Coffee className="w-5 h-5" />
            Gillar du appen? Bjud på en kaffe!
          </a>

          <div className="flex flex-col gap-2 mt-2">
            <p className="text-slate-400 text-xs">
              Middagsmeny © {new Date().getFullYear()} — Gör vardagspusslet enklare.
            </p>
            <a href="/privacy" className="text-slate-400 text-[10px] hover:text-slate-600 underline decoration-slate-300 underline-offset-2">
              Integritetspolicy
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
