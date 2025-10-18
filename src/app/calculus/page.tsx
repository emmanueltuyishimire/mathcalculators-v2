import { PageHeader } from '@/components/page-header';
import CalculusCalculator from '@/components/calculators/calculus-calculator';

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
