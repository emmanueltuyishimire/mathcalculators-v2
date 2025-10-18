
import { PageHeader } from '@/components/page-header';
import StatisticsCalculator from '@/components/calculators/statistics-calculator';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sigma, Percent } from 'lucide-react';
import type { Metadata } from 'next';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const metadata: Metadata = {
    title: 'Statistics Calculator – Mean, Median, Mode & More',
    description: 'A comprehensive statistics calculator to find mean, median, mode, standard deviation, count, and sum from a data set. Includes related tools for more advanced analysis.',
};


const statisticsTools = [
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

export default function StatisticsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Statistics" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-4xl space-y-8">
          <StatisticsCalculator />
          <StatisticsEducationalContent />
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Related Tools</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {statisticsTools.map((tool) => (
                    <Link href={tool.href} key={tool.href} className="group">
                    <Card className="h-full transition-all group-hover:shadow-lg group-hover:-translate-y-1">
                        <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                        <div className="rounded-full bg-primary/10 p-3 text-primary">
                            <tool.icon className="h-6 w-6" />
                        </div>
                        <CardTitle>{tool.label}</CardTitle>
                        </CardHeader>
                        <CardContent>
                        <p className="text-sm text-muted-foreground">{tool.description}</p>
                        </CardContent>
                    </Card>
                    </Link>
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
