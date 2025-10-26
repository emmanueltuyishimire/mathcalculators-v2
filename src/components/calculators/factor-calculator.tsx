
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

const getFactorsAndPairs = (num: number): { factors: number[], pairs: [number, number][] } => {
    if (num === 0) return { factors: [], pairs: [] };
    const n = Math.abs(num);
    const factors = new Set<number>();
    const pairs: [number, number][] = [];
    for (let i = 1; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            factors.add(i);
            factors.add(n / i);
            pairs.push([i, n / i]);
        }
    }
    return { factors: Array.from(factors).sort((a, b) => a - b), pairs };
};

const getPrimeFactorization = (num: number): number[] => {
    const factors: number[] = [];
    let n = Math.abs(num);
    if (n < 2) return [];

    let divisor = 2;
    while (n >= 2) {
        if (n % divisor === 0) {
            factors.push(divisor);
            n = n / divisor;
        } else {
            divisor++;
        }
    }
    return factors;
};

interface FactorResult {
    allFactors: number[];
    factorPairs: [number, number][];
    primeFactors: number[];
}

export default function FactorCalculator() {
    const { toast } = useToast();
    const [input, setInput] = useState('120');
    const [result, setResult] = useState<FactorResult | null>(null);

    const calculate = () => {
        if (!input) {
            setResult(null);
            return;
        }

        const num = parseInt(input, 10);

        if (isNaN(num)) {
            if(input) {
              toast({
                  variant: 'destructive',
                  title: 'Invalid Input',
                  description: 'Please enter a valid integer.',
              });
            }
            setResult(null);
            return;
        }
        
        if (Math.abs(num) > 10000000) {
             toast({
                variant: 'destructive',
                title: 'Input Too Large',
                description: 'Please enter a number smaller than 10,000,000 for faster results.',
            });
            setResult(null);
            return;
        }

        try {
            const { factors, pairs } = getFactorsAndPairs(num);
            const primeFactors = getPrimeFactorization(num);
            setResult({ allFactors: factors, factorPairs: pairs, primeFactors });
        } catch (e: any) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'An unexpected error occurred during calculation.',
            });
             setResult(null);
        }
    };
    
    return (
        <Card className="shadow-lg">
            <CardHeader className="p-4">
                <CardTitle>Factor an Integer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-4">
                <div className="space-y-2">
                    <Label htmlFor="number-input">Integer</Label>
                    <Input
                        id="number-input"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="e.g., 120"
                        className="font-mono"
                        type="number"
                    />
                </div>
                <Button onClick={calculate} className="w-full">Calculate</Button>
            </CardContent>
            {result && (
                <CardFooter className="flex-col items-start gap-3 p-4">
                     <div className="w-full p-3 bg-muted rounded-lg space-y-2">
                        <h3 className="font-semibold">Factors:</h3>
                        <p className="text-sm">
                            {result.allFactors.join(', ')}
                        </p>
                    </div>
                     <div className="w-full p-3 bg-muted rounded-lg space-y-2">
                        <h3 className="font-semibold">Factor Pairs:</h3>
                        <p className="text-sm">
                            {result.factorPairs.map(pair => `(${pair.join(', ')})`).join(' ')}
                        </p>
                    </div>
                     <div className="w-full p-3 bg-muted rounded-lg space-y-2">
                        <h3 className="font-semibold">Prime Factors:</h3>
                         <p className="font-mono text-primary">
                            {input} = {result.primeFactors.join(' × ')}
                        </p>
                    </div>
                </CardFooter>
            )}
        </Card>
    );
}
