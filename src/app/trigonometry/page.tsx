
"use client";

import { PageHeader } from '@/components/page-header';
import BasicTrigCalculator from '@/components/calculators/trigonometry-calculator';
import RightTriangleSolver from '@/components/calculators/right-triangle-solver';
import ObliqueTriangleSolver from '@/components/calculators/oblique-triangle-solver';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const HowToUseGuide = () => (
    <Card>
        <CardHeader>
            <CardTitle>How to Use the Trigonometry Calculator</CardTitle>
            <CardDescription>A powerful tool for everything from simple functions to advanced triangle solving.</CardDescription>
        </CardHeader>
        <CardContent>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>1. Choose Your Calculation Type</AccordionTrigger>
                    <AccordionContent className="space-y-2 text-muted-foreground">
                        <p>Start by selecting the mode that fits your problem. Each is designed for a specific task.</p>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Mode</TableHead>
                                    <TableHead>Description</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow><TableCell>🔹 Basic Trigonometric Functions</TableCell><TableCell>Compute sin, cos, tan, cot, sec, or csc for any angle.</TableCell></TableRow>
                                <TableRow><TableCell>🔹 Right Triangle Solver</TableCell><TableCell>Find missing sides or angles of a right triangle using basic trig ratios.</TableCell></TableRow>
                                <TableRow><TableCell>🔹 Oblique Triangle Solver</TableCell><TableCell>Solve any triangle (Law of Sines and Law of Cosines).</TableCell></TableRow>
                            </TableBody>
                        </Table>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>2. Enter Your Known Values</AccordionTrigger>
                    <AccordionContent className="space-y-4 text-muted-foreground">
                        <p>The input fields will adapt based on the mode you select.</p>
                        <div>
                            <h4 className="font-semibold text-foreground">Basic / Inverse Trig Mode</h4>
                            <p>Enter an angle or value, choose your unit (degrees/radians), and select the function.</p>
                            <p className="font-mono text-sm bg-background p-1 rounded-md mt-1">sin(30°) → 0.5 | acos(0.5) → 60°</p>
                        </div>
                         <div>
                            <h4 className="font-semibold text-foreground">Right Triangle Solver</h4>
                            <p>Provide any two known values (e.g., one side and one angle, or two sides). The calculator finds the rest.</p>
                            <p className="font-mono text-sm bg-background p-1 rounded-md mt-1">Given a=3, b=4 → finds c=5, A=36.87°, B=53.13°</p>
                        </div>
                         <div>
                            <h4 className="font-semibold text-foreground">Oblique Triangle Solver</h4>
                            <p>Solves any triangle. Input SSS, SAS, or AAS/ASA to get all sides and angles.</p>
                            <p className="font-mono text-sm bg-background p-1 rounded-md mt-1">Given a=7, b=9, C=40° → finds c, A, B</p>
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>3. Review Your Results</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                        The calculator will display all solved values. For triangle problems, this includes all three sides and all three angles.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger>4. Settings and Options</AccordionTrigger>
                    <AccordionContent className="space-y-2 text-muted-foreground">
                        <p><b>Angle Unit:</b> Toggle between degrees and radians for your calculations.</p>
                        <p><b>Precision:</b> Results are typically rounded for clarity.</p>
                    </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="item-5">
                    <AccordionTrigger>5. Troubleshooting</AccordionTrigger>
                    <AccordionContent className="space-y-2 text-muted-foreground">
                         <p><b>Wrong values?</b> Make sure you have the correct unit (Degrees/Radians) selected.</p>
                         <p><b>"Undefined" result?</b> You might be trying to calculate tan(90°), cot(0°), or another asymptote.</p>
                         <p><b>No solution?</b> Ensure you provide enough inputs (e.g., at least two for a right triangle) and that side lengths are valid (e.g., hypotenuse must be the longest side).</p>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
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
      <div className="flex flex-1 flex-col">
        <PageHeader title="Trigonometry Calculator" />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-4xl space-y-12">
            <section className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                    Trigonometry Calculator
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    A free online trigonometry calculator with a unified suite of tools for all your trigonometry needs, from basic functions to advanced triangle solving.
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
            
            <HowToUseGuide />

            <FaqSection />
          </div>
        </main>
      </div>
    </>
  );
}
