import { PageHeader } from '@/components/page-header';
import BasicCalculator from '@/components/calculators/basic-calculator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Basic Calculator',
  description: 'A simple and easy-to-use basic calculator for your everyday math needs. Perform addition, subtraction, multiplication, and division.',
};

export default function BasicPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Basic Calculator" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-md">
          <BasicCalculator />
        </div>
      </main>
    </div>
  );
}
