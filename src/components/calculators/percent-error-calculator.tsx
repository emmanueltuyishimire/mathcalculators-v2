
"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface Result {
    signedError: number;
    absoluteError: number;
}

interface Steps {
    observed: string;
    trueVal: string;
    difference: string;
    division: string;
    finalSigned: string;
    finalAbsolute: string;
}

export default function PercentErrorCalculator() {
    const { toast } = useToast();
    const [observed, setObserved] = useState('10.5');
    const [trueVal, setTrueVal] = useState('10');
    const [result, setResult] = useState<Result | null>(null);
    const [steps, setSteps] = useState<Steps | null>(null);

    const calculate = () => {
        const obsNum = parseFloat(observed);
        const trueNum = parseFloat(trueVal);

        if (isNaN(obsNum) || isNaN(trueNum)) {
            if (observed || trueVal) {
                toast({
                    variant: 'destructive',
                    title: 'Invalid Input',
                    description: 'Please enter valid numbers for both values.',
                });
            }
            setResult(null);
            setSteps(null);
            return;
        }

        if (trueNum === 0) {
            toast({
                variant: 'destructive',
                title: 'Invalid Input',
                description: 'True Value cannot be zero as it would cause division by zero.',
            });
            setResult(null);
            setSteps(null);
            return;
        }

        const difference = obsNum - trueNum;
        const signedError = (difference / trueNum) * 100;
        const absoluteError = (Math.abs(difference) / Math.abs(trueNum)) * 100;
        
        setResult({ signedError, absoluteError });
        setSteps({
            observed: obsNum.toString(),
            trueVal: trueNum.toString(),
            difference: difference.toString(),
            division: (difference / trueNum).toFixed(10),
            finalSigned: signedError.toFixed(10),
            finalAbsolute: absoluteError.toFixed(10),
        });
    };
    
    return (
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle>Calculate Percent Error</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="observed-value">Observed Value</Label>
                        <Input
                            id="observed-value"
                            type="number"
                            value={observed}
                            onChange={(e) => setObserved(e.target.value)}
                            placeholder="Experimental value"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="true-value">True Value</Label>
                        <Input
                            id="true-value"
                            type="number"
                            value={trueVal}
                            onChange={(e) => setTrueVal(e.target.value)}
                            placeholder="Accepted value"
                        />
                    </div>
                </div>
                <Button onClick={calculate} className="w-full">Calculate</Button>
            </CardContent>
            {result !== null && (
                <CardFooter className="flex-col items-start gap-4">
                    <div className="w-full p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-md">
                        <h3 className="font-bold text-lg mb-2">Results</h3>
                        <p><b>Percent Error:</b> <span className="font-mono text-primary">{result.signedError.toFixed(4)}%</span></p>
                        <p><b>Absolute Percent Error:</b> <span className="font-mono text-primary">{result.absoluteError.toFixed(4)}%</span></p>
                    </div>
                    {steps && (
                         <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>Show Calculation Steps</AccordionTrigger>
                                <AccordionContent>
                                    <div className="p-4 bg-muted rounded-md font-mono text-sm break-words space-y-2">
                                        <p>Percent Error = ((Vobserved - Vtrue) / Vtrue) × 100%</p>
                                        <p>= (({steps.observed}) - ({steps.trueVal})) / {steps.trueVal}</p>
                                        <p>= {steps.difference} / {steps.trueVal}</p>
                                        <p>= {steps.division} × 100%</p>
                                        <p>= {steps.finalSigned}% (signed error)</p>
                                        <p>= {steps.finalAbsolute}% (absolute error)</p>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    )}
                </CardFooter>
            )}
        </Card>
    );
}
