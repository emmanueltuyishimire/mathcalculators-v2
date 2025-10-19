
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

const HowToUseGuide = () => (
    <Card>
        <CardHeader>
            <CardTitle>How to Use the Area Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
             <ol className="list-decimal list-inside space-y-2">
                <li>
                    <strong>Select a Shape:</strong> Find the calculator for the shape you want to measure (e.g., Rectangle, Circle).
                </li>
                <li>
                    <strong>Choose a Unit:</strong> Select your unit of measurement (e.g., meters, feet) from the dropdown. All inputs should be in this unit.
                </li>
                <li>
                    <strong>Enter Dimensions:</strong> Fill in the required fields for your shape, such as length, width, or radius.
                </li>
                 <li>
                    <strong>Calculate:</strong> Click the "Calculate" button to see the area. The result will be displayed in the corresponding square units (e.g., m², ft²).
                </li>
            </ol>
        </CardContent>
    </Card>
);

const EducationalContent = () => (
    <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
            <AccordionTrigger className="text-xl font-semibold">Understanding Area</AccordionTrigger>
            <AccordionContent className="space-y-4 text-muted-foreground">
                <p>Area is the quantity that expresses the size of a two-dimensional shape on a plane. Think of it as the amount of paint needed to cover a surface. It is the 2D equivalent of a curve's one-dimensional length or a solid's three-dimensional volume. The standard unit of area in the International System of Units (SI) is the square meter (m²).</p>
            </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
            <AccordionTrigger className="text-xl font-semibold">About the Shapes</AccordionTrigger>
            <AccordionContent className="space-y-8">
                <div>
                    <h4 className="font-semibold text-foreground">Rectangle</h4>
                    <p>A rectangle is a simple quadrilateral with four right angles. To calculate its area, you only need to know its length and width. When a rectangle's length and width are equal, it is called a square.</p>
                    <p className="font-mono bg-muted p-2 rounded-md my-2 text-center">Area = Length × Width</p>
                    <div className="p-4 border-l-4 border-primary/50 bg-muted/50 rounded-r-lg">
                        <h5 className="font-semibold">The Farmer and his Unsold Land</h5>
                        <p className="text-sm mt-2">A farmer is trying to sell a perfectly rectangular piece of land. He fenced it, so he knows its exact dimensions: a length of 220 feet and a width of 99 feet. In his area, investors with smaller feet felt they should get more square feet for their money, so his land remains unsold. Here is the calculation of his land's area:</p>
                        <p className="font-mono text-sm mt-2">Area = 220 ft × 99 ft = 21,780 sq ft</p>
                    </div>
                </div>
                <div>
                    <h4 className="font-semibold text-foreground">Triangle</h4>
                    <p>The area of a triangle can be calculated with various formulas depending on the known information. The calculator above uses Heron's formula, which is useful when all three side lengths are known. The formula is attributed to Hero of Alexandria, a Greek mathematician and engineer.</p>
                     <p className="font-mono bg-muted p-2 rounded-md my-2 text-center">Area = √s(s - a)(s - b)(s - c), where s = (a+b+c)/2</p>
                    <div className="p-4 border-l-4 border-primary/50 bg-muted/50 rounded-r-lg">
                        <h5 className="font-semibold">The Farmer's Daughter - Triangle Daze</h5>
                        <p className="text-sm mt-2">After selling his land, the farmer decides to build a pool. His 7-year-old daughter, obsessed with triangles, insists the pool must be a triangle with measurements using only the number 7. The doting father plans an equilateral triangle pool with 77 ft sides. To see if it fits in the backyard, he calculates:</p>
                        <p className="font-mono text-sm mt-2">s = (77 + 77 + 77) / 2 = 115.5 ft</p>
                        <p className="font-mono text-sm mt-2">Area = √115.5 × (115.5 - 77)³ ≈ 2,567.33 sq ft</p>
                    </div>
                </div>
                <div>
                    <h4 className="font-semibold text-foreground">Trapezoid</h4>
                    <p>A trapezoid is a four-sided shape with at least one pair of parallel sides, called bases. A simple, convex trapezoid has angles not exceeding 180° and is not self-intersecting. The area is found by averaging the lengths of the two bases and multiplying by the height (the perpendicular distance between them).</p>
                    <p className="font-mono bg-muted p-2 rounded-md my-2 text-center">Area = (Base₁ + Base₂) / 2 × Height</p>
                    <div className="p-4 border-l-4 border-primary/50 bg-muted/50 rounded-r-lg">
                        <h5 className="font-semibold">Ramping Endeavors</h5>
                        <p className="text-sm mt-2">Two years later, the farmer's daughter is now 9 and into freestyle BMX. She needs a ramp, but it must be made of shapes formed from triangles and use only the number 9. The farmer designs a ramp with a trapezoidal side face: a height of 9 ft, a bottom base of 29.528 ft (9m), and a top base of 9 ft. The area is:</p>
                        <p className="font-mono text-sm mt-2">Area = (9 ft + 29.528 ft) / 2 × 9 ft = 173.376 sq ft</p>
                    </div>
                </div>
                 <div>
                    <h4 className="font-semibold text-foreground">Circle</h4>
                    <p>A circle is a shape formed by all points in a plane that are at a given distance from a center point. This distance is called the radius. The area calculation involves the mathematical constant π (pi).</p>
                    <p className="font-mono bg-muted p-2 rounded-md my-2 text-center">Area = π × r²</p>
                    <div className="p-4 border-l-4 border-primary/50 bg-muted/50 rounded-r-lg">
                        <h5 className="font-semibold">Circle of Li(f)es</h5>
                        <p className="text-sm mt-2">At 15, the farmer's daughter learns about crop circles and their supposed alien origins. To prank her father, she decides to create a crop circle with an outer radius of 15 feet. She calculates the required area:</p>
                        <p className="font-mono text-sm mt-2">Area = π × (15 ft)² ≈ 706.858 sq ft</p>
                        <p className="text-sm mt-2">The prank works too well, attracting "cereologists" who damage the farmer's crops while authenticating the "alien" construction.</p>
                    </div>
                </div>
                 <div>
                    <h4 className="font-semibold text-foreground">Sector</h4>
                    <p>A sector is a "pie-slice" part of a circle, enclosed by two radii and the connecting arc. Its area is a fraction of the circle's total area, determined by the sector's angle.</p>
                    <p className="font-mono bg-muted p-2 rounded-md my-2 text-center">Area = (θ / 360) × πr² (if θ is in degrees)</p>
                    <div className="p-4 border-l-4 border-primary/50 bg-muted/50 rounded-r-lg">
                        <h5 className="font-semibold">Sectioning Family</h5>
                        <p className="text-sm mt-2">For the daughter's 16th birthday, her mom bakes a blackberry pie. But their pet raccoon, Platypus, eats a 180° slice. Now, the remaining half of the 16-inch radius pie must be split among three people. Each person gets a 60° slice. The area of each slice is:</p>
                        <p className="font-mono text-sm mt-2">Area = (60° / 360°) × π × (16 in)² ≈ 134.041 in²</p>
                    </div>
                </div>
                <div>
                    <h4 className="font-semibold text-foreground">Ellipse</h4>
                    <p>An ellipse is a generalized circle. For any point on its curve, the sum of the distances to two fixed points, the foci (F₁ and F₂), is constant. When the foci merge, it becomes a circle. The semi-major axis (a) is its longest radius, and the semi-minor axis (b) is its shortest.</p>
                    <p className="font-mono bg-muted p-2 rounded-md my-2 text-center">Area = π × a × b</p>
                     <div className="p-4 border-l-4 border-primary/50 bg-muted/50 rounded-r-lg">
                        <h5 className="font-semibold">Falling out of Orbit</h5>
                        <p className="text-sm mt-2">At 18, after failing to get into top universities, the daughter feels lost. To visualize her feelings, she decides to model Earth's near-elliptical orbit in her room. She calculates the area needed for her model, with a semi-major axis of 20 ft and a semi-minor axis of 18 ft:</p>
                        <p className="font-mono text-sm mt-2">Area = π × 18 ft × 20 ft ≈ 1130.97 sq ft</p>
                    </div>
                </div>
                <div>
                    <h4 className="font-semibold text-foreground">Parallelogram</h4>
                    <p>A parallelogram is a simple quadrilateral with two pairs of parallel sides. Opposite sides and angles are equal. Rectangles and squares are special cases. Its area formula is similar to a rectangle's, using a base and the perpendicular height between bases.</p>
                    <p className="font-mono bg-muted p-2 rounded-md my-2 text-center">Area = Base × Height</p>
                     <div className="p-4 border-l-4 border-primary/50 bg-muted/50 rounded-r-lg">
                        <h5 className="font-semibold">Diamond in the Sky</h5>
                        <p className="text-sm mt-2">Two years later, the daughter has emerged from her struggles like a diamond. A massive octahedral diamond asteroid lands on the farm, which she sees as a symbol of her journey. She measures the area of one of its rhomboidal faces, which has a base of 20 ft and a height of 18 ft:</p>
                        <p className="font-mono text-sm mt-2">Area = 20 ft × 18 ft = 360 sq ft</p>
                        <p className="text-sm mt-2">Ultimately, she sells the diamond, abandoning her convictions for a life of lavish indulgence.</p>
                    </div>
                </div>
            </AccordionContent>
        </AccordionItem>
    </Accordion>
);

