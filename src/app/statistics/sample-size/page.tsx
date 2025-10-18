
import { PageHeader } from '@/components/page-header';
import SampleSizeCalculator from '@/components/calculators/sample-size-calculator';
import Link from 'next/link';

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
