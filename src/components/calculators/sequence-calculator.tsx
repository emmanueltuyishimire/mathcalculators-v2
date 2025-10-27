
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

function ArithmeticCalculator() {
    const [a1, setA1] = useState('2');
    const [d, setD] = useState('5');
    const [n, setN] = useState('20');
    const [result, setResult] = useState<{ an: number; sum: number } | null>(null);
    const { toast } = useToast();

    const handleCalculate = () => {
        const firstTerm = parseFloat(a1);
        const diff = parseFloat(d);
        const termN = parseInt(n, 10);

        if (isNaN(firstTerm) || isNaN(diff) || isNaN(termN)) {
            if(a1 || d || n) toast({ variant: 'destructive', title: 'Invalid Input', description: 'Please enter valid numbers for all fields.' });
            setResult(null);
            return;
        }
        
        if (!Number.isInteger(termN) || termN < 1) {
            toast({ variant: 'destructive', title: 'Invalid Input', description: '"The nth number" must be a positive integer.' });
            setResult(null);
            return;
        }

        const an = firstTerm + diff * (termN - 1);
        const sum = termN * (firstTerm + an) / 2;
        setResult({ an, sum });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Arithmetic Sequence Calculator</CardTitle>
                <CardDescription>
                    <b>Definition:</b> <code>aₙ = a₁ + f × (n - 1)</code><br/>
                    <b>Example:</b> 1, 3, 5, 7, 9, 11, 13, ...
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="a1">The first number (a₁)</Label>
                    <Input id="a1" type="number" value={a1} onChange={e => setA1(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="d">Common difference (f)</Label>
                    <Input id="d" type="number" value={d} onChange={e => setD(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="n_arith">The nth number to obtain (n)</Label>
                    <Input id="n_arith" type="number" value={n} onChange={e => setN(e.target.value)} />
                </div>
                <Button onClick={handleCalculate}>Calculate</Button>
                {result && (
                    <div className="!mt-4 p-4 border-l-4 border-primary bg-muted rounded-r-lg">
                        <p><b>nth term (aₙ):</b> {result.an}</p>
                        <p><b>Sum of first {n} terms (Sₙ):</b> {result.sum}</p>
                        <p className="text-sm text-muted-foreground mt-2"><b>Formula used:</b> aₙ = a₁ + f × (n - 1)</p>
                    </div>
                )}
            </CardContent>
             <CardFooter className="flex-col items-start text-sm text-muted-foreground">
                <h3 className="font-semibold text-base text-foreground mb-2">About Arithmetic Sequences</h3>
                <p>An <b>arithmetic sequence</b> is a list of numbers where the difference between consecutive terms remains constant. This difference is called the <b>common difference (f)</b>.</p>
                <p>To find the <b>sum</b> of an arithmetic sequence: <code>Sₙ = n × (a₁ + aₙ) / 2</code></p>
                <p><b>Example:</b> 1, 3, 5, 7, 9 → sum = (5 × (1 + 9)) / 2 = 25</p>
            </CardFooter>
        </Card>
    );
}

function GeometricCalculator() {
    const [g1, setG1] = useState('2');
    const [r, setR] = useState('5');
    const [n, setN] = useState('12');
    const [result, setResult] = useState<{ an: number; sum: string | number } | null>(null);
    const { toast } = useToast();

    const handleCalculate = () => {
        const firstTerm = parseFloat(g1);
        const ratio = parseFloat(r);
        const termN = parseInt(n, 10);
        
        if (isNaN(firstTerm) || isNaN(ratio) || isNaN(termN)) {
            if(g1 || r || n) toast({ variant: 'destructive', title: 'Invalid Input', description: 'Please enter valid numbers for all fields.' });
            setResult(null);
            return;
        }

        if (!Number.isInteger(termN) || termN < 1) {
            toast({ variant: 'destructive', title: 'Invalid Input', description: '"The nth number" must be a positive integer.' });
            setResult(null);
            return;
        }

        const an = firstTerm * Math.pow(ratio, termN - 1);
        let sum;
        if (ratio === 1) {
            sum = firstTerm * termN;
        } else {
            sum = firstTerm * (1 - Math.pow(ratio, termN)) / (1 - ratio);
        }
        setResult({ an, sum });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Geometric Sequence Calculator</CardTitle>
                <CardDescription>
                    <b>Definition:</b> <code>aₙ = a × rⁿ⁻¹</code><br/>
                    <b>Example:</b> 1, 2, 4, 8, 16, 32, 64, 128, ...
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="g1">The first number (a)</Label>
                    <Input id="g1" type="number" value={g1} onChange={e => setG1(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="r">Common ratio (r)</Label>
                    <Input id="r" type="number" value={r} onChange={e => setR(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="n_geo">The nth number to obtain (n)</Label>
                    <Input id="n_geo" type="number" value={n} onChange={e => setN(e.target.value)} />
                </div>
                <Button onClick={handleCalculate}>Calculate</Button>
                {result && (
                    <div className="!mt-4 p-4 border-l-4 border-primary bg-muted rounded-r-lg">
                        <p><b>nth term (aₙ):</b> {result.an}</p>
                        <p><b>Sum of first {n} terms (Sₙ):</b> {typeof result.sum === 'number' ? result.sum.toExponential(4) : result.sum}</p>
                        <p className="text-sm text-muted-foreground mt-2"><b>Formula used:</b> aₙ = a × rⁿ⁻¹</p>
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex-col items-start text-sm text-muted-foreground">
                <h3 className="font-semibold text-base text-foreground mb-2">About Geometric Sequences</h3>
                <p>A <b>geometric sequence</b> is a sequence in which each term after the first is obtained by multiplying the previous term by a constant ratio <b>(r)</b>.</p>
                <p>To find the <b>sum</b> of the first n terms (when r ≠ 1): <code>Sₙ = a × (1 - rⁿ) / (1 - r)</code></p>
                <p><b>Example:</b> 1, 2, 4 → sum = (1 × (1 - 2³)) / (1 - 2) = 7</p>
            </CardFooter>
        </Card>
    );
}

function FibonacciCalculator() {
    const [n, setN] = useState('10');
    const [result, setResult] = useState<{ fibN: bigint, sequence: string } | null>(null);
    const { toast } = useToast();
    
    const handleCalculate = () => {
        const termN = parseInt(n, 10);
        if (isNaN(termN) || termN < 0) {
            if(n) toast({ variant: 'destructive', title: 'Invalid Input', description: 'Please enter a non-negative integer.'});
            setResult(null);
            return;
        }

        if (termN > 1476) {
            toast({ variant: 'destructive', title: 'Input too large', description: 'Fibonacci numbers beyond the 1476th term exceed JavaScript\'s standard number limits. The result is shown as BigInt.' });
        }
        
        let fib: bigint[] = [0n, 1n];
        if (termN < 2) {
            setResult({
                fibN: fib[termN],
                sequence: fib.slice(0, termN + 1).join(', ')
            });
            return;
        }

        for (let i = 2; i <= termN; i++) {
            fib[i] = fib[i - 1] + fib[i - 2];
        }

        setResult({
            fibN: fib[termN],
            sequence: fib.slice(0, Math.min(termN + 1, 50)).join(', ') + (termN >= 50 ? '...' : '')
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Fibonacci Sequence Calculator</CardTitle>
                <CardDescription>
                    <b>Definition:</b> <code>a₀ = 0, a₁ = 1, aₙ = aₙ₋₁ + aₙ₋₂</code><br/>
                    <b>Example:</b> 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, ...
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="n_fib">The nth number to obtain</Label>
                    <Input id="n_fib" type="number" value={n} onChange={e => setN(e.target.value)} />
                </div>
                <Button onClick={handleCalculate}>Calculate</Button>
                {result && (
                    <div className="!mt-4 p-4 border-l-4 border-primary bg-muted rounded-r-lg space-y-2">
                        <p><b>{n}th Fibonacci number:</b> <span className="font-mono">{result.fibN.toString()}</span></p>
                        <p className="text-sm"><b>Sequence (up to 50 terms):</b> {result.sequence}</p>
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex-col items-start text-sm text-muted-foreground">
                <h3 className="font-semibold text-base text-foreground mb-2">About Fibonacci Sequences</h3>
                <p>The <b>Fibonacci sequence</b> is one in which each number is the sum of the two preceding numbers. It starts with <code>0</code> and <code>1</code>.</p>
                <p>Fibonacci numbers appear in nature, art, architecture, and computer algorithms. They form the basis of the famous <b>Golden Ratio</b>.</p>
            </CardFooter>
        </Card>
    );
}


export default function SequenceCalculators() {
  return (
    <div className="space-y-8">
        <ArithmeticCalculator />
        <GeometricCalculator />
        <FibonacciCalculator />
    </div>
  );
}
