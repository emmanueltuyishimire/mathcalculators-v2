
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '../ui/textarea';

// BigInt Math functions
const bigIntSqrt = (n: bigint): bigint => {
    if (n < 0n) throw new Error("Cannot compute square root of a negative number.");
    if (n === 0n) return 0n;
    if (n < 4n) return 1n;
    
    let x0 = n / 2n;
    let x1 = (x0 + n / x0) / 2n;

    while (x1 < x0) {
        x0 = x1;
        x1 = (x0 + n / x0) / 2n;
    }
    return x0;
}

const bigIntGcd = (a: bigint, b: bigint): bigint => {
    a = a > 0n ? a : -a;
    b = b > 0n ? b : -b;
    while(b) {
        [a, b] = [b, a % b];
    }
    return a;
}

const bigIntLcm = (a: bigint, b: bigint): bigint => {
    if (a === 0n || b === 0n) return 0n;
    return (a * b) / bigIntGcd(a, b);
}

const bigIntFactorial = (n: bigint): bigint => {
    if (n < 0n) throw new Error("Factorial is not defined for negative numbers.");
    let result = 1n;
    for (let i = 2n; i <= n; i++) {
        result *= i;
    }
    return result;
}


export default function BigNumberCalculator() {
    const { toast } = useToast();
    const [x, setX] = useState('12345678901234567890');
    const [y, setY] = useState('98765432109876543210');
    const [precision, setPrecision] = useState('20');
    const [result, setResult] = useState('');

    const parseBigInt = (str: string): bigint | null => {
        try {
            str = str.toLowerCase();
            if (str.includes('e')) {
                const parts = str.split('e');
                // Handle cases like 'e18' where the base is missing
                const baseStr = parts[0] || '1';
                const base = parseFloat(baseStr);
                const exp = parseInt(parts[1], 10);
                if (isNaN(base) || isNaN(exp)) return null;
                // Using BigInt constructor with string to avoid precision loss for large numbers
                return BigInt(base) * (10n ** BigInt(exp));
            }
             // For regular numbers, just convert to BigInt
            return BigInt(str);
        } catch {
            return null;
        }
    };

    const calculate = (op: 'add' | 'subtract' | 'multiply' | 'divide' | 'power' | 'sqrt' | 'sq' | 'factorial' | 'mod' | 'gcd' | 'lcm') => {
        const xVal = parseBigInt(x);
        const yVal = op !== 'sqrt' && op !== 'sq' && op !== 'factorial' ? parseBigInt(y) : null;

        if (xVal === null) {
            toast({ variant: 'destructive', title: 'Invalid Input', description: 'Value X is not a valid large integer.' });
            return;
        }
        
        if (['add', 'subtract', 'multiply', 'divide', 'power', 'mod', 'gcd', 'lcm'].includes(op) && yVal === null) {
            toast({ variant: 'destructive', title: 'Invalid Input', description: 'Value Y is not a valid large integer for this operation.' });
            return;
        }

        try {
            let res: bigint;
            switch(op) {
                case 'add': res = xVal + yVal!; break;
                case 'subtract': res = xVal - yVal!; break;
                case 'multiply': res = xVal * yVal!; break;
                case 'divide':
                    if (yVal! === 0n) throw new Error("Division by zero.");
                    res = xVal / yVal!; 
                    break;
                case 'power':
                    if (yVal! < 0n) throw new Error("Exponent must be non-negative.");
                    res = xVal ** yVal!;
                    break;
                case 'sqrt': res = bigIntSqrt(xVal); break;
                case 'sq': res = xVal * xVal; break;
                case 'factorial': 
                    if (xVal > 10000n) {
                         toast({ variant: 'destructive', title: 'Input too large', description: 'Factorial for numbers over 10,000 may be slow.' });
                    }
                    res = bigIntFactorial(xVal); break;
                case 'mod': res = xVal % yVal!; break;
                case 'gcd': res = bigIntGcd(xVal, yVal!); break;

                case 'lcm': res = bigIntLcm(xVal, yVal!); break;
            }
            setResult(res.toString());
        } catch (e: any) {
            toast({ variant: 'destructive', title: 'Calculation Error', description: e.message });
        }
    };

    return (
        <Card className="shadow-lg">
            <CardHeader className="p-4">
                <CardTitle>Big Number Calculator</CardTitle>
                <CardDescription>Performs arithmetic on very large integers.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-4">
                 <div className="space-y-2">
                    <Label htmlFor="x-val">X =</Label>
                    <Input id="x-val" value={x} onChange={e => setX(e.target.value)} placeholder="e.g., 23E18 or a large integer" aria-label="Value X"/>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="y-val">Y =</Label>
                    <Input id="y-val" value={y} onChange={e => setY(e.target.value)} placeholder="e.g., 3.5e19 or a large integer" aria-label="Value Y"/>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    <Button size="sm" onClick={() => calculate('add')}>X + Y</Button>
                    <Button size="sm" onClick={() => calculate('subtract')}>X – Y</Button>
                    <Button size="sm" onClick={() => calculate('multiply')}>X × Y</Button>
                    <Button size="sm" onClick={() => calculate('divide')}>X / Y</Button>
                    <Button size="sm" onClick={() => calculate('power')}>X^Y</Button>
                    <Button size="sm" onClick={() => calculate('sqrt')}>√X</Button>
                    <Button size="sm" onClick={() => calculate('sq')}>X²</Button>
                    <Button size="sm" onClick={() => calculate('factorial')}>X!</Button>
                    <Button size="sm" onClick={() => calculate('mod')}>X MOD Y</Button>
                    <Button size="sm" onClick={() => calculate('gcd')}>GCD</Button>
                    <Button size="sm" onClick={() => calculate('lcm')}>LCM</Button>
                </div>
            </CardContent>
            {result && (
                <CardFooter className="p-4">
                     <div className="w-full space-y-2">
                        <Label>Result</Label>
                        <Textarea readOnly value={result} className="bg-muted font-mono h-24" aria-label="Calculation Result"/>
                    </div>
                </CardFooter>
            )}
        </Card>
    );
}
