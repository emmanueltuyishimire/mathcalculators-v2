
import HalfLifeCalculator from '@/components/calculators/half-life-calculator';
import { PageHeader } from '@/components/page-header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Half-Life Calculator',
  description: 'Calculate half-life, initial quantity, remaining quantity, or time elapsed. Also convert between half-life, mean lifetime, and decay constant.',
};

export default function HalfLifePage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Half-Life Calculator" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-2xl space-y-8">
            <section className="text-center">
                 <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                    Half-Life Calculator
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                   The following tools can generate any one of the values from the other three in the half-life formula for a substance undergoing decay to decrease by half.
                </p>
            </section>
          <HalfLifeCalculator />
        </div>
      </main>
    </div>
  );
}
