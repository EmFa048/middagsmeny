import React from 'react';
import { Mail, MessageSquare, Coffee, ExternalLink } from 'lucide-react';

export const metadata = {
  title: 'Kontakt – Hör av dig till oss på Middagsmeny',
  description: 'Har du frågor, förslag på nya skolor eller vill du dela med dig av ett favoritrecept? Kontakta oss på Middagsmeny.se.',
};

"use client";

import React, { useState } from 'react';
import { Mail, MessageSquare, Coffee, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12">
      <header className="bg-[#051c2c] text-white py-12 px-6 text-center">
        <h1 className="text-3xl md:text-5xl font-black mb-4">Kontakta oss</h1>
        <p className="text-brand-yellow font-bold uppercase tracking-widest text-sm">Vi vill gärna höra från dig!</p>
      </header>

      <main className="max-w-3xl mx-auto px-6 mt-12 space-y-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            {status === 'success' ? (
              <div className="py-12 text-center space-y-6">
                <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-[#051c2c]">Meddelandet är skickat!</h2>
                  <p className="text-slate-600">Tack för att du hörde av dig. Vi återkommer så snart vi kan.</p>
                </div>
                <button 
                  onClick={() => setStatus('idle')}
                  className="px-8 py-3 bg-slate-100 text-slate-800 rounded-xl font-bold hover:bg-slate-200 transition-colors"
                >
                  Skicka ett till
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Ditt Namn</label>
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Maria Svensson"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400">E-postadress</label>
                    <input 
                      required
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="maria@exempel.se"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Meddelande</label>
                  <textarea 
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Hej! Jag skulle vilja tipsa om en skola..."
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all resize-none"
                  ></textarea>
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-3 p-4 bg-rose-50 text-rose-600 rounded-xl text-sm font-medium">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    Oops! Något gick fel. Försök igen eller maila oss direkt.
                  </div>
                )}

                <button 
                  disabled={status === 'loading'}
                  type="submit"
                  className="w-full py-5 bg-brand-blue text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-brand-blue/20"
                >
                  {status === 'loading' ? 'Skickar...' : 'Skicka meddelande'}
                  <Send className={`w-5 h-5 ${status === 'loading' ? 'animate-pulse' : ''}`} />
                </button>
              </form>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h2 className="text-lg font-bold text-[#051c2c] mb-6 flex items-center gap-2">
                <Mail className="w-5 h-5 text-brand-blue" />
                Andra vägar
              </h2>
              <div className="space-y-4">
                <a 
                  href="mailto:hej@middagsmeny.se" 
                  className="block p-4 bg-slate-50 rounded-2xl hover:bg-brand-yellow/10 border border-slate-100 transition-all group"
                >
                  <h3 className="font-bold text-sm text-[#051c2c]">Direkt mail</h3>
                  <p className="text-xs text-slate-500">hej@middagsmeny.se</p>
                </a>

                <a 
                  href="https://buymeacoffee.com/edysweden" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-slate-50 rounded-2xl hover:bg-brand-yellow/10 border border-slate-100 transition-all group"
                >
                  <h3 className="font-bold text-sm text-[#051c2c]">Stöd oss</h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    Bjud på en kaffe <Coffee className="w-3 h-3 text-[#FFDD00]" />
                  </p>
                </a>
              </div>
            </div>

            <div className="bg-[#051c2c] p-8 rounded-3xl text-white space-y-4">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-6 h-6 text-brand-yellow" />
                <h2 className="text-xl font-bold">FAQ</h2>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Vi är ett litet team som bygger Middagsmeny på fritiden. Vi svarar oftast inom 24 timmar!
              </p>
              <a href="/hur-det-fungerar" className="text-xs font-bold text-brand-yellow hover:underline block">
                Läs mer om hur tjänsten fungerar &rarr;
              </a>
            </div>
          </div>
        </div>

        <div className="text-center pt-8">
          <a href="/" className="text-slate-400 hover:text-brand-blue transition-colors text-sm font-medium">
            &larr; Tillbaka till startsidan
          </a>
        </div>
      </main>
    </div>
  );
}
