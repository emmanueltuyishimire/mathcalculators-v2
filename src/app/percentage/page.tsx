
import { PageHeader } from '@/components/page-header';
import PercentageCalculator from '@/components/calculators/percentage-calculator';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata: Metadata = {
    title: 'Percentage Calculator',
    description: 'A versatile percentage calculator that helps you solve various percentage-based problems with ease. Calculate percentages, find what percentage one number is of another, and more.',
};

const EducationalContent = () => (
    <Card>
        <CardHeader>
            <CardTitle>Mastering Percentages: A Practical Guide</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground">
            <div>
                <h3 className="text-xl font-semibold text-foreground">What is a Percentage?</h3>
                <p className="mt-2">A percentage is a number or ratio expressed as a fraction of 100. It is often denoted using the percent sign, "%". For example, 45% is equivalent to the decimal 0.45, or the fraction 45/100.</p>
            </div>
             <div>
                <h3 className="text-xl font-semibold text-foreground">The Three Basic Percentage Problems</h3>
                <p className="mt-2">Most percentage problems can be broken down into three simple types, all of which our calculator handles:</p>
                <ol className="list-decimal list-inside space-y-2 mt-2">
                    <li><b>Finding a percentage of a number:</b> <span className="italic">What is X% of Y?</span><br />This is the most common type. For example, "What is 20% of 300?". The formula is: <code className="font-mono bg-muted p-1 rounded-md">(X / 100) * Y</code>.</li>
                    <li><b>Finding the percentage one number is of another:</b> <span className="italic">X is what % of Y?</span><br />This is used to determine a ratio. For example, "15 is what % of 50?". The formula is: <code className="font-mono bg-muted p-1 rounded-md">(X / Y) * 100</code>.</li>
                    <li><b>Finding the original number from a percentage:</b> <span className="italic">X is Y% of what?</span><br />This is useful for "reverse" calculations. For example, "20 is 40% of what number?". The formula is: <code className="font-mono bg-muted p-1 rounded-md">X / (Y / 100)</code>.</li>
                </ol>
            </div>
             <div>
                <h3 className="text-xl font-semibold text-foreground">Real-World Examples</h3>
                <ul className="list-disc list-inside space-y-2 mt-2">
                    <li><b>Shopping:</b> Calculating a discount. If a $50 shirt is 20% off, you save <code className="font-mono bg-muted p-1 rounded-md">(20/100) * 50 = $10</code>.</li>
                    <li><b>Finance:</b> Calculating interest. If you earn 5% interest on a $1,000 investment, you get <code className="font-mono bg-muted p-1 rounded-md">(5/100) * 1000 = $50</code> in interest.</li>
                    <li><b>Statistics:</b> Expressing a part of a whole. If 300 out of 500 people prefer a product, that's <code className="font-mono bg-muted p-1 rounded-md">(300/500) * 100 = 60%</code>.</li>
                </ul>
            </div>
        </CardContent>
    </Card>
);

export default function PercentagePage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Percentage Calculator" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-2xl space-y-8">
            <section className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                    Percentage Calculator
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    A collection of tools to help you with all your percentage calculation needs.
                </p>
            </section>
          
            <PercentageCalculator />

            <EducationalContent />
        </div>
      </main>
    </div>
  );
}
