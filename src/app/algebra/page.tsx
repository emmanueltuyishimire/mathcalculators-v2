import { PageHeader } from '@/components/page-header';
import AlgebraCalculator from '@/components/calculators/algebra-calculator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Algebra Calculator',
  description: 'Solve linear equations with our easy-to-use algebra calculator. Enter your equation and get the solution for x instantly.',
};

export default function AlgebraPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Algebra" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-2xl">
          <AlgebraCalculator />
        </div>
      </main>
    </div>
  );
}
