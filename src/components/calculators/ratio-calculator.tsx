
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

function ProportionCalculator() {
    const { toast } = useToast();
    const [values, setValues] = useState({ a: '3', b: '4', c: '600', d: '' });

    const calculate = () => {
        const a = parseFloat(values.a);
        const b = parseFloat(values.b);
        const c = parseFloat(values.c);
        const d = parseFloat(values.d);
        
        const knownCount = [!isNaN(a), !isNaN(b), !isNaN(c), !isNaN(d)].filter(Boolean).length;
        if (knownCount !== 3) {
            toast({
                variant: 'destructive',
                title: "Invalid Input",
                description: "Please provide exactly three values to calculate the fourth.",
            });
            return;
        }

        try {
            let newValues = {...values};
            if (isNaN(d)) {
                if (a === 0) throw new Error("A cannot be zero if D is unknown.");
                newValues.d = ((b * c) / a).toString();
            } else if (isNaN(c)) {
                if (b === 0) throw new Error("B cannot be zero if C is unknown.");
                newValues.c = ((a * d) / b).toString();
            } else if (isNaN(b)) {
                if (c === 0) throw new Error("C cannot be zero if B is unknown.");
                newValues.b = ((a * d) / c).toString();
            } else { // a is unknown
                if (d === 0) throw new Error("D cannot be zero if A is unknown.");
                newValues.a = ((b * c) / d).toString();
            }
            setValues(newValues);
        } catch(e: any) {
            toast({ variant: 'destructive', title: "Calculation Error", description: e.message });
        }
    };

    useEffect(() => {
        calculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Ratio Proportion Calculator</CardTitle>
                <CardDescription>Please provide any three values below to calculate the fourth in the ratio A:B = C:D.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-wrap items-center justify-center gap-2 text-lg font-bold">
                    <Input className="w-20 text-center" type="number" value={values.a} onChange={e => setValues({...values, a: e.target.value})} aria-label="Value A" />
                    <span>:</span>
                    <Input className="w-20 text-center" type="number" value={values.b} onChange={e => setValues({...values, b: e.target.value})} aria-label="Value B" />
                    <span>=</span>
                    <Input className="w-20 text-center" type="number" value={values.c} onChange={e => setValues({...values, c: e.target.value})} aria-label="Value C" />
                    <span>:</span>
                    <Input className="w-20 text-center" type="number" value={values.d} onChange={e => setValues({...values, d: e.target.value})} aria-label="Value D" />
                </div>
                <Button onClick={calculate} className="w-full">Calculate</Button>
            </CardContent>
        </Card>
    );
}

function RatioScalingCalculator() {
    const { toast } = useToast();
    const [valA, setValA] = useState('250');
    const [valB, setValB] = useState('280');
    const [factor, setFactor] = useState('2.5');
    const [operation, setOperation] = useState<'shrink' | 'enlarge'>('shrink');
    const [result, setResult] = useState<string>('');

    const calculate = () => {
        const a = parseFloat(valA);
        const b = parseFloat(valB);
        const f = parseFloat(factor);

        if (isNaN(a) || isNaN(b) || isNaN(f) || f <= 0) {
            toast({ variant: 'destructive', title: "Invalid Input", description: "Please enter valid numbers. Factor must be positive." });
            return;
        }

        let resA, resB;
        if (operation === 'shrink') {
            resA = a / f;
            resB = b / f;
        } else {
            resA = a * f;
            resB = b * f;
        }
        setResult(`${resA.toFixed(4)} : ${resB.toFixed(4)}`);
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Ratio Scaling Calculator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-wrap items-center justify-center gap-2 text-lg font-bold">
                    <Input className="w-24 text-center" type="number" value={valA} onChange={e => setValA(e.target.value)} aria-label="Scaling Value A" />
                    <span>:</span>
                    <Input className="w-24 text-center" type="number" value={valB} onChange={e => setValB(e.target.value)} aria-label="Scaling Value B" />
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2">
                     <Select value={operation} onValueChange={v => setOperation(v as 'shrink' | 'enlarge')}>
                        <SelectTrigger className="w-[120px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="shrink">Shrink</SelectItem>
                            <SelectItem value="enlarge">Enlarge</SelectItem>
                        </SelectContent>
                    </Select>
                    <Input className="w-24" type="number" value={factor} onChange={e => setFactor(e.target.value)} aria-label="Scaling factor" />
                    <span>times = ?</span>
                </div>
                 <Button onClick={calculate} className="w-full">Calculate</Button>
                 {result && (
                     <div className="pt-2">
                        <Label>Result</Label>
                        <Input readOnly value={result} className="bg-muted text-center font-semibold" />
                    </div>
                 )}
            </CardContent>
        </Card>
    )
}

export default function RatioCalculator() {
    return (
        <div className="space-y-8">
            <ProportionCalculator />
            <RatioScalingCalculator />
        </div>
    );
}
