import { PageHeader } from '@/components/page-header';
import ProbabilityCalculator from '@/components/calculators/probability-calculator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Probability Calculator',
    description: 'Calculate probabilities for two events, series of events, and normal distributions.',
};

export default function ProbabilityPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Probability Calculator" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-2xl space-y-8">
            <section className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Probability Calculator
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Tools for calculating two-event probabilities, series of independent events, and normal distribution probabilities.
                </p>
            </section>
            <ProbabilityCalculator />
        </div>
      </main>
    </div>
  );
}
