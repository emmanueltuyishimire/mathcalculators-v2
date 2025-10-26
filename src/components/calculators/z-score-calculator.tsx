
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { jStat } from 'jstat';

function ZScoreFormulaCalculator() {
    const { toast } = useToast();
    const [rawScore, setRawScore] = useState('85');
    const [mean, setMean] = useState('75');
    const [stdDev, setStdDev] = useState('5');
    const [zScore, setZScore] = useState<number | null>(null);

    const calculate = () => {
        const x = parseFloat(rawScore);
        const mu = parseFloat(mean);
        const sigma = parseFloat(stdDev);

        if (isNaN(x) || isNaN(mu) || isNaN(sigma)) {
            if(rawScore || mean || stdDev) {
              toast({ variant: 'destructive', title: 'Invalid Input', description: 'Please enter valid numbers for all fields.' });
            }
            setZScore(null);
            return;
        }
        if (sigma <= 0) {
             toast({ variant: 'destructive', title: 'Invalid Input', description: 'Standard deviation must be positive.' });
             setZScore(null);
            return;
        }

        const z = (x - mu) / sigma;
        setZScore(z);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Z-Score Calculator</CardTitle>
                <CardDescription>Use this calculator to compute the z-score of a normal distribution.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="rawScore">Raw Score (x)</Label>
                    <Input id="rawScore" type="number" value={rawScore} onChange={(e) => setRawScore(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="mean">Population Mean (μ)</Label>
                    <Input id="mean" type="number" value={mean} onChange={(e) => setMean(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="stdDev">Standard Deviation (σ)</Label>
                    <Input id="stdDev" type="number" value={stdDev} onChange={(e) => setStdDev(e.target.value)} min="0.0001" />
                </div>
                 <Button onClick={calculate} className="w-full">Calculate Z-Score</Button>
            </CardContent>
            {zScore !== null && (
                <CardFooter>
                    <div className="w-full p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-md">
                        <h3 className="font-bold text-lg">Z-Score: <span className="text-primary">{zScore.toFixed(4)}</span></h3>
                        <div className="font-mono text-sm mt-2 p-2 bg-muted rounded-md">
                          <p>z = (x - μ) / σ</p>
                          <p>z = ({rawScore} - {mean}) / {stdDev}</p>
                          <p>z = {(parseFloat(rawScore) - parseFloat(mean)).toFixed(4)} / {stdDev}</p>
                          <p>z = {zScore.toFixed(4)}</p>
                        </div>
                    </div>
                </CardFooter>
            )}
        </Card>
    );
}

function ZScoreProbabilityConverter() {
    const { toast } = useToast();
    const [zScore, setZScore] = useState('1.5');
    const [results, setResults] = useState<any>(null);

    const calculate = () => {
        const z = parseFloat(zScore);
        if (isNaN(z)) {
            if(zScore) toast({ variant: 'destructive', title: 'Invalid Input', description: 'Please enter a valid Z-score.' });
            setResults(null);
            return;
        }
        
        const p_less = jStat.normal.cdf(z, 0, 1);
        const p_greater = 1 - p_less;
        const p_0_to_z = Math.abs(p_less - 0.5);
        const p_between = jStat.normal.cdf(Math.abs(z), 0, 1) - jStat.normal.cdf(-Math.abs(z), 0, 1);
        const p_outside = 1 - p_between;

        setResults({ p_less, p_greater, p_0_to_z, p_between, p_outside });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Z-Score and Probability Converter</CardTitle>
                <CardDescription>Provide any one value to convert between z-score and probability. This is the equivalent of referencing a z-table.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="zValue">Z-score (Z)</Label>
                    <Input id="zValue" type="number" value={zScore} onChange={(e) => setZScore(e.target.value)} />
                </div>
                 <Button onClick={calculate} className="w-full">Calculate Probabilities</Button>
            </CardContent>
            {results && (
                <CardFooter className="flex-col items-start gap-2">
                    <p><b>Probability P(x&lt;Z):</b> {results.p_less.toFixed(4)}</p>
                    <p><b>Probability P(x&gt;Z):</b> {results.p_greater.toFixed(4)}</p>
                    <p><b>Probability P(0 to Z or Z to 0):</b> {results.p_0_to_z.toFixed(4)}</p>
                    <p><b>Probability P(-Z&lt;x&lt;Z):</b> {results.p_between.toFixed(4)}</p>
                    <p><b>Probability P(x&lt;-Z or x&gt;Z):</b> {results.p_outside.toFixed(4)}</p>
                </CardFooter>
            )}
        </Card>
    );
}

function ZScoreRangeCalculator() {
    const { toast } = useToast();
    const [z1, setZ1] = useState('-1.96');
    const [z2, setZ2] = useState('1.96');
    const [result, setResult] = useState<number | null>(null);

    const calculate = () => {
        const z1_num = parseFloat(z1);
        const z2_num = parseFloat(z2);

        if (isNaN(z1_num) || isNaN(z2_num)) {
             if (z1 || z2) toast({ variant: 'destructive', title: 'Invalid Input', description: 'Please provide both Z-scores.' });
             setResult(null);
            return;
        }

        if (z1_num > z2_num) {
            toast({ variant: 'destructive', title: 'Invalid Input', description: 'Left bound (Z1) cannot be greater than right bound (Z2).' });
             setResult(null);
            return;
        }

        const prob = jStat.normal.cdf(z2_num, 0, 1) - jStat.normal.cdf(z1_num, 0, 1);
        setResult(prob);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Probability between Two Z-scores</CardTitle>
                <CardDescription>Use this calculator to find the probability (area P in the diagram) between two z-scores.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="z1">Left Bound (Z1)</Label>
                        <Input id="z1" type="number" value={z1} onChange={(e) => setZ1(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="z2">Right Bound (Z2)</Label>
                        <Input id="z2" type="number" value={z2} onChange={(e) => setZ2(e.target.value)} />
                    </div>
                </div>
                 <Button onClick={calculate} className="w-full">Calculate Probability</Button>
            </CardContent>
            {result !== null && (
                <CardFooter>
                     <div className="w-full p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-md">
                        <h3 className="font-bold text-lg">Probability (P): <span className="text-primary">{result.toFixed(4)}</span></h3>
                    </div>
                </CardFooter>
            )}
        </Card>
    );
}

export default function ZScoreCalculator() {
    return (
        <div className="space-y-8">
            <ZScoreFormulaCalculator />
            <ZScoreProbabilityConverter />
            <ZScoreRangeCalculator />
        </div>
    );
}
