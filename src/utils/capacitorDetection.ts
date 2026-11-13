/**
 * Hjälpfunktion för att kontrollera om appen körs som en native app (iOS/Android)
 * via Capacitor, eller i en vanlig webbläsare.
 */

export function isNativeApp(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Kontrollera om Capacitor existerar på window (injiceras automatiskt i native webview)
  const cap = (window as any).Capacitor;
  if (cap && typeof cap.isNativePlatform === 'function') {
    return cap.isNativePlatform();
  }

  return false;
}

export function getPlatform(): 'ios' | 'android' | 'web' {
  if (typeof window === 'undefined') return 'web';
  const cap = (window as any).Capacitor;
  if (cap && typeof cap.getPlatform === 'function') {
    return cap.getPlatform();
  }
  return 'web';
}
