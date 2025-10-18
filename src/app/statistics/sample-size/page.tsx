
import { PageHeader } from '@/components/page-header';
import SampleSizeCalculator from '@/components/calculators/sample-size-calculator';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const HowToUseGuide = () => (
  <Card>
    <CardHeader>
      <CardTitle>How to Use the Sample Size & Margin of Error Calculator</CardTitle>
    </CardHeader>
    <CardContent className="space-y-6">
      <p className="text-muted-foreground">
        This tool helps you determine either the minimum sample size for a desired margin of error, or the margin of error for a given sample size.
      </p>

      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">🔹 To Find Sample Size</h3>
        <ol className="list-decimal list-inside space-y-4 text-muted-foreground">
          <li>
            <span className="font-semibold text-foreground">Leave the "Sample Size" field blank.</span>
          </li>
          <li>
            <span className="font-semibold text-foreground">Enter the desired Margin of Error (%).</span>
          </li>
          <li>
            <span className="font-semibold text-foreground">Select a Confidence Level</span> (e.g., 95%).
          </li>
          <li>
            <span className="font-semibold text-foreground">Enter the Population Proportion (%)</span> (use 50% if unsure).
          </li>
          <li>
            <span className="font-semibold text-foreground">Optionally, enter the Population Size</span> if it's a small, known group.
          </li>
          <li>
            <span className="font-semibold text-foreground">Click "Calculate".</span> The required sample size will be displayed.
          </li>
        </ol>
      </div>

       <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">🔹 To Find Margin of Error</h3>
        <ol className="list-decimal list-inside space-y-4 text-muted-foreground">
           <li>
            <span className="font-semibold text-foreground">Leave the "Margin of Error" field blank.</span>
          </li>
          <li>
            <span className="font-semibold text-foreground">Enter your Sample Size.</span>
          </li>
          <li>
            <span className="font-semibold text-foreground">Select a Confidence Level.</span>
          </li>
           <li>
            <span className="font-semibold text-foreground">Enter the Population Proportion.</span>
          </li>
          <li>
            <span className="font-semibold text-foreground">Optionally, enter the Population Size.</span>
          </li>
          <li>
            <span className="font-semibold text-foreground">Click "Calculate".</span> The resulting margin of error will be displayed.
          </li>
        </ol>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">💡 User Tips</h3>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-start">
            <CheckCircle className="h-5 w-5 mr-2 mt-0.5 text-primary flex-shrink-0"/>
            The calculator will solve for the empty field (either sample size or margin of error).
          </li>
          <li className="flex items-start">
            <CheckCircle className="h-5 w-5 mr-2 mt-0.5 text-primary flex-shrink-0"/>
            A higher confidence level or smaller margin of error requires a larger sample size.
          </li>
          <li className="flex items-start">
            <CheckCircle className="h-5 w-5 mr-2 mt-0.5 text-primary flex-shrink-0"/>
            A population proportion of 50% is the most conservative choice for sample size calculation.
          </li>
        </ul>
      </div>
    </CardContent>
  </Card>
);

const EducationalContent = () => (
    <Card>
        <CardHeader>
            <CardTitle>Understanding Sample Size and Margin of Error</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">🧠 What Is Sample Size?</h3>
                <p className="text-muted-foreground">
                    Sample size (n) is the number of individuals or observations you need to survey or study to make reliable inferences about a population. It ensures your estimates are statistically accurate while minimizing wasted effort or resources.
                </p>
                <p className="text-muted-foreground mt-2"><b>Why it matters:</b> Too small a sample may produce misleading results; too large may waste time or money.</p>
            </div>
            <Separator />
            <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">🔹 What Is Margin of Error?</h3>
                <p className="text-muted-foreground">
                    The margin of error (ε) measures the expected difference between the sample estimate and the true population value. A smaller margin of error means more precise results.
                </p>
                <p className="text-muted-foreground mt-2">
                    <b>Example:</b> A survey reports 60% of people like coffee ±5% → the true population proportion is likely between 55% and 65%.
                </p>
            </div>
            <Separator />
            <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">🔹 Sample Size Formula (Simplified)</h3>
                <p className="text-muted-foreground">For unlimited population:</p>
                <pre className="font-mono bg-muted p-2 rounded-md mt-2 text-sm">n = (z² * p * (1-p)) / ε²</pre>
                <p className="text-muted-foreground mt-4">For finite population:</p>
                <pre className="font-mono bg-muted p-2 rounded-md mt-2 text-sm">n_adj = (N * n) / (N + n - 1)</pre>
                <p className="text-muted-foreground mt-2">Where n is the sample size for unlimited population, and N is the population size.</p>
            </div>
             <Separator />
            <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">🔹 Why Use This Calculator?</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Saves time and prevents over- or under-sampling.</li>
                    <li>Ensures statistically valid results.</li>
                    <li>Helps in survey planning, experiments, and polls.</li>
                    <li>Guides decision-making in marketing, research, education, and social studies.</li>
                </ul>
            </div>
             <Separator />
            <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">🧩 Fun Fact</h3>
                <p className="text-muted-foreground">
                    The concept of sample size comes from the Central Limit Theorem, which ensures that with enough observations, the sample mean will approximate the population mean, regardless of the population's distribution.
                </p>
            </div>
        </CardContent>
    </Card>
)

export default function SampleSizePage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Sample Size Calculator" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-2xl space-y-8">
          <section className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Sample Size Calculator
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Calculate the minimum sample size required for your study based on confidence level, margin of error, and population size. Or, find the margin of error for a given sample size.
            </p>
          </section>

          <SampleSizeCalculator />

          <HowToUseGuide />

          <EducationalContent />

          <section className="text-center text-sm text-muted-foreground">
            <h3 className="font-semibold text-foreground">Related</h3>
            <div className="flex justify-center gap-4 mt-2">
                <Link href="/statistics" className="text-primary hover:underline">Statistics Calculator</Link>
                <Link href="/statistics/standard-deviation" className="text-primary hover:underline">Standard Deviation Calculator</Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
