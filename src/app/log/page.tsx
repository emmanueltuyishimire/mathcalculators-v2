
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

// Metadata can't be dynamically generated in a client component, 
// but we can define it for the page if we move it to a layout or server component.

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
            <CardTitle>What is Log?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground">
            <p>The logarithm, or log, is the inverse of the mathematical operation of exponentiation. This means that the log of a number is the number that a fixed base has to be raised to in order to yield the number. Conventionally, <b>log</b> implies that base 10 is being used, though the base can technically be anything. When the base is <b>e</b>, <b>ln</b> is usually written, rather than loge. <b>log2</b>, the binary logarithm, is another base that is typically used with logarithms. If, for example:</p>
            <p className="font-mono bg-muted p-2 rounded-md my-2 text-center">x = bʸ; then y = logₐ(x); where b is the base</p>
            <p>Each of the mentioned bases is typically used in different applications. Base 10 is commonly used in science and engineering, base e in math and physics, and base 2 in computer science.</p>
            
            <div>
                <h3 className="text-xl font-semibold text-foreground">Basic Log Rules</h3>
                <div className="space-y-4 mt-2">
                    <div>
                        <p>When the argument of a logarithm is the product of two numerals, the logarithm can be re-written as the addition of the logarithm of each of the numerals.</p>
                        <p className="font-mono bg-muted p-2 rounded-md my-2">logₐ(x × y) = logₐx + logₐy</p>
                        <p><b>EX:</b> log(1 × 10) = log(1) + log(10) = 0 + 1 = 1</p>
                    </div>
                    <div>
                        <p>When the argument of a logarithm is a fraction, the logarithm can be re-written as the subtraction of the logarithm of the numerator minus the logarithm of the denominator.</p>
                        <p className="font-mono bg-muted p-2 rounded-md my-2">logₐ(x / y) = logₐx - logₐy</p>
                        <p><b>EX:</b> log(10 / 2) = log(10) - log(2) = 1 - 0.301 = 0.699</p>
                    </div>
                    <div>
                        <p>If there is an exponent in the argument of a logarithm, the exponent can be pulled out of the logarithm and multiplied.</p>
                        <p className="font-mono bg-muted p-2 rounded-md my-2">logₐxʸ = y × logₐx</p>
                        <p><b>EX:</b> log(2⁶) = 6 × log(2) = 1.806</p>
                    </div>
                    <div>
                        <p>It is also possible to change the base of the logarithm using the following rule.</p>
                        <p className="font-mono bg-muted p-2 rounded-md my-2">logₐ(x) = logₖ(x) / logₖ(b)</p>
                        <p><b>EX:</b> log₁₀(x) = log₂(x) / log₂(10)</p>
                    </div>
                    <div>
                         <p>To switch the base and argument, use the following rule.</p>
                        <p className="font-mono bg-muted p-2 rounded-md my-2">logₐ(c) = 1 / log꜀(b)</p>
                        <p><b>EX:</b> log₅(2) = 1 / log₂(5)</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-foreground">Other common logarithms to take note of include:</h4>
                        <ul className="list-disc list-inside pl-4 mt-2 font-mono bg-muted p-2 rounded-md">
                            <li>logₐ(1) = 0</li>
                            <li>logₐ(b) = 1</li>
                            <li>logₐ(0) = undefined</li>
                            <li>limₓ→₀ logₐ(x) = -∞</li>
                            <li>ln(eˣ) = x</li>
                        </ul>
                    </div>
                </div>
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

    