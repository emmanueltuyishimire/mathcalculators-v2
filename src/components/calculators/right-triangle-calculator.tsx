
"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

type AngleUnit = 'degree' | 'radian';

interface CalculationResult {
    a: number;
    b: number;
    c: number;
    alpha: { deg: number; dms: string; rad: number; };
    beta: { deg: number; dms: string; rad: number; };
    area: number;
    perimeter: number;
    h: number;
    inradius: number;
    circumradius: number;
    steps: any;
    inputs: { a?: number, b?: number, c?: number, alpha?: number, beta?: number };
}

const evalRad = (str: string) => {
    try {
        str = str.toLowerCase().replace('pi', String(Math.PI));
        // Allow simple fractions like pi/2, but prevent arbitrary code execution
        if (/^(\d*\.?\d*\*?)?pi(\/\d+\.?\d*)?$/.test(str.replace(/\s/g, '')) || /^\d*\.?\d+$/.test(str)) {
            return new Function('return ' + str)();
        }
        return NaN;
    } catch {
        return NaN;
    }
}

const formatRad = (rad: number) => {
  const multiples = [
    { val: Math.PI, str: 'π' }, { val: Math.PI / 2, str: 'π/2' },
    { val: Math.PI / 3, str: 'π/3' }, { val: Math.PI / 4, str: 'π/4' },
    { val: Math.PI / 6, str: 'π/6' }
  ];
  for (const m of multiples) {
    if (Math.abs(rad - m.val) < 1e-9) return m.str;
    for (let i = 2; i <= 5; i++) {
        if (Math.abs(rad - i * m.val) < 1e-9) return `${i}${m.str}`;
    }
  }
  return rad.toFixed(5) + ' rad';
};

const toDeg = (rad: number) => rad * 180 / Math.PI;
const toRad = (deg: number) => deg * Math.PI / 180;

const degToDMS = (deg: number) => {
    let d = Math.floor(deg);
    let minFloat = (deg - d) * 60;
    let m = Math.floor(minFloat);
    let secFloat = (minFloat - m) * 60;
    let s = Math.round(secFloat);
    if (s === 60) { m++; s = 0; }
    if (m === 60) { d++; m = 0; }
    return `${d}°${m}'${s}"`;
};

