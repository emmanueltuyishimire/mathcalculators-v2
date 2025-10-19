
import { PageHeader } from '@/components/page-header';
import QuadraticCalculator from '@/components/calculators/quadratic-calculator';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Quadratic Formula Calculator',
    description: 'Solve any quadratic equation of the form ax² + bx + c = 0. Get the roots (real or complex) and see the step-by-step solution.',
};

const EducationalContent = () => (
    <Card>
        <CardHeader>
            <CardTitle>Understanding the Quadratic Formula</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground">
            <div>
                <h3 className="text-xl font-semibold text-foreground">What is a Quadratic Equation?</h3>
                <p className="mt-2">A quadratic equation is a second-degree polynomial equation in a single variable x, with the general form:</p>
                <p className="font-mono bg-muted p-4 rounded-md text-center text-lg my-2">ax² + bx + c = 0</p>
                <p>Here, 'a', 'b', and 'c' are coefficients, where 'a' cannot be zero. The solutions to this equation are called its roots.</p>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-foreground">The Quadratic Formula</h3>
                <p className="mt-2">The quadratic formula is a direct method for finding the roots of any quadratic equation:</p>
                <p className="font-mono bg-muted p-4 rounded-md text-center text-lg my-2">x = (-b ± √(b² - 4ac)) / 2a</p>
                <p>The term inside the square root, <b>b² - 4ac</b>, is called the <b>discriminant (Δ)</b>. The value of the discriminant determines the nature of the roots:</p>
                <ul className="list-disc list-inside pl-4 mt-2 space-y-1">
                    <li>If <b>Δ > 0</b>, there are two distinct real roots.</li>
                    <li>If <b>Δ = 0</b>, there is exactly one real root (a repeated root).</li>
                    <li>If <b>Δ < 0</b>, there are two complex conjugate roots (involving imaginary numbers).</li>
                </ul>
            </div>
            
            <div>
                 <h3 className="text-xl font-semibold text-foreground">How to Use the Calculator</h3>
                <ol className="list-decimal list-inside mt-2 space-y-2">
                    <li><b>Enter Coefficients:</b> Input the values for a, b, and c into their respective fields.</li>
                    <li><b>Calculate:</b> Click the "Calculate" button to see the roots.</li>
                    <li><b>View Steps:</b> The calculator will display the roots and a step-by-step breakdown of how they were found using the quadratic formula.</li>
                </ol>
            </div>
        </CardContent>
    </Card>
);

export default function QuadraticPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Quadratic Formula Calculator" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-2xl space-y-8">
            <section className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Quadratic Formula Calculator
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Solves the quadratic equation ax² + bx + c = 0.
                </p>
            </section>
            
            <QuadraticCalculator />

            <EducationalContent />

            <section className="text-center">
                <h2 className="text-2xl font-bold text-foreground">Related Calculators</h2>
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                    <Button asChild variant="outline">
                        <Link href="/algebra">Algebra Calculator</Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link href="/pythagorean">Pythagorean Calculator</Link>
                    </Button>
                </div>
            </section>
        </div>
      </main>
    </div>
  );
}
