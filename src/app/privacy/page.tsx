export default function PrivacyPolicy() {
    return (
        <div className="max-w-2xl mx-auto p-8 py-16 space-y-8 bg-white min-h-screen text-slate-800">
            <h1 className="text-4xl font-black mb-8">Integritetspolicy</h1>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">1. Inledning</h2>
                <p className="leading-relaxed text-slate-600">
                    Denna policy beskriver hur Middagsmeny ("vi", "oss", "tjänsten") hanterar data. Vi värnar om din integritet och strävar efter att vara helt transparenta med hur information samlas in och används. Senast uppdaterad: 15 april 2026.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">2. Information vi samlar in</h2>
                <p className="leading-relaxed text-slate-600">
                    Vi samlar inte in några personuppgifter såsom namn, e-postadresser eller telefonnummer såvida du inte själv väljer att kontakta oss via e-post. All information om dina sparade skolor, favoriter och inställningar lagras enbart lokalt i din egen webbläsare (Local Storage) och skickas aldrig till våra servrar.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">3. Cookies och annonsering</h2>
                <p className="leading-relaxed text-slate-600">
                    Vi använder cookies för att förbättra din användarupplevelse och för att finansiera driften av webbplatsen genom annonser.
                </p>
                <div className="bg-slate-50 p-6 rounded-xl space-y-4 border border-slate-100">
                    <h3 className="font-bold text-lg">Google AdSense</h3>
                    <p className="text-sm text-slate-600">
                        Google, som tredjepartsleverantör, använder cookies för att visa annonser på vår webbplats. Googles användning av reklamcookies gör det möjligt för Google och dess partner att visa annonser baserat på ditt besök på denna och/eller andra webbplatser på internet.
                    </p>
                    <p className="text-sm text-slate-600">
                        Användare kan välja att bortse från personlig annonsering genom att besöka <a href="https://myadcenter.google.com/" className="text-brand-blue underline" target="_blank" rel="noopener noreferrer">Googles annonsinställningar</a>. Alternativt kan du välja bort tredjepartsleverantörers användning av cookies för personlig annonsering genom att besöka <a href="https://www.aboutads.info/" className="text-brand-blue underline" target="_blank" rel="noopener noreferrer">www.aboutads.info</a>.
                    </p>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">4. Analysverktyg</h2>
                <p className="leading-relaxed text-slate-600">
                    Vi kan använda verktyg från tredje part för att analysera trafik (t.ex. Google Analytics). Dessa verktyg samlar in anonym information om hur besökare använder webbplatsen för att hjälpa oss förbättra tjänsten. Denna information inkluderar inte personuppgifter.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">5. Datasäkerhet</h2>
                <p className="leading-relaxed text-slate-600">
                    Vi vidtar rimliga säkerhetsåtgärder för att skydda information som hanteras på vår webbplats. Eftersom vi inte lagrar personuppgifter på våra servrar är riskerna för dataintrång minimerade.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">6. Dina rättigheter (GDPR)</h2>
                <p className="leading-relaxed text-slate-600">
                    Du har rätt att få veta vilken information vi har om dig. Eftersom vi inte sparar personlig data på våra servrar är den information vi har om dig begränsad till eventuella e-postkonversationer. Du kan när som helst rensa din lokala data genom att rensa din webbläsares historik och cookies.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">7. Kontakt</h2>
                <p className="leading-relaxed text-slate-600">
                    Om du har frågor om denna integritetspolicy eller vår hantering av data, vänligen kontakta oss på <a href="mailto:hej@middagsmeny.se" className="text-brand-blue underline">hej@middagsmeny.se</a>.
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
