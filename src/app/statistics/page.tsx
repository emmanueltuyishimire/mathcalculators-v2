
import { PageHeader } from '@/components/page-header';
import StatisticsCalculator from '@/components/calculators/statistics-calculator';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sigma, Percent, Activity } from 'lucide-react';
import type { Metadata } from 'next';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const metadata: Metadata = {
    title: 'Statistics Calculator – Mean, Median, Mode & More',
    description: 'A comprehensive statistics calculator to find mean, median, mode, standard deviation, count, and sum from a data set. Includes related tools for more advanced analysis.',
};


const statisticsTools = [
    {
        href: '/statistics/mean-median-mode',
        label: 'Mean, Median, Mode Calculator',
        icon: Activity,
        description: 'Calculate mean, median, mode, and range for a dataset.',
    },
    {
        href: '/statistics/standard-deviation',
        label: 'Standard Deviation Calculator',
        icon: Sigma,
        description: 'Calculate standard deviation, variance, mean, and more.',
    },
    {
        href: '/statistics/sample-size',
        label: 'Sample Size Calculator',
        icon: Percent,
        description: 'Determine the minimum sample size for your study.',
    }
]

const StatisticsEducationalContent = () => (
    <Card>
        <CardHeader>
            <CardTitle>How the Statistics Calculator Works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
            <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">1. Core Calculations</h3>
                <p className="text-muted-foreground mb-4">
                    The calculator uses the following standard statistical formulas to analyze your dataset.
                </p>
                <div className="space-y-4">
                    <div>
                        <h4 className="font-semibold text-lg">A. Arithmetic Mean (Average)</h4>
                        <p className="text-muted-foreground">The sum of all values divided by the count of values.</p>
                        <p className="font-mono bg-muted p-2 rounded-md mt-1">x̄ = ( Σxᵢ ) / N</p>
                    </div>
                     <div>
                        <h4 className="font-semibold text-lg">B. Standard Deviation (σ or s)</h4>
                        <p className="text-muted-foreground">Measures the amount of variation or dispersion of a set of values.</p>
                        <p className="font-mono bg-muted p-2 rounded-md mt-1">Population (σ) = √[ Σ(xᵢ - x̄)² / N ]</p>
                        <p className="font-mono bg-muted p-2 rounded-md mt-1">Sample (s) = √[ Σ(xᵢ - x̄)² / (N - 1) ]</p>
                    </div>
                     <div>
                        <h4 className="font-semibold text-lg">C. Variance (σ² or s²)</h4>
                        <p className="text-muted-foreground">The square of the standard deviation.</p>
                         <p className="font-mono bg-muted p-2 rounded-md mt-1">σ² = Σ(xᵢ - x̄)² / N</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-lg">D. Geometric Mean (GM)</h4>
                        <p className="text-muted-foreground">The Nth root of the product of all numbers. Useful for datasets where values are multiplied.</p>
                        <p className="font-mono bg-muted p-2 rounded-md mt-1">GM = (x₁ * x₂ * ... * xₙ)^(1/N)</p>
                        <p className="text-xs text-muted-foreground mt-1">Note: Only works for positive numbers.</p>
                    </div>
                </div>
            </div>
            <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">2. Summary of Formulas</h3>
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Statistic</TableHead>
                            <TableHead>Formula</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>Mean</TableCell>
                            <TableCell><code className="font-mono text-xs">Σxᵢ / N</code></TableCell>
                        </TableRow>
                         <TableRow>
                            <TableCell>Population Std Dev (σ)</TableCell>
                            <TableCell><code className="font-mono text-xs">√[ Σ(xᵢ - x̄)² / N ]</code></TableCell>
                        </TableRow>
                         <TableRow>
                            <TableCell>Sample Std Dev (s)</TableCell>
                            <TableCell><code className="font-mono text-xs">√[ Σ(xᵢ - x̄)² / (N-1) ]</code></TableCell>
                        </TableRow>
                         <TableRow>
                            <TableCell>Variance (σ² or s²)</TableCell>
                            <TableCell><code className="font-mono text-xs">(Standard Deviation)²</code></TableCell>
                        </TableRow>
                         <TableRow>
                            <TableCell>Geometric Mean</TableCell>
                            <TableCell><code className="font-mono text-xs">(Πxᵢ)^(1/N)</code></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </CardContent>
    </Card>
);

