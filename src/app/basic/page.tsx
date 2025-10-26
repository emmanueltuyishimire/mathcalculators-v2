
"use client";

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, Divide, Percent, Shuffle, AlertTriangle, Superscript, Binary, Code, Atom, Sigma, Proportions, Radical, Gavel, Hand, CheckCircle, Table, Type, InfinityIcon } from 'lucide-react';
import React from 'react';
import BasicCalculator from '@/components/calculators/basic-calculator';

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
    "name": "Basic Calculators",
    "item": "https://maths.calculation.site/basic"
  }]
};

const basicTools = [
  { href: '/scientific', label: 'Scientific Calculator', icon: Atom },
  { href: '/fraction', label: 'Fraction Calculator', icon: Divide },
  { href: '/percentage', label: 'Percentage Calculator', icon: Percent },
  { href: '/random', label: 'Random Number Generator', icon: Shuffle },
  { href: '/percent-error', label: 'Percent Error Calculator', icon: AlertTriangle },
  { href: '/exponent', label: 'Exponent Calculator', icon: Superscript },
  { href: '/binary', label: 'Binary Calculator', icon: Binary },
  { href: '/hex', label: 'Hex Calculator', icon: Code },
  { href: '/half-life', label: 'Half-Life Calculator', icon: Atom },
  { href: '/log', label: 'Log Calculator', icon: Calculator },
  { href: '/ratio', label: 'Ratio Calculator', icon: Proportions },
  { href: '/root', label: 'Root Calculator', icon: Radical },
  { href: '/lcm', label: 'Least Common Multiple', icon: Gavel },
  { href: '/gcf', label: 'Greatest Common Factor', icon: Hand },
  { href: '/factor', label: 'Factor Calculator', icon: Gavel },
  { href: '/rounding', 'label': 'Rounding Calculator', icon: CheckCircle },
  { href: '/matrix', label: 'Matrix Calculator', icon: Table },
  { href: '/scientific-notation', label: 'Scientific Notation', icon: Type },
  { href: '/big-number', label: 'Big Number Calculator', icon: InfinityIcon },
];

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
          <div className="mx-auto max-w-4xl space-y-8">
              <section className="text-center">
                  <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                      Basic Calculators
                  </h1>
                  <p className="mt-4 text-lg text-muted-foreground">
                      A collection of essential calculators for everyday math and science problems.
                  </p>
              </section>

              <div className="max-w-md mx-auto">
                  <BasicCalculator />
              </div>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 pt-8">
                {basicTools.map((tool, index) => (
                  <React.Fragment key={tool.label}>
                    <Link href={tool.href} className="group">
                      <Card className="h-full transition-all group-hover:shadow-lg group-hover:-translate-y-1">
                        <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                           <div className="rounded-full bg-primary/10 p-3 text-primary">
                            <tool.icon className="h-6 w-6" />
                          </div>
                          <CardTitle>{tool.label}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">An essential calculation tool.</p>
                        </CardContent>
                      </Card>
                    </Link>
                  </React.Fragment>
                ))}
              </div>
          </div>
        </main>
      </div>
    </>
  );
}
