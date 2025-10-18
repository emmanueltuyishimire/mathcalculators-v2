
import { PageHeader } from '@/components/page-header';
import MeanMedianModeCalculator from '@/components/calculators/mean-median-mode-calculator';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
    title: 'Mean, Median, Mode, Range Calculator',
    description: 'A free online calculator to find the mean, median, mode, and range from a set of numbers. Quick and easy to use for statistical analysis.',
};

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
