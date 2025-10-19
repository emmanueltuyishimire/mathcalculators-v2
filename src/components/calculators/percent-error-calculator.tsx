
"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function PercentErrorCalculator() {
    const { toast } = useToast();
    const [observed, setObserved] = useState('10');
    const [trueVal, setTrueVal] = useState('11');
    const [result, setResult] = useState<string | null>(null);

    const calculate = () => {
        const obsNum = parseFloat(observed);
        const trueNum = parseFloat(trueVal);

        if (isNaN(obsNum) || isNaN(trueNum)) {
            toast({
                variant: 'destructive',
                title: 'Invalid Input',
                description: 'Please enter valid numbers for both values.',
            });
            setResult(null);
            return;
        }

        if (trueNum === 0) {
            toast({
                variant: 'destructive',
                title: 'Invalid Input',
                description: 'True Value cannot be zero.',
            });
            setResult(null);
            return;
        }

        const percentError = (Math.abs(obsNum - trueNum) / Math.abs(trueNum)) * 100;
        setResult(percentError.toFixed(4));
    };
    
    // Auto-calculate on mount
    useEffect(() => {
        calculate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                <CardFooter>
                    <div className="w-full p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-md">
                        <h3 className="font-bold text-lg">Percent Error: <span className="text-primary">{result}%</span></h3>
                    </div>
                </CardFooter>
            )}
        </Card>
    );
}
