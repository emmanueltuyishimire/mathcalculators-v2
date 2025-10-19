
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export function HowToUseGuide() {
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

export function EducationalContent() {
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
