
import { PageHeader } from '@/components/page-header';
import ProbabilityCalculator from '@/components/calculators/probability-calculator';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
    title: 'Probability Calculator',
    description: 'Calculate probabilities for two events, series of events, and normal distributions.',
};

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


export default function ProbabilityPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Probability Calculator" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-2xl space-y-8">
            <section className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Probability Calculator
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Tools for calculating two-event probabilities, series of independent events, and normal distribution probabilities.
                </p>
            </section>
            <ProbabilityCalculator />
            <EducationalContent />
        </div>
      </main>
    </div>
  );
}
