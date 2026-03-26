import React from 'react';
import { BookOpen, Calendar, Clock, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Artiklar & Tips om matplanering – Middagsmeny',
  description: 'Läs våra senaste tips och guider om hur du får vardagspusslet att gå ihop med smart matplanering, barnvänliga recept och hälsosam kost.',
};

const ARTICLES = [
  {
    slug: 'matplanering-tips',
    title: '5 tips för en stressfri matvecka med barn',
    excerpt: 'Lär dig hur du sparar tid och pengar genom att planera veckans middagar i förväg. Vi delar med oss av våra bästa knep för barnfamiljen.',
    date: '2026-03-20',
    readTime: '5 min',
    category: 'Vardagstips'
  },
  {
    slug: 'variation-i-kosten',
    title: 'Så skapar du en varierad kost för kräsna barn',
    excerpt: 'Det kan vara svårt att få barn att prova nya saker. Här är våra strategier för att smyga in mer grönt och variation utan tårar vid bordet.',
    date: '2026-03-15',
    readTime: '6 min',
    category: 'Näringslära'
  }
];

export default function ArticlesPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12">
      <header className="bg-[#051c2c] text-white py-12 px-6 text-center">
        <h1 className="text-3xl md:text-5xl font-black mb-4">Artiklar & Tips</h1>
        <p className="text-brand-yellow font-bold uppercase tracking-widest text-sm">Gör vardagspusslet lite enklare</p>
      </header>

      <main className="max-w-4xl mx-auto px-6 mt-12">
        <div className="grid gap-8">
          {ARTICLES.map(article => (
            <a 
              key={article.slug} 
              href={`/artiklar/${article.slug}`}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex flex-col md:flex-row hover:shadow-lg transition-all group"
            >
              <div className="md:w-1/3 bg-slate-100 flex items-center justify-center p-8 text-slate-300">
                <BookOpen className="w-16 h-16 group-hover:scale-110 transition-transform" />
              </div>
              <div className="p-8 md:w-2/3 space-y-4">
                <div className="flex items-center gap-3 text-xs font-bold text-brand-blue uppercase tracking-widest">
                  <span>{article.category}</span>
                  <span className="text-slate-300">•</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {article.readTime}</span>
                </div>
                <h2 className="text-2xl font-bold text-[#051c2c] group-hover:text-brand-blue transition-colors">{article.title}</h2>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {article.excerpt}
                </p>
                <div className="pt-2 flex items-center gap-2 text-sm font-bold text-brand-blue">
                  Läs hela artikeln <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8 mt-12 text-center space-y-4">
          <h3 className="text-xl font-bold text-[#051c2c]">Fler tips under uppbyggnad!</h3>
          <p className="text-sm text-slate-600 max-w-lg mx-auto">
            Vi skriver hela tiden nya artiklar för att hjälpa dig i vardagen. Har du förslag på ämnen du vill att vi ska täcka? Skicka ett mail till oss!
          </p>
        </div>

        <div className="text-center pt-12">
          <a href="/" className="text-slate-400 hover:text-brand-blue transition-colors text-sm font-medium">
            &larr; Tillbaka till startsidan
          </a>
        </div>
      </main>
    </div>
  );
}
