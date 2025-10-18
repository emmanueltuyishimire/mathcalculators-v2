import { PageHeader } from '@/components/page-header';
import CalculusCalculator from '@/components/calculators/calculus-calculator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Calculus Calculator',
  description: 'Solve calculus problems including derivatives, integrals, and limits with our powerful online calculator. Supports a wide range of functions.',
};

export default function CalculusPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Calculus" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-2xl">
          <CalculusCalculator />
        </div>
      </main>
    </div>
  );
}
