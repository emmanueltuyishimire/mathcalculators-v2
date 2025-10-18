import { PageHeader } from '@/components/page-header';
import UnitConverter from '@/components/calculators/unit-converter';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Unit Converter',
    description: 'A versatile unit converter for length, mass, temperature, and more. Quickly and accurately convert between different units of measurement.',
};

export default function ConverterPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Unit Converter" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-2xl">
          <UnitConverter />
        </div>
      </main>
    </div>
  );
}
