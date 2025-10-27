
"use client";

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import BasicCalculator from '@/components/calculators/basic-calculator';
import { RelatedCalculatorsSidebar } from '@/components/related-calculators-sidebar';

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Basic Calculator",
  "operatingSystem": "All",
  "applicationCategory": "Utilities",
  "description": "A free online basic calculator for performing simple arithmetic operations like addition, subtraction, multiplication, and division.",
  "url": "https://maths.calculation.site/basic",
  "publisher": {
    "@type": "Organization",
    "name": "Math Calculators",
    "url": "https://maths.calculation.site"
  },
  "inLanguage": "en",
  "softwareVersion": "1.0.0",
  "offers": {
    "@type": "Offer",
    "price": "0"
  }
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [{
    "@type": "ListItem",
    "position": 1,
    "name": "Home",
    "item": "https://maths.calculation.site"
  },{
    "@type": "ListItem",
    "position": 2,
    "name": "Calculators",
    "item": "https://maths.calculation.site/calculators"
  },{
    "@type": "ListItem",
    "position": 3,
    "name": "Basic Calculator",
    "item": "https://maths.calculation.site/basic"
  }]
};

export default function BasicCategoryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="flex flex-1 flex-col">
        <main className="flex-1 p-4 md:p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row lg:gap-8">
                <div className="flex-1 space-y-8">
                    <section className="text-center" aria-labelledby="page-title">
                        <h1 id="page-title" className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                            Basic Calculator
                        </h1>
                        <p className="mt-4 text-lg text-muted-foreground">
                            A collection of essential calculators for everyday math and science problems.
                        </p>
                    </section>

                    <div className="max-w-md mx-auto">
                        <BasicCalculator />
                    </div>
                </div>
                <div className="mt-8 lg:mt-0">
                    <RelatedCalculatorsSidebar />
                </div>
            </div>
        </main>
      </div>
    </>
  );
}
