
"use client";

import { PageHeader } from '@/components/page-header';
import LcmCalculator from '@/components/calculators/lcm-calculator';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const metadata: Metadata = {
    title: 'Least Common Multiple (LCM) Calculator',
    description: 'A free online calculator to find the least common multiple (LCM) of a set of numbers. Includes step-by-step solutions using prime factorization.',
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Least Common Multiple (LCM) Calculator",
  "operatingSystem": "All",
  "applicationCategory": "EducationalApplication",
  "description": "A free online calculator to find the least common multiple (LCM) of a set of numbers, with step-by-step solutions.",
  "url": "https://maths.calculation.site/lcm",
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
            <CardTitle>How to Use the LCM Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
            <ol className="list-decimal list-inside space-y-2">
                <li>
                    <strong>Enter Your Numbers:</strong> Type the numbers you want to find the LCM of into the input field. Make sure to separate each number with a comma.
                </li>
                <li>
                    <strong>Calculate:</strong> Click the "Calculate" button to process the numbers.
                </li>
                <li>
                    <strong>View the Result:</strong> The calculator will display the LCM. You can also click "Show Calculation Steps" to see the prime factorization method used to find the result.
                </li>
            </ol>
        </CardContent>
    </Card>
);

const EducationalContent = () => (
    <Card>
        <CardHeader>
            <CardTitle>Understanding the Least Common Multiple (LCM)</CardTitle>
            <CardDescription>The smallest positive integer that is divisible by all numbers in a set.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div>
                <h3 className="text-xl font-semibold text-foreground">What is the LCM?</h3>
                <p className="text-muted-foreground mt-2">
                    In mathematics, the least common multiple (LCM), also known as the lowest common multiple, of two or more integers is the smallest positive integer that is divisible by all of them. It is commonly denoted as LCM(a, b).
                </p>
            </div>
            
            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">How to Find the LCM</h3>
                <p className="text-muted-foreground">There are several methods to find the LCM. Here are three common approaches:</p>
                
                <Card>
                    <CardHeader>
                        <CardTitle>1. The Brute Force Method</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <p className="text-muted-foreground">This basic method involves listing the multiples of each integer until you find the first common multiple. While intuitive, it can be tedious for larger numbers.</p>
                        <div className="p-4 bg-muted rounded-md text-sm mt-2 font-mono">
                            <b>Example: Find LCM(18, 26)</b><br/>
                            <p className="mt-2">Multiples of 18: 18, 36, 54, 72, 90, 108, 126, 144, 162, 180, 198, 216, <b>234</b>, ...</p>
                            <p>Multiples of 26: 26, 52, 78, 104, 130, 156, 182, 208, <b>234</b>, ...</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>2. The Prime Factorization Method</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">A more systematic way is to break down each number into its prime factors. The LCM is the product of the highest power of each prime number that appears in any of the factorizations.</p>
                         <div className="p-4 bg-muted rounded-md text-sm mt-2 font-mono">
                            <b>Example: Find LCM(21, 14, 38)</b><br/>
                            <p className="mt-2">Prime factorization of 21: 3 × 7</p>
                            <p>Prime factorization of 14: 2 × 7</p>
                            <p>Prime factorization of 38: 2 × 19</p>
                            <p className="mt-2">The LCM is found by taking the highest power of each prime factor present (2, 3, 7, 19):<br/> 2 × 3 × 7 × 19 = <b>798</b>.</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>3. The Greatest Common Divisor (GCD) Method</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">A third method uses the greatest common divisor (GCD). For two numbers, the formula is: <code className="font-mono text-xs bg-muted p-1 rounded-md">LCM(a, b) = (|a × b|) / GCD(a, b)</code>.</p>
                        <p className="text-muted-foreground mt-2">To find the LCM of more than two numbers, you can apply this method iteratively.</p>
                         <div className="p-4 bg-muted rounded-md text-sm mt-2 font-mono">
                            <b>Example: Find LCM(21, 14, 38)</b><br/>
                            <p className="mt-2">First, find LCM(14, 38). The GCD(14, 38) is 2.</p>
                            <p>LCM(14, 38) = (14 × 38) / 2 = <b>266</b>.</p>
                            <p className="mt-2">Next, find LCM of the result and the next number: LCM(21, 266). The GCD(21, 266) is 7.</p>
                            <p>LCM(21, 266) = (21 × 266) / 7 = <b>798</b>.</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </CardContent>
    </Card>
);

const FaqSection = () => (
    <Card>
        <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>What is the difference between LCM and GCF (GCD)?</AccordionTrigger>
                    <AccordionContent>
                        - **LCM (Least Common Multiple):** The smallest number that is a multiple of all numbers in the set. For example, LCM(4, 6) = 12.<br/>
                        - **GCF (Greatest Common Factor) or GCD (Greatest Common Divisor):** The largest number that divides all numbers in the set without a remainder. For example, GCF(4, 6) = 2.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>When would I use the LCM in real life?</AccordionTrigger>
                    <AccordionContent>
                        The most common real-life application of LCM is when adding or subtracting fractions. You need to find a common denominator, and using the least common denominator (which is the LCM of the denominators) makes the calculation simpler. It's also used in scheduling problems, like finding out when two events will happen at the same time again.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>Can I calculate the LCM of negative numbers?</AccordionTrigger>
                    <AccordionContent>
                        The LCM is typically defined for positive integers. This calculator will use the absolute value of any negative numbers you enter, as the common multiples are the same for a number and its negative counterpart.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger>What is the LCM of a number and 1?</AccordionTrigger>
                    <AccordionContent>
                        The LCM of any number 'n' and 1 is always 'n', because 'n' is the smallest positive number that is a multiple of both 'n' and 1.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
    </Card>
);

export default function LcmPage() {
  return (
    <>
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <div className="flex flex-1 flex-col">
        <PageHeader title="Least Common Multiple Calculator" />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-2xl space-y-8">
              <section className="text-center">
                   <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                      Least Common Multiple Calculator
                  </h1>
                  <p className="mt-4 text-lg text-muted-foreground">
                      Please provide numbers separated by a comma "," and click the "Calculate" button to find the LCM.
                  </p>
              </section>
            <LcmCalculator />
            <HowToUseGuide />
            <section className="text-center">
              <h2 className="text-2xl font-bold text-foreground">Related Calculators</h2>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                  <Button asChild variant="outline">
                      <Link href="/basic">Basic Calculators</Link>
                  </Button>
                   <Button asChild variant="outline">
                      <Link href="/fraction">Fraction Calculator</Link>
                  </Button>
              </div>
            </section>
            <EducationalContent />
            <FaqSection />
          </div>
        </main>
      </div>
    </>
  );
}
