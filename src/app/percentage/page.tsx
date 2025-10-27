
"use client";

import { PageHeader } from '@/components/page-header';
import PercentageCalculator from '@/components/calculators/percentage-calculator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RelatedCalculatorsSidebar } from '@/components/related-calculators-sidebar';

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Percentage Calculator",
  "operatingSystem": "All",
  "applicationCategory": "EducationalApplication",
  "description": "A versatile set of free online calculators for various percentage-based problems, including percentage of a number, percentage change, and more.",
  "url": "https://maths.calculation.site/percentage",
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
    "name": "Percentage Calculator",
    "item": "https://maths.calculation.site/percentage"
  }]
};

const EducationalContent = () => (
    <Card>
        <CardHeader>
            <CardTitle>Mastering Percentages: A Practical Guide</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground">
            <div>
                <h3 className="text-xl font-semibold text-foreground">What is a Percentage?</h3>
                <p className="mt-2">A percentage is a number or ratio expressed as a fraction of 100. It is often denoted using the percent sign, "%". For example, 45% is equivalent to the decimal 0.45, or the fraction 45/100.</p>
                <p className="mt-2">To calculate a percentage, you multiply the value of a ratio by 100. For instance, if 25 out of 50 students in a class are male, that represents a ratio of 25/50 = 0.5. Multiplying this by 100 gives you 50%. This means 50% of the students are male.</p>
            </div>
             <div>
                <h3 className="text-xl font-semibold text-foreground">The Three Basic Percentage Problems</h3>
                <p className="mt-2">Most percentage problems can be broken down into three simple types, all of which our calculator handles:</p>
                <ol className="list-decimal list-inside space-y-2 mt-2">
                    <li>
                        <b>Finding a percentage of a number:</b> <span className="italic">What is X% of Y?</span>
                        <p className="text-sm pl-4">This is the most common type. For example, "What is 20% of 300?". The formula is: <code className="font-mono bg-muted p-1 rounded-md">(X / 100) * Y</code>.</p>
                    </li>
                    <li>
                        <b>Finding the percentage one number is of another:</b> <span className="italic">X is what % of Y?</span>
                        <p className="text-sm pl-4">This is used to determine a ratio. For example, "15 is what % of 50?". The formula is: <code className="font-mono bg-muted p-1 rounded-md">(X / Y) * 100</code>.</p>
                    </li>
                    <li>
                        <b>Finding the original number from a percentage:</b> <span className="italic">X is Y% of what?</span>
                        <p className="text-sm pl-4">This is useful for "reverse" calculations. For example, "20 is 40% of what number?". The formula is: <code className="font-mono bg-muted p-1 rounded-md">X / (Y / 100)</code>.</p>
                    </li>
                </ol>
            </div>
             <div>
                <h3 className="text-xl font-semibold text-foreground">Percentage Change (Increase and Decrease)</h3>
                <p className="mt-2">Percentage change measures how much a value has changed relative to its initial value. It's useful for tracking growth or decline.</p>
                <p className="mt-2">To calculate an increase, you add the percentage to 1. To calculate a decrease, you subtract it. For example, to increase 500 by 10% (0.1):</p>
                <p className="font-mono bg-muted p-2 rounded-md my-2">500 × (1 + 0.1) = 550</p>
                <p className="mt-2">To decrease 500 by 10%:</p>
                <p className="font-mono bg-muted p-2 rounded-md my-2">500 × (1 - 0.1) = 450</p>
            </div>
             <div>
                <h3 className="text-xl font-semibold text-foreground">Real-World Examples</h3>
                <ul className="list-disc list-inside space-y-2 mt-2">
                    <li><b>Shopping:</b> Calculating a discount. If a $50 shirt is 20% off, you save <code className="font-mono bg-muted p-1 rounded-md">(20/100) * 50 = $10</code>.</li>
                    <li><b>Finance:</b> Calculating interest. If you earn 5% interest on a $1,000 investment, you get <code className="font-mono bg-muted p-1 rounded-md">(5/100) * 1000 = $50</code> in interest.</li>
                    <li><b>Statistics:</b> Expressing a part of a whole. If 300 out of 500 people prefer a product, that's <code className="font-mono bg-muted p-1 rounded-md">(300/500) * 100 = 60%</code>.</li>
                </ul>
            </div>
        </CardContent>
    </Card>
);

export default function PercentagePage() {
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
        <PageHeader title="Percentage Calculator" />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row lg:gap-8">
                <div className="flex-1 space-y-8">
                    <section className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                            Percentage Calculator
                        </h1>
                        <p className="mt-4 text-lg text-muted-foreground">
                            A collection of tools to help you with all your percentage calculation needs.
                        </p>
                    </section>
                    <PercentageCalculator />
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
