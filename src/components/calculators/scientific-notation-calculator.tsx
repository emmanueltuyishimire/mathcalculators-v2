
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

const NotationConverter = () => {
    const [input, setInput] = useState('1568938');
    const [results, setResults] = useState({ scientific: '', eNotation: '', engineering: '', real: '' });

    const parseScientific = (str: string): number | null => {
        str = str.toLowerCase();
        if (str.includes('e') || str.includes('x10^')) {
            const parts = str.replace('x10^', 'e').split('e');
            const base = parseFloat(parts[0]);
            const exp = parseInt(parts[1]);
            if (!isNaN(base) && !isNaN(exp)) {
                return base * Math.pow(10, exp);
            }
        }
        const num = parseFloat(str);
        return isNaN(num) ? null : num;
    };

    const formatEngineering = (num: number): string => {
        if (num === 0) return '0.000 x 10^0';
        const power = Math.floor(Math.log10(Math.abs(num)));
        const engPower = Math.floor(power / 3) * 3;
        const significand = num / Math.pow(10, engPower);
        return `${significand.toPrecision(4)} x 10^${engPower}`;
    };

    const convert = () => {
        const num = parseScientific(input);
        if (num === null) {
            setResults({ scientific: 'Invalid', eNotation: 'Invalid', engineering: 'Invalid', real: 'Invalid' });
            return;
        }

        const exponent = Math.floor(Math.log10(Math.abs(num)));
        const significand = num / Math.pow(10, exponent);

        setResults({
            scientific: `${significand.toPrecision(15)} x 10^${exponent}`,
            eNotation: num.toExponential(),
            engineering: formatEngineering(num),
            real: num.toLocaleString('fullwide', { useGrouping: false, maximumFractionDigits: 20 }),
        });
    }

    useEffect(() => {
        convert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [input]);

    return (
        <Card>
            <CardHeader className="p-4">
                <CardTitle>Scientific Notation Converter</CardTitle>
                <CardDescription>Enter a number in any format to see its different notations.</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
                <Input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="e.g., 3.5x10^-12"
                    className="font-mono text-center"
                />
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-3 p-4">
                <div className="w-full space-y-1">
                    <Label>Scientific Notation</Label>
                    <Input readOnly value={results.scientific} className="bg-muted font-mono" />
                </div>
                 <div className="w-full space-y-1">
                    <Label>E-Notation</Label>
                    <Input readOnly value={results.eNotation} className="bg-muted font-mono" />
                </div>
                 <div className="w-full space-y-1">
                    <Label>Engineering Notation</Label>
                    <Input readOnly value={results.engineering} className="bg-muted font-mono" />
                </div>
                 <div className="w-full space-y-1">
                    <Label>Real Number</Label>
                    <Input readOnly value={results.real} className="bg-muted font-mono" />
                </div>
            </CardFooter>
        </Card>
    );
};

const ArithmeticCalculator = () => {
    const { toast } = useToast();
    const [x, setX] = useState({ sig: '1.23', exp: '7' });
    const [y, setY] = useState({ sig: '3.45', exp: '2' });
    const [precision, setPrecision] = useState('20');
    const [result, setResult] = useState('');

    const calculate = (op: 'add' | 'subtract' | 'multiply' | 'divide' | 'power' | 'sqrt' | 'sq') => {
        try {
            const xVal = parseFloat(x.sig) * Math.pow(10, parseInt(x.exp));
            const yVal = parseFloat(y.sig) * Math.pow(10, parseInt(y.exp));
            const prec = parseInt(precision);

            if (isNaN(xVal) || isNaN(yVal) || isNaN(prec)) throw new Error("Invalid number inputs.");

            let res: number;
            switch(op) {
                case 'add': res = xVal + yVal; break;
                case 'subtract': res = xVal - yVal; break;
                case 'multiply': res = xVal * yVal; break;
                case 'divide':
                    if (yVal === 0) throw new Error("Division by zero.");
                    res = xVal / yVal;
                    break;
                case 'power': res = Math.pow(xVal, yVal); break;
                case 'sqrt':
                    if (xVal < 0) throw new Error("Cannot take square root of a negative number.");
                    res = Math.sqrt(xVal);
                    break;
                case 'sq': res = xVal * xVal; break;
            }
            
            const resultScientific = res.toExponential(prec);
            setResult(resultScientific);

        } catch (e: any) {
            toast({ variant: 'destructive', title: 'Calculation Error', description: e.message });
        }
    };

    return (
        <Card>
            <CardHeader className="p-4">
                <CardTitle>Scientific Notation Calculator</CardTitle>
                <CardDescription>Perform arithmetic operations on numbers in scientific notation.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-4">
                 <div className="space-y-2">
                    <Label>Value X</Label>
                    <div className="flex items-center gap-2">
                        <Input value={x.sig} onChange={e => setX({...x, sig: e.target.value})} />
                        <span className="font-semibold">×10^</span>
                        <Input className="w-20" value={x.exp} onChange={e => setX({...x, exp: e.target.value})} />
                    </div>
                </div>
                 <div className="space-y-2">
                    <Label>Value Y</Label>
                    <div className="flex items-center gap-2">
                        <Input value={y.sig} onChange={e => setY({...y, sig: e.target.value})} />
                        <span className="font-semibold">×10^</span>
                        <Input className="w-20" value={y.exp} onChange={e => setY({...y, exp: e.target.value})} />
                    </div>
                </div>
                 <div className="space-y-2">
                    <Label>Precision (Decimal Places)</Label>
                    <Input value={precision} onChange={e => setPrecision(e.target.value)} type="number" min="0" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <Button size="sm" onClick={() => calculate('add')}>X + Y</Button>
                    <Button size="sm" onClick={() => calculate('subtract')}>X – Y</Button>
                    <Button size="sm" onClick={() => calculate('multiply')}>X × Y</Button>
                    <Button size="sm" onClick={() => calculate('divide')}>X / Y</Button>
                    <Button size="sm" onClick={() => calculate('power')}>X^Y</Button>
                    <Button size="sm" onClick={() => calculate('sqrt')}>√X</Button>
                    <Button size="sm" onClick={() => calculate('sq')}>X²</Button>
                </div>
            </CardContent>
            {result && (
                <CardFooter className="p-4">
                     <div className="w-full space-y-2">
                        <Label>Result</Label>
                        <Input readOnly value={result} className="bg-muted font-mono" />
                    </div>
                </CardFooter>
            )}
        </Card>
    );
};

export default function ScientificNotationCalculator() {
  return (
    <div className="space-y-4">
      <NotationConverter />
      <ArithmeticCalculator />
    </div>
  );
}
