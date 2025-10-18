
import { PageHeader } from '@/components/page-header';
import StandardDeviationCalculator from '@/components/calculators/standard-deviation-calculator';
import Link from 'next/link';

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
          
          <section className="text-center text-sm text-muted-foreground">
            <h3 className="font-semibold text-foreground">Related</h3>
            <div className="flex justify-center gap-4 mt-2">
                <Link href="/statistics" className="text-primary hover:underline">Statistics Calculator</Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
