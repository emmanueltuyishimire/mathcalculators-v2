
"use client";

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Stats {
  mean: number;
  variance: number;
  stdDev: number;
  sum: number;
  count: number;
  sumOfSquares: number;
  sem: number;
  frequency: { [key: string]: number };
  type: 'population' | 'sample';
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

const confidenceLevels = [
    { level: "68.3%", z: 1.0 },
    { level: "90%", z: 1.645 },
    { level: "95%", z: 1.960 },
    { level: "99%", z: 2.576 },
    { level: "99.9%", z: 3.291 },
    { level: "99.99%", z: 3.891 },
    { level: "99.999%", z: 4.417 },
    { level: "99.9999%", z: 4.892 },
];


export default function StandardDeviationCalculator() {
  const [data, setData] = useState('10, 12, 23, 23, 16, 23, 21, 16');
  const [type, setType] = useState<'population' | 'sample'>('population');

  const stats: Stats | null = useMemo(() => {
    const numbers = data
      .split(/[\s,]+/)
      .map(s => s.trim())
      .filter(Boolean)
      .map(Number)
      .filter(n => !isNaN(n));

    if (numbers.length === 0) return null;

    const count = numbers.length;
    const sum = numbers.reduce((acc, n) => acc + n, 0);
    const mean = sum / count;
    
    const sumOfSquares = numbers.reduce((acc, n) => acc + Math.pow(n - mean, 2), 0);
    
    const divisor = type === 'population' ? count : count -1;
    if (divisor <= 0) return null; // Avoid division by zero for sample with 1 or 0 items
    
    const variance = sumOfSquares / divisor;
    const stdDev = Math.sqrt(variance);
    const sem = stdDev / Math.sqrt(count);

    const frequency: { [key: string]: number } = {};
    for (const num of numbers) {
        frequency[String(num)] = (frequency[String(num)] || 0) + 1;
    }

    return { mean, variance, stdDev, sum, count, sumOfSquares, sem, frequency, type };
  }, [data, type]);

  return (
    <div className="space-y-6">
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
        <div className="space-y-2">
            <Label htmlFor="type">It is a</Label>
            <Select value={type} onValueChange={(val) => setType(val as 'population' | 'sample')}>
                <SelectTrigger id="type" className="w-[180px]">
                    <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="population">Population</SelectItem>
                    <SelectItem value="sample">Sample</SelectItem>
                </SelectContent>
            </Select>
        </div>
      </CardContent>
    </Card>

    {stats && (
        <Card>
            <CardHeader>
                <CardTitle>Results</CardTitle>
                <CardDescription>
                    Standard Deviation (σ): {stats.stdDev.toFixed(8)}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
                    <StatCard title="Count (N)" value={stats.count} />
                    <StatCard title="Sum (Σx)" value={stats.sum} />
                    <StatCard title="Mean (μ)" value={stats.mean} />
                    <StatCard title="Variance (σ²)" value={stats.variance} />
                </div>
            </CardContent>
        </Card>
    )}

    {stats && (
        <Card>
            <CardHeader>
                <CardTitle>Steps</CardTitle>
            </CardHeader>
            <CardContent className="font-mono text-sm space-y-4">
                <div>
                    <p className="font-semibold">Variance (σ²):</p>
                    <p>σ² = Σ(xi - μ)² / {stats.type === 'population' ? 'N' : 'N-1'}</p>
                    <p>σ² = ( (10 - {stats.mean})² + ... + (16 - {stats.mean})² ) / {stats.type === 'population' ? stats.count : stats.count - 1}</p>
                    <p>σ² = {stats.sumOfSquares.toFixed(4)} / {stats.type === 'population' ? stats.count : stats.count - 1}</p>
                    <p>σ² = {stats.variance.toFixed(4)}</p>
                </div>
                 <div>
                    <p className="font-semibold">Standard Deviation (σ):</p>
                    <p>σ = √σ²</p>
                    <p>σ = √{stats.variance.toFixed(4)}</p>
                    <p>σ = {stats.stdDev.toFixed(8)}</p>
                </div>
            </CardContent>
        </Card>
    )}
    
    {stats && (
        <Card>
            <CardHeader>
                <CardTitle>Margin of Error (Confidence Interval)</CardTitle>
                 <CardDescription>
                    Standard Error of the Mean (SEM) = σ/√N = {stats.sem.toFixed(8)}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Confidence Level</TableHead>
                        <TableHead>Margin of Error</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {confidenceLevels.map(({level, z}) => {
                            const margin = z * stats.sem;
                            const percentage = (margin / stats.mean) * 100;
                            return (
                                <TableRow key={level}>
                                <TableCell>{level}, {z}σx̄</TableCell>
                                <TableCell>{stats.mean.toFixed(2)} ± {margin.toFixed(3)} (±{percentage.toFixed(2)}%)</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )}

     {stats && Object.keys(stats.frequency).length > 0 && (
        <Card>
            <CardHeader><CardTitle>Frequency Table</CardTitle></CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Value</TableHead>
                        <TableHead>Frequency</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Object.entries(stats.frequency).sort((a,b) => Number(a[0]) - Number(b[0])).map(([value, freq]) => (
                            <TableRow key={value}>
                                <TableCell>{value}</TableCell>
                                <TableCell>{freq} ({((freq / stats.count) * 100).toFixed(1)}%)</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )}
    </div>
  );
}
