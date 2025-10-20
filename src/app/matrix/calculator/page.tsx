
"use client";

import Link from 'next/link';
import MatrixCalculator from '@/components/calculators/matrix-calculator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Matrix Calculator',
    description: 'A powerful online matrix calculator for students and professionals. Perform addition, multiplication, transpose, inverse, and determinant calculations with ease.',
};

export default function MatrixCalculatorPage() {
  return (
    <div className="flex flex-1 flex-col">
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl space-y-12">
            <section className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                    Matrix Calculator – Tips, Tricks, and How to Use It Effectively
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    A matrix calculator is an essential tool for students, engineers, and professionals working with linear algebra, computer graphics, physics, or data analysis. It saves time, reduces errors, and helps you understand complex operations like determinants, inverses, and matrix multiplication.
                </p>
                 <p className="mt-2 text-lg text-muted-foreground">
                    Here’s how to make the most out of your online matrix calculator. For solving systems of linear equations, you may also find our <Link href="/rref" className="text-primary hover:underline">Augmented Matrix & RREF Calculator</Link> useful.
                </p>
            </section>
            
            <MatrixCalculator />

            <section className="space-y-8">
                <h2 className="text-3xl font-bold">1. Getting Started: Enter Your Matrices</h2>
                <p className="text-muted-foreground">
                    Start by selecting the number of rows and columns for Matrix A and Matrix B. Fill in the numbers manually, or use the quick-fill buttons:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li><strong>Clear All / 0 All</strong> → reset all cells to zero</li>
                    <li><strong>1 All</strong> → fill all cells with ones</li>
                    <li><strong>Random</strong> → fill with random numbers (great for practice or testing)</li>
                </ul>
                <p className="p-4 bg-accent/10 text-accent-foreground rounded-md">
                    <strong>Tip:</strong> For large matrices, using the Random button can help quickly test multiplication, determinant, or inverse functions.
                </p>

                <h2 className="text-3xl font-bold">2. Understanding Matrix Operations</h2>
                <div className="space-y-6">
                    <div>
                        <h3 className="text-2xl font-semibold">A. Addition and Subtraction</h3>
                        <p className="text-muted-foreground mt-2">
                           Only possible if matrices have the same dimensions.
                        </p>
                        <p className="font-mono text-center my-2 text-lg">C[i][j] = A[i][j] ± B[i][j]</p>
                         <p className="p-4 bg-accent/10 text-accent-foreground rounded-md">
                            <strong>Actionable Tip:</strong> Always double-check the dimensions of the matrices before pressing A + B or A – B. If dimensions mismatch, the operation will fail.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold">B. Multiplication</h3>
                        <p className="text-muted-foreground mt-2">
                            Matrix multiplication is valid if columns of A = rows of B.
                        </p>
                         <p className="font-mono text-center my-2 text-lg">C[i][j] = Σ A[i][k] * B[k][j]</p>
                         <p className="p-4 bg-accent/10 text-accent-foreground rounded-md">
                            <strong>Actionable Tip:</strong> Use the swap button (A ↔ B) if the multiplication fails due to incompatible dimensions. This is helpful for experimenting with different combinations.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold">C. Determinant</h3>
                        <p className="text-muted-foreground mt-2">
                           Only square matrices have determinants.
                        </p>
                         <p className="font-mono text-center my-2 text-lg">det([[a, b], [c, d]]) = a*d – b*c</p>
                         <p className="p-4 bg-accent/10 text-accent-foreground rounded-md">
                            <strong>Actionable Tip:</strong> Check determinant before calculating the inverse. If det(A) = 0, the matrix does not have an inverse.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold">D. Inverse</h3>
                        <p className="text-muted-foreground mt-2">
                           Only for square matrices with non-zero determinant can be inverted.
                        </p>
                        <p className="font-mono text-center my-2 text-lg">A⁻¹ = 1/det(A) * adj(A)</p>
                         <p className="p-4 bg-accent/10 text-accent-foreground rounded-md">
                           <strong>Actionable Tip:</strong> Use the step-by-step output (if available) to learn how inverses are calculated. This helps you understand linear algebra concepts instead of just getting the result.
                        </p>
                    </div>
                     <div>
                        <h3 className="text-2xl font-semibold">E. Transpose</h3>
                        <p className="text-muted-foreground mt-2">
                           Swap rows and columns with A<sup>T</sup>. Useful for solving systems of equations, dot products, and orthogonal matrices.
                        </p>
                         <p className="p-4 bg-accent/10 text-accent-foreground rounded-md">
                           <strong>Actionable Tip:</strong> Use transpose to convert row vectors to column vectors when preparing matrices for multiplication.
                        </p>
                    </div>
                     <div>
                        <h3 className="text-2xl font-semibold">F. Power of n</h3>
                        <p className="text-muted-foreground mt-2">
                           Multiply a square matrix by itself n times. Valid only for square matrices.
                        </p>
                        <p className="p-4 bg-accent/10 text-accent-foreground rounded-md">
                           <strong>Actionable Tip:</strong> Use this to quickly calculate matrix powers for repeated transformations, such as rotation matrices in graphics.
                        </p>
                    </div>
                </div>
                
                <div>
                    <h2 className="text-3xl font-bold mb-4">3. Best Practices for Using the Matrix Calculator</h2>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        <li><strong>Always check dimensions first:</strong> Before any operation, ensure the matrices are compatible.</li>
                        <li><strong>Use the swap button (A ↔ B):</strong> Quick fix when multiplication or subtraction fails due to dimensions.</li>
                        <li><strong>Fill with random numbers for practice:</strong> Great for students to test multiple operations and understand patterns.</li>
                        <li><strong>Start small, then scale:</strong> Begin with 2x2 or 3x3 matrices to understand operations before moving to larger matrices.</li>
                        <li><strong>Use determinant before inverse:</strong> Avoid errors by verifying det(A) ≠ 0.</li>
                        <li><strong>Transpose for alignment:</strong> Helps align matrices correctly for multiplication or solving equations.</li>
                        <li><strong>Check outputs visually:</strong> For complex matrices, glance at the output to catch obvious mistakes.</li>
                    </ul>
                </div>
                
                 <div>
                    <h2 className="text-3xl font-bold mb-4">4. Real-World Uses of the Matrix Calculator</h2>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        <li><strong>Linear algebra homework:</strong> Quickly solve addition, subtraction, and multiplication problems.</li>
                        <li><strong>Physics and engineering:</strong> Work with transformations, rotations, or systems of equations.</li>
                        <li><strong>Computer graphics:</strong> Apply matrix powers and inverses for image transformations.</li>
                        <li><strong>Data analysis:</strong> Compute covariance matrices, trace, or rank efficiently.</li>
                    </ul>
                </div>

                 <div>
                    <h2 className="text-3xl font-bold mb-4">5. Quick Tips for Efficiency</h2>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        <li>Use keyboard shortcuts if your calculator supports them.</li>
                        <li>Use copy-paste to input large matrices quickly.</li>
                        <li>Keep frequently used matrices saved if the app has a history or memory feature.</li>
                        <li>Practice with edge cases like zero matrices, identity matrices, and diagonal matrices to see how operations behave.</li>
                    </ul>
                </div>

                <div className="p-4 bg-primary/10 text-primary-foreground rounded-md">
                    <h3 className="font-bold text-lg">✅ Pro Tip:</h3>
                    <p>Combining multiple operations, such as Transpose → Multiply → Inverse, can be done quickly with this calculator and helps reinforce understanding of linear algebra concepts.</p>
                </div>
            </section>
        </div>
      </main>
    </div>
  );
}
