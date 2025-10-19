
import { PageHeader } from '@/components/page-header';
import ScientificNotationCalculator from '@/components/calculators/scientific-notation-calculator';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const metadata: Metadata = {
    title: 'Scientific Notation Calculator',
    description: 'A free online calculator and converter for scientific, E, and engineering notation. Perform arithmetic and convert numbers with ease.',
};

const EducationalContent = () => (
    <Card>
        <CardHeader>
            <CardTitle>Understanding Scientific Notation</CardTitle>
        </CardHeader>
        <CardContent>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="what-is">
                    <AccordionTrigger className="text-lg">What is Scientific Notation?</AccordionTrigger>
                    <AccordionContent className="space-y-4 text-muted-foreground">
                        <p>Scientific notation is a way to express numbers that are too large or too small to be conveniently written in decimal form. It simplifies arithmetic and is widely used in mathematics, engineering, and science.</p>
                        <p>A number in scientific notation is written as the product of a significand (a number greater than or equal to 1 and less than 10) and a power of 10.</p>
                        <p className="font-mono bg-muted p-2 rounded-md text-center">b × 10ⁿ</p>
                    </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="calculations">
                    <AccordionTrigger className="text-lg">Calculations with Scientific Notation</AccordionTrigger>
                    <AccordionContent className="space-y-6 text-muted-foreground">
                        <div>
                            <h4 className="font-semibold text-foreground">Addition and Subtraction</h4>
                            <p>To add or subtract, the numbers must have the same power of 10. Adjust the significand and exponent as needed, then add or subtract the significands.</p>
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
                    <AccordionTrigger className="text-lg">Other Notations</AccordionTrigger>
                    <AccordionContent className="space-y-6 text-muted-foreground">
                        <div>
                            <h4 className="font-semibold text-foreground">Engineering Notation</h4>
                            <p>Similar to scientific notation, but the exponent is always a multiple of 3. This aligns with SI prefixes (kilo, mega, giga, etc.).</p>
                            <p className="font-mono bg-muted p-2 rounded-md my-2 text-sm">1.234 × 10⁸ (Scientific) → 123.4 × 10⁶ (Engineering)</p>
                        </div>
                         <div>
                            <h4 className="font-semibold text-foreground">E-Notation</h4>
                            <p>A compact way to write scientific notation, where "× 10" is replaced by "E" or "e".</p>
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

            <EducationalContent />
        </div>
      </main>
    </div>
  );
}
