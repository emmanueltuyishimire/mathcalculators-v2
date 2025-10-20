
"use client";

import { PageHeader } from '@/components/page-header';
import RoundingCalculator from '@/components/calculators/rounding-calculator';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const metadata: Metadata = {
    title: 'Rounding Calculator',
    description: 'A versatile online tool for rounding numbers with various methods, including rounding to the nearest integer, decimal place, or fraction.',
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Rounding Calculator",
  "operatingSystem": "All",
  "applicationCategory": "EducationalApplication",
  "description": "A versatile online calculator for rounding numbers using various methods (half up, half down, ceiling, floor) and to different levels of precision.",
  "url": "https://maths.calculation.site/rounding",
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
            <CardTitle>How to Use the Rounding Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
            <ol className="list-decimal list-inside space-y-2">
                <li>
                    <strong>Enter a Number:</strong> Type the number you want to round into the "Number" input field.
                </li>
                <li>
                    <strong>Choose Precision:</strong> Select how you want to round the number from the "Precision" dropdown. You can choose a standard decimal place or enter a custom one by selecting "Custom".
                </li>
                <li>
                    <strong>Adjust Settings (Optional):</strong> Click the "Settings" button to open a dialog where you can change the rounding method (e.g., Round half up, Round down, etc.).
                </li>
                <li>
                    <strong>View the Result:</strong> The rounded number will appear automatically in the result field as you make changes.
                </li>
            </ol>
        </CardContent>
    </Card>
);

const RoundingMethodsGuide = () => (
    <Card>
        <CardHeader>
            <CardTitle>Understanding Rounding Methods</CardTitle>
        </CardHeader>
        <CardContent>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="half-up">
                    <AccordionTrigger>Round Half Up</AccordionTrigger>
                    <AccordionContent className="space-y-2 text-muted-foreground">
                        <p>Rounds values halfway between the chosen precision up. For negative numbers, it rounds towards the more positive value.</p>
                        <p className="font-mono text-sm">5.5 ⇒ 6 | -5.5 ⇒ -5</p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="half-down">
                    <AccordionTrigger>Round Half Down</AccordionTrigger>
                    <AccordionContent className="space-y-2 text-muted-foreground">
                        <p>Rounds values halfway between the chosen precision down. For negative numbers, it rounds towards the more negative value.</p>
                        <p className="font-mono text-sm">5.5 ⇒ 5 | -5.5 ⇒ -6</p>
                    </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="up">
                    <AccordionTrigger>Round Up (Ceiling)</AccordionTrigger>
                    <AccordionContent className="space-y-2 text-muted-foreground">
                        <p>Rounds up towards the next more positive integer.</p>
                        <p className="font-mono text-sm">5.01 ⇒ 6 | -5.99 ⇒ -5</p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="down">
                    <AccordionTrigger>Round Down (Floor)</AccordionTrigger>
                    <AccordionContent className="space-y-2 text-muted-foreground">
                        <p>Rounds down towards the next more negative integer.</p>
                        <p className="font-mono text-sm">5.99 ⇒ 5 | -5.01 ⇒ -6</p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="half-even">
                    <AccordionTrigger>Round Half to Even</AccordionTrigger>
                    <AccordionContent className="space-y-2 text-muted-foreground">
                        <p>A tie-breaking rule where half values are rounded to the nearest even integer.</p>
                        <p className="font-mono text-sm">5.5 ⇒ 6 | 6.5 ⇒ 6</p>
                    </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="half-odd">
                    <AccordionTrigger>Round Half to Odd</AccordionTrigger>
                    <AccordionContent className="space-y-2 text-muted-foreground">
                        <p>A tie-breaking rule where half values are rounded to the nearest odd integer.</p>
                        <p className="font-mono text-sm">5.5 ⇒ 5 | 6.5 ⇒ 7</p>
                    </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="half-away-zero">
                    <AccordionTrigger>Round Half Away from Zero</AccordionTrigger>
                    <AccordionContent className="space-y-2 text-muted-foreground">
                        <p>Rounds half values to the next integer further from zero.</p>
                        <p className="font-mono text-sm">5.5 ⇒ 6 | -5.5 ⇒ -6</p>
                    </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="half-to-zero">
                    <AccordionTrigger>Round Half Towards Zero</AccordionTrigger>
                    <AccordionContent className="space-y-2 text-muted-foreground">
                        <p>Rounds half values to the next integer closer to zero.</p>
                        <p className="font-mono text-sm">5.5 ⇒ 5 | -5.5 ⇒ -5</p>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
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
                    <AccordionTrigger>What is the default rounding method?</AccordionTrigger>
                    <AccordionContent>
                        This calculator defaults to "Round half up," which is the most common method taught in schools. In this method, if a number is exactly halfway (like 5.5), it is rounded up to the next integer (6).
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>What does "Precision" mean?</AccordionTrigger>
                    <AccordionContent>
                        Precision determines which place value you are rounding to. "Ones (0)" means rounding to the nearest whole number. "Tenths (1)" means rounding to one decimal place. "Tens (-1)" means rounding to the nearest 10.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>Why are there so many different rounding methods?</AccordionTrigger>
                    <AccordionContent>
                        Different methods are used to handle "tie-breaking" (when a number is exactly halfway) in ways that avoid statistical bias. For example, "Round half to even" is often used in scientific and financial contexts because it rounds .5 up half the time and down half the time, preventing a consistent upward or downward skew in a large dataset.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger>What's the difference between "Round up" and "Round half up"?</AccordionTrigger>
                    <AccordionContent>
                        - **Round half up** only rounds up if the digit to be dropped is 5 or greater. For example, 5.4 rounds down to 5, but 5.5 rounds up to 6.<br/>
                        - **Round up (Ceiling)** always rounds up to the next integer if there is any fractional part at all. For example, both 5.1 and 5.9 would round up to 6.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
    </Card>
);

export default function RoundingPage() {
  return (
    <>
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <div className="flex flex-1 flex-col">
        <PageHeader title="Rounding Calculator" />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-2xl space-y-8">
              <section className="text-center">
                  <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                      Rounding Calculator
                  </h1>
                  <p className="mt-4 text-lg text-muted-foreground">
                      A tool for rounding numbers with various methods and levels of precision.
                  </p>
              </section>
              
              <RoundingCalculator />

              <HowToUseGuide />

              <RoundingMethodsGuide />
              <FaqSection />
          </div>
        </main>
      </div>
    </>
  );
}
