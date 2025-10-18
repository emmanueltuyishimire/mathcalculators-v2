
import { PageHeader } from '@/components/page-header';
import DiagonalizeMatrixCalculator from '@/components/calculators/diagonalize-matrix-calculator';

export default function DiagonalizeMatrixPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Diagonalize Matrix Calculator" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-5xl space-y-12">
            <section className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                    Diagonalize Matrix Calculator – Eigenvalues & Eigenvectors
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    This calculator helps you compute the diagonal form of a square matrix by finding its eigenvalues and eigenvectors.
                </p>
            </section>
            
            <DiagonalizeMatrixCalculator />

        </div>
      </main>
    </div>
  );
}
