
"use client";

import { PageHeader } from '@/components/page-header';
import RrefCalculator from '@/components/calculators/rref-calculator';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'RREF Calculator',
    description: 'An online calculator to solve systems of linear equations using an augmented matrix and computing the Reduced Row Echelon Form (RREF). Includes step-by-step options.',
};


export default function RrefPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Augmented Matrix & RREF Calculator" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-4xl space-y-12">
            <section className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                    Augmented Matrix & RREF Calculator – Solve Linear Systems Online
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Our Augmented Matrix & RREF Calculator is a powerful online tool for solving systems of linear equations quickly and accurately. Whether you are a student learning linear algebra, an engineer, or a math enthusiast, this calculator lets you input augmented matrices, perform row operations, compute RREF, and find solutions with ease.
                </p>
                <p className="mt-2 text-lg text-muted-foreground">
                    It’s free, responsive, and easy to use on both desktop and mobile devices.
                </p>
            </section>

            <RrefCalculator />

            <section className="space-y-8 text-muted-foreground">
                <h2 className="text-3xl font-bold text-foreground">How to Use the Augmented Matrix & RREF Calculator</h2>
                <div className="space-y-6">
                    <div>
                        <h3 className="text-2xl font-semibold text-foreground">Step 1: Input Your Matrix</h3>
                        <p>Enter the coefficient matrix (A) and constants column (b) in the augmented matrix [A|b].</p>
                        <p>Select the number of rows and columns.</p>
                        <p>Quick-fill options:</p>
                        <ul className="list-disc list-inside pl-4 mt-2">
                            <li><strong>Clear All / 0 All</strong> → reset matrix</li>
                            <li><strong>1 All</strong> → fill all cells with 1</li>
                            <li><strong>Random</strong> → fill with random numbers for practice</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold text-foreground">Step 2: Perform Row Operations (Optional)</h3>
                         <ul className="list-disc list-inside pl-4 mt-2">
                             <li><strong>Swap Rows (Ri ↔ Rj)</strong> → exchange two rows</li>
                             <li><strong>Multiply Row (k*Ri)</strong> → scale a row by a number</li>
                             <li><strong>Add/Subtract Rows (Ri ± k*Rj)</strong> → standard row operations for elimination</li>
                        </ul>
                         <p className="p-4 bg-accent/10 text-accent-foreground rounded-md mt-2">
                            <strong>Tip:</strong> Step-by-step row operations are helpful for learning linear algebra and understanding how RREF is derived.
                        </p>
                    </div>
                     <div>
                        <h3 className="text-2xl font-semibold text-foreground">Step 3: Compute RREF</h3>
                        <p>Click the <strong>RREF</strong> button to automatically convert the augmented matrix into reduced row echelon form.</p>
                        <p>The calculator uses the Gauss-Jordan elimination algorithm, which:</p>
                        <ul className="list-disc list-inside pl-4 mt-2">
                            <li>Identifies pivot positions</li>
                            <li>Scales pivot rows to 1</li>
                            <li>Eliminates all other entries in pivot columns</li>
                        </ul>
                    </div>
                     <div>
                        <h3 className="text-2xl font-semibold text-foreground">Step 4: Extract the Solution</h3>
                        <p>After RREF, the calculator determines the type of solution:</p>
                        <ul className="list-disc list-inside pl-4 mt-2">
                           <li><strong>Unique solution:</strong> Each variable has a pivot → [x1, x2, …, xn]</li>
                           <li><strong>Infinite solutions:</strong> Some variables are free → parametric form</li>
                           <li><strong>No solution:</strong> System is inconsistent → row with [0 … 0 | b ≠ 0]</li>
                        </ul>
                        <p className="p-4 bg-accent/10 text-accent-foreground rounded-md mt-2">
                            <strong>Tip:</strong> Verify your solution by plugging values back into the original equations.
                        </p>
                    </div>
                </div>

                <h2 className="text-3xl font-bold text-foreground">Examples</h2>
                <div className="space-y-4">
                    <div>
                        <h4 className="font-semibold text-xl">Example 1: Unique Solution</h4>
                        <p className="font-mono bg-muted p-2 rounded-md">Matrix A: [[2, 1], [1, -1]], Matrix b: [[5], [1]]</p>
                        <p className="font-mono bg-muted p-2 rounded-md mt-1">RREF: [[1, 0 | 2], [0, 1 | 1]]</p>
                        <p className="font-mono bg-muted p-2 rounded-md mt-1">Solution: x = 2, y = 1</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-xl">Example 2: Infinite Solutions</h4>
                        <p className="font-mono bg-muted p-2 rounded-md">Matrix A: [[1, 2, -1], [2, 4, -2]], Matrix b: [[3], [6]]</p>
                        <p className="font-mono bg-muted p-2 rounded-md mt-1">RREF: [[1, 2, -1 | 3], [0, 0, 0 | 0]]</p>
                        <p className="font-mono bg-muted p-2 rounded-md mt-1">Solution: Parametric form with free variable z</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-xl">Example 3: No Solution</h4>
                        <p className="font-mono bg-muted p-2 rounded-md">Matrix A: [[1, 1], [2, 2]], Matrix b: [[3], [5]]</p>
                        <p className="font-mono bg-muted p-2 rounded-md mt-1">RREF: [[1, 1 | 3], [0, 0 | 1]]</p>
                        <p className="font-mono bg-muted p-2 rounded-md mt-1">Solution: No solution (inconsistent system)</p>
                    </div>
                </div>

                <h2 className="text-3xl font-bold text-foreground">Actionable Tips for Users</h2>
                <ul className="list-disc list-inside space-y-2">
                    <li>Always check dimensions before performing operations.</li>
                    <li>Use step-by-step mode to learn manual row operations.</li>
                    <li>Start small with 2x2 or 3x3 matrices to understand the process.</li>
                    <li>Verify your solution by substituting it back into the original equations.</li>
                    <li>Use free/random fill options to practice multiple systems quickly.</li>
                    <li>For other matrix operations, try our main <Link href="/matrix/calculator" className="text-primary hover:underline">Matrix Calculator</Link>.</li>
                </ul>
                
                <h2 className="text-3xl font-bold text-foreground">FAQs – Augmented Matrix & RREF Calculator</h2>
                <div className="space-y-4">
                    <div>
                        <h4 className="font-semibold text-xl">Q1: What is an augmented matrix?</h4>
                        <p>An augmented matrix combines the coefficient matrix and constants column from a system of linear equations, making it easier to perform elimination and find solutions.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-xl">Q2: What is RREF?</h4>
                        <p>RREF stands for Reduced Row Echelon Form. It is a simplified form of a matrix where:</p>
                        <ul className="list-disc list-inside pl-4 mt-2">
                            <li>Each pivot = 1</li>
                            <li>Pivot columns have zeros elsewhere</li>
                            <li>Solutions can be easily read from the matrix</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-xl">Q3: Can this calculator handle any size matrix?</h4>
                        <p>Yes! You can input any m × n augmented matrix supported by your device/browser.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-xl">Q4: How do I know if a system has infinite or no solutions?</h4>
                        <ul className="list-disc list-inside pl-4 mt-2">
                            <li><strong>Infinite solutions:</strong> At least one free variable (column without a pivot)</li>
                            <li><strong>No solution:</strong> Row reduces to [0 … 0 | b ≠ 0]</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-xl">Q5: Is this tool free?</h4>
                        <p>Absolutely! You can use it online for free, without downloading or signing up.</p>
                    </div>
                </div>
                
                <div className="p-4 bg-primary/10 text-primary-foreground rounded-md">
                    <h3 className="font-bold text-lg">✅ Pro Tip:</h3>
                    <p>Combine manual row operations with automatic RREF calculation to learn linear algebra concepts while getting fast results. This tool is ideal for students, teachers, and professionals alike.</p>
                </div>
            </section>
        </div>
      </main>
    </div>
  );
}
