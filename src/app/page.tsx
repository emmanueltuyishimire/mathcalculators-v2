import { PageHeader } from '@/components/page-header';
import BasicCalculator from '@/components/calculators/basic-calculator';

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Basic Arithmetic" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-4xl">
          <BasicCalculator />
        </div>
      </main>
    </div>
  );
}
