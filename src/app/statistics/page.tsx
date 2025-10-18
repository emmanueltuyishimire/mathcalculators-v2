import { PageHeader } from '@/components/page-header';
import StatisticsCalculator from '@/components/calculators/statistics-calculator';

export default function StatisticsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Statistics" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-2xl">
          <StatisticsCalculator />
        </div>
      </main>
    </div>
  );
}
