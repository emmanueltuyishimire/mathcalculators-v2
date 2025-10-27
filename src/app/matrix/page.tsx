
"use client";
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, Sigma } from 'lucide-react';
import React from 'react';
import MatrixCalculator from '@/components/calculators/matrix-calculator';
import { RelatedCalculatorsSidebar } from '@/components/related-calculators-sidebar';

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Matrix Calculator",
  "description": "A collection of powerful online matrix calculators for various linear algebra operations, including addition, multiplication, RREF, and diagonalization.",
  "url": "https://maths.calculation.site/matrix",
  "publisher": {
    "@type": "Organization",
    "name": "Math Calculators",
    "url": "https://maths.calculation.site"
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
    "name": "Matrix Calculator",
    "item": "https://maths.calculation.site/matrix"
  }]
};

export default function MatrixCategoryPage() {
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
                            Matrix Calculator
                        </h1>
                        <p className="mt-4 text-lg text-muted-foreground">
                            A collection of powerful matrix calculators for all your linear algebra needs.
                        </p>
                    </section>
                    
                    <MatrixCalculator />
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
