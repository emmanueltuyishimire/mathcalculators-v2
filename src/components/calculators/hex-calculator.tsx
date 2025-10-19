
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

// --- Hex Arithmetic Calculator ---
const HexArithmeticCalculator = () => {
    const { toast } = useToast();
    const [val1, setVal1] = useState('');
    const [val2, setVal2] = useState('');
    const [op, setOp] = useState('+');
    const [result, setResult] = useState('');
    const [decimalResult, setDecimalResult] = useState('');

    const calculate = () => {
        try {
            const hexRegex = /^[0-9a-fA-F]+$/;
            if (!val1 || !val2) {
                setResult('');
                setDecimalResult('');
                return;
            }
            if ((val1 && !hexRegex.test(val1)) || (val2 && !hexRegex.test(val2))) {
                if (val1 || val2) throw new Error("Inputs must be valid hexadecimal strings.");
                setResult('');
                setDecimalResult('');
                return;
            }

            const num1 = BigInt(`0x${val1}`);
            const num2 = BigInt(`0x${val2}`);
            let resNum: bigint;

            switch (op) {
                case '+': resNum = num1 + num2; break;
                case '-': resNum = num1 - num2; break;
                case '×': resNum = num1 * num2; break;
                case '÷':
                    if (num2 === 0n) throw new Error("Division by zero.");
                    resNum = num1 / num2; 
                    break;
                default: throw new Error("Invalid operator.");
            }
            
            setResult(resNum.toString(16).toUpperCase());
            setDecimalResult(`${num1.toString()} ${op} ${num2.toString()} = ${resNum.toString()}`);

        } catch (e: any) {
            toast({ variant: 'destructive', title: 'Error', description: e.message });
            setResult('');
            setDecimalResult('');
        }
    };
    
    useEffect(calculate, [val1, val2, op]);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">Hexadecimal Calculation</CardTitle>
                <CardDescription>Add, Subtract, Multiply, or Divide</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-2 items-center justify-items-center">
                    <Input value={val1} onChange={e => setVal1(e.target.value.toUpperCase())} className="font-mono text-center"/>
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
                    <Input value={val2} onChange={e => setVal2(e.target.value.toUpperCase())} className="font-mono text-center" />
                </div>
                 <Button onClick={calculate} className="w-full">Calculate</Button>
                 {result && (
                    <div className="space-y-4">
                        <div>
                            <Label>Hex Result</Label>
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

// --- Hex to Decimal Converter ---
const HexToDecConverter = () => {
    const { toast } = useToast();
    const [hex, setHex] = useState('');
    const [decimal, setDecimal] = useState('');

    const convert = () => {
        try {
            if (!hex) {
                 setDecimal('');
                 return;
            }
             if (hex && !/^[0-9a-fA-F]+$/.test(hex)) {
                throw new Error("Input must be a valid hexadecimal string.");
            }
            setDecimal(BigInt(`0x${hex}`).toString());
        } catch (e: any) {
            toast({ variant: 'destructive', title: 'Error', description: e.message });
            setDecimal('');
        }
    };

    useEffect(convert, [hex]);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">Hex to Decimal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="hex-input">Hex Value</Label>
                    <Input id="hex-input" value={hex} onChange={e => setHex(e.target.value.toUpperCase())} className="font-mono" />
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

// --- Decimal to Hex Converter ---
const DecToHexConverter = () => {
    const { toast } = useToast();
    const [decimal, setDecimal] = useState('');
    const [hex, setHex] = useState('');

    const convert = () => {
        try {
            if (!decimal) {
                setHex('');
                return;
            }
            const num = BigInt(decimal);
            setHex(num.toString(16).toUpperCase());
        } catch (e: any) {
            toast({ variant: 'destructive', title: 'Error', description: "Please enter a valid integer." });
            setHex('');
        }
    };
    
    useEffect(convert, [decimal]);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">Decimal to Hex</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="space-y-2">
                    <Label htmlFor="decimal-input">Decimal Value</Label>
                    <Input id="decimal-input" value={decimal} onChange={e => setDecimal(e.target.value)} className="font-mono" type="text" />
                </div>
                {hex && (
                    <div className="space-y-2">
                        <Label>Hex Result</Label>
                        <Input readOnly value={hex} className="font-mono bg-muted" />
                    </div>
                )}
            </CardContent>
        </Card>
    );
};


export default function HexCalculator() {
    return (
        <div className="space-y-8">
            <HexArithmeticCalculator />
            <HexToDecConverter />
            <DecToHexConverter />
        </div>
    );
}
