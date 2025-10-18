
import { PageHeader } from '@/components/page-header';
import PermutationCombinationCalculator from '@/components/calculators/permutation-combination-calculator';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const metadata: Metadata = {
    title: 'Permutation and Combination Calculator',
    description: 'A free online calculator to compute permutations (nPr) and combinations (nCr) from a set of numbers. Includes formulas and step-by-step explanations.',
};


const PracticalUsesContent = () => (
    <Card>
        <CardHeader>
            <CardTitle>Tips and Practical Uses for Permutations and Combinations</CardTitle>
            <CardDescription>Understanding permutations and combinations can make your data analysis, problem-solving, and decision-making much easier.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div>
                <h3 className="text-xl font-semibold text-foreground">1. Know When to Use Permutations vs. Combinations</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground mt-2">
                    <li><b>Permutations (nPr):</b> Use when <b>order matters</b>. Example: Arranging people in a line, creating a password, assigning team roles.</li>
                    <li><b>Combinations (nCr):</b> Use when <b>order does not matter</b>. Example: Selecting a team, lottery numbers, or a committee.</li>
                </ul>
                <p className="text-sm text-primary mt-2"><b>Tip:</b> Always ask yourself: “Does the order of selection affect the outcome?”</p>
            </div>
            <div>
                <h3 className="text-xl font-semibold text-foreground">2. Avoid Common Mistakes</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground mt-2">
                    <li>Ensure that <b>r ≤ n</b>. You cannot select more items than the total available.</li>
                    <li>Remember that this calculator does not allow repetition. If you need repeated elements, different formulas are required.</li>
                    <li>Factorials grow very quickly. For large numbers, results can become huge.</li>
                </ul>
            </div>
            <div>
                <h3 className="text-xl font-semibold text-foreground">3. Practical Actions and Applications</h3>
                 <ul className="list-disc list-inside space-y-1 text-muted-foreground mt-2">
                    <li><b>Sports and Team Selection:</b> Decide how many ways you can assign roles or choose players.</li>
                    <li><b>Lottery or Contest Analysis:</b> Calculate odds of winning by selecting certain numbers.</li>
                    <li><b>Password or Code Generation:</b> Determine the number of possible arrangements for security codes.</li>
                    <li><b>Event Planning:</b> Figure out seating arrangements or task assignments.</li>
                </ul>
            </div>
             <div>
                <h3 className="text-xl font-semibold text-foreground">4. Quick Reference</h3>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Concept</TableHead>
                            <TableHead>When to Use</TableHead>
                             <TableHead>Key Tip</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>Permutations (nPr)</TableCell>
                            <TableCell>Order matters</TableCell>
                            <TableCell>Think “arrangements”</TableCell>
                        </TableRow>
                        <TableRow>
                             <TableCell>Combinations (nCr)</TableCell>
                            <TableCell>Order does not matter</TableCell>
                            <TableCell>Think “selections”</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
            <div>
                <h3 className="text-xl font-semibold text-foreground">5. Practical Example</h3>
                 <p className="text-muted-foreground mt-2">Suppose you have 6 books and want to put 2 on a shelf:</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground mt-2">
                    <li><b>Permutation:</b> 6P2 = 30 → different arrangements of 2 books</li>
                    <li><b>Combination:</b> 6C2 = 15 → different selections of 2 books, order ignored</li>
                </ul>
            </div>
        </CardContent>
    </Card>
);

