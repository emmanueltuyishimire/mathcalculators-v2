
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

// Helper functions for GCD and LCM using BigInt for large number support
const gcd = (a: bigint, b: bigint): bigint => {
  a = a > 0n ? a : -a; // absolute value
  b = b > 0n ? b : -b; // absolute value
  while (b) {
    [a, b] = [b, a % b];
  }
  return a;
};

const lcm = (a: bigint, b: bigint): bigint => {
    const absA = a > 0n ? a : -a;
    const absB = b > 0n ? b : -b;
    if (absA === 0n || absB === 0n) return 0n;
    return (absA * absB) / gcd(absA, absB);
};

const getPrimeFactorization = (num: bigint): Map<bigint, number> => {
    const factors = new Map<bigint, number>();
    let n_abs = num > 0n ? num : -num;
    if (n_abs < 2n) return factors;
    
    let n = n_abs;
    let divisor = 2n;

    while (n % divisor === 0n) {
        factors.set(divisor, (factors.get(divisor) || 0) + 1);
        n /= divisor;
    }
    
    divisor = 3n;
    while (divisor * divisor <= n) {
        while (n % divisor === 0n) {
            factors.set(divisor, (factors.get(divisor) || 0) + 1);
            n /= divisor;
        }
        divisor += 2n;
    }

    if (n > 1n) {
        factors.set(n, (factors.get(n) || 0) + 1);
    }
    
    return factors;
};

interface LcmResult {
    lcm: string;
    gcd: string;
    steps: {
        allFactors: { num: bigint, factors: Map<bigint, number> }[];
        calculation: string;
        lcmCalculationFactors: string;
    };
}

export default function LcmCalculator() {
    const { toast } = useToast();
    const [input, setInput] = useState('12, 18, 30');
    const [result, setResult] = useState<LcmResult | null>(null);

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
                    return BigInt(s);
                } catch {
                    return NaN;
                }
            });

        if (numbers.some(n => typeof n === 'number')) { // Checks for NaN
             toast({
                variant: 'destructive',
                title: 'Invalid Input',
                description: 'Please ensure all inputs are valid integers.',
            });
            setResult(null);
            return;
        }
        
        const bigIntNumbers = numbers as bigint[];

        if (bigIntNumbers.length < 2) {
             if(input.trim()) {
                toast({
                    variant: 'destructive',
                    title: 'Invalid Input',
                    description: 'Please provide at least two numbers separated by commas.',
                });
            }
            setResult(null);
            return;
        }
        
        try {
            // --- Calculation for result ---
            const finalLcm = bigIntNumbers.reduce((acc, val) => lcm(acc, val));
            const finalGcd = bigIntNumbers.reduce((acc, val) => gcd(acc, val));
            
            // --- Calculation for steps ---
            const allFactors = bigIntNumbers.map(num => ({
                num,
                factors: getPrimeFactorization(num),
            }));

            const maxExponents = new Map<bigint, number>();
            allFactors.forEach(({ factors }) => {
                factors.forEach((exponent, prime) => {
                    if (!maxExponents.has(prime) || exponent > (maxExponents.get(prime) || 0)) {
                        maxExponents.set(prime, exponent);
                    }
                });
            });

            const lcmCalculationFactorsArray: bigint[] = [];
            maxExponents.forEach((exponent, prime) => {
                for(let i=0; i<exponent; i++) {
                    lcmCalculationFactorsArray.push(prime);
                }
            });
            lcmCalculationFactorsArray.sort((a,b) => a < b ? -1 : 1);


            setResult({
                lcm: finalLcm.toString(),
                gcd: finalGcd.toString(),
                steps: { 
                    allFactors, 
                    lcmCalculationFactors: lcmCalculationFactorsArray.length > 0 ? lcmCalculationFactorsArray.join(' × ') : '1',
                    calculation: `LCM(${bigIntNumbers.join(', ')})`
                }
            });
        } catch (e: any) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'An unexpected error occurred.',
            });
             setResult(null);
        }
    };
    
    useEffect(() => {
        calculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [input]);

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
            <CardHeader className="p-4">
                <CardTitle>LCM & GCD Calculator</CardTitle>
                <CardDescription>Enter numbers separated by commas to find their LCM and GCD.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-4">
                <div className="space-y-2">
                    <Label htmlFor="numbers-input">Numbers</Label>
                    <Input
                        id="numbers-input"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="e.g., 12, 18, 30"
                        className="font-mono"
                    />
                </div>
                <Button onClick={calculate} className="w-full">Calculate</Button>
            </CardContent>
            {result && (
                <CardFooter className="flex-col items-start gap-3 p-4">
                     <div className="w-full p-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-md">
                        <p className="font-bold">LCM({input}) = <span className="text-primary font-mono">{result.lcm}</span></p>
                        <p className="font-bold mt-1">GCD({input}) = <span className="text-primary font-mono">{result.gcd}</span></p>
                    </div>
                     <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Show Calculation Steps</AccordionTrigger>
                            <AccordionContent>
                                <div className="p-3 bg-muted rounded-md font-mono text-xs break-words space-y-2">
                                    <div>
                                        <p className="font-semibold mb-2">Prime factorization of the numbers:</p>
                                        {result.steps.allFactors.map(({num, factors}, index) => (
                                            <p key={`${String(num)}-${index}`}>{String(num)} = {formatFactors(factors)}</p>
                                        ))}
                                    </div>
                                    <div>
                                        <p className="font-semibold mb-2">{result.steps.calculation}</p>
                                        <p>= {result.steps.lcmCalculationFactors}</p>
                                        <p>= {result.lcm}</p>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardFooter>
            )}
        </Card>
    );
}
