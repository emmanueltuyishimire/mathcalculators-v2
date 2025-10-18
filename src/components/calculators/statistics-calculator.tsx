"use client";

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Input } from '../ui/input';

interface Stats {
  mean: number;
  popStdDev: number;
  sampleStdDev: number;
  popVariance: number;
  sampleVariance: number;
  geoMean: number;
  count: number;
  sum: number;
  sumOfSquares: number;
}

const StatDisplay = ({ title, value, unit }: { title: string; value: number | string; unit?: string }) => (
    <div className="flex justify-between items-center p-2 bg-muted rounded-md">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        <span className="text-sm font-mono font-semibold">
            {typeof value === 'number' ? value.toFixed(4) : value} {unit}
        </span>
    </div>
);

export default function StatisticsCalculator() {
  const [display, setDisplay] = useState('0');
  const [dataset, setDataset] = useState<number[]>([]);
  const [csvData, setCsvData] = useState('10, 2, 38, 23, 38, 23, 21');
  const { toast } = useToast();

  const stats: Stats | null = useMemo(() => {
    if (dataset.length === 0) return null;

    const n = dataset.length;
    const sum = dataset.reduce((acc, val) => acc + val, 0);
    const mean = sum / n;
    
    const sumOfSquaredDiffs = dataset.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
    const sumOfSquares = dataset.reduce((acc, val) => acc + val*val, 0);

    const popVariance = sumOfSquaredDiffs / n;
    const popStdDev = Math.sqrt(popVariance);
    
    const sampleVariance = n > 1 ? sumOfSquaredDiffs / (n - 1) : 0;
    const sampleStdDev = n > 1 ? Math.sqrt(sampleVariance) : 0;
    
    const product = dataset.reduce((acc, val) => acc * val, 1);
    const geoMean = Math.pow(product, 1 / n);

    return { 
        count: n,
        sum,
        sumOfSquares,
        mean,
        popStdDev,
        sampleStdDev,
        popVariance,
        sampleVariance,
        geoMean
    };
  }, [dataset]);

  const handleKeypad = (key: string) => {
    if (display === '0' && key !== '.') setDisplay(key);
    else setDisplay(prev => prev + key);
  };
  
  const handleClear = () => setDisplay('0');
  
  const handleAllClear = () => {
    setDisplay('0');
    setDataset([]);
    setCsvData('');
    toast({ title: 'Cleared', description: 'All data has been cleared.'});
  };

  const handleAdd = () => {
    const value = parseFloat(display);
    if (!isNaN(value)) {
      setDataset(prev => [...prev, value]);
      setDisplay('0');
      toast({ title: "Value Added", description: `${value} has been added to the dataset.`});
    } else {
      toast({ variant: 'destructive', title: "Invalid Number", description: "Could not add value to dataset."});
    }
  };
  
  const handleLoadCsv = () => {
      try {
        const numbers = csvData
            .split(/[\s,]+/)
            .map(s => s.trim())
            .filter(Boolean)
            .map(Number)
            .filter(n => !isNaN(n));
        
        if (numbers.length === 0) throw new Error("No valid numbers found in input.");
        
        setDataset(numbers);
        toast({ title: 'Dataset Loaded', description: `${numbers.length} values have been loaded.`});
      } catch (e: any) {
        toast({ variant: 'destructive', title: "Error Loading Data", description: e.message });
      }
  }

  const keypadButtons = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.', '±'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Statistics Calculator</CardTitle>
        <CardDescription>Input numbers via the keypad or as a comma-separated list.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Keypad section */}
        <div className="p-2 border rounded-lg">
            <Input 
              readOnly 
              value={display} 
              className="mb-2 h-12 text-right text-3xl font-mono bg-muted" 
              aria-label="Current number input"
            />
            <div className="grid grid-cols-3 gap-2">
                {keypadButtons.map(key => (
                    <Button key={key} variant="outline" onClick={() => handleKeypad(key)}>
                        {key}
                    </Button>
                ))}
            </div>
             <div className="grid grid-cols-2 gap-2 mt-2">
                <Button variant="destructive" onClick={handleClear}>Clear Entry</Button>
                <Button className="bg-accent hover:bg-accent/90" onClick={handleAdd}>Add to Data</Button>
            </div>
        </div>

        {/* CSV Input section */}
        <div className="space-y-2">
            <Label htmlFor="csvData">Or Provide Comma-Separated Values</Label>
            <Textarea
                id="csvData"
                value={csvData}
                onChange={(e) => setCsvData(e.target.value)}
                placeholder="e.g., 10, 2, 38, 23, 38, 23, 21"
                className="h-24 font-mono"
            />
            <Button onClick={handleLoadCsv} className="w-full">Load Data</Button>
        </div>
        <Button onClick={handleAllClear} variant="secondary" className="w-full">Clear All Data</Button>
      </CardContent>
    </Card>

    <Card>
        <CardHeader>
            <CardTitle>Results</CardTitle>
            <CardDescription>
                {stats ? `Analysis for ${stats.count} data points.` : 'No data to analyze.'}
            </CardDescription>
        </CardHeader>
        {stats && (
            <CardContent className="space-y-2">
                <StatDisplay title="Count" value={stats.count} />
                <StatDisplay title="Sum (Σx)" value={stats.sum} />
                <StatDisplay title="Sum of Squares (Σx²)" value={stats.sumOfSquares} />
                <hr/>
                <StatDisplay title="Mean" value={stats.mean} />
                <StatDisplay title="Geometric Mean (GM)" value={stats.geoMean} />
                <hr/>
                <StatDisplay title="Population Variance (σ²)" value={stats.popVariance} />
                <StatDisplay title="Population Std. Dev. (σ)" value={stats.popStdDev} />
                <hr/>
                <StatDisplay title="Sample Variance (s²)" value={stats.sampleVariance} />
                <StatDisplay title="Sample Std. Dev. (s)" value={stats.sampleStdDev} />
            </CardContent>
        )}
        <CardFooter>
            <p className="text-xs text-muted-foreground">
                Population stats are for a complete dataset. Sample stats are for a subset of a larger population.
            </p>
        </CardFooter>
    </Card>
    </div>
  );
}
