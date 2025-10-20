
"use client";

import { PageHeader } from '@/components/page-header';
import CalculusCalculator from '@/components/calculators/calculus-calculator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Calculus Calculator",
  "operatingSystem": "All",
  "applicationCategory": "EducationalApplication",
  "description": "Solve derivatives, integrals, and limits with our free online Calculus Calculator. A helpful tool for students learning the fundamentals of calculus.",
  "url": "https://maths.calculation.site/calculus",
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
            <CardTitle>How to Use the Calculus Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
            <ol className="list-decimal list-inside space-y-2">
                <li>
                    <strong>Select a Tab:</strong> Choose the operation you want to perform: Derivative, Integral, or Limit.
                </li>
                <li>
                    <strong>Enter the Expression:</strong>
                    <ul className="list-disc list-inside pl-6 mt-1">
                        <li>For <strong>Derivatives</strong>, enter the function f(x) (e.g., <code className="font-mono bg-muted p-1 rounded-md">x^3</code>).</li>
                        <li>For <strong>Integrals</strong>, enter the function to integrate (e.g., <code className="font-mono bg-muted p-1 rounded-md">3x^2</code>).</li>
                        <li>For <strong>Limits</strong>, enter the function and the value x approaches (e.g., <code className="font-mono bg-muted p-1 rounded-md">(x^2 - 4)/(x - 2) as x-&gt;2</code>).</li>
                    </ul>
                </li>
                <li>
                    <strong>Calculate:</strong> Click the "Calculate" button.
                </li>
                <li>
                    <strong>View the Result:</strong> The answer will appear in the result section below the button.
                </li>
            </ol>
             <div className="p-4 bg-accent/50 rounded-lg">
                <h4 className="font-semibold text-accent-foreground">💡 Note on Syntax</h4>
                <p className="text-sm text-muted-foreground mt-2">Use standard mathematical notation. For example, use <code className="font-mono bg-muted p-1 rounded-md">^</code> for exponents (e.g., <code className="font-mono bg-muted p-1 rounded-md">x^2</code> for x squared).</p>
            </div>
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
                    <AccordionTrigger>What is a derivative?</AccordionTrigger>
                    <AccordionContent>
                        A derivative measures the instantaneous rate of change of a function. Geometrically, it represents the slope of the tangent line to the function's graph at a specific point. It's a fundamental concept in calculus used to find minima and maxima, velocity, and acceleration.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>What is an integral?</AccordionTrigger>
                    <AccordionContent>
                        An integral is the reverse operation of a derivative. An indefinite integral (or antiderivative) gives you a family of functions whose derivative is the original function. A definite integral calculates the cumulative effect of a quantity, which can be interpreted as the area under the curve of a function's graph between two points.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>What is a limit?</AccordionTrigger>
                    <AccordionContent>
                        A limit describes the value that a function "approaches" as the input approaches some value. Limits are essential for defining continuity, derivatives, and integrals. They help us analyze the behavior of functions at points where they might not be defined.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger>What functions does this calculator support?</AccordionTrigger>
                    <AccordionContent>
                        This calculator is a demonstration tool and supports basic polynomial functions like `x^2`, `3x^3 + 2x`, etc. It uses a mock calculation and does not have a full symbolic math engine. For real calculations, a more advanced tool like our full <Link href="/scientific" className="text-primary hover:underline">Scientific Calculator</Link> is recommended.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                    <AccordionTrigger>Why do indefinite integrals have "+ C"?</AccordionTrigger>
                    <AccordionContent>
                        The "+ C" represents the constant of integration. Since the derivative of any constant is zero, there are infinitely many functions that could have the same derivative. For example, the derivative of `x²`, `x² + 5`, and `x² - 100` are all `2x`. The "+ C" accounts for all these possible constant terms.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
    </Card>
);

export default function CalculusPage() {
  return (
    <>
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <div className="flex flex-1 flex-col">
        <PageHeader title="Calculus Calculator" />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-2xl space-y-8">
            <section className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Calculus Calculator
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    A free online calculator for solving basic calculus problems, including derivatives, integrals, and limits.
                </p>
            </section>
            <CalculusCalculator />
            <HowToUseGuide />
             <section className="text-center">
                  <h2 className="text-2xl font-bold text-foreground">Related Calculators</h2>
                  <div className="flex flex-wrap justify-center gap-2 mt-4">
                      <Button asChild variant="outline">
                          <Link href="/scientific">Scientific Calculator</Link>
                      </Button>
                      <Button asChild variant="outline">
                          <Link href="/algebra">Algebra Calculator</Link>
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
