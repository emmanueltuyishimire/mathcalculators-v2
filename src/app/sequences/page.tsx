
import { PageHeader } from '@/components/page-header';
import SequenceCalculators from '@/components/calculators/sequence-calculator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const HowToUse = () => (
    <Card>
        <CardHeader>
            <CardTitle>How to Use the Sequence Calculators</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
            <p className="text-muted-foreground">
                These calculators help you find specific terms and sums of Arithmetic, Geometric, and Fibonacci sequences. Follow the steps below depending on which calculator you’re using.
            </p>

            <div className="space-y-4">
                <h3 className="text-xl font-semibold">🔹 Arithmetic Sequence Calculator</h3>
                <p className="font-mono text-sm bg-muted p-2 rounded-md">aₙ = a₁ + f × (n − 1)</p>
                <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    <li><b>Enter the first number (a₁):</b> The starting term of your sequence. (e.g., 2)</li>
                    <li><b>Enter the common difference (f):</b> How much each term increases or decreases. (e.g., 5 for a sequence like 2, 7, 12, 17, …)</li>
                    <li><b>Enter which term (n) you want to find.</b> (e.g., 20)</li>
                    <li>Click <b>Calculate</b>.</li>
                </ol>
                <p className="text-muted-foreground">The calculator will display the nth term (aₙ) and the sum of the first n terms (Sₙ).</p>
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-semibold">🔹 Geometric Sequence Calculator</h3>
                <p className="font-mono text-sm bg-muted p-2 rounded-md">aₙ = a × rⁿ⁻¹</p>
                 <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    <li><b>Enter the first number (a):</b> The starting term. (e.g., 2)</li>
                    <li><b>Enter the common ratio (r):</b> The number you multiply each term by. (e.g., 5 for a sequence like 2, 10, 50, 250, …)</li>
                    <li><b>Enter which term (n) you want to find.</b> (e.g., 12)</li>
                    <li>Click <b>Calculate</b>.</li>
                </ol>
                <p className="text-muted-foreground">You’ll see the nth term (aₙ) and the sum of the first n terms (Sₙ).</p>
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-semibold">🔹 Fibonacci Sequence Calculator</h3>
                <p className="font-mono text-sm bg-muted p-2 rounded-md">a₀ = 0, a₁ = 1, aₙ = aₙ₋₁ + aₙ₋₂</p>
                 <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    <li><b>Enter which Fibonacci term (n) you want to find.</b> (e.g., 10)</li>
                    <li>Click <b>Calculate</b>.</li>
                </ol>
                <p className="text-muted-foreground">The calculator will show the nth Fibonacci number and the sequence up to that term.</p>
            </div>
            
            <div className="p-4 bg-accent/10 rounded-lg">
                <h4 className="font-semibold text-accent-foreground">💡 Tips for Users</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground mt-2">
                    <li>Use <b>Arithmetic</b> when the difference between terms is constant.</li>
                    <li>Use <b>Geometric</b> when each term is multiplied by the same number.</li>
                    <li>Use <b>Fibonacci</b> when each term is the sum of the two before it.</li>
                    <li>You can use decimal or negative numbers too — the formulas still work.</li>
                </ul>
            </div>
        </CardContent>
    </Card>
);

export default function SequencesPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Sequence Calculators" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-4xl space-y-12">
            <section className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                    Number Sequence Calculators
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    In mathematics, a <b>sequence</b> is an ordered list of numbers that follow a particular pattern. The individual elements in a sequence are called <b>terms</b>, and the number of terms is called its <b>length</b>. Sequences can be finite or infinite and are essential in many areas of math such as algebra, calculus, and analysis.
                </p>
            </section>
            
            <SequenceCalculators />

            <HowToUse />
        </div>
      </main>
    </div>
  );
}
