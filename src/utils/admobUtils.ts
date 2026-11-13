/**
 * Central hantering av Google AdMob för native mobilapp (iOS & Android).
 * Använder officiella Google Test-annonser under utveckling.
 */

import { isNativeApp } from './capacitorDetection';

// Officiella produktions- och test-ID:n för Google AdMob
const ADMOB_IDS = {
  android: {
    banner: 'ca-app-pub-5713849466989513/5513707128',
  },
  ios: {
    banner: 'ca-app-pub-3940256099942544/2934735716', // Google test-ID för iOS tills Apple-konto aktiverats
  },
};

let isAdMobInitialized = false;

export async function initializeAdMob(): Promise<void> {
  if (!isNativeApp()) return;
  if (isAdMobInitialized) return;

  try {
    const { AdMob } = await import('@capacitor-community/admob');
    await AdMob.initialize({
      initializeForTesting: false,
    });
    isAdMobInitialized = true;
    console.log('AdMob successfully initialized');
  } catch (error) {
    console.warn('AdMob failed to initialize:', error);
  }
}

export async function showBannerAd(): Promise<void> {
  if (!isNativeApp()) return;

  try {
    await initializeAdMob();
    const { AdMob, BannerAdSize, BannerAdPosition } = await import('@capacitor-community/admob');

    const cap = (window as any).Capacitor;
    const isIOS = cap?.getPlatform?.() === 'ios';
    const adId = isIOS ? ADMOB_IDS.ios.banner : ADMOB_IDS.android.banner;

    await AdMob.showBanner({
      adId,
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0,
      isTesting: false,
    });
  } catch (error) {
    console.warn('Failed to show AdMob banner:', error);
  }
}

export async function hideBannerAd(): Promise<void> {
  if (!isNativeApp()) return;

  try {
    const { AdMob } = await import('@capacitor-community/admob');
    await AdMob.hideBanner();
  } catch (error) {
    console.warn('Failed to hide AdMob banner:', error);
  }
}
