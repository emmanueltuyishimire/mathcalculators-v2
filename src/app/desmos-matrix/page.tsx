import { PageHeader } from '@/components/page-header';
import DesmosMatrixCalculator from '@/components/calculators/desmos-matrix-calculator';

export default function DesmosMatrixPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Desmos Matrix Calculator" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-4xl">
          <DesmosMatrixCalculator />
        </div>
      </main>
    </div>
  );
}
