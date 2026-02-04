export default function PrivacyPolicy() {
    return (
        <div className="max-w-2xl mx-auto p-8 space-y-6 bg-white min-h-screen text-slate-800">
            <h1 className="text-3xl font-black mb-6">Integritetspolicy</h1>

            <section className="space-y-3">
                <h2 className="text-xl font-bold">1. Allmänt</h2>
                <p className="text-sm leading-relaxed text-slate-600">
                    Denna policy beskriver hur Middagsmeny ("tjänsten") hanterar data. Vi värnar om din integritet och samlar in så lite information som möjligt för att tjänsten ska fungera.
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-bold">2. Data vi sparar</h2>
                <p className="text-sm leading-relaxed text-slate-600">
                    Vi använder ingen databas och sparar ingen personlig information om dig på våra servrar. All information om dina favoritskolor, inställningar (t.ex. vegetariskt filter) och egna maträtter sparas lokalt i din egen webbläsare (Local Storage).
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-bold">3. Cookies & Tredjepartstjänster</h2>
                <p className="text-sm leading-relaxed text-slate-600">
                    Vi använder tredjepartstjänster för att förbättra upplevelsen och finansiera tjänsten:
                </p>
                <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
                    <li><strong>Google Ads:</strong> Kan använda cookies för att visa relevanta annonser baserat på dina tidigare besök på vår webbplats eller andra webbplatser.</li>
                    <li><strong>Analysverktyg:</strong> Vi kan använda anonymiserad besöksstatistik för att förstå hur tjänsten används.</li>
                </ul>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-bold">4. Dina rättigheter</h2>
                <p className="text-sm leading-relaxed text-slate-600">
                    Eftersom all data sparas lokalt hos dig har du full kontroll. Du kan när som helst radera dina inställningar genom att rensa webbläsarens cookies och data.
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-bold">5. Kontakt</h2>
                <p className="text-sm leading-relaxed text-slate-600">
                    Vid frågor om denna policy, vänligen kontakta oss.
                </p>
            </section>

            <div className="pt-8 text-center">
                <a href="/" className="inline-block px-6 py-3 bg-slate-100 rounded-xl font-bold text-slate-600 hover:bg-slate-200 transition-colors">
                    Tillbaka till appen
                </a>
            </div>
        </div>
    );
}
