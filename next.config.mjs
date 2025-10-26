/** @type {import('next-sitemap').IConfig} */
const nextSitemapConfig = {
  siteUrl: 'https://maths.calculation.site',
  generateRobotsTxt: true,
  // Optional: Set a priority for your main pages
  transform: async (config, path) => {
    let priority = 0.7; // Default priority
    if (path === '/') priority = 1.0;
    if (path === '/calculators') priority = 0.9;
    if (path.startsWith('/statistics') || path.startsWith('/geometry')) priority = 0.8;

    return {
      loc: path,
      changefreq: 'daily',
      priority: priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};

export default nextSitemapConfig;
