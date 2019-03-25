import path from 'path';
import sm from 'sitemap';
import fs from 'fs';

const OUTPUT_FILE = path.resolve(
  __dirname,
  '..',
  '..',
  'public',
  'sitemap.xml',
);

const sitemap = sm.createSitemap({
  hostname: 'https://silvermaplestudio.com',
  cacheTime: 600000, //600 sec (10 min) cache purge period
  urls: [
    { url: '/', changefreq: 'weekly', priority: 1 },
    { url: '/about', changefreq: 'weekly', priority: 0.9 },
    { url: '/custom', changefreq: 'weekly', priority: 0.8 },
    { url: '/cart', changefreq: 'always', priority: 0.5 },
    { url: '/confirmation', changefreq: 'always', priority: 0.4 },
  ],
});

fs.writeFileSync(OUTPUT_FILE, sitemap.toString());

console.log(`Sitemap written at ${OUTPUT_FILE}`);
