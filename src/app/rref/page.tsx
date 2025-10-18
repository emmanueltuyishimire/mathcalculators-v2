import { PageHeader } from '@/components/page-header';
import RrefCalculator from '@/components/calculators/rref-calculator';

export default function RrefPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Augmented Matrix & RREF Calculator" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-4xl space-y-8">
            <section className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                    Augmented Matrix & RREF Calculator
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Solve systems of linear equations, find the row-reduced echelon form (RREF) of a matrix, and determine if a system has a unique, infinite, or no solution.
                </p>
            </section>

            <RrefCalculator />

            <section className="space-y-6 text-muted-foreground">
                <h2 className="text-3xl font-bold text-foreground">How to Use the RREF Calculator</h2>
                <ol className="list-decimal list-inside space-y-4">
                    <li>
                        <h3 className="inline font-semibold text-foreground">Set Matrix Dimensions:</h3>
                        <span> Select the number of rows (equations) and columns (variables + 1) for your augmented matrix [A|b].</span>
                    </li>
                    <li>
                        <h3 className="inline font-semibold text-foreground">Enter Coefficients:</h3>
                        <span> Input the coefficients of your linear equations into the grid. The last column is the constants vector 'b'.</span>
                    </li>
                    <li>
                        <h3 className="inline font-semibold text-foreground">Perform Calculations:</h3>
                         <ul className="list-disc list-inside pl-4 mt-2">
                             <li>Click <strong>RREF</strong> to automatically compute the row-reduced echelon form.</li>
                             <li>Use the manual row operation buttons (Swap, Scale, Add/Subtract) to perform transformations step-by-step.</li>
                        </ul>
                    </li>
                    <li>
                        <h3 className="inline font-semibold text-foreground">Analyze the Solution:</h3>
                         <span> The calculator will display the RREF of the matrix and interpret the solution (unique, infinite, or no solution).</span>
                    </li>
                </ol>
            </section>
        </div>
      </main>
    </div>
  );
}
