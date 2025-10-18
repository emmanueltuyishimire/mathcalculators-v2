
import MatrixCalculator from '@/components/calculators/matrix-calculator';

export default function MatrixPage() {
  return (
    <div className="flex flex-1 flex-col">
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl space-y-12">
            <section className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                    Online Matrix Calculator – Free & Easy to Use
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    A matrix calculator is a powerful tool that allows you to perform matrix operations quickly and accurately. Whether you are solving problems in linear algebra, engineering, physics, or computer science, this online tool makes it easy to handle matrix addition, multiplication, determinants, inverses, and more.
                </p>
                 <p className="mt-2 text-lg text-muted-foreground">
                    Our matrix calculator is free, user-friendly, and works on both desktop and mobile devices.
                </p>
            </section>
            
            <MatrixCalculator />

            <section className="space-y-8">
                <h2 className="text-3xl font-bold">How to Use the Matrix Calculator</h2>
                <div className="space-y-6 text-muted-foreground">
                    <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-foreground">Step 1: Input Your Matrices</h3>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Select the number of rows and columns for Matrix A and Matrix B.</li>
                            <li>Enter numbers directly into the grid.</li>
                            <li>Use quick fill buttons:
                                <ul className="list-disc list-inside pl-6">
                                    <li><strong>Clear All / 0 All</strong> → reset cells to 0</li>
                                    <li><strong>1 All</strong> → fill all cells with 1</li>
                                    <li><strong>Random</strong> → fill with random numbers</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-foreground">Step 2: Choose an Operation</h3>
                        <p>Our calculator supports a variety of operations for one or two matrices:</p>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <h4 className="font-semibold text-foreground">Single Matrix Operations:</h4>
                                <ul className="list-disc list-inside space-y-1">
                                    <li><strong>Transpose</strong> → swap rows with columns</li>
                                    <li><strong>Power of n</strong> → multiply the matrix by itself n times</li>
                                    <li><strong>Determinant</strong> → compute det(A)</li>
                                    <li><strong>Inverse</strong> → calculate A⁻¹ (only if determinant ≠ 0)</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-foreground">Two Matrix Operations:</h4>
                                <ul className="list-disc list-inside space-y-1">
                                    <li><strong>A + B</strong> → matrix addition (same dimensions)</li>
                                    <li><strong>A – B</strong> → matrix subtraction (same dimensions)</li>
                                    <li><strong>AB</strong> → matrix multiplication (columns of A = rows of B)</li>
                                    <li><strong>A ↔ B</strong> → swap the two matrices</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-foreground">Step 3: View Results</h3>
                        <ul className="list-disc list-inside space-y-1">
                            <li>The resulting matrix or value is displayed in the output grid.</li>
                            <li>For determinants, a single numeric value is shown.</li>
                            <li>For inverses, powers, or arithmetic operations, the entire resulting matrix is displayed.</li>
                        </ul>
                    </div>
                </div>

                <h2 className="text-3xl font-bold">Matrix Operations Explained</h2>
                <div className="space-y-6">
                    <div>
                        <h3 className="text-2xl font-semibold">1. Addition and Subtraction</h3>
                        <p className="text-muted-foreground mt-2">
                           Matrices must have the same dimensions. The operation is performed element-wise.
                        </p>
                        <p className="font-mono text-center my-2 text-lg">C[i][j] = A[i][j] ± B[i][j]</p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold">2. Multiplication</h3>
                        <p className="text-muted-foreground mt-2">
                            Valid if the number of columns of A equals the number of rows of B.
                        </p>
                         <p className="font-mono text-center my-2 text-lg">C[i][j] = Σ A[i][k] * B[k][j]</p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold">3. Determinant</h3>
                        <p className="text-muted-foreground mt-2">
                           A scalar value that can be computed from the elements of a square matrix.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold">4. Inverse</h3>
                        <p className="text-muted-foreground mt-2">
                           The inverse of a square matrix A is a matrix A⁻¹ such that A * A⁻¹ = I (the identity matrix). It exists only if the determinant is non-zero.
                        </p>
                    </div>
                     <div>
                        <h3 className="text-2xl font-semibold">5. Transpose</h3>
                        <p className="text-muted-foreground mt-2">
                           The transpose of a matrix is an operator which flips a matrix over its diagonal.
                        </p>
                    </div>
                     <div>
                        <h3 className="text-2xl font-semibold">6. Power of n</h3>
                        <p className="text-muted-foreground mt-2">
                           Raises a square matrix to an integer power n by multiplying it by itself n times.
                        </p>
                    </div>
                </div>
                
                 <div>
                    <h2 className="text-3xl font-bold mb-4">Tips for Using the Matrix Calculator</h2>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        <li>Always check matrix dimensions before performing operations.</li>
                        <li>Only square matrices can have determinants, inverses, or powers.</li>
                        <li>Use the Random button to quickly test different matrix scenarios.</li>
                        <li>The "Copy to A/B" buttons are useful for multi-step calculations.</li>
                    </ul>
                </div>

                <h2 className="text-3xl font-bold">FAQs</h2>
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-semibold">Q1: What is a matrix calculator?</h3>
                        <p className="text-muted-foreground">A matrix calculator is a tool that performs mathematical operations on matrices, including addition, multiplication, determinants, and inverses.</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">Q2: Can I multiply any two matrices?</h3>
                        <p className="text-muted-foreground">No. Matrix multiplication is only possible if the number of columns in Matrix A equals the number of rows in Matrix B.</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">Q3: Can I find the inverse of any matrix?</h3>
                        <p className="text-muted-foreground">No. Only square matrices with a non-zero determinant have an inverse.</p>
                    </div>
                     <div>
                        <h3 className="text-xl font-semibold">Q4: Is this matrix calculator free?</h3>
                        <p className="text-muted-foreground">Yes! You can use it online for free without registration or downloads.</p>
                    </div>
                     <div>
                        <h3 className="text-xl font-semibold">Q5: Can I use this calculator on my phone or tablet?</h3>
                        <p className="text-muted-foreground">Yes, it’s fully responsive and works on mobile devices and tablets.</p>
                    </div>
                </div>
            </section>
        </div>
      </main>
    </div>
  );
}
