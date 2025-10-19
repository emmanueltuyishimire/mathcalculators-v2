
'use client';
import { PageHeader } from '@/components/page-header';
import SlopeCalculator from '@/components/calculators/slope-calculator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

function HowToUseGuide() {
    return (
        <Card>
            <CardHeader>
              <CardTitle>How to Use the Slope Calculator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground">For Two Points:</h3>
                <ol className="list-decimal list-inside space-y-1 pl-4">
                  <li>Enter the X and Y coordinates for Point 1.</li>
                  <li>Enter the X and Y coordinates for Point 2.</li>
                  <li>Click "Calculate Slope" to see the slope, angle, distance, and line equation.</li>
                </ol>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">For One Point and Slope:</h3>
                <ol className="list-decimal list-inside space-y-1 pl-4">
                  <li>Enter the coordinates for your starting point (X1, Y1).</li>
                  <li>Provide the distance from the starting point.</li>
                  <li>Choose to input either the slope (m) or the angle (θ).</li>
                  <li>Click "Calculate Point" to find the coordinates of the second point.</li>
                </ol>
              </div>
            </CardContent>
          </Card>
    );
}

function EducationalContent() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>A Deeper Look at Slope</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>The slope is a fundamental concept in mathematics that measures the "steepness" or "incline" of a line. It is often denoted by the letter <b>m</b>.</p>
              <div>
                <h4 className="font-semibold text-foreground">Positive vs. Negative Slope</h4>
                <ul className="list-disc list-inside pl-4">
                  <li>A <b>positive slope</b> means the line goes uphill from left to right.</li>
                  <li>A <b>negative slope</b> means the line goes downhill from left to right.</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Special Cases</h4>
                <ul className="list-disc list-inside pl-4">
                  <li>A <b>zero slope</b> indicates a horizontal line.</li>
                  <li>An <b>undefined slope</b> indicates a vertical line.</li>
                </ul>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold text-foreground">Real-World Applications</h4>
                <p>Slope is used in many fields, including engineering (to design roads and ramps), physics (to describe motion), and finance (to analyze trends in data).</p>
              </div>
            </CardContent>
          </Card>
    );
}

const FaqSection = () => (
    <Card>
        <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>What is slope?</AccordionTrigger>
                    <AccordionContent>
                        Slope is a measure of the steepness of a line. It's calculated as the "rise" (vertical change) divided by the "run" (horizontal change) between two points on the line. A higher slope value indicates a steeper incline.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>What does an "undefined" slope mean?</AccordionTrigger>
                    <AccordionContent>
                        An undefined slope means the line is perfectly vertical. This occurs when the "run" (the change in x-coordinates) is zero, which would lead to division by zero in the slope formula.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>What is the difference between slope and angle of incline?</AccordionTrigger>
                    <AccordionContent>
                        - **Slope (m)** is a ratio (rise/run).<br/>
                        - **Angle of Incline (θ)** is the angle the line makes with the positive x-axis, measured in degrees or radians. They are related by the formula `m = tan(θ)`.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger>How do I find a second point with just one point and a slope?</AccordionTrigger>
                    <AccordionContent>
                        You also need a distance. The calculator uses the given point, slope, and distance to find a new point that lies on the same line. Since there are two such points (one in each direction along the line), the calculator provides both possibilities.
                    </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="item-5">
                    <AccordionTrigger>What is the equation of the line?</AccordionTrigger>
                    <AccordionContent>
                        The calculator provides the equation in slope-intercept form: `y = mx + b`, where 'm' is the slope and 'b' is the y-intercept (the point where the line crosses the vertical y-axis).
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
    </Card>
);

export default function SlopePage() {
  return (
    <>
      <div className="flex flex-1 flex-col">
        <PageHeader title="Slope Calculator" />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-2xl space-y-8">
            <section className="text-center">
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Dynamic Slope Calculator
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                By definition, the slope or gradient of a line describes its steepness, incline, or grade.
              </p>
            </section>
            <SlopeCalculator />
            <HowToUseGuide />
            <EducationalContent />
            <FaqSection />
          </div>
        </main>
      </div>
    </>
  );
}
