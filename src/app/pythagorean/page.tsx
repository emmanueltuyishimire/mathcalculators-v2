
import { PageHeader } from '@/components/page-header';
import PythagoreanCalculator from '@/components/calculators/pythagorean-calculator';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Pythagorean Theorem Calculator',
    description: 'A free online calculator to solve for any side of a right-angled triangle using the Pythagorean theorem (a² + b² = c²).',
};

const EducationalContent = () => (
    <Card>
        <CardHeader>
            <CardTitle>Understanding the Pythagorean Theorem</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
            <p>The Pythagorean theorem is a fundamental principle in geometry that states the sum of the squares of the two shorter sides (legs) of a right-angled triangle is equal to the square of the longest side (the hypotenuse).</p>
            <p className="font-mono bg-muted p-4 rounded-md text-center text-lg">a² + b² = c²</p>
            <div>
                <h4 className="font-semibold text-foreground">How It Works</h4>
                <ul className="list-disc list-inside space-y-1 mt-2">
                    <li><b>Side 'a':</b> One of the two shorter sides (legs) of the triangle.</li>
                    <li><b>Side 'b':</b> The other shorter side (leg).</li>
                    <li><b>Side 'c' (Hypotenuse):</b> The longest side, which is always opposite the right angle.</li>
                </ul>
            </div>
            <div>
                <h4 className="font-semibold text-foreground">How This Calculator Solves for a Missing Side</h4>
                <ul className="list-disc list-inside space-y-1 mt-2">
                    <li><b>To find 'c':</b> c = √(a² + b²)</li>
                    <li><b>To find 'a':</b> a = √(c² - b²)</li>
                    <li><b>To find 'b':</b> b = √(c² - a²)</li>
                </ul>
            </div>
            <div>
                <h4 className="font-semibold text-foreground">Important Note</h4>
                <p>The theorem only applies to right-angled triangles. When solving for a leg ('a' or 'b'), the hypotenuse ('c') must always be longer than the other known side.</p>
            </div>
        </CardContent>
    </Card>
);

export default function PythagoreanPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Pythagorean Theorem Calculator" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-2xl space-y-8">
            <section className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Pythagorean Theorem Calculator
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Please provide any two values below to solve the Pythagorean equation: a² + b² = c².
                </p>
            </section>
            
            <PythagoreanCalculator />

            <EducationalContent />

            <section className="text-center">
                <h2 className="text-2xl font-bold text-foreground">Related Calculators</h2>
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                    <Button asChild variant="outline">
                        <Link href="/geometry">Geometry Calculators</Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link href="/geometry/triangle">Triangle Calculator</Link>
                    </Button>
                </div>
            </section>
        </div>
      </main>
    </div>
  );
}
