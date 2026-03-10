import { Suspense } from 'react';
import DinnerApp from '@/components/DinnerApp';
import { ChefHat, Leaf, Heart, Coffee, ExternalLink, MapPin } from 'lucide-react';
import * as cheerio from 'cheerio';
import { processMenu } from '@/utils/menuUtils';
import { format, parseISO } from 'date-fns';
import { sv } from 'date-fns/locale';

export const metadata = {
  title: 'Middagsmeny – Veckans matsedel för skolor',
  description: 'Se vad barnen ätit i skolan och få smarta middagsförslag som kompletterar lunchen. Gratis tjänst för enklare vardagspussel.',
};

const POPULAR_SCHOOLS = [
  { id: '6400747a41b4e4e00179ce82', name: 'Förskolor', locality: 'Älvkarleby', url: 'https://menu.matildaplatform.com/meals/week/6400747a41b4e4e00179ce82_alvkarleby' },
  { id: '64a7cb24469920bc65b4e835', name: 'Fryele skola', locality: 'Värnamo', url: 'https://menu.matildaplatform.com/meals/week/64a7cb24469920bc65b4e835_varnamo' },
  { id: '6436962095451015931bf7ce', name: 'Skola - Gnarp skola', locality: 'Nordanstig', url: 'https://menu.matildaplatform.com/meals/week/6436962095451015931bf7ce_nordanstig' },
  { id: '64a411c6469920bc655c117a', name: 'Härnösand Skola/Förskola', locality: 'Härnösand', url: 'https://menu.matildaplatform.com/meals/week/64a411c6469920bc655c117a_harnosand' },
  { id: '6474928f5ed89d169f45b876', name: 'LID Dalängskolan', locality: 'Lidköping', url: 'https://menu.matildaplatform.com/meals/week/6474928f5ed89d169f45b876_goliska' },
];

function slugify(text: string) {
  const swedishMap: { [key: string]: string } = { 'å': 'a', 'ä': 'a', 'ö': 'o', 'Å': 'a', 'Ä': 'a', 'Ö': 'o' };
  return text
    .toString()
    .split('')
    .map(char => swedishMap[char] || char)
    .join('')
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

async function getInitialMenu(url: string) {
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const html = await res.text();
    const $ = cheerio.load(html);
    const nextDataScript = $('#__NEXT_DATA__').html();
    if (!nextDataScript) return [];
    const json = JSON.parse(nextDataScript);
    const rawMeals = json.props?.pageProps?.meals || [];
    return processMenu(rawMeals);
  } catch (e) {
    console.error("SSR Fetch failed", e);
    return [];
  }
}

