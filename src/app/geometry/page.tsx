import { PageHeader } from '@/components/page-header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Geometry Calculators',
  description: 'A comprehensive set of geometry calculators for calculating area, volume, and other geometric properties. Coming soon!',
};

export default function GeometryPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Geometry" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Geometry Calculators Coming Soon
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
                We are working hard to bring you a comprehensive set of geometry calculators. Please check back later!
            </p>
        </div>
      </main>
    </div>
  );
}
