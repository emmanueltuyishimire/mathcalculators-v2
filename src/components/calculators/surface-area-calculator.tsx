
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
    shape: 'Sphere' | 'Cone' | 'Cube' | 'Cylinder' | 'Rectangular Tank' | 'Capsule' | 'Spherical Cap' | 'Conical Frustum' | 'Square Pyramid' | 'Ellipsoid';
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
        setResults({});
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

    const renderSphericalCapResults = () => {
        if (shape !== 'Spherical Cap' || !steps) return null;
        
        const renderResultBlock = (resultKey: 'result1' | 'result2') => {
            const resultData = steps[resultKey];
            if (!resultData) return null;
            return (
                 <div key={resultKey} className="space-y-3">
                    <p className="font-semibold text-base">{resultData.title}</p>
                    <div className="font-mono text-sm space-y-2 p-2 bg-muted rounded-md">
                        <p>Height = {resultData.heightFormula}</p>
                        <p>= {resultData.heightValue.toFixed(4)} {unitAbbreviations[unit]}</p>
                    </div>
                     <div className="font-mono text-sm space-y-2 p-2 bg-muted rounded-md">
                        <p>Base Surface Area = {resultData.baseFormula}</p>
                        <p>= {resultData.baseValue.toFixed(4)} {unitAbbreviations[unit]}²</p>
                    </div>
                     <div className="font-mono text-sm space-y-2 p-2 bg-muted rounded-md">
                        <p>Cap Surface Area = {resultData.capFormula}</p>
                        <p>= {resultData.capValue.toFixed(4)} {unitAbbreviations[unit]}²</p>
                    </div>
                    <div className="font-mono text-sm space-y-2 p-2 bg-muted rounded-md font-bold text-primary">
                        <p>Total Surface Area = {resultData.totalValue.toFixed(4)} {unitAbbreviations[unit]}²</p>
                    </div>
                 </div>
            )
        }

        return (
             <div className="pt-2 space-y-6">
                <Label>Results</Label>
                {renderResultBlock('result1')}
                {steps.result2 && <p className="text-center font-bold">OR</p>}
                {renderResultBlock('result2')}
            </div>
        )
    }

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
                    {shape === 'Spherical Cap' ? renderSphericalCapResults() : steps ? (
                         <div className="pt-2 space-y-4">
                            <Label>Results</Label>
                            <div className="font-mono text-sm space-y-3">
                                {Object.entries(steps).map(([key, step]: [string, any]) => (
                                    step.formula && <div key={key}>
                                        <p className="font-semibold text-base capitalize">{key.replace(/([A-Z])/g, ' $1').trim()} Area</p>
                                        <div className="p-2 bg-muted rounded-md mt-1">
                                            <p>= {step.formula.replace(/{(\w+)}/g, (match: any, p1: string) => String(originalInputs[p1] || ''))}</p>
                                            {step.piTerm && <p>= {step.piTerm}π</p>}
                                            <p>= {results[key.charAt(0).toUpperCase() + key.slice(1)]} {unitAbbreviations[unit]}²</p>
                                        </div>
                                    </div>
                                ))}
                                {steps.total && (
                                     <div>
                                        <p className="font-semibold text-base">Total Surface Area</p>
                                        <div className="p-2 bg-muted rounded-md mt-1 font-bold text-primary">
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
                    },
                    total: {}
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
                        formula: 'π×r² = π×{r}²',
                        piTerm: `${r**2}`
                    },
                    lateral: {
                        formula: 'π×r×√({r}² + {h}²)',
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
        calculate: ({ a }) => ({
             final: { Total: 6 * a**2 },
             steps: {
                 total: {
                     formula: '6×a² = 6×{a}²'
                 }
             }
        }),
    },
    {
        shape: 'Cylinder',
        inputs: [{ name: 'r', label: 'Base Radius (r)' }, { name: 'h', label: 'Height (h)' }],
        calculate: ({ r, h }) => {
            const top = Math.PI * r**2;
            const bottom = Math.PI * r**2;
            const lateral = 2 * Math.PI * r * h;
            return {
                final: { Top: top, Bottom: bottom, Lateral: lateral, Total: top + bottom + lateral },
                steps: {
                    top: { formula: 'π×r² = π×{r}²', piTerm: `${r**2}` },
                    bottom: { formula: 'π×r² = π×{r}²', piTerm: `${r**2}` },
                    lateral: { formula: '2π×r×h = 2π×{r}×{h}', piTerm: `${2 * r * h}` },
                    total: {}
                }
            };
        },
    },
    {
        shape: 'Rectangular Tank',
        inputs: [{ name: 'l', label: 'Length (l)' }, { name: 'w', label: 'Width (w)' }, { name: 'h', label: 'Height (h)' }],
        calculate: ({ l, w, h }) => ({
             final: { Total: 2 * (w*l + h*l + h*w) },
             steps: {
                 total: {
                     formula: '2×(l×w + l×h + w×h) = 2×({l}×{w} + {l}×{h} + {w}×{h})'
                 }
             }
        }),
    },
    {
        shape: 'Capsule',
        inputs: [{ name: 'r', label: 'Radius (r)' }, { name: 'h', label: 'Cylinder Height (h)' }],
        calculate: ({ r, h }) => {
            const cylinder = 2 * Math.PI * r * h;
            const sphereEnds = 4 * Math.PI * r*r;
            return { 
                final: { Ends: sphereEnds, Cylinder: cylinder, Total: cylinder + sphereEnds },
                steps: {
                    ends: { formula: '4×π×r² = 4×π×{r}²', piTerm: `${4 * r**2}` },
                    cylinder: { formula: '2×π×r×h = 2×π×{r}×{h}', piTerm: `${2 * r * h}` },
                    total: {}
                }
            };
        },
    },
    {
        shape: 'Spherical Cap',
        inputs: [{ name: 'r', label: 'Base Radius (r)' }, { name: 'R', label: 'Ball Radius (R)' }, { name: 'h', label: 'Height (h)' }],
        calculate: ({ r, R, h }) => {
            if (isNaN(r) && isNaN(R)) throw new Error("At least Base Radius (r) or Ball Radius (R) must be provided.");
            if (isNaN(r) && isNaN(h)) throw new Error("At least Base Radius (r) or Height (h) must be provided.");
            if (isNaN(R) && isNaN(h)) throw new Error("At least Ball Radius (R) or Height (h) must be provided.");
    
            if (!isNaN(r) && !isNaN(R) && isNaN(h)) {
                if (r > R) throw new Error("Base radius (r) cannot be greater than ball radius (R).");
                const h1 = R + Math.sqrt(R**2 - r**2);
                const h2 = R - Math.sqrt(R**2 - r**2);
                
                const calcResult = (h_calc: number) => {
                    const baseArea = Math.PI * r**2;
                    const capArea = 2 * Math.PI * R * h_calc;
                    return {
                        heightFormula: `{R} ± √({R}² - {r}²)`,
                        heightValue: h_calc,
                        baseFormula: `π×r² = π×{r}²`,
                        baseValue: baseArea,
                        capFormula: `2πhR = 2π×${h_calc.toFixed(4)}×{R}`,
                        capValue: capArea,
                        totalValue: baseArea + capArea
                    }
                }

                return {
                   steps: {
                       result1: { title: "Result 1", ...calcResult(h1) },
                       result2: h1 !== h2 ? { title: "Result 2", ...calcResult(h2) } : undefined
                   }
                };

            } else {
                let R_calc = R, r_calc = r, h_calc = h;
                if(isNaN(R)) {
                    R_calc = (r**2 + h**2) / (2*h);
                }
                if(isNaN(r)) {
                    if (h > 2*R) throw new Error("Height cannot be greater than the sphere's diameter.");
                    r_calc = Math.sqrt(h * (2*R - h));
                }
                 if(isNaN(h)) {
                    if (r > R) throw new Error("Base radius (r) cannot be greater than ball radius (R).");
                    h_calc = R - Math.sqrt(R**2 - r**2); // Assuming smaller cap
                }

                const baseArea = Math.PI * r_calc**2;
                const capArea = 2 * Math.PI * R_calc * h_calc;
                return {
                     steps: {
                        result1: {
                            title: "Result",
                            heightFormula: 'Provided',
                            heightValue: h_calc,
                            baseFormula: `π×r² = π×${r_calc.toFixed(4)}²`,
                            baseValue: baseArea,
                            capFormula: `2πhR = 2π×${h_calc.toFixed(4)}×${R_calc.toFixed(4)}`,
                            capValue: capArea,
                            totalValue: baseArea + capArea
                        }
                    }
                }
            }
        },
    },
    {
        shape: 'Conical Frustum',
        inputs: [{ name: 'r', label: 'Top Radius (r)' }, { name: 'R', label: 'Bottom Radius (R)' }, { name: 'h', label: 'Height (h)' }],
        calculate: ({ r, R, h }) => {
            const slantHeight = Math.sqrt(Math.pow(R - r, 2) + h * h);
            const lateral = Math.PI * (R + r) * slantHeight;
            const top = Math.PI * r * r;
            const bottom = Math.PI * R * R;
            return {
                final: { Top: top, Bottom: bottom, Lateral: lateral, Total: top + bottom + lateral },
                steps: {
                    top: { formula: 'π×r² = π×{r}²', piTerm: `${r*r}`},
                    bottom: { formula: 'π×R² = π×{R}²', piTerm: `${R*R}`},
                    lateral: { formula: 'π×(r+R)×√((R-r)² + h²) = π×({r}+{R})×√(({R}-{r})² + {h}²)', piTerm: `${((r+R) * slantHeight).toFixed(4)}`},
                    total: {}
                }
            };
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
    {
        shape: 'Ellipsoid',
        inputs: [{ name: 'a', label: 'Axis 1 (a)' }, { name: 'b', label: 'Axis 2 (b)' }, { name: 'c', label: 'Axis 3 (c)' }],
        calculate: ({ a, b, c }) => {
            const p = 1.6075;
            const surfaceArea = 4 * Math.PI * Math.pow((Math.pow(a*b, p) + Math.pow(a*c, p) + Math.pow(b*c, p)) / 3, 1/p);
             return {
                final: { 'Approx. Total': surfaceArea },
                steps: {
                    total: {
                        formula: '4π × ( ((ab)^1.6 + (ac)^1.6 + (bc)^1.6) / 3 )^(1/1.6)'
                    }
                }
            };
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
