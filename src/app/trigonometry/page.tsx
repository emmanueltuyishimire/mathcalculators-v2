
import { PageHeader } from '@/components/page-header';
import BasicTrigCalculator from '@/components/calculators/basic-trig-calculator';
import RightTriangleSolver from '@/components/calculators/right-triangle-solver';
import ObliqueTriangleSolver from '@/components/calculators/oblique-triangle-solver';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: 'Trigonometry Calculator Platform',
  description: 'A unified platform for trigonometric calculations, including basic functions, triangle solvers, and more.',
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Trigonometry Calculator Platform",
  "operatingSystem": "All",
  "applicationCategory": "EducationalApplication",
  "description": "A free online platform for trigonometric functions (sin, cos, tan), right triangle solvers, and non-right triangle solvers using the Law of Sines and Cosines.",
  "url": "https://maths.calculation.site/trigonometry",
  "publisher": {
    "@type": "Organization",
    "name": "Math Calculators",
    "url": "https://maths.calculation.site"
  },
  "inLanguage": "en",
  "datePublished": "2024-07-26",
  "softwareVersion": "1.0.0"
};

const FaqSection = () => (
    <Card>
        <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>What is the difference between Degrees and Radians?</AccordionTrigger>
                    <AccordionContent>
                        Degrees and Radians are two different units for measuring angles. A full circle is 360 degrees or 2π radians. You must select the correct mode (DEG or RAD) based on what your problem requires, otherwise your trigonometric calculations will be incorrect.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>What are sin, cos, and tan?</AccordionTrigger>
                    <AccordionContent>
                        Sine (sin), Cosine (cos), and Tangent (tan) are the three primary trigonometric functions. They represent the ratios of the sides of a right-angled triangle. They are fundamental for analyzing waves, circles, and oscillations.
                    </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="item-3">
                    <AccordionTrigger>What is the Law of Sines vs. Law of Cosines?</AccordionTrigger>
                    <AccordionContent>
                        Both are used for non-right (oblique) triangles.<br/>
                        - <b>Law of Sines:</b> Used when you know two angles and one side (AAS or ASA) or two sides and a non-included angle (SSA).<br/>
                        - <b>Law of Cosines:</b> Used when you know three sides (SSS) or two sides and their included angle (SAS).
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger>What are inverse trigonometric functions (sin⁻¹, cos⁻¹, tan⁻¹)?</AccordionTrigger>
                    <AccordionContent>
                        Inverse trigonometric functions (also known as arcsin, arccos, arctan) are used to find the angle when you know the ratio of the sides. For example, if you know `sin(angle) = 0.5`, you can use `sin⁻¹(0.5)` to find that the angle is 30 degrees.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
    </Card>
);

export default function TrigonometryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <div className="flex flex-1 flex-col">
        <PageHeader title="Trigonometry Platform" />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-4xl space-y-12">
            <section className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                    Trigonometry Calculator Platform
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    A unified suite of tools for all your trigonometry needs, from basic functions to advanced triangle solving.
                </p>
            </section>
            
            <Tabs defaultValue="functions" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="functions">Trig Functions</TabsTrigger>
                    <TabsTrigger value="right-triangle">Right Triangle</TabsTrigger>
                    <TabsTrigger value="oblique-triangle">Oblique Triangle</TabsTrigger>
                </TabsList>
                <TabsContent value="functions" className="mt-6">
                    <BasicTrigCalculator />
                </TabsContent>
                <TabsContent value="right-triangle" className="mt-6">
                    <RightTriangleSolver />
                </TabsContent>
                <TabsContent value="oblique-triangle" className="mt-6">
                    <ObliqueTriangleSolver />
                </TabsContent>
            </Tabs>

            <FaqSection />
          </div>
        </main>
      </div>
    </>
  );
}
