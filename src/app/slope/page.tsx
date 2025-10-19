
import { PageHeader } from '@/components/page-header';
import SlopeCalculator from '@/components/calculators/slope-calculator';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Slope Calculator',
  description: 'Calculate the slope (or gradient) of a line using two points or one point and an angle. Also finds the equation of the line.',
};

const EducationalContent = () => (
    <Card>
        <CardHeader>
            <CardTitle>Understanding Slope</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground">
            <div>
                <h3 className="text-xl font-semibold text-foreground">What is Slope?</h3>
                <p className="mt-2">
                    The <b>slope</b>, or gradient, of a line is a number that describes its direction and steepness. It is often denoted by the letter <b>m</b>.
                </p>
                 <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>A <b>positive slope</b> means the line is increasing (it goes up from left to right).</li>
                    <li>A <b>negative slope</b> means the line is decreasing (it goes down from left to right).</li>
                    <li>A <b>zero slope</b> indicates a horizontal line.</li>
                    <li>An <b>undefined slope</b> indicates a vertical line.</li>
                </ul>
            </div>
             <div>
                <h3 className="text-xl font-semibold text-foreground">Formulas Used</h3>
                <p className="mt-2"><b>1. From Two Points:</b> Given two points (x₁, y₁) and (x₂, y₂), the slope is calculated as:</p>
                <p className="font-mono bg-muted p-2 rounded-md my-2 text-center">m = (y₂ - y₁) / (x₂ - x₁)</p>
                <p>This is often referred to as "rise over run".</p>

                <p className="mt-4"><b>2. From One Point and Angle:</b> The slope can also be found from the angle of incline (θ) using trigonometry:</p>
                <p className="font-mono bg-muted p-2 rounded-md my-2 text-center">m = tan(θ)</p>
            </div>
            <div>
                <h3 className="text-xl font-semibold text-foreground">Line Equation</h3>
                <p className="mt-2">The calculator also provides the equation of the line in slope-intercept form:</p>
                <p className="font-mono bg-muted p-2 rounded-md my-2 text-center">y = mx + b</p>
                <p>where <b>b</b> is the y-intercept (the point where the line crosses the y-axis).</p>
            </div>
        </CardContent>
    </Card>
);

export default function SlopePage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Slope Calculator" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-2xl space-y-8">
          <section className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Slope Calculator
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              By definition, the slope or gradient of a line describes its steepness, incline, or grade. Use the calculator below to find the slope of a line.
            </p>
          </section>

          <SlopeCalculator />

          <EducationalContent />
        </div>
      </main>
    </div>
  );
}
