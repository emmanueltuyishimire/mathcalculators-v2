
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

// Helper functions for GCD and Prime Factorization using BigInt
const gcd = (a: bigint, b: bigint): bigint => {
  a = a > 0n ? a : -a;
  b = b > 0n ? b : -b;
  while (b) {
    [a, b] = [b, a % b];
  }
  return a;
};

const getPrimeFactorization = (num: bigint): Map<bigint, number> => {
    const factors = new Map<bigint, number>();
    if (num < 2n) {
        if (num > 0) factors.set(num, 1);
        return factors;
    }
    
    let n = num;
    while (n % 2n === 0n) {
        factors.set(2n, (factors.get(2n) || 0) + 1);
        n /= 2n;
    }
    
    for (let i = 3n; i * i <= n; i += 2n) {
        while (n % i === 0n) {
            factors.set(i, (factors.get(i) || 0) + 1);
            n /= i;
        }
    }

    if (n > 2n) {
        factors.set(n, (factors.get(n) || 0) + 1);
    }
    
    return factors;
};

interface GcfResult {
    gcf: string;
    steps: { num: bigint, factors: Map<bigint, number> }[];
}

export default function GcfCalculator() {
    const { toast } = useToast();
    const [input, setInput] = useState('330, 75, 450, 225');
    const [result, setResult] = useState<GcfResult | null>(null);

    const calculate = () => {
        if (!input) {
            setResult(null);
            return;
        }

        const numbers = input
            .split(',')
            .map(s => s.trim())
            .filter(Boolean)
            .map(s => {
                try {
                    const num = BigInt(s);
                    return num >= 0n ? num : -num; // Use absolute values
                } catch {
                    return NaN;
                }
            });

        if (numbers.some(n => typeof n === 'number' && isNaN(n))) {
             toast({
                variant: 'destructive',
                title: 'Invalid Input',
                description: 'Please ensure all inputs are valid non-zero integers.',
            });
            setResult(null);
            return;
        }
        
        const bigIntNumbers = numbers.filter(n => typeof n === 'bigint') as bigint[];

        if (bigIntNumbers.length < 2) {
            toast({
                variant: 'destructive',
                title: 'Invalid Input',
                description: 'Please provide at least two numbers separated by commas.',
            });
            setResult(null);
            return;
        }
        
        try {
            const finalGcf = bigIntNumbers.reduce((acc, val) => gcd(acc, val));
            
            const primeFactors = bigIntNumbers.map(num => ({
                num,
                factors: getPrimeFactorization(num),
            }));

            setResult({
                gcf: finalGcf.toString(),
                steps: primeFactors
            });
        } catch (e: any) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'An unexpected error occurred during calculation.',
            });
             setResult(null);
        }
    };
    
    useEffect(() => {
        calculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const formatFactors = (factors: Map<bigint, number>) => {
        if (factors.size === 0) return '1';
        const expandedFactors: bigint[] = [];
         factors.forEach((exponent, prime) => {
            for(let i=0; i < exponent; i++) {
                expandedFactors.push(prime);
            }
        });
        expandedFactors.sort((a,b) => a < b ? -1 : 1);
        return expandedFactors.join(' × ');
    };

    return (
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle>GCF Calculator</CardTitle>
                <CardDescription>Enter numbers to find their Greatest Common Factor.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="numbers-input">Numbers</Label>
                    <Input
                        id="numbers-input"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="e.g., 330, 75, 450, 225"
                        className="font-mono"
                    />
                </div>
                <Button onClick={calculate} className="w-full">Calculate GCF</Button>
            </CardContent>
            {result && (
                <CardFooter className="flex-col items-start gap-4">
                     <div className="w-full p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-md">
                        <p className="font-bold">GCF({input}) = <span className="text-primary font-mono">{result.gcf}</span></p>
                    </div>
                     <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Show Prime Factorization Steps</AccordionTrigger>
                            <AccordionContent>
                                <div className="p-4 bg-muted rounded-md font-mono text-sm break-words space-y-2">
                                    <p className="font-semibold mb-2">Prime factorization of each number:</p>
                                    {result.steps.map(({num, factors}, index) => (
                                        <p key={`${String(num)}-${index}`}>{String(num)} = {formatFactors(factors)}</p>
                                    ))}
                                    <p className="font-semibold mt-2">The common factors are multiplied to get the GCF.</p>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardFooter>
            )}
        </Card>
    );
}
