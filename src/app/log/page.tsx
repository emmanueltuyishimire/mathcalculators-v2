"use client";

import React, { useState } from 'react';
import { PageHeader } from '@/components/page-header';
import LogCalculator from '@/components/calculators/log-calculator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';


const LogEquationCalculator = () => {
    const { toast } = useToast();
    const [base, setBase] = useState('');
    const [number, setNumber] = useState('');
    const [result, setResult] = useState('');
    
    const handleInputChange = (field: 'base' | 'number' | 'result', value: string) => {
        const newValues = { base, number, result };
        newValues[field] = value;
        
        const emptyFields = Object.keys(newValues).filter(key => newValues[key as keyof typeof newValues] === '');
        
        if (field === 'base') setBase(value);
        if (field === 'number') setNumber(value);
        if (field === 'result') setResult(value);

        if (emptyFields.length !== 1) {
            setBase(field === 'base' ? value : '');
            setNumber(field === 'number' ? value : '');
            setResult(field === 'result' ? value : '');
        }
    }


    const calculate = () => {
        const baseVal = base.toLowerCase() === 'e' ? Math.E : parseFloat(base);
        const numberVal = parseFloat(number);
        const resultVal = parseFloat(result);

        const knownValues = [!isNaN(baseVal), !isNaN(numberVal), !isNaN(resultVal)].filter(Boolean).length;

        if (knownValues !== 2) {
            toast({
                variant: 'destructive',
                title: 'Invalid Input',
                description: 'Please provide exactly two values to solve for the third.',
            });
            return;
        }

        try {
            if (isNaN(resultVal)) { // Calculate result (y)
                if(baseVal <= 0 || baseVal === 1 || numberVal <= 0) throw new Error("Logarithm requires base > 0 (and not 1) and number > 0.");
                setResult((Math.log(numberVal) / Math.log(baseVal)).toString());
            } else if (isNaN(numberVal)) { // Calculate number (x)
                setNumber(Math.pow(baseVal, resultVal).toString());
            } else { // Calculate base (b)
                if(numberVal < 0 && resultVal % 2 === 0) throw new Error("Cannot take an even root of a negative number.");
                setBase(Math.pow(numberVal, 1 / resultVal).toString());
            }
        } catch (e: any) {
            toast({
                variant: 'destructive',
                title: 'Calculation Error',
                description: e.message,
            });
        }
    };
    
    const handleClear = () => {
        setBase('');
        setNumber('');
        setResult('');
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Logarithm Equation Solver</CardTitle>
                <CardDescription>Solves for any variable in the equation log<sub>b</sub>(x) = y. Provide any two values.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-wrap items-end gap-2 text-lg font-semibold">
                    <span className="mb-2">log</span>
                    <div className="relative">
                        <Input id="base" value={base} onChange={(e) => handleInputChange('base', e.target.value)} className="w-20 text-sm text-center pt-5"/>
                        <Label htmlFor="base" className="absolute text-xs left-1/2 -translate-x-1/2 top-1 text-muted-foreground">base (b)</Label>
                    </div>
                     <div className="relative">
                        <Input id="number" value={number} onChange={(e) => handleInputChange('number', e.target.value)} className="w-24 text-center"/>
                        <Label htmlFor="number" className="absolute text-xs left-1/2 -translate-x-1/2 -top-4 text-muted-foreground">number (x)</Label>
                    </div>
                    <span>=</span>
                     <div className="relative">
                        <Input id="result" value={result} onChange={(e) => handleInputChange('result', e.target.value)} className="w-24 text-center"/>
                        <Label htmlFor="result" className="absolute text-xs left-1/2 -translate-x-1/2 -top-4 text-muted-foreground">result (y)</Label>
                    </div>
                </div>
                 <div className="flex gap-2">
                    <Button onClick={calculate} className="w-full">Calculate</Button>
                    <Button onClick={handleClear} variant="outline" className="w-full">Clear</Button>
                </div>
            </CardContent>
        </Card>
    )
}

const HowToUseGuide = () => (
    <Card>
      <CardHeader>
        <CardTitle>How to Use the Calculators</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-muted-foreground">
        <div>
            <h3 className="font-semibold text-foreground text-lg">Scientific Log Calculator</h3>
            <ol className="list-decimal list-inside space-y-2 mt-2">
            <li>
                <strong>Basic Calculations:</strong> Use the number keys to enter values. Use <code className="font-mono bg-muted p-1 rounded-md">log</code> for base 10, <code className="font-mono bg-muted p-1 rounded-md">ln</code> for base e.
                <br />
                <em>Example: To find log(100), press <code className="font-mono bg-muted p-1 rounded-md">log</code>, then <code className="font-mono bg-muted p-1 rounded-md">(</code>, <code className="font-mono bg-muted p-1 rounded-md">1</code>, <code className="font-mono bg-muted p-1 rounded-md">0</code>, <code className="font-mono bg-muted p-1 rounded-md">0</code>, <code className="font-mono bg-muted p-1 rounded-md">)</code>, and <code className="font-mono bg-muted p-1 rounded-md">=</code>.</em>
            </li>
            <li>
                <strong>Custom Base (log_b):</strong> To calculate a logarithm with a custom base, use the <code className="font-mono bg-muted p-1 rounded-md">log_b</code> key. The format is <code className="font-mono bg-muted p-1 rounded-md">log_BASE(NUMBER)</code>.
                <br />
                <em>Example: To find log₂(8), type <code className="font-mono bg-muted p-1 rounded-md">log_2(8)</code> using the keypad and then press <code className="font-mono bg-muted p-1 rounded-md">=</code>.</em>
            </li>
            </ol>
        </div>
        <div>
            <h3 className="font-semibold text-foreground text-lg">Logarithm Equation Solver</h3>
             <ol className="list-decimal list-inside space-y-2 mt-2">
                <li>
                    <strong>Enter Two Values:</strong> In the equation log<sub>b</sub>(x) = y, fill in any two of the fields: base (b), number (x), or result (y).
                </li>
                <li>
                    <strong>Use 'e' for Base:</strong> You can type 'e' into the base field to use Euler's number.
                </li>
                <li>
                    <strong>Calculate:</strong> Click "Calculate" to solve for the missing value. The field you left empty will be filled with the answer.
                </li>
             </ol>
        </div>
      </CardContent>
    </Card>
  );


