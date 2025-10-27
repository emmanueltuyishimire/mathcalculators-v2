
import fs from 'fs';
import { glob } from 'glob';

async function generateSitemap() {
  const siteUrl = process.env.SITE_URL || 'https://www.maths.calculation.site';
  const pagesDir = 'src/app';
  const files = await glob('**/*.tsx', { cwd: pagesDir });

  const urls = files
    .map((file) => {
      if (file.includes('layout.tsx') || file.includes('page.tsx') === false) {
        return null;
      }
      let path = file.replace(/\\/g, '/');
      if (path.endsWith('page.tsx')) {
        path = path.slice(0, -'page.tsx'.length);
      }
      // Remove trailing slash if it's not the root
      if (path.length > 1 && path.endsWith('/')) {
        path = path.slice(0, -1);
      }
      return `${siteUrl}${path}`;
    })
    .filter((url) => url !== null);

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map((url) => {
      return `
    <url>
      <loc>${url}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.7</priority>
    </url>
  `;
    })
    .join('')}
</urlset>`;

  fs.writeFileSync('public/sitemap.xml', sitemap);

  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

  fs.writeFileSync('public/robots.txt', robotsTxt);
}

generateSitemap();
