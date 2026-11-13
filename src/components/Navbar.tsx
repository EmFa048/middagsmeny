'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Settings } from 'lucide-react';
import SettingsModal, { getSavedTheme, applyTheme } from './SettingsModal';
import { triggerLightHaptic } from '@/utils/hapticsUtils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Applicera sparat tema direkt vid laddning
  useEffect(() => {
    const saved = getSavedTheme();
    applyTheme(saved);
  }, []);

  const toggleMenu = () => {
    triggerLightHaptic();
    setIsOpen(!isOpen);
  };

  const openSettings = () => {
    triggerLightHaptic();
    setIsSettingsOpen(true);
    setIsOpen(false);
  };

  const navLinks = [
    { href: '/hur-det-fungerar', label: 'Hur det fungerar' },
    { href: '/artiklar', label: 'Tips & Artiklar' },
    { href: '/om-oss', label: 'Om oss' },
  ];

  return (
    <>
      <nav className="bg-[#051c2c] text-white border-b border-white/5 py-3 px-6 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <a href="/" className="font-black text-lg md:text-xl tracking-tighter hover:text-brand-yellow transition-colors relative z-[60]">
            Middagsmeny<span className="text-brand-yellow">.se</span>
          </a>

          {/* Högersektion för Desktop */}
          <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-brand-yellow transition-colors">
                {link.label}
              </a>
            ))}
            
            {/* Inställningsknapp Desktop */}
            <button
              onClick={openSettings}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 hover:text-brand-yellow transition-all flex items-center gap-1.5"
              title="Inställningar"
              aria-label="Inställningar"
            >
              <Settings className="w-4 h-4" />
              <span className="text-[11px] normal-case font-semibold">Inställningar</span>
            </button>
          </div>

          {/* Högersektion för Mobil */}
          <div className="flex md:hidden items-center gap-2 relative z-[60]">
            <button
              onClick={openSettings}
              className="p-2 text-white hover:text-brand-yellow transition-colors"
              aria-label="Inställningar"
              title="Inställningar"
            >
              <Settings className="w-5 h-5" />
            </button>

            <button 
              onClick={toggleMenu}
              className="p-2 text-white hover:text-brand-yellow transition-colors"
              aria-label={isOpen ? "Stäng meny" : "Öppna meny"}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu Overlay */}
          <div className={`
            fixed inset-0 bg-[#051c2c] z-50 transform transition-transform duration-300 ease-in-out md:hidden
            ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          `}>
            <div className="flex flex-col items-center justify-center h-full space-y-8 text-lg font-black uppercase tracking-widest">
              {navLinks.map((link) => (
                <a 
                  key={link.href} 
                  href={link.href} 
                  className="hover:text-brand-yellow transition-colors px-6 py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a 
                href="/" 
                className="text-brand-yellow text-sm font-bold pt-4"
                onClick={() => setIsOpen(false)}
              >
                Hem
              </a>
              <button
                onClick={openSettings}
                className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-300 hover:text-white pt-6 border-t border-white/10"
              >
                <Settings className="w-4 h-4 text-brand-yellow" /> Inställningar
              </button>
            </div>
          </div>
        </div>
      </nav>

      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </>
  );
};

export default Navbar;
