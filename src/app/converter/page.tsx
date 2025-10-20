
"use client";

import { PageHeader } from '@/components/page-header';
import UnitConverter from '@/components/calculators/unit-converter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Unit Converter",
  "operatingSystem": "All",
  "applicationCategory": "Utilities",
  "description": "A versatile unit converter for length, mass, temperature, and other common measurements.",
  "url": "https://maths.calculation.site/converter",
  "publisher": {
    "@type": "Organization",
    "name": "Math Calculators",
    "url": "https://maths.calculation.site"
  },
  "inLanguage": "en",
  "datePublished": "2024-07-26",
  "softwareVersion": "1.0.0"
};

const HowToUseGuide = () => (
    <Card>
        <CardHeader>
            <CardTitle>How to Use the Unit Converter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
            <ol className="list-decimal list-inside space-y-2">
                <li>
                    <strong>Select a Category:</strong> Choose the type of measurement you want to convert (e.g., Length, Mass, Temperature).
                </li>
                <li>
                    <strong>Enter a Value:</strong> Type the number you want to convert into the "From" input field.
                </li>
                <li>
                    <strong>Choose Your Units:</strong>
                     <ul className="list-disc list-inside pl-6 mt-1">
                        <li>Select the starting unit from the "From" dropdown menu.</li>
                        <li>Select the target unit from the "To" dropdown menu.</li>
                    </ul>
                </li>
                <li>
                    <strong>View the Result:</strong> The converted value will automatically appear in the "To" field.
                </li>
                <li>
                    <strong>Swap Units:</strong> Click the arrow button to quickly swap the "From" and "To" units.
                </li>
            </ol>
        </CardContent>
    </Card>
);

const FaqSection = () => (
    <Card>
        <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>How accurate are the conversions?</AccordionTrigger>
                    <AccordionContent>
                        The conversions are based on standard, internationally accepted conversion factors. The results are typically rounded to four decimal places for readability, but the underlying calculation is highly accurate.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>What temperature scales can I convert between?</AccordionTrigger>
                    <AccordionContent>
                        The calculator supports the three most common temperature scales: Celsius, Fahrenheit, and Kelvin. You can convert between any of these two.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>Why does the "To" field update automatically?</AccordionTrigger>
                    <AccordionContent>
                        The calculator is designed for convenience. It recalculates the result in real-time whenever you change the input value or the selected units, so you don't need to press a "Calculate" button.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger>Can I convert more complex units?</AccordionTrigger>
                    <AccordionContent>
                        This converter focuses on common units for Length and Mass, as well as Temperature. It does not currently support derived units (like speed, m/s) or other categories like volume or pressure.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                    <AccordionTrigger>What is the base unit used for calculations?</AccordionTrigger>
                    <AccordionContent>
                        For consistency, all conversions are performed by first converting the "From" value into a standard base unit (e.g., meters for Length, kilograms for Mass, Celsius for Temperature) and then converting that base value to the desired "To" unit.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
    </Card>
);

export default function ConverterPage() {
  return (
    <>
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <div className="flex flex-1 flex-col">
        <PageHeader title="Unit Converter" />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-2xl space-y-8">
            <UnitConverter />
            <HowToUseGuide />
              <section className="text-center">
                  <h2 className="text-2xl font-bold text-foreground">Related Calculators</h2>
                  <div className="flex flex-wrap justify-center gap-2 mt-4">
                      <Button asChild variant="outline">
                          <Link href="/basic">Basic Calculators</Link>
                      </Button>
                  </div>
              </section>
              <FaqSection />
          </div>
        </main>
      </div>
    </>
  );
}
