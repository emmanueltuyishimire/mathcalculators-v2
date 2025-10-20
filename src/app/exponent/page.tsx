
"use client";

import { PageHeader } from '@/components/page-header';
import ExponentCalculator from '@/components/calculators/exponent-calculator';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const metadata: Metadata = {
    title: 'Exponent Calculator',
    description: 'Solve for the base, exponent, or result in an exponential equation. Learn about exponent laws and rules with examples.',
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Exponent Calculator",
  "operatingSystem": "All",
  "applicationCategory": "EducationalApplication",
  "description": "A free online calculator to solve for any variable in an exponential equation (aⁿ = y) and learn about exponent laws.",
  "url": "https://maths.calculation.site/exponent",
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
            <CardTitle>How to Use the Exponent Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
            <p>This calculator solves exponential equations in the form <strong>aⁿ = y</strong>.</p>
            <ol className="list-decimal list-inside space-y-2">
                <li>
                    <strong>Enter Two Values:</strong> Fill in any two of the three input fields: Base (a), Exponent (n), or Result (y). Leave the field you want to solve for empty.
                </li>
                 <li>
                    <strong>Use 'e' as Base (Optional):</strong> If you want to use Euler's number (e ≈ 2.718) as the base, toggle the "Use e as base" switch. This will automatically fill and disable the base input.
                </li>
                <li>
                    <strong>Calculate:</strong> Click the "Calculate" button to find the missing value.
                </li>
                <li>
                    <strong>Clear:</strong> Click the "Clear" button to reset all input fields.
                </li>
                 <li>
                    <strong>View Steps:</strong> If a step-by-step solution is available, an accordion will appear. Click "Show Calculation Steps" to see how the result was derived.
                </li>
            </ol>
        </CardContent>
    </Card>
);


const EducationalContent = () => (
    <Card>
        <CardHeader>
            <CardTitle>Understanding Exponents</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground">
            <div>
                <h3 className="text-xl font-semibold text-foreground">What is an Exponent?</h3>
                <p className="mt-2">Exponentiation is a mathematical operation, written as <b>aⁿ</b>, involving a <b>base (a)</b> and an <b>exponent (n)</b>. When n is a positive integer, exponentiation corresponds to repeated multiplication of the base, n times.</p>
                <p className="font-mono bg-muted p-2 rounded-md my-2 text-center">aⁿ = a × a × ... × a (n times)</p>
                <p>The calculator above accepts negative bases but does not compute imaginary numbers. While it doesn't accept fractions as direct input, you can use their decimal equivalents.</p>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-foreground">Basic Exponent Laws and Rules</h3>
                <div className="space-y-4">
                    <p><b>Multiplying with the same base:</b> Add the exponents. <br/><code className="font-mono text-sm">aⁿ × aᵐ = aⁿ⁺ᵐ</code></p>
                    <p><b>Negative exponents:</b> Reciprocate the base. <br/><code className="font-mono text-sm">a⁻ⁿ = 1 / aⁿ</code></p>
                    <p><b>Dividing with the same base:</b> Subtract the exponents. <br/><code className="font-mono text-sm">aᵐ / aⁿ = aᵐ⁻ⁿ</code></p>
                    <p><b>Raising an exponent to another exponent:</b> Multiply the exponents. <br/><code className="font-mono text-sm">(aᵐ)ⁿ = aᵐⁿ</code></p>
                    <p><b>Distributing exponents over multiplication:</b> <br/><code className="font-mono text-sm">(a × b)ⁿ = aⁿ × bⁿ</code></p>
                    <p><b>Distributing exponents over division:</b> <br/><code className="font-mono text-sm">(a / b)ⁿ = aⁿ / bⁿ</code></p>
                    <p><b>Exponent of 1:</b> The base remains unchanged. <br/><code className="font-mono text-sm">a¹ = a</code></p>
                    <p><b>Exponent of 0:</b> The result is always 1 (for a ≠ 0). <br/><code className="font-mono text-sm">a⁰ = 1</code></p>
                    <p><b>Fractional exponents (nth root):</b> <br/><code className="font-mono text-sm">a¹/ⁿ = ⁿ√a</code></p>
                </div>
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
                    <AccordionTrigger>How does the calculator solve for the missing value?</AccordionTrigger>
                    <AccordionContent>
                        The calculator uses inverse operations. To find the base, it takes the nth root of the result (`a = y^(1/n)`). To find the exponent, it uses logarithms (`n = logₐ(y)`). To find the result, it simply performs the exponentiation (`y = a^n`).
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>What is 'e' and why would I use it as a base?</AccordionTrigger>
                    <AccordionContent>
                        'e' is Euler's number, an important mathematical constant approximately equal to 2.71828. It is the base of the natural logarithm and appears in many areas of mathematics and science, particularly in formulas related to continuous growth or decay (like compound interest or radioactive decay).
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>Can I use negative numbers or fractions?</AccordionTrigger>
                    <AccordionContent>
                        - **Negative Bases:** Yes, you can use a negative base.<br/>
                        - **Negative Exponents:** Yes, a negative exponent means taking the reciprocal (e.g., `2⁻³ = 1/2³ = 1/8`).<br/>
                        - **Fractions:** You can use decimal equivalents for fractions (e.g., use `0.5` for `1/2`). Fractional exponents are equivalent to roots (e.g., `9^0.5` is the square root of 9).
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger>What happens if I try to calculate the even root of a negative number?</AccordionTrigger>
                    <AccordionContent>
                        The calculator will show an error. For example, trying to solve for 'a' in `a² = -4` requires finding the square root of a negative number, which results in an imaginary number. This calculator is designed for real numbers only.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                    <AccordionTrigger>Why do I get an error when solving for the exponent with a negative base or result?</AccordionTrigger>
                    <AccordionContent>
                        Solving for the exponent involves logarithms. The logarithm function is typically defined only for positive bases and positive results in the realm of real numbers.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
    </Card>
);

export default function ExponentPage() {
  return (
    <>
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <div className="flex flex-1 flex-col">
        <PageHeader title="Exponent Calculator" />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-2xl space-y-8">
              <section className="text-center">
                  <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                      Exponent Calculator
                  </h1>
                  <p className="mt-4 text-lg text-muted-foreground">
                      Enter any two values to solve for the third.
                  </p>
              </section>
              
              <ExponentCalculator />

              <HowToUseGuide />

              <section className="text-center">
                  <h2 className="text-2xl font-bold text-foreground">Related Calculators</h2>
                  <div className="flex flex-wrap justify-center gap-2 mt-4">
                      <Button asChild variant="outline">
                          <Link href="/scientific">Scientific Calculator</Link>
                      </Button>
                      <Button asChild variant="outline">
                          <Link href="/basic">Basic Calculators</Link>
                      </Button>
                  </div>
              </section>

              <EducationalContent />
              
              <FaqSection />
          </div>
        </main>
      </div>
    </>
  );
}
