
"use client";

import { PageHeader } from '@/components/page-header';
import CircleCalculator from '@/components/calculators/circle-calculator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const HowToUseGuide = () => (
    <Card>
        <CardHeader>
            <CardTitle>How to Use the Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
            <p className="text-muted-foreground">
                This calculator is designed for ease of use. Simply enter any single known value of a circle, and the other properties will be calculated for you automatically.
            </p>
            <ol className="list-decimal list-inside space-y-2 mt-2 text-muted-foreground">
                <li><b>Enter a value:</b> Type a number into any of the four fields: Radius, Diameter, Circumference, or Area.</li>
                <li><b>View the results:</b> The other three fields will instantly update to show the corresponding values for the circle.</li>
                <li><b>Experiment:</b> Change any value at any time to see how the other properties are affected.</li>
            </ol>
        </CardContent>
    </Card>
);

const EducationalContent = () => (
    <Card>
        <CardHeader>
            <CardTitle>Understanding Circle Calculations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
            <div>
                <h3 className="text-xl font-semibold text-foreground">The Anatomy of a Circle</h3>
                <p className="text-muted-foreground mt-2">
                    A circle is a fundamental geometric shape defined by the set of all points in a plane that are at a fixed distance from a central point. Here are its key components:
                </p>
                <ul className="list-disc list-inside space-y-2 mt-2 text-muted-foreground">
                    <li><b>Center:</b> The point from which all points on the circle are equidistant.</li>
                    <li><b>Radius (r):</b> The distance from the center to any point on the circle.</li>
                    <li><b>Diameter (d):</b> The distance across the circle passing through the center. It is always twice the radius.</li>
                    <li><b>Circumference (C):</b> The total distance around the edge of the circle.</li>
                    <li><b>Arc:</b> A segment of the circumference.</li>
                    <li><b>Chord:</b> A straight line segment whose endpoints both lie on the circle. The diameter is the longest possible chord.</li>
                    <li><b>Sector:</b> A "pie-slice" region enclosed by two radii and an arc.</li>
                </ul>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-foreground">The Constant Pi (π)</h3>
                <p className="text-muted-foreground mt-2">
                    All properties of a circle are linked by the mathematical constant <b>π (pi)</b>. Pi represents the ratio of a circle's circumference to its diameter and is approximately equal to 3.14159. It's an irrational number, meaning its decimal representation never ends and never settles into a repeating pattern.
                </p>
                <p className="text-muted-foreground mt-2">
                    This unique property fascinated ancient mathematicians, who famously attempted to "square the circle"—to construct a square with the same area as a given circle using only a compass and straightedge. It wasn't until 1880 that it was proven to be impossible when Ferdinand von Lindemann demonstrated that π is a transcendental number.
                </p>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-foreground">Core Formulas</h3>
                <p className="text-muted-foreground mt-2">
                    All properties of a circle can be found if you know just one of them. This guide explains the core formulas used by the calculator.
                </p>
                <Table className="mt-2">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Property</TableHead>
                            <TableHead>Formula</TableHead>
                            <TableHead>Description</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>Radius (r)</TableCell>
                            <TableCell className="font-mono">d / 2</TableCell>
                            <TableCell>The distance from the center to any point on the circle's edge.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Diameter (d)</TableCell>
                            <TableCell className="font-mono">2 × r</TableCell>
                            <TableCell>The distance across the circle passing through the center.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Circumference (C)</TableCell>
                            <TableCell className="font-mono">2 × π × r</TableCell>
                            <TableCell>The distance around the outside of the circle.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Area (A)</TableCell>
                            <TableCell className="font-mono">π × r²</TableCell>
                            <TableCell>The space enclosed by the circle.</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
             <div>
                <h3 className="text-xl font-semibold text-foreground">How the Calculator Works</h3>
                <p className="text-muted-foreground mt-2">
                    When you enter a value, the calculator first determines the radius and then uses it to compute the other properties. Here are the "reverse" formulas it uses:
                </p>
                 <ul className="list-disc list-inside space-y-2 mt-2 font-mono bg-muted p-4 rounded-md text-sm">
                    <li><b>From Diameter:</b> r = d / 2</li>
                    <li><b>From Circumference:</b> r = C / (2 × π)</li>
                    <li><b>From Area:</b> r = √(A / π)</li>
                </ul>
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
                    <AccordionTrigger>Why do I only need to enter one value?</AccordionTrigger>
                    <AccordionContent>
                        All properties of a circle (radius, diameter, circumference, and area) are mathematically related through the constant π. Because of this, knowing any single one of these values is enough to calculate all the others.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>What is π (pi)?</AccordionTrigger>
                    <AccordionContent>
                        Pi (π) is a mathematical constant that is the ratio of a circle's circumference to its diameter. It is an irrational number, approximately equal to 3.14159. It is fundamental to all calculations involving circles and spheres.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>What is the difference between radius and diameter?</AccordionTrigger>
                    <AccordionContent>
                        The **radius** is the distance from the center of the circle to any point on its edge. The **diameter** is the distance across the circle passing through the center. The diameter is always exactly twice the length of the radius (d = 2r).
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger>What is the difference between circumference and area?</AccordionTrigger>
                    <AccordionContent>
                        **Circumference** is the one-dimensional distance around the outside of the circle (like a perimeter). **Area** is the two-dimensional space inside the circle.
                    </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="item-5">
                    <AccordionTrigger>Can I enter a negative number?</AccordionTrigger>
                    <AccordionContent>
                        No. The dimensions of a physical circle (radius, diameter, area, circumference) cannot be negative. The calculator will show an error if you enter a negative value.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
    </Card>
);

export default function CirclePage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Circle Calculator" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-2xl space-y-8">
            <section className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Circle Calculator
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Please provide any value below to calculate the remaining values of a circle.
                </p>
            </section>
            
            <CircleCalculator />
            <HowToUseGuide />
            <EducationalContent />
            <FaqSection />
        </div>
      </main>
    </div>
  );
}
