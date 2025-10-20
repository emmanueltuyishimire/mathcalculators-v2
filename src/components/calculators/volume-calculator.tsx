
"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { VolumeDiagram } from '@/components/volume-diagram';

interface VolumeCalculatorProps {
    shape: 'Sphere' | 'Cone' | 'Cube' | 'Cylinder' | 'Rectangular Tank' | 'Capsule' | 'Spherical Cap' | 'Conical Frustum' | 'Ellipsoid' | 'Square Pyramid' | 'Tube';
    inputs: { name: string; label: string; defaultValue: string }[];
    calculate: (inputs: { [key: string]: number }) => number | string;
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

const CalculatorCard: React.FC<VolumeCalculatorProps> = ({ shape, inputs, calculate }) => {
    const { toast } = useToast();
    const [inputValues, setInputValues] = useState<{ [key: string]: string }>(
        inputs.reduce((acc, input) => ({ ...acc, [input.name]: input.defaultValue }), {})
    );
    const [volume, setVolume] = useState<string>('');
    const [unit, setUnit] = useState<Unit>('Meter');

    const handleCalculate = () => {
        const conversionFactor = lengthUnits[unit];
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
            return { ...acc, [key]: isNaN(num) ? NaN : num * conversionFactor };
        }, {} as { [key: string]: number });
        
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
                if (Object.values(inputValues).some(v => v !== '')) {
                  toast({
                      variant: 'destructive',
                      title: 'Missing Inputs',
                      description: 'Please fill in all fields for the calculation.',
                  });
                }
                return;
            }
        }

        try {
            const resultInBaseUnit = calculate(parsedInputs);
            const resultInSelectedUnit = typeof resultInBaseUnit === 'number' ? resultInBaseUnit / Math.pow(conversionFactor, 3) : resultInBaseUnit;
            setVolume(typeof resultInSelectedUnit === 'number' ? resultInSelectedUnit.toFixed(4) : resultInSelectedUnit);
        } catch (e: any) {
            toast({
                variant: 'destructive',
                title: 'Calculation Error',
                description: e.message,
            });
            setVolume('');
        }
    };
    
    useEffect(() => {
        handleCalculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputValues, unit]);

    return (
        <Card className="overflow-hidden">
            <CardHeader className="p-4">
                <CardTitle>{shape} Volume Calculator</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                 <div className="flex justify-center items-center">
                    <VolumeDiagram shape={shape} />
                </div>
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
                    {volume && (
                        <div className="pt-2">
                            <Label>Volume</Label>
                             <div className="font-mono text-lg p-2 bg-muted rounded-md text-center">
                                {volume} {unitAbbreviations[unit]}³
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

const calculators: VolumeCalculatorProps[] = [
    {
        shape: 'Sphere',
        inputs: [{ name: 'r', label: 'Radius (r)', defaultValue: '5' }],
        calculate: ({ r }) => (4/3) * Math.PI * Math.pow(r, 3),
    },
    {
        shape: 'Cone',
        inputs: [{ name: 'r', label: 'Base Radius (r)', defaultValue: '3' }, { name: 'h', label: 'Height (h)', defaultValue: '10' }],
        calculate: ({ r, h }) => (1/3) * Math.PI * Math.pow(r, 2) * h,
    },
    {
        shape: 'Cube',
        inputs: [{ name: 'a', label: 'Edge Length (a)', defaultValue: '5' }],
        calculate: ({ a }) => Math.pow(a, 3),
    },
    {
        shape: 'Cylinder',
        inputs: [{ name: 'r', label: 'Base Radius (r)', defaultValue: '4' }, { name: 'h', label: 'Height (h)', defaultValue: '10' }],
        calculate: ({ r, h }) => Math.PI * Math.pow(r, 2) * h,
    },
    {
        shape: 'Rectangular Tank',
        inputs: [{ name: 'l', label: 'Length (l)', defaultValue: '10' }, { name: 'w', label: 'Width (w)', defaultValue: '5' }, { name: 'h', label: 'Height (h)', defaultValue: '3' }],
        calculate: ({ l, w, h }) => l * w * h,
    },
    {
        shape: 'Capsule',
        inputs: [{ name: 'r', label: 'Radius (r)', defaultValue: '3' }, { name: 'h', label: 'Cylinder Height (h)', defaultValue: '10' }],
        calculate: ({ r, h }) => (Math.PI * Math.pow(r, 2) * h) + ((4/3) * Math.PI * Math.pow(r, 3)),
    },
    {
        shape: 'Spherical Cap',
        inputs: [{ name: 'r', label: 'Base Radius (r)', defaultValue: '3' }, { name: 'R', label: 'Ball Radius (R)', defaultValue: '5' }, { name: 'h', label: 'Height (h)', defaultValue: '' }],
        calculate: ({ r, R, h }) => {
            if (!isNaN(h) && !isNaN(R)) {
                 if (h > 2 * R) throw new Error("Height cannot be greater than the sphere's diameter.");
                 return (1/3) * Math.PI * Math.pow(h, 2) * (3*R - h);
            }
            if (!isNaN(r) && !isNaN(h)) {
                return (1/6) * Math.PI * h * (3*Math.pow(r,2) + Math.pow(h,2));
            }
             if (!isNaN(r) && !isNaN(R)) {
                if (r > R) throw new Error("Base radius cannot be greater than ball radius.");
                const h_calc = R - Math.sqrt(R*R - r*r);
                return (1/3) * Math.PI * Math.pow(h_calc, 2) * (3*R - h_calc);
            }
            throw new Error("Requires at least two values to calculate.")
        },
    },
    {
        shape: 'Conical Frustum',
        inputs: [{ name: 'r', label: 'Top Radius (r)', defaultValue: '3' }, { name: 'R', label: 'Bottom Radius (R)', defaultValue: '5' }, { name: 'h', label: 'Height (h)', defaultValue: '10' }],
        calculate: ({ r, R, h }) => (1/3) * Math.PI * h * (Math.pow(R, 2) + R*r + Math.pow(r, 2)),
    },
    {
        shape: 'Ellipsoid',
        inputs: [{ name: 'a', label: 'Axis 1 (a)', defaultValue: '3' }, { name: 'b', label: 'Axis 2 (b)', defaultValue: '4' }, { name: 'c', label: 'Axis 3 (c)', defaultValue: '5' }],
        calculate: ({ a, b, c }) => (4/3) * Math.PI * a * b * c,
    },
    {
        shape: 'Square Pyramid',
        inputs: [{ name: 'a', label: 'Base Edge (a)', defaultValue: '6' }, { name: 'h', label: 'Height (h)', defaultValue: '10' }],
        calculate: ({ a, h }) => (1/3) * Math.pow(a, 2) * h,
    },
     {
        shape: 'Tube',
        inputs: [{ name: 'd1', label: 'Outer Diameter (d1)', defaultValue: '10' }, { name: 'd2', label: 'Inner Diameter (d2)', defaultValue: '8' }, { name: 'l', label: 'Length (l)', defaultValue: '20' }],
        calculate: ({ d1, d2, l }) => {
            if (d1 <= d2) throw new Error("Outer diameter must be greater than inner diameter.");
            return (Math.PI * l / 4) * (Math.pow(d1, 2) - Math.pow(d2, 2));
        },
    },
];

export default function VolumeCalculator() {
    return (
        <div className="space-y-4">
            {calculators.map(calc => (
                <CalculatorCard key={calc.shape} {...calc} />
            ))}
        </div>
    );
}
