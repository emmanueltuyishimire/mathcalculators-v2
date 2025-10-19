
import { PageHeader } from '@/components/page-header';
import SurfaceAreaCalculator from '@/components/calculators/surface-area-calculator';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
    title: 'Surface Area Calculator',
    description: 'A list of surface area calculators for several common shapes. Please fill in the corresponding fields and click the "Calculate" button.',
};

const HowToUseGuide = () => (
    <Card>
        <CardHeader>
            <CardTitle>How to Use the Surface Area Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
            <p className="text-muted-foreground">
                This page provides individual calculators for various 3D shapes. Follow these simple steps to find the surface area for any shape.
            </p>
            <ol className="list-decimal list-inside space-y-4 text-muted-foreground">
                <li>
                    <span className="font-semibold text-foreground">Select Your Unit:</span> Choose a unit of measurement (e.g., meters, feet, inches) from the dropdown menu in each calculator card. All inputs for that shape should be in the selected unit.
                </li>
                <li>
                    <span className="font-semibold text-foreground">Enter Dimensions:</span> Fill in the required fields for the shape you are calculating. The labels (e.g., Radius (r), Height (h)) correspond to the diagrams.
                </li>
                <li>
                    <span className="font-semibold text-foreground">Calculate Surface Area:</span> Click the "Calculate" button. The result will be displayed in the corresponding square unit (e.g., m², ft², in²).
                </li>
            </ol>
             <div className="p-4 bg-accent/50 rounded-lg">
                <h4 className="font-semibold text-accent-foreground">💡 Tip</h4>
                <p className="text-sm text-muted-foreground mt-2">For the Spherical Cap, you only need to provide two of the three dimensions (Base Radius, Ball Radius, or Height). The calculator will compute the third value for you.</p>
            </div>
        </CardContent>
    </Card>
);


