
"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface CalculationResult {
    a: number;
    b: number;
    c: number;
    angleA: { deg: number; dms: string; rad: number; };
    angleB: { deg: number; dms: string; rad: number; };
    area: number;
    perimeter: number;
    h: number;
    steps: string;
}

export default function PythagoreanCalculator() {
    const { toast } = useToast();
    const [a, setA] = useState('3');
    const [b, setB] = useState('4');
    const [c, setC] = useState('');
    const [result, setResult] = useState<CalculationResult | null>(null);

    const degToDMS = (deg: number) => {
        let d = Math.floor(deg);
        let min = Math.floor((deg - d) * 60);
        let sec = Math.round(((deg - d) * 60 - min) * 60);
        if (sec === 60) {
            min++;
            sec = 0;
        }
        if (min === 60) {
            d++;
            min = 0;
        }
        return `${d}°${min}'${sec}"`;
    };

    const calculate = () => {
        let valA = a ? parseFloat(a) : NaN;
        let valB = b ? parseFloat(b) : NaN;
        let valC = c ? parseFloat(c) : NaN;

        const providedValues = [!isNaN(valA), !isNaN(valB), !isNaN(valC)].filter(Boolean).length;

        if (providedValues !== 2) {
            if (a || b || c) {
                toast({
                    variant: 'destructive',
                    title: 'Invalid Input',
                    description: 'Please provide exactly two values to calculate the third.',
                });
            }
            setResult(null);
            return;
        }

        let steps = '';
        try {
            if (isNaN(valC)) { // Calculate c
                if (valA <= 0 || valB <= 0) throw new Error("Sides 'a' and 'b' must be positive.");
                const cSquared = valA**2 + valB**2;
                valC = Math.sqrt(cSquared);
                setC(valC.toFixed(4));
                steps = `c = √(a² + b²) = √(${valA}² + ${valB}²) = √(${valA**2} + ${valB**2}) = √${cSquared.toFixed(4)} = ${valC.toFixed(4)}`;
            } else if (isNaN(valA)) { // Calculate a
                if (valB <= 0 || valC <= 0) throw new Error("Sides 'b' and 'c' must be positive.");
                if (valC <= valB) throw new Error("Side 'c' (hypotenuse) must be greater than side 'b'.");
                const aSquared = valC**2 - valB**2;
                valA = Math.sqrt(aSquared);
                setA(valA.toFixed(4));
                steps = `a = √(c² - b²) = √(${valC}² - ${valB}²) = √(${valC**2} - ${valB**2}) = √${aSquared.toFixed(4)} = ${valA.toFixed(4)}`;
            } else { // Calculate b
                if (valA <= 0 || valC <= 0) throw new Error("Sides 'a' and 'c' must be positive.");
                if (valC <= valA) throw new Error("Side 'c' (hypotenuse) must be greater than side 'a'.");
                const bSquared = valC**2 - valA**2;
                valB = Math.sqrt(bSquared);
                setB(valB.toFixed(4));
                steps = `b = √(c² - a²) = √(${valC}² - ${valA}²) = √(${valC**2} - ${valA**2}) = √${bSquared.toFixed(4)} = ${valB.toFixed(4)}`;
            }

            const area = (valA * valB) / 2;
            const perimeter = valA + valB + valC;
            const h = (valA * valB) / valC;
            
            const angleARad = Math.asin(valA / valC);
            const angleADeg = angleARad * (180 / Math.PI);
            
            const angleBRad = Math.asin(valB / valC);
            const angleBDeg = angleBRad * (180 / Math.PI);

            setResult({
                a: valA, b: valB, c: valC,
                angleA: { deg: angleADeg, dms: degToDMS(angleADeg), rad: angleARad },
                angleB: { deg: angleBDeg, dms: degToDMS(angleBDeg), rad: angleBRad },
                area, perimeter, h, steps
            });

        } catch(e: any) {
            toast({
                variant: 'destructive',
                title: 'Calculation Error',
                description: e.message
            });
            setResult(null);
        }
    };
    
    useEffect(() => {
        calculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [a, b, c]);
    
    const handleClear = () => {
      setA('');
      setB('');
      setC('');
      setResult(null);
    }

    return (
        <Card className="shadow-lg">
            <CardHeader className="p-4">
                <CardTitle>Solve the Triangle</CardTitle>
                <CardDescription>Enter any two sides to find the third.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-4">
                <div className="space-y-3">
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
                </div>
                 <div className="flex gap-2 pt-2">
                     <Button onClick={calculate} className="flex-1">Calculate</Button>
                     <Button onClick={handleClear} variant="outline" className="flex-1">Clear</Button>
                 </div>
            </CardContent>
            {result && (
                <CardFooter className="flex-col items-start space-y-3 p-4">
                    <div className="w-full p-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-md">
                        <h4 className="font-semibold mb-2">Results</h4>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm font-mono">
                            <p>Side a: {result.a.toFixed(4)}</p>
                            <p>Side b: {result.b.toFixed(4)}</p>
                            <p>Side c: {result.c.toFixed(4)}</p>
                            <p>∠α = {result.angleA.deg.toFixed(4)}°</p>
                            <p>∠β = {result.angleB.deg.toFixed(4)}°</p>
                            <p>Area = {result.area.toFixed(4)}</p>
                            <p>Perimeter = {result.perimeter.toFixed(4)}</p>
                        </div>
                    </div>
                     <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Show Calculation Steps</AccordionTrigger>
                            <AccordionContent>
                                <div className="p-3 bg-muted rounded-md font-mono text-xs break-words">
                                    {result.steps}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardFooter>
            )}
        </Card>
    );
}
