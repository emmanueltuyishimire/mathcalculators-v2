
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

// --- Binary Arithmetic Calculator ---
const BinaryArithmeticCalculator = () => {
    const { toast } = useToast();
    const [val1, setVal1] = useState('1101');
    const [val2, setVal2] = useState('101');
    const [op, setOp] = useState('+');
    const [result, setResult] = useState('');
    const [decimalResult, setDecimalResult] = useState('');

    const calculate = () => {
        try {
            if (!val1 || !val2) {
                setResult('');
                setDecimalResult('');
                return;
            }
            if (!/^[01]+$/.test(val1) || !/^[01]+$/.test(val2)) {
                if (val1 || val2) throw new Error("Inputs must be valid binary strings.");
                setResult('');
                setDecimalResult('');
                return;
            }
            const num1 = parseInt(val1, 2);
            const num2 = parseInt(val2, 2);
            let resNum;

            switch (op) {
                case '+': resNum = num1 + num2; break;
                case '-': resNum = num1 - num2; break;
                case '×': resNum = num1 * num2; break;
                case '÷':
                    if (num2 === 0) throw new Error("Division by zero.");
                    resNum = Math.floor(num1 / num2); // Integer division
                    break;
                default: throw new Error("Invalid operator.");
            }
            
            setResult(resNum.toString(2));
            setDecimalResult(`${num1} ${op} ${num2} = ${resNum}`);

        } catch (e: any) {
            toast({ variant: 'destructive', title: 'Error', description: e.message });
            setResult('');
            setDecimalResult('');
        }
    };
    
    useEffect(() => {
        calculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [val1, val2, op]);

    return (
        <Card>
            <CardHeader className="p-4">
                <CardTitle className="text-xl">Binary Calculation</CardTitle>
                <CardDescription>Add, Subtract, Multiply, or Divide</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-4">
                <div className="grid grid-cols-1 gap-2 items-center justify-items-center">
                    <Input value={val1} onChange={e => setVal1(e.target.value)} className="font-mono text-center"/>
                    <div className="flex items-center gap-2">
                        <Select value={op} onValueChange={setOp}>
                            <SelectTrigger className="w-[60px]"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="+">+</SelectItem>
                                <SelectItem value="-">-</SelectItem>
                                <SelectItem value="×">×</SelectItem>
                                <SelectItem value="÷">÷</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Input value={val2} onChange={e => setVal2(e.target.value)} className="font-mono text-center" />
                </div>
                 <Button onClick={calculate} className="w-full">Calculate</Button>
                 {result && (
                    <div className="space-y-4">
                        <div>
                            <Label>Binary Result</Label>
                            <Input readOnly value={result} className="font-mono text-center bg-muted" />
                        </div>
                        <div>
                            <Label>Decimal Equivalent</Label>
                            <Input readOnly value={decimalResult} className="font-mono text-center bg-muted" />
                        </div>
                    </div>
                 )}
            </CardContent>
        </Card>
    );
};

// --- Binary to Decimal Converter ---
const BinToDecConverter = () => {
    const { toast } = useToast();
    const [binary, setBinary] = useState('10110');
    const [decimal, setDecimal] = useState('');

    const convert = () => {
        try {
             if (!binary) {
                setDecimal('');
                return;
            }
             if (!/^[01]+$/.test(binary)) {
                if (binary) throw new Error("Input must be a valid binary string.");
                setDecimal('');
                return;
            }
            setDecimal(parseInt(binary, 2).toString());
        } catch (e: any) {
            toast({ variant: 'destructive', title: 'Error', description: e.message });
            setDecimal('');
        }
    };

    useEffect(() => {
        convert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [binary]);

    return (
        <Card>
            <CardHeader className="p-4">
                <CardTitle className="text-xl">Binary to Decimal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-4">
                <div className="space-y-2">
                    <Label htmlFor="binary-input">Binary Value</Label>
                    <Input id="binary-input" value={binary} onChange={e => setBinary(e.target.value)} className="font-mono" />
                </div>
                {decimal && (
                     <div className="space-y-2">
                        <Label>Decimal Result</Label>
                        <Input readOnly value={decimal} className="font-mono bg-muted" />
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

// --- Decimal to Binary Converter ---
const DecToBinConverter = () => {
    const { toast } = useToast();
    const [decimal, setDecimal] = useState('22');
    const [binary, setBinary] = useState('');

    const convert = () => {
        try {
            if (!decimal) {
                setBinary('');
                return;
            }
            const num = parseInt(decimal, 10);
            if (isNaN(num)) {
                 if (decimal) throw new Error("Input must be a valid integer.");
                setBinary('');
                return;
            }
            setBinary(num.toString(2));
        } catch (e: any) {
            toast({ variant: 'destructive', title: 'Error', description: e.message });
            setBinary('');
        }
    };
    
    useEffect(() => {
        convert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [decimal]);

    return (
        <Card>
            <CardHeader className="p-4">
                <CardTitle className="text-xl">Decimal to Binary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-4">
                 <div className="space-y-2">
                    <Label htmlFor="decimal-input">Decimal Value</Label>
                    <Input id="decimal-input" value={decimal} onChange={e => setDecimal(e.target.value)} className="font-mono" type="number" />
                </div>
                {binary && (
                    <div className="space-y-2">
                        <Label>Binary Result</Label>
                        <Input readOnly value={binary} className="font-mono bg-muted" />
                    </div>
                )}
            </CardContent>
        </Card>
    );
};


export default function BinaryCalculator() {
    return (
        <div className="space-y-4">
            <BinaryArithmeticCalculator />
            <BinToDecConverter />
            <DecToBinConverter />
        </div>
    );
}
