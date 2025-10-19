
import { PageHeader } from '@/components/page-header';
import FractionCalculators from '@/components/calculators/fraction-calculator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fraction Calculator',
  description: 'A collection of free fraction calculators for addition, subtraction, multiplication, division, simplification, and conversion between fractions and decimals.',
};

export default function FractionPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Fraction Calculator" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-2xl space-y-8">
            <section className="text-center">
                 <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                    Fraction Calculator
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Below are multiple fraction calculators capable of addition, subtraction, multiplication, division, simplification, and conversion between fractions and decimals. Fields above the solid black line represent the numerator, while fields below represent the denominator.
                </p>
            </section>
          <FractionCalculators />
        </div>
      </main>
    </div>
  );
}
