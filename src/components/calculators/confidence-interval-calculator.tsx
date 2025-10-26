
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const confidenceLevels = [
    { label: "70%", value: "1.04" },
    { label: "75%", value: "1.15" },
    { label: "80%", value: "1.28" },
    { label: "85%", value: "1.44" },
    { label: "90%", value: "1.645" },
    { label: "92%", value: "1.75" },
    { label: "95%", value: "1.96" },
    { label: "96%", value: "2.05" },
    { label: "98%", value: "2.33" },
    { label: "99%", value: "2.58" },
    { label: "99.9%", value: "3.29" },
    { label: "99.99%", value: "3.89" },
    { label: "99.999%", value: "4.42" },
];

export default function ConfidenceIntervalCalculator() {
    const { toast } = useToast();
    const [sampleSize, setSampleSize] = useState('50');
    const [sampleMean, setSampleMean] = useState('20.6');
    const [stdDev, setStdDev] = useState('3.2');
    const [confidence, setConfidence] = useState("1.96");
    const [result, setResult] = useState<{ marginOfError: number, lowerBound: number, upperBound: number } | null>(null);

    const calculate = () => {
        const n = parseInt(sampleSize, 10);
        const mean = parseFloat(sampleMean);
        const sd = parseFloat(stdDev);
        const z = parseFloat(confidence);

        if ([sampleSize, sampleMean, stdDev].some(v => v === '') || [n, mean, sd].some(isNaN)) {
             setResult(null);
             if (sampleSize || sampleMean || stdDev) {
                toast({
                    variant: 'destructive',
                    title: "Invalid Input",
                    description: "Please enter valid numbers for all fields.",
                });
             }
            return;
        }
        
        if (n <= 0 || sd < 0) {
            toast({
                variant: 'destructive',
                title: "Invalid Input",
                description: "Sample size must be positive and standard deviation non-negative.",
            });
            setResult(null);
            return;
        }

        const marginOfError = z * (sd / Math.sqrt(n));
        const lowerBound = mean - marginOfError;
        const upperBound = mean + marginOfError;

        setResult({ marginOfError, lowerBound, upperBound });
    };
    
    return (
        <Card className="shadow-lg">
            <CardHeader className="p-4">
                <CardTitle>Compute Confidence Interval</CardTitle>
                <CardDescription>Enter your sample data to calculate the confidence interval.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
                <div className="space-y-2">
                    <Label htmlFor="sample-size">Sample Size (n)</Label>
                    <Input id="sample-size" type="number" value={sampleSize} onChange={(e) => setSampleSize(e.target.value)} min="1" aria-label="Sample Size"/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="sample-mean">Sample Mean (X̄)</Label>
                    <Input id="sample-mean" type="number" value={sampleMean} onChange={(e) => setSampleMean(e.target.value)} aria-label="Sample Mean" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="std-dev">Standard Deviation (σ or s)</Label>
                    <Input id="std-dev" type="number" value={stdDev} onChange={(e) => setStdDev(e.target.value)} min="0" aria-label="Standard Deviation"/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="confidence-level">Confidence Level</Label>
                    <Select value={confidence} onValueChange={setConfidence}>
                        <SelectTrigger id="confidence-level" aria-label="Confidence Level"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            {confidenceLevels.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                <div className="sm:col-span-2">
                    <Button onClick={calculate} className="w-full">Calculate</Button>
                </div>
            </CardContent>
            {result !== null && (
                <CardFooter className="p-4">
                    <div className="w-full p-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-md space-y-2">
                        <h3 className="font-bold text-lg">Results:</h3>
                        <p className="font-mono"><strong>Margin of Error:</strong> {result.marginOfError.toFixed(4)}</p>
                        <p className="font-mono"><strong>Confidence Interval:</strong> [{result.lowerBound.toFixed(4)}, {result.upperBound.toFixed(4)}]</p>
                    </div>
                </CardFooter>
            )}
        </Card>
    );
}
