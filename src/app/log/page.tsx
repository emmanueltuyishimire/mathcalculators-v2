"use client";

import React, { useState, useEffect } from 'react';
import { PageHeader } from '@/components/page-header';
// import type { Metadata } from 'next'; // Cannot be used in client component
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

function LogCalculator() {
    const { toast } = useToast();
    const [base, setBase] = useState('e');
    const [argument, setArgument] = useState('100');
    const [result, setResult] = useState('');
    const [calculation, setCalculation] = useState<string | null>(null);
    const [exponentialForm, setExponentialForm] = useState<string | null>(null);

    const handleBaseChange = (value: string) => {
        setBase(value);
        setArgument('');
        setResult('');
        setCalculation(null);
        setExponentialForm(null);
    };

    const handleArgumentChange = (value: string) => {
        setArgument(value);
        setBase('');
        setResult('');
        setCalculation(null);
        setExponentialForm(null);
    };

    const handleResultChange = (value: string) => {
        setResult(value);
        setBase('');
        setArgument('');
        setCalculation(null);
        setExponentialForm(null);
    };

    const calculate = () => {
        setCalculation(null);
        setExponentialForm(null);
        
        const baseStr = base.toLowerCase().trim();
        const baseNum = baseStr === 'e' ? Math.E : parseFloat(base);
        const argNum = parseFloat(argument);
        const resNum = parseFloat(result);

        const knownValues = [!isNaN(baseNum), !isNaN(argNum), !isNaN(resNum)].filter(Boolean).length;

        if (knownValues !== 2) {
            toast({
                variant: 'destructive',
                title: 'Invalid Input',
                description: 'Please provide exactly two values to solve for the third.',
            });
            return;
        }

        try {
            if (isNaN(resNum)) {
                if (baseNum <= 0 || baseNum === 1) throw new Error("Base must be positive and not equal to 1.");
                if (argNum <= 0) throw new Error("Argument must be positive for real logarithms.");
                const newResult = Math.log(argNum) / Math.log(baseNum);
                setResult(newResult.toString());
                setCalculation(`log${baseStr}(${argNum}) = ${newResult.toPrecision(15)}`);
                setExponentialForm(`${baseStr}^${newResult.toPrecision(15)} = ${argNum}`);
            } else if (isNaN(argNum)) {
                const newArgument = Math.pow(baseNum, resNum);
                setArgument(newArgument.toString());
                setCalculation(`log${baseStr}(${newArgument.toPrecision(15)}) = ${resNum}`);
                setExponentialForm(`${baseStr}^${resNum} = ${newArgument.toPrecision(15)}`);
            } else { // isNaN(baseNum) is implied because we check for 2 knowns
                if (argNum <= 0 || argNum === 1) throw new Error("Argument must be positive and not equal to 1 for finding the base.");
                if (resNum === 0) throw new Error("Result cannot be zero when solving for the base.");
                const newBase = Math.pow(argNum, 1 / resNum);
                setBase(newBase.toString());
                setCalculation(`log${newBase.toPrecision(15)}(${argNum}) = ${resNum}`);
                setExponentialForm(`${newBase.toPrecision(15)}^${resNum} = ${argNum}`);
            }
        } catch (e: any) {
            toast({
                variant: 'destructive',
                title: 'Calculation Error',
                description: e.message || 'An error occurred during calculation.',
            });
        }
    };

    useEffect(() => {
        // Initial calculation on load
        calculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleClear = () => {
        setBase('');
        setArgument('');
        setResult('');
        setCalculation(null);
        setExponentialForm(null);
    }

    return (
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle>logₐ(x) = y</CardTitle>
                <CardDescription>Enter any two values to find the third.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-wrap items-end gap-2 text-lg font-semibold">
                    <span className="self-center">log</span>
                    <Input
                        id="base"
                        value={base}
                        onChange={(e) => handleBaseChange(e.target.value)}
                        className="w-20 text-center text-sm self-end"
                        placeholder="a"
                        aria-label="Base (a)"
                    />
                    <Input
                        id="argument"
                        type="number"
                        value={argument}
                        onChange={(e) => handleArgumentChange(e.target.value)}
                        className="w-24 text-center"
                        placeholder="x"
                        aria-label="Argument (x)"
                    />
                    <span className="self-center">=</span>
                    <Input
                        id="result"
                        type="number"
                        value={result}
                        onChange={(e) => handleResultChange(e.target.value)}
                        className="w-24 text-center"
                        placeholder="y"
                        aria-label="Result (y)"
                    />
                </div>
                <div className="flex gap-2">
                    <Button onClick={calculate} className="w-full">Calculate</Button>
                    <Button variant="outline" onClick={handleClear} className="w-full">Clear</Button>
                </div>
            </CardContent>
            {calculation && exponentialForm && (
                <CardFooter>
                     <div className="w-full p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-md">
                        <h3 className="font-bold text-lg">Result</h3>
                        <p className="font-mono text-primary break-all">{calculation}</p>
                        <p className="font-mono text-muted-foreground text-sm break-all">{exponentialForm}</p>
                    </div>
                </CardFooter>
            )}
        </Card>
    );
}

const HowToUseGuide = () => (
    <Card>
        <CardHeader>
            <CardTitle>How to Use the Log Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
            <p>This calculator solves logarithmic equations in the form <strong>logₐ(x) = y</strong>.</p>
            <ol className="list-decimal list-inside space-y-2">
                <li>
                    <strong>Enter Two Values:</strong> Fill in any two of the three input fields: Base (a), Argument (x), or Result (y). Leave the field you want to solve for empty.
                </li>
                <li>
                    <strong>Use 'e' as Base (Optional):</strong> To use Euler's number (e ≈ 2.718), simply type 'e' into the Base input field.
                </li>
                <li>
                    <strong>Calculate:</strong> Click the "Calculate" button to compute the missing value.
                </li>
                <li>
                    <strong>View the Result:</strong> The answer and its exponential equivalent will appear in the result section below.
                </li>
            </ol>
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
                    Log Calculator (Logarithm)
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Please provide any two values to calculate the third in the logarithm equation logₐx=y. It can accept "e" as a base input.
                </p>
            </section>
            
            <LogCalculator />

            <HowToUseGuide />

            <EducationalContent />

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
        </div>
      </main>
    </div>
  );
}
