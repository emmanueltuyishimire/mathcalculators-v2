
import { PageHeader } from '@/components/page-header';
import UnitConverter from '@/components/calculators/unit-converter';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Unit Converter',
    description: 'A versatile unit converter for length, mass, temperature, and more. Quickly and accurately convert between different units of measurement.',
};

const HowToUseGuide = () => (
    <Card>
        <CardHeader>
            <CardTitle>How to Use the Unit Converter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
            <ol className="list-decimal list-inside space-y-2">
                <li>
                    <strong>Select a Category:</strong> Choose the type of measurement you want to convert (e.g., Length, Mass, Temperature).
                </li>
                <li>
                    <strong>Enter a Value:</strong> Type the number you want to convert into the "From" input field.
                </li>
                <li>
                    <strong>Choose Your Units:</strong>
                     <ul className="list-disc list-inside pl-6 mt-1">
                        <li>Select the starting unit from the "From" dropdown menu.</li>
                        <li>Select the target unit from the "To" dropdown menu.</li>
                    </ul>
                </li>
                <li>
                    <strong>View the Result:</strong> The converted value will automatically appear in the "To" field.
                </li>
                <li>
                    <strong>Swap Units:</strong> Click the arrow button to quickly swap the "From" and "To" units.
                </li>
            </ol>
        </CardContent>
    </Card>
);

export default function ConverterPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Unit Converter" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-2xl space-y-8">
          <UnitConverter />
          <HowToUseGuide />
            <section className="text-center">
                <h2 className="text-2xl font-bold text-foreground">Related Calculators</h2>
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                    <Button asChild variant="outline">
                        <Link href="/basic">Basic Calculators</Link>
                    </Button>
                </div>
            </section>
        </div>
      </main>
    </div>
  );
}
