
import { PageHeader } from '@/components/page-header';
import GcfCalculator from '@/components/calculators/gcf-calculator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { RelatedCalculatorsSidebar } from '@/components/related-calculators-sidebar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Greatest Common Factor (GCF) Calculator',
  description: 'Find the greatest common factor (GCF) of a set of numbers with our free online GCF calculator, complete with step-by-step solutions.',
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Greatest Common Factor (GCF) Calculator",
  "operatingSystem": "All",
  "applicationCategory": "EducationalApplication",
  "description": "Find the greatest common factor (GCF) of a set of numbers with our free online GCF calculator, complete with step-by-step solutions using prime factorization.",
  "url": "https://maths.calculation.site/gcf",
  "publisher": {
    "@type": "Organization",
    "name": "Math Calculators",
    "url": "https://maths.calculation.site"
  },
  "inLanguage": "en",
  "datePublished": "2024-07-26",
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
    "name": "GCF Calculator",
    "item": "https://maths.calculation.site/gcf"
  }]
};

const HowToUseGuide = () => (
    <Card>
        <CardHeader>
            <CardTitle>How to Use the GCF Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
            <ol className="list-decimal list-inside space-y-2">
                <li>
                    <strong>Enter Your Numbers:</strong> Type the numbers you want to find the GCF of into the input field. Make sure to separate each number with a comma.
                </li>
                <li>
                    <strong>Calculate:</strong> Click the "Calculate" button to process the numbers.
                </li>
                <li>
                    <strong>View the Result:</strong> The calculator will display the GCF and the prime factorization of each number, which helps you understand how the GCF was found.
                </li>
            </ol>
        </CardContent>
    </Card>
);

const EducationalContent = () => (
    <Card>
        <CardHeader>
            <CardTitle>Understanding the Greatest Common Factor (GCF)</CardTitle>
            <CardDescription>The largest positive integer that divides each of the integers.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div>
                <h3 className="text-xl font-semibold text-foreground">What is the GCF?</h3>
                <p className="text-muted-foreground mt-2">
                    In mathematics, the greatest common factor (GCF)—also known as the greatest common divisor (GCD)—of two or more integers is the largest positive integer that divides each of them without leaving a remainder. For example, GCF(32, 256) is 32.
                </p>
            </div>
            
            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">How to Find the GCF</h3>
                <p className="text-muted-foreground">There are several methods to find the GCF. Here are two common approaches:</p>
                
                <Card>
                    <CardHeader>
                        <CardTitle>1. The Prime Factorization Method</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <p className="text-muted-foreground">This method involves breaking down each number into its prime factors. The GCF is the product of all prime factors that are common to every number in the set.</p>
                        <div className="p-4 bg-muted rounded-md text-sm mt-2 font-mono">
                            <b>Example: Find GCF(16, 88, 104)</b><br/>
                            <p className="mt-2">16 = <b>2 × 2 × 2</b> × 2</p>
                            <p>88 = <b>2 × 2 × 2</b> × 11</p>
                            <p>104 = <b>2 × 2 × 2</b> × 13</p>
                            <p className="mt-2">The common factors are 2 × 2 × 2, so the GCF is <b>8</b>.</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>2. The Euclidean Algorithm</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">A far more efficient method, the Euclidean algorithm uses division and remainders to find the GCF of two numbers. It is based on the principle that the greatest common divisor of two numbers does not change if the larger number is replaced by its difference with the smaller number. This process is repeated until the remainder is 0.</p>
                         <div className="p-4 bg-muted rounded-md text-sm mt-2 font-mono">
                            <b>Example: Find GCF(268442, 178296)</b><br/>
                            <p className="mt-2">268442 = 1 × 178296 + 90146</p>
                            <p>178296 = 1 × 90146 + 88150</p>
                            <p>90146 = 1 × 88150 + 1996</p>
                            <p>88150 = 44 × 1996 + 326</p>
                            <p>1996 = 6 × 326 + 40</p>
                            <p>326 = 8 × 40 + 6</p>
                            <p>40 = 6 × 6 + 4</p>
                            <p>6 = 1 × 4 + 2</p>
                            <p>4 = 2 × 2 + 0</p>
                            <p className="mt-2">The last non-zero remainder is <b>2</b>, which is the GCF.</p>
                        </div>
                        <p className="text-muted-foreground mt-2">To find the GCF of more than two numbers, you can apply this algorithm iteratively: find GCF(a, b), then find the GCF of that result and c, and so on.</p>
                    </CardContent>
                </Card>
            </div>
        </CardContent>
    </Card>
);

export default function GcfPage() {
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
        <PageHeader title="Greatest Common Factor Calculator" />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row lg:gap-8">
            <div className="flex-1 space-y-8">
              <section className="text-center">
                   <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                      Greatest Common Factor (GCF) Calculator
                  </h1>
                  <p className="mt-4 text-lg text-muted-foreground">
                      A free online calculator to find the greatest common factor (GCF) of a set of numbers, with step-by-step solutions.
                  </p>
              </section>
                <GcfCalculator />
                <HowToUseGuide />
                <section className="text-center">
                  <h2 className="text-2xl font-bold text-foreground">Related Calculators</h2>
                  <div className="flex flex-wrap justify-center gap-2 mt-4">
                      <Button asChild variant="outline">
                          <Link href="/lcm">LCM Calculator</Link>
                      </Button>
                       <Button asChild variant="outline">
                          <Link href="/basic">Basic Calculators</Link>
                      </Button>
                  </div>
                </section>
                <EducationalContent />
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
