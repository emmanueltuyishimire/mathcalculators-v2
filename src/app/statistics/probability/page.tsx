
"use client";

import { PageHeader } from '@/components/page-header';
import ProbabilityCalculator from '@/components/calculators/probability-calculator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { ZTable } from '@/components/z-table';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { RelatedCalculatorsSidebar } from '@/components/related-calculators-sidebar';

const HowToUseGuide = () => (
    <Card>
        <CardHeader>
            <CardTitle>How to Use the Probability Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground">
            <p>This calculator can help you compute probabilities for two independent events, series of events, and normal distributions. Follow the instructions below for each section.</p>

            <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">1. Probability of Two Independent Events</h3>
                <p>This section calculates probabilities like union, intersection, complement, exclusive OR, and neither for two independent events.</p>
                <ol className="list-decimal list-inside mt-2 space-y-1">
                    <li>Enter the probability of Event A in the <strong>P(A)</strong> field (between 0 and 1).</li>
                    <li>Enter the probability of Event B in the <strong>P(B)</strong> field (between 0 and 1).</li>
                    <li>Click <strong>Calculate</strong>.</li>
                </ol>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">2. Probability of a Series of Independent Events</h3>
                <p>This section computes probabilities for repeated independent events.</p>
                <ol className="list-decimal list-inside mt-2 space-y-1">
                    <li>Enter the probability of an event and the number of times it is repeated.</li>
                    <li>Click <strong>Calculate</strong>.</li>
                </ol>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">3. Probability of a Normal Distribution</h3>
                <p>This section calculates the area under the curve for a normal distribution.</p>
                 <ol className="list-decimal list-inside mt-2 space-y-1">
                    <li>Enter the <strong>mean (μ)</strong> and <strong>standard deviation (σ)</strong>.</li>
                    <li>Enter the <strong>Left Bound (Lb)</strong> and <strong>Right Bound (Rb)</strong>. Use <code>-inf</code> for negative infinity and <code>inf</code> for positive infinity.</li>
                    <li>Click <strong>Calculate</strong>.</li>
                </ol>
            </div>

             <div className="p-4 bg-accent/10 rounded-lg">
                <h4 className="font-semibold text-accent-foreground">💡 General Notes</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground mt-2">
                    <li>All probabilities must be between 0 and 1.</li>
                    <li>The calculator assumes events are independent.</li>
                    <li>For repeated or series events, the formula assumes each trial is independent.</li>
                </ul>
            </div>
        </CardContent>
    </Card>
);


