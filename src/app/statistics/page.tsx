
"use client";

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChartHorizontal, Sigma, Percent, ShieldCheck, FunctionSquare, Milestone, Calculator } from 'lucide-react';
import StatisticsCalculator from '@/components/calculators/statistics-calculator';
import { Button } from '@/components/ui/button';
import React from 'react';

const statisticsTools = [
  {
    href: '/statistics/mean-median-mode',
    label: 'Mean, Median, Mode Calculator',
    icon: BarChartHorizontal,
    description: 'Calculate mean, median, mode, and range for a dataset.',
  },
  {
    href: '/statistics/standard-deviation',
    label: 'Standard Deviation Calculator',
    icon: Sigma,
    description: 'Calculate standard deviation, variance, and mean.',
  },
  {
    href: '/statistics/sample-size',
    label: 'Sample Size Calculator',
    icon: Percent,
    description: 'Determine the minimum sample size for your study.',
  },
  {
    href: '/statistics/probability',
    label: 'Probability Calculator',
    icon: Percent,
    description: 'Calculate probabilities for various scenarios.',
  },
  {
    href: '/statistics/permutation-combination',
    label: 'Permutation & Combination Calculator',
    icon: FunctionSquare,
    description: 'Calculate nPr and nCr for arrangements and selections.',
  },
  {
    href: '/statistics/z-score',
    label: 'Z-Score Calculator',
    icon: Sigma,
    description: 'Compute z-scores and find associated probabilities.',
  },
  {
    href: '/statistics/confidence-interval',
    label: 'Confidence Interval Calculator',
    icon: ShieldCheck,
    description: 'Calculate confidence intervals for a sample mean.',
  },
  {
    href: '/statistics/sequences',
    label: 'Sequence Calculators',
    icon: Milestone,
    description: 'Calculators for arithmetic, geometric, and Fibonacci sequences.',
  },
];

const HowToUseGuide = () => (
    <Card>
        <CardHeader>
            <CardTitle>How to Use the Statistics Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground">
             <div>
                <h3 className="text-xl font-semibold text-foreground">Step 1: Input Your Data</h3>
                <p className="mt-1">You have two ways to enter your dataset:</p>
                <ul className="list-disc list-inside pl-4 mt-2 space-y-1">
                    <li><b>Using the Keypad:</b> Type numbers into the display and click <strong>ADD</strong> to include them in the dataset.</li>
                    <li><b>Using the Text Area:</b> Paste or type numbers separated by commas, then click <strong>Load Data</strong>.</li>
                </ul>
            </div>
             <div>
                <h3 className="text-xl font-semibold text-foreground">Step 2: View and Manage Your Dataset</h3>
                <p className="mt-1">As you add numbers, they will appear in the "Current Dataset" list. You can remove individual entries by clicking the <kbd>x</kbd> next to them.</p>
            </div>
             <div>
                <h3 className="text-xl font-semibold text-foreground">Step 3: Analyze the Results</h3>
                <p className="mt-1">The calculator automatically computes and displays key statistics in the "Results" section, including:</p>
                <ul className="list-disc list-inside pl-4 mt-2 space-y-1">
                    <li><b>Count, Sum, Mean:</b> Basic descriptive statistics.</li>
                    <li><b>Standard Deviation (σ and s):</b> For both population and sample.</li>
                    <li><b>Variance (σ² and s²):</b> For both population and sample.</li>
                </ul>
            </div>
            <div>
                <h3 className="text-xl font-semibold text-foreground">Step 4: Use Statistical Functions</h3>
                <p className="mt-1">The keypad includes buttons for advanced statistical functions. After adding data, click any of these buttons to view the result in the main display:</p>
                <ul className="list-disc list-inside pl-4 mt-2 space-y-1">
                    <li><b>Σx:</b> Sum of all values</li>
                    <li><b>Σx²:</b> Sum of squares</li>
                    <li><b>σ, s, σ², s²:</b> Standard deviations and variances</li>
                    <li><b>GM:</b> Geometric Mean (requires all positive values)</li>
                </ul>
            </div>
        </CardContent>
    </Card>
);

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
                    A comprehensive suite of free online statistics calculators for all your statistical analysis needs.
                </p>
            </section>

            <StatisticsCalculator />
            
            <HowToUseGuide />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {statisticsTools.map((tool, index) => (
                <React.Fragment key={tool.href}>
                  <Link href={tool.href} className="group" aria-label={`Go to ${tool.label} calculator`}>
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
                </React.Fragment>
              ))}
            </div>
        </div>
      </main>
    </div>
  );
}
