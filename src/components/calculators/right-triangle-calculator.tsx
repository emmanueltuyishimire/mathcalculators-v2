
"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type AngleUnit = 'degree' | 'radian';

const evalRad = (str: string) => {
    try {
        // Allow simple fractions of pi
        str = str.toLowerCase().replace('pi', String(Math.PI));
        return new Function('return ' + str)();
    } catch {
        return NaN;
    }
}

const formatRad = (rad: number) => {
  // Check for common fractions of pi
  const piMultiples = [
    { val: Math.PI / 6, str: 'π/6' },
    { val: Math.PI / 4, str: 'π/4' },
    { val: Math.PI / 3, str: 'π/3' },
    { val: Math.PI / 2, str: 'π/2' },
  ];
  for (const mult of piMultiples) {
    if (Math.abs(rad - mult.val) < 1e-9) return mult.str;
  }
  return rad.toFixed(5) + ' rad';
};

const toDeg = (rad: number) => rad * 180 / Math.PI;
const toRad = (deg: number) => deg * Math.PI / 180;

export default function RightTriangleCalculator() {
    const { toast } = useToast();
    
    const [values, setValues] = useState({ a: '3', b: '', c: '5', alpha: '', beta: '' });
    const [angleUnit, setAngleUnit] = useState<AngleUnit>('degree');
    
    const [results, setResults] = useState<any>(null);

    const handleInputChange = (field: keyof typeof values, value: string) => {
        setValues(prev => ({...prev, [field]: value}));
    };

    const calculate = () => {
        let { a, b, c, alpha, beta } = values;

        let numA = parseFloat(a);
        let numB = parseFloat(b);
        let numC = parseFloat(c);
        let numAlpha = angleUnit === 'radian' ? toDeg(evalRad(alpha)) : parseFloat(alpha);
        let numBeta = angleUnit === 'radian' ? toDeg(evalRad(beta)) : parseFloat(beta);
        
        const knowns = [!isNaN(numA), !isNaN(numB), !isNaN(numC), !isNaN(numAlpha), !isNaN(numBeta)];
        const knownCount = knowns.filter(Boolean).length;
        const sideCount = [!isNaN(numA), !isNaN(numB), !isNaN(numC)].filter(Boolean).length;

        if (knownCount !== 2 || sideCount === 0) {
            toast({ variant: 'destructive', title: 'Invalid Input', description: 'Please provide exactly two values, including at least one side.' });
            return;
        }

        try {
            // Case 1: Two sides are known
            if (sideCount === 2) {
                if (!isNaN(numA) && !isNaN(numB)) { // a, b known
                    numC = Math.sqrt(numA**2 + numB**2);
                    numAlpha = toDeg(Math.atan(numA / numB));
                    numBeta = 90 - numAlpha;
                } else if (!isNaN(numA) && !isNaN(numC)) { // a, c known
                    if (numC <= numA) throw new Error("Hypotenuse c must be > side a");
                    numB = Math.sqrt(numC**2 - numA**2);
                    numAlpha = toDeg(Math.asin(numA / numC));
                    numBeta = 90 - numAlpha;
                } else { // b, c known
                    if (numC <= numB) throw new Error("Hypotenuse c must be > side b");
                    numA = Math.sqrt(numC**2 - numB**2);
                    numBeta = toDeg(Math.asin(numB / numC));
                    numAlpha = 90 - numBeta;
                }
            } 
            // Case 2: One side and one angle are known
            else { 
                if (isNaN(numAlpha)) { numAlpha = 90 - numBeta; }
                else { numBeta = 90 - numAlpha; }

                if (numAlpha <= 0 || numAlpha >= 90) throw new Error("Angles must be between 0 and 90 degrees.");

                const alphaRad = toRad(numAlpha);
                
                if (!isNaN(numA)) { // a and one angle known
                    numB = numA / Math.tan(alphaRad);
                    numC = numA / Math.sin(alphaRad);
                } else if (!isNaN(numB)) { // b and one angle known
                    numA = numB * Math.tan(alphaRad);
                    numC = numB / Math.cos(alphaRad);
                } else { // c and one angle known
                    numA = numC * Math.sin(alphaRad);
                    numB = numC * Math.cos(alphaRad);
                }
            }
            
            const area = (numA * numB) / 2;
            const perimeter = numA + numB + numC;
            const h = (numA * numB) / numC;

            setResults({ a: numA, b: numB, c: numC, alpha: numAlpha, beta: numBeta, area, perimeter, h });
            setValues({
                a: numA.toFixed(4),
                b: numB.toFixed(4),
                c: numC.toFixed(4),
                alpha: angleUnit === 'radian' ? formatRad(toRad(numAlpha)) : numAlpha.toFixed(4),
                beta: angleUnit === 'radian' ? formatRad(toRad(numBeta)) : numBeta.toFixed(4),
            })
            
        } catch (e: any) {
            toast({ variant: 'destructive', title: 'Calculation Error', description: e.message });
        }
    };

    const handleClear = () => {
        setValues({ a: '', b: '', c: '', alpha: '', beta: ''});
        setResults(null);
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
                     <div className="mt-6 p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-md">
                        <h4 className="font-semibold mb-2">Results</h4>
                         <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2 text-sm font-mono">
                            <div><span className="text-muted-foreground">Area =</span> {results.area.toFixed(4)}</div>
                            <div><span className="text-muted-foreground">Perimeter =</span> {results.perimeter.toFixed(4)}</div>
                            <div><span className="text-muted-foreground">Altitude h =</span> {results.h.toFixed(4)}</div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
