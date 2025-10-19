"use client";

import React from 'react';
import { PageHeader } from '@/components/page-header';
import ScientificCalculator from '@/components/calculators/log-calculator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const EducationalContent = () => (
    <Card>
        <CardHeader>
            <CardTitle>Logarithm Calculator Guide</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
            <div>
                <h3 className="text-xl font-semibold text-foreground">1. Logarithm Basics</h3>
                <p className="text-muted-foreground mt-2">
                    A logarithm answers the question: If <code className="font-mono bg-muted p-1 rounded-md">bˣ = y</code>, then <code className="font-mono bg-muted p-1 rounded-md">logₐ(y) = x</code>.
                </p>
                <ul className="list-disc list-inside mt-2 text-muted-foreground space-y-1">
                    <li><b>b</b> = base of the logarithm (must be positive and not equal to 1)</li>
                    <li><b>y</b> = the number you are taking the logarithm of</li>
                    <li><b>x</b> = the logarithm value (the exponent)</li>
                </ul>
                <h4 className="font-semibold text-foreground mt-2">Common Logarithms:</h4>
                <ul className="list-disc list-inside mt-1 text-muted-foreground">
                    <li><b>Base 10 (log₁₀):</b> Often written as just "log".</li>
                    <li><b>Base e (ln):</b> The natural logarithm, where e ≈ 2.718.</li>
                </ul>
            </div>
            
            <div>
                <h3 className="text-xl font-semibold text-foreground">2. Logarithm Properties</h3>
                <Table>
                    <TableBody>
                        <TableRow><TableCell>Product Rule</TableCell><TableCell className="font-mono">logₐ(M·N) = logₐ(M) + logₐ(N)</TableCell></TableRow>
                        <TableRow><TableCell>Quotient Rule</TableCell><TableCell className="font-mono">logₐ(M/N) = logₐ(M) - logₐ(N)</TableCell></TableRow>
                        <TableRow><TableCell>Power Rule</TableCell><TableCell className="font-mono">logₐ(Mᵏ) = k·logₐ(M)</TableCell></TableRow>
                        <TableRow><TableCell>Change of Base</TableCell><TableCell className="font-mono">logₐ(y) = logₖ(y) / logₖ(b)</TableCell></TableRow>
                    </TableBody>
                </Table>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-foreground">3. Calculator Logic (Pseudocode)</h3>
                <p className="text-muted-foreground mt-2">The calculator uses the following logic to solve for different variables:</p>
                <div className="font-mono text-sm bg-muted p-4 rounded-md space-y-2 mt-2">
                    <p>// Inputs: base (b), number (y), exponent (x)</p>
                    <p>// Determine which variable is missing</p>
                    <p><b>if</b> (x is missing) <span className="text-muted-foreground">// Find log value</span><br/>&nbsp;&nbsp;x = Math.log(y) / Math.log(b)</p>
                    <p><b>else if</b> (y is missing) <span className="text-muted-foreground">// Find number from log</span><br/>&nbsp;&nbsp;y = Math.pow(b, x)</p>
                    <p><b>else if</b> (b is missing) <span className="text-muted-foreground">// Solve for base</span><br/>&nbsp;&nbsp;b = Math.pow(y, 1/x)</p>
                </div>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-foreground">4. Example Usage</h3>
                <Table>
                    <TableHeader>
                        <TableRow><TableHead>Input</TableHead><TableHead>Output</TableHead><TableHead>Formula Used</TableHead></TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow><TableCell>log₂(8)</TableCell><TableCell>3</TableCell><TableCell>2³ = 8</TableCell></TableRow>
                        <TableRow><TableCell>log₁₀(1000)</TableCell><TableCell>3</TableCell><TableCell>10³ = 1000</TableCell></TableRow>
                        <TableRow><TableCell>ln(e²)</TableCell><TableCell>2</TableCell><TableCell>Natural log property</TableCell></TableRow>
                        <TableRow><TableCell>Find y if log₂(y) = 5</TableCell><TableCell>32</TableCell><TableCell>y = 2⁵</TableCell></TableRow>
                    </TableBody>
                </Table>
            </div>
        </CardContent>
    </Card>
);

const HowToUseGuide = () => (
    <Card>
      <CardHeader>
        <CardTitle>How to Use the Logarithm Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-muted-foreground">
        <ol className="list-decimal list-inside space-y-2">
          <li>
            <strong>Basic Calculations:</strong> Use the number keys to enter values. Use <code className="font-mono bg-muted p-1 rounded-md">log</code> for base 10, <code className="font-mono bg-muted p-1 rounded-md">ln</code> for base e.
            <br />
            <em>Example: To find log(100), press <code className="font-mono bg-muted p-1 rounded-md">log</code>, then <code className="font-mono bg-muted p-1 rounded-md">(</code>, <code className="font-mono bg-muted p-1 rounded-md">1</code>, <code className="font-mono bg-muted p-1 rounded-md">0</code>, <code className="font-mono bg-muted p-1 rounded-md">0</code>, <code className="font-mono bg-muted p-1 rounded-md">)</code>, and <code className="font-mono bg-muted p-1 rounded-md">=</code>.</em>
          </li>
          <li>
            <strong>Custom Base (log_b):</strong> To calculate a logarithm with a custom base, use the <code className="font-mono bg-muted p-1 rounded-md">log_b</code> key. The format is <code className="font-mono bg-muted p-1 rounded-md">log_BASE(NUMBER)</code>.
            <br />
            <em>Example: To find log₂(8), type <code className="font-mono bg-muted p-1 rounded-md">log_2(8)</code> using the keypad and then press <code className="font-mono bg-muted p-1 rounded-md">=</code>.</em>
          </li>
          <li>
            <strong>Exponents:</strong> Use the <code className="font-mono bg-muted p-1 rounded-md">xʸ</code> button for powers.
            <br />
            <em>Example: To calculate 2⁵, press <code className="font-mono bg-muted p-1 rounded-md">2</code>, then <code className="font-mono bg-muted p-1 rounded-md">^</code>, then <code className="font-mono bg-muted p-1 rounded-md">5</code>, and <code className="font-mono bg-muted p-1 rounded-md">=</code>.</em>
          </li>
          <li>
            <strong>Clear Buttons:</strong> Use <code className="font-mono bg-muted p-1 rounded-md">C</code> to clear the last entry or <code className="font-mono bg-muted p-1 rounded-md">AC</code> to clear everything.
          </li>
        </ol>
      </CardContent>
    </Card>
  );

export default function LogPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Log Calculator" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-2xl space-y-8">
            <section className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Log Calculator (Logarithm)
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    A powerful calculator for logarithmic and exponential functions.
                </p>
            </section>
            
            <ScientificCalculator />

            <HowToUseGuide />

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
