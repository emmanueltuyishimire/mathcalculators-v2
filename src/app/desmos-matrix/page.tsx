
"use client";

import { PageHeader } from '@/components/page-header';
import DesmosMatrixCalculator from '@/components/calculators/desmos-matrix-calculator';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { RelatedCalculatorsSidebar } from '@/components/related-calculators-sidebar';

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Desmos Matrix Calculator",
  "operatingSystem": "All",
  "applicationCategory": "EducationalApplication",
  "description": "An interactive, Desmos-style matrix calculator for performing operations like addition, multiplication, transpose, and finding the determinant and inverse.",
  "url": "https://maths.calculation.site/desmos-matrix",
  "publisher": {
    "@type": "Organization",
    "name": "Math Calculators",
    "url": "https://maths.calculation.site"
  },
  "inLanguage": "en",
  "softwareVersion": "1.0.0",
  "offers": {
    "@type": "Offer",
    "price": "0"
  }
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [{
    "@type": "ListItem",
    "position": 1,
    "name": "Home",
    "item": "https://maths.calculation.site"
  },{
    "@type": "ListItem",
    "position": 2,
    "name": "Calculators",
    "item": "https://maths.calculation.site/calculators"
  },{
    "@type": "ListItem",
    "position": 3,
    "name": "Desmos Matrix Calculator",
    "item": "https://maths.calculation.site/desmos-matrix"
  }]
};

const FaqSection = () => (
    <Card>
        <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>What makes this a "Desmos-style" calculator?</AccordionTrigger>
                    <AccordionContent>
                        This calculator is inspired by the interactive and user-friendly interface of Desmos. Instead of separate inputs for each operation, you can create multiple matrices (A, B, C, etc.) and perform operations on them dynamically, with results appearing as new matrices in your workspace.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>How many matrices can I create?</AccordionTrigger>
                    <AccordionContent>
                        You can add as many matrices as you need by clicking the "+ New Matrix" button. Each new matrix will be assigned a letter name automatically (A, B, C, ...).
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>What matrix operations are supported?</AccordionTrigger>
                    <AccordionContent>
                        The calculator supports addition, subtraction, multiplication, transpose, determinant, inverse, and scalar multiplication. You can access these operations through the main operation panel or the function menu on each matrix card.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger>How do I change the size of a matrix?</AccordionTrigger>
                    <AccordionContent>
                        You can add or remove rows and columns using the dedicated buttons (+/- with row/column icons) on each matrix card. The maximum size is 8x8.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                    <AccordionTrigger>What happens if I try an invalid operation?</AccordionTrigger>
                    <AccordionContent>
                        If you attempt an invalid operation, such as adding matrices of different dimensions or trying to find the inverse of a non-square matrix, the calculator will show a descriptive error toast to help you correct the issue.
                    </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="item-6">
                    <AccordionTrigger>Can I use the result of one calculation in another?</AccordionTrigger>
                    <AccordionContent>
                        Yes. When you perform an operation (e.g., A + B), the result is created as a new matrix in your workspace (e.g., named "A+B"). You can then use this new matrix in subsequent calculations.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
    </Card>
);


export default function DesmosMatrixPage() {
  return (
    <>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
        />
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <div className="flex flex-1 flex-col">
          <PageHeader title="Desmos Matrix Calculator" />
          <main className="flex-1 p-4 md:p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row lg:gap-8">
                <div className="flex-1 space-y-12">
                    <section className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                            Desmos Matrix Calculator
                        </h1>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Perform matrix operations, visualize transformations, and learn linear algebra interactively with this free online matrix calculator.
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
                                 <li>For more advanced operations like RREF or diagonalization, check out our other <Link href="/matrix" className="text-primary hover:underline">matrix calculators</Link>.</li>
                            </ul>
                        </div>
                    </section>
                    <FaqSection />
                </div>
                <div className="mt-8 lg:mt-0">
                    <RelatedCalculatorsSidebar />
                </div>
            </div>
          </main>
        </div>
    </>
  );
}
