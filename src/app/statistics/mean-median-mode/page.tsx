
"use client";

import { PageHeader } from '@/components/page-header';
import MeanMedianModeCalculator from '@/components/calculators/mean-median-mode-calculator';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

const HowToUseGuide = () => (
    <Card>
        <CardHeader>
            <CardTitle>How to Use the Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
            <p className="text-muted-foreground">This calculator helps you quickly find the mean (average), median, mode, and range of any set of numbers. Follow the steps below to get accurate results.</p>
            
            <div>
                <h3 className="text-xl font-semibold text-foreground">Step 1: Enter Your Numbers</h3>
                <p className="text-muted-foreground mt-1">Type all your numbers into the input box, separated by commas.</p>
                <p className="font-mono bg-muted p-2 rounded-md my-2 text-center text-sm">10, 2, 38, 23, 38, 23, 21</p>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-foreground">Step 2: Click Calculate</h3>
                <p className="text-muted-foreground mt-1">Once all numbers are entered, press the Calculate button. The calculator will automatically process the numbers and display the results.</p>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-foreground">Step 3: View the Results</h3>
                <p className="text-muted-foreground mt-1">The calculator will show:</p>
                <Table className="mt-2">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Statistic</TableHead>
                            <TableHead>Description</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow><TableCell>Count</TableCell><TableCell>Total number of numbers entered</TableCell></TableRow>
                        <TableRow><TableCell>Mean (Average)</TableCell><TableCell>Sum of all numbers divided by the count</TableCell></TableRow>
                        <TableRow><TableCell>Median</TableCell><TableCell>Middle number when the numbers are sorted</TableCell></TableRow>
                        <TableRow><TableCell>Mode</TableCell><TableCell>The number(s) that appear most frequently</TableCell></TableRow>
                        <TableRow><TableCell>Range</TableCell><TableCell>Difference between the largest and smallest numbers</TableCell></TableRow>
                        <TableRow><TableCell>Sorted Data</TableCell><TableCell>Your numbers displayed in ascending order</TableCell></TableRow>
                    </TableBody>
                </Table>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-foreground">Step 4: Tips for Using the Calculator</h3>
                 <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                    <li>Commas are required to separate each number.</li>
                    <li>Median is useful when your dataset has extreme values (outliers).</li>
                    <li>Mode can show more than one number if multiple numbers appear the same number of times.</li>
                    <li>Range gives a quick idea of the spread of your data but can be affected by very high or very low numbers.</li>
                </ul>
            </div>
        </CardContent>
    </Card>
);


const EducationalContent = () => (
    <Card>
        <CardHeader>
            <CardTitle>Understanding Mean, Median, Mode, and Range: How They Help You Analyze Data</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
            <p className="text-muted-foreground">When working with numbers, it’s not enough to just list them—you need to understand what they tell you about your data. The Mean, Median, Mode, and Range Calculator helps you do exactly that. Here’s why each statistic is useful and how it can guide better decisions.</p>
            <div>
                <h3 className="text-xl font-semibold text-foreground">1. Mean (Average)</h3>
                <p className="text-muted-foreground mt-1">The mean is the most commonly used measure of central tendency. It gives a single value that represents the “typical” value in a dataset.</p>
                <p className="font-semibold text-sm mt-1">Use Case: Calculating average test scores, average sales, or average expenses.</p>
                <p className="text-sm text-muted-foreground mt-1">Important Note: The mean can be affected by extremely high or low values (outliers), so always check the dataset for anomalies.</p>
            </div>
             <div>
                <h3 className="text-xl font-semibold text-foreground">2. Median</h3>
                <p className="text-muted-foreground mt-1">The median is the middle number when the data is sorted in ascending order. It is especially useful when the dataset has outliers or skewed values because it is not affected by extreme numbers.</p>
                <p className="font-semibold text-sm mt-1">Use Case: Determining typical income in a region where a few people earn much more than the rest.</p>
            </div>
             <div>
                <h3 className="text-xl font-semibold text-foreground">3. Mode</h3>
                <p className="text-muted-foreground mt-1">The mode is the value that appears most frequently in the dataset. There can be more than one mode (multimodal) or none at all if all numbers are unique.</p>
                <p className="font-semibold text-sm mt-1">Use Case: Identifying the most popular product, most common survey answer, or repeated measurements.</p>
            </div>
             <div>
                <h3 className="text-xl font-semibold text-foreground">4. Range</h3>
                <p className="text-muted-foreground mt-1">The range shows the spread of your data by subtracting the smallest value from the largest.</p>
                <p className="font-semibold text-sm mt-1">Use Case: Understanding the variability or consistency of a dataset, such as temperature fluctuations or test scores.</p>
                <p className="text-sm text-muted-foreground mt-1">Important Note: The range is very sensitive to outliers and should be considered alongside mean or median.</p>
            </div>
            <div>
                <h3 className="text-xl font-semibold text-foreground">5. Why It Matters</h3>
                <p className="text-muted-foreground mt-1">Using mean, median, mode, and range together gives a complete picture of your dataset:</p>
                <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                    <li><b>Mean:</b> Overall average</li>
                    <li><b>Median:</b> Central tendency resistant to outliers</li>
                    <li><b>Mode:</b> Most common values</li>
                    <li><b>Range:</b> Spread of the data</li>
                </ul>
                <p className="text-muted-foreground mt-2">By analyzing all four statistics, you can make better-informed decisions, detect anomalies, and understand patterns in your data.</p>
            </div>
            <div>
                <h3 className="text-xl font-semibold text-foreground">Conclusion</h3>
                <p className="text-muted-foreground mt-1">Whether you’re a student analyzing test scores, a business tracking sales, or just curious about your own data, the Mean, Median, Mode, Range Calculator helps you quickly compute these key statistics and interpret your dataset efficiently.</p>
            </div>
        </CardContent>
    </Card>
);


export default function MeanMedianModePage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Mean, Median, Mode, Range Calculator" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-2xl space-y-8">
            <section className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Mean, Median, Mode, Range Calculator
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Please provide numbers separated by commas to calculate the mean, median, mode, and range.
                </p>
            </section>

            <MeanMedianModeCalculator />

            <HowToUseGuide />

            <EducationalContent />

            <section className="text-center text-sm text-muted-foreground">
                <h3 className="font-semibold text-foreground">Related Calculators</h3>
                <div className="flex justify-center flex-wrap gap-2 mt-2">
                    <Button asChild variant="outline" size="sm">
                        <Link href="/statistics">Statistics Calculator</Link>
                    </Button>
                     <Button asChild variant="outline" size="sm">
                        <Link href="/statistics/standard-deviation">Standard Deviation Calculator</Link>
                    </Button>
                     <Button asChild variant="outline" size="sm">
                        <Link href="/statistics/sample-size">Sample Size Calculator</Link>
                    </Button>
                </div>
            </section>
        </div>
      </main>
    </div>
  );
}
