const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function main() {
  const assetsDir = path.join(__dirname, '..', 'assets');
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }

  const logoPath = path.join(__dirname, '..', 'public', 'logo.png');

  console.log('Generating assets in:', assetsDir);

  // 1. Icon (1024x1024)
  await sharp(logoPath)
    .resize(1024, 1024, { fit: 'cover' })
    .png()
    .toFile(path.join(assetsDir, 'icon-only.png'));

  await sharp(logoPath)
    .resize(1024, 1024, { fit: 'cover' })
    .png()
    .toFile(path.join(assetsDir, 'icon.png'));

  // 2. Android Adaptive Icon Background (#051c2c)
  await sharp({
    create: {
      width: 1024,
      height: 1024,
      channels: 4,
      background: { r: 5, g: 28, b: 44, alpha: 1 }, // #051c2c
    },
  })
    .png()
    .toFile(path.join(assetsDir, 'icon-background.png'));

  // 3. Android Adaptive Icon Foreground (Centered icon on transparent)
  const foregroundIcon = await sharp(logoPath)
    .resize(600, 600, { fit: 'contain' })
    .toBuffer();

  await sharp({
    create: {
      width: 1024,
      height: 1024,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([{ input: foregroundIcon, gravity: 'center' }])
    .png()
    .toFile(path.join(assetsDir, 'icon-foreground.png'));

  // 4. Splash Screen (2732x2732, #051c2c with centered logo)
  const splashLogo = await sharp(logoPath)
    .resize(900, 900, { fit: 'contain' })
    .toBuffer();

  await sharp({
    create: {
      width: 2732,
      height: 2732,
      channels: 4,
      background: { r: 5, g: 28, b: 44, alpha: 1 },
    },
  })
    .composite([{ input: splashLogo, gravity: 'center' }])
    .png()
    .toFile(path.join(assetsDir, 'splash.png'));

  // 5. Splash Dark (same brand color #051c2c)
  await sharp({
    create: {
      width: 2732,
      height: 2732,
      channels: 4,
      background: { r: 5, g: 28, b: 44, alpha: 1 },
    },
  })
    .composite([{ input: splashLogo, gravity: 'center' }])
    .png()
    .toFile(path.join(assetsDir, 'splash-dark.png'));

  console.log('Successfully generated all master asset files in assets/');
}

main().catch(console.error);
