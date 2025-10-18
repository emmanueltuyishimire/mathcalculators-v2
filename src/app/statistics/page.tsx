
import { PageHeader } from '@/components/page-header';
import StatisticsCalculator from '@/components/calculators/statistics-calculator';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sigma, Percent } from 'lucide-react';
import type { Metadata } from 'next';

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

export default function StatisticsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Statistics" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-2xl space-y-8">
          <StatisticsCalculator />
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
