
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { PythagoreanDiagram } from '../pythagorean-diagram';

export default function PythagoreanCalculator() {
    const { toast } = useToast();
    const [a, setA] = useState('3');
    const [b, setB] = useState('4');
    const [c, setC] = useState('');
    const [calculationSteps, setCalculationSteps] = useState('');

    const calculate = () => {
        const valA = a ? parseFloat(a) : NaN;
        const valB = b ? parseFloat(b) : NaN;
        const valC = c ? parseFloat(c) : NaN;

        const providedValues = [!isNaN(valA), !isNaN(valB), !isNaN(valC)].filter(Boolean).length;

        if (providedValues !== 2) {
            toast({
                variant: 'destructive',
                title: 'Invalid Input',
                description: 'Please provide exactly two values to calculate the third.',
            });
            setCalculationSteps('');
            return;
        }

        let steps = '';
        try {
            if (!isNaN(valA) && !isNaN(valB)) {
                // Calculate c
                if (valA <= 0 || valB <= 0) throw new Error("Sides 'a' and 'b' must be positive.");
                const cSquared = valA**2 + valB**2;
                const resultC = Math.sqrt(cSquared);
                setC(resultC.toFixed(4));
                steps = `c = √(a² + b²) = √(${valA}² + ${valB}²) = √(${valA**2} + ${valB**2}) = √${cSquared.toFixed(4)} = ${resultC.toFixed(4)}`;
            } else if (!isNaN(valA) && !isNaN(valC)) {
                // Calculate b
                if (valA <= 0 || valC <= 0) throw new Error("Sides 'a' and 'c' must be positive.");
                if (valC <= valA) throw new Error("Side 'c' (hypotenuse) must be greater than side 'a'.");
                const bSquared = valC**2 - valA**2;
                const resultB = Math.sqrt(bSquared);
                setB(resultB.toFixed(4));
                 steps = `b = √(c² - a²) = √(${valC}² - ${valA}²) = √(${valC**2} - ${valA**2}) = √${bSquared.toFixed(4)} = ${resultB.toFixed(4)}`;
            } else if (!isNaN(valB) && !isNaN(valC)) {
                // Calculate a
                if (valB <= 0 || valC <= 0) throw new Error("Sides 'b' and 'c' must be positive.");
                if (valC <= valB) throw new Error("Side 'c' (hypotenuse) must be greater than side 'b'.");
                const aSquared = valC**2 - valB**2;
                const resultA = Math.sqrt(aSquared);
                setA(resultA.toFixed(4));
                 steps = `a = √(c² - b²) = √(${valC}² - ${valB}²) = √(${valC**2} - ${valB**2}) = √${aSquared.toFixed(4)} = ${resultA.toFixed(4)}`;
            }
             setCalculationSteps(steps);
        } catch(e: any) {
            toast({
                variant: 'destructive',
                title: 'Calculation Error',
                description: e.message
            });
            setCalculationSteps('');
        }
    };
    
    const handleClear = () => {
      setA('');
      setB('');
      setC('');
      setCalculationSteps('');
    }

    return (
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle>Solve the Triangle</CardTitle>
                <CardDescription>Enter any two sides to find the third.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <Label htmlFor="side-a" className="w-12">a =</Label>
                            <Input id="side-a" type="number" value={a} onChange={e => setA(e.target.value)} placeholder="Side a" />
                        </div>
                        <div className="flex items-center gap-4">
                            <Label htmlFor="side-b" className="w-12">b =</Label>
                            <Input id="side-b" type="number" value={b} onChange={e => setB(e.target.value)} placeholder="Side b" />
                        </div>
                        <div className="flex items-center gap-4">
                            <Label htmlFor="side-c" className="w-12">c =</Label>
                            <Input id="side-c" type="number" value={c} onChange={e => setC(e.target.value)} placeholder="Hypotenuse c" />
                        </div>
                         <div className="flex gap-2">
                             <Button onClick={calculate} className="flex-1">Calculate</Button>
                             <Button onClick={handleClear} variant="outline" className="flex-1">Clear</Button>
                         </div>
                    </div>
                     <div className="flex justify-center">
                        <PythagoreanDiagram a={a} b={b} c={c} />
                    </div>
                </div>
            </CardContent>
            {calculationSteps && (
                <CardFooter>
                    <div className="w-full p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-md">
                        <h4 className="font-semibold mb-2">Calculation Steps</h4>
                        <p className="font-mono text-sm break-words">{calculationSteps}</p>
                    </div>
                </CardFooter>
            )}
        </Card>
    );
}
