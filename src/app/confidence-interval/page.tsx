
import { PageHeader } from '@/components/page-header';
import ConfidenceIntervalCalculator from '@/components/calculators/confidence-interval-calculator';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
    title: 'Confidence Interval Calculator',
    description: 'Compute the confidence interval or margin of error, assuming the sample mean follows a normal distribution.',
};

const EducationalContent = () => (
    <Card>
        <CardHeader>
            <CardTitle>Understanding Confidence Intervals</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
            <p>A <strong>confidence interval</strong> is a range of values, derived from a statistical calculation, that is likely to contain the value of an unknown population parameter. It's a way of quantifying the uncertainty of an estimate.</p>
            <div>
                <h3 className="font-semibold text-foreground">Key Concepts:</h3>
                <ul className="list-disc list-inside space-y-1 mt-2">
                    <li><strong>Sample Mean (X̄):</strong> The average of your sample data. It's the center of your confidence interval.</li>
                    <li><strong>Standard Deviation (σ or s):</strong> A measure of the amount of variation or dispersion of a set of values.</li>
                    <li><strong>Sample Size (n):</strong> The number of observations in your sample. Larger samples lead to narrower, more precise confidence intervals.</li>
                    <li><strong>Confidence Level:</strong> The probability that the interval estimate will contain the true population parameter. Common levels are 90%, 95%, and 99%.</li>
                </ul>
            </div>
             <div>
                <h3 className="font-semibold text-foreground">Formula:</h3>
                <p className="font-mono bg-muted p-2 rounded-md my-2 text-center">Confidence Interval = X̄ ± (Z * (σ / √n))</p>
                <p>Where <strong>Z</strong> is the Z-score corresponding to the chosen confidence level, and <strong>(Z * (σ / √n))</strong> is the <strong>Margin of Error</strong>.</p>
            </div>
             <div>
                <h3 className="font-semibold text-foreground">How to Interpret a Confidence Interval:</h3>
                <p>If you have a 95% confidence interval of [18.7, 22.5] for a sample mean of 20.6, it means you are 95% confident that the true population mean falls somewhere between 18.7 and 22.5.</p>
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
                <div className="flex justify-center gap-4 mt-2">
                    <Link href="/statistics" className="text-primary hover:underline">Statistics Calculator</Link>
                    <Link href="/z-score" className="text-primary hover:underline">Z-Score Calculator</Link>
                </div>
            </section>
        </div>
      </main>
    </div>
  );
}
