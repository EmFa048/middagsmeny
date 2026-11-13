'use client';

import React, { useState, useEffect } from 'react';
import { X, Moon, Sun, Monitor, Vibrate, Info, ShieldCheck, Heart } from 'lucide-react';
import { isHapticsEnabled, setHapticsEnabled, triggerLightHaptic, triggerSuccessHaptic } from '@/utils/hapticsUtils';

export type ThemeMode = 'light' | 'dark' | 'system';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function applyTheme(theme: ThemeMode) {
  if (typeof window === 'undefined') return;

  const root = document.documentElement;
  const isDark = 
    theme === 'dark' || 
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  if (isDark) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }

  localStorage.setItem('mm_theme', theme);
}

export function getSavedTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'system';
  const saved = localStorage.getItem('mm_theme') as ThemeMode;
  if (saved === 'light' || saved === 'dark' || saved === 'system') {
    return saved;
  }
  return 'system';
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [hapticsOn, setHapticsOn] = useState(true);
  const [currentTheme, setCurrentTheme] = useState<ThemeMode>('system');

  useEffect(() => {
    setHapticsOn(isHapticsEnabled());
    setCurrentTheme(getSavedTheme());
  }, [isOpen]);

  if (!isOpen) return null;

  const handleToggleHaptics = (enabled: boolean) => {
    setHapticsOn(enabled);
    setHapticsEnabled(enabled);
    if (enabled) {
      triggerSuccessHaptic();
    }
  };

  const handleSelectTheme = (theme: ThemeMode) => {
    setCurrentTheme(theme);
    applyTheme(theme);
    triggerLightHaptic();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transform transition-all animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <h2 id="settings-title" className="text-lg font-black text-slate-800 dark:text-white flex items-center gap-2">
            Inställningar
          </h2>
          <button
            onClick={() => {
              triggerLightHaptic();
              onClose();
            }}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Stäng inställningar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Innehåll */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Sektion 1: Färgläge / Tema */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
              Utseende & Tema
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleSelectTheme('light')}
                className={`flex flex-col items-center justify-center gap-2 p-3 rounded-2xl border transition-all ${
                  currentTheme === 'light'
                    ? 'bg-brand-yellow/15 border-brand-yellow text-slate-900 dark:text-white font-bold shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-slate-300'
                }`}
              >
                <Sun className={`w-5 h-5 ${currentTheme === 'light' ? 'text-amber-500' : ''}`} />
                <span className="text-xs">Ljust</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectTheme('dark')}
                className={`flex flex-col items-center justify-center gap-2 p-3 rounded-2xl border transition-all ${
                  currentTheme === 'dark'
                    ? 'bg-brand-blue/15 border-brand-blue text-slate-900 dark:text-white font-bold shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-slate-300'
                }`}
              >
                <Moon className={`w-5 h-5 ${currentTheme === 'dark' ? 'text-blue-400' : ''}`} />
                <span className="text-xs">Mörkt</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectTheme('system')}
                className={`flex flex-col items-center justify-center gap-2 p-3 rounded-2xl border transition-all ${
                  currentTheme === 'system'
                    ? 'bg-slate-200 dark:bg-slate-700 border-slate-400 dark:border-slate-600 text-slate-900 dark:text-white font-bold shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-slate-300'
                }`}
              >
                <Monitor className="w-5 h-5" />
                <span className="text-xs">System</span>
              </button>
            </div>
          </div>

          {/* Sektion 2: Haptisk feedback */}
          <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
              Interaktion & Känsla
            </label>
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <Vibrate className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-800 dark:text-white">Haptisk feedback</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Små vibrationer vid knapptryck</div>
                </div>
              </div>

              {/* iOS-liknande toggle switch */}
              <button
                type="button"
                role="switch"
                aria-checked={hapticsOn}
                onClick={() => handleToggleHaptics(!hapticsOn)}
                className={`w-12 h-7 flex items-center rounded-full p-1 transition-colors duration-200 focus:outline-none ${
                  hapticsOn ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'
                }`}
              >
                <div
                  className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 ${
                    hapticsOn ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Sektion 3: Information & Om Appen */}
          <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
              Om Appen
            </label>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex justify-between items-center py-1 border-b border-slate-200/60 dark:border-slate-700/60">
                <span className="text-slate-500 dark:text-slate-400">Version</span>
                <span className="font-mono font-bold text-slate-800 dark:text-white">1.5.0 (Build 1)</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-200/60 dark:border-slate-700/60">
                <span className="text-slate-500 dark:text-slate-400">Matsedelskälla</span>
                <span className="font-medium">Matilda Menu & Matilda Platform</span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <a 
                  href="/privacy" 
                  className="text-brand-blue hover:underline flex items-center gap-1 font-medium"
                >
                  <ShieldCheck className="w-3.5 h-3.5" /> Integritetspolicy
                </a>
                <span className="text-slate-400 flex items-center gap-1">
                  Gjord med <Heart className="w-3 h-3 text-rose-500 fill-current inline" /> för barnfamiljer
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex justify-end">
          <button
            type="button"
            onClick={() => {
              triggerLightHaptic();
              onClose();
            }}
            className="w-full py-3 bg-[#051c2c] dark:bg-white dark:text-slate-900 text-white rounded-xl font-bold text-sm shadow-md hover:opacity-90 transition-opacity"
          >
            Klar
          </button>
        </div>
      </div>
    </div>
  );
}
