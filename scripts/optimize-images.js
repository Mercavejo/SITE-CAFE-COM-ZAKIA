import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join, extname } from 'path';
import { existsSync } from 'fs';

const ASSETS_DIR = './assets';
const OUTPUT_DIR = './assets/optimized';

async function optimizeImages() {
  try {
    if (!existsSync(OUTPUT_DIR)) {
      await mkdir(OUTPUT_DIR, { recursive: true });
    }

    const files = await readdir(ASSETS_DIR);
    const images = files.filter(f => /\.(png|jpe?g|webp)$/i.test(f));

    console.log(`Found ${images.length} images to optimize\n`);

    for (const file of images) {
      const inputPath = join(ASSETS_DIR, file);
      const baseName = file.replace(extname(file), '');
      
      // Create WebP version
      const webpPath = join(OUTPUT_DIR, `${baseName}.webp`);
      await sharp(inputPath)
        .webp({ quality: 80, effort: 6 })
        .toFile(webpPath);
      
      // Create AVIF version (better compression)
      const avifPath = join(OUTPUT_DIR, `${baseName}.avif`);
      await sharp(inputPath)
        .avif({ quality: 75, effort: 9 })
        .toFile(avifPath);

      const original = await sharp(inputPath).metadata();
      const webp = await sharp(webpPath).metadata();
      const avif = await sharp(avifPath).metadata();

      console.log(`✓ ${file}`);
      console.log(`  Original: ${(original.size / 1024).toFixed(1)}KB (${original.width}x${original.height})`);
      console.log(`  WebP:     ${(webp.size / 1024).toFixed(1)}KB`);
      console.log(`  AVIF:     ${(avif.size / 1024).toFixed(1)}KB`);
      console.log('');
    }

    console.log('✅ Optimization complete! Files saved to assets/optimized/');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

optimizeImages();