const FaqSection = () => (
    <Card>
        <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>What is the difference between area and perimeter?</AccordionTrigger>
                    <AccordionContent>
                        **Area** is the measure of the space inside a two-dimensional shape (e.g., the amount of grass in a field). **Perimeter** is the total distance around the outside edge of the shape (e.g., the length of the fence around the field).
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>How do I find the area of an irregular shape?</AccordionTrigger>
                    <AccordionContent>
                        To find the area of an irregular shape, you can break it down into simpler, common shapes (like rectangles, triangles, and circles). Calculate the area of each simple shape and then add them together to get the total area.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>Why is the area unit "squared" (e.g., m²)?</AccordionTrigger>
                    <AccordionContent>
                        Area is measured in square units because it represents a two-dimensional space. For example, one square meter (m²) is the area of a square that is one meter long on each side. When you multiply two lengths together (e.g., length × width), you also multiply their units (meter × meter = meter²).
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger>What is Heron's formula for a triangle?</AccordionTrigger>
                    <AccordionContent>
                        Heron's formula is a way to calculate the area of a triangle when you know the lengths of all three sides (a, b, and c). First, you calculate the semi-perimeter, `s = (a + b + c) / 2`. Then, the area is `√[s(s-a)(s-b)(s-c)]`. Our calculator uses this method for the triangle area.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                    <AccordionTrigger>Can I calculate the area of 3D shapes with this tool?</AccordionTrigger>
                    <AccordionContent>
                        No, this calculator is for 2D shapes only. To find the area of the outer surface of a 3D shape, you need our <Link href="/geometry/surface-area" className="text-primary hover:underline">Surface Area Calculator</Link>. To find the space inside a 3D shape, use the <Link href="/geometry/volume" className="text-primary hover:underline">Volume Calculator</Link>.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
    </Card>
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
            <HowToUseGuide />
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
            <FaqSection />
        </div>
      </main>
    </div>
  );
}
