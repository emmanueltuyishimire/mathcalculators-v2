import { PageHeader } from '@/components/page-header';
import MatrixCalculator from '@/components/calculators/matrix-calculator';

export default function MatrixPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Matrix Calculator" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <MatrixCalculator />
        </div>
      </main>
    </div>
  );
}
