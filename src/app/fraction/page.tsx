
"use client";

import { PageHeader } from '@/components/page-header';
import FractionCalculators from '@/components/calculators/fraction-calculator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { RelatedCalculatorsSidebar } from '@/components/related-calculators-sidebar';

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Fraction Calculator",
  "operatingSystem": "All",
  "applicationCategory": "EducationalApplication",
  "description": "A comprehensive set of free online fraction calculators for arithmetic (add, subtract, multiply, divide), simplification, and conversion between fractions and decimals.",
  "url": "https://maths.calculation.site/fraction",
  "publisher": {
    "@type": "Organization",
    "name": "Math Calculators",
    "url": "https://maths.calculation.site"
  },
  "inLanguage": "en",
  "datePublished": "2024-07-26",
  "softwareVersion": "1.0.0"
};

const EducationalContent = () => (
    <Card>
        <CardHeader>
            <CardTitle>Mastering Fractions: A Comprehensive Guide</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground">
            <div>
                <h3 className="text-xl font-semibold text-foreground">What is a Fraction?</h3>
                <p className="mt-2">In mathematics, a fraction represents a part of a whole. It consists of a <strong>numerator</strong> (the top number) and a <strong>denominator</strong> (the bottom number). The numerator tells us how many equal parts we have, while the denominator shows the total number of parts that make up the whole.</p>
                <p className="mt-2">For instance, in the fraction 3/8, the numerator is 3 and the denominator is 8. Imagine a pie cut into 8 equal slices. If you eat 3 slices, you have consumed 3/8 of the pie. The remaining portion would be 5/8. A critical rule is that the denominator of a fraction can never be zero, as division by zero is undefined.</p>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-foreground">How to Add and Subtract Fractions</h3>
                <p className="mt-2">Unlike simple integers, fractions need a <strong>common denominator</strong> before you can add or subtract them. Here are two methods to achieve this:</p>
                
                <h4 className="font-semibold text-foreground mt-4">Method 1: The Cross-Multiplication Method</h4>
                <p>A straightforward way to get a common denominator is to multiply the numerator and denominator of each fraction by the denominator of the other. While simple, this method may not result in a simplified fraction.</p>
                <p className="font-mono bg-muted p-2 rounded-md my-2 text-center">a/b + c/d = (ad + bc) / bd</p>
                <p><strong>Example:</strong> 3/4 + 1/6 = (3×6 + 1×4) / (4×6) = (18 + 4) / 24 = 22/24, which simplifies to 11/12.</p>
                
                <h4 className="font-semibold text-foreground mt-4">Method 2: Using the Least Common Multiple (LCM)</h4>
                <p>A more efficient method is to find the Least Common Multiple (LCM) of the denominators. The LCM is the smallest number that is a multiple of all the denominators.</p>
                <p>For the example 3/4 + 1/6, the LCM of 4 and 6 is 12. Convert each fraction to have a denominator of 12:</p>
                <ul className="list-disc list-inside pl-4 mt-2">
                    <li>3/4 becomes (3×3)/(4×3) = 9/12</li>
                    <li>1/6 becomes (1×2)/(6×2) = 2/12</li>
                </ul>
                <p>Now, add the numerators: 9/12 + 2/12 = 11/12. This method often gives a simplified result directly.</p>
            </div>
            
            <div>
                <h3 className="text-xl font-semibold text-foreground">How to Multiply and Divide Fractions</h3>
                
                <h4 className="font-semibold text-foreground mt-4">Multiplication</h4>
                <p>Multiplying fractions is simple: multiply the numerators together and the denominators together. No common denominator is needed.</p>
                <p className="font-mono bg-muted p-2 rounded-md my-2 text-center">a/b × c/d = ac/bd</p>
                <p><strong>Example:</strong> 3/4 × 1/6 = 3/24, which simplifies to 1/8.</p>

                <h4 className="font-semibold text-foreground mt-4">Division</h4>
                <p>To divide fractions, you multiply the first fraction by the <strong>reciprocal</strong> of the second. The reciprocal of a fraction is found by swapping its numerator and denominator (e.g., the reciprocal of 3/4 is 4/3).</p>
                <p className="font-mono bg-muted p-2 rounded-md my-2 text-center">a/b ÷ c/d = a/b × d/c = ad/bc</p>
                <p><strong>Example:</strong> 3/4 ÷ 1/6 = 3/4 × 6/1 = 18/4, which simplifies to 9/2.</p>
            </div>
            
            <div>
                <h3 className="text-xl font-semibold text-foreground">Simplifying Fractions</h3>
                <p className="mt-2">It's standard practice to present fractions in their simplest (or lowest) form. For example, 220/440 is more elegantly written as 1/2. To simplify, you divide both the numerator and the denominator by their <strong>Greatest Common Factor (GCF)</strong>. Our calculator handles this for you automatically.</p>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-foreground">Converting Between Decimals and Fractions</h3>
                 <h4 className="font-semibold text-foreground mt-4">Decimal to Fraction</h4>
                <p>To convert a decimal, count the number of decimal places. This number tells you which power of 10 to use as the denominator. For example, the number 0.1234 has four decimal places, so we use 10⁴ (10,000) as the denominator. The fraction becomes 1234/10000, which simplifies to 617/5000.</p>
                
                 <h4 className="font-semibold text-foreground mt-4">Fraction to Decimal</h4>
                <p>To convert a fraction to a decimal, simply divide the numerator by the denominator. For example, 1/2 can be converted to 0.5. For more complex fractions, this requires long division.</p>
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
                    <AccordionTrigger>What is the difference between a proper and an improper fraction?</AccordionTrigger>
                    <AccordionContent>
                        A **proper fraction** has a numerator that is smaller than its denominator (e.g., 3/4). An **improper fraction** has a numerator that is greater than or equal to its denominator (e.g., 5/4). Improper fractions can also be written as mixed numbers.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>What is a mixed number?</AccordionTrigger>
                    <AccordionContent>
                        A mixed number combines a whole number and a proper fraction (e.g., 1 ¼). It represents the same value as an improper fraction. For example, 1 ¼ is the same as 5/4.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>Why can't the denominator be zero?</AccordionTrigger>
                    <AccordionContent>
                        Division by zero is undefined in mathematics. Since the fraction bar represents division, a denominator of zero would mean dividing by zero, which is not a valid mathematical operation.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger>How do I simplify a fraction?</AccordionTrigger>
                    <AccordionContent>
                        To simplify a fraction, you find the Greatest Common Factor (GCF) of the numerator and the denominator, and then divide both by the GCF. For example, to simplify 12/18, the GCF of 12 and 18 is 6. Dividing both by 6 gives 2/3.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                    <AccordionTrigger>How do these calculators handle large numbers?</AccordionTrigger>
                    <AccordionContent>
                       The "Big Number Fraction Calculator" uses BigInt, a feature in modern JavaScript that allows for calculations with integers of arbitrary size. This means it can handle fractions with very large numerators and denominators without losing precision, unlike standard number types.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
    </Card>
);


export default function FractionPage() {
  return (
    <>
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <div className="flex flex-1 flex-col">
        <PageHeader title="Fraction Calculator" />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row lg:gap-8">
                <div className="flex-1 space-y-8">
                    <section className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                            Fraction Calculator
                        </h1>
                        <p className="mt-4 text-lg text-muted-foreground">
                            A free online fraction calculator for all your arithmetic needs, including addition, subtraction, multiplication, and division, plus simplification and decimal conversion.
                        </p>
                    </section>
                    <FractionCalculators />
                    <EducationalContent />
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
