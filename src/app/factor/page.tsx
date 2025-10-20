
"use client";

import { PageHeader } from '@/components/page-header';
import FactorCalculator from '@/components/calculators/factor-calculator';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Factor Calculator',
    description: 'A free online calculator to find all factors and the prime factorization of any given integer. Includes explanations and a factor tree example.',
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Factor Calculator",
  "operatingSystem": "All",
  "applicationCategory": "EducationalApplication",
  "description": "A free online calculator to find all factors, factor pairs, and the prime factorization of any integer.",
  "url": "https://maths.calculation.site/factor",
  "publisher": {
    "@type": "Organization",
    "name": "Math Calculators",
    "url": "https://maths.calculation.site"
  },
  "inLanguage": "en",
  "datePublished": "2024-07-26",
  "softwareVersion": "1.0.0"
};

const HowToUseGuide = () => (
    <Card>
        <CardHeader>
            <CardTitle>How to Use the Factor Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
            <ol className="list-decimal list-inside space-y-2">
                <li>
                    <strong>Enter an Integer:</strong> Type any positive or negative integer into the input field.
                </li>
                <li>
                    <strong>Calculate:</strong> Click the "Calculate" button.
                </li>
                <li>
                    <strong>View Results:</strong> The calculator will display three sets of results:
                    <ul className="list-disc list-inside pl-6 mt-1">
                        <li><b>Factors:</b> A complete list of all integers that divide your number evenly.</li>
                        <li><b>Factor Pairs:</b> The pairs of numbers that multiply together to give your number.</li>
                        <li><b>Prime Factors:</b> The set of prime numbers that, when multiplied together, equal your number.</li>
                    </ul>
                </li>
            </ol>
        </CardContent>
    </Card>
);

const EducationalContent = () => (
    <Card>
        <CardHeader>
            <CardTitle>Understanding Factors and Prime Factorization</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground">
            <div>
                <h3 className="text-xl font-semibold text-foreground">What is a Factor?</h3>
                <p className="mt-2">
                    In multiplication, factors are the integers that are multiplied together to get another integer. For example, in the equation <code className="font-mono bg-muted p-1 rounded-md">6 × 5 = 30</code>, the numbers 6 and 5 are factors of 30. Other factors of 30 include 1, 2, 3, 10, 15, and 30. Essentially, an integer 'a' is a factor of another integer 'b' as long as 'b' can be divided by 'a' without leaving a remainder.
                </p>
            </div>
            
            <div>
                <h3 className="text-xl font-semibold text-foreground">What is Prime Factorization?</h3>
                <p className="mt-2">
                    Prime factorization is the process of finding the prime numbers that, when multiplied together, produce the original number. For example, the prime factorization of 120 is <code className="font-mono bg-muted p-1 rounded-md">2 × 2 × 2 × 3 × 5</code>. A factor tree is a helpful tool for this, as shown below for the number 120:
                </p>
                <div className="my-4 p-4 bg-muted rounded-lg text-center font-mono text-sm">
                    <p>120</p>
                    <p>/   \</p>
                    <p>2    60</p>
                    <p>     /   \</p>
                    <p>    2    30</p>
                    <p>         /   \</p>
                    <p>        2    15</p>
                    <p>             /   \</p>
                    <p>            3     5</p>
                </div>
                 <p>
                    While simple for smaller numbers, prime factorization becomes incredibly difficult for very large integers. In fact, the difficulty of factoring large numbers is the basis of many modern cryptography systems. A famous example is the RSA-768 challenge, where it took researchers two years and hundreds of computers to factor a 232-digit number.
                </p>
            </div>
        </CardContent>
    </Card>
);

export default function FactorPage() {
  return (
    <>
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <div className="flex flex-1 flex-col">
        <PageHeader title="Factor Calculator" />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-2xl space-y-8">
              <section className="text-center">
                   <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                      Factor Calculator
                  </h1>
                  <p className="mt-4 text-lg text-muted-foreground">
                      Please provide an integer to calculate its factors and prime factors.
                  </p>
              </section>
            <FactorCalculator />
            <HowToUseGuide />
            <section className="text-center">
              <h2 className="text-2xl font-bold text-foreground">Related Calculators</h2>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                  <Button asChild variant="outline">
                      <Link href="/lcm">LCM Calculator</Link>
                  </Button>
                   <Button asChild variant="outline">
                      <Link href="/gcf">GCF Calculator</Link>
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
