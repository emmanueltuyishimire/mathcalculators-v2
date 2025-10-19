
"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

function SquareRootCalculator() {
    const { toast } = useToast();
    const [value, setValue] = useState('25');
    const [result, setResult] = useState('');

    const calculate = () => {
        const num = parseFloat(value);
        if (isNaN(num)) {
            if (value) toast({ variant: 'destructive', title: 'Invalid Input', description: 'Please enter a valid number.' });
            setResult('');
            return;
        }
        if (num < 0) {
            toast({ variant: 'destructive', title: 'Invalid Input', description: 'Square root of a negative number is imaginary.' });
            setResult('i' + Math.sqrt(-num).toFixed(6));
            return;
        }
        setResult(Math.sqrt(num).toFixed(6));
    };

    useEffect(() => {
        calculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Square Root Calculator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-lg">
                    <span className="font-bold text-2xl">√</span>
                    <Input type="number" value={value} onChange={e => setValue(e.target.value)} className="w-full" placeholder="Enter number" />
                </div>
                <Button onClick={calculate} className="w-full">Calculate</Button>
                {result && (
                    <div className="p-2 bg-muted rounded-md text-center font-mono font-bold">{result}</div>
                )}
            </CardContent>
        </Card>
    );
}

function CubeRootCalculator() {
    const { toast } = useToast();
    const [value, setValue] = useState('27');
    const [result, setResult] = useState('');

    const calculate = () => {
        const num = parseFloat(value);
        if (isNaN(num)) {
            if (value) toast({ variant: 'destructive', title: 'Invalid Input', description: 'Please enter a valid number.' });
            setResult('');
            return;
        }
        setResult(Math.cbrt(num).toFixed(6));
    };
    
    useEffect(() => {
        calculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Cube Root Calculator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-lg">
                    <span className="font-bold text-2xl">∛</span>
                    <Input type="number" value={value} onChange={e => setValue(e.target.value)} className="w-full" placeholder="Enter number" />
                </div>
                <Button onClick={calculate} className="w-full">Calculate</Button>
                {result && (
                     <div className="p-2 bg-muted rounded-md text-center font-mono font-bold">{result}</div>
                )}
            </CardContent>
        </Card>
    );
}

function GeneralRootCalculator() {
    const { toast } = useToast();
    const [root, setRoot] = useState('4');
    const [number, setNumber] = useState('16');
    const [result, setResult] = useState('');

    const calculate = () => {
        const n = parseFloat(root);
        const num = parseFloat(number);
        
        if (isNaN(n) || isNaN(num)) {
             if (root || number) toast({ variant: 'destructive', title: 'Invalid Input', description: 'Please enter valid numbers for both root and number.' });
             setResult('');
             return;
        }

        if (n === 0) {
            toast({ variant: 'destructive', title: 'Invalid Input', description: 'The root (n) cannot be zero.' });
            setResult('');
            return;
        }

        if (num < 0 && n % 2 === 0) {
             toast({ variant: 'destructive', title: 'Invalid Input', description: 'Cannot take an even root of a negative number.' });
             setResult('');
             return;
        }

        let calculatedResult;
        if (num < 0) {
            calculatedResult = -Math.pow(-num, 1/n);
        } else {
            calculatedResult = Math.pow(num, 1/n);
        }

        setResult(calculatedResult.toFixed(6));
    };
    
    useEffect(() => {
        calculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [root, number]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>General Root Calculator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="relative flex items-center gap-1 text-lg">
                     <Input type="number" value={root} onChange={e => setRoot(e.target.value)} className="w-12 h-6 text-xs absolute -top-3 left-0" placeholder="n" />
                    <span className="font-bold text-3xl ml-1">√</span>
                    <Input type="number" value={number} onChange={e => setNumber(e.target.value)} className="w-full" placeholder="Enter number" />
                </div>
                 <Button onClick={calculate} className="w-full">Calculate</Button>
                 {result && (
                     <div className="p-2 bg-muted rounded-md text-center font-mono font-bold">{result}</div>
                )}
            </CardContent>
        </Card>
    );
}

export default function RootCalculator() {
    return (
        <div className="space-y-8">
            <SquareRootCalculator />
            <CubeRootCalculator />
            <GeneralRootCalculator />
        </div>
    );
}
