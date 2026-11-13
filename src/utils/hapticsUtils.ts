/**
 * Central hantering av haptisk feedback (vibrationer).
 * Respekterar alltid användarens inställning (mm_haptics_enabled).
 */

export function isHapticsEnabled(): boolean {
  if (typeof window === 'undefined') return true;
  const saved = localStorage.getItem('mm_haptics_enabled');
  return saved !== 'false'; // Standard är på
}

export function setHapticsEnabled(enabled: boolean): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('mm_haptics_enabled', enabled ? 'true' : 'false');
}

/**
 * Lätt haptisk stöt (t.ex. vid klick på meny, byte av vecka, toggle)
 */
export async function triggerLightHaptic(): Promise<void> {
  if (!isHapticsEnabled()) return;

  try {
    const cap = (window as any).Capacitor;
    if (cap && cap.isNativePlatform && cap.isNativePlatform()) {
      const { Haptics, ImpactStyle } = await import('@capacitor/haptics');
      await Haptics.impact({ style: ImpactStyle.Light });
    } else if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(10);
    }
  } catch {
    // Ignorera tyst om enheten saknar haptikstöd
  }
}

/**
 * Medium haptisk stöt (t.ex. vid slumpning av ny meny)
 */
export async function triggerMediumHaptic(): Promise<void> {
  if (!isHapticsEnabled()) return;

  try {
    const cap = (window as any).Capacitor;
    if (cap && cap.isNativePlatform && cap.isNativePlatform()) {
      const { Haptics, ImpactStyle } = await import('@capacitor/haptics');
      await Haptics.impact({ style: ImpactStyle.Medium });
    } else if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(20);
    }
  } catch {
    // Ignorera tyst
  }
}

/**
 * Notifikations-haptik (t.ex. när skola sparas som favorit)
 */
export async function triggerSuccessHaptic(): Promise<void> {
  if (!isHapticsEnabled()) return;

  try {
    const cap = (window as any).Capacitor;
    if (cap && cap.isNativePlatform && cap.isNativePlatform()) {
      const { Haptics, NotificationType } = await import('@capacitor/haptics');
      await Haptics.notification({ type: NotificationType.Success });
    } else if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate([15, 30, 15]);
    }
  } catch {
    // Ignorera tyst
  }
}
