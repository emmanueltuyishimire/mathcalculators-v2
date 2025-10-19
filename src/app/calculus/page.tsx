
import { PageHeader } from '@/components/page-header';
import CalculusCalculator from '@/components/calculators/calculus-calculator';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Calculus Calculator',
  description: 'Solve calculus problems including derivatives, integrals, and limits with our powerful online calculator. Supports a wide range of functions.',
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


export default function CalculusPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Calculus" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-2xl space-y-8">
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
        </div>
      </main>
    </div>
  );
}
