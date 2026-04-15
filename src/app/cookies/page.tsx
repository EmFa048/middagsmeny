export default function CookiePolicy() {
    return (
        <div className="max-w-2xl mx-auto p-8 py-16 space-y-8 bg-white min-h-screen text-slate-800">
            <h1 className="text-4xl font-black mb-8">Cookiepolicy</h1>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">1. Vad är cookies?</h2>
                <p className="leading-relaxed text-slate-600">
                    Cookies är små textfiler som sparas på din dator, telefon eller surfplatta när du besöker en webbplats. De används för att få webbplatsen att fungera mer effektivt och för att ge information till webbplatsens ägare.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">2. Hur vi använder cookies</h2>
                <p className="leading-relaxed text-slate-600">
                    Middagsmeny använder cookies för följande ändamål:
                </p>
                <ul className="list-disc pl-5 text-slate-600 space-y-2 text-sm">
                    <li><strong>Nödvändiga cookies:</strong> För att tjänsten ska fungera (t.ex. spara din valda skola). Dessa lagras lokalt hos dig.</li>
                    <li><strong>Analytiska cookies:</strong> För att förstå hur besökare använder webbplatsen (anonym statistik).</li>
                    <li><strong>Annonseringscookies:</strong> För att visa relevanta annonser (Google AdSense).</li>
                </ul>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">3. Google AdSense-cookies</h2>
                <p className="leading-relaxed text-slate-600">
                    Vi samarbetar med Google för att visa annonser. Google använder cookies för att visa annonser baserat på användarnas besök på denna och andra webbplatser. Du kan välja bort personlig annonsering genom att besöka <a href="https://myadcenter.google.com/" className="text-brand-blue underline" target="_blank" rel="noopener noreferrer">Googles annonsinställningar</a>.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">4. Hantera cookies</h2>
                <p className="leading-relaxed text-slate-600">
                    De flesta webbläsare tillåter dig att styra cookies genom inställningarna. Du kan välja att blockera alla cookies, eller att få en varning varje gång en cookie skickas. Om du blockerar alla cookies kan vissa delar av Middagsmeny sluta fungera (t.ex. kommer din sparade skola inte komma ihåg nästa gång).
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">5. Mer information</h2>
                <p className="leading-relaxed text-slate-600">
                    För mer information om hur vi hanterar din data, läs vår <a href="/privacy" className="text-brand-blue underline">Integritetspolicy</a>.
                </p>
            </section>

            <div className="pt-12 text-center">
                <a href="/" className="inline-block px-8 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors">
                    Tillbaka till startsidan
                </a>
            </div>
        </div>
    );
}
