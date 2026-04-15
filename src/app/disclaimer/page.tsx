export default function Disclaimer() {
    return (
        <div className="max-w-2xl mx-auto p-8 py-16 space-y-8 bg-white min-h-screen text-slate-800">
            <h1 className="text-4xl font-black mb-8">Ansvarsfriskrivning</h1>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">1. Medicinsk ansvarsfriskrivning</h2>
                <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-xl">
                    <p className="leading-relaxed text-amber-900 font-medium">
                        Informationen på Middagsmeny.se är endast avsedd som allmän information och inspiration. Innehållet ska inte ses som medicinsk rådgivning eller ersätta professionell vägledning från läkare, dietist eller annan vårdpersonal.
                    </p>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">2. Allergier och specialkost</h2>
                <p className="leading-relaxed text-slate-600">
                    Vi på Middagsmeny strävar efter att tillhandahålla balanserade recept, men vi kan inte garantera att alla förslag är säkra för personer med specifika allergier eller intoleranser. Kontrollera alltid ingredienslistan på varje produkt innan du lagar maten. Vi ansvarar inte för eventuella allergiska reaktioner eller andra hälsoproblem som kan uppstå till följd av våra receptförslag.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">3. Skolmat och externa källor</h2>
                <p className="leading-relaxed text-slate-600">
                    Informationen om skolornas matsedlar hämtas från externa leverantörer (t.ex. Matilda Menu). Middagsmeny ansvarar inte för eventuella felaktigheter, sena ändringar eller utebliven information som beror på dessa källor eller på skolans egen planering.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">4. Länkar till tredje part</h2>
                <p className="leading-relaxed text-slate-600">
                    Webbplatsen kan innehålla länkar till externa webbplatser som inte drivs av oss. Vi har ingen kontroll över innehållet på dessa webbplatser och kan inte ta ansvar för deras tillgänglighet eller information.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">5. Användande av råd</h2>
                <p className="leading-relaxed text-slate-600">
                    Allt användande av informationen på Middagsmeny.se sker på egen risk. Vi rekommenderar att du alltid använder ditt eget sunda förnuft vid matlagning och kostval för din familj.
                </p>
            </section>

            <div className="pt-12 text-center">
                <a href="/" className="inline-block px-8 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors">
                    Jag har läst och förstått
                </a>
            </div>
        </div>
    );
}
