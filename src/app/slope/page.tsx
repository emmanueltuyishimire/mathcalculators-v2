'use client';
import { PageHeader } from '@/components/page-header';
import SlopeCalculator from '@/components/calculators/slope-calculator';
import { HowToUseGuide, EducationalContent } from '@/components/slope-page-content';

export default function SlopePage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Slope Calculator" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-2xl space-y-8">
          <section className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Dynamic Slope Calculator
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              By definition, the slope or gradient of a line describes its steepness, incline, or grade.
            </p>
          </section>
          <SlopeCalculator />
          <HowToUseGuide />
          <EducationalContent />
        </div>
      </main>
    </div>
  );
}
