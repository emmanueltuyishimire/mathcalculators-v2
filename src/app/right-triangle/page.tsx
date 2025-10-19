
import { PageHeader } from '@/components/page-header';
import RightTriangleCalculator from '@/components/calculators/right-triangle-calculator';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { RightTriangleDiagram } from '@/components/right-triangle-diagram';

export const metadata: Metadata = {
    title: 'Right Triangle Calculator',
    description: 'A free online calculator to solve for any two values of a right-angled triangle, including sides, angles, area, and perimeter.',
};

const EducationalContent = () => (
    <Card>
        <CardHeader>
            <CardTitle>How to Solve a Right Triangle</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground">
            <p>Solving a right triangle means finding all unknown sides and angles. You can do this if you know at least two values, where at least one is a side. This calculator uses the following principles:</p>
            
            <div>
                <h4 className="font-semibold text-foreground text-xl">1. Pythagorean Theorem</h4>
                <p>If you know two sides, you can find the third.</p>
                <p className="font-mono bg-muted p-2 rounded-md my-2 text-sm">a² + b² = c²</p>
            </div>

            <div>
                <h4 className="font-semibold text-foreground text-xl">2. Trigonometric Functions (SOH-CAH-TOA)</h4>
                <p>If you know one side and one angle, you can find the other sides.</p>
                <ul className="list-disc list-inside pl-4 mt-2 font-mono text-sm bg-muted p-2 rounded-md">
                   <li>sin(α) = a / c</li>
                   <li>cos(α) = b / c</li>
                   <li>tan(α) = a / b</li>
                </ul>
            </div>
            
            <div>
                <h4 className="font-semibold text-foreground text-xl">3. Sum of Angles</h4>
                <p>The angles in a triangle always add up to 180°. Since one angle is 90°, the other two acute angles must add up to 90°.</p>
                <p className="font-mono bg-muted p-2 rounded-md my-2 text-sm">α + β = 90°</p>
            </div>
        </CardContent>
    </Card>
);

export default function RightTrianglePage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Right Triangle Calculator" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-3xl space-y-8">
            <section className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Right Triangle Calculator
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Please provide any 2 values below to calculate the other values of a right triangle. If radians are selected as the angle unit, it can take values such as pi/3, pi/4, etc.
                </p>
            </section>
            
            <RightTriangleCalculator />

            <RightTriangleDiagram />

            <EducationalContent />

            <section className="text-center">
                <h2 className="text-2xl font-bold text-foreground">Related Calculators</h2>
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                    <Button asChild variant="outline">
                        <Link href="/pythagorean">Pythagorean Theorem Calculator</Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link href="/trigonometry">Trigonometry Calculator</Link>
                    </Button>
                </div>
            </section>
        </div>
      </main>
    </div>
  );
}
