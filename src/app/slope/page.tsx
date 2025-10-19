
'use client'
import { PageHeader } from '@/components/page-header';
import SlopeCalculator from '@/components/calculators/slope-calculator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth, useFirestore, useUser } from '@/firebase';
import { initiateAnonymousSignIn } from '@/firebase/non-blocking-login';
import { useEffect } from 'react';

const EducationalContent = () => (
    <Card>
        <CardHeader>
            <CardTitle>A Deeper Look at Slope</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground">
            <div>
                <h3 className="text-xl font-semibold text-foreground">What is Slope?</h3>
                <p className="mt-2">
                    In mathematics, the <b>slope</b>, often called the gradient, is a single number that encapsulates two key properties of a line: its steepness and its direction. Essentially, it's the "rise over run"—the vertical change for every unit of horizontal change.
                </p>
                 <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>If <b>m &gt; 0</b>, the line is increasing and travels upward from left to right.</li>
                    <li>If <b>m &lt; 0</b>, the line is decreasing, moving downward from left to right.</li>
                    <li>If <b>m = 0</b>, the line is perfectly horizontal.</li>
                    <li>For a <b>vertical line</b>, the slope is undefined because the horizontal change (the denominator in the formula) is zero.</li>
                </ul>
            </div>
             <div>
                <h3 className="text-xl font-semibold text-foreground">Core Formulas</h3>
                <p className="mt-2"><b>1. Slope from Two Points:</b> Given two distinct points, (x₁, y₁) and (x₂, y₂), the slope is calculated by dividing the change in y (the "rise") by the change in x (the "run").</p>
                <p className="font-mono bg-muted p-2 rounded-md my-2 text-center">m = (y₂ - y₁) / (x₂ - x₁)</p>

                <p className="mt-4"><b>2. Slope from Angle:</b> The slope is also the tangent of the line's angle of inclination (θ), which is the angle it makes with the positive x-axis.</p>
                <p className="font-mono bg-muted p-2 rounded-md my-2 text-center">m = tan(θ)</p>
            </div>
            <div>
                <h3 className="text-xl font-semibold text-foreground">Line Equation and Intercepts</h3>
                <p className="mt-2">Once the slope (m) is known, you can describe the entire line with the slope-intercept formula:</p>
                <p className="font-mono bg-muted p-2 rounded-md my-2 text-center">y = mx + b</p>
                <p>Here, <b>b</b> represents the y-intercept—the point where the line crosses the vertical y-axis. The calculator also solves for the x-intercept, where the line crosses the horizontal x-axis.</p>
            </div>
             <div>
                <h3 className="text-xl font-semibold text-foreground">Beyond the Basics: Slope in Calculus</h3>
                <p className="mt-2">
                    While this calculator focuses on linear functions, the concept of slope is a cornerstone of differential calculus. For curves and non-linear functions, the slope isn't constant. The derivative of a function at a specific point gives you the slope of the tangent line at that exact spot, representing the instantaneous rate of change.
                </p>
            </div>
        </CardContent>
    </Card>
);

export default function SlopePage() {
    const auth = useAuth();

    useEffect(() => {
        if(auth) {
            initiateAnonymousSignIn(auth);
        }
    }, [auth]);

  return (
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

          <EducationalContent />
        </div>
      </main>
    </div>
  );
}
