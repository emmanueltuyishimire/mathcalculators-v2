
import { PageHeader } from '@/components/page-header';
import LcmCalculator from '@/components/calculators/lcm-calculator';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Least Common Multiple (LCM) Calculator',
    description: 'A free online calculator to find the least common multiple (LCM) of a set of numbers. Includes step-by-step solutions using prime factorization.',
};


const EducationalContent = () => (
    <Card>
        <CardHeader>
            <CardTitle>Understanding the Least Common Multiple (LCM)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground">
            <div>
                <h3 className="text-xl font-semibold text-foreground">What is the LCM?</h3>
                <p className="mt-2">
                    The <strong>Least Common Multiple (LCM)</strong> of a set of integers is the smallest positive integer that is a multiple of every number in the set. For example, the LCM of 4 and 6 is 12, because 12 is the smallest positive number that is divisible by both 4 and 6.
                </p>
            </div>
            
            <div>
                <h3 className="text-xl font-semibold text-foreground">How to Find the LCM</h3>
                <p className="mt-2">There are several methods to find the LCM. The calculator above uses the prime factorization method, which is very efficient for larger numbers.</p>
                
                <div className="mt-4 space-y-4">
                    <h4 className="font-semibold text-foreground">Method 1: Listing Multiples (for small numbers)</h4>
                     <ol className="list-decimal list-inside space-y-2">
                        <li>List the multiples of each number.</li>
                        <li>Find the first multiple that appears in all lists.</li>
                    </ol>
                    <p className="p-2 bg-muted rounded-md text-sm">
                        <b>Example: Find the LCM of 4 and 6</b><br/>
                        Multiples of 4: 4, 8, <b>12</b>, 16, 20, 24, ...<br/>
                        Multiples of 6: 6, <b>12</b>, 18, 24, ...<br/>
                        The first common multiple is <b>12</b>.
                    </p>

                    <h4 className="font-semibold text-foreground">Method 2: Prime Factorization (used by this calculator)</h4>
                    <ol className="list-decimal list-inside space-y-2">
                        <li>Find the prime factorization of each number.</li>
                        <li>For each prime factor, find the highest power that appears in any of the factorizations.</li>
                        <li>Multiply these highest powers together.</li>
                    </ol>
                     <p className="p-2 bg-muted rounded-md text-sm">
                        <b>Example: Find the LCM of 12 and 18</b><br/>
                        Prime factorization of 12: 2 × 2 = 2²<br/>
                        Prime factorization of 18: 2 × 3 × 3 = 2 × 3²<br/>
                        Highest power of 2 is 2². Highest power of 3 is 3².<br/>
                        LCM = 2² × 3² = 4 × 9 = <b>36</b>.
                    </p>

                    <h4 className="font-semibold text-foreground">Method 3: Using the GCF (Greatest Common Factor)</h4>
                    <p>For two numbers, you can use the formula: <code className="font-mono bg-muted p-1 rounded-md">LCM(a, b) = (|a × b|) / GCF(a, b)</code>. To find the LCM of more than two numbers, you can apply this formula iteratively.</p>
                </div>
            </div>

             <div>
                <h3 className="text-xl font-semibold text-foreground">Real-World Applications</h3>
                <ul className="list-disc list-inside space-y-2 mt-2">
                    <li><b>Fractions:</b> Finding a common denominator to add or subtract fractions (e.g., to add 1/4 + 1/6, the LCM of 4 and 6 is 12).</li>
                    <li><b>Scheduling:</b> Solving problems where events repeat at different intervals. For example, if two events happen every 4 and 6 days respectively, they will occur on the same day every 12 days (the LCM).</li>
                    <li><b>Puzzles and Games:</b> Many mathematical puzzles and number theory problems rely on understanding LCM and GCF.</li>
                </ul>
            </div>
        </CardContent>
    </Card>
);

export default function LcmPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Least Common Multiple Calculator" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-2xl space-y-8">
          <LcmCalculator />
          <EducationalContent />
          <section className="text-center">
            <h2 className="text-2xl font-bold text-foreground">Related Calculators</h2>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
                <Button asChild variant="outline">
                    <Link href="/basic">Basic Calculators</Link>
                </Button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
