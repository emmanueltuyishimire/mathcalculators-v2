
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ArrowRightLeft } from 'lucide-react';

function HalfLifeDecayCalculator() {
    const { toast } = useToast();
    const [values, setValues] = useState({
        Nt: '10',
        N0: '100',
        t: '50',
        t1_2: '',
    });
    const [fieldToSolve, setFieldToSolve] = useState<'Nt' | 'N0' | 't' | 't1_2'>('t1_2');

    const handleInputChange = (field: keyof typeof values, value: string) => {
        const newValues = { ...values, [field]: value };
        
        const emptyFields = (Object.keys(newValues) as Array<keyof typeof values>).filter(key => newValues[key] === '');
        
        if (emptyFields.length === 1) {
            setFieldToSolve(emptyFields[0]);
        }
        
        setValues(newValues);
    };

    const calculate = () => {
        const { Nt, N0, t, t1_2 } = values;
        
        const numNt = Nt ? parseFloat(Nt) : NaN;
        const numN0 = N0 ? parseFloat(N0) : NaN;
        const numT = t ? parseFloat(t) : NaN;
        const numT1_2 = t1_2 ? parseFloat(t1_2) : NaN;
        
        const knownValues = [!isNaN(numNt), !isNaN(numN0), !isNaN(numT), !isNaN(numT1_2)].filter(Boolean).length;

        if (knownValues !== 3) {
            return; // Not enough info to calculate, or too much
        }
        
        try {
            let newValues = { ...values };
            const currentFieldToSolve = (Object.keys(values) as Array<keyof typeof values>).find(key => values[key] === '') as 'Nt' | 'N0' | 't' | 't1_2' | undefined;
            
            if (!currentFieldToSolve) return;

            if (currentFieldToSolve === 'Nt') {
                const result = numN0 * Math.pow(0.5, numT / numT1_2);
                newValues.Nt = result.toPrecision(5);
            } else if (currentFieldToSolve === 'N0') {
                const result = numNt / Math.pow(0.5, numT / numT1_2);
                newValues.N0 = result.toPrecision(5);
            } else if (currentFieldToSolve === 't') {
                 if (numNt <= 0 || numN0 <=0 || numNt / numN0 <= 0) throw new Error("Quantities must be positive for log calculation.");
                const result = numT1_2 * (Math.log(numNt / numN0) / Math.log(0.5));
                newValues.t = result.toPrecision(5);
            } else if (currentFieldToSolve === 't1_2') {
                if (numNt <= 0 || numN0 <=0 || numNt / numN0 <= 0) throw new Error("Quantities must be positive for log calculation.");
                const result = numT * (Math.log(0.5) / Math.log(numNt / numN0));
                 if (result < 0) throw new Error("Inputs result in a negative half-life. Please check values.");
                newValues.t1_2 = result.toPrecision(5);
            }
            
            setValues(newValues);

        } catch (e: any) {
             toast({ variant: 'destructive', title: 'Calculation Error', description: e.message });
        }
    };
    
    useEffect(() => {
        calculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [values]);

    const handleClear = () => {
      setValues({ Nt: '', N0: '', t: '', t1_2: '' });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Half-Life Decay Formula</CardTitle>
                <CardDescription>Nt = N0 × (1/2)^(t/t½)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="Nt">Quantity Remains (Nt)</Label>
                        <Input id="Nt" type="number" value={values.Nt} onChange={(e) => handleInputChange('Nt', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="N0">Initial Quantity (N0)</Label>
                        <Input id="N0" type="number" value={values.N0} onChange={(e) => handleInputChange('N0', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="t">Time Elapsed (t)</Label>
                        <Input id="t" type="number" value={values.t} onChange={(e) => handleInputChange('t', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="t1_2">Half-Life (t½)</Label>
                        <Input id="t1_2" type="number" value={values.t1_2} onChange={(e) => handleInputChange('t1_2', e.target.value)} />
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button onClick={handleClear} variant="outline" className="w-full">Clear</Button>
                </div>
            </CardContent>
        </Card>
    );
}

function HalfLifeConversionCalculator() {
    const { toast } = useToast();
    const [values, setValues] = useState({ t1_2: '10', tau: '', lambda: '' });

    const calculate = (changed: 't1_2' | 'tau' | 'lambda', value: string) => {
        const numValue = parseFloat(value);
        if (isNaN(numValue)) {
            setValues({ t1_2: changed === 't1_2' ? value : '', tau: changed === 'tau' ? value : '', lambda: changed === 'lambda' ? value : '' });
            return;
        }

        try {
            if (changed === 't1_2') {
                if (numValue <= 0) throw new Error("Half-life must be positive.");
                setValues({ t1_2: value, tau: (numValue / Math.LN2).toPrecision(5), lambda: (Math.LN2 / numValue).toPrecision(5) });
            } else if (changed === 'tau') {
                if (numValue <= 0) throw new Error("Mean lifetime must be positive.");
                setValues({ tau: value, t1_2: (numValue * Math.LN2).toPrecision(5), lambda: (1 / numValue).toPrecision(5) });
            } else if (changed === 'lambda') {
                 if (numValue <= 0) throw new Error("Decay constant must be positive.");
                setValues({ lambda: value, t1_2: (Math.LN2 / numValue).toPrecision(5), tau: (1 / numValue).toPrecision(5) });
            }
        } catch(e: any) {
             toast({ variant: 'destructive', title: 'Calculation Error', description: e.message });
        }
    };
    
    // Initial calculation
    useEffect(() => {
        calculate('t1_2', '10');
    }, []);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Half-Life, Mean Lifetime & Decay Constant</CardTitle>
                 <CardDescription>Provide one value to calculate the others.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                    <div className="space-y-2">
                        <Label htmlFor="conv-t1_2">Half-Life (t½)</Label>
                        <Input id="conv-t1_2" type="number" value={values.t1_2} onChange={e => calculate('t1_2', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="conv-tau">Mean Lifetime (τ)</Label>
                        <Input id="conv-tau" type="number" value={values.tau} onChange={e => calculate('tau', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="conv-lambda">Decay Constant (λ)</Label>
                        <Input id="conv-lambda" type="number" value={values.lambda} onChange={e => calculate('lambda', e.target.value)} />
                    </div>
                </div>
                 <CardDescription className="text-xs pt-2">
                     τ = t½ / ln(2), λ = ln(2) / t½
                </CardDescription>
            </CardContent>
        </Card>
    );
}

export default function HalfLifeCalculator() {
    return (
        <div className="space-y-8">
            <HalfLifeDecayCalculator />
            <HalfLifeConversionCalculator />
        </div>
    );
}
