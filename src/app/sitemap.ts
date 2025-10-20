
import { MetadataRoute } from 'next';

const URL = 'https://maths.calculation.site';

const staticRoutes = [
  '/',
  '/about',
  '/algebra',
  '/basic',
  '/big-number',
  '/binary',
  '/calculators',
  '/calculus',
  '/contact',
  '/converter',
  '/desmos-matrix',
  '/destiny-matrix',
  '/diagonalize-matrix',
  '/disclaimer',
  '/distance',
  '/exponent',
  '/factor',
  '/fraction',
  '/gcf',
  '/geometry',
  '/geometry/area',
  '/geometry/circle',
  '/geometry/surface-area',
  '/geometry/volume',
  '/half-life',
  '/hex',
  '/lcm',
  '/log',
  '/matrix',
  '/matrix/calculator',
  '/percent-error',
  '/percentage',
  '/privacy-policy',
  '/pythagorean',
  '/random',
  '/ratio',
  '/right-triangle',
  '/root',
  '/rounding',
  '/rref',
  '/scientific',
  '/scientific-notation',
  '/slope',
  '/statistics',
  '/statistics/confidence-interval',
  '/statistics/mean-median-mode',
  '/statistics/permutation-combination',
  '/statistics/probability',
  '/statistics/sample-size',
  '/statistics/sequences',
  '/statistics/standard-deviation',
  '/statistics/z-score',
  '/terms-of-service',
  '/trigonometry',
  '/site-directory', // Add sitemap page itself
].map(route => ({
  url: `${URL}${route}`,
  lastModified: new Date(),
}));

export default function sitemap(): MetadataRoute.Sitemap {
  return staticRoutes;
}
