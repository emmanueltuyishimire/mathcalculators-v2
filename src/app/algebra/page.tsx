
import { PageHeader } from '@/components/page-header';
import AlgebraCalculator from '@/components/calculators/algebra-calculator';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const metadata: Metadata = {
  title: 'Algebra Calculator',
  description: 'Solve linear equations with our easy-to-use algebra calculator. Enter your equation and get the solution for x instantly.',
};

const HowToUseGuide = () => (
    <Card>
        <CardHeader>
            <CardTitle>How to Use the Algebra Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
            <ol className="list-decimal list-inside space-y-2">
                <li>
                    <strong>Enter the Equation:</strong> Type a simple linear equation into the input field (e.g., <code className="font-mono bg-muted p-1 rounded-md">3x - 5 = 16</code>).
                </li>
                <li>
                    <strong>Solve for x:</strong> Click the "Solve for x" button to compute the solution.
                </li>
                <li>
                    <strong>View the Result:</strong> The calculator will display the value of 'x' in the result section below.
                </li>
            </ol>
            <div className="p-4 bg-accent/50 rounded-lg">
                <h4 className="font-semibold text-accent-foreground">💡 Tip</h4>
                <p className="text-sm text-muted-foreground mt-2">This calculator is designed for basic linear equations. For more complex problems, ensure your equation is in a simple format.</p>
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
                    <AccordionTrigger>What is a linear equation?</AccordionTrigger>
                    <AccordionContent>
                        A linear equation is an equation in which the highest power of the variable is always 1. It is the equation of a straight line. For example, `2x + 3 = 7` is a linear equation.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Can this calculator solve quadratic equations?</AccordionTrigger>
                    <AccordionContent>
                        No, this calculator is specifically designed for linear equations (like `ax + b = c`). It cannot solve quadratic equations (like `ax² + bx + c = 0`) or other higher-order polynomials.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>How do I enter fractions in the equation?</AccordionTrigger>
                    <AccordionContent>
                        Currently, the calculator has limited support for fractions. For best results, use decimal equivalents. For example, instead of `1/2`, use `0.5`.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger>What does it mean to "solve for x"?</AccordionTrigger>
                    <AccordionContent>
                        "Solving for x" means finding the value of the variable 'x' that makes the equation true. The goal is to isolate 'x' on one side of the equation.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                    <AccordionTrigger>Can I use variables other than 'x'?</AccordionTrigger>
                    <AccordionContent>
                        This calculator is optimized to solve for the variable 'x'. Using other variables might not produce a correct result.
                    </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="item-6">
                    <AccordionTrigger>Does the calculator support equations with variables on both sides?</AccordionTrigger>
                    <AccordionContent>
                        The current version is best for simple linear equations in the format `ax + b = c`. Support for more complex structures like `ax + b = cx + d` is limited.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
    </Card>
);

export default function AlgebraPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Algebra" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-2xl space-y-8">
          <AlgebraCalculator />
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
            <FaqSection />
        </div>
      </main>
    </div>
  );
}
