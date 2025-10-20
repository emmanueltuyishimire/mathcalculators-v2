
"use client";

import { PageHeader } from '@/components/page-header';
import StandardDeviationCalculator from '@/components/calculators/standard-deviation-calculator';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

const EducationalContent = () => (
  <Card className="bg-muted/50">
    <CardContent className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">📖 What is Standard Deviation?</h2>
        <p className="text-muted-foreground">
          <b>Standard deviation (σ)</b> is a measure of how spread out numbers are in a dataset. It tells you how much the values deviate, on average, from the mean (average).
        </p>
        <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
            <li>A <b>low standard deviation</b> means that the data points are generally close to the mean.</li>
            <li>A <b>high standard deviation</b> means that the data points are spread out over a wider range.</li>
        </ul>
        <p className="text-muted-foreground mt-2">
          For example, in the dataset <code className="font-mono bg-background p-1 rounded-sm">2, 3, 4</code>, the values are close together, so the standard deviation is small. But in <code className="font-mono bg-background p-1 rounded-sm">2, 10, 18</code>, the values vary much more, leading to a higher standard deviation.
        </p>
      </div>

      <Separator />

      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">👥 Population vs. Sample</h2>
        <p className="text-muted-foreground">
            The calculator can compute the standard deviation for either a <b>population</b> or a <b>sample</b>. The difference lies in how the variance is calculated — specifically, whether we divide by <b>N</b> or <b>(N − 1)</b>.
        </p>
        
        <div className="mt-4 space-y-4">
            <div>
                <h3 className="text-xl font-semibold text-foreground">📊 Population Standard Deviation</h3>
                <p className="text-muted-foreground">
                    Use this when your dataset includes <b>every member</b> of the group or category you are analyzing.
                </p>
                <pre className="font-mono bg-background p-2 rounded-md mt-2 text-sm">σ = √[ Σ(xᵢ − μ)² / N ]</pre>
                <p className="text-muted-foreground mt-1">Here, we divide by <b>N</b> (the total number of data points).</p>
            </div>
            <div>
                <h3 className="text-xl font-semibold text-foreground">🧩 Sample Standard Deviation</h3>
                <p className="text-muted-foreground">
                    Use this when your dataset is a <b>sample</b> from a larger population — not the entire population itself.
                </p>
                <pre className="font-mono bg-background p-2 rounded-md mt-2 text-sm">s = √[ Σ(xᵢ − x̄)² / (N − 1) ]</pre>
                <p className="text-muted-foreground mt-1">
                    Here, we divide by <b>(N − 1)</b> instead of <b>N</b>. This small adjustment is called the <b>Bessel’s correction</b> and it helps make the result more accurate for limited sample sizes.
                </p>
            </div>
        </div>
      </div>

      <Separator />

      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">🧠 When to Choose Which</h2>
        <ul className="list-disc list-inside text-muted-foreground space-y-2">
          <li><b>Population:</b> You have data for the entire group (e.g., all students in a class).</li>
          <li><b>Sample:</b> You only have a portion of the data (e.g., 30 students out of 1,000 in a school).</li>
        </ul>
        <p className="text-muted-foreground mt-2">
            In most real-world cases, you’ll use the <b>Sample</b> option, since it’s often impractical to measure an entire population.
        </p>
      </div>
    </CardContent>
  </Card>
);

export default function StandardDeviationPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Standard Deviation Calculator" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-2xl space-y-8">
          <section className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Standard Deviation Calculator
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Please provide numbers separated by commas to calculate the standard deviation, variance, mean, sum, and margin of error.
            </p>
          </section>

          <StandardDeviationCalculator />

          <section className="space-y-6 text-muted-foreground">
            <h2 className="text-2xl font-bold text-foreground">How to Use the Standard Deviation Calculator</h2>
            <p>This calculator helps you compute standard deviation, variance, mean, sum, and margin of error from a list of numbers.</p>
            
            <div>
                <h3 className="text-xl font-semibold text-foreground">Step 1: Enter Your Numbers</h3>
                <p>Type or paste your data into the input box, separating each number with a comma.</p>
                <p className="font-mono bg-muted p-2 rounded-md my-2 text-center">10, 12, 23, 23, 16, 23, 21, 16</p>
                <p>You can enter as many numbers as you like — just make sure they’re separated by commas.</p>
            </div>
            
            <div>
                <h3 className="text-xl font-semibold text-foreground">Step 2: Choose Data Type</h3>
                <p>Select whether your numbers represent a:</p>
                <ul className="list-disc list-inside pl-4 mt-2">
                    <li><strong>Population</strong> — if you have data for everyone in the group.</li>
                    <li><strong>Sample</strong> — if your numbers are just a subset of a larger population.</li>
                </ul>
                <p>This affects the variance and standard deviation formulas.</p>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-foreground">Step 3: Read the Results</h3>
                <p>The calculator will instantly show all the computed values below.</p>
            </div>
            
             <div>
                <h3 className="text-xl font-semibold text-foreground">Step 4: Understand the Steps</h3>
                <p>The “Steps” section shows the formula and exact calculations used to get the variance and standard deviation — perfect if you want to check or learn the math behind it.</p>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-foreground">Step 5: Check the Margin of Error</h3>
                <p>Below the steps, you’ll see Margin of Error (Confidence Intervals) for various confidence levels (68%, 90%, 95%, etc.). This tells you how much your sample mean might differ from the true population mean.</p>
            </div>

             <div>
                <h3 className="text-xl font-semibold text-foreground">Step 6: Review the Frequency Table</h3>
                <p>Finally, the Frequency Table shows how many times each unique value appears in your data, along with its percentage share.</p>
            </div>
          </section>

          <EducationalContent />
          
          <section className="text-center text-sm text-muted-foreground">
            <h3 className="font-semibold text-foreground">Related</h3>
            <div className="flex justify-center flex-wrap gap-2 mt-2">
                <Button asChild variant="outline" size="sm">
                    <Link href="/statistics">Statistics Calculator</Link>
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
