
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { solveObliqueTriangle } from '@/lib/trig';

interface Result {
  a: number; b: number; c: number;
  A: number; B: number; C: number;
}

export default function ObliqueTriangleSolver() {
    const { toast } = useToast();
    const [values, setValues] = useState({ a: '', b: '10', c: '', A: '30', B: '', C: '' });
    const [result, setResult] = useState<Result | null>(null);

    const calculate = () => {
        const parse = (val: string) => val ? parseFloat(val) : null;
        
        const knownValues = {
            a: parse(values.a), b: parse(values.b), c: parse(values.c),
            A: parse(values.A), B: parse(values.B), C: parse(values.C),
        };

        try {
            const solution = solveObliqueTriangle(knownValues);
            setResult(solution);
        } catch (e: any) {
            toast({ variant: 'destructive', title: 'Calculation Error', description: e.message });
            setResult(null);
        }
    }
    
    const handleClear = () => {
        setValues({ a: '', b: '', c: '', A: '', B: '', C: ''});
        setResult(null);
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Oblique Triangle Solver</CardTitle>
                <CardDescription>Uses Law of Sines and Cosines. Enter any three values (at least one side).</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="ob-a">Side a</Label>
                    <Input id="ob-a" value={values.a} onChange={e => setValues({...values, a:e.target.value})}/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="ob-A">Angle A (°)</Label>
                    <Input id="ob-A" value={values.A} onChange={e => setValues({...values, A:e.target.value})}/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="ob-b">Side b</Label>
                    <Input id="ob-b" value={values.b} onChange={e => setValues({...values, b:e.target.value})}/>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="ob-B">Angle B (°)</Label>
                    <Input id="ob-B" value={values.B} onChange={e => setValues({...values, B:e.target.value})}/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="ob-c">Side c</Label>
                    <Input id="ob-c" value={values.c} onChange={e => setValues({...values, c:e.target.value})}/>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="ob-C">Angle C (°)</Label>
                    <Input id="ob-C" value={values.C} onChange={e => setValues({...values, C:e.target.value})}/>
                </div>
                <div className="col-span-2 flex gap-2">
                    <Button onClick={calculate} className="w-full">Solve</Button>
                    <Button variant="outline" onClick={handleClear} className="w-full">Clear</Button>
                </div>
            </CardContent>
             {result && (
                <CardFooter>
                    <div className="w-full p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-md">
                        <h4 className="font-semibold mb-2">Solution</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm font-mono">
                            <p>Side a: {result.a.toFixed(4)}</p>
                            <p>Side b: {result.b.toFixed(4)}</p>
                            <p>Side c: {result.c.toFixed(4)}</p>
                            <p>Angle A: {result.A.toFixed(4)}°</p>
                            <p>Angle B: {result.B.toFixed(4)}°</p>
                            <p>Angle C: {result.C.toFixed(4)}°</p>
                        </div>
                    </div>
                </CardFooter>
            )}
        </Card>
    );
}
