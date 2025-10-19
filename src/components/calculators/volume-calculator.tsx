
"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { VolumeDiagram } from './volume-diagram';

interface VolumeCalculatorProps {
    shape: 'Sphere' | 'Cone' | 'Cube' | 'Cylinder' | 'Rectangular Tank' | 'Capsule' | 'Spherical Cap' | 'Conical Frustum' | 'Ellipsoid' | 'Square Pyramid' | 'Tube';
    inputs: { name: string; label: string; }[];
    calculate: (inputs: { [key: string]: number }) => number | string;
}

const CalculatorCard: React.FC<VolumeCalculatorProps> = ({ shape, inputs, calculate }) => {
    const { toast } = useToast();
    const [inputValues, setInputValues] = useState<{ [key: string]: string }>(
        inputs.reduce((acc, input) => ({ ...acc, [input.name]: '' }), {})
    );
    const [volume, setVolume] = useState<string>('');
    
    const handleCalculate = () => {
        const parsedInputs = Object.entries(inputValues).reduce((acc, [key, value]) => {
            const num = parseFloat(value);
            if (isNaN(num) && value !== '') {
                toast({
                    variant: 'destructive',
                    title: `Invalid input for ${key}`,
                    description: 'Please enter a valid number.',
                });
                throw new Error('Invalid input');
            }
            return { ...acc, [key]: num };
        }, {} as { [key: string]: number });
        
        // For Spherical Cap, check if at least two values are provided
        if (shape === 'Spherical Cap') {
            const providedValues = Object.values(parsedInputs).filter(v => !isNaN(v));
            if (providedValues.length < 2) {
                toast({
                    variant: 'destructive',
                    title: 'Insufficient Inputs',
                    description: 'Please provide at least two values for the Spherical Cap calculator.',
                });
                return;
            }
        } else {
             if (Object.values(parsedInputs).some(v => isNaN(v))) {
                toast({
                    variant: 'destructive',
                    title: 'Missing Inputs',
                    description: 'Please fill in all fields for the calculation.',
                });
                return;
            }
        }

        try {
            const result = calculate(parsedInputs);
            setVolume(typeof result === 'number' ? result.toFixed(4) : result);
        } catch (e: any) {
            toast({
                variant: 'destructive',
                title: 'Calculation Error',
                description: e.message,
            });
            setVolume('');
        }
    };

    return (
        <Card className="overflow-hidden">
            <CardHeader>
                <CardTitle>{shape} Volume Calculator</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                    {inputs.map(input => (
                        <div key={input.name} className="space-y-2">
                            <Label htmlFor={`${shape}-${input.name}`}>{input.label}</Label>
                            <Input
                                id={`${shape}-${input.name}`}
                                type="number"
                                value={inputValues[input.name]}
                                onChange={e => setInputValues({ ...inputValues, [input.name]: e.target.value })}
                                placeholder="meters"
                            />
                        </div>
                    ))}
                    <Button onClick={handleCalculate} className="w-full">Calculate</Button>
                    {volume && (
                        <div className="pt-2">
                            <Label>Volume</Label>
                             <div className="font-mono text-lg p-2 bg-muted rounded-md text-center">
                                {volume} m³
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex justify-center items-center">
                    <VolumeDiagram shape={shape} className="w-48 h-48 text-foreground" />
                </div>
            </CardContent>
        </Card>
    );
};

const calculators: VolumeCalculatorProps[] = [
    {
        shape: 'Sphere',
        inputs: [{ name: 'r', label: 'Radius (r)' }],
        calculate: ({ r }) => (4/3) * Math.PI * Math.pow(r, 3),
    },
    {
        shape: 'Cone',
        inputs: [{ name: 'r', label: 'Base Radius (r)' }, { name: 'h', label: 'Height (h)' }],
        calculate: ({ r, h }) => (1/3) * Math.PI * Math.pow(r, 2) * h,
    },
    {
        shape: 'Cube',
        inputs: [{ name: 'a', label: 'Edge Length (a)' }],
        calculate: ({ a }) => Math.pow(a, 3),
    },
    {
        shape: 'Cylinder',
        inputs: [{ name: 'r', label: 'Base Radius (r)' }, { name: 'h', label: 'Height (h)' }],
        calculate: ({ r, h }) => Math.PI * Math.pow(r, 2) * h,
    },
    {
        shape: 'Rectangular Tank',
        inputs: [{ name: 'l', label: 'Length (l)' }, { name: 'w', label: 'Width (w)' }, { name: 'h', label: 'Height (h)' }],
        calculate: ({ l, w, h }) => l * w * h,
    },
    {
        shape: 'Capsule',
        inputs: [{ name: 'r', label: 'Base Radius (r)' }, { name: 'h', label: 'Height (h)' }],
        calculate: ({ r, h }) => (Math.PI * Math.pow(r, 2) * h) + ((4/3) * Math.PI * Math.pow(r, 3)),
    },
    {
        shape: 'Spherical Cap',
        inputs: [{ name: 'r', label: 'Base Radius (r)' }, { name: 'R', label: 'Ball Radius (R)' }, { name: 'h', label: 'Height (h)' }],
        calculate: ({ r, R, h }) => {
            if (!isNaN(h) && !isNaN(R)) {
                 return (1/3) * Math.PI * Math.pow(h, 2) * (3*R - h);
            }
            if (!isNaN(r) && !isNaN(h)) {
                return (1/6) * Math.PI * h * (3*Math.pow(r,2) + Math.pow(h,2));
            }
             if (!isNaN(r) && !isNaN(R)) {
                const h_calc = R - Math.sqrt(R*R - r*r);
                return (1/3) * Math.PI * Math.pow(h_calc, 2) * (3*R - h_calc);
            }
            throw new Error("Requires at least two values to calculate.")
        },
    },
    {
        shape: 'Conical Frustum',
        inputs: [{ name: 'r', label: 'Top Radius (r)' }, { name: 'R', label: 'Bottom Radius (R)' }, { name: 'h', label: 'Height (h)' }],
        calculate: ({ r, R, h }) => (1/3) * Math.PI * h * (Math.pow(r, 2) + r*R + Math.pow(R, 2)),
    },
    {
        shape: 'Ellipsoid',
        inputs: [{ name: 'a', label: 'Axis 1 (a)' }, { name: 'b', label: 'Axis 2 (b)' }, { name: 'c', label: 'Axis 3 (c)' }],
        calculate: ({ a, b, c }) => (4/3) * Math.PI * a * b * c,
    },
    {
        shape: 'Square Pyramid',
        inputs: [{ name: 'a', label: 'Base Edge (a)' }, { name: 'h', label: 'Height (h)' }],
        calculate: ({ a, h }) => (1/3) * Math.pow(a, 2) * h,
    },
     {
        shape: 'Tube',
        inputs: [{ name: 'd1', label: 'Outer Diameter (d1)' }, { name: 'd2', label: 'Inner Diameter (d2)' }, { name: 'l', label: 'Length (l)' }],
        calculate: ({ d1, d2, l }) => {
            if (d1 <= d2) throw new Error("Outer diameter must be greater than inner diameter.");
            return Math.PI * (Math.pow(d1/2, 2) - Math.pow(d2/2, 2)) * l;
        },
    },
];

export default function VolumeCalculator() {
    return (
        <div className="space-y-8">
            {calculators.map(calc => (
                <CalculatorCard key={calc.shape} {...calc} />
            ))}
        </div>
    );
}
