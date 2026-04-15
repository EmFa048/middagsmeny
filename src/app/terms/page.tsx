export default function TermsOfService() {
    return (
        <div className="max-w-2xl mx-auto p-8 py-16 space-y-8 bg-white min-h-screen text-slate-800">
            <h1 className="text-4xl font-black mb-8">Användarvillkor</h1>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">1. Godkännande av villkor</h2>
                <p className="leading-relaxed text-slate-600">
                    Genom att använda Middagsmeny.se godkänner du dessa användarvillkor i sin helhet. Om du inte godkänner villkoren bör du inte använda tjänsten.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">2. Tjänstebeskrivning</h2>
                <p className="leading-relaxed text-slate-600">
                    Middagsmeny är en kostnadsfri informationstjänst som tillhandahåller matsedlar för svenska skolor och matchande middagsrecept. Vi garanterar inte att informationen på webbplatsen alltid är korrekt, fullständig eller uppdaterad, då vi förlitar oss på tredjepartsdata.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">3. Användning av tjänsten</h2>
                <p className="leading-relaxed text-slate-600">
                    Tjänsten tillhandahålls för personligt, icke-kommersiellt bruk. Du får inte använda tjänsten på ett sätt som kan skada, inaktivera eller överbelasta våra servrar eller nätverk.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">4. Immaterialrätt</h2>
                <p className="leading-relaxed text-slate-600">
                    Allt innehåll på webbplatsen, inklusive texter, bilder och kod, tillhör Middagsmeny eller våra licensgivare och är skyddat av upphovsrättslagen.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">5. Ansvarsfriskrivning</h2>
                <p className="leading-relaxed text-slate-600">
                    Middagsmeny ansvarar inte för några direkta eller indirekta skador som uppstår till följd av användning av tjänsten eller informationen på webbplatsen. Detta inkluderar, men är inte begränsat till, felaktig information om matsedlar eller allergier i recept. Se även vår <a href="/disclaimer" className="text-brand-blue underline">Disclaimer</a>.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">6. Ändringar av villkor</h2>
                <p className="leading-relaxed text-slate-600">
                    Vi förbehåller oss rätten att när som helst ändra dessa villkor. De uppdaterade villkoren träder i kraft så snart de publiceras på webbplatsen.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">7. Kontakt</h2>
                <p className="leading-relaxed text-slate-600">
                    Vid frågor om dessa villkor, kontakta oss på <a href="mailto:hej@middagsmeny.se" className="text-brand-blue underline">hej@middagsmeny.se</a>.
                </p>
            </section>

            <div className="pt-12 text-center">
                <a href="/" className="inline-block px-8 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors">
                    Jag förstår, till startsidan
                </a>
            </div>
        </div>
    );
}
