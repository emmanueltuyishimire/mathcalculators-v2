
"use client";

import { useState, useEffect, ChangeEvent } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

type CircleProperty = 'radius' | 'diameter' | 'circumference' | 'area';

interface CircleValues {
    radius: string;
    diameter: string;
    circumference: string;
    area: string;
}

export default function CircleCalculator() {
    const { toast } = useToast();
    const [values, setValues] = useState<CircleValues>({
        radius: '1',
        diameter: '',
        circumference: '',
        area: ''
    });

    const calculateFrom = (changedProperty: CircleProperty, value: string) => {
        const numValue = parseFloat(value);
        if (value === '' || isNaN(numValue) || numValue < 0) {
            if (value !== '' && (isNaN(numValue) || numValue < 0)) {
                toast({
                    variant: 'destructive',
                    title: 'Invalid Input',
                    description: 'Please enter a non-negative number.',
                });
            }
             // Clear other fields if input is invalid or empty
            const newValues: CircleValues = { radius: '', diameter: '', circumference: '', area: '' };
            newValues[changedProperty] = value;
            setValues(newValues);
            return;
        }

        let r = 0;
        switch (changedProperty) {
            case 'radius':
                r = numValue;
                break;
            case 'diameter':
                r = numValue / 2;
                break;
            case 'circumference':
                r = numValue / (2 * Math.PI);
                break;
            case 'area':
                r = Math.sqrt(numValue / Math.PI);
                break;
        }
        
        if (isNaN(r) || r < 0) {
             const newValues: CircleValues = { radius: '', diameter: '', circumference: '', area: '' };
             newValues[changedProperty] = value;
             setValues(newValues);
            return;
        }

        const d = r * 2;
        const c = 2 * Math.PI * r;
        const a = Math.PI * Math.pow(r, 2);

        setValues({
            radius: r.toFixed(5),
            diameter: d.toFixed(5),
            circumference: c.toFixed(5),
            area: a.toFixed(5),
        });
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const changedProperty = name as CircleProperty;
        calculateFrom(changedProperty, value);
    };

    useEffect(() => {
        calculateFrom('radius', '1');
    }, []);

    return (
        <Card className="shadow-lg">
            <CardContent className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="radius">Radius (r)</Label>
                    <Input id="radius" name="radius" type="number" value={values.radius} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="diameter">Diameter (d)</Label>
                    <Input id="diameter" name="diameter" type="number" value={values.diameter} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="circumference">Circumference (C)</Label>
                    <Input id="circumference" name="circumference" type="number" value={values.circumference} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="area">Area (A)</Label>
                    <Input id="area" name="area" type="number" value={values.area} onChange={handleInputChange} />
                </div>
            </CardContent>
        </Card>
    );
}
