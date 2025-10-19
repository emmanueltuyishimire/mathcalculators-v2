

import { PageHeader } from '@/components/page-header';
import PermutationCombinationCalculator from '@/components/calculators/permutation-combination-calculator';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
    title: 'Permutation and Combination Calculator',
    description: 'A free online calculator to compute permutations (nPr) and combinations (nCr) from a set of numbers. Includes formulas and step-by-step explanations.',
};

const HowToUseGuide = () => (
    <Card>
        <CardHeader>
            <CardTitle>How to Use the Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
           <ol className="list-decimal list-inside space-y-2">
               <li>
                   <b>Enter the total number of elements in the set (n):</b>
                   <p className="text-sm pl-4">This is the total number of distinct items you have to choose from.</p>
               </li>
               <li>
                   <b>Enter the number of elements to choose (r):</b>
                    <p className="text-sm pl-4">This is how many items you want to select or arrange from the set.</p>
               </li>
                <li>
                   <b>Click Calculate:</b>
                    <ul className="list-disc list-inside pl-8 text-sm mt-1">
                        <li><b>Permutations (nPr):</b> The number of ways to arrange 'r' items from 'n' items where the order of arrangement matters.</li>
                        <li><b>Combinations (nCr):</b> The number of ways to choose 'r' items from 'n' items where the order of selection does not matter.</li>
                    </ul>
               </li>
           </ol>
        </CardContent>
    </Card>
);

const EducationalContent = () => (
    <Card>
        <CardHeader>
            <CardTitle>Permutations vs. Combinations: What's the Difference?</CardTitle>
            <CardDescription>Understanding when to use each formula is key to solving problems correctly.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div>
                <h3 className="text-xl font-semibold text-foreground">Understanding Permutations (Order Matters)</h3>
                <p className="text-muted-foreground mt-2">Permutations are used when you need to find the number of possible arrangements of a set of items where the <b>order is important</b>. Think of it as arranging things in a line, where being first is different from being second.</p>
                <p className="font-mono bg-muted p-2 rounded-md my-2 text-center">nPr = n! / (n-r)!</p>
                <p className="text-sm text-muted-foreground"><b>Example:</b> Imagine you have 5 books and want to arrange 3 of them on a shelf. The order you place them in creates a different arrangement. Using the formula, there are 5P3 = 5! / (5-3)! = 60 possible arrangements.</p>
            </div>

             <div>
                <h3 className="text-xl font-semibold text-foreground">Understanding Combinations (Order Doesn't Matter)</h3>
                <p className="text-muted-foreground mt-2">Combinations are used when you need to find the number of ways to select items from a set where the <b>order of selection does not matter</b>. Think of it as choosing a group of people, where it doesn't matter who was picked first or last.</p>
                <p className="font-mono bg-muted p-2 rounded-md my-2 text-center">nCr = n! / (r! × (n-r)!)</p>
                <p className="text-sm text-muted-foreground"><b>Example:</b> From a group of 5 friends, you want to choose 3 to go to the movies. The group of 'Alice, Bob, Charlie' is the same as 'Charlie, Alice, Bob'. Using the formula, there are 5C3 = 5! / (3! * 2!) = 10 possible groups.</p>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-foreground">Quick Reference Guide</h3>
                <Table className="mt-2">
                   <TableHeader>
                        <TableRow>
                            <TableHead>Concept</TableHead>
                            <TableHead>Key Question</TableHead>
                            <TableHead>Example Use Case</TableHead>
                        </TableRow>
                   </TableHeader>
                   <TableBody>
                        <TableRow>
                            <TableCell className="font-semibold">Permutation</TableCell>
                            <TableCell>Does the order matter?</TableCell>
                            <TableCell>Assigning 1st, 2nd, and 3rd place in a race.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">Combination</TableCell>
                            <TableCell>Does the order NOT matter?</TableCell>
                            <TableCell>Choosing 3 toppings for a pizza.</TableCell>
                        </TableRow>
                   </TableBody>
                </Table>
            </div>
        </CardContent>
    </Card>
);

const PracticalUsesContent = () => (
    <Card>
        <CardHeader>
            <CardTitle>Tips and Practical Uses</CardTitle>
            <CardDescription>Apply these concepts to solve real-world problems more effectively.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground">
            <div>
                <h3 className="text-xl font-semibold text-foreground">When to Use Each</h3>
                <ul className="list-disc list-inside space-y-1 mt-2">
                    <li><b>Permutations (nPr):</b> Use for arrangements, rankings, or assigning specific roles. Examples: creating a password, determining a batting order, or assigning roles on a team.</li>
                    <li><b>Combinations (nCr):</b> Use for selections, groups, or committees where the order is irrelevant. Examples: picking lottery numbers, forming a project team, or selecting ingredients for a salad.</li>
                </ul>
            </div>
            <div>
                <h3 className="text-xl font-semibold text-foreground">Common Mistakes to Avoid</h3>
                <ul className="list-disc list-inside space-y-1 mt-2">
                    <li><b>Confusing Order:</b> The most common mistake is using combinations when order matters, or vice versa. Always ask: "Does changing the order create a new outcome?"</li>
                    <li><b>Repetition:</b> This calculator assumes items are not repeated. If you can select the same item multiple times (e.g., a password with repeating characters), different formulas are needed.</li>
                    <li><b>Input Errors:</b> Ensure that 'r' (items to choose) is not greater than 'n' (total items).</li>
                </ul>
            </div>
            <div>
                <h3 className="text-xl font-semibold text-foreground">Real-World Applications</h3>
                 <ul className="list-disc list-inside space-y-2 mt-2">
                    <li><b>Probability:</b> Permutations and combinations are fundamental for calculating probabilities. For example, the odds of winning the lottery are based on the total number of possible combinations.</li>
                    <li><b>Computer Science:</b> Used in algorithms for everything from cryptography to data sorting and pattern matching.</li>
                    <li><b>Quality Control:</b> Determining how many ways a sample can be selected from a batch for testing.</li>
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
                    Easily compute permutations (nPr) and combinations (nCr) to solve problems involving arrangements and selections.
                </p>
            </section>

            <PermutationCombinationCalculator />

            <HowToUseGuide />

            <EducationalContent />

            <PracticalUsesContent />

            <section className="text-center text-sm text-muted-foreground">
                <h3 className="font-semibold text-foreground">Related Calculators</h3>
                <div className="flex justify-center flex-wrap gap-2 mt-2">
                    <Button asChild variant="outline" size="sm">
                        <Link href="/statistics/probability">Probability Calculator</Link>
                    </Button>
                     <Button asChild variant="outline" size="sm">
                        <Link href="/statistics/sample-size">Sample Size Calculator</Link>
                    </Button>
                </div>
            </section>
        </div>
      </main>
    </div>
  );
}
