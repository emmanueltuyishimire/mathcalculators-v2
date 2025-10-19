
import { PageHeader } from '@/components/page-header';
import LogCalculator from '@/components/calculators/log-calculator';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const metadata: Metadata = {
    title: 'Logarithm Calculator (log)',
    description: 'A free online log calculator that solves for any variable in the logarithm equation (log base b of y = x). Supports common bases like e, 10, and 2.',
};

const EducationalContent = () => (
    <Card>
        <CardHeader>
            <CardTitle>Logarithms Unlocked: A Practical Guide</CardTitle>
            <CardDescription>From theory to practical application, here’s what you need to know about logarithms.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground">
            <div>
                <h3 className="text-xl font-semibold text-foreground">1. What is a Logarithm? The Core Idea</h3>
                <p className="mt-2">A logarithm is the inverse of exponentiation. It answers the question: "What exponent do I need to raise a specific base to, in order to get a certain number?"</p>
                <p className="font-mono bg-muted p-4 rounded-md my-2 text-center text-lg">If bˣ = y, then logₐ(y) = x</p>
                <p>The key players are:</p>
                <ul className="list-disc list-inside pl-4 mt-2">
                    <li><b>Base (b):</b> The number being raised to a power (must be positive and not 1).</li>
                    <li><b>Argument (y):</b> The number you want to get.</li>
                    <li><b>Logarithm (x):</b> The exponent you need.</li>
                </ul>
                <h4 className="font-semibold text-foreground mt-4">Commonly Used Bases:</h4>
                <ul className="list-disc list-inside pl-4 mt-2">
                    <li><b>Base 10 (Common Log):</b> log₁₀(y) — Widely used in science and engineering.</li>
                    <li><b>Base e (Natural Log):</b> ln(y) — Foundational in math, physics, and finance.</li>
                    <li><b>Base 2 (Binary Log):</b> log₂(y) — Essential in computer science and information theory.</li>
                </ul>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-foreground">2. The Rules of Logarithms</h3>
                <p className="mt-2">These properties are the shortcuts that make solving logarithmic equations much simpler.</p>
                <div className="space-y-4 mt-2">
                    <p><b>Product Rule (Adding Logs):</b> The log of a product is the sum of the logs. <br/><code className="font-mono text-sm bg-muted p-1 rounded-md">logₐ(M · N) = logₐ(M) + logₐ(N)</code></p>
                    <p><b>Quotient Rule (Subtracting Logs):</b> The log of a quotient is the difference of the logs. <br/><code className="font-mono text-sm bg-muted p-1 rounded-md">logₐ(M / N) = logₐ(M) - logₐ(N)</code></p>
                    <p><b>Power Rule (Multiplying by an Exponent):</b> An exponent inside a log can be moved out front as a multiplier. <br/><code className="font-mono text-sm bg-muted p-1 rounded-md">logₐ(Mᵏ) = k · logₐ(M)</code></p>
                    <p><b>Change of Base Formula:</b> This allows you to convert a log from one base to another—it’s how most calculators work! <br/><code className="font-mono text-sm bg-muted p-1 rounded-md">logₐ(y) = logₖ(y) / logₖ(b)</code></p>
                </div>
            </div>
            
            <div>
                <h3 className="text-xl font-semibold text-foreground">3. How the Calculator Works</h3>
                <p className="mt-2">Our calculator can solve for any of the three variables in the equation <code className="font-mono bg-muted p-1 rounded-md">logₐ(y) = x</code> by rearranging the formula based on your input.</p>
                <div className="font-mono bg-muted p-4 rounded-md my-2 text-sm">
                    <p><b>// To find the result (x):</b></p>
                    <p className="pl-4">x = log(y) / log(b)</p>
                    <p className="text-xs pl-4 italic">// Uses the change of base formula</p>
                    <br />
                    <p><b>// To find the argument (y):</b></p>
                    <p className="pl-4">y = b ** x</p>
                    <p className="text-xs pl-4 italic">// The exponential form</p>
                    <br />
                    <p><b>// To find the base (b):</b></p>
                    <p className="pl-4">b = y ** (1/x)</p>
                    <p className="text-xs pl-4 italic">// Solves for the root</p>
                </div>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-foreground">4. Quick Examples</h3>
                 <Table className="mt-2">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Problem</TableHead>
                            <TableHead>Solution</TableHead>
                            <TableHead>Because...</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>log₂(8)</TableCell>
                            <TableCell>3</TableCell>
                            <TableCell>2³ equals 8.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>log₁₀(1000)</TableCell>
                            <TableCell>3</TableCell>
                            <TableCell>10³ equals 1000.</TableCell>
                        </TableRow>
                         <TableRow>
                            <TableCell>ln(e²)</TableCell>
                            <TableCell>2</TableCell>
                            <TableCell>The natural log and 'e' cancel out.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Find y if log₂(y)=5</TableCell>
                            <TableCell>32</TableCell>
                            <TableCell>y = 2⁵, which is 32.</TableCell>
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
      <PageHeader title="Logarithm Calculator" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-2xl space-y-8">
            <section className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Logarithm Calculator (log)
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    A powerful tool to solve for any variable in a logarithm equation. Enter any two values in <code className="font-mono">logₐ(y)=x</code> to find the missing one. It supports any numeric base, including the natural log base 'e'.
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
