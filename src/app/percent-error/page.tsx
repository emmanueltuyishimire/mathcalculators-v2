
import { PageHeader } from '@/components/page-header';
import PercentErrorCalculator from '@/components/calculators/percent-error-calculator';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
    title: 'Percent Error Calculator',
    description: 'Calculate the percent error between an observed (experimental) value and a true (accepted) value. A key tool for scientific accuracy.',
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Percent Error Calculator",
  "operatingSystem": "All",
  "applicationCategory": "EducationalApplication",
  "description": "A free online calculator to determine the percent error between an observed (experimental) and a true (accepted) value.",
  "url": "https://mathmaster-studio-5398649656-398ca.web.app/percent-error",
  "publisher": {
    "@type": "Organization",
    "name": "MathMaster",
    "url": "https://mathmaster-studio-5398649656-398ca.web.app"
  },
  "inLanguage": "en",
  "datePublished": "2024-07-26",
  "softwareVersion": "1.0.0"
};

const EducationalContent = () => (
    <Card>
        <CardHeader>
            <CardTitle>Understanding Percent Error</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground">
            <div>
                <h3 className="text-xl font-semibold text-foreground">What is Percent Error?</h3>
                <p className="mt-2">
                    Percent error is a measure of how close an observed or experimental value is to a true or accepted value. It is a common way to evaluate the accuracy of a measurement in science and engineering. A low percent error indicates that your result is close to the correct value, while a high percent error indicates a significant discrepancy.
                </p>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-foreground">The Formula</h3>
                <p className="mt-2">The most common formula for calculating percent error is the absolute error formula:</p>
                <p className="font-mono bg-muted p-4 rounded-md text-center text-lg my-2">
                    Absolute Percent Error = (|Observed Value - True Value| / |True Value|) × 100%
                </p>
                <p className="mt-2">
                    This formula uses the absolute value to ensure the error is always a positive number, which is useful for understanding the magnitude of the error.
                </p>
                <p className="mt-2">
                    However, sometimes it's useful to know the direction of the error (whether your observation was an overestimate or an underestimate). In this case, you can use the signed percent error formula:
                </p>
                <p className="font-mono bg-muted p-4 rounded-md text-center text-lg my-2">
                    Signed Percent Error = ((Observed Value - True Value) / True Value) × 100%
                </p>
                 <p className="mt-2">Our calculator provides both values for a complete analysis.</p>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-foreground">How to Use the Calculator</h3>
                <ol className="list-decimal list-inside mt-2 space-y-2">
                    <li><b>Enter the Observed Value:</b> Input the value you obtained from your measurement.</li>
                    <li><b>Enter the True Value:</b> Input the accepted or known correct value.</li>
                    <li><b>Calculate:</b> The calculator will automatically show the percent error. The "True Value" cannot be zero, as division by zero is undefined.</li>
                </ol>
            </div>
        </CardContent>
    </Card>
);

export default function PercentErrorPage() {
  return (
    <>
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <div className="flex flex-1 flex-col">
        <PageHeader title="Percent Error Calculator" />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-2xl space-y-8">
              <section className="text-center">
                  <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                      Percent Error Calculator
                  </h1>
                  <p className="mt-4 text-lg text-muted-foreground">
                      Calculate the accuracy of a measurement by comparing an observed value to a true value.
                  </p>
              </section>
              
              <PercentErrorCalculator />

              <section className="text-center">
                  <h2 className="text-2xl font-bold text-foreground">Related Calculators</h2>
                  <div className="flex flex-wrap justify-center gap-2 mt-4">
                      <Button asChild variant="outline">
                          <Link href="/percentage">Percentage Calculator</Link>
                      </Button>
                      <Button asChild variant="outline">
                          <Link href="/scientific">Scientific Calculator</Link>
                      </Button>
                      <Button asChild variant="outline">
                          <Link href="/statistics">Statistics Calculator</Link>
                      </Button>
                  </div>
              </section>
              
              <EducationalContent />
          </div>
        </main>
      </div>
    </>
  );
}
