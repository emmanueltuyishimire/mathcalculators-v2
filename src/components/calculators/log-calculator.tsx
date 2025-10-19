"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function LogCalculator() {
    const { toast } = useToast();
    const [base, setBase] = useState('10');
    const [argument, setArgument] = useState('100');
    const [result, setResult] = useState('2');
    const [steps, setSteps] = useState<string | null>(null);

     const handleBaseChange = (value: string) => {
        setBase(value);
        setArgument('');
        setResult('');
        setSteps(null);
    };

    const handleArgumentChange = (value: string) => {
        setArgument(value);
        setBase('');
        setResult('');
        setSteps(null);
    };

    const handleResultChange = (value: string) => {
        setResult(value);
        setBase('');
        setArgument('');
        setSteps(null);
    };

    const calculate = () => {
        setSteps(null);
        
        const baseStr = base.toLowerCase().trim();
        const baseNum = baseStr === 'e' ? Math.E : parseFloat(base);
        const argNum = parseFloat(argument);
        const resNum = parseFloat(result);

        const knownValues = [!isNaN(baseNum), !isNaN(argNum), !isNaN(resNum)].filter(Boolean).length;

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
                if (baseNum <= 0 || baseNum === 1) throw new Error("Base must be positive and not equal to 1.");
                if (argNum <= 0) throw new Error("Argument must be positive for real logarithms.");
                const newResult = Math.log(argNum) / Math.log(baseNum);
                setResult(newResult.toString());
                setSteps(`y = log${baseStr}(${argNum}) = ${newResult.toFixed(10)}`);
            } else if (isNaN(argNum)) {
                const newArgument = Math.pow(baseNum, resNum);
                setArgument(newArgument.toString());
                 setSteps(`x = ${baseStr}^${resNum} = ${newArgument.toFixed(10)}`);
            } else { // isNaN(baseNum) is implied
                if (argNum <= 0 || argNum === 1) throw new Error("Argument must be positive and not equal to 1 for finding the base.");
                if (resNum === 0) throw new Error("Result cannot be zero when solving for the base.");
                const newBase = Math.pow(argNum, 1 / resNum);
                setBase(newBase.toString());
                setSteps(`b = ${argNum}^(1/${resNum}) = ${newBase.toFixed(10)}`);
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
        setArgument('');
        setResult('');
        setSteps(null);
    }

    return (
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle>logₐ(x) = y</CardTitle>
                <CardDescription>Enter any two values to find the third. Base can be 'e'.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="flex flex-wrap items-end gap-2 text-lg font-semibold">
                    <span className="self-center">log</span>
                    <Input
                        id="base"
                        value={base}
                        onChange={(e) => handleBaseChange(e.target.value)}
                        className="w-20 text-center text-sm self-end"
                        placeholder="a"
                        aria-label="Base (a)"
                    />
                    <Input
                        id="argument"
                        type="number"
                        value={argument}
                        onChange={(e) => handleArgumentChange(e.target.value)}
                        className="w-24 text-center"
                        placeholder="x"
                        aria-label="Argument (x)"
                    />
                    <span className="self-center">=</span>
                    <Input
                        id="result"
                        type="number"
                        value={result}
                        onChange={(e) => handleResultChange(e.target.value)}
                        className="w-24 text-center"
                        placeholder="y"
                        aria-label="Result (y)"
                    />
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
