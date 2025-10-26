
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const LogEquationCalculator = () => {
    const { toast } = useToast();
    const [base, setBase] = useState('2');
    const [number, setNumber] = useState('8');
    const [result, setResult] = useState('');
    
    const calculate = () => {
        const baseValStr = base.toLowerCase() === 'e' ? Math.E.toString() : base;

        const filledFields = [baseValStr, number, result].filter(v => v !== '');
        
        if (filledFields.length !== 2) {
            toast({
                variant: 'destructive',
                title: 'Invalid Input',
                description: 'Please provide exactly two values to solve for the third.',
            });
            return;
        }

        const baseVal = parseFloat(baseValStr);
        const numberVal = parseFloat(number);
        const resultVal = parseFloat(result);

        try {
            if (result === '') { // Calculate result (y)
                if(isNaN(baseVal) || isNaN(numberVal)) throw new Error("Base and Number must be valid numbers.");
                if(baseVal <= 0 || baseVal === 1 || numberVal <= 0) throw new Error("Logarithm requires base > 0 (and not 1) and number > 0.");
                setResult((Math.log(numberVal) / Math.log(baseVal)).toString());
            } else if (number === '') { // Calculate number (x)
                if(isNaN(baseVal) || isNaN(resultVal)) throw new Error("Base and Result must be valid numbers.");
                setNumber(Math.pow(baseVal, resultVal).toString());
            } else { // Calculate base (b)
                if(isNaN(numberVal) || isNaN(resultVal)) throw new Error("Number and Result must be valid numbers.");
                if(numberVal < 0 && resultVal % 2 === 0) throw new Error("Cannot take an even root of a negative number.");
                if(numberVal === 1 && resultVal !== 0) throw new Error("If number is 1, result must be 0.");
                if(numberVal !== 1 && resultVal === 0) throw new Error("If result is 0, number must be 1.");
                setBase(Math.pow(numberVal, 1 / resultVal).toString());
            }
        } catch (e: any) {
            toast({
                variant: 'destructive',
                title: 'Calculation Error',
                description: e.message,
            });
        }
    };

    const handleClear = () => {
        setBase('');
        setNumber('');
        setResult('');
    }
    
    return (
        <Card>
            <CardHeader className="p-4">
                <CardTitle>Logarithm Equation Solver</CardTitle>
                <CardDescription>Solves for any variable in the equation log<sub>b</sub>(x) = y. Provide any two values.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-4">
                <div className="flex flex-wrap items-end gap-2 text-lg font-semibold">
                    <span className="mb-2">log</span>
                    <div className="relative">
                        <Input id="base" value={base} onChange={(e) => setBase(e.target.value)} className="w-20 text-sm text-center pt-5"/>
                        <Label htmlFor="base" className="absolute text-xs left-1/2 -translate-x-1/2 top-1 text-muted-foreground">base (b)</Label>
                    </div>
                     <div className="relative">
                        <Input id="number" value={number} onChange={(e) => setNumber(e.target.value)} className="w-24 text-center"/>
                        <Label htmlFor="number" className="absolute text-xs left-1/2 -translate-x-1/2 -top-4 text-muted-foreground">number (x)</Label>
                    </div>
                    <span>=</span>
                     <div className="relative">
                        <Input id="result" value={result} onChange={(e) => setResult(e.target.value)} className="w-24 text-center"/>
                        <Label htmlFor="result" className="absolute text-xs left-1/2 -translate-x-1/2 -top-4 text-muted-foreground">result (y)</Label>
                    </div>
                </div>
                 <div className="flex gap-2">
                    <Button onClick={calculate} className="w-full">Calculate</Button>
                    <Button onClick={handleClear} variant="outline" className="w-full">Clear</Button>
                </div>
            </CardContent>
        </Card>
    )
}


export default function LogCalculator() {
    return (
        <div className="py-4">
            <LogEquationCalculator />
        </div>
    );
}
