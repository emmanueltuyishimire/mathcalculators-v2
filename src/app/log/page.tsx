
"use client";

import React from 'react';
import { PageHeader } from '@/components/page-header';
import LogCalculator from '@/components/calculators/log-calculator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const HowToUseGuide = () => (
    <Card>
      <CardHeader className="p-4">
        <CardTitle>How to Use the Calculators</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-muted-foreground p-4">
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
            
            <LogCalculator />

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
