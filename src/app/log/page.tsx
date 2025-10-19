
import { PageHeader } from '@/components/page-header';
import LogCalculator from '@/components/calculators/log-calculator';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Log Calculator (Logarithm)',
    description: 'A free online log calculator. Solve for base, argument, or result in the logarithm equation log_b(x)=y. Supports "e" as a base.',
};

const EducationalContent = () => (
    <Card>
        <CardHeader>
            <CardTitle>What is a Logarithm?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground">
            <div>
                <p>The logarithm, or <b>log</b>, is the inverse of the mathematical operation of exponentiation. This means that the log of a number is the number that a fixed base has to be raised to in order to yield the number. Conventionally, <b>log</b> implies that base 10 is being used, though the base can technically be anything. When the base is <b>e</b>, <b>ln</b> is usually written, rather than loge. <b>log₂</b>, the binary logarithm, is another base that is typically used with logarithms. If, for example:</p>
                <p className="font-mono bg-muted p-2 rounded-md my-2 text-center">x = bʸ; then y = logₐx; where b is the base</p>
                <p>Each of the mentioned bases is typically used in different applications. Base 10 is commonly used in science and engineering, base e in math and physics, and base 2 in computer science.</p>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-foreground">Basic Log Rules</h3>
                <div className="space-y-4 mt-2">
                    <div>
                        <h4 className="font-semibold text-foreground">Product Rule</h4>
                        <p>When the argument of a logarithm is the product of two numerals, the logarithm can be re-written as the addition of the logarithm of each of the numerals.</p>
                        <p className="font-mono bg-muted p-2 rounded-md my-2">logb(x × y) = logbx + logby</p>
                        <p className="text-sm"><b>EX:</b> log(1 × 10) = log(1) + log(10) = 0 + 1 = 1</p>
                    </div>
                     <div>
                        <h4 className="font-semibold text-foreground">Quotient Rule</h4>
                        <p>When the argument of a logarithm is a fraction, the logarithm can be re-written as the subtraction of the logarithm of the numerator minus the logarithm of the denominator.</p>
                        <p className="font-mono bg-muted p-2 rounded-md my-2">logb(x / y) = logbx - logby</p>
                        <p className="text-sm"><b>EX:</b> log(10 / 2) = log(10) - log(2) = 1 - 0.301 = 0.699</p>
                    </div>
                     <div>
                        <h4 className="font-semibold text-foreground">Power Rule</h4>
                        <p>If there is an exponent in the argument of a logarithm, the exponent can be pulled out of the logarithm and multiplied.</p>
                        <p className="font-mono bg-muted p-2 rounded-md my-2">logb(xʸ) = y × logbx</p>
                        <p className="text-sm"><b>EX:</b> log(2⁶) = 6 × log(2) = 1.806</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-foreground">Change of Base Rule</h4>
                        <p>It is also possible to change the base of the logarithm using the following rule.</p>
                        <p className="font-mono bg-muted p-2 rounded-md my-2">logb(x) = logk(x) / logk(b)</p>
                        <p className="text-sm"><b>EX:</b> log₁₀(x) = log₂(x) / log₂(10)</p>
                    </div>
                     <div>
                        <h4 className="font-semibold text-foreground">Reciprocal Rule</h4>
                        <p>To switch the base and argument, use the following rule.</p>
                        <p className="font-mono bg-muted p-2 rounded-md my-2">logb(c) = 1 / logc(b)</p>
                        <p className="text-sm"><b>EX:</b> log₅(2) = 1 / log₂(5)</p>
                    </div>
                     <div>
                        <h4 className="font-semibold text-foreground">Other Common Rules</h4>
                        <ul className="list-disc list-inside space-y-1 font-mono text-sm bg-muted p-4 rounded-md">
                            <li>logb(1) = 0</li>
                            <li>logb(b) = 1</li>
                            <li>logb(0) = undefined</li>
                            <li>lim(x→0) logb(x) = -∞</li>
                            <li>ln(eˣ) = x</li>
                        </ul>
                    </div>
                </div>
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
                    Please provide any two values to calculate the third in the logarithm equation logbx=y. It can accept "e" as a base input.
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