const HowToUseGuide = () => (
    <Card>
        <CardHeader>
            <CardTitle>How to Use the Statistics Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground">
            <p>This calculator lets you enter numbers via keypad or comma-separated input and compute common statistics like mean, standard deviation, variance, and geometric mean.</p>
            
            <div>
                <h3 className="text-xl font-semibold text-foreground">1. Entering Numbers</h3>
                <div className="mt-2 space-y-2">
                    <h4 className="font-semibold">Option 1: Keypad</h4>
                    <ul className="list-disc list-inside pl-4">
                        <li>Use the number keys (0–9) to enter digits.</li>
                        <li>Use <strong>.</strong> for decimals and <strong>EXP</strong> for scientific notation.</li>
                        <li>Use <strong>±</strong> to toggle the sign of the number.</li>
                        <li>Press <strong>ADD</strong> to save the number to the dataset.</li>
                    </ul>

                    <h4 className="font-semibold mt-4">Option 2: Comma-Separated Input</h4>
                     <p>Enter your dataset as numbers separated by commas in the input box and press <strong>Load Data</strong>.</p>
                </div>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-foreground">2. Key Functions</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                    <div>
                        <h4 className="font-semibold">Basic & Input</h4>
                        <ul className="list-disc list-inside pl-4">
                           <li><strong>0-9, . , EXP</strong>: Enter numbers</li>
                           <li><strong>±</strong>: Toggle sign</li>
                           <li><strong>ADD</strong>: Add number to dataset</li>
                           <li><strong>CAD</strong>: Clear current entry</li>
                           <li><strong>C</strong>: Clear entire dataset</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold">Statistical Calculations</h4>
                         <ul className="list-disc list-inside pl-4">
                           <li><strong>Σx</strong>: Sum of all numbers</li>
                           <li><strong>Σx²</strong>: Sum of squares</li>
                           <li><strong>σ</strong>: Population standard deviation</li>
                           <li><strong>s</strong>: Sample standard deviation</li>
                           <li><strong>σ²</strong>: Population variance</li>
                           <li><strong>s²</strong>: Sample variance</li>
                           <li><strong>GM</strong>: Geometric mean</li>
                        </ul>
                    </div>
                 </div>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-foreground">3. Steps to Compute Statistics</h3>
                 <ol className="list-decimal list-inside pl-4 mt-2 space-y-1">
                    <li>Enter all numbers using either the keypad (pressing <strong>ADD</strong> after each) or the CSV input (pressing <strong>Load Data</strong>).</li>
                    <li>Press the button corresponding to the statistic you want to calculate.</li>
                    <li>The result will appear on the display.</li>
                    <li>To start a new calculation, press <strong>C</strong>.</li>
                </ol>
            </div>
            
             <div className="p-4 bg-accent/10 rounded-lg text-accent-foreground">
                <h4 className="font-semibold">Notes and Tips</h4>
                <ul className="list-disc list-inside text-sm mt-2">
                    <li><strong>Geometric Mean (GM)</strong> only works for positive numbers.</li>
                    <li><strong>Variance (σ² or s²)</strong> is the square of the standard deviation.</li>
                    <li>Use <strong>σ</strong> for full population data and <strong>s</strong> for sample data.</li>
                    <li>You can continuously add numbers and recalculate statistics in real-time.</li>
                </ul>
            </div>
        </CardContent>
    </Card>
);

export default function StatisticsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Statistics" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-4xl space-y-8">
            <section className="space-y-4">
                <h1 className="text-3xl md:text-4xl font-bold text-center">Statistics Calculators</h1>
                <p className="text-lg text-muted-foreground text-center">
                    A collection of tools to perform statistical analysis, from basic measures to more complex calculations.
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {statisticsTools.map((tool) => (
                        <Link href={tool.href} key={tool.href} className="group">
                        <Card className="h-full transition-all group-hover:shadow-lg group-hover:-translate-y-1">
                            <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                            <div className="rounded-full bg-primary/10 p-3 text-primary">
                                <tool.icon className="h-6 w-6" />
                            </div>
                            <CardTitle className="text-base">{tool.label}</CardTitle>
                            </CardHeader>
                            <CardContent>
                            <p className="text-sm text-muted-foreground">{tool.description}</p>
                            </CardContent>
                        </Card>
                        </Link>
                    ))}
                </div>
            </section>
          <StatisticsCalculator />
          <HowToUseGuide />
          <StatisticsEducationalContent />
        </div>
      </main>
    </div>
  );
}
