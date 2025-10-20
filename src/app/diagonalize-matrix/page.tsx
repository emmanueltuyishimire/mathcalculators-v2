
"use client";

import { PageHeader } from '@/components/page-header';
import DiagonalizeMatrixCalculator from '@/components/calculators/diagonalize-matrix-calculator';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Diagonalize Matrix Calculator',
  description: 'Use our free Diagonalize Matrix Calculator to compute eigenvalues, eigenvectors, and diagonal matrices online. Step-by-step explanations included for learning linear algebra easily.',
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is diagonalization?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Diagonalization is the process of finding a diagonal matrix D and an invertible matrix P such that P⁻¹AP = D."
      }
    },
    {
      "@type": "Question",
      "name": "Can all matrices be diagonalized?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No, only matrices with n linearly independent eigenvectors can be diagonalized. Matrices without enough linearly independent eigenvectors are called defective and cannot be diagonalized."
      }
    },
    {
        "@type": "Question",
        "name": "How do I check if a matrix is defective?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "A matrix is defective if the number of linearly independent eigenvectors is less than the matrix's dimension. This often happens with repeated eigenvalues where the geometric multiplicity is less than the algebraic multiplicity."
        }
    },
    {
        "@type": "Question",
        "name": "Is this calculator free?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, our Diagonalize Matrix Calculator is completely free to use online without any downloads or subscriptions."
        }
    }
  ]
};

export default function DiagonalizeMatrixPage() {
  return (
    <>
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
    <div className="flex flex-1 flex-col">
      <PageHeader title="Diagonalize Matrix Calculator" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-5xl space-y-12">
            <section className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                    Diagonalize Matrix Calculator – Free Online Tool
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    The Diagonalize Matrix Calculator allows you to quickly compute the eigenvalues and eigenvectors of any square matrix and generate its diagonal form online. Ideal for students, teachers, and professionals learning linear algebra, this tool also provides step-by-step explanations to help you understand the diagonalization process.
                </p>
            </section>
            
            <DiagonalizeMatrixCalculator />

            <section className="space-y-8 text-muted-foreground">
                <h2 className="text-3xl font-bold text-foreground">How to Use the Diagonalize Matrix Calculator</h2>
                <p>The Diagonalize Matrix Calculator allows you to convert any square matrix into its diagonal form, compute eigenvalues and eigenvectors, and verify the diagonalization process. Follow these steps to use it effectively:</p>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-foreground">Step 1: Input Your Matrix</h3>
                    <p>Select the size of your square matrix (e.g., 2×2, 3×3). Enter the matrix elements manually into the grid.</p>
                    <p><strong>Tip:</strong> Only square matrices (same number of rows and columns) can be diagonalized.</p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-foreground">Step 2: Calculate Eigenvalues</h3>
                    <p>Click the <strong>Calculate Eigenvalues</strong> button. The calculator will solve the characteristic equation det(A – λI) = 0 to find all eigenvalues (λ1, λ2, …, λn).</p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-foreground">Step 3: Calculate Eigenvectors</h3>
                    <p>Click <strong>Calculate Eigenvectors</strong>. For each eigenvalue, the calculator solves (A – λI)v = 0 to find the corresponding eigenvector. Eigenvectors are displayed as columns in matrix P.</p>
                     <p><strong>Tip:</strong> Ensure eigenvectors are linearly independent; otherwise, the matrix may not be diagonalizable.</p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-foreground">Step 4: Diagonalize the Matrix</h3>
                    <p>Click <strong>Diagonalize Matrix</strong>. The calculator forms P (matrix of eigenvectors) and D (diagonal matrix of eigenvalues), showing A = P D P⁻¹.</p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-foreground">Step 5: Verify Diagonalization</h3>
                    <p>Click <strong>Verify</strong>. The calculator computes P⁻¹ A P and checks if it equals D. A confirmation will indicate correctness.</p>
                  </div>
                   <div>
                    <h3 className="text-2xl font-semibold text-foreground">Step 6: Optional Step-by-Step Mode</h3>
                    <p>Enable <strong>Step-by-Step Mode</strong> to view the characteristic polynomial, eigenvalue calculation, eigenvector computation, and construction of P and D matrices.</p>
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-foreground">Pro Tips</h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>Always start with smaller matrices (2×2 or 3×3) to understand the process.</li>
                  <li>For repeated eigenvalues, check if you have enough independent eigenvectors to diagonalize.</li>
                  <li>Use the Step-by-Step panel to learn how each calculation is performed.</li>
                  <li>Verify the result by confirming P⁻¹ A P = D.</li>
                </ul>
                
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-foreground">Features of the Calculator</h2>
                  <ul className="list-disc list-inside space-y-2">
                      <li>Step-by-step calculations for clarity.</li>
                      <li>Computes eigenvalues and eigenvectors accurately.</li>
                      <li>Automatically forms the P (eigenvector) and D (eigenvalue) matrices.</li>
                      <li>Verifies the diagonalization P⁻¹AP = D.</li>
                      <li>Supports 2×2, 3×3, and larger matrices for learning and application.</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-foreground">Related Tools</h3>
                  <div className="flex flex-wrap gap-2">
                      <Button asChild variant="outline" size="sm">
                          <Link href="/matrix/calculator">Matrix Calculator</Link>
                      </Button>
                      <Button asChild variant="outline" size="sm">
                          <Link href="/desmos-matrix">Desmos Matrix Calculator</Link>
                      </Button>
                      <Button asChild variant="outline" size="sm">
                          <Link href="/rref">RREF Calculator</Link>
                      </Button>
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-foreground">Actionable Tips</h2>
                 <ul className="list-disc list-inside space-y-2">
                    <li><strong>Ensure Square Matrices:</strong> Diagonalization is only defined for square (n×n) matrices.</li>
                    <li><strong>Check Eigenvectors:</strong> Ensure the eigenvectors are linearly independent. The calculator will warn you if they are not.</li>
                    <li><strong>Verify the Result:</strong> Always check if P⁻¹AP equals D. Our calculator does this for you to confirm correctness.</li>
                </ul>

                <h2 className="text-3xl font-bold text-foreground">Frequently Asked Questions (FAQs)</h2>
                 <div className="space-y-4">
                    <div>
                        <h3 className="text-xl font-semibold">What is diagonalization?</h3>
                        <p>Diagonalization is the process of finding a diagonal matrix D and an invertible matrix P for a given square matrix A, such that P⁻¹AP = D. The columns of P are the eigenvectors of A, and the diagonal entries of D are the corresponding eigenvalues.</p>
                    </div>
                     <div>
                        <h3 className="text-xl font-semibold">Can all matrices be diagonalized?</h3>
                        <p>No. A square matrix can only be diagonalized if it has a complete set of linearly independent eigenvectors. If a matrix does not have enough linearly independent eigenvectors, it is called "defective" and cannot be diagonalized.</p>
                    </div>
                     <div>
                        <h3 className="text-xl font-semibold">How do I check if a matrix is defective?</h3>
                        <p>A matrix is defective if the number of its linearly independent eigenvectors is less than its dimension (n for an n×n matrix). This often occurs when there are repeated eigenvalues, but the number of eigenvectors for that eigenvalue is less than its multiplicity.</p>
                    </div>
                     <div>
                        <h3 className="text-xl font-semibold">Is this calculator free?</h3>
                        <p>Yes, this online diagonalization tool is completely free to use.</p>
                    </div>
                </div>

            </section>
        </div>
      </main>
    </div>
    </>
  );
}
