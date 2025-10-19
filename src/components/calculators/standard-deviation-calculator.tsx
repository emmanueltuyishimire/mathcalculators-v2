
"use client";

import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface Stats {
  mean: number;
  median: number;
  mode: string;
  variance: number;
  stdDev: number;
  sum: number;
  count: number;
  largest: number;
  smallest: number;
  range: number;
  geoMean: number | string;
  sumOfSquares: number;
  sem: number;
  frequency: { [key: string]: number };
  sortedData: string;
  type: 'population' | 'sample';
}

const StatDisplay = ({ label, value }: { label: string; value: string | number }) => (
    <div className="flex justify-between items-center p-2 bg-muted rounded-md">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        <span className="text-sm font-mono font-semibold">{typeof value === 'number' ? value.toFixed(4) : value}</span>
    </div>
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
  const [data, setData] = useState('5, 10, 15, 20, 25');
  const [type, setType] = useState<'population' | 'sample'>('population');
  const [calculatedStats, setCalculatedStats] = useState<Stats | null>(null);

  const calculate = () => {
    const numbers = data
      .split(/[\s,]+/)
      .map(s => s.trim())
      .filter(Boolean)
      .map(Number)
      .filter(n => !isNaN(n));

    if (numbers.length === 0) {
        setCalculatedStats(null);
        return;
    }

    const count = numbers.length;
    const sum = numbers.reduce((acc, n) => acc + n, 0);
    const mean = sum / count;

    const sorted = [...numbers].sort((a,b) => a-b);
    let median;
    if (count % 2 === 0) {
        median = (sorted[count/2 - 1] + sorted[count/2]) / 2;
    } else {
        median = sorted[Math.floor(count/2)];
    }
    
    const frequency: { [key: string]: number } = {};
    numbers.forEach(n => frequency[String(n)] = (frequency[String(n)] || 0) + 1);
    const maxFreq = Math.max(...Object.values(frequency));
    const modes = Object.keys(frequency).filter(n => frequency[String(n)] === maxFreq);
    const modeStr = `${modes.join(', ')}, appeared ${maxFreq} times`;

    const largest = Math.max(...numbers);
    const smallest = Math.min(...numbers);
    const range = largest - smallest;

    let geoMean: number | string = 'N/A';
    if(numbers.every(n => n > 0)) {
       geoMean = Math.pow(numbers.reduce((a,b) => a*b, 1), 1/count);
    }

    const sumOfSquares = numbers.reduce((acc, n) => acc + Math.pow(n - mean, 2), 0);
    
    const divisor = type === 'population' ? count : count -1;
    if (divisor <= 0) {
        setCalculatedStats(null);
        return;
    };
    
    const variance = sumOfSquares / divisor;
    const stdDev = Math.sqrt(variance);
    const sem = stdDev / Math.sqrt(count);

    setCalculatedStats({ 
        mean, median, mode: modeStr, variance, stdDev, sum, count, largest, smallest, range, geoMean,
        sumOfSquares, sem, frequency, sortedData: sorted.join(', '), type 
    });
  };
  
  useEffect(() => {
    calculate();
  }, [data, type]);
  
  const stats = calculatedStats;

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
            placeholder="e.g., 5, 10, 15, 20, 25"
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
         <Button onClick={calculate} className="w-full">Calculate</Button>
      </CardContent>
    </Card>

    {stats && (
        <Card>
            <CardHeader>
                <CardTitle>Results</CardTitle>
                <CardDescription>
                    Here is a complete statistical analysis of your dataset.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                <StatDisplay label="Count" value={stats.count} />
                <StatDisplay label="Sum" value={stats.sum} />
                <StatDisplay label="Mean" value={stats.mean} />
                <StatDisplay label="Median" value={stats.median} />
                <StatDisplay label="Mode" value={stats.mode} />
                <StatDisplay label="Largest" value={stats.largest} />
                <StatDisplay label="Smallest" value={stats.smallest} />
                <StatDisplay label="Range" value={stats.range} />
                <StatDisplay label="Geometric Mean" value={stats.geoMean} />
                <StatDisplay label={`Variance (${stats.type === 'population' ? 'σ²' : 's²'})`} value={stats.variance} />
                <StatDisplay label={`Std. Deviation (${stats.type === 'population' ? 'σ' : 's'})`} value={stats.stdDev} />
                 <div className="md:col-span-2 space-y-1 pt-2">
                    <Label className="text-sm font-medium text-muted-foreground">Sorted Data</Label>
                    <p className="text-sm font-mono p-2 bg-muted rounded-md">{stats.sortedData}</p>
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
                    <p className="font-semibold">1. Find the Mean (μ):</p>
                    <p>μ = Σx / N = {stats.sum} / {stats.count} = {stats.mean.toFixed(4)}</p>
                </div>
                <div>
                    <p className="font-semibold">2. Find the Variance ({stats.type === 'population' ? 'σ²' : 's²'}):</p>
                    <p>{stats.type === 'population' ? 'σ²' : 's²'} = Σ(xᵢ - μ)² / {stats.type === 'population' ? 'N' : '(N-1)'}</p>
                    <p>{stats.type === 'population' ? 'σ²' : 's²'} = {stats.sumOfSquares.toFixed(4)} / {stats.type === 'population' ? stats.count : stats.count - 1}</p>
                    <p>{stats.type === 'population' ? 'σ²' : 's²'} = {stats.variance.toFixed(4)}</p>
                </div>
                 <div>
                    <p className="font-semibold">3. Find the Standard Deviation ({stats.type === 'population' ? 'σ' : 's'}):</p>
                    <p>{stats.type === 'population' ? 'σ' : 's'} = √{stats.type === 'population' ? 'σ²' : 's²'}</p>
                    <p>{stats.type === 'population' ? 'σ' : 's'} = √{stats.variance.toFixed(4)}</p>
                    <p>{stats.type === 'population' ? 'σ' : 's'} = {stats.stdDev.toFixed(8)}</p>
                </div>
            </CardContent>
        </Card>
    )}
    
    {stats && stats.type === 'sample' && (
        <Card>
            <CardHeader>
                <CardTitle>Margin of Error (Confidence Interval)</CardTitle>
                 <CardDescription>
                    Standard Error of the Mean (SEM) = s/√N = {stats.sem.toFixed(8)}
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
