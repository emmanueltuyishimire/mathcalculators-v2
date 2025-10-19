
import { PageHeader } from '@/components/page-header';
import AreaCalculator from '@/components/calculators/area-calculator';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const metadata: Metadata = {
    title: 'Area Calculator',
    description: 'A free online area calculator for finding the area of common 2D shapes, including rectangles, triangles, circles, and more.',
};

const EducationalContent = () => (
    <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
            <AccordionTrigger className="text-xl font-semibold">Understanding Area</AccordionTrigger>
            <AccordionContent className="space-y-4 text-muted-foreground">
                <p>Area is the measure of a two-dimensional space enclosed by a shape. It quantifies how much surface a figure covers. The standard international (SI) unit for area is the square meter (m²). More complex shapes can often be broken down into simpler forms, and their total area can be found by summing the areas of each part.</p>
            </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
            <AccordionTrigger className="text-xl font-semibold">About the Shapes</AccordionTrigger>
            <AccordionContent className="space-y-6">
                <div>
                    <h4 className="font-semibold text-foreground">Rectangle</h4>
                    <p>A rectangle is a four-sided shape with four right angles. Its area is calculated by multiplying its length by its width.</p>
                </div>
                <div>
                    <h4 className="font-semibold text-foreground">Triangle</h4>
                    <p>A triangle's area can be calculated using Heron's formula if all three sides are known. This is particularly useful when the height is not given.</p>
                </div>
                <div>
                    <h4 className="font-semibold text-foreground">Trapezoid</h4>
                    <p>A trapezoid is a quadrilateral with at least one pair of parallel sides. Its area is the average of the two bases multiplied by the height.</p>
                </div>
                 <div>
                    <h4 className="font-semibold text-foreground">Circle</h4>
                    <p>A circle's area is determined by its radius. It is the product of pi (π) and the square of the radius.</p>
                </div>
                 <div>
                    <h4 className="font-semibold text-foreground">Sector</h4>
                    <p>A sector is a "pie-slice" part of a circle. Its area is a fraction of the circle's total area, determined by the angle of the sector.</p>
                </div>
                <div>
                    <h4 className="font-semibold text-foreground">Ellipse</h4>
                    <p>An ellipse is a stretched circle. Its area is found by multiplying pi (π) by the product of its semi-major and semi-minor axes.</p>
                </div>
                <div>
                    <h4 className="font-semibold text-foreground">Parallelogram</h4>
                    <p>A parallelogram is a quadrilateral with two pairs of parallel sides. Its area is calculated by multiplying its base by its perpendicular height.</p>
                </div>
            </AccordionContent>
        </AccordionItem>
    </Accordion>
);


export default function AreaPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Area Calculator" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-4xl space-y-12">
            <section className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                    Area Calculator
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    The following are calculators to evaluate the area of seven common shapes. The area of more complex shapes can usually be obtained by breaking them down into their aggregating simple shapes, and totaling their areas. This calculator is especially useful for estimating land area.
                </p>
            </section>
            
            <AreaCalculator />
            
            <EducationalContent />

             <section className="text-center">
                <h2 className="text-2xl font-bold text-foreground">Related Calculators</h2>
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                    <Button asChild variant="outline">
                        <Link href="/geometry">Geometry Calculators</Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link href="/geometry/volume">Volume Calculator</Link>
                    </Button>
                </div>
            </section>
        </div>
      </main>
    </div>
  );
}