const EducationalContent = () => (
    <Card>
        <CardHeader>
            <CardTitle>Logarithm Calculator Guide</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
            <div>
                <h3 className="text-xl font-semibold text-foreground">1. Logarithm Basics</h3>
                <p className="text-muted-foreground mt-2">
                    A logarithm answers the question: If <code className="font-mono bg-muted p-1 rounded-md">bˣ = y</code>, then <code className="font-mono bg-muted p-1 rounded-md">logₐ(y) = x</code>.
                </p>
                <ul className="list-disc list-inside mt-2 text-muted-foreground space-y-1">
                    <li><b>b</b> = base of the logarithm (must be positive and not equal to 1)</li>
                    <li><b>y</b> = the number you are taking the logarithm of</li>
                    <li><b>x</b> = the logarithm value (the exponent)</li>
                </ul>
                <h4 className="font-semibold text-foreground mt-2">Common Logarithms:</h4>
                <ul className="list-disc list-inside mt-1 text-muted-foreground">
                    <li><b>Base 10 (log₁₀):</b> Often written as just "log".</li>
                    <li><b>Base e (ln):</b> The natural logarithm, where e ≈ 2.718.</li>
                </ul>
            </div>
            
            <div>
                <h3 className="text-xl font-semibold text-foreground">2. Logarithm Properties</h3>
                <Table>
                    <TableBody>
                        <TableRow><TableCell>Product Rule</TableCell><TableCell className="font-mono">logₐ(M·N) = logₐ(M) + logₐ(N)</TableCell></TableRow>
                        <TableRow><TableCell>Quotient Rule</TableCell><TableCell className="font-mono">logₐ(M/N) = logₐ(M) - logₐ(N)</TableCell></TableRow>
                        <TableRow><TableCell>Power Rule</TableCell><TableCell className="font-mono">logₐ(Mᵏ) = k·logₐ(M)</TableCell></TableRow>
                        <TableRow><TableCell>Change of Base</TableCell><TableCell className="font-mono">logₐ(y) = logₖ(y) / logₖ(b)</TableCell></TableRow>
                    </TableBody>
                </Table>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-foreground">3. Calculator Logic (Pseudocode)</h3>
                <p className="text-muted-foreground mt-2">The calculator uses the following logic to solve for different variables:</p>
                <div className="font-mono text-sm bg-muted p-4 rounded-md space-y-2 mt-2">
                    <p>// Inputs: base (b), number (y), exponent (x)</p>
                    <p>// Determine which variable is missing</p>
                    <p><b>if</b> (x is missing) <span className="text-muted-foreground">// Find log value</span><br/>&nbsp;&nbsp;x = Math.log(y) / Math.log(b)</p>
                    <p><b>else if</b> (y is missing) <span className="text-muted-foreground">// Find number from log</span><br/>&nbsp;&nbsp;y = Math.pow(b, x)</p>
                    <p><b>else if</b> (b is missing) <span className="text-muted-foreground">// Solve for base</span><br/>&nbsp;&nbsp;b = Math.pow(y, 1/x)</p>
                </div>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-foreground">4. Example Usage</h3>
                <Table>
                    <TableHeader>
                        <TableRow><TableHead>Input</TableHead><TableHead>Output</TableHead><TableHead>Formula Used</TableHead></TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow><TableCell>log₂(8)</TableCell><TableCell>3</TableCell><TableCell>2³ = 8</TableCell></TableRow>
                        <TableRow><TableCell>log₁₀(1000)</TableCell><TableCell>3</TableCell><TableCell>10³ = 1000</TableCell></TableRow>
                        <TableRow><TableCell>ln(e²)</TableCell><TableCell>2</TableCell><TableCell>Natural log property</TableCell></TableRow>
                        <TableRow><TableCell>Find y if log₂(y) = 5</TableCell><TableCell>32</TableCell><TableCell>y = 2⁵</TableCell></TableRow>
                    </TableBody>
                </Table>
            </div>
        </CardContent>
    </Card>
);


export default function LogPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Log Calculator" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-2xl space-y-8">
            <section className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Logarithm Calculator
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    A powerful calculator for logarithmic and exponential functions.
                </p>
            </section>
            
            <LogCalculator />

            <div className="py-4">
                <LogEquationCalculator />
            </div>

            <HowToUseGuide />
            
            <section className="text-center">
                <h2 className="text-2xl font-bold text-foreground">Related Calculators</h2>
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                    <Button asChild variant="outline">
                        <Link href="/scientific">Scientific Calculator</Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link href="/exponent">Exponent Calculator</Link>
                    </Button>
                </div>
            </section>
            
            <EducationalContent />
        </div>
      </main>
    </div>
  );
}
