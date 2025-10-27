
"use client";

import UnitConverter from '@/components/calculators/unit-converter';
import { PageHeader } from '@/components/page-header';
import { RelatedCalculatorsSidebar } from '@/components/related-calculators-sidebar';

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Unit Converter",
  "operatingSystem": "All",
  "applicationCategory": "Utilities",
  "description": "A free online tool to convert between various units of measurement, including length, mass, and temperature.",
  "url": "https://maths.calculation.site/unit-converter",
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
    "name": "Unit Converter",
    "item": "https://maths.calculation.site/unit-converter"
  }]
};

export default function UnitConverterPage() {
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
        <PageHeader title="Unit Converter" />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row lg:gap-8">
            <div className="flex-1 space-y-8">
              <section className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Unit Converter
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                  A simple tool to convert between various units of measurement.
                </p>
              </section>
              <UnitConverter />
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
