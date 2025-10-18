
import { PageHeader } from '@/components/page-header';
import PermutationCombinationCalculator from '@/components/calculators/permutation-combination-calculator';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Permutation and Combination Calculator',
    description: 'A free online calculator to compute permutations (nPr) and combinations (nCr) from a set of numbers. Includes formulas and step-by-step explanations.',
};


export default function PermutationCombinationPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Permutation and Combination Calculator" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-2xl space-y-8">
            <section className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Permutation & Combination Calculator
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Modify the values and click the calculate button to find the number of permutations and combinations.
                </p>
            </section>

            <PermutationCombinationCalculator />

            <section className="text-center text-sm text-muted-foreground">
                <h3 className="font-semibold text-foreground">Related Calculators</h3>
                <div className="flex justify-center gap-4 mt-2">
                    <Link href="/probability" className="text-primary hover:underline">Probability Calculator</Link>
                    <Link href="/statistics/sample-size" className="text-primary hover:underline">Sample Size Calculator</Link>
                </div>
            </section>
        </div>
      </main>
    </div>
  );
}
