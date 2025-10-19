import { PageHeader } from '@/components/page-header';
import VolumeCalculator from '@/components/calculators/volume-calculator';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Volume Calculator',
    description: 'A list of volume calculators for several common shapes. Please fill in the corresponding fields and click the "Calculate" button.',
};

export default function VolumePage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Volume Calculator" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-4xl space-y-12">
            <section className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                    Volume Calculator
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    The following is a list of volume calculators for several common shapes. Please fill in the corresponding fields and click the "Calculate" button.
                </p>
            </section>
            
            <VolumeCalculator />

             <section className="text-center">
                <h2 className="text-2xl font-bold text-foreground">Related Calculators</h2>
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                    <Button asChild variant="outline">
                        <Link href="/geometry">Geometry Calculators</Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link href="/statistics/mean-median-mode">Mean, Median, Mode Calculator</Link>
                    </Button>
                </div>
            </section>
        </div>
      </main>
    </div>
  );
}