export default function PermutationCombinationPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Permutation and Combination Calculator" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-2xl space-y-8">
            <section className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Permutation & Combination Calculator
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Modify the values and click the calculate button to find the number of permutations and combinations.
                </p>
            </section>

            <PermutationCombinationCalculator />

            <Card>
                <CardHeader>
                    <CardTitle>How to Use the Calculator</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                   <ol className="list-decimal list-inside space-y-2">
                       <li>
                           <b>Enter the total number of elements in the set (n):</b>
                           <p className="text-sm pl-4">This is the total number of distinct items available.</p>
                       </li>
                       <li>
                           <b>Enter the number of elements in each subset (r):</b>
                            <p className="text-sm pl-4">This is how many items you want to select or arrange from the set.</p>
                       </li>
                        <li>
                           <b>Click Calculate:</b>
                            <ul className="list-disc list-inside pl-8 text-sm">
                                <li><b>Permutation (nPr):</b> Number of ways to arrange r items from n items where order matters.</li>
                                <li><b>Combination (nCr):</b> Number of ways to select r items from n items where order does not matter.</li>
                            </ul>
                       </li>
                   </ol>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Understanding the Concepts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <h3 className="text-xl font-semibold text-foreground">Understanding Permutations</h3>
                        <p className="text-muted-foreground mt-2">Permutations are arrangements where <b>order is important</b>.</p>
                        <p className="font-mono bg-muted p-2 rounded-md my-2 text-center">nPr = n! / (n-r)!</p>
                        <p className="text-sm text-muted-foreground"><b>Example:</b> Choosing a team captain and goalkeeper from 11 players. The order matters.</p>
                        <ul className="list-disc list-inside text-sm text-muted-foreground pl-4 mt-1">
                            <li>First choice (captain) = 11 options</li>
                            <li>Second choice (goalkeeper) = 10 options</li>
                            <li>Total permutations = 11 × 10 = 110</li>
                        </ul>
                         <p className="text-sm text-primary mt-2"><b>Tip:</b> Use permutations when the order of selection matters, such as codes, passwords, or seating arrangements.</p>
                    </div>

                     <div>
                        <h3 className="text-xl font-semibold text-foreground">Understanding Combinations</h3>
                        <p className="text-muted-foreground mt-2">Combinations are selections where <b>order does not matter</b>.</p>
                        <p className="font-mono bg-muted p-2 rounded-md my-2 text-center">nCr = n! / (r! × (n-r)!)</p>
                        <p className="text-sm text-muted-foreground"><b>Example:</b> Choosing 2 strikers from 11 players. The specific players matter, not the order they were picked in.</p>
                        <p className="font-mono text-sm bg-muted p-2 rounded-md mt-1">Total combinations = 11C2 = 11! / (2! × 9!) = 55</p>
                         <p className="text-sm text-primary mt-2"><b>Tip:</b> Use combinations when only the selected items matter, not the order, such as groups, lottery numbers, or choosing team members.</p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-foreground">Key Notes</h3>
                         <ul className="list-disc list-inside text-sm text-muted-foreground pl-4 mt-2 space-y-1">
                            <li>This calculator does not include replacement, meaning an element cannot be selected more than once.</li>
                            <li>Permutations are always ≥ Combinations for the same n and r.</li>
                            <li>Factorials (n!) grow very fast; use smaller numbers to avoid extremely large results.</li>
                        </ul>
                    </div>

                     <div>
                        <h3 className="text-xl font-semibold text-foreground">Quick Reference Table</h3>
                        <Table className="mt-2">
                           <TableHeader>
                                <TableRow>
                                    <TableHead>Concept</TableHead>
                                    <TableHead>Formula</TableHead>
                                    <TableHead>Order Matters?</TableHead>
                                </TableRow>
                           </TableHeader>
                           <TableBody>
                                <TableRow>
                                    <TableCell>Permutation</TableCell>
                                    <TableCell className="font-mono">nPr = n! / (n - r)!</TableCell>
                                    <TableCell>Yes</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Combination</TableCell>
                                    <TableCell className="font-mono">nCr = n! / (r! × (n - r)!)</TableCell>
                                    <TableCell>No</TableCell>
                                </TableRow>
                           </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            <PracticalUsesContent />

            <section className="text-center text-sm text-muted-foreground">
                <h3 className="font-semibold text-foreground">Related Calculators</h3>
                <div className="flex justify-center gap-4 mt-2">
                    <Link href="/probability" className="text-primary hover:underline">Probability Calculator</Link>
                    <Link href="/statistics/sample-size" className="text-primary hover:underline">Sample Size Calculator</Link>
                </div>
            </section>
        </div>
      </main>
    </div>
  );
}
