
import { PageHeader } from '@/components/page-header';
import CircleCalculator from '@/components/calculators/circle-calculator';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const metadata: Metadata = {
    title: 'Circle Calculator',
    description: 'A free online calculator to find the radius, diameter, circumference, and area of a circle from any single known value.',
};

const EducationalContent = () => (
    <Card>
        <CardHeader>
            <CardTitle>Understanding Circle Calculations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
            <div>
                <h3 className="text-xl font-semibold text-foreground">How to Use the Calculator</h3>
                <p className="text-muted-foreground mt-2">
                    This calculator is designed for ease of use. Simply enter any single known value of a circle, and the other properties will be calculated for you automatically.
                </p>
                <ol className="list-decimal list-inside space-y-2 mt-2 text-muted-foreground">
                    <li><b>Enter a value:</b> Type a number into any of the four fields: Radius, Diameter, Circumference, or Area.</li>
                    <li><b>View the results:</b> The other three fields will instantly update to show the corresponding values for the circle.</li>
                    <li><b>Experiment:</b> Change any value at any time to see how the other properties are affected.</li>
                </ol>
            </div>
            <div>
                <h3 className="text-xl font-semibold text-foreground">Core Formulas</h3>
                <p className="text-muted-foreground mt-2">
                    All properties of a circle are interrelated through the mathematical constant π (pi). This means if you know any one property, you can find all the others. This guide explains the core formulas used by the calculator.
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

            <EducationalContent />
        </div>
      </main>
    </div>
  );
}
