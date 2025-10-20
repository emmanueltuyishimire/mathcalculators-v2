"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { solveRightTriangle } from '@/lib/trig';
import { RightTriangleDiagram } from '@/components/right-triangle-diagram';

interface Result {
  a: number; b: number; c: number;
  A: number; B: number; C: number;
}

export default function RightTriangleSolver() {
    const { toast } = useToast();
    const [values, setValues] = useState({ a: '', b: '', c: '', A: '', B: '' });
    const [result, setResult] = useState<Result | null>(null);

    const calculate = () => {
        const parse = (val: string) => val ? parseFloat(val) : null;
        
        const knownValues = {
            a: parse(values.a),
            b: parse(values.b),
            c: parse(values.c),
            A: parse(values.A),
            B: parse(values.B),
        };

        try {
            const solution = solveRightTriangle(knownValues);
            setResult(solution);
        } catch (e: any) {
            if (Object.values(values).some(v => v)) {
                toast({ variant: 'destructive', title: 'Calculation Error', description: e.message });
            }
            setResult(null);
        }
    }

    const handleClear = () => {
        setValues({ a: '', b: '', c: '', A: '', B: ''});
        setResult(null);
    }
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Right Triangle Solver</CardTitle>
                <CardDescription>Enter any two values (at least one side) to solve the triangle.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="rt-a">Side a</Label>
                            <Input id="rt-a" value={values.a} onChange={e => setValues({...values, a:e.target.value})}/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="rt-b">Side b</Label>
                            <Input id="rt-b" value={values.b} onChange={e => setValues({...values, b:e.target.value})}/>
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="rt-c">Hypotenuse c</Label>
                        <Input id="rt-c" value={values.c} onChange={e => setValues({...values, c:e.target.value})}/>
                    </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="rt-A">Angle α (°)</Label>
                            <Input id="rt-A" value={values.A} onChange={e => setValues({...values, A:e.target.value})}/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="rt-B">Angle β (°)</Label>
                            <Input id="rt-B" value={values.B} onChange={e => setValues({...values, B:e.target.value})}/>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button onClick={calculate} className="w-full">Solve</Button>
                        <Button variant="outline" onClick={handleClear} className="w-full">Clear</Button>
                    </div>
                </div>
                 <div className="flex justify-center items-center">
                    <RightTriangleDiagram />
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
                            <p>Angle α: {result.A.toFixed(4)}°</p>
                            <p>Angle β: {result.B.toFixed(4)}°</p>
                            <p>Angle γ: 90°</p>
                        </div>
                    </div>
                </CardFooter>
            )}
        </Card>
    );
}
