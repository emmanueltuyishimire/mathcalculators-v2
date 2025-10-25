
"use client";

import UnitConverter from '@/components/calculators/unit-converter';
import { PageHeader } from '@/components/page-header';

export default function UnitConverterPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Unit Converter" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-2xl space-y-8">
          <section className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Unit Converter
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              A simple tool to convert between various units of measurement.
            </p>
          </section>
          <UnitConverter />
        </div>
      </main>
    </div>
  );
}
