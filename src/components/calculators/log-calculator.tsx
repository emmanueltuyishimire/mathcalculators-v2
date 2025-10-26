
"use client";

import React, { useState, useEffect } from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

// This is a placeholder for a real scientific calculator logic
const ScientificLogCalculator = () => {
    return (
        <Card>
            <CardHeader className="p-4">
                <CardTitle>Scientific Log Calculator</CardTitle>
                <CardDescription>This is a placeholder. For a full scientific calculator, see the <Link href="/scientific" className="text-primary hover:underline">Scientific Calculator page</Link>.</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
                <div className="p-4 bg-muted rounded-md text-center text-muted-foreground">
                    Scientific Calculator UI would be here.
                </div>
            </CardContent>
        </Card>
    );
};

const LogEquationCalculator = () => {
    const { toast } = useToast();
    const [base, setBase] = useState('');
    const [number, setNumber] = useState('8');
    const [result, setResult] = useState('3');
    
    const handleInputChange = (field: 'base' | 'number' | 'result', value: string) => {
        let newValues = { base, number, result };
        newValues[field] = value;
        
        const emptyFields = Object.keys(newValues).filter(key => newValues[key as keyof typeof newValues] === '');
        
        if(emptyFields.length !== 1) {
            newValues = { base: '', number: '', result: '' };
            newValues[field] = value;
        }

        setBase(newValues.base);
        setNumber(newValues.number);
        setResult(newValues.result);
    }


    const calculate = () => {
        const baseVal = base.toLowerCase() === 'e' ? Math.E : parseFloat(base);
        const numberVal = parseFloat(number);
        const resultVal = parseFloat(result);

        const knownValues = [!isNaN(baseVal), !isNaN(numberVal), !isNaN(resultVal)].filter(Boolean).length;

        if (knownValues !== 2) {
            if (base || number || result) {
                toast({
                    variant: 'destructive',
                    title: 'Invalid Input',
                    description: 'Please provide exactly two values to solve for the third.',
                });
            }
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
                if(numberVal === 1 && resultVal !== 0) throw new Error("If number is 1, result must be 0.");
                if(numberVal !== 1 && resultVal === 0) throw new Error("If result is 0, number must be 1.");
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
            <CardHeader className="p-4">
                <CardTitle>Logarithm Equation Solver</CardTitle>
                <CardDescription>Solves for any variable in the equation log<sub>b</sub>(x) = y. Provide any two values.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-4">
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
      <CardHeader className="p-4">
        <CardTitle>How to Use the Calculators</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-muted-foreground p-4">
        <div>
            <h3 className="font-semibold text-foreground">Scientific Log Calculator</h3>
            <ol className="list-decimal list-inside space-y-1 mt-2 text-sm">
            <li>
                <strong>Basic:</strong> Use number keys. Use `log` for base 10, `ln` for base e.
            </li>
            <li>
                <strong>Custom Base (log_b):</strong> Type `log_BASE(NUMBER)` (e.g., `log_2(8)`).
            </li>
            </ol>
        </div>
        <div>
            <h3 className="font-semibold text-foreground">Logarithm Equation Solver</h3>
             <ol className="list-decimal list-inside space-y-1 mt-2 text-sm">
                <li>
                    Fill any two fields: base (b), number (x), or result (y).
                </li>
                <li>
                    Click "Calculate" to solve for the empty field. You can type 'e' for Euler's number as the base.
                </li>
             </ol>
        </div>
      </CardContent>
    </Card>
  );


const EducationalContent = () => (
    <Card>
        <CardHeader className="p-4">
            <CardTitle>Logarithm Calculator Guide</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-4">
            <div>
                <h3 className="text-lg font-semibold text-foreground">1. Logarithm Basics</h3>
                <p className="text-sm text-muted-foreground mt-1">
                    A logarithm answers: If `bˣ = y`, then `logₐ(y) = x`.
                </p>
            </div>
            
            <div>
                <h3 className="text-lg font-semibold text-foreground">2. Logarithm Properties</h3>
                <Table>
                    <TableBody className="text-sm">
                        <TableRow><TableCell>Product</TableCell><TableCell className="font-mono">logₐ(M·N) = logₐ(M) + logₐ(N)</TableCell></TableRow>
                        <TableRow><TableCell>Quotient</TableCell><TableCell className="font-mono">logₐ(M/N) = logₐ(M) - logₐ(N)</TableCell></TableRow>
                        <TableRow><TableCell>Power</TableCell><TableCell className="font-mono">logₐ(Mᵏ) = k·logₐ(M)</TableCell></TableRow>
                        <TableRow><TableCell>Change of Base</TableCell><TableCell className="font-mono">logₐ(y) = logₖ(y) / logₖ(b)</TableCell></TableRow>
                    </TableBody>
                </Table>
            </div>
        </CardContent>
    </Card>
);

const FaqSection = () => (
    <Card>
        <CardHeader className="p-4">
            <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>What is the difference between log and ln?</AccordionTrigger>
                    <AccordionContent>
                        - **log** usually refers to the logarithm with base 10 (log₁₀), also known as the common logarithm.<br/>
                        - **ln** refers to the logarithm with base 'e' (logₑ), also known as the natural logarithm. 'e' is Euler's number, approximately 2.718.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Why can't I take the log of a negative number?</AccordionTrigger>
                    <AccordionContent>
                        In the equation `logᵦ(x) = y`, `x` is the result of `bʸ`. Since a positive base `b` raised to any real power `y` can never be negative, the logarithm is not defined for negative numbers in the real number system.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>What is the "Change of Base" formula?</AccordionTrigger>
                    <AccordionContent>
                        The Change of Base formula allows you to calculate a logarithm with any base using a calculator that only has `log` (base 10) and `ln` (base e). The formula is: `logᵦ(x) = logₐ(x) / logₐ(b)`. For example, `log₂(8)` can be calculated as `log(8) / log(2)` or `ln(8) / ln(2)`.
                    </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="item-4">
                    <AccordionTrigger>How does the equation solver work?</AccordionTrigger>
                    <AccordionContent>
                        It uses the fundamental relationship between exponents and logarithms. By providing any two values in the equation `logᵦ(x) = y` (which is equivalent to `bʸ = x`), it can algebraically solve for the third unknown value.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
    </Card>
);

export default function LogPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Log Calculator" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-2xl space-y-4">
            <section className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Logarithm Calculator
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    A powerful calculator for logarithmic and exponential functions.
                </p>
            </section>
            
            <ScientificLogCalculator />

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
            <FaqSection />
        </div>
      </main>
    </div>
  );
}
