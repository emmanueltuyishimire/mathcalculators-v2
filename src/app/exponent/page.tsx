
import { PageHeader } from '@/components/page-header';
import ExponentCalculator from '@/components/calculators/exponent-calculator';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Exponent Calculator',
    description: 'Solve for the base, exponent, or result in an exponential equation. Learn about exponent laws and rules with examples.',
};

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

export default function ExponentPage() {
  return (
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

            <EducationalContent />

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
        </div>
      </main>
    </div>
  );
}
