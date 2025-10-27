
"use client";

import { PageHeader } from '@/components/page-header';
import SequenceCalculators from '@/components/calculators/sequence-calculator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { RelatedCalculatorsSidebar } from '@/components/related-calculators-sidebar';

const HowToUse = () => (
    <Card>
        <CardHeader>
            <CardTitle>How to Use the Sequence Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
            <p className="text-muted-foreground">
                These calculators help you find specific terms and sums of Arithmetic, Geometric, and Fibonacci sequences. Follow the steps below depending on which calculator you’re using.
            </p>

            <div className="space-y-4">
                <h3 className="text-xl font-semibold">🔹 Arithmetic Sequence Calculator</h3>
                <p className="font-mono text-sm bg-muted p-2 rounded-md">aₙ = a₁ + f × (n − 1)</p>
                <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    <li><b>Enter the first number (a₁):</b> The starting term of your sequence. (e.g., 2)</li>
                    <li><b>Enter the common difference (f):</b> How much each term increases or decreases. (e.g., 5 for a sequence like 2, 7, 12, 17, …)</li>
                    <li><b>Enter which term (n) you want to find.</b> (e.g., 20)</li>
                    <li>Click <b>Calculate</b>.</li>
                </ol>
                <p className="text-muted-foreground">The calculator will display the nth term (aₙ) and the sum of the first n terms (Sₙ).</p>
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-semibold">🔹 Geometric Sequence Calculator</h3>
                <p className="font-mono text-sm bg-muted p-2 rounded-md">aₙ = a × rⁿ⁻¹</p>
                 <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    <li><b>Enter the first number (a):</b> The starting term. (e.g., 2)</li>
                    <li><b>Enter the common ratio (r):</b> The number you multiply each term by. (e.g., 5 for a sequence like 2, 10, 50, 250, …)</li>
                    <li><b>Enter which term (n) you want to find.</b> (e.g., 12)</li>
                    <li>Click <b>Calculate</b>.</li>
                </ol>
                <p className="text-muted-foreground">You’ll see the nth term (aₙ) and the sum of the first n terms (Sₙ).</p>
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-semibold">🔹 Fibonacci Sequence Calculator</h3>
                <p className="font-mono text-sm bg-muted p-2 rounded-md">a₀ = 0, a₁ = 1, aₙ = aₙ₋₁ + aₙ₋₂</p>
                 <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    <li><b>Enter which Fibonacci term (n) you want to find.</b> (e.g., 10)</li>
                    <li>Click <b>Calculate</b>.</li>
                </ol>
                <p className="text-muted-foreground">The calculator will show the nth Fibonacci number and the sequence up to that term.</p>
            </div>
            
            <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold text-foreground">💡 Tips for Users</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground mt-2">
                    <li>Use <b>Arithmetic</b> when the difference between terms is constant.</li>
                    <li>Use <b>Geometric</b> when each term is multiplied by the same number.</li>
                    <li>Use <b>Fibonacci</b> when each term is the sum of the two before it.</li>
                    <li>You can use decimal or negative numbers too — the formulas still work.</li>
                </ul>
            </div>
        </CardContent>
    </Card>
);

