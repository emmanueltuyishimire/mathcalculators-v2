
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChartHorizontal, Sigma, Percent, ShieldCheck, FunctionSquare, Milestone } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Statistics Calculators – Tools for Data Analysis',
    description: 'A comprehensive collection of statistics calculators for mean, standard deviation, sample size, probability, and more. Free and easy-to-use tools for all your statistical needs.',
};

const statisticsTools = [
  {
    href: '/statistics/mean-median-mode',
    label: 'Mean, Median, Mode',
    icon: BarChartHorizontal,
    description: 'Calculate mean, median, mode, and range for a dataset.',
  },
  {
    href: '/statistics/standard-deviation',
    label: 'Standard Deviation',
    icon: Sigma,
    description: 'Calculate standard deviation, variance, and mean.',
  },
  {
    href: '/statistics/sample-size',
    label: 'Sample Size',
    icon: Percent,
    description: 'Determine the minimum sample size for your study.',
  },
  {
    href: '/statistics/probability',
    label: 'Probability',
    icon: Percent,
    description: 'Calculate probabilities for various scenarios.',
  },
  {
    href: '/statistics/permutation-combination',
    label: 'Permutation & Combination',
    icon: FunctionSquare,
    description: 'Calculate nPr and nCr for arrangements and selections.',
  },
  {
    href: '/statistics/z-score',
    label: 'Z-Score',
    icon: Sigma,
    description: 'Compute z-scores and find associated probabilities.',
  },
  {
    href: '/statistics/confidence-interval',
    label: 'Confidence Interval',
    icon: ShieldCheck,
    description: 'Calculate confidence intervals for a sample mean.',
  },
  {
    href: '/statistics/sequences',
    label: 'Sequences',
    icon: Milestone,
    description: 'Calculators for arithmetic, geometric, and Fibonacci sequences.',
  },
];

export default function StatisticsCategoryPage() {
  return (
    <div className="flex flex-1 flex-col">
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-4xl space-y-8">
            <section className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                    Statistics Calculators
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    A comprehensive suite of tools for all your statistical analysis needs. From basic descriptive statistics to probability and sample size calculations.
                </p>
            </section>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
      </main>
    </div>
  );
}
