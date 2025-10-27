
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import placeholderImages from '@/lib/placeholder-images.json';
import type { Metadata } from 'next';
import { calculatorCategories } from '@/lib/calculator-categories';

export const metadata: Metadata = {
  title: 'Math Calculators Collection',
  description: 'Browse a comprehensive collection of free online math calculators for various fields including algebra, geometry, statistics, and more.',
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Math Calculators Collection",
  "description": "Browse a comprehensive collection of free online math calculators for various fields including algebra, geometry, statistics, and more.",
  "url": "https://maths.calculation.site/calculators",
  "publisher": {
    "@type": "Organization",
    "name": "Math Calculators",
    "url": "https://maths.calculation.site"
  }
};

export default function CalculatorsPage() {
  const heroImage = placeholderImages.find(p => p.id === 'heroImage2');
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <div className="flex flex-1 flex-col">
        <section
          className="relative w-full h-64 bg-cover bg-center"
          aria-labelledby="calculators-page-heading"
        >
          {heroImage && (
              <Image
                  src={heroImage.src}
                  alt={heroImage.alt}
                  data-ai-hint={heroImage.hint}
                  fill
                  priority
                  className="object-cover"
                  sizes="100vw"
              />
          )}
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center p-4">
            <h1 id="calculators-page-heading" className="text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl" style={{ textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)' }}>
              Math Calculators
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl mt-4" style={{ textShadow: '1px 1px 4px rgba(0, 0, 0, 0.8)' }}>
              Browse our comprehensive collection of free online math calculators, organized by category for easy access.
            </p>
          </div>
        </section>

        <main className="flex-1 p-4 md:p-6 lg:p-12">
          <div className="mx-auto max-w-7xl">
            <section className="space-y-16">
              {calculatorCategories.map((category, catIndex) => (
                <div key={category.title} aria-labelledby={`category-heading-${catIndex}`}>
                    <h2 id={`category-heading-${catIndex}`} className="text-3xl md:text-4xl font-bold text-center mb-8">{category.title}</h2>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                      {category.tools.map((tool) => (
                        <React.Fragment key={tool.label}>
                          <Link href={tool.href} className="group" aria-label={`Go to ${tool.label}`}>
                            <Card className="h-full transition-all group-hover:shadow-lg group-hover:-translate-y-1">
                              <CardHeader className="flex flex-col items-center text-center p-4">
                                <div className="mb-2 rounded-full bg-primary/10 p-3 text-primary">
                                  <tool.icon className="h-6 w-6" aria-hidden="true" />
                                </div>
                                <CardTitle className="text-base">{tool.label}</CardTitle>
                              </CardHeader>
                            </Card>
                          </Link>
                        </React.Fragment>
                      ))}
                    </div>
                </div>
              ))}
            </section>
          </div>
        </main>
      </div>
    </>
  );
}
