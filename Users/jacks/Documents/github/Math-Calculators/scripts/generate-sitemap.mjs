import fs from 'fs';
import { glob } from 'glob';

async function generateSitemap() {
  const siteUrl = 'https://www.maths.calculation.site';
  
  // Find all page.tsx files in the app directory
  const pages = await glob('src/app/**/page.tsx', {
    ignore: [
      'src/app/layout.tsx',
      'src/app/sitemap.xml/page.tsx' // ignore sitemap generator
    ]
  });

  const urls = pages.map(page => {
    // Convert file path to URL path
    let path = page
      .replace('src/app', '')
      .replace('/page.tsx', '')
      .replace(/\/$/, ''); // Remove trailing slash for home page

    if (path === '') {
        path = '/';
    }
    
    // Skip layout files or other non-page files
    if (path.includes('layout')) return null;

    return `
  <url>
    <loc>${siteUrl}${path}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>`;
  }).filter(Boolean);

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('')}
</urlset>`;

  // Write sitemap to public directory
  // Note: Next.js serves files from `public` at the root.
  fs.writeFileSync('public/sitemap.xml', sitemap);
  console.log('Sitemap generated successfully at public/sitemap.xml');
}

generateSitemap();
