
"use client";

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const factorial = (n: number): number => {
    if (n < 0) return NaN;
    if (n === 0) return 1;
    let result = 1;
    for (let i = n; i > 1; i--) {
        result *= i;
    }
    return result;
};

export default function PermutationCombinationCalculator() {
    const { toast } = useToast();
    const [n, setN] = useState('6');
    const [r, setR] = useState('2');
    const [results, setResults] = useState<{ permutation: number, combination: number } | null>(null);

    const calculate = () => {
        const nVal = parseInt(n, 10);
        const rVal = parseInt(r, 10);

        if (isNaN(nVal) || isNaN(rVal) || nVal < 0 || rVal < 0 || rVal > nVal) {
            toast({
                variant: 'destructive',
                title: 'Invalid Input',
                description: 'Please enter non-negative integers where n >= r.',
            });
            setResults(null);
            return;
        }
        
        try {
            const factN = factorial(nVal);
            const factR = factorial(rVal);
            const factNminusR = factorial(nVal - rVal);
            
            if (isNaN(factN) || isNaN(factR) || isNaN(factNminusR)) {
                 throw new Error("Factorial calculation resulted in NaN. Input numbers may be too large.");
            }

            const permutation = factN / factNminusR;
            const combination = permutation / factR;

            setResults({ permutation, combination });

        } catch (e: any) {
             toast({
                variant: 'destructive',
                title: 'Calculation Error',
                description: e.message || 'An error occurred during calculation.',
            });
            setResults(null);
        }
    };
    
    // Auto-calculate on initial render
    useState(() => {
        calculate();
    });

    return (
        <div className="space-y-6">
            <Card>
                <CardContent className="pt-6 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="n-value">Total Items in Set (n)</Label>
                            <Input
                                id="n-value"
                                type="number"
                                value={n}
                                onChange={(e) => setN(e.target.value)}
                                min="0"
                                step="1"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="r-value">Items to Choose (r)</Label>
                            <Input
                                id="r-value"
                                type="number"
                                value={r}
                                onChange={(e) => setR(e.target.value)}
                                min="0"
                                step="1"
                            />
                        </div>
                    </div>
                    <Button onClick={calculate} className="w-full">Calculate</Button>
                </CardContent>
            </Card>

            {results && (
                <Card>
                    <CardHeader>
                        <CardTitle>Result</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-center">
                        <div className="p-4 bg-muted rounded-lg">
                            <h3 className="font-semibold text-lg">Permutations (nPr)</h3>
                            <p className="font-mono text-xl text-primary my-2">{results.permutation.toLocaleString()}</p>
                            <p className="text-sm text-muted-foreground font-mono bg-background/50 p-2 rounded-md inline-block">{`n! / (n-r)! = ${n}! / (${n}-${r})!`}</p>
                        </div>
                        <div className="p-4 bg-muted rounded-lg">
                            <h3 className="font-semibold text-lg">Combinations (nCr)</h3>
                            <p className="font-mono text-xl text-primary my-2">{results.combination.toLocaleString()}</p>
                            <p className="text-sm text-muted-foreground font-mono bg-background/50 p-2 rounded-md inline-block">{`n! / (r! * (n-r)!) = ${n}! / (${r}! * (${n}-${r})!)`}</p>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
