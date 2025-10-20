
"use client";

import { PageHeader } from '@/components/page-header';
import ZScoreCalculator from '@/components/calculators/z-score-calculator';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ZTable } from '@/components/z-table';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
    title: 'Z-Score Calculator',
    description: 'Calculate z-scores, convert between z-scores and probabilities, and find probabilities between two z-scores.',
};

const EducationalContent = () => (
    <Card>
        <CardHeader>
            <CardTitle>Understanding Z-Scores</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
            <div>
                <h3 className="text-xl font-semibold text-foreground">What is a Z-score?</h3>
                <p className="text-muted-foreground mt-2">
                    A z-score, often called a standard score, is a statistical measure that tells you how far a specific data point is from the average (or mean) of its dataset, measured in units of standard deviation. It is a dimensionless value, meaning it allows for the comparison of scores from different distributions.
                </p>
                <p className="text-muted-foreground mt-2">
                    If a z-score is positive, it means the data point is above the mean. If it's negative, the data point is below the mean. A z-score of zero indicates the data point is exactly the mean.
                </p>
                <p className="font-mono bg-muted p-2 rounded-md my-2 text-center">
                    z = (x - μ) / σ
                </p>
                <p className="text-muted-foreground">
                    In this formula, <b>x</b> is the individual data point (like a test score or height), <b>μ</b> is the mean of the population, and <b>σ</b> is the standard deviation of the population. When working with a sample instead of an entire population, the sample mean and sample standard deviation are used.
                </p>
                <p className="text-muted-foreground mt-2">
                    Z-scores are incredibly versatile and are used for many purposes, including z-tests, creating prediction intervals, and comparing values across different scales.
                </p>
            </div>

            <Separator />

            <div>
                <h3 className="text-xl font-semibold text-foreground">Introduction to the Z-Table</h3>
                <p className="text-muted-foreground mt-2">
                    A Z-Table, also called a standard normal table, is a statistical tool used to determine the probability that a score in a normal distribution is below, above, or between specific values. It is based on the standard normal distribution, which has a mean of 0 and a standard deviation of 1.
                </p>
                 <p className="text-muted-foreground mt-2">
                    The Z-Table allows you to convert a z-score into a cumulative probability. A z-score represents how many standard deviations a value is from the mean. By referencing the Z-Table, you can quickly find the probability of a value occurring within a certain range of the normal distribution without performing complex calculations.
                </p>
                <h4 className="font-semibold text-foreground mt-4">Key Points About Z-Tables:</h4>
                <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                    <li><b>Standardized Values:</b> All z-scores are based on a distribution with μ = 0 and σ = 1.</li>
                    <li><b>Cumulative Probability:</b> Most tables show the probability that a value is less than or equal to a given z-score (P(x &lt; Z)).</li>
                    <li><b>Applications:</b> Z-Tables are widely used in statistics, quality control, hypothesis testing, and confidence interval calculations.</li>
                    <li><b>Flexibility:</b> By symmetry, negative z-scores can be converted into probabilities for positive z-scores.</li>
                </ul>
                <h4 className="font-semibold text-foreground mt-4">Example Use Case:</h4>
                <p className="text-muted-foreground mt-2">
                    If a student scores a z = 1.5 on a test, the Z-Table can tell you the percentage of students who scored below that value, helping you understand relative performance in a standardized way.
                </p>
            </div>
        </CardContent>
    </Card>
);

export default function ZScorePage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Z-Score Calculator" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-4xl space-y-8">
            <section className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Z-Score Calculator
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Compute z-scores, convert between z-scores and probabilities, and find probabilities between two z-scores.
                </p>
            </section>
            
            <ZScoreCalculator />

            <EducationalContent />

            <section className="space-y-4">
                <h2 className="text-3xl font-bold text-center">Z-Table (0 to Z)</h2>
                <p className="text-lg text-muted-foreground text-center">
                    The values in the table below represent the area between z = 0 and the given z-score.
                </p>
                <ZTable />
                 <Card>
                    <CardHeader>
                      <CardTitle>How to Use the Z-Table</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                      <div>
                        <h3 className="font-semibold text-foreground">1. Find Your Z-Score</h3>
                        <p>Your Z-score should be in the format `X.Y` (e.g., 1.23). The row indicates the integer and first decimal place (e.g., `1.2`), and the column gives the second decimal place (e.g., `0.03`).</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">2. Locate the Value in the Table</h3>
                        <p>Find the row for `1.2` and the column for `0.03`. The intersecting cell contains the area, which is `0.39065`.</p>
                      </div>
                       <div>
                        <h3 className="font-semibold text-foreground">3. Interpret the Area</h3>
                        <p>The value `0.39065` means there is a 39.07% probability of a random variable falling between the mean (0) and a Z-score of 1.23.</p>
                      </div>
                    </CardContent>
                </Card>
            </section>
            
            <section className="text-center text-sm text-muted-foreground">
                <h3 className="font-semibold text-foreground">Related Calculators</h3>
                <div className="flex justify-center flex-wrap gap-2 mt-2">
                    <Button asChild variant="outline" size="sm">
                        <Link href="/statistics/standard-deviation">Standard Deviation Calculator</Link>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                        <Link href="/statistics/probability">Probability Calculator</Link>
                    </Button>
                </div>
            </section>
        </div>
      </main>
    </div>
  );
}
