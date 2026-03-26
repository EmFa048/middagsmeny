'use client';

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { href: '/hur-det-fungerar', label: 'Hur det fungerar' },
    { href: '/artiklar', label: 'Tips & Artiklar' },
    { href: '/om-oss', label: 'Om oss' },
  ];

  return (
    <nav className="bg-[#051c2c] text-white border-b border-white/5 py-3 px-6 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="font-black text-lg md:text-xl tracking-tighter hover:text-brand-yellow transition-colors relative z-[60]">
          Middagsmeny<span className="text-brand-yellow">.se</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-brand-yellow transition-colors">
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile Toggle Button */}
        <button 
          onClick={toggleMenu}
          className="md:hidden text-white hover:text-brand-yellow transition-colors relative z-[60]"
          aria-label={isOpen ? "Stäng meny" : "Öppna meny"}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

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
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
