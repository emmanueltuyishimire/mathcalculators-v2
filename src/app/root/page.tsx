
"use client";

import { PageHeader } from '@/components/page-header';
import RootCalculator from '@/components/calculators/root-calculator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const HowToUseGuide = () => (
    <Card>
        <CardHeader>
            <CardTitle>How to Use the Root Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
            <div>
                <h3 className="text-lg font-semibold text-foreground">Square Root Calculator</h3>
                <ol className="list-decimal list-inside pl-4 mt-1">
                    <li>Enter the number you want to find the square root of in the input field.</li>
                    <li>Click the "Calculate" button.</li>
                    <li>The result will appear below.</li>
                </ol>
            </div>
             <div>
                <h3 className="text-lg font-semibold text-foreground">Cube Root Calculator</h3>
                <ol className="list-decimal list-inside pl-4 mt-1">
                    <li>Enter the number you want to find the cube root of.</li>
                    <li>Click "Calculate" to see the result.</li>
                </ol>
            </div>
             <div>
                <h3 className="text-lg font-semibold text-foreground">General Root Calculator</h3>
                <ol className="list-decimal list-inside pl-4 mt-1">
                    <li>Enter the degree of the root (n) in the small input field above the root symbol.</li>
                    <li>Enter the number you want to find the root of in the main input field.</li>
                    <li>Click "Calculate" to compute the nth root.</li>
                </ol>
            </div>
        </CardContent>
    </Card>
);

