
"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { VolumeDiagram } from './volume-diagram'; // Reusing volume diagrams as they are visually similar
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SurfaceAreaCalculatorProps {
    shape: 'Sphere' | 'Cone' | 'Cube' | 'Cylinder' | 'Rectangular Tank' | 'Capsule' | 'Spherical Cap' | 'Conical Frustum' | 'Square Pyramid';
    inputs: { name: string; label: string; }[];
    calculate: (inputs: { [key: string]: number }) => { [key: string]: number | string | object };
}

const lengthUnits = {
    Meter: 1,
    Centimeter: 0.01,
    Decimeter: 0.1,
    Millimeter: 0.001,
    Kilometer: 1000,
    Foot: 0.3048,
    Inch: 0.0254,
    Yard: 0.9144,
};

const unitAbbreviations: { [key: string]: string } = {
    Meter: 'm',
    Centimeter: 'cm',
    Decimeter: 'dm',
    Millimeter: 'mm',
    Kilometer: 'km',
    Foot: 'ft',
    Inch: 'in',
    Yard: 'yd',
};

type Unit = keyof typeof lengthUnits;

const CalculatorCard: React.FC<SurfaceAreaCalculatorProps> = ({ shape, inputs, calculate }) => {
    const { toast } = useToast();
    const [inputValues, setInputValues] = useState<{ [key: string]: string }>(
        inputs.reduce((acc, input) => ({ ...acc, [input.name]: '' }), {})
    );
    const [results, setResults] = useState<{ [key: string]: string }>({});
    const [unit, setUnit] = useState<Unit>('Meter');
    const [steps, setSteps] = useState<any>(null);

    const handleCalculate = () => {
        setSteps(null);
        const conversionFactor = lengthUnits[unit];
        try {
            const parsedInputs = Object.entries(inputValues).reduce((acc, [key, value]) => {
                const num = parseFloat(value);
                if (shape !== 'Spherical Cap' && value === '') {
                     throw new Error(`Missing input for ${key}`);
                }
                if (isNaN(num) && value !== '') {
                    throw new Error(`Invalid input for ${key}`);
                }
                return { ...acc, [key]: isNaN(num) ? NaN : num * conversionFactor };
            }, {} as { [key: string]: number });

            if (shape === 'Spherical Cap') {
                const providedValues = Object.values(parsedInputs).filter(v => !isNaN(v));
                if (providedValues.length < 2) {
                    throw new Error('Please provide at least two values for the Spherical Cap calculator.');
                }
            }

            const calcResults = calculate(parsedInputs);
            const finalResults: { [key: string]: string } = {};

            if (calcResults.steps) {
                setSteps(calcResults.steps);
                // Convert final values in steps to selected unit
                const finalStepValues: {[key: string]: string} = {};
                Object.keys(calcResults.final || {}).forEach(key => {
                    const val = (calcResults.final as any)[key];
                     if(typeof val === 'number') {
                        finalStepValues[key] = (val / Math.pow(conversionFactor, 2)).toFixed(4);
                     } else {
                        finalStepValues[key] = val;
                     }
                });
                setResults(finalStepValues);
                return;
            }

            for (const key in calcResults) {
                const resultVal = calcResults[key];
                if (typeof resultVal === 'number') {
                    finalResults[key] = (resultVal / Math.pow(conversionFactor, 2)).toFixed(4);
                } else if (typeof resultVal !== 'object') { // Exclude 'steps' object
                    finalResults[key] = resultVal as string;
                }
            }

            setResults(finalResults);
        } catch (e: any) {
            toast({
                variant: 'destructive',
                title: 'Calculation Error',
                description: e.message,
            });
            setResults({});
            setSteps(null);
        }
    };
    
    const originalInputs = Object.entries(inputValues).reduce((acc, [key, value]) => ({...acc, [key]: parseFloat(value) || 0}), {} as {[key: string]: number});

    return (
        <Card className="overflow-hidden">
            <CardHeader>
                <CardTitle>{shape} Surface Area Calculator</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor={`${shape}-unit`}>Unit</Label>
                        <Select value={unit} onValueChange={(val) => setUnit(val as Unit)}>
                            <SelectTrigger id={`${shape}-unit`}>
                                <SelectValue placeholder="Select unit" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.keys(lengthUnits).map(u => <SelectItem key={u} value={u}>{u}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>

                    {inputs.map(input => (
                        <div key={input.name} className="space-y-2">
                            <Label htmlFor={`${shape}-${input.name}`}>{input.label}</Label>
                            <Input
                                id={`${shape}-${input.name}`}
                                type="number"
                                value={inputValues[input.name]}
                                onChange={e => setInputValues({ ...inputValues, [input.name]: e.target.value })}
                                placeholder={`Enter value in ${unit.toLowerCase()}s`}
                            />
                        </div>
                    ))}
                    <Button onClick={handleCalculate} className="w-full">Calculate</Button>
                    {steps ? (
                         <div className="pt-2 space-y-4">
                            <Label>Results</Label>
                            <div className="font-mono text-sm space-y-3">
                                {steps.base && (
                                    <div>
                                        <p className="font-semibold text-base">Base Surface Area</p>
                                        <div className="p-2 bg-muted rounded-md mt-1">
                                            <p>= {steps.base.formula.replace('{r}', String(originalInputs.r))}</p>
                                            <p>= {steps.base.piTerm}π</p>
                                            <p>= {results.Base} {unitAbbreviations[unit]}²</p>
                                        </div>
                                    </div>
                                )}
                                 {steps.lateral && (
                                    <div>
                                        <p className="font-semibold text-base">Lateral Surface Area</p>
                                        <div className="p-2 bg-muted rounded-md mt-1">
                                            <p>= {steps.lateral.formula.replace('{r}', String(originalInputs.r)).replace('{h}', String(originalInputs.h))}</p>
                                            <p>= {steps.lateral.piTerm}π</p>
                                            <p>= {results.Lateral} {unitAbbreviations[unit]}²</p>
                                        </div>
                                    </div>
                                )}
                                 {steps.total && (
                                     <div>
                                        <p className="font-semibold text-base">Total Surface Area</p>
                                        <div className="p-2 bg-muted rounded-md mt-1">
                                            <p>= {results.Total} {unitAbbreviations[unit]}²</p>
                                        </div>
                                    </div>
                                 )}
                                {steps.sphere && (
                                    <div>
                                         <p className="font-semibold text-base">Surface Area</p>
                                        <div className="p-2 bg-muted rounded-md mt-1">
                                            <p>= {steps.sphere.formula.replace('{r}', String(originalInputs.r))}</p>
                                            <p>= {steps.sphere.piTerm}π</p>
                                            <p>= {results.Total} {unitAbbreviations[unit]}²</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : Object.keys(results).length > 0 && (
                        <div className="pt-2 space-y-2">
                            <Label>Surface Area Results</Label>
                            {Object.entries(results).map(([key, value]) => (
                                <div key={key} className="font-mono text-lg p-2 bg-muted rounded-md text-center">
                                    <span className="capitalize text-sm text-muted-foreground">{key.replace(/([A-Z])/g, ' $1').trim()}: </span>
                                    {value} {unitAbbreviations[unit]}²
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="flex justify-center items-center md:pt-10">
                    <VolumeDiagram shape={shape as any} className="w-48 h-48 text-foreground" />
                </div>
            </CardContent>
        </Card>
    );
};

const calculators: SurfaceAreaCalculatorProps[] = [
    {
        shape: 'Sphere',
        inputs: [{ name: 'r', label: 'Radius (r)' }],
        calculate: ({ r }) => {
            return {
                final: { Total: 4 * Math.PI * r**2 },
                steps: {
                    sphere: {
                        formula: '4πr² = 4×π×{r}²',
                        piTerm: `${4 * r**2}`
                    }
                }
            }
        },
    },
    {
        shape: 'Cone',
        inputs: [{ name: 'r', label: 'Base Radius (r)' }, { name: 'h', label: 'Height (h)' }],
        calculate: ({ r, h }) => {
            const slantHeight = Math.sqrt(r*r + h*h);
            const lateral = Math.PI * r * slantHeight;
            const base = Math.PI * r*r;
            return {
                final: { Base: base, Lateral: lateral, Total: base + lateral },
                steps: {
                    base: {
                        formula: 'π×{r}²',
                        piTerm: `${r**2}`
                    },
                    lateral: {
                        formula: 'π×{r}×√({r}² + {h}²)',
                        piTerm: `${(r * slantHeight).toFixed(4)}`
                    },
                    total: {}
                }
            };
        },
    },
    {
        shape: 'Cube',
        inputs: [{ name: 'a', label: 'Edge Length (a)' }],
        calculate: ({ a }) => ({ Total: 6 * Math.pow(a, 2) }),
    },
    {
        shape: 'Cylinder',
        inputs: [{ name: 'r', label: 'Base Radius (r)' }, { name: 'h', label: 'Height (h)' }],
        calculate: ({ r, h }) => {
            const topBottom = 2 * Math.PI * r*r;
            const lateral = 2 * Math.PI * r * h;
            return { 'Top/Bottom': topBottom, Lateral: lateral, Total: topBottom + lateral };
        },
    },
    {
        shape: 'Rectangular Tank',
        inputs: [{ name: 'l', label: 'Length (l)' }, { name: 'w', label: 'Width (w)' }, { name: 'h', label: 'Height (h)' }],
        calculate: ({ l, w, h }) => ({ Total: 2 * (w*l + h*l + h*w) }),
    },
    {
        shape: 'Capsule',
        inputs: [{ name: 'r', label: 'Radius (r)' }, { name: 'h', label: 'Cylinder Height (h)' }],
        calculate: ({ r, h }) => {
            const cylinder = 2 * Math.PI * r * h;
            const sphere = 4 * Math.PI * r*r;
            return { Cylinder: cylinder, Ends: sphere, Total: cylinder + sphere };
        },
    },
    {
        shape: 'Spherical Cap',
        inputs: [{ name: 'r', label: 'Base Radius (r)' }, { name: 'R', label: 'Ball Radius (R)' }, { name: 'h', label: 'Height (h)' }],
        calculate: ({ r, R, h }) => {
            let capArea;
            if (!isNaN(h) && !isNaN(R)) {
                 if (h > 2 * R) throw new Error("Height cannot be greater than the sphere's diameter.");
                 capArea = 2 * Math.PI * R * h;
                 return { 'Cap Surface': capArea };
            }
            if (!isNaN(r) && !isNaN(h)) {
                const R_calc = (r*r + h*h) / (2*h);
                capArea = 2 * Math.PI * R_calc * h;
                return { 'Cap Surface': capArea };
            }
             if (!isNaN(r) && !isNaN(R)) {
                if (r > R) throw new Error("Base radius cannot be greater than ball radius.");
                const h_calc = R - Math.sqrt(R*R - r*r);
                capArea = 2 * Math.PI * R * h_calc;
                return { 'Cap Surface': capArea };
            }
            throw new Error("Requires at least two values to calculate.")
        },
    },
    {
        shape: 'Conical Frustum',
        inputs: [{ name: 'r', label: 'Top Radius (r)' }, { name: 'R', label: 'Bottom Radius (R)' }, { name: 'h', label: 'Height (h)' }],
        calculate: ({ r, R, h }) => {
            const slantHeight = Math.sqrt(Math.pow(R-r, 2) + h*h);
            const lateral = Math.PI * (R + r) * slantHeight;
            const top = Math.PI * r*r;
            const bottom = Math.PI * R*R;
            return { Top: top, Bottom: bottom, Lateral: lateral, Total: top + bottom + lateral };
        },
    },
    {
        shape: 'Square Pyramid',
        inputs: [{ name: 'a', label: 'Base Edge (a)' }, { name: 'h', label: 'Height (h)' }],
        calculate: ({ a, h }) => {
            const base = a * a;
            const slantHeight = Math.sqrt(h*h + (a/2)*(a/2));
            const lateral = 2 * a * slantHeight;
            return { Base: base, Lateral: lateral, Total: base + lateral };
        },
    },
];

export default function SurfaceAreaCalculator() {
    return (
        <div className="space-y-8">
            {calculators.map(calc => (
                <CalculatorCard key={calc.shape} {...calc} />
            ))}
        </div>
    );
}
