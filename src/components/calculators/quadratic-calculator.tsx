
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface Result {
    root1: string;
    root2: string;
}

interface Steps {
    discriminant: string;
    root1: string;
    root2: string;
}

// Helper to parse fractions like "1/4"
const parseFraction = (value: string): number => {
    if (value.includes('/')) {
        const [num, den] = value.split('/');
        const numerator = parseFloat(num);
        const denominator = parseFloat(den);
        if (!isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
            return numerator / denominator;
        }
    }
    const floatVal = parseFloat(value);
    if(isNaN(floatVal)) throw new Error(`Invalid number: ${value}`);
    return floatVal;
};


export default function QuadraticCalculator() {
    const { toast } = useToast();
    const [coeffs, setCoeffs] = useState({ a: '1', b: '1', c: '1/4' });
    const [result, setResult] = useState<Result | null>(null);
    const [steps, setSteps] = useState<Steps | null>(null);
    
    const calculate = () => {
        try {
            const a = parseFraction(coeffs.a);
            const b = parseFraction(coeffs.b);
            const c = parseFraction(coeffs.c);

            if (a === 0) {
                toast({ variant: 'destructive', title: 'Invalid Input', description: 'Coefficient "a" cannot be zero.' });
                return;
            }

            const discriminant = b * b - 4 * a * c;
            let root1: string, root2: string;

            const stepData = {
                discriminant: `Δ = b² - 4ac = (${b})² - 4(${a})(${c}) = ${discriminant.toFixed(4)}`,
                root1: '',
                root2: '',
            };

            if (discriminant > 0) {
                const r1 = (-b + Math.sqrt(discriminant)) / (2 * a);
                const r2 = (-b - Math.sqrt(discriminant)) / (2 * a);
                root1 = r1.toFixed(4);
                root2 = r2.toFixed(4);
                stepData.root1 = `x₁ = (-b + √Δ) / 2a = (-${b} + √${discriminant.toFixed(4)}) / (2×${a}) = ${root1}`;
                stepData.root2 = `x₂ = (-b - √Δ) / 2a = (-${b} - √${discriminant.toFixed(4)}) / (2×${a}) = ${root2}`;
            } else if (discriminant === 0) {
                const r = -b / (2 * a);
                root1 = root2 = r.toFixed(4);
                stepData.root1 = `x = -b / 2a = -${b} / (2×${a}) = ${root1}`;
                stepData.root2 = 'A single real root.';
            } else { // Complex roots
                const realPart = (-b / (2 * a)).toFixed(4);
                const imagPart = (Math.sqrt(-discriminant) / (2 * a)).toFixed(4);
                root1 = `${realPart} + ${imagPart}i`;
                root2 = `${realPart} - ${imagPart}i`;
                stepData.root1 = `x₁ = (-b + i√-Δ) / 2a = (-${b} + i√${(-discriminant).toFixed(4)}) / (2×${a}) = ${root1}`;
                stepData.root2 = `x₂ = (-b - i√-Δ) / 2a = (-${b} - i√${(-discriminant).toFixed(4)}) / (2×${a}) = ${root2}`;
            }

            setResult({ root1, root2 });
            setSteps(stepData);

        } catch (e: any) {
            toast({ variant: 'destructive', title: 'Error', description: e.message });
            setResult(null);
            setSteps(null);
        }
    };
    
    // Initial calculation
    useEffect(() => {
        calculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleInputChange = (field: 'a' | 'b' | 'c', value: string) => {
        setCoeffs(prev => ({...prev, [field]: value}));
    };

    return (
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle>ax² + bx + c = 0</CardTitle>
                <CardDescription>Enter the coefficients a, b, and c.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="coeff-a">a</Label>
                        <Input id="coeff-a" value={coeffs.a} onChange={e => handleInputChange('a', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="coeff-b">b</Label>
                        <Input id="coeff-b" value={coeffs.b} onChange={e => handleInputChange('b', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="coeff-c">c</Label>
                        <Input id="coeff-c" value={coeffs.c} onChange={e => handleInputChange('c', e.target.value)} />
                    </div>
                </div>
                <Button onClick={calculate} className="w-full">Calculate</Button>
            </CardContent>
            {result && (
                <CardFooter className="flex-col items-start gap-4">
                    <div className="w-full p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-md">
                        <h3 className="font-bold text-lg mb-2">Roots</h3>
                        <p className="font-mono text-lg"><b>x₁ =</b> {result.root1}</p>
                        <p className="font-mono text-lg"><b>x₂ =</b> {result.root2}</p>
                    </div>
                     {steps && (
                         <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>Show Calculation Steps</AccordionTrigger>
                                <AccordionContent>
                                    <div className="p-4 bg-muted rounded-md font-mono text-sm break-words space-y-2">
                                        <p><b>Discriminant (Δ):</b> {steps.discriminant}</p>
                                        <p><b>Root 1 (x₁):</b> {steps.root1}</p>
                                        <p><b>Root 2 (x₂):</b> {steps.root2}</p>
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