const EducationalContent = () => (
    <Card>
        <CardHeader>
            <CardTitle>Understanding Roots: A Comprehensive Guide</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground">
            <div>
                <h3 className="text-xl font-semibold text-foreground">What is a Root?</h3>
                <p className="mt-2">In mathematics, finding a root is the inverse operation of raising a number to a power. The general root, or the <strong>nth root</strong> of a number <em>a</em>, is another number <em>b</em> that, when multiplied by itself <em>n</em> times, equals <em>a</em>.</p>
                <p className="font-mono bg-muted p-4 rounded-md text-center text-lg my-2"><sup>n</sup>√a = b  &nbsp;&nbsp;which means&nbsp;&nbsp;  bⁿ = a</p>
                <p>The most common roots are the <strong>square root (n=2)</strong> and the <strong>cube root (n=3)</strong>, but you can find any degree of root for a number.</p>
            </div>
            
            <div>
                <h3 className="text-xl font-semibold text-foreground">Core Formulas & Calculator Logic</h3>
                <p className="mt-2">Roots can be expressed as fractional exponents, which is how most calculators compute them:</p>
                 <ul className="list-disc list-inside mt-2 space-y-2">
                    <li><b>Square Root:</b> <code className="font-mono bg-muted p-1 rounded-md">√x = x¹/²</code></li>
                    <li><b>Cube Root:</b> <code className="font-mono bg-muted p-1 rounded-md">∛x = x¹/³</code></li>
                    <li><b>General Nth Root:</b> <code className="font-mono bg-muted p-1 rounded-md">ⁿ√x = x¹/ⁿ</code></li>
                </ul>
                <p className="mt-4">The pseudocode below shows how a calculator uses this logic. It also includes a check to handle negative numbers correctly for odd-degree roots.</p>
                <div className="font-mono text-sm bg-muted p-4 rounded-md space-y-2 mt-2">
                    <p><span className="text-muted-foreground">// General n-th root logic</span><br/>function nthRoot(x, n) &#123;<br/>&nbsp;&nbsp;if (x &lt; 0 &amp;&amp; n % 2 === 0) &#123;<br/>&nbsp;&nbsp;&nbsp;&nbsp;return "Imaginary"; // Cannot take an even root of a negative number<br/>&nbsp;&nbsp;&#125;<br/>&nbsp;&nbsp;return Math.pow(x, 1/n);<br/>&#125;</p>
                </div>
            </div>
            
            <div>
                 <h3 className="text-xl font-semibold text-foreground">Example Calculations</h3>
                <Table>
                    <TableHeader>
                        <TableRow><TableHead>Operation</TableHead><TableHead>Input</TableHead><TableHead>Output</TableHead><TableHead>Meaning</TableHead></TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow><TableCell>√x</TableCell><TableCell>√(25)</TableCell><TableCell>5</TableCell><TableCell>5 × 5 = 25</TableCell></TableRow>
                        <TableRow><TableCell>∛x</TableCell><TableCell>∛(27)</TableCell><TableCell>3</TableCell><TableCell>3 × 3 × 3 = 27</TableCell></TableRow>
                        <TableRow><TableCell>⁴√x</TableCell><TableCell>n=4, x=16</TableCell><TableCell>2</TableCell><TableCell>2 × 2 × 2 × 2 = 16</TableCell></TableRow>
                        <TableRow><TableCell>⁵√x</TableCell><TableCell>n=5, x=-32</TableCell><TableCell>-2</TableCell><TableCell>(-2)⁵ = -32</TableCell></TableRow>
                    </TableBody>
                </Table>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-foreground">How to Estimate a Square Root Manually</h3>
                <p>While calculators make it instant, you can estimate roots yourself. This method, similar to one used by ancient Babylonians, is a great way to understand how root-finding works.</p>
                <ol className="list-decimal list-inside mt-2 space-y-2">
                    <li><b>Make an initial guess (b).</b></li>
                    <li><b>Divide the original number by your guess:</b> c = a / b.</li>
                    <li><b>Average your guess and the result:</b> new_guess = (b + c) / 2.</li>
                    <li><b>Repeat</b> with the new guess until your answer is precise enough.</li>
                </ol>
                <div className="p-4 border-l-4 border-primary/50 bg-muted/50 rounded-r-lg mt-2">
                  <h4 className="font-semibold">Example: Find √27 to 3 decimal places</h4>
                  <ul className="font-mono text-sm mt-2 space-y-1">
                    <li><b>1. Guess:</b> Let's start with 5 (since 5²=25).</li>
                    <li><b>2. Divide & Average:</b> 27 / 5 = 5.4. &nbsp;&nbsp; Average = (5 + 5.4) / 2 = 5.2.</li>
                    <li><b>3. Repeat:</b> 27 / 5.2 = 5.192. &nbsp;&nbsp; Average = (5.2 + 5.192) / 2 = 5.196.</li>
                    <li><b>4. Repeat again:</b> 27 / 5.196 = 5.1963. The numbers are now very close.</li>
                  </ul>
                   <p className="mt-2 font-semibold">The result is approximately <b>5.196</b>.</p>
                </div>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-foreground">Estimating an Nth Root</h3>
                <p>A similar, though more complex, iterative method exists for nth roots:</p>
                 <ol className="list-decimal list-inside mt-2 space-y-2">
                    <li>Estimate a number <em>b</em>.</li>
                    <li>Calculate a new guess: <b>New Guess = [(n-1)b + a/bⁿ⁻¹] / n</b></li>
                    <li>Repeat with the new guess.</li>
                </ol>
                 <div className="p-4 border-l-4 border-primary/50 bg-muted/50 rounded-r-lg mt-2">
                  <h4 className="font-semibold">Example: Find ³√64</h4>
                   <ul className="font-mono text-sm mt-2 space-y-1">
                    <li><b>1. Guess:</b> 3 (since 3³=27). Here, a=64, n=3.</li>
                    <li><b>2. Calculate:</b> New Guess = [(2×3) + 64/3²] / 3 = [6 + 7.11] / 3 ≈ 4.37.</li>
                    <li><b>3. Repeat:</b> New Guess = [(2×4.37) + 64/4.37²] / 3 = [8.74 + 3.35] / 3 ≈ 4.03.</li>
                    <li><b>4. Repeat again:</b> New Guess = [(2×4.03) + 64/4.03²] / 3 = [8.06 + 3.94] / 3 ≈ 4.00.</li>
                  </ul>
                  <p className="mt-2 font-semibold">The result converges on <b>4</b>.</p>
                </div>
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
                    <AccordionTrigger>What's the difference between a square root and a cube root?</AccordionTrigger>
                    <AccordionContent>
                        The **square root** of a number is a value that, when multiplied by itself, gives the original number (e.g., √9 = 3 because 3×3=9). The **cube root** is a value that, when multiplied by itself three times, gives the original number (e.g., ∛8 = 2 because 2×2×2=8).
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Can I find the root of a negative number?</AccordionTrigger>
                    <AccordionContent>
                        It depends on the root's degree (n).<br/>
                        - If 'n' is **odd** (like a cube root), you can find the real root of a negative number. For example, ∛(-8) = -2.<br/>
                        - If 'n' is **even** (like a square root), the real root of a negative number does not exist. The result is an imaginary number (e.g., √-4 = 2i), which this calculator will indicate.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>What is the "nth" root?</AccordionTrigger>
                    <AccordionContent>
                        The "nth" root is a generalization of square and cube roots. It's the number that needs to be multiplied by itself 'n' times to get the original number. The General Root Calculator lets you specify any 'n' you want.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger>Is a root the same as a fractional exponent?</AccordionTrigger>
                    <AccordionContent>
                        Yes. Finding the nth root of a number 'x' is equivalent to raising 'x' to the power of `1/n`. For example, √9 is the same as 9¹/². This is how most calculators compute roots.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
    </Card>
);

export default function RootPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Root Calculator" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-2xl space-y-8">
            <section className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Root Calculator
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                   Easily calculate square roots, cube roots, and nth roots for any number.
                </p>
            </section>
            <RootCalculator />
            <HowToUseGuide />
            <EducationalContent />
            <FaqSection />
            <section className="text-center">
                <h2 className="text-2xl font-bold text-foreground">Related Calculators</h2>
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                    <Button asChild variant="outline">
                        <Link href="/exponent">Exponent Calculator</Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link href="/scientific">Scientific Calculator</Link>
                    </Button>
                     <Button asChild variant="outline">
                        <Link href="/log">Log Calculator</Link>
                    </Button>
                </div>
            </section>
        </div>
      </main>
    </div>
  );
}
