
"use client";

import { PageHeader } from '@/components/page-header';
import ScientificNotationCalculator from '@/components/calculators/scientific-notation-calculator';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const metadata: Metadata = {
    title: 'Scientific Notation Calculator',
    description: 'A free online calculator and converter for scientific, E, and engineering notation. Perform arithmetic and convert numbers with ease.',
};

const HowToUseGuide = () => (
    <Card>
        <CardHeader>
            <CardTitle>How to Use the Calculators</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground">
            <div>
                <h3 className="font-semibold text-foreground text-lg">Scientific Notation Converter</h3>
                <p>This tool converts any number into scientific, E, and engineering notation.</p>
                <ol className="list-decimal list-inside space-y-2 mt-2">
                    <li>
                        <strong>Enter a Number:</strong> Type your number into the input field. You can use standard decimal format (e.g., 12345), E-notation (e.g., 1.2345e4), or scientific notation with "x10^" (e.g., 1.2345x10^4).
                    </li>
                    <li>
                        <strong>View Results:</strong> The calculator will instantly display the number in all supported notations below the input field.
                    </li>
                </ol>
            </div>
            <div>
                <h3 className="font-semibold text-foreground text-lg">Scientific Notation Calculator</h3>
                <p>This tool performs arithmetic operations on two numbers in scientific notation.</p>
                <ol className="list-decimal list-inside space-y-2 mt-2">
                    <li>
                        <strong>Enter Values X and Y:</strong> For each value, provide the significand (the part before "x10^") and the exponent.
                    </li>
                    <li>
                        <strong>Set Precision:</strong> Enter the desired number of decimal places for the result's significand.
                    </li>
                    <li>
                        <strong>Choose an Operation:</strong> Click one of the buttons (e.g., "X + Y", "X × Y", "√X") to perform the calculation. The result will appear in the "Result" field below.
                    </li>
                </ol>
            </div>
        </CardContent>
    </Card>
);

const EducationalContent = () => (
    <Card>
        <CardHeader>
            <CardTitle>Understanding Scientific and Engineering Notations</CardTitle>
        </CardHeader>
        <CardContent>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="what-is">
                    <AccordionTrigger className="text-lg">What is Scientific Notation?</AccordionTrigger>
                    <AccordionContent className="space-y-4 text-muted-foreground">
                        <p>Scientific notation is a standardized way to express numbers that are either very large or very small, making them easier to read and work with. It's the go-to format in science, mathematics, and engineering.</p>
                        <p>A number is written in scientific notation as a product of two parts: a <strong>significand</strong> (a number between 1 and 10) and a <strong>power of 10</strong>.</p>
                        <p className="font-mono bg-muted p-2 rounded-md text-center">b × 10ⁿ</p>
                        <ul className="list-disc list-inside pl-4 text-sm">
                            <li><b>Example (Large Number):</b> The speed of light, approximately 300,000,000 m/s, is written as <code className="font-mono bg-background p-1 rounded-sm">3 × 10⁸</code> m/s.</li>
                            <li><b>Example (Small Number):</b> The mass of an electron, approximately 0.000...911 kg, is written as <code className="font-mono bg-background p-1 rounded-sm">9.11 × 10⁻³¹</code> kg.</li>
                        </ul>
                    </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="calculations">
                    <AccordionTrigger className="text-lg">Calculations with Scientific Notation</AccordionTrigger>
                    <AccordionContent className="space-y-6 text-muted-foreground">
                        <div>
                            <h4 className="font-semibold text-foreground">Addition and Subtraction</h4>
                            <p>To add or subtract, the numbers must first be converted to have the same power of 10. Then, you simply add or subtract the significands.</p>
                            <p className="font-mono bg-muted p-2 rounded-md my-2 text-sm">Example: (1.2 × 10³) + (3.4 × 10²) = (1.2 × 10³) + (0.34 × 10³) = 1.54 × 10³</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-foreground">Multiplication</h4>
                            <p>Multiply the significands and add the exponents of 10.</p>
                             <p className="font-mono bg-muted p-2 rounded-md my-2 text-sm">Example: (2 × 10³) × (3 × 10⁴) = (2 × 3) × 10³⁺⁴ = 6 × 10⁷</p>
                        </div>
                         <div>
                            <h4 className="font-semibold text-foreground">Division</h4>
                            <p>Divide the significands and subtract the exponents of 10.</p>
                             <p className="font-mono bg-muted p-2 rounded-md my-2 text-sm">Example: (6 × 10⁷) ÷ (3 × 10⁴) = (6 ÷ 3) × 10⁷⁻⁴ = 2 × 10³</p>
                        </div>
                    </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="other-notations">
                    <AccordionTrigger className="text-lg">Other Common Notations</AccordionTrigger>
                    <AccordionContent className="space-y-6 text-muted-foreground">
                        <div>
                            <h4 className="font-semibold text-foreground">Engineering Notation</h4>
                            <p>This is a version of scientific notation where the exponent of 10 is always a multiple of 3. This makes it easy to align with SI prefixes like kilo- (10³), mega- (10⁶), giga- (10⁹), milli- (10⁻³), etc.</p>
                            <p className="font-mono bg-muted p-2 rounded-md my-2 text-sm">1.234 × 10⁸ (Scientific) → 123.4 × 10⁶ (Engineering)</p>
                            <p>Here, 10⁶ corresponds to the "mega" prefix, so the value can be read as 123.4 mega-units.</p>
                        </div>
                         <div>
                            <h4 className="font-semibold text-foreground">E-Notation</h4>
                            <p>E-notation is a compact, computer-friendly format where "× 10^" is replaced by the letter "E" or "e". It's widely used in programming and calculators.</p>
                            <p className="font-mono bg-muted p-2 rounded-md my-2 text-sm">4.212 × 10⁻⁴ (Scientific) → 4.212E-4 (E-Notation)</p>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
    </Card>
);


export default function ScientificNotationPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Scientific Notation Calculator" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-2xl space-y-8">
            <section className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Scientific Notation Calculator
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                   Tools for converting numbers to scientific notation and performing arithmetic with them.
                </p>
            </section>
            
            <ScientificNotationCalculator />

            <HowToUseGuide />

            <EducationalContent />
        </div>
      </main>
    </div>
  );
}