const SequenceEducationalContent = () => (
  <Card>
    <CardHeader>
      <CardTitle>About Sequences</CardTitle>
    </CardHeader>
    <CardContent className="space-y-8">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">🧠 What Is a Sequence?</h3>
        <p className="text-muted-foreground">
          A sequence is an ordered list of numbers that follow a specific pattern or rule. Each number in the list is called a term, and the order of these terms is important.
        </p>
        <p className="text-muted-foreground">For example:</p>
        <ul className="list-disc list-inside text-muted-foreground pl-4">
            <li><b>Arithmetic:</b> 2, 4, 6, 8, 10, ...</li>
            <li><b>Geometric:</b> 3, 6, 12, 24, 48, ...</li>
            <li><b>Fibonacci:</b> 0, 1, 1, 2, 3, 5, 8, ...</li>
        </ul>
        <p className="text-muted-foreground">
          Every sequence has a rule that describes how to move from one term to the next — and that’s what these calculators help you find or apply!
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold">🔍 Why Learn About Sequences?</h3>
        <p className="text-muted-foreground">
          Sequences aren’t just theoretical — they appear everywhere in science, business, nature, and technology. Here are a few examples:
        </p>
        <ul className="list-disc list-inside text-muted-foreground pl-4">
            <li><b>📈 Finance:</b> Predicting investment growth (geometric sequences with interest rates)</li>
            <li><b>📚 Education:</b> Scoring or grading scales often follow arithmetic progressions</li>
            <li><b>🌻 Nature:</b> Petal arrangements and leaf spirals often follow Fibonacci sequences</li>
            <li><b>⚙️ Engineering:</b> Wave frequencies, signal processing, and sound patterns use sequence math</li>
            <li><b>💻 Computer Science:</b> Algorithms, recursion, and data compression use sequence logic</li>
        </ul>
         <p className="text-muted-foreground">
            Understanding sequences builds the foundation for series, calculus, statistics, and algorithm design.
        </p>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">🔹 Arithmetic vs. Geometric vs. Fibonacci — Quick Comparison</h3>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Type of Sequence</TableHead>
                    <TableHead>Formula</TableHead>
                    <TableHead>Pattern</TableHead>
                    <TableHead>Example</TableHead>
                    <TableHead>Common Uses</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell className="font-medium">Arithmetic</TableCell>
                    <TableCell><code className="font-mono text-xs">aₙ = a₁ + f × (n − 1)</code></TableCell>
                    <TableCell>Adds the same number each time</TableCell>
                    <TableCell>2, 5, 8, 11, 14</TableCell>
                    <TableCell>Linear growth (salary, distances, etc.)</TableCell>
                </TableRow>
                 <TableRow>
                    <TableCell className="font-medium">Geometric</TableCell>
                    <TableCell><code className="font-mono text-xs">aₙ = a × rⁿ⁻¹</code></TableCell>
                    <TableCell>Multiplies by the same number each time</TableCell>
                    <TableCell>3, 6, 12, 24, 48</TableCell>
                    <TableCell>Exponential growth (interest, population, etc.)</TableCell>
                </TableRow>
                 <TableRow>
                    <TableCell className="font-medium">Fibonacci</TableCell>
                    <TableCell><code className="font-mono text-xs">aₙ = aₙ₋₁ + aₙ₋₂</code></TableCell>
                    <TableCell>Adds the two previous terms</TableCell>
                    <TableCell>0, 1, 1, 2, 3, 5, 8</TableCell>
                    <TableCell>Nature, recursion, design ratios</TableCell>
                </TableRow>
            </TableBody>
        </Table>
      </div>
      
       <div className="space-y-4">
        <h3 className="text-xl font-semibold">💡 Real-World Examples</h3>
        <div className="space-y-2">
            <h4 className="font-medium">1. Arithmetic Example — Salary Increase</h4>
            <p className="text-muted-foreground">You start with a salary of $40,000, and it increases by $2,000 each year. <br/>Formula: <code className="font-mono text-xs">aₙ = 40,000 + 2,000 × (n − 1)</code>. After 10 years: <code className="font-mono text-xs">a₁₀ = 40,000 + 2,000 × 9 = $58,000</code>.</p>
        </div>
        <div className="space-y-2">
            <h4 className="font-medium">2. Geometric Example — Compound Interest</h4>
            <p className="text-muted-foreground">You invest $1,000 at a 5% interest rate compounded yearly. <br/>Formula: <code className="font-mono text-xs">aₙ = 1,000 × (1.05)ⁿ⁻¹</code>. After 10 years: <code className="font-mono text-xs">a₁₀ = 1,000 × (1.05)⁹ ≈ $1,551.33</code>.</p>
        </div>
        <div className="space-y-2">
            <h4 className="font-medium">3. Fibonacci Example — Rabbit Growth Pattern</h4>
            <p className="text-muted-foreground">Fibonacci originally studied rabbit population growth: Each pair produces another pair each month, leading to 1, 1, 2, 3, 5, 8, 13, 21, ... pairs over time. This simple pattern mirrors many natural growth systems.</p>
        </div>
      </div>
      
      <div className="space-y-4 p-4 bg-muted rounded-lg">
        <h3 className="text-xl font-semibold text-foreground">🌟 Learning Tips</h3>
        <ul className="list-disc list-inside text-sm text-muted-foreground">
            <li>Try changing one input (like the common difference or ratio) and observe how the sequence changes.</li>
            <li>Compare arithmetic vs geometric results for the same first term — you’ll see how exponential growth quickly overtakes linear growth.</li>
            <li>For Fibonacci, note how the ratio of consecutive terms approaches 1.618, the Golden Ratio (φ) — a constant found in art, architecture, and nature.</li>
        </ul>
        <p className="text-sm text-muted-foreground font-medium">Remember: Every sequence tells a story — about growth, decay, rhythm, or structure.</p>
      </div>

       <div className="space-y-2">
            <h3 className="text-xl font-semibold">🧩 Fun Fact</h3>
            <p className="text-muted-foreground">
              The Fibonacci sequence was named after Leonardo of Pisa, known as Fibonacci, who introduced the sequence to Europe in 1202 in his book Liber Abaci. However, the pattern was known centuries earlier in India! It appears in sunflower seed spirals, pinecones, seashells, galaxies, and even DNA helices.
            </p>
        </div>

    </CardContent>
  </Card>
);

export default function SequencesPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Sequence Calculator" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row lg:gap-8">
            <div className="flex-1 space-y-8">
                <section className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                        Number Sequence Calculator
                    </h1>
                    <p className="mt-4 text-lg text-muted-foreground">
                        In mathematics, a <b>sequence</b> is an ordered list of numbers that follow a particular pattern. The individual elements in a sequence are called <b>terms</b>, and the number of terms is called its <b>length</b>. Sequences can be finite or infinite and are essential in many areas of math such as algebra, calculus, and analysis.
                    </p>
                </section>
                
                <SequenceCalculators />

                <HowToUse />

                <SequenceEducationalContent />

                <section className="text-center text-sm text-muted-foreground">
                    <h3 className="font-semibold text-foreground">Related Calculators</h3>
                    <div className="flex justify-center flex-wrap gap-2 mt-2">
                        <Button asChild variant="outline" size="sm">
                            <Link href="/statistics">Statistics Calculator</Link>
                        </Button>
                        <Button asChild variant="outline" size="sm">
                            <Link href="/statistics/mean-median-mode">Mean, Median, Mode Calculator</Link>
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