export default function RightTriangleCalculator() {
    const { toast } = useToast();
    
    const [values, setValues] = useState({ a: '3', b: '4', c: '', alpha: '', beta: '' });
    const [angleUnit, setAngleUnit] = useState<AngleUnit>('degree');
    const [results, setResults] = useState<CalculationResult | null>(null);

    const handleInputChange = (field: keyof typeof values, value: string) => {
        setValues(prev => ({...prev, [field]: value}));
    };

    const calculate = () => {
        let { a, b, c, alpha, beta } = values;

        let numA = a ? parseFloat(a) : NaN;
        let numB = b ? parseFloat(b) : NaN;
        let numC = c ? parseFloat(c) : NaN;
        let numAlpha = alpha ? (angleUnit === 'radian' ? toDeg(evalRad(alpha)) : parseFloat(alpha)) : NaN;
        let numBeta = beta ? (angleUnit === 'radian' ? toDeg(evalRad(beta)) : parseFloat(beta)) : NaN;
        
        const knownValues = [!isNaN(numA), !isNaN(numB), !isNaN(numC), !isNaN(numAlpha), !isNaN(numBeta)];
        const knownCount = knownValues.filter(Boolean).length;
        const sideCount = [!isNaN(numA), !isNaN(numB), !isNaN(numC)].filter(Boolean).length;

        if (knownCount < 2 || sideCount === 0) {
            if (Object.values(values).some(v => v !== '')) {
                 toast({ variant: 'destructive', title: 'Invalid Input', description: 'Please provide exactly two values, including at least one side.' });
            }
            setResults(null);
            return;
        }

        const originalInputs = { a:numA, b:numB, c:numC, alpha:numAlpha, beta:numBeta };
        const steps: any = {};

        try {
            if (sideCount === 2) {
                if (!isNaN(numA) && !isNaN(numB)) {
                    if (numA <= 0 || numB <= 0) throw new Error("Sides 'a' and 'b' must be positive.");
                    numC = Math.sqrt(numA**2 + numB**2);
                    steps.c = `c = √(a² + b²) = √(${numA}² + ${numB}²) = ${numC.toFixed(4)}`;
                } else if (!isNaN(numA) && !isNaN(numC)) {
                    if (numC <= numA) throw new Error("Hypotenuse c must be > side a");
                    numB = Math.sqrt(numC**2 - numA**2);
                     steps.b = `b = √(c² - a²) = √(${numC}² - ${numA}²) = ${numB.toFixed(4)}`;
                } else { // b, c known
                    if (numC <= numB) throw new Error("Hypotenuse c must be > side b");
                    numA = Math.sqrt(numC**2 - numB**2);
                     steps.a = `a = √(c² - b²) = √(${numC}² - ${numB}²) = ${numA.toFixed(4)}`;
                }
                numAlpha = toDeg(Math.atan(numA / numB));
                numBeta = 90 - numAlpha;
            } else { // 1 side, 1 angle
                if (isNaN(numAlpha) && !isNaN(numBeta)) { numAlpha = 90 - numBeta; }
                else if (!isNaN(numAlpha) && isNaN(numBeta)) { numBeta = 90 - numAlpha; }
                else if (isNaN(numAlpha) && isNaN(numBeta)) { throw new Error("Please provide one angle.")}

                if (numAlpha <= 0 || numAlpha >= 90) throw new Error("Angles must be between 0 and 90 degrees.");

                const alphaRad = toRad(numAlpha);
                if (!isNaN(numA)) {
                    numB = numA / Math.tan(alphaRad);
                    numC = numA / Math.sin(alphaRad);
                } else if (!isNaN(numB)) {
                    numA = numB * Math.tan(alphaRad);
                    numC = numB / Math.cos(alphaRad);
                } else { // c known
                    numA = numC * Math.sin(alphaRad);
                    numB = numC * Math.cos(alphaRad);
                }
            }
            
            const area = (numA * numB) / 2;
            const perimeter = numA + numB + numC;
            const h = (numA * numB) / numC;
            const inradius = (numA + numB - numC) / 2;
            const circumradius = numC / 2;

            const alphaRad = toRad(numAlpha);
            const betaRad = toRad(numBeta);
            
            steps.alpha = `∠α = arcsin(a/c) = arcsin(${numA.toFixed(4)}/${numC.toFixed(4)}) = ${alphaRad.toFixed(4)} rad = ${numAlpha.toFixed(4)}°`;
            steps.beta = `∠β = 90° - ∠α = 90° - ${numAlpha.toFixed(4)}° = ${numBeta.toFixed(4)}°`;
            steps.area = `Area = (a × b) / 2 = (${numA.toFixed(4)} × ${numB.toFixed(4)}) / 2 = ${area.toFixed(4)}`;
            steps.perimeter = `P = a + b + c = ${numA.toFixed(4)} + ${numB.toFixed(4)} + ${numC.toFixed(4)} = ${perimeter.toFixed(4)}`;
            steps.h = `h = (a × b) / c = (${numA.toFixed(4)} × ${numB.toFixed(4)}) / ${numC.toFixed(4)} = ${h.toFixed(4)}`;
            steps.inradius = `inradius = (a + b - c) / 2 = ${inradius.toFixed(4)}`;
            steps.circumradius = `circumradius = c / 2 = ${circumradius.toFixed(4)}`;

            setResults({
                a: numA, b: numB, c: numC,
                alpha: { deg: numAlpha, dms: degToDMS(numAlpha), rad: alphaRad },
                beta: { deg: numBeta, dms: degToDMS(numBeta), rad: betaRad },
                area, perimeter, h, inradius, circumradius,
                steps,
                inputs: originalInputs
            });
            
        } catch (e: any) {
            toast({ variant: 'destructive', title: 'Calculation Error', description: e.message });
            setResults(null);
        }
    };
    
    useEffect(() => {
        calculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleClear = () => {
        setValues({ a: '', b: '', c: '', alpha: '', beta: ''});
        setResults(null);
    }

    const givenString = () => {
        if (!results || !results.inputs) return '';
        const parts = [];
        const { a, b, c, alpha, beta } = results.inputs;
        if (a !== null && !isNaN(a)) parts.push(`a=${a}`);
        if (b !== null && !isNaN(b)) parts.push(`b=${b}`);
        if (c !== null && !isNaN(c)) parts.push(`c=${c}`);
        if (alpha !== null && !isNaN(alpha)) parts.push(`α=${alpha}°`);
        if (beta !== null && !isNaN(beta)) parts.push(`β=${beta}°`);
        return `Given ${parts.join(' and ')}`;
    }

    return (
        <Card className="shadow-lg">
            <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-4">
                    <Label htmlFor="angle-unit" className="text-sm">Angle Unit:</Label>
                     <Select value={angleUnit} onValueChange={val => setAngleUnit(val as AngleUnit)}>
                        <SelectTrigger id="angle-unit" className="w-[120px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="degree">Degree (°)</SelectItem>
                            <SelectItem value="radian">Radian (rad)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="side-a">Side a</Label>
                        <Input id="side-a" value={values.a} onChange={e => handleInputChange('a', e.target.value)} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="angle-alpha">Angle α</Label>
                        <Input id="angle-alpha" value={values.alpha} onChange={e => handleInputChange('alpha', e.target.value)} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="side-b">Side b</Label>
                        <Input id="side-b" value={values.b} onChange={e => handleInputChange('b', e.target.value)} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="angle-beta">Angle β</Label>
                        <Input id="angle-beta" value={values.beta} onChange={e => handleInputChange('beta', e.target.value)} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="side-c">Hypotenuse c</Label>
                        <Input id="side-c" value={values.c} onChange={e => handleInputChange('c', e.target.value)} />
                    </div>
                </div>
                 <div className="flex gap-2 mt-6">
                    <Button onClick={calculate} className="flex-1">Calculate</Button>
                    <Button onClick={handleClear} variant="outline" className="flex-1">Clear</Button>
                </div>
                
                {results && (
                     <Card className="mt-6">
                         <CardHeader>
                            <CardTitle>Results</CardTitle>
                            <CardDescription>{givenString()}</CardDescription>
                         </CardHeader>
                         <CardContent className="space-y-2 text-sm font-mono">
                             <p><b>Side a = {results.a.toFixed(4)}</b></p>
                             <p><b>Side b = {results.b.toFixed(4)}</b></p>
                             <p><b>Hypotenuse c = {results.c.toFixed(4)}</b></p>
                             <p><b>∠α = {results.alpha.deg.toFixed(4)}° = {results.alpha.dms} = {formatRad(results.alpha.rad)}</b></p>
                             <p><b>∠β = {results.beta.deg.toFixed(4)}° = {results.beta.dms} = {formatRad(results.beta.rad)}</b></p>
                             <p><b>Altitude h = {results.h.toFixed(4)}</b></p>
                             <p><b>Area = {results.area.toFixed(4)}</b></p>
                             <p><b>Perimeter = {results.perimeter.toFixed(4)}</b></p>
                             <p><b>Inradius = {results.inradius.toFixed(4)}</b></p>
                             <p><b>Circumradius = {results.circumradius.toFixed(4)}</b></p>
                         </CardContent>
                         <CardFooter>
                              <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>Show Calculation Steps</AccordionTrigger>
                                    <AccordionContent>
                                        <div className="p-4 bg-muted rounded-md font-mono text-xs space-y-2 break-words">
                                            {Object.entries(results.steps).map(([key, value]) => (
                                                (value && typeof value === 'string') && <p key={key} dangerouslySetInnerHTML={{ __html: value }} />
                                            ))}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                         </CardFooter>
                     </Card>
                )}
            </CardContent>
        </Card>
    );
}
