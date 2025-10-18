
import { PageHeader } from '@/components/page-header';
import DesmosMatrixCalculator from '@/components/calculators/desmos-matrix-calculator';

export default function DesmosMatrixPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Desmos Matrix Calculator" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-4xl space-y-12">
            <section className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                    Desmos Matrix Calculator – Free Online Tool
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Perform matrix operations, visualize transformations, and learn linear algebra interactively.
                </p>
            </section>
            
            <DesmosMatrixCalculator />

            <section className="space-y-8 text-muted-foreground">
                <h2 className="text-3xl font-bold text-foreground">1. Input Your Matrix</h2>
                <p>Select the number of rows and columns for your matrix. Enter numbers manually or use quick-fill options:</p>
                <ul className="list-disc list-inside pl-4">
                    <li><strong>Clear All / 0 All:</strong> Reset matrix to zeros</li>
                    <li><strong>1 All:</strong> Fill all cells with ones</li>
                    <li><strong>Random:</strong> Fill matrix with random numbers for practice</li>
                </ul>

                <h2 className="text-3xl font-bold text-foreground">2. Matrix Operations</h2>
                <p>Click the operation buttons to perform calculations:</p>
                <ul className="list-disc list-inside pl-4">
                    <li><strong>Add (A + B):</strong> Element-wise addition (same dimensions)</li>
                    <li><strong>Subtract (A – B):</strong> Element-wise subtraction (same dimensions)</li>
                    <li><strong>Multiply (A × B):</strong> Matrix multiplication (columns of A = rows of B)</li>
                    <li><strong>Transpose (A<sup>T</sup>):</strong> Swap rows and columns</li>
                    <li><strong>Determinant (det(A)):</strong> Only for square matrices</li>
                    <li><strong>Inverse (A⁻¹):</strong> Only for square matrices with non-zero determinant</li>
                    <li><strong>Scalar Multiply:</strong> Multiply all elements by a scalar</li>
                </ul>

                <h2 className="text-3xl font-bold text-foreground">3. Validation & Error Checks</h2>
                <ul className="list-disc list-inside pl-4">
                    <li>Check dimensions for addition, subtraction, and multiplication</li>
                    <li>Ensure square matrices for determinant and inverse</li>
                    <li>Non-zero determinant required for inverse</li>
                    <li>Numeric validation to prevent invalid input</li>
                </ul>

                <h2 className="text-3xl font-bold text-foreground">4. Examples</h2>
                <div>
                    <h4 className="font-semibold text-xl">Example 1: Addition</h4>
                    <pre className="mt-2 p-4 bg-muted rounded-md font-mono">
{`A = [[1, 2], [3, 4]]
B = [[5, 6], [7, 8]]
A + B = [[6, 8], [10, 12]]`}
                    </pre>
                </div>
                <div>
                    <h4 className="font-semibold text-xl">Example 2: Multiplication</h4>
                    <pre className="mt-2 p-4 bg-muted rounded-md font-mono">
{`A = [[1, 2], [3, 4]]
B = [[5, 6], [7, 8]]
A × B = [[19, 22], [43, 50]]`}
                    </pre>
                </div>
                <div>
                    <h4 className="font-semibold text-xl">Example 3: Inverse</h4>
                    <pre className="mt-2 p-4 bg-muted rounded-md font-mono">
{`A = [[1, 2], [3, 4]]
A⁻¹ = [[-2, 1], [1.5, -0.5]]`}
                    </pre>
                </div>

                <h2 className="text-3xl font-bold text-foreground">5. Actionable Tips</h2>
                <ul className="list-disc list-inside pl-4">
                    <li>Start with 2×2 or 3×3 matrices to understand operations.</li>
                    <li>Use step-by-step mode to learn intermediate calculations.</li>
                    <li>Visualize 2×2 matrix transformations on vectors to understand linear algebra.</li>
                    <li>Combine operations like Transpose → Multiply → Inverse to explore matrix properties.</li>
                    <li>Use Random fill to practice with different matrices quickly.</li>
                </ul>

                <h2 className="text-3xl font-bold text-foreground">6. Frequently Asked Questions (FAQs)</h2>
                <div className="space-y-4">
                    <div>
                        <h4 className="font-semibold text-xl">Q1: What is a Desmos Matrix Calculator?</h4>
                        <p>A free online tool for performing matrix operations, visualizing transformations, and learning linear algebra interactively.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-xl">Q2: Can I multiply any two matrices?</h4>
                        <p>Only if the number of columns in the first matrix equals the number of rows in the second matrix.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-xl">Q3: Can I calculate the inverse of any matrix?</h4>
                        <p>No. Only square matrices with a non-zero determinant have inverses.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-xl">Q4: Is this tool free?</h4>
                        <p>Yes, it is completely free to use online.</p>
                    </div>
                </div>
            </section>
        </div>
      </main>
    </div>
  );
}
