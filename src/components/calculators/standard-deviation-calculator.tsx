
"use client";

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface Stats {
  mean: number;
  variance: number;
  stdDev: number;
  sum: number;
  count: number;
}

const StatCard = ({ title, value }: { title: string; value: number | string }) => (
  <Card className="bg-secondary/50">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{typeof value === 'number' ? value.toFixed(4) : value}</div>
    </CardContent>
  </Card>
);

export default function StandardDeviationCalculator() {
  const [data, setData] = useState('10, 12, 23, 23, 16, 23, 21, 16');

  const stats: Stats | null = useMemo(() => {
    const numbers = data
      .split(/[\s,]+/)
      .map(s => s.trim())
      .filter(Boolean)
      .map(Number)
      .filter(n => !isNaN(n));

    if (numbers.length < 2) return null;

    const count = numbers.length;
    const sum = numbers.reduce((acc, n) => acc + n, 0);
    const mean = sum / count;
    
    const variance = numbers.reduce((acc, n) => acc + Math.pow(n - mean, 2), 0) / (count - 1);
    const stdDev = Math.sqrt(variance);

    return { mean, variance, stdDev, sum, count };
  }, [data]);

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Calculate Statistical Values</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="data">Numbers</Label>
          <Textarea
            id="data"
            value={data}
            onChange={(e) => setData(e.target.value)}
            placeholder="e.g., 10, 12, 23, 23, 16, 23, 21, 16"
            className="h-24 font-mono"
            aria-label="Enter numbers separated by commas"
          />
        </div>
      </CardContent>
      {stats && (
        <CardFooter>
            <div className="w-full space-y-4">
                <h3 className="text-lg font-semibold">Results</h3>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <StatCard title="Standard Deviation" value={stats.stdDev} />
                <StatCard title="Variance" value={stats.variance} />
                <StatCard title="Mean" value={stats.mean} />
                <StatCard title="Sum" value={stats.sum} />
                <StatCard title="Count" value={stats.count} />
                </div>
            </div>
        </CardFooter>
      )}
    </Card>
  );
}
