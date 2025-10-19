
import { PageHeader } from '@/components/page-header';
import RoundingCalculator from '@/components/calculators/rounding-calculator';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const metadata: Metadata = {
    title: 'Rounding Calculator',
    description: 'A versatile online tool for rounding numbers with various methods, including rounding to the nearest integer, decimal place, or fraction.',
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
                    <strong>Select Rounding Method:</strong> Choose a rounding method from the dropdown (e.g., Round half up, Round down).
                </li>
                <li>
                    <strong>Choose Precision:</strong> Select how you want to round the number from the "Precision" dropdown. You can choose a standard decimal place or enter a custom one.
                </li>
                <li>
                    <strong>View the Result:</strong> The rounded number will appear automatically in the result field.
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
                 <AccordionItem value="fractions">
                    <AccordionTrigger>Rounding to Fractions</AccordionTrigger>
                    <AccordionContent className="space-y-2 text-muted-foreground">
                        <p>This rounds a value to the nearest multiple of a chosen fraction, which is useful in fields like engineering and carpentry.</p>
                        <p className="font-mono text-sm">Example (to nearest 1/8): 15.65 ⇒ 15 5/8 (15.625)</p>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
    </Card>
);

export default function RoundingPage() {
  return (
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
        </div>
      </main>
    </div>
  );
}