export default async function Home() {
  const defaultSchool = POPULAR_SCHOOLS[0];
  const defaultUrl = defaultSchool.url;
  const initialMenu = await getInitialMenu(defaultUrl);

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

      <main className="max-w-4xl mx-auto px-6 pb-12">
        <section className="mt-8 space-y-12">

          <Suspense fallback={
            <div className="min-h-[400px] flex flex-col items-center justify-center space-y-4 pt-10">
              <div className="w-12 h-12 border-4 border-brand-yellow border-t-transparent rounded-full animate-spin"></div>
              <p className="text-slate-500 font-medium">Laddar menyn...</p>
            </div>
          }>
            <DinnerApp
              initialMenu={initialMenu}
              initialSchool={{ url: defaultUrl, name: defaultSchool.name }}
            />
          </Suspense>

          {/* Popular Schools Directory - Important for SEO depth */}
          <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-[#051c2c] flex items-center gap-2">
              <MapPin className="w-5 h-5 text-brand-yellow" />
              Populära skolor just nu
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {POPULAR_SCHOOLS.map(school => (
                <a
                  key={school.id}
                  href={`/?school=${encodeURIComponent(school.url)}&name=${encodeURIComponent(school.name)}`}
                  className="p-4 bg-slate-50 rounded-xl hover:bg-brand-yellow/10 transition-colors border border-transparent hover:border-brand-yellow/30 group"
                >
                  <div className="font-bold text-[#051c2c] group-hover:text-amber-700">{school.name}</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider">{school.locality}</div>
                </a>
              ))}
            </div>
          </div>

          {/* SEO text – placed after tool for better UX */}
          <div className="grid md:grid-cols-2 gap-12 text-slate-600 bg-white rounded-2xl p-8 border border-slate-50 shadow-sm">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#051c2c]">Hur fungerar det?</h3>
              <p>
                Middagsmeny hämtar automatiskt veckans matsedel för de flesta grundskolor och förskolor i Sverige genom att ansluta till de största matsedelsleverantörerna. Genom att söka på din skola får du direkt koll på vad barnen äter till lunch, vilket är grunden för en bra matplanering.
              </p>
              <p>
                När vi vet lunchen kan vi föreslå en middag som balanserar dagens totala näringsintag och smakvariation. Om lunchen är en mustig soppa föreslår vi kanske en fräsch sallad eller pasta till middag. Är det fisk i skolan? Då siktar vi på kyckling eller kött hemma för att skapa en varierad kost under hela veckan.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#051c2c]">Spara dina favoriter</h3>
              <p>
                Du kan enkelt spara din skola som en genväg för att snabbt komma åt veckans meny varje gång du öppnar appen. Du kan också markera dina favoriträtter bland våra förslag för att få upp dem oftare i framtiden. Vår databas innehåller över 130 olika vardagsrecept anpassade för barnfamiljer.
              </p>
              <p>
                För att göra din vardag ännu enklare kan du dela hela veckans middagsplanering direkt till din partner eller familj via SMS, WhatsApp eller e-post med ett enkelt klick på "Dela veckomeny". Synkroniserad planering minskar både stress och matsvinn.
              </p>
            </div>
          </div>

          {/* Main Info Section */}
          <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <h2 className="text-xl md:text-2xl font-black text-[#051c2c]">Slipp middagspaniken med Middagsmeny</h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                Varje dag ställs hundratusentals föräldrar inför samma fråga: <em>"Vad ska vi äta till middag?"</em>. Med Middagsmeny blir beslutet enklare än någonsin genom smart synkronisering med skolan.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 pt-6">
              <div className="space-y-3 p-4 bg-slate-50 rounded-xl">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-bold text-[#051c2c] text-lg">Varierad kost</h3>
                <p className="text-sm text-slate-600">Vår algoritm analyserar barnens skollunch och ser till att middagen hemma blir ett bra komplement för en hälosam vardag.</p>
              </div>

              <div className="space-y-3 p-4 bg-slate-50 rounded-xl">
                <div className="w-10 h-10 bg-brand-yellow/20 rounded-lg flex items-center justify-center">
                  <ChefHat className="w-6 h-6 text-brand-yellow" />
                </div>
                <h3 className="font-bold text-[#051c2c] text-lg">Enkla vardagsrecept</h3>
                <p className="text-sm text-slate-600">Alla våra förslag är valda för att passa en stressig vardag. Vi fokuserar på snabba, barnvänliga och näringsrika recept.</p>
              </div>

              <div className="space-y-3 p-4 bg-slate-50 rounded-xl">
                <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center">
                  <Heart className="w-6 h-6 text-rose-600" />
                </div>
                <h3 className="font-bold text-[#051c2c] text-lg">Bättre matglädje</h3>
                <p className="text-sm text-slate-600"> Genom planerad matsedel minskar du både matsvinn och spontanköp, vilket är bra för både plånbok och miljö.</p>
              </div>
            </div>
          </div>

          {/* FAQ Section - Excellent for AdSense Value */}
          <div className="bg-[#051c2c] text-white rounded-2xl p-8 md:p-12 space-y-8 shadow-xl">
            <h2 className="text-2xl md:text-3xl font-black text-center text-brand-yellow">Vanliga frågor om Middagsmeny</h2>

            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
              <div className="space-y-2">
                <h4 className="font-bold text-brand-yellow text-lg">Varför ska man synka med skolan?</h4>
                <p className="text-slate-300 text-sm">Genom att veta vad barnen äter till lunch kan du undvika att servera samma sak till middag. Det ger barnen en mer varierad kost och minskar risken för "matvägran" när de får samma favoriträtt två gånger på en dag.</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-brand-yellow text-lg">Är tjänsten gratis?</h4>
                <p className="text-slate-300 text-sm">Ja, Middagsmeny är helt kostnadsfritt för alla användare. Vi finansierar driften genom annonser och frivilliga kaffebidrag via Buy Me a Coffee för att hålla tjänsten vid liv.</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-brand-yellow text-lg">Hur många skolor finns med?</h4>
                <p className="text-slate-300 text-sm">Vi täcker de tusentals skolor och förskolor i Sverige som använder Matilda Menu som sitt verktyg för matsedlar. Det inkluderar de flesta kommunala och fristående skolor.</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-brand-yellow text-lg">Kan jag lägga till egna recept?</h4>
                <p className="text-slate-300 text-sm">Självklart! Du kan lägga till dina egna familjerecept som sedan blandas in i förslagsalgoritmen. På så sätt blir matsedeln personlig och anpassad efter just din familjs smaker.</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-brand-yellow text-lg">Hur fungerar algoritmen?</h4>
                <p className="text-slate-300 text-sm">Vår smarta algoritm analyserar skollunchens ingredienser och protein. Om barnen ätit fisk i skolan föreslår vi något annat, t.ex. kyckling eller vegetariskt, för att skapa en balanserad helhet över dagen.</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-brand-yellow text-lg">Vem ligger bakom sidan?</h4>
                <p className="text-slate-300 text-sm">Middagsmeny drivs av ett litet team engagerade föräldrar som själva ville lösa det klassiska middagspusslet. Vi bygger sidan vi själva saknade i vår vardag.</p>
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
