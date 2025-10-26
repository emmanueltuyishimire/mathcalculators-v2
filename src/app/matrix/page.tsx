
"use client";
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, Sigma } from 'lucide-react';
import React from 'react';
import MatrixCalculator from '@/components/calculators/matrix-calculator';

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Matrix Calculators",
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
    "name": "Matrix Calculators",
    "item": "https://maths.calculation.site/matrix"
  }]
};

const matrixTools = [
  {
    href: '/matrix/calculator',
    label: 'Matrix Calculator',
    icon: Table,
    description: 'Perform basic matrix operations like addition, multiplication, and transpose.',
  },
  {
    href: '/rref',
    label: 'RREF Calculator',
    icon: Sigma,
    description: 'Solve systems of linear equations using Row Echelon Form.',
  },
  {
    href: '/desmos-matrix',
    label: 'Desmos Matrix Calculator',
    icon: Table,
    description: 'A Desmos-style matrix calculator for interactive operations.',
  },
  {
    href: '/diagonalize-matrix',
    label: 'Diagonalize Matrix Calculator',
    icon: Table,
    description: 'Find eigenvalues, eigenvectors, and diagonalize matrices.',
  },
];

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
          <div className="mx-auto max-w-7xl space-y-8">
              <section className="text-center" aria-labelledby="page-title">
                  <h1 id="page-title" className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                      Matrix Calculators
                  </h1>
                  <p className="mt-4 text-lg text-muted-foreground">
                      A collection of powerful matrix calculators for all your linear algebra needs.
                  </p>
              </section>
              
              <MatrixCalculator />

              <section aria-labelledby="related-tools-title">
                <h2 id="related-tools-title" className="sr-only">Related Matrix Tools</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 pt-8">
                  {matrixTools.map((tool) => (
                    <React.Fragment key={tool.href}>
                        <Link href={tool.href} className="group">
                          <Card className="h-full transition-all group-hover:shadow-lg group-hover:-translate-y-1">
                            <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                              <div className="rounded-full bg-primary/10 p-3 text-primary">
                                <tool.icon className="h-6 w-6" />
                              </div>
                              <CardTitle>{tool.label}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-muted-foreground">{tool.description}</p>
                            </CardContent>
                          </Card>
                        </Link>
                    </React.Fragment>
                  ))}
                </div>
              </section>
          </div>
        </main>
      </div>
    </>
  );
}
