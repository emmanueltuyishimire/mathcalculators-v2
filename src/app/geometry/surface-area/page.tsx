
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
                <p>Surface area is the total area that the surface of a three-dimensional object occupies. It is the sum of the areas of all the faces (or surfaces) on the object. For example, the surface area of a cube is the sum of the areas of its six square faces. The standard international (SI) unit for surface area is the square meter (m²).</p>
                <p>For shapes with curved surfaces, like a sphere or cone, the surface area calculation involves the mathematical constant π (pi). Understanding surface area is crucial in many practical applications, such as determining the amount of material needed to cover an object or the amount of paint required to coat a surface.</p>
            </AccordionContent>
        </AccordionItem>
    </Accordion>
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
