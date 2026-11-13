import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'se.middagsmeny.app',
  appName: 'Middagsmeny',
  webDir: 'public',
  server: {
    // Under utveckling eller produktion kan appen ansluta direkt till produktionsdomänen
    // vilket ger automatiska uppdateringar av matsedlar och buggfixar
    url: 'https://middagsmeny.se',
    cleartext: false,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1800,
      launchAutoHide: true,
      backgroundColor: '#051c2c',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#051c2c',
    },
  },
};

export default config;
