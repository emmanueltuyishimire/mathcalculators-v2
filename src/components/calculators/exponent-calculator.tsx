
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function ExponentCalculator() {
    const { toast } = useToast();
    const [base, setBase] = useState('');
    const [exponent, setExponent] = useState('');
    const [result, setResult] = useState('');
    const [useE, setUseE] = useState(false);
    const [steps, setSteps] = useState<string | null>(null);

    const calculate = () => {
        setSteps(null);
        const baseNum = useE ? Math.E : parseFloat(base);
        const expNum = parseFloat(exponent);
        const resNum = parseFloat(result);

        const knownValues = [!isNaN(baseNum) && !useE, !isNaN(expNum), !isNaN(resNum)].filter(Boolean).length + (useE ? 1 : 0);

        if (knownValues !== 2) {
            toast({
                variant: 'destructive',
                title: 'Invalid Input',
                description: 'Please provide exactly two values to solve for the third.',
            });
            return;
        }

        try {
            if (isNaN(resNum)) {
                const newResult = Math.pow(baseNum, expNum);
                setResult(newResult.toString());
                if (Number.isInteger(expNum) && expNum > 0 && expNum <= 10) {
                     setSteps(`${baseNum}^${expNum} = ${Array(expNum).fill(baseNum).join(' × ')} = ${newResult}`);
                } else {
                     setSteps(`${baseNum}^${expNum} = ${newResult}`);
                }
            } else if (isNaN(baseNum) && !useE) {
                if (resNum < 0 && expNum % 2 === 0) throw new Error("Cannot take an even root of a negative number.");
                const newBase = Math.pow(resNum, 1 / expNum);
                setBase(newBase.toString());
                setSteps(`a = ${resNum}^(1/${expNum}) = ${newBase}`);
            } else if (isNaN(expNum)) {
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
            <CardHeader>
                <CardTitle>aⁿ = y</CardTitle>
                <CardDescription>Enter any two values to find the third.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-end gap-2 text-2xl font-semibold">
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
                    <Switch id="use-e" checked={useE} onCheckedChange={handleUseEChange} />
                    <Label htmlFor="use-e">Use e as base</Label>
                </div>
                <div className="flex gap-2 pt-2">
                    <Button onClick={calculate} className="w-full">Calculate</Button>
                    <Button onClick={handleClear} variant="outline" className="w-full">Clear</Button>
                </div>
            </CardContent>
            {steps && (
                <CardFooter>
                     <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Show Calculation Steps</AccordionTrigger>
                            <AccordionContent>
                                <div className="p-4 bg-muted rounded-md font-mono text-sm break-words">
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
