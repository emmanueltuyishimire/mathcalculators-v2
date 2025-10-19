
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function HowToUseGuide() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>How to Use the Slope Calculator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-muted-foreground">
                <div>
                    <h3 className="text-xl font-semibold text-foreground">🔹 Using the "2 Points" Tab</h3>
                    <ol className="list-decimal list-inside mt-2 space-y-2">
                        <li>
                            <span className="font-semibold text-foreground">Enter Coordinates:</span> Input the X and Y coordinates for two distinct points (Point 1 and Point 2).
                        </li>
                        <li>
                            <span className="font-semibold text-foreground">Calculate:</span> Click the "Calculate Slope" button.
                        </li>
                        <li>
                            <span className="font-semibold text-foreground">View Results:</span> The calculator will display the slope (m), angle (θ), distance between points, and the full equation of the line.
                        </li>
                    </ol>
                </div>
                 <div>
                    <h3 className="text-xl font-semibold text-foreground">🔹 Using the "1 Point & Slope" Tab</h3>
                    <ol className="list-decimal list-inside mt-2 space-y-2">
                        <li>
                            <span className="font-semibold text-foreground">Enter Start Point:</span> Input the coordinates for your starting point (X1, Y1).
                        </li>
                         <li>
                            <span className="font-semibold text-foreground">Provide Distance:</span> Enter the distance (d) you wish to extend from your starting point.
                        </li>
                        <li>
                            <span className="font-semibold text-foreground">Choose Input Type:</span> Select whether you want to provide the slope (m) or the angle of incline (θ). Fill in the corresponding value.
                        </li>
                        <li>
                            <span className="font-semibold text-foreground">Calculate:</span> Click the "Calculate Point" button.
                        </li>
                         <li>
                            <span className="font-semibold text-foreground">View Results:</span> The tool will show two possible endpoints—one in the positive direction and one in the negative—along with the line equation.
                        </li>
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
            <CardContent className="space-y-6 text-muted-foreground">
                <div>
                    <h3 className="text-xl font-semibold text-foreground">What is Slope?</h3>
                    <p className="mt-2">
                        In mathematics, the <b>slope</b>, often called the gradient, is a single number that encapsulates two key properties of a line: its steepness and its direction. Essentially, it's the "rise over run"—the vertical change for every unit of horizontal change.
                    </p>
                     <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>If <b>m > 0</b>, the line is increasing and travels upward from left to right.</li>
                        <li>If <b>m < 0</b>, the line is decreasing, moving downward from left to right.</li>
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
}
