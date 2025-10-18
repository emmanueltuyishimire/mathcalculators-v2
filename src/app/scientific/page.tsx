import { PageHeader } from '@/components/page-header';
import ScientificCalculator from '@/components/calculators/scientific-calculator';

export default function ScientificPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Scientific Calculator" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-2xl">
          <ScientificCalculator />
        </div>
      </main>
    </div>
  );
}