const EducationalContent = () => (
    <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
            <AccordionTrigger className="text-xl font-semibold">Understanding Surface Area</AccordionTrigger>
            <AccordionContent className="space-y-4 text-muted-foreground">
                <p>Surface area is a measure of the total area that the surface of a three-dimensional object occupies. It’s the sum of the areas of all the faces and curved surfaces of an object. Think of it as the amount of wrapping paper needed to cover a gift or the amount of paint required for a wall.</p>
                <p>The calculators on this page help you find the surface area for various common shapes. For a deeper dive into the properties of these shapes, you might also find the <Link href="/geometry/volume" className="text-primary hover:underline">Volume Calculator</Link> and <Link href="/geometry/area" className="text-primary hover:underline">Area Calculator</Link> useful.</p>
            </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
            <AccordionTrigger className="text-xl font-semibold">About the Shapes</AccordionTrigger>
            <AccordionContent className="space-y-8 text-muted-foreground">
                <div className="space-y-2">
                    <h4 className="font-semibold text-foreground">Sphere</h4>
                    <p>The surface area (SA) of a sphere is calculated with the formula <code className="font-mono bg-background p-1 rounded-md">SA = 4πr²</code>, where 'r' is the radius.</p>
                    <div className="p-4 border-l-4 border-primary/50 bg-muted/50 rounded-r-lg">
                        <h5 className="font-semibold">Example: The Studious Truffle Eater</h5>
                        <p className="text-sm mt-2">Xael, a meticulous student of confectionery, wants to calculate the total surface area of a chocolate truffle to understand its texture distribution. Given a truffle with a radius of 0.4 inches, the calculation is:</p>
                        <p className="font-mono text-sm mt-2">SA = 4 × π × (0.4)² ≈ 2.011 in²</p>
                    </div>
                </div>
                <div className="space-y-2">
                    <h4 className="font-semibold text-foreground">Cone</h4>
                    <p>A cone's surface area is the sum of its circular base and its slanted lateral side. The formulas are:</p>
                    <ul className="list-disc list-inside pl-4 font-mono text-sm bg-background p-2 rounded-md my-2">
                        <li>Base SA = πr²</li>
                        <li>Lateral SA = πr√(r² + h²)</li>
                        <li>Total SA = πr(r + √(r² + h²))</li>
                    </ul>
                    <div className="p-4 border-l-4 border-primary/50 bg-muted/50 rounded-r-lg">
                        <h5 className="font-semibold">Example: The DIY Rice Hat</h5>
                        <p className="text-sm mt-2">Athena is crafting a traditional conical rice hat for a cultural festival. She needs to know the amount of material required for the lateral surface. With a planned radius of 1.2 feet and a height of 0.6 feet, she calculates:</p>
                        <p className="font-mono text-sm mt-2">Lateral SA = π × 1.2 × √(1.2² + 0.6²) ≈ 5.05 ft²</p>
                    </div>
                </div>
                 <div className="space-y-2">
                    <h4 className="font-semibold text-foreground">Cube</h4>
                    <p>A cube has six identical square faces. Its surface area is found with: <code className="font-mono bg-background p-1 rounded-md">SA = 6a²</code>, where 'a' is the length of one edge.</p>
                    <div className="p-4 border-l-4 border-primary/50 bg-muted/50 rounded-r-lg">
                        <h5 className="font-semibold">Example: The Custom Rubik's Cube</h5>
                        <p className="text-sm mt-2">Anne is designing a custom Rubik's Cube with all-black faces for her minimalist brother. The customization fee is based on the total surface area. For a cube with a 3-inch edge:</p>
                        <p className="font-mono text-sm mt-2">SA = 6 × (3)² = 54 in²</p>
                    </div>
                </div>
                 <div className="space-y-2">
                    <h4 className="font-semibold text-foreground">Cylindrical Tank</h4>
                    <p>The surface area of a closed cylinder includes two circular bases and the lateral surface. The formulas are:</p>
                     <ul className="list-disc list-inside pl-4 font-mono text-sm bg-background p-2 rounded-md my-2">
                        <li>Base SA = 2πr²</li>
                        <li>Lateral SA = 2πrh</li>
                        <li>Total SA = 2πr(r + h)</li>
                    </ul>
                     <div className="p-4 border-l-4 border-primary/50 bg-muted/50 rounded-r-lg">
                        <h5 className="font-semibold">Example: The Fish Tank Bath</h5>
                        <p className="text-sm mt-2">Jeremy, an eccentric bather, wants to know if his cylindrical fish tank loses heat faster than a standard bathtub. To find out, he calculates the surface area of his tank, which has a height of 5 feet and a radius of 3 feet:</p>
                        <p className="font-mono text-sm mt-2">Total SA = 2π × 3(3 + 5) ≈ 150.796 ft²</p>
                    </div>
                </div>
                <div className="space-y-2">
                    <h4 className="font-semibold text-foreground">Rectangular Tank</h4>
                    <p>The surface area is the sum of the areas of its six rectangular faces: <code className="font-mono bg-background p-1 rounded-md">SA = 2(lw + lh + wh)</code>.</p>
                     <div className="p-4 border-l-4 border-primary/50 bg-muted/50 rounded-r-lg">
                        <h5 className="font-semibold">Example: The Surprise Gift Box</h5>
                        <p className="text-sm mt-2">A sister is wrapping a surprise gift for her brother in a rectangular box measuring 2 ft by 3 ft by 4 ft. To buy the right amount of wrapping paper, she calculates the surface area:</p>
                        <p className="font-mono text-sm mt-2">SA = 2 × (2×3 + 2×4 + 3×4) = 2 × (6 + 8 + 12) = 52 ft²</p>
                    </div>
                </div>
                 <div className="space-y-2">
                    <h4 className="font-semibold text-foreground">Capsule</h4>
                    <p>A capsule's surface area consists of a cylinder's lateral area and the area of a sphere (formed by the two hemispherical ends): <code className="font-mono bg-background p-1 rounded-md">SA = 4πr² + 2πrh</code>.</p>
                     <div className="p-4 border-l-4 border-primary/50 bg-muted/50 rounded-r-lg">
                        <h5 className="font-semibold">Example: The Placebo Pill</h5>
                        <p className="text-sm mt-2">A pharmaceutical designer is creating a new placebo pill and needs to calculate the surface area for a sugar coating. For a capsule with a radius of 0.1 inches and a cylindrical height of 0.4 inches:</p>
                        <p className="font-mono text-sm mt-2">SA = 4π(0.1)² + 2π(0.1)(0.4) ≈ 0.377 in²</p>
                    </div>
                </div>
                 <div className="space-y-2">
                    <h4 className="font-semibold text-foreground">Spherical Cap</h4>
                    <p>The total surface area of a solid spherical cap is the sum of its circular base and its curved surface. The formulas are:</p>
                    <ul className="list-disc list-inside pl-4 font-mono text-sm bg-background p-2 rounded-md my-2">
                        <li>Base SA = πr²</li>
                        <li>Cap SA = 2πRh</li>
                        <li>Total SA = π(r² + 2Rh)</li>
                    </ul>
                     <div className="p-4 border-l-4 border-primary/50 bg-muted/50 rounded-r-lg">
                        <h5 className="font-semibold">Example: A Piece of the Globe</h5>
                        <p className="text-sm mt-2">Jennifer takes a segment of her brother's globe to have as her own. To find the surface area of her hollow piece (the cap itself, without the base), from a globe with radius (R) of 0.9 feet and a cap height (h) of 0.6 feet, she calculates:</p>
                        <p className="font-mono text-sm mt-2">Cap SA = 2π × 0.9 × 0.6 ≈ 3.393 ft²</p>
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
                    <AccordionTrigger>What is the difference between surface area and volume?</AccordionTrigger>
                    <AccordionContent>
                        **Surface area** is the total area of the outside surfaces of a 3D object (a two-dimensional measurement). **Volume** is the amount of space inside the 3D object (a three-dimensional measurement). For example, the surface area of a box is the amount of wrapping paper needed to cover it, while the volume is how much you can fit inside it.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>What does "lateral surface area" mean?</AccordionTrigger>
                    <AccordionContent>
                        Lateral surface area refers to the area of the sides of an object, excluding the area of its top and bottom bases. For example, for a cylinder, it's the area of the curved "tube" part, not including the circular top and bottom.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>Can I use different units for different inputs?</AccordionTrigger>
                    <AccordionContent>
                        No. To get an accurate calculation, all of your inputs (like radius, height, length) must be in the same unit of measurement (e.g., all in meters or all in inches). The result will be in the corresponding square unit.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger>How does the Spherical Cap calculator work with only two inputs?</AccordionTrigger>
                    <AccordionContent>
                        The three dimensions of a spherical cap (base radius 'r', ball radius 'R', and height 'h') are geometrically related. If you know any two of them, the third can be calculated using the Pythagorean theorem. The calculator does this automatically before computing the surface area.
                    </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="item-5">
                    <AccordionTrigger>What is a frustum?</AccordionTrigger>
                    <AccordionContent>
                        A frustum is the portion of a solid (in this case, a cone) that is left after its top has been cut off by a plane parallel to the base. A common example is a lampshade or a bucket.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
    </Card>
);

export default function SurfaceAreaPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Surface Area Calculator" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-4xl space-y-12">
            <section className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                    Surface Area Calculator
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    The following is a list of surface area calculators for several common shapes. Please fill in the corresponding fields and click the "Calculate" button.
                </p>
            </section>
            
            <HowToUseGuide />

            <SurfaceAreaCalculator />
            
            <EducationalContent />
            
            <FaqSection />

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
