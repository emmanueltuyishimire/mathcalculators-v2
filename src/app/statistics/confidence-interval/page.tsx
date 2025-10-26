
"use client";

import { PageHeader } from '@/components/page-header';
import ConfidenceIntervalCalculator from '@/components/calculators/confidence-interval-calculator';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

const EducationalContent = () => (
    <Card>
        <CardHeader>
            <CardTitle>Confidence Interval Guide: Logic, and Practical Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground">
            <p>A <strong>confidence interval (CI)</strong> provides a range of values that is likely to contain the true population parameter (like the mean) based on sample data. This guide explains how the calculator works.</p>
            
            <div>
                <h3 className="text-xl font-semibold text-foreground">1. Inputs Required</h3>
                <Table className="mt-2">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Input</TableHead>
                            <TableHead>Description</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>Sample Size (n)</TableCell>
                            <TableCell>Number of observations in the sample.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Sample Mean (X̄)</TableCell>
                            <TableCell>Average of the sample data.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Standard Deviation (σ or s)</TableCell>
                            <TableCell>Known population SD (σ) or sample SD (s) if n &gt; 30.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Confidence Level</TableCell>
                            <TableCell>Desired probability that the CI contains the true mean.</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-foreground">2. Calculator Logic</h3>
                <ol className="list-decimal list-inside space-y-4 mt-2">
                    <li>
                        <b>Identify Z-value:</b> A Z-score is chosen based on the confidence level (e.g., 1.96 for 95%).
                    </li>
                    <li>
                        <b>Calculate Standard Error (SE):</b> This measures the variability of the sample mean.
                        <p className="font-mono bg-muted p-2 rounded-md my-2 text-center">SE = σ / √n</p>
                    </li>
                    <li>
                        <b>Compute Margin of Error (ME):</b> This is how much you expect the sample mean to vary.
                         <p className="font-mono bg-muted p-2 rounded-md my-2 text-center">ME = Z × SE</p>
                    </li>
                    <li>
                        <b>Compute Confidence Interval:</b> This is the range around the sample mean.
                         <p className="font-mono bg-muted p-2 rounded-md my-2 text-center">CI = X̄ ± ME</p>
                         <p>The result is a lower and upper bound: [X̄ - ME, X̄ + ME].</p>
                    </li>
                </ol>
            </div>

             <div>
                <h3 className="text-xl font-semibold text-foreground">3. Practical Tips for Users</h3>
                <ul className="list-disc list-inside space-y-2 mt-2">
                    <li><b>Sample Size Matters:</b> Larger samples lead to narrower, more precise confidence intervals.</li>
                    <li><b>Confidence Level Trade-off:</b> A higher confidence level (e.g., 99%) results in a wider interval, while a lower level (e.g., 90%) gives a narrower one.</li>
                    <li><b>Interpreting CI Correctly:</b> A 95% confidence interval means that if you took many samples and built a confidence interval from each one, 95% of those intervals would contain the true population mean.</li>
                </ul>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-foreground">4. Example Scenario</h3>
                <p>For a sample size of 50, a mean of 20.6, a standard deviation of 3.2, and a 95% confidence level (Z = 1.96):</p>
                 <ul className="list-disc list-inside space-y-2 mt-2 font-mono bg-muted p-4 rounded-md">
                    <li>SE = 3.2 / √50 ≈ 0.452</li>
                    <li>ME = 1.960 × 0.452 ≈ 0.887</li>
                    <li>CI = 20.6 ± 0.887 → [19.713, 21.487]</li>
                </ul>
                <p className="mt-2"><b>Interpretation:</b> You can be 95% confident that the true population mean lies between 19.713 and 21.487.</p>
            </div>
        </CardContent>
    </Card>
);

export default function ConfidenceIntervalPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Confidence Interval Calculator" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-2xl space-y-8">
            <section className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Confidence Interval Calculator
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Use this calculator to compute the confidence interval or margin of error, assuming the sample mean most likely follows a normal distribution. Use the <Link href="/statistics/standard-deviation" className="text-primary hover:underline">Standard Deviation Calculator</Link> if you have raw data only.
                </p>
            </section>
            
            <ConfidenceIntervalCalculator />

            <EducationalContent />

            <section className="text-center text-sm text-muted-foreground">
                <h3 className="font-semibold text-foreground">Related Calculators</h3>
                <div className="flex justify-center flex-wrap gap-2 mt-2">
                    <Button asChild variant="outline" size="sm">
                        <Link href="/statistics">Statistics Calculator</Link>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                        <Link href="/statistics/z-score">Z-Score Calculator</Link>
                    </Button>
                </div>
            </section>
        </div>
      </main>
    </div>
  );
}
