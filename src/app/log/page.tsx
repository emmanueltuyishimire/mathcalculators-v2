
import { PageHeader } from '@/components/page-header';
import LogCalculator from '@/components/calculators/log-calculator';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const metadata: Metadata = {
    title: 'Log Calculator (Logarithm)',
    description: 'A free online log calculator. Solve for base, argument, or result in the logarithm equation log_b(x)=y. Supports "e" as a base.',
};

const EducationalContent = () => (
    <Card>
        <CardHeader>
            <CardTitle>Logarithm Explained</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground">
            <div>
                <h3 className="text-xl font-semibold text-foreground">1. Logarithm Basics</h3>
                <p className="mt-2">A logarithm answers the question:</p>
                <p className="font-mono bg-muted p-4 rounded-md my-2 text-center text-lg">If bˣ = y, then logₐ(y) = x</p>
                <p>Where:</p>
                <ul className="list-disc list-inside pl-4 mt-2">
                    <li><b>b</b> = base of the logarithm (b &gt; 0, b ≠ 1)</li>
                    <li><b>y</b> = number</li>
                    <li><b>x</b> = logarithm value</li>
                </ul>
                <h4 className="font-semibold text-foreground mt-4">Common Logarithms:</h4>
                <ul className="list-disc list-inside pl-4 mt-2">
                    <li><b>Base 10:</b> log₁₀(y)</li>
                    <li><b>Base e (natural log):</b> ln(y) = logₑ(y)</li>
                </ul>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-foreground">2. Logarithm Properties</h3>
                <p className="mt-2">These rules are useful for solving logarithmic equations.</p>
                <div className="space-y-4 mt-2">
                    <p><b>Product Rule:</b> <code className="font-mono bg-muted p-1 rounded-md">logₐ(M · N) = logₐ(M) + logₐ(N)</code></p>
                    <p><b>Quotient Rule:</b> <code className="font-mono bg-muted p-1 rounded-md">logₐ(M / N) = logₐ(M) - logₐ(N)</code></p>
                    <p><b>Power Rule:</b> <code className="font-mono bg-muted p-1 rounded-md">logₐ(Mᵏ) = k · logₐ(M)</code></p>
                    <p><b>Change of Base Formula:</b> <code className="font-mono bg-muted p-1 rounded-md">logₐ(y) = logₖ(y) / logₖ(b)</code><br/><span className="text-xs italic">(Calculators often use this with base 10 or e).</span></p>
                </div>
            </div>
            
            <div>
                <h3 className="text-xl font-semibold text-foreground">3. Calculator Logic</h3>
                <p className="mt-2">A log calculator can solve for any missing variable in the equation <code className="font-mono bg-muted p-1 rounded-md">logₐ(y) = x</code>.</p>
                <div className="font-mono bg-muted p-4 rounded-md my-2 text-sm">
                    <p>// Inputs: base (b), number (y), result (x)</p>
                    <p>// Determine which variable is missing</p>
                    <br />
                    <p><b>if (x is missing)</b> // Find log value</p>
                    <p className="pl-4">x = Math.log(y) / Math.log(b)</p>
                    <br />
                    <p><b>else if (y is missing)</b> // Find number from log</p>
                    <p className="pl-4">y = Math.pow(b, x)</p>
                    <br />
                    <p><b>else if (b is missing)</b> // Solve for base</p>
                    <p className="pl-4">b = Math.pow(y, 1/x)</p>
                </div>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-foreground">4. Example Usage</h3>
                 <Table className="mt-2">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Input</TableHead>
                            <TableHead>Output</TableHead>
                            <TableHead>Formula Used</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>log₂(8)</TableCell>
                            <TableCell>3</TableCell>
                            <TableCell>2³ = 8</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>log₁₀(1000)</TableCell>
                            <TableCell>3</TableCell>
                            <TableCell>10³ = 1000</TableCell>
                        </TableRow>
                         <TableRow>
                            <TableCell>ln(e²)</TableCell>
                            <TableCell>2</TableCell>
                            <TableCell>Natural log property</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Find y if log₂(y)=5</TableCell>
                            <TableCell>32</TableCell>
                            <TableCell>y = 2⁵</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </CardContent>
    </Card>
);

export default function LogPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Log Calculator (Logarithm)" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-2xl space-y-8">
            <section className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Log Calculator
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Please provide any two values to calculate the third in the logarithm equation logₐ(y)=x. It can accept "e" as a base input.
                </p>
            </section>
            
            <LogCalculator />

            <EducationalContent />

            <section className="text-center">
                <h2 className="text-2xl font-bold text-foreground">Related Calculators</h2>
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                    <Button asChild variant="outline">
                        <Link href="/scientific">Scientific Calculator</Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link href="/exponent">Exponent Calculator</Link>
                    </Button>
                </div>
            </section>
        </div>
      </main>
    </div>
  );
}
