
import { PageHeader } from '@/components/page-header';
import ZScoreCalculator from '@/components/calculators/z-score-calculator';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ZTable } from '@/components/z-table';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

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
                    The z-score, also referred to as standard score, z-value, and normal score, among other things, is a dimensionless quantity that is used to indicate the signed, fractional, number of standard deviations by which an event is above the mean value being measured. Values above the mean have positive z-scores, while values below the mean have negative z-scores.
                </p>
                <p className="text-muted-foreground mt-2">
                    The z-score can be calculated by subtracting the population mean from the raw score, or data point in question (a test score, height, age, etc.), then dividing the difference by the population standard deviation:
                </p>
                <p className="font-mono bg-muted p-2 rounded-md my-2 text-center">
                    z = (x - μ) / σ
                </p>
                <p className="text-muted-foreground">
                    where x is the raw score, μ is the population mean, and σ is the population standard deviation. For a sample, the formula is similar, except that the sample mean and sample standard deviation are used.
                </p>
                <p className="text-muted-foreground mt-2">
                    The z-score has numerous applications and can be used to perform a z-test, calculate prediction intervals, process control applications, comparison of scores on different scales, and more.
                </p>
            </div>

            <Separator />

            <div>
                <h3 className="text-xl font-semibold text-foreground">What is a Z-Table?</h3>
                <p className="text-muted-foreground mt-2">
                    A z-table, also known as a standard normal table or unit normal table, is a table that consists of standardized values that are used to determine the probability that a given statistic is below, above, or between the standard normal distribution. A z-score of 0 indicates that the given point is identical to the mean. On the graph of the standard normal distribution, z = 0 is therefore the center of the curve. A positive z-value indicates that the point lies to the right of the mean, and a negative z-value indicates that the point lies left of the mean. There are a few different types of z-tables.
                </p>
                 <p className="text-muted-foreground mt-2">
                    The values in the table below represent the area between z = 0 and the given z-score.
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
                <div className="flex justify-center gap-4 mt-2">
                    <Link href="/statistics/standard-deviation" className="text-primary hover:underline">Standard Deviation Calculator</Link>
                    <Link href="/probability" className="text-primary hover:underline">Probability Calculator</Link>
                </div>
            </section>
        </div>
      </main>
    </div>
  );
}
