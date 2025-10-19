
import { PageHeader } from '@/components/page-header';
import PythagoreanCalculator from '@/components/calculators/pythagorean-calculator';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Pythagorean Theorem Calculator',
    description: 'A free online calculator to solve for any side of a right-angled triangle using the Pythagorean theorem (a² + b² = c²), and compute angles, area, and perimeter.',
};

const EducationalContent = () => (
    <Card>
        <CardHeader>
            <CardTitle>Understanding the Pythagorean Theorem</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground">
            <div>
                <p>The Pythagorean Theorem, also known as Pythagoras' theorem, is a fundamental relation between the three sides of a right triangle. Given a right triangle, which is a triangle in which one of the angles is 90°, the Pythagorean theorem states that the area of the square formed by the longest side of the right triangle (the hypotenuse) is equal to the sum of the area of the squares formed by the other two sides of the right triangle.</p>
                <div className="flex justify-center my-4">
                    <Image src="https://upload.wikimedia.org/wikipedia/commons/d/d2/Pythagorean_theorem_-_visualisation.svg" alt="Visualisation of Pythagorean theorem" width={200} height={200} />
                </div>
                <p>In other words, given that the longest side <b>c</b> = the hypotenuse, and <b>a</b> and <b>b</b> = the other sides of the triangle:</p>
                <p className="font-mono bg-muted p-4 rounded-md text-center text-lg my-2">a² + b² = c²</p>
                <p>This is known as the Pythagorean equation, named after the ancient Greek thinker Pythagoras. This relationship is useful because if two sides of a right triangle are known, the Pythagorean theorem can be used to determine the length of the third side. Referencing the above diagram, if a = 3 and b = 4, the length of c can be determined as:</p>
                <p className="font-mono bg-muted p-2 rounded-md my-2">c = √(a² + b²) = √(3² + 4²) = √25 = 5</p>
                <p>It follows that the length of a and b can also be determined if the lengths of the other two sides are known using the following relationships:</p>
                <p className="font-mono bg-muted p-2 rounded-md my-2">a = √(c² - b²) <br /> b = √(c² - a²)</p>
            </div>

            <div>
                <h4 className="font-semibold text-foreground text-xl">Connection to the Law of Cosines</h4>
                <p>The law of cosines is a generalization of the Pythagorean theorem that can be used to determine the length of any side of a triangle if the lengths and angles of the other two sides of the triangle are known. If the angle between the other sides is a right angle, the law of cosines reduces to the Pythagorean equation.</p>
            </div>
            
            <div>
                <h4 className="font-semibold text-foreground text-xl">Algebraic Proofs</h4>
                <p>There are a multitude of proofs for the Pythagorean theorem, possibly even the greatest number of any mathematical theorem. Below are two of the simplest versions.</p>
                <div className="flex justify-center my-4">
                     <Image src="https://www.math-only-math.com/images/algebraic-proof-of-the-pythagorean-theorem.png" alt="Algebraic proofs of the Pythagorean theorem" width={500} height={250} className="bg-white p-2 rounded" />
                </div>
                <div className="space-y-4">
                    <div>
                        <h5 className="font-semibold text-foreground">Proof 1</h5>
                        <p>In the first figure, four copies of the same triangle are arranged around a square with sides c. This results in a larger square with sides of length (a + b) and area (a + b)². The sum of the area of these four triangles and the smaller square must equal the area of the larger square: (b + a)² = c² + 4(ab/2), which simplifies to c² = a² + b².</p>
                    </div>
                    <div>
                        <h5 className="font-semibold text-foreground">Proof 2</h5>
                        <p>In the second figure, the four triangles are arranged to form an enclosed square with sides of length (b - a) and a larger square with sides of length c. The area of the large square (c²) must equal the sum of the areas of the four triangles and the small square: c² = (b - a)² + 4(ab/2), which also simplifies to c² = a² + b².</p>
                    </div>
                </div>
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
                        <Link href="/slope">Slope Calculator</Link>
                    </Button>
                </div>
            </section>
        </div>
      </main>
    </div>
  );
}
