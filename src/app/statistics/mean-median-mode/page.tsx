
import { PageHeader } from '@/components/page-header';
import MeanMedianModeCalculator from '@/components/calculators/mean-median-mode-calculator';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const metadata: Metadata = {
    title: 'Mean, Median, Mode, Range Calculator',
    description: 'A free online calculator to find the mean, median, mode, and range from a set of numbers. Quick and easy to use for statistical analysis.',
};

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
            <CardTitle>Understanding Mean, Median, Mode, and Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
            <div>
                <h3 className="text-xl font-semibold text-foreground">What is the Mean?</h3>
                <p className="text-muted-foreground mt-1">The <strong>mean</strong> is the average of all numbers in the dataset. It's calculated by summing all the numbers and dividing by the count of numbers.</p>
                <p className="font-mono bg-muted p-2 rounded-md mt-2 text-sm">Mean = Sum of all numbers / Count of numbers</p>
            </div>
             <div>
                <h3 className="text-xl font-semibold text-foreground">What is the Median?</h3>
                <p className="text-muted-foreground mt-1">The <strong>median</strong> is the middle value in a dataset that has been sorted in ascending order. If the dataset has an even number of values, the median is the average of the two middle numbers.</p>
            </div>
             <div>
                <h3 className="text-xl font-semibold text-foreground">What is the Mode?</h3>
                <p className="text-muted-foreground mt-1">The <strong>mode</strong> is the number that appears most frequently in a dataset. A dataset can have one mode, more than one mode, or no mode at all.</p>
            </div>
             <div>
                <h3 className="text-xl font-semibold text-foreground">What is the Range?</h3>
                <p className="text-muted-foreground mt-1">The <strong>range</strong> is the difference between the highest and lowest values in a dataset. It provides a simple measure of the spread of the data.</p>
                 <p className="font-mono bg-muted p-2 rounded-md mt-2 text-sm">Range = Largest Value - Smallest Value</p>
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
                <div className="flex justify-center gap-4 mt-2">
                    <Link href="/statistics" className="text-primary hover:underline">Statistics Calculator</Link>
                    <Link href="/statistics/standard-deviation" className="text-primary hover:underline">Standard Deviation Calculator</Link>
                    <Link href="/statistics/sample-size" className="text-primary hover:underline">Sample Size Calculator</Link>
                </div>
            </section>
        </div>
      </main>
    </div>
  );
}
