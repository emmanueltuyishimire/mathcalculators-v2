
import { PageHeader } from '@/components/page-header';
import DestinyMatrixCalculator from '@/components/calculators/destiny-matrix-calculator';

export default function DestinyMatrixPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Destiny Matrix Calculator" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-2xl space-y-12">
            <section className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                    Destiny Matrix Calculator
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Discover your personality traits, strengths, and life path through the lens of numerology.
                </p>
            </section>
            
            <DestinyMatrixCalculator />

             <section className="space-y-8 text-muted-foreground">
                <h2 className="text-3xl font-bold text-foreground">How to Use the Destiny Matrix Calculator</h2>
                <p>Follow these steps to generate and understand your Destiny Matrix:</p>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-foreground">Step 1: Enter Your Birth Date</h3>
                    <p>Provide your full date of birth (Day, Month, Year). The calculator will use these numbers to derive key numerological insights.</p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-foreground">Step 2: Calculate Your Matrix</h3>
                    <p>Click the <strong>Calculate</strong> button. The tool will automatically process your birth date, calculate the core numbers, and arrange them into your personal Destiny Matrix.</p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-foreground">Step 3: Analyze the Results</h3>
                    <p>The calculator will display your Destiny Matrix and provide an interpretation based on the numbers present. Pay attention to:</p>
                    <ul className="list-disc list-inside pl-4 mt-2">
                        <li><strong>Key Numbers:</strong> Your Life Path Number and other core numbers that define your journey.</li>
                        <li><strong>Number Meanings:</strong> Each number has a specific meaning related to personality, challenges, and talents.</li>
                    </ul>
                  </div>
                </div>
            </section>
        </div>
      </main>
    </div>
  );
}
