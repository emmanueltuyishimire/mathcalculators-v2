
import { PageHeader } from '@/components/page-header';
import AlgebraCalculator from '@/components/calculators/algebra-calculator';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Algebra Calculator',
  description: 'Solve linear equations with our easy-to-use algebra calculator. Enter your equation and get the solution for x instantly.',
};

const HowToUseGuide = () => (
    <Card>
        <CardHeader>
            <CardTitle>How to Use the Algebra Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
            <ol className="list-decimal list-inside space-y-2">
                <li>
                    <strong>Enter the Equation:</strong> Type a simple linear equation into the input field (e.g., <code className="font-mono bg-muted p-1 rounded-md">3x - 5 = 16</code>).
                </li>
                <li>
                    <strong>Solve for x:</strong> Click the "Solve for x" button to compute the solution.
                </li>
                <li>
                    <strong>View the Result:</strong> The calculator will display the value of 'x' in the result section below.
                </li>
            </ol>
            <div className="p-4 bg-accent/50 rounded-lg">
                <h4 className="font-semibold text-accent-foreground">💡 Tip</h4>
                <p className="text-sm text-muted-foreground mt-2">This calculator is designed for basic linear equations. For more complex problems, ensure your equation is in a simple format.</p>
            </div>
        </CardContent>
    </Card>
);

export default function AlgebraPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Algebra" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-2xl space-y-8">
          <AlgebraCalculator />
          <HowToUseGuide />
        </div>
      </main>
    </div>
  );
}
