
"use client";

import { useState } from 'react';
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

    const calculate = () => {
        const { Nt, N0, t, t1_2 } = values;
        const numNt = Nt ? parseFloat(Nt) : NaN;
        const numN0 = N0 ? parseFloat(N0) : NaN;
        const numT = t ? parseFloat(t) : NaN;
        const numT1_2 = t1_2 ? parseFloat(t1_2) : NaN;

        const knownValues = [!isNaN(numNt), !isNaN(numN0), !isNaN(numT), !isNaN(numT1_2)].filter(Boolean).length;

        if (knownValues !== 3) {
            toast({
                variant: 'destructive',
                title: 'Invalid Input',
                description: 'Please provide exactly three values to calculate the fourth.',
            });
            return;
        }

        try {
            if (isNaN(numNt)) {
                const result = numN0 * Math.pow(0.5, numT / numT1_2);
                setValues(prev => ({ ...prev, Nt: result.toPrecision(5) }));
            } else if (isNaN(numN0)) {
                const result = numNt / Math.pow(0.5, numT / numT1_2);
                setValues(prev => ({ ...prev, N0: result.toPrecision(5) }));
            } else if (isNaN(numT)) {
                 if (numNt / numN0 <= 0) throw new Error("Ratio of quantities must be positive for log calculation.");
                const result = numT1_2 * (Math.log(numNt / numN0) / Math.log(0.5));
                setValues(prev => ({ ...prev, t: result.toPrecision(5) }));
            } else { // isNaN(numT1_2)
                if (numNt / numN0 <= 0) throw new Error("Ratio of quantities must be positive for log calculation.");
                const result = numT * (Math.log(0.5) / Math.log(numNt / numN0));
                setValues(prev => ({ ...prev, t1_2: result.toPrecision(5) }));
            }
        } catch (e: any) {
             toast({ variant: 'destructive', title: 'Calculation Error', description: e.message });
        }
    };

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
                        <Input id="Nt" type="number" value={values.Nt} onChange={(e) => setValues({ ...values, Nt: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="N0">Initial Quantity (N0)</Label>
                        <Input id="N0" type="number" value={values.N0} onChange={(e) => setValues({ ...values, N0: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="t">Time Elapsed (t)</Label>
                        <Input id="t" type="number" value={values.t} onChange={(e) => setValues({ ...values, t: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="t1_2">Half-Life (t½)</Label>
                        <Input id="t1_2" type="number" value={values.t1_2} onChange={(e) => setValues({ ...values, t1_2: e.target.value })} />
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button onClick={calculate} className="w-full">Calculate</Button>
                    <Button onClick={handleClear} variant="outline" className="w-full">Clear</Button>
                </div>
            </CardContent>
        </Card>
    );
}

function HalfLifeConversionCalculator() {
    const { toast } = useToast();
    const [values, setValues] = useState({ t1_2: '10', tau: '', lambda: '' });

    const calculate = (changed: 't1_2' | 'tau' | 'lambda') => {
        const { t1_2, tau, lambda } = values;
        const numT1_2 = parseFloat(t1_2);
        const numTau = parseFloat(tau);
        const numLambda = parseFloat(lambda);

        try {
            if (changed === 't1_2' && !isNaN(numT1_2)) {
                if (numT1_2 <= 0) throw new Error("Half-life must be positive.");
                setValues({ t1_2, tau: (numT1_2 / Math.LN2).toPrecision(5), lambda: (Math.LN2 / numT1_2).toPrecision(5) });
            } else if (changed === 'tau' && !isNaN(numTau)) {
                if (numTau <= 0) throw new Error("Mean lifetime must be positive.");
                setValues({ tau, t1_2: (numTau * Math.LN2).toPrecision(5), lambda: (1 / numTau).toPrecision(5) });
            } else if (changed === 'lambda' && !isNaN(numLambda)) {
                 if (numLambda <= 0) throw new Error("Decay constant must be positive.");
                setValues({ lambda, t1_2: (Math.LN2 / numLambda).toPrecision(5), tau: (1 / numLambda).toPrecision(5) });
            } else {
                 setValues({ t1_2: values.t1_2, tau: '', lambda: '' });
            }
        } catch(e: any) {
             toast({ variant: 'destructive', title: 'Calculation Error', description: e.message });
        }
    };

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
                        <Input id="conv-t1_2" type="number" value={values.t1_2} onChange={e => {setValues({ t1_2: e.target.value, tau: '', lambda: ''}); calculate('t1_2');}} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="conv-tau">Mean Lifetime (τ)</Label>
                        <Input id="conv-tau" type="number" value={values.tau} onChange={e => {setValues({ tau: e.target.value, t1_2: '', lambda: ''}); calculate('tau');}} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="conv-lambda">Decay Constant (λ)</Label>
                        <Input id="conv-lambda" type="number" value={values.lambda} onChange={e => {setValues({ lambda: e.target.value, t1_2: '', tau: ''}); calculate('lambda');}} />
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
