
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
                <h2 className="text-3xl font-bold text-foreground">How to Use the Desmos Matrix Calculator</h2>
                <p>Our Desmos Matrix Calculator lets you perform matrix operations, visualize transformations, and explore linear algebra concepts interactively. Follow these steps to get started:</p>
                
                <div>
                    <h3 className="text-2xl font-semibold text-foreground">Step 1: Input Your Matrix</h3>
                    <p>Select the number of rows and columns for your matrix. Enter numbers manually into the grid.</p>
                    <p>Use the quick-fill options for faster input:</p>
                    <ul className="list-disc list-inside pl-4 mt-2">
                        <li><strong>Clear All / 0 All:</strong> Reset all cells to zero</li>
                        <li><strong>1 All:</strong> Fill all cells with ones</li>
                        <li><strong>Random:</strong> Automatically fill the matrix with random numbers</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-2xl font-semibold text-foreground">Step 2: Choose an Operation</h3>
                    <p>Click the operation buttons to perform calculations:</p>
                    <ul className="list-disc list-inside pl-4 mt-2">
                        <li><strong>Add (A + B):</strong> Element-wise addition (matrices must have the same dimensions)</li>
                        <li><strong>Subtract (A – B):</strong> Element-wise subtraction (matrices must have the same dimensions)</li>
                        <li><strong>Multiply (A × B):</strong> Standard matrix multiplication (columns of A = rows of B)</li>
                        <li><strong>Transpose (A^T):</strong> Swap rows and columns</li>
                        <li><strong>Determinant (det(A)):</strong> Only works for square matrices</li>
                        <li><strong>Inverse (A⁻¹):</strong> Only square matrices with non-zero determinant</li>
                        <li><strong>Scalar Multiply:</strong> Multiply all elements by a number</li>
                    </ul>
                </div>
                
                <div>
                    <h3 className="text-2xl font-semibold text-foreground">Step 3: Check for Errors</h3>
                     <ul className="list-disc list-inside pl-4 mt-2">
                        <li>Make sure matrix dimensions are compatible for addition, subtraction, or multiplication.</li>
                        <li>Only square matrices can have determinants and inverses.</li>
                        <li>Ensure your inputs are numeric values.</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-2xl font-semibold text-foreground">Step 4: View the Result</h3>
                    <ul className="list-disc list-inside pl-4 mt-2">
                        <li>The result of the operation will be displayed in the output grid.</li>
                        <li><strong>For determinant:</strong> a single numeric value</li>
                        <li><strong>For inverse, transpose, or arithmetic operations:</strong> a full matrix</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-2xl font-semibold text-foreground">Step 5: Explore and Learn</h3>
                    <ul className="list-disc list-inside pl-4 mt-2">
                        <li>Experiment with random matrices to test different operations.</li>
                        <li>Combine multiple operations (e.g., Transpose → Multiply → Inverse) to understand matrix behavior.</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-3xl font-bold text-foreground">Pro Tips</h2>
                    <ul className="list-disc list-inside pl-4 mt-2">
                        <li>Start with small matrices (2×2 or 3×3) to understand operations.</li>
                        <li>Verify your results by checking that multiplication or inversion produces expected outcomes.</li>
                        <li>Use visualization to connect matrix math with geometric transformations.</li>
                    </ul>
                </div>
            </section>
        </div>
      </main>
    </div>
  );
}
