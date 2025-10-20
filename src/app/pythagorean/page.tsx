
"use client";

import { PageHeader } from '@/components/page-header';
import PythagoreanCalculator from '@/components/calculators/pythagorean-calculator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PythagoreanDiagram } from '@/components/pythagorean-diagram';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const HowToUseGuide = () => (
    <Card>
        <CardHeader>
            <CardTitle>How to Use the Pythagorean Theorem Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
            <p>This calculator solves for the missing side of a right-angled triangle, and also provides other properties like angles, area, and perimeter.</p>
            <ol className="list-decimal list-inside space-y-2">
                <li>
                    <strong>Enter Two Sides:</strong> Input the lengths of any two sides of the right triangle (a, b, or c). Leave the field for the unknown side empty.
                </li>
                <li>
                    <strong>Calculate:</strong> Click the "Calculate" button.
                </li>
                <li>
                    <strong>View Results:</strong> The calculator will fill in the missing side length and display all other calculated properties of the triangle below. You can also view the step-by-step calculation for the missing side.
                </li>
            </ol>
        </CardContent>
    </Card>
);

const EducationalContent = () => (
    <Card>
        <CardHeader>
            <CardTitle>Understanding the Pythagorean Theorem</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground">
            <div>
                <p>The Pythagorean Theorem, also known as Pythagoras' theorem, is a fundamental relation between the three sides of a right triangle. Given a right triangle, which is a triangle in which one of the angles is 90°, the Pythagorean theorem states that the area of the square formed by the longest side of the right triangle (the hypotenuse) is equal to the sum of the area of the squares formed by the other two sides of the right triangle.</p>
                <p className="font-mono bg-muted p-4 rounded-md text-center text-lg my-2">a² + b² = c²</p>
                <p>This is known as the Pythagorean equation, named after the ancient Greek thinker Pythagoras. This relationship is useful because if two sides of a right triangle are known, the Pythagorean theorem can be used to determine the length of the third side. For example, if a = 3 and b = 4, the length of c can be determined as:</p>
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

const FaqSection = () => (
    <Card>
        <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>What is a right-angled triangle?</AccordionTrigger>
                    <AccordionContent>
                        A right-angled triangle (or right triangle) is a triangle in which one of the three angles is exactly 90 degrees.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>What is the hypotenuse?</AccordionTrigger>
                    <AccordionContent>
                        The hypotenuse is the longest side of a right-angled triangle. It is always the side opposite the 90-degree angle. In the equation a² + b² = c², 'c' represents the hypotenuse.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>Can I use this theorem for any triangle?</AccordionTrigger>
                    <AccordionContent>
                        No, the Pythagorean theorem only works for right-angled triangles. For other types of triangles, you would need to use other rules, such as the Law of Sines or the Law of Cosines.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger>Does it matter which side I label 'a' and 'b'?</AccordionTrigger>
                    <AccordionContent>
                        No, the two shorter sides (the legs) are interchangeable. You can label either one 'a' and the other 'b'. The only side that must be correctly identified is the hypotenuse 'c'.
                    </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="item-5">
                    <AccordionTrigger>How are the angles calculated?</AccordionTrigger>
                    <AccordionContent>
                        Once all three sides are known, the angles are calculated using inverse trigonometric functions. For example, angle α can be found using `arcsin(a/c)`, `arccos(b/c)`, or `arctan(a/b)`. Angle β is then `90° - α`.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
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
                    A free online calculator to solve the Pythagorean equation a² + b² = c². Please provide any two values to solve for the third side of a right triangle.
                </p>
            </section>
            
            <PythagoreanCalculator />

            <PythagoreanDiagram />

            <HowToUseGuide />

            <EducationalContent />
            
            <FaqSection />

            <section className="text-center">
                <h2 className="text-2xl font-bold text-foreground">Related Calculators</h2>
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                    <Button asChild variant="outline">
                        <Link href="/right-triangle">Right Triangle Calculator</Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link href="/distance">Distance Calculator</Link>
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
