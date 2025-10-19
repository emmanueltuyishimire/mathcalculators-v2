
"use client";

import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Input } from '../ui/input';
import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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

export default function StatisticsCalculator() {
  const [display, setDisplay] = useState('0');
  const [dataset, setDataset] = useState<number[]>([5, 10, 15, 20, 25]);
  const [csvData, setCsvData] = useState('5, 10, 15, 20, 25');
  const { toast } = useToast();

  const stats: Stats | null = useMemo(() => {
    if (dataset.length === 0) return null;

    const n = dataset.length;
    const sum = dataset.reduce((acc, val) => acc + val, 0);
    const mean = sum / n;
    
    const sumOfSquaredDiffs = dataset.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
    const sumOfSquares = dataset.reduce((acc, val) => acc + val * val, 0);

    const popVariance = sumOfSquaredDiffs / n;
    const popStdDev = Math.sqrt(popVariance);
    
    const sampleVariance = n > 1 ? sumOfSquaredDiffs / (n - 1) : 0;
    const sampleStdDev = n > 1 ? Math.sqrt(sampleVariance) : 0;
    
    let geoMean = NaN;
    if (dataset.every(v => v > 0)) {
        const product = dataset.reduce((acc, val) => acc * val, 1);
        geoMean = Math.pow(product, 1 / n);
    }

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
    if (display.includes('E') && key === 'EXP') return;
    if (display.includes('.') && key === '.') return;

    if (key === 'EXP') {
      setDisplay(prev => prev + 'E');
      return;
    }
    if (key === '±') {
      setDisplay(prev => prev.startsWith('-') ? prev.substring(1) : '-' + prev);
      return;
    }

    if (display === '0' && key !== '.') setDisplay(key);
    else setDisplay(prev => prev + key);
  };
  
  const handleClear = () => setDisplay('0'); // CAD
  
  const handleAllClear = () => {
    setDisplay('0');
    setDataset([]);
    setCsvData('');
    toast({ title: 'Cleared', description: 'All data has been cleared.'});
  }; // C

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

  const handleDelete = (indexToDelete: number) => {
    setDataset(prev => prev.filter((_, index) => index !== indexToDelete));
    toast({ title: "Value Removed", description: "A value has been removed from the dataset." });
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

  const handleStatButton = (stat: 'Σx' | 'Σx²' | 'σ' | 'σ²' | 's' | 's²' | 'GM') => {
      if (!stats) {
          toast({ variant: 'destructive', title: "No Data", description: "Please add numbers to the dataset first."});
          return;
      }
      let value: number | string;
      switch(stat) {
          case 'Σx': value = stats.sum; break;
          case 'Σx²': value = stats.sumOfSquares; break;
          case 'σ': value = stats.popStdDev; break;
          case 'σ²': value = stats.popVariance; break;
          case 's': value = stats.sampleStdDev; break;
          case 's²': value = stats.sampleVariance; break;
          case 'GM': 
            value = isNaN(stats.geoMean) ? "Invalid" : stats.geoMean;
            if (isNaN(stats.geoMean)) toast({ variant: 'destructive', title: "Calculation Error", description: "Geometric Mean requires all values to be positive."});
            break;
      }
      setDisplay(typeof value === 'number' ? value.toFixed(4) : value);
  }

  const handleImmediateOp = (op: 'x²') => {
    const value = parseFloat(display);
    if (!isNaN(value)) {
      if (op === 'x²') {
        setDisplay(String(value * value));
      }
    }
  }

  const keypadRow1 = ['7', '8', '9'];
  const keypadRow2 = ['4', '5', '6'];
  const keypadRow3 = ['1', '2', '3'];
  const keypadRow4 = ['0', '.', 'EXP'];
  const keypadRow5 = ['CAD', 'C', 'ADD', '±', 'GM'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Statistics Calculator</CardTitle>
          <CardDescription>Input numbers via the keypad or as a comma-separated list.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-2 border rounded-lg">
              <Input 
                readOnly 
                value={display} 
                className="mb-2 h-12 text-right text-3xl font-mono bg-muted" 
                aria-label="Current number input"
              />
              <div className="grid grid-cols-5 gap-2">
                  {/* Row 1 */}
                  {keypadRow1.map(k => <Button key={k} variant="outline" onClick={() => handleKeypad(k)}>{k}</Button>)}
                  <Button variant="secondary" disabled>x</Button>
                  <Button variant="secondary" onClick={() => handleImmediateOp('x²')} aria-label="Square">x²</Button>
                  {/* Row 2 */}
                  {keypadRow2.map(k => <Button key={k} variant="outline" onClick={() => handleKeypad(k)}>{k}</Button>)}
                  <Button variant="secondary" onClick={() => handleStatButton('Σx')} aria-label="Sum of x">Σx</Button>
                  <Button variant="secondary" onClick={() => handleStatButton('Σx²')} aria-label="Sum of x squared">Σx²</Button>
                  {/* Row 3 */}
                  {keypadRow3.map(k => <Button key={k} variant="outline" onClick={() => handleKeypad(k)}>{k}</Button>)}
                  <Button variant="secondary" onClick={() => handleStatButton('σ')} aria-label="Population Standard Deviation">σ</Button>
                  <Button variant="secondary" onClick={() => handleStatButton('σ²')} aria-label="Population Variance">σ²</Button>
                  {/* Row 4 */}
                  {keypadRow4.map(k => <Button key={k} variant="outline" onClick={() => handleKeypad(k)}>{k}</Button>)}
                  <Button variant="secondary" onClick={() => handleStatButton('s')} aria-label="Sample Standard Deviation">s</Button>
                  <Button variant="secondary" onClick={() => handleStatButton('s²')} aria-label="Sample Variance">s²</Button>
                   {/* Row 5 */}
                   <Button variant="destructive" onClick={handleClear} aria-label="Clear Current Entry">CAD</Button>
                   <Button variant="destructive" onClick={handleAllClear} aria-label="Clear All">C</Button>
                   <Button className="bg-accent hover:bg-accent/90" onClick={handleAdd} aria-label="Add to Dataset">ADD</Button>
                   <Button variant="outline" onClick={() => handleKeypad('±')} aria-label="Toggle Sign">±</Button>
                   <Button variant="secondary" onClick={() => handleStatButton('GM')} aria-label="Geometric Mean">GM</Button>
              </div>
          </div>

          <div className="space-y-2">
              <Label htmlFor="csvData">Or Provide Comma-Separated Values</Label>
              <Textarea
                  id="csvData"
                  value={csvData}
                  onChange={(e) => setCsvData(e.target.value)}
                  placeholder="e.g., 5, 10, 15, 20, 25"
                  className="h-24 font-mono"
              />
              <Button onClick={handleLoadCsv} className="w-full">Load Data</Button>
          </div>
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
            <CardContent className="space-y-1">
                <div className="space-y-2">
                    <Label>Current Dataset</Label>
                    <div className="flex flex-wrap gap-1 p-2 bg-muted rounded-md min-h-[40px]">
                        {dataset.map((val, index) => (
                            <Badge key={index} variant="secondary" className="gap-1">
                                {val}
                                <button onClick={() => handleDelete(index)} className="rounded-full hover:bg-destructive/20 p-0.5" aria-label={`Remove ${val} from dataset`}>
                                    <X className="h-3 w-3" />
                                </button>
                            </Badge>
                        ))}
                    </div>
                </div>
                <div className="flex justify-between items-center p-2 bg-muted rounded-md">
                    <span className="text-sm font-medium text-muted-foreground">Count</span>
                    <span className="text-sm font-mono font-semibold">{stats.count}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-muted rounded-md">
                    <span className="text-sm font-medium text-muted-foreground">Sum (Σx)</span>
                    <span className="text-sm font-mono font-semibold">{stats.sum.toFixed(4)}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-muted rounded-md">
                    <span className="text-sm font-medium text-muted-foreground">Sum of Squares (Σx²)</span>
                    <span className="text-sm font-mono font-semibold">{stats.sumOfSquares.toFixed(4)}</span>
                </div>
                <hr className="my-1"/>
                <div className="flex justify-between items-center p-2 bg-muted rounded-md">
                    <span className="text-sm font-medium text-muted-foreground">Mean</span>
                    <span className="text-sm font-mono font-semibold">{stats.mean.toFixed(4)}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-muted rounded-md">
                    <span className="text-sm font-medium text-muted-foreground">Geometric Mean (GM)</span>
                    <span className="text-sm font-mono font-semibold">{isNaN(stats.geoMean) ? 'N/A' : stats.geoMean.toFixed(4)}</span>
                </div>
                <hr className="my-1"/>
                <div className="flex justify-between items-center p-2 bg-muted rounded-md">
                    <span className="text-sm font-medium text-muted-foreground">Population Variance (σ²)</span>
                    <span className="text-sm font-mono font-semibold">{stats.popVariance.toFixed(4)}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-muted rounded-md">
                    <span className="text-sm font-medium text-muted-foreground">Population Std. Dev. (σ)</span>
                    <span className="text-sm font-mono font-semibold">{stats.popStdDev.toFixed(4)}</span>
                </div>
                <hr className="my-1"/>
                <div className="flex justify-between items-center p-2 bg-muted rounded-md">
                    <span className="text-sm font-medium text-muted-foreground">Sample Variance (s²)</span>
                    <span className="text-sm font-mono font-semibold">{stats.sampleVariance.toFixed(4)}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-muted rounded-md">
                    <span className="text-sm font-medium text-muted-foreground">Sample Std. Dev. (s)</span>
                    <span className="text-sm font-mono font-semibold">{stats.sampleStdDev.toFixed(4)}</span>
                </div>
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

    
