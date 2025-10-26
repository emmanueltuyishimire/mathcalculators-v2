
"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AreaCalculatorProps {
    shape: 'Rectangle' | 'Triangle' | 'Trapezoid' | 'Circle' | 'Sector' | 'Ellipse' | 'Parallelogram';
    inputs: { name: string; label: string; defaultValue: string; }[];
    calculate: (inputs: { [key: string]: number }) => number | string;
}

const lengthUnits = {
    Meter: 1,
    Centimeter: 0.01,
    Millimeter: 0.001,
    Kilometer: 1000,
    Foot: 0.3048,
    Inch: 0.0254,
    Yard: 0.9144,
};

const unitAbbreviations: { [key: string]: string } = {
    Meter: 'm',
    Centimeter: 'cm',
    Millimeter: 'mm',
    Kilometer: 'km',
    Foot: 'ft',
    Inch: 'in',
    Yard: 'yd',
};

type Unit = keyof typeof lengthUnits;

const CalculatorCard: React.FC<AreaCalculatorProps> = ({ shape, inputs, calculate }) => {
    const { toast } = useToast();
    const [inputValues, setInputValues] = useState<{ [key: string]: string }>(
        inputs.reduce((acc, input) => ({ ...acc, [input.name]: input.defaultValue }), {})
    );
    const [area, setArea] = useState<string>('');
    const [unit, setUnit] = useState<Unit>('Meter');

    const handleCalculate = () => {
        const conversionFactor = lengthUnits[unit];
        try {
            const parsedInputs = Object.entries(inputValues).reduce((acc, [key, value]) => {
                const num = parseFloat(value);
                if (isNaN(num)) {
                    throw new Error(`Invalid input for ${key}`);
                }
                return { ...acc, [key]: num * conversionFactor };
            }, {} as { [key: string]: number });

            const resultInBaseUnit = calculate(parsedInputs);
            const resultInSelectedUnit = typeof resultInBaseUnit === 'number' ? resultInBaseUnit / Math.pow(conversionFactor, 2) : resultInBaseUnit;
            setArea(typeof resultInSelectedUnit === 'number' ? resultInSelectedUnit.toFixed(4) : resultInSelectedUnit);
        } catch (e: any) {
            toast({
                variant: 'destructive',
                title: 'Calculation Error',
                description: e.message,
            });
            setArea('');
        }
    };
    
    useEffect(() => {
        setArea('');
    }, [unit]);

    return (
        <Card className="overflow-hidden">
            <CardHeader className="p-4">
                <CardTitle>{shape} Area Calculator</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
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
                    {area && (
                        <div className="pt-2">
                            <Label>Area</Label>
                             <div className="font-mono text-lg p-2 bg-muted rounded-md text-center">
                                {area} {unitAbbreviations[unit]}²
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

const calculators: AreaCalculatorProps[] = [
    {
        shape: 'Rectangle',
        inputs: [{ name: 'l', label: 'Length (l)', defaultValue: '10' }, { name: 'w', label: 'Width (w)', defaultValue: '5' }],
        calculate: ({ l, w }) => l * w,
    },
    {
        shape: 'Triangle',
        inputs: [{ name: 'a', label: 'Edge 1 (a)', defaultValue: '5' }, { name: 'b', label: 'Edge 2 (b)', defaultValue: '6' }, { name: 'c', label: 'Edge 3 (c)', defaultValue: '7' }],
        calculate: ({ a, b, c }) => {
            if (a + b <= c || a + c <= b || b + c <= a) {
                throw new Error("Invalid triangle: The sum of any two sides must be greater than the third.");
            }
            const s = (a + b + c) / 2;
            return Math.sqrt(s * (s - a) * (s - b) * (s - c)); // Heron's formula
        },
    },
    {
        shape: 'Trapezoid',
        inputs: [{ name: 'b1', label: 'Base 1 (b1)', defaultValue: '5' }, { name: 'b2', label: 'Base 2 (b2)', defaultValue: '10' }, { name: 'h', label: 'Height (h)', defaultValue: '4' }],
        calculate: ({ b1, b2, h }) => ((b1 + b2) / 2) * h,
    },
    {
        shape: 'Circle',
        inputs: [{ name: 'r', label: 'Radius (r)', defaultValue: '5' }],
        calculate: ({ r }) => Math.PI * Math.pow(r, 2),
    },
    {
        shape: 'Sector',
        inputs: [{ name: 'r', label: 'Radius (r)', defaultValue: '5' }, { name: 'A', label: 'Angle (A) in degrees', defaultValue: '60' }],
        calculate: ({ r, A }) => (A / 360) * Math.PI * Math.pow(r, 2),
    },
    {
        shape: 'Ellipse',
        inputs: [{ name: 'a', label: 'Semi-major Axis (a)', defaultValue: '10' }, { name: 'b', label: 'Semi-minor Axis (b)', defaultValue: '5' }],
        calculate: ({ a, b }) => Math.PI * a * b,
    },
     {
        shape: 'Parallelogram',
        inputs: [{ name: 'b', label: 'Base (b)', defaultValue: '10' }, { name: 'h', label: 'Height (h)', defaultValue: '5' }],
        calculate: ({ b, h }) => b * h,
    },
];

export default function AreaCalculator() {
    return (
        <div className="space-y-4">
            {calculators.map(calc => (
                <CalculatorCard key={calc.shape} {...calc} />
            ))}
        </div>
    );
}
