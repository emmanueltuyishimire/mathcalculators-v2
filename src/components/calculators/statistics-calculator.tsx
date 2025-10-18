"use client";

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface Stats {
  mean: number | string;
  median: number | string;
  mode: string;
  stdDev: number | string;
  count: number;
  sum: number;
}

const StatCard = ({ title, value }: { title: string; value: number | string }) => (
  <Card className="bg-secondary/50">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{typeof value === 'number' ? value.toFixed(2) : value}</div>
    </CardContent>
  </Card>
);

export default function StatisticsCalculator() {
  const [data, setData] = useState('8, 12, 12, 15, 18, 22, 25');
  const [isLoading, setIsLoading] = useState(false);

  const stats: Stats | null = useMemo(() => {
    const numbers = data
      .split(/[\s,]+/)
      .map(Number)
      .filter(n => !isNaN(n));

    if (numbers.length === 0) return null;

    const count = numbers.length;
    const sum = numbers.reduce((acc, n) => acc + n, 0);
    const mean = sum / count;

    const sorted = [...numbers].sort((a, b) => a - b);
    const mid = Math.floor(count / 2);
    const median = count % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;

    const frequency: { [key: number]: number } = {};
    let maxFreq = 0;
    for (const num of numbers) {
      frequency[num] = (frequency[num] || 0) + 1;
      if (frequency[num] > maxFreq) {
        maxFreq = frequency[num];
      }
    }
    const mode = maxFreq > 1 ? Object.keys(frequency).filter(key => frequency[Number(key)] === maxFreq).join(', ') : 'N/A';
    
    const stdDev = Math.sqrt(numbers.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / count);

    return { mean, median, mode, stdDev, count, sum };
  }, [data]);

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Statistics Calculator</CardTitle>
        <CardDescription>Enter numbers separated by commas or spaces.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="data">Data Set</Label>
          <Textarea
            id="data"
            value={data}
            onChange={(e) => setData(e.target.value)}
            placeholder="e.g., 5, 10, 15, 20"
            className="h-24 font-mono"
          />
        </div>
        {stats && (
          <div className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <StatCard title="Mean" value={stats.mean} />
              <StatCard title="Median" value={stats.median} />
              <StatCard title="Mode" value={stats.mode} />
              <StatCard title="Standard Deviation" value={stats.stdDev} />
              <StatCard title="Count" value={stats.count} />
              <StatCard title="Sum" value={stats.sum} />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
