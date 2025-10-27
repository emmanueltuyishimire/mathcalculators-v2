
"use client";

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, Divide, Percent, Shuffle, AlertTriangle, Superscript, Binary, Code, Atom, Sigma, Proportions, Radical, Gavel, Hand, CheckCircle, Table, Type, InfinityIcon, HelpCircle } from 'lucide-react';
import React from 'react';
import AlgebraCalculator from '@/components/calculators/algebra-calculator';
import { Button } from '@/components/ui/button';
import { RelatedCalculatorsSidebar } from '@/components/related-calculators-sidebar';

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Algebra Calculator",
  "operatingSystem": "All",
  "applicationCategory": "EducationalApplication",
  "description": "An online algebra calculator that provides step-by-step solutions to algebraic problems. It can simplify expressions, expand brackets, factor polynomials, and solve equations.",
  "url": "https://maths.calculation.site/algebra",
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
    "name": "Algebra Calculator",
    "item": "https://maths.calculation.site/algebra"
  }]
};

export default function AlgebraPage() {
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
                          Algebra Calculator
                      </h1>
                      <p className="mt-4 text-lg text-muted-foreground">
                          A collection of essential algebra and math calculators for everyday problems.
                      </p>
                  </section>

                  <div className="max-w-2xl mx-auto">
                      <AlgebraCalculator />
                      <div className="text-center mt-4">
                          <Button asChild variant="outline">
                              <Link href="/algebra/guide">
                                  <HelpCircle className="mr-2 h-4 w-4" />
                                  How to Use the Algebra Calculator
                              </Link>
                          </Button>
                      </div>
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