const EducationalContent = () => (
    <Card>
        <CardHeader>
            <CardTitle>Understanding the Logic Behind Probability Calculations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
            <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">1. Probability of Two Independent Events</h3>
                <p className="text-muted-foreground mb-4">
                    For two independent events, A and B, the probability of one event occurring does not affect the probability of the other. The following formulas apply:
                </p>
                <div className="space-y-4">
                    <p><b>Complement P(A'):</b> Probability that A does not occur. <code className="font-mono bg-muted p-1 rounded-md">P(A') = 1 - P(A)</code></p>
                    <p><b>Intersection P(A∩B):</b> Probability that both A and B occur. <code className="font-mono bg-muted p-1 rounded-md">P(A∩B) = P(A) × P(B)</code></p>
                    <p><b>Union P(A∪B):</b> Probability that A or B or both occur. <code className="font-mono bg-muted p-1 rounded-md">P(A∪B) = P(A) + P(B) - P(A∩B)</code></p>
                    <p><b>Exclusive OR P(AΔB):</b> Probability that A or B occurs, but not both. <code className="font-mono bg-muted p-1 rounded-md">P(AΔB) = P(A) + P(B) - 2P(A∩B)</code></p>
                    <p><b>Neither P((A∪B)'):</b> Probability that neither A nor B occurs. <code className="font-mono bg-muted p-1 rounded-md">P((A∪B)') = (1 - P(A)) × (1 - P(B))</code></p>
                </div>
            </div>

            <Separator />

            <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">2. Probability of a Series of Independent Events</h3>
                <p className="text-muted-foreground mb-4">
                    If an event A occurs independently multiple times (n times) with probability P(A) on each trial:
                </p>
                <div className="space-y-4">
                    <p><b>All Occur:</b> Probability that event A occurs in all n trials. <code className="font-mono bg-muted p-1 rounded-md">P(all A) = P(A)ⁿ</code></p>
                    <p><b>At Least One Occurs:</b> Probability that event A occurs at least once in n trials. <code className="font-mono bg-muted p-1 rounded-md">P(at least one) = 1 - (1 - P(A))ⁿ</code></p>
                </div>
            </div>

            <Separator />

             <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">3. Normal Distribution Probability</h3>
                <p className="text-muted-foreground mb-4">
                    For a normal distribution N(μ, σ²), where μ is the mean and σ is the standard deviation:
                </p>
                 <div className="space-y-4">
                    <p><b>Standardize to Z-score:</b> Convert a random variable X to a Z-score. <code className="font-mono bg-muted p-1 rounded-md">Z = (X - μ) / σ</code></p>
                    <p><b>Probability Between Bounds (a, b):</b> This is the area under the curve between a and b, found using the Cumulative Distribution Function (CDF). <code className="font-mono bg-muted p-1 rounded-md">P(a ≤ X ≤ b) = CDF(Z_b) - CDF(Z_a)</code></p>
                    <p><b>Probability Outside Bounds:</b> <code className="font-mono bg-muted p-1 rounded-md">1 - P(a ≤ X ≤ b)</code></p>
                    <p><b>Confidence Intervals:</b> Symmetric range around the mean. <code className="font-mono bg-muted p-1 rounded-md">CI = μ ± Z * σ</code>, where Z is the z-score for a given confidence level.</p>
                </div>
            </div>
            
             <Separator />

            <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Summary of Key Formulas</h3>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Concept</TableHead>
                            <TableHead>Formula</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow><TableCell>Complement</TableCell><TableCell><code className="font-mono text-xs">P(A') = 1 - P(A)</code></TableCell></TableRow>
                        <TableRow><TableCell>Intersection</TableCell><TableCell><code className="font-mono text-xs">P(A∩B) = P(A)P(B)</code></TableCell></TableRow>
                        <TableRow><TableCell>Union</TableCell><TableCell><code className="font-mono text-xs">P(A∪B) = P(A) + P(B) - P(A∩B)</code></TableCell></TableRow>
                        <TableRow><TableCell>XOR</TableCell><TableCell><code className="font-mono text-xs">P(AΔB) = P(A) + P(B) - 2P(A∩B)</code></TableCell></TableRow>
                        <TableRow><TableCell>Neither</TableCell><TableCell><code className="font-mono text-xs">P((A∪B)') = (1-P(A))(1-P(B))</code></TableCell></TableRow>
                        <TableRow><TableCell>Series (all occur)</TableCell><TableCell><code className="font-mono text-xs">P(A)ⁿ</code></TableCell></TableRow>
                        <TableRow><TableCell>Series (at least one)</TableCell><TableCell><code className="font-mono text-xs">1 - (1-P(A))ⁿ</code></TableCell></TableRow>
                        <TableRow><TableCell>Normal Probability</TableCell><TableCell><code className="font-mono text-xs">CDF(Z_b) - CDF(Z_a)</code></TableCell></TableRow>
                        <TableRow><TableCell>Confidence Interval</TableCell><TableCell><code className="font-mono text-xs">μ ± Zσ</code></TableCell></TableRow>
                    </TableBody>
                </Table>
            </div>
        </CardContent>
    </Card>
);

const ZTableSection = () => (
    <div className="space-y-8">
        <section className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Z-Table (0 to Z)
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              This table shows the area under the standard normal curve from the mean (0) to a positive Z-score.
            </p>
        </section>
        <ZTable />
        <Card>
            <CardHeader>
              <CardTitle>How to Use the Z-Table</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground">1. Find Your Z-Score</h3>
                <p>Your Z-score should be in the format `X.Y` (e.g., 1.23). The row indicates the integer and first decimal place (e.g., `1.2`), and the column gives the second decimal place (e.g., `0.03`).</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">2. Locate the Value in the Table</h3>
                <p>Find the row for `1.2` and the column for `0.03`. The intersecting cell contains the area, which is `0.39065`.</p>
              </div>
               <div>
                <h3 className="font-semibold text-foreground">3. Interpret the Area</h3>
                <p>The value `0.39065` means there is a 39.07% probability of a random variable falling between the mean (0) and a Z-score of 1.23.</p>
              </div>
            </CardContent>
        </Card>
    </div>
);


export default function ProbabilityPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Probability Calculator" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row lg:gap-8">
            <div className="flex-1 space-y-8">
                <section className="text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Probability Calculator
                    </h1>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Tools for calculating two-event probabilities, series of independent events, and normal distribution probabilities.
                    </p>
                </section>
                <ProbabilityCalculator />
                <HowToUseGuide />
                <EducationalContent />
                <Separator className="my-12" />
                <ZTableSection />
                <section className="text-center text-sm text-muted-foreground">
                    <h3 className="font-semibold text-foreground">Related Calculators</h3>
                    <div className="flex justify-center flex-wrap gap-2 mt-2">
                        <Button asChild variant="outline" size="sm">
                            <Link href="/statistics/permutation-combination">Permutation & Combination</Link>
                        </Button>
                        <Button asChild variant="outline" size="sm">
                            <Link href="/statistics/z-score">Z-Score Calculator</Link>
                        </Button>
                        <Button asChild variant="outline" size="sm">
                            <Link href="/statistics/confidence-interval">Confidence Interval Calculator</Link>
                        </Button>
                    </div>
                </section>
            </div>
             <aside className="mt-8 lg:mt-0 lg:w-72 lg:flex-shrink-0">
                <RelatedCalculatorsSidebar />
            </aside>
        </div>
      </main>
    </div>
  );
}
