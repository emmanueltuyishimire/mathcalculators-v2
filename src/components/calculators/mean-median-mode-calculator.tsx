
"use client";

import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface Stats {
  mean: number;
  median: number;
  mode: string;
  range: number;
  count: number;
  sum: number;
  largest: number;
  smallest: number;
  sortedData: string;
}

const StatDisplay = ({ label, value }: { label: string; value: string | number }) => (
    <div className="flex justify-between items-center p-2 bg-muted rounded-md">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        <span className="text-sm font-mono font-semibold">{typeof value === 'number' ? value.toFixed(4) : value}</span>
    </div>
);

export default function MeanMedianModeCalculator() {
  const [data, setData] = useState('8, 12, 12, 15, 17, 22, 23, 30');
  const [stats, setStats] = useState<Stats | null>(null);

  const calculate = () => {
    const numbers = data
      .split(/[\s,]+/)
      .map(s => s.trim())
      .filter(Boolean)
      .map(Number)
      .filter(n => !isNaN(n));

    if (numbers.length === 0) {
        setStats(null);
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
    
    const frequency: { [key: number]: number } = {};
    numbers.forEach(n => frequency[n] = (frequency[n] || 0) + 1);
    const maxFreq = Math.max(...Object.values(frequency));
    const modes = Object.keys(frequency).filter(n => frequency[Number(n)] === maxFreq).map(Number);
    let modeStr: string;
    
    if (maxFreq > 1 && modes.length < count) {
        modeStr = `${modes.join(', ')} (×${maxFreq} each)`;
    } else if (modes.length === count && count > 1) {
        modeStr = "No mode";
    } else if (count === 1) {
        modeStr = `${modes[0]}`;
    }
    else {
        modeStr = "No mode";
    }

    const largest = Math.max(...numbers);
    const smallest = Math.min(...numbers);
    const range = largest - smallest;

    setStats({ 
        mean, median, mode: modeStr, range, sum, count, largest, smallest,
        sortedData: sorted.join(', '),
    });
  };
  
  useEffect(() => {
    calculate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div className="space-y-4">
        <Card className="shadow-lg">
            <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="data" className="sr-only">Numbers</Label>
                    <Textarea
                        id="data"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        placeholder="e.g., 8, 12, 12, 15, 17, 22, 23, 30"
                        className="h-20 font-mono"
                        aria-label="Enter numbers separated by commas"
                    />
                </div>
                <Button onClick={calculate} className="w-full">Calculate</Button>
            </CardContent>
        </Card>

        {stats && (
            <Card>
                <CardHeader className="p-4">
                    <CardTitle>Results</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-2 p-4 pt-0">
                    <StatDisplay label="Mean (Average)" value={stats.mean} />
                    <StatDisplay label="Median" value={stats.median} />
                    <StatDisplay label="Mode" value={stats.mode} />
                    <StatDisplay label="Range" value={stats.range} />
                    <StatDisplay label="Count" value={stats.count} />
                    <StatDisplay label="Sum" value={stats.sum} />
                    <StatDisplay label="Largest" value={stats.largest} />
                    <StatDisplay label="Smallest" value={stats.smallest} />
                     <div className="md:col-span-2 space-y-1 pt-2">
                        <Label className="text-sm font-medium text-muted-foreground">Sorted Data</Label>
                        <p className="text-xs font-mono p-2 bg-muted rounded-md">{stats.sortedData}</p>
                     </div>
                </CardContent>
            </Card>
        )}
    </div>
  );
}
