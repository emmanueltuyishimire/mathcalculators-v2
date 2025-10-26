
"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function ExponentCalculator() {
    const { toast } = useToast();
    const [base, setBase] = useState('2');
    const [exponent, setExponent] = useState('10');
    const [result, setResult] = useState('');
    const [useE, setUseE] = useState(false);
    const [steps, setSteps] = useState<string | null>(null);

    const calculate = () => {
        setSteps(null);
        const baseVal = useE ? Math.E.toString() : base;
        
        const filledCount = [baseVal, exponent, result].filter(v => v !== '').length;

        if (filledCount !== 2) {
             if (Object.values({base, exponent, result}).some(v => v !== '')) {
                toast({
                    variant: 'destructive',
                    title: 'Invalid Input',
                    description: 'Please provide exactly two values to solve for the third.',
                });
            }
            return;
        }

        const baseNum = parseFloat(baseVal);
        const expNum = parseFloat(exponent);
        const resNum = parseFloat(result);

        try {
            if (result === '') {
                if (isNaN(baseNum) || isNaN(expNum)) return;
                const newResult = Math.pow(baseNum, expNum);
                setResult(newResult.toString());
                if (Number.isInteger(expNum) && expNum > 0 && expNum <= 10) {
                     setSteps(`${baseNum}^${expNum} = ${Array(expNum).fill(baseNum).join(' × ')} = ${newResult}`);
                } else {
                     setSteps(`${baseNum}^${expNum} = ${newResult}`);
                }
            } else if (baseVal === '' && !useE) {
                if(isNaN(expNum) || isNaN(resNum)) return;
                if (resNum < 0 && expNum % 2 === 0) throw new Error("Cannot take an even root of a negative number.");
                if (resNum === 1 && expNum === 0) throw new Error("1^0 is ambiguous, typically 1. Please provide base and exponent.");
                const newBase = Math.pow(resNum, 1 / expNum);
                setBase(newBase.toString());
                setSteps(`a = ${resNum}^(1/${expNum}) = ${newBase}`);
            } else if (exponent === '') {
                if(isNaN(baseNum) || isNaN(resNum)) return;
                if (baseNum <= 0 || resNum <= 0) throw new Error("Logarithms require positive base and result.");
                const newExponent = Math.log(resNum) / Math.log(baseNum);
                setExponent(newExponent.toString());
                 setSteps(`n = logₐ(y) = log${baseNum.toFixed(2)}(${resNum}) = ${newExponent}`);
            }
        } catch (e: any) {
            toast({
                variant: 'destructive',
                title: 'Calculation Error',
                description: e.message || 'An error occurred during calculation.',
            });
        }
    };
    
    useEffect(() => {
        calculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [useE, base, exponent, result]);
    
    const handleClear = () => {
      setBase('');
      setExponent('');
      setResult('');
      setUseE(false);
      setSteps(null);
    }
    
    const handleUseEChange = (checked: boolean) => {
        setUseE(checked);
        if (checked) {
            setBase(Math.E.toString());
        } else {
            setBase('');
        }
    }

    return (
        <Card className="shadow-lg">
            <CardHeader className="p-4">
                <CardTitle>aⁿ = y</CardTitle>
                <CardDescription>Enter any two values to find the third.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-4">
                <div className="flex items-end gap-2 text-xl font-semibold">
                    <div className="flex-1 space-y-1">
                        <Label htmlFor="base">Base (a)</Label>
                        <Input id="base" type="number" value={useE ? 'e' : base} onChange={e => setBase(e.target.value)} disabled={useE} />
                    </div>
                    <span>^</span>
                    <div className="flex-1 space-y-1">
                        <Label htmlFor="exponent">Exponent (n)</Label>
                        <Input id="exponent" type="number" value={exponent} onChange={e => setExponent(e.target.value)} />
                    </div>
                    <span>=</span>
                    <div className="flex-1 space-y-1">
                        <Label htmlFor="result">Result (y)</Label>
                        <Input id="result" type="number" value={result} onChange={e => setResult(e.target.value)} />
                    </div>
                </div>
                 <div className="flex items-center space-x-2 pt-2">
                    <Switch id="use-e" checked={useE} onCheckedChange={handleUseEChange} aria-label="Use e as base" />
                    <Label htmlFor="use-e">Use e as base</Label>
                </div>
                <div className="flex gap-2 pt-2">
                    <Button onClick={calculate} className="w-full">Calculate</Button>
                    <Button onClick={handleClear} variant="outline" className="w-full">Clear</Button>
                </div>
            </CardContent>
            {steps && (
                <CardFooter className="p-4">
                     <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Show Calculation Steps</AccordionTrigger>
                            <AccordionContent>
                                <div className="p-3 bg-muted rounded-md font-mono text-sm break-words">
                                    {steps}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardFooter>
            )}
        </Card>
    );
}
