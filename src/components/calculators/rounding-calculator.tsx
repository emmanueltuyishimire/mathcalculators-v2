
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

type RoundingMethod = 
  | 'half-up' | 'half-down' | 'up' | 'down' | 'half-even' | 'half-odd' 
  | 'half-away-zero' | 'half-towards-zero';

const precisionOptions: { [key: string]: number } = {
    'Thousands': -3,
    'Hundreds': -2,
    'Tens': -1,
    'Ones': 0,
    'Tenths': 1,
    'Hundredths': 2,
    'Thousandths': 3,
};

export default function RoundingCalculator() {
    const { toast } = useToast();
    const [number, setNumber] = useState('');
    const [method, setMethod] = useState<RoundingMethod>('half-up');
    const [precision, setPrecision] = useState('0'); // Default to Ones
    const [result, setResult] = useState('');

    useEffect(() => {
        calculate();
    }, [number, method, precision]);
    
    const calculate = () => {
        const num = parseFloat(number);
        const prec = parseInt(precision);

        if (isNaN(num)) {
            if (number) toast({ variant: 'destructive', title: 'Invalid Number', description: 'Please enter a valid number to round.'});
            setResult('');
            return;
        }

        if (isNaN(prec)) {
             toast({ variant: 'destructive', title: 'Invalid Precision', description: 'Please select or enter a valid precision level.'});
             setResult('');
             return;
        }

        const factor = Math.pow(10, prec);
        const val = num * factor;
        let roundedVal: number;

        const floor = Math.floor(val);
        const ceil = Math.ceil(val);
        const diff = val - floor;

        switch (method) {
            case 'half-up':
                roundedVal = Math.round(val);
                break;
            case 'half-down':
                roundedVal = diff <= 0.5 ? floor : ceil;
                break;
            case 'up': // Ceiling
                roundedVal = ceil;
                break;
            case 'down': // Floor
                roundedVal = floor;
                break;
            case 'half-even':
                if (diff !== 0.5) roundedVal = Math.round(val);
                else roundedVal = floor % 2 === 0 ? floor : ceil;
                break;
            case 'half-odd':
                if (diff !== 0.5) roundedVal = Math.round(val);
                else roundedVal = floor % 2 !== 0 ? floor : ceil;
                break;
            case 'half-away-zero':
                 if (diff !== 0.5) roundedVal = Math.round(val);
                 else roundedVal = num > 0 ? ceil : floor;
                break;
            case 'half-towards-zero':
                if (diff !== 0.5) roundedVal = Math.round(val);
                 else roundedVal = num > 0 ? floor : ceil;
                break;
            default:
                roundedVal = Math.round(val);
        }

        setResult((roundedVal / factor).toFixed(Math.max(0, prec)));
    };


    return (
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle>Rounding Calculator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="number-input">Number to Round</Label>
                    <Input id="number-input" type="number" value={number} onChange={e => setNumber(e.target.value)} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="method-select">Rounding Method</Label>
                        <Select value={method} onValueChange={v => setMethod(v as RoundingMethod)}>
                            <SelectTrigger id="method-select"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="half-up">Round half up</SelectItem>
                                <SelectItem value="half-down">Round half down</SelectItem>
                                <SelectItem value="up">Round up (Ceiling)</SelectItem>
                                <SelectItem value="down">Round down (Floor)</SelectItem>
                                <SelectItem value="half-even">Round half to even</SelectItem>
                                <SelectItem value="half-odd">Round half to odd</SelectItem>
                                <SelectItem value="half-away-zero">Round half away from zero</SelectItem>
                                <SelectItem value="half-towards-zero">Round half towards zero</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="precision-select">Precision</Label>
                        <Select value={precision} onValueChange={setPrecision}>
                            <SelectTrigger id="precision-select"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                {Object.entries(precisionOptions).map(([label, value]) => (
                                    <SelectItem key={label} value={String(value)}>{label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardContent>
            {result && (
                <CardFooter>
                     <div className="w-full space-y-2">
                        <Label>Result</Label>
                        <div className="p-4 bg-muted rounded-md text-center font-mono text-2xl font-bold">{result}</div>
                     </div>
                </CardFooter>
            )}
        </Card>
    );
}
