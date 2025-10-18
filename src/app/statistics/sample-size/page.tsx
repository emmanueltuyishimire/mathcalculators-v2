
import { PageHeader } from '@/components/page-header';
import SampleSizeCalculator from '@/components/calculators/sample-size-calculator';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const HowToUseGuide = () => (
  <Card>
    <CardHeader>
      <CardTitle>How to Use the Sample Size Calculator</CardTitle>
    </CardHeader>
    <CardContent className="space-y-6">
      <p className="text-muted-foreground">
        This calculator helps you determine the minimum number of survey participants (sample size) needed to make reliable conclusions about a population.
      </p>

      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">🔹 Steps for Users</h3>
        <ol className="list-decimal list-inside space-y-4 text-muted-foreground">
          <li>
            <span className="font-semibold text-foreground">Select the Confidence Level:</span> The confidence level indicates how certain you are that your sample reflects the true population. Common options include 95% or 99%.
          </li>
          <li>
            <span className="font-semibold text-foreground">Enter the Margin of Error (%):</span> This is the maximum allowed difference between your sample estimate and the true population value. A 5% margin of error means your result will be within ±5% of the real value.
          </li>
          <li>
            <span className="font-semibold text-foreground">Enter the Population Proportion (%):</span> This is the expected proportion of the population with the attribute you are measuring. If unknown, 50% is the most conservative choice.
          </li>
          <li>
            <span className="font-semibold text-foreground">Enter the Population Size (optional):</span> If your population is finite (e.g., all employees in a company), enter the total number. Leave it blank for very large or unknown populations.
          </li>
           <li>
            <span className="font-semibold text-foreground">Click “Calculate”:</span> The required sample size will be displayed along with the parameters used.
          </li>
        </ol>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">🔹 Example</h3>
        <p className="text-muted-foreground">
          <b>Scenario:</b> You want to survey people in a large city to estimate the percentage who drink coffee daily.
        </p>
        <ul className="list-disc list-inside text-muted-foreground mt-2 pl-4">
            <li>Confidence Level: <b>95%</b></li>
            <li>Margin of Error: <b>5%</b></li>
            <li>Population Proportion: <b>50%</b> (since it's unknown)</li>
            <li>Population Size: <b>Unlimited</b></li>
        </ul>
        <p className="mt-2 p-2 bg-primary/10 text-primary-foreground rounded-md">
          <b>Result:</b> You would need to survey a minimum of <b>385</b> people.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">💡 User Tips</h3>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-start">
            <CheckCircle className="h-5 w-5 mr-2 mt-0.5 text-primary flex-shrink-0"/>
            A higher confidence level or smaller margin of error will require a larger sample size.
          </li>
          <li className="flex items-start">
            <CheckCircle className="h-5 w-5 mr-2 mt-0.5 text-primary flex-shrink-0"/>
            A population proportion of 50% requires the largest sample size, so it's a safe bet if you're unsure.
          </li>
           <li className="flex items-start">
            <CheckCircle className="h-5 w-5 mr-2 mt-0.5 text-primary flex-shrink-0"/>
            The calculator automatically uses a finite population correction if you provide a population size, which may reduce the required sample size.
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
              Calculate the minimum sample size required for your study based on confidence level, margin of error, and population size.
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
