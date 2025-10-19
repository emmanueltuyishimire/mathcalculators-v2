
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

// Helper function for GCD
const gcd = (a: bigint, b: bigint): bigint => {
    return b === 0n ? a : gcd(b, a % b);
};

// --- Basic Fraction Calculator ---
function BasicFractionCalculator() {
    const { toast } = useToast();
    const [f1, setF1] = useState({ n: '2', d: '7' });
    const [f2, setF2] = useState({ n: '3', d: '8' });
    const [op, setOp] = useState('+');
    const [result, setResult] = useState<{ n: bigint, d: bigint } | null>(null);

    const calculate = () => {
        try {
            const n1 = BigInt(f1.n);
            const d1 = BigInt(f1.d);
            const n2 = BigInt(f2.n);
            const d2 = BigInt(f2.d);

            if (d1 === 0n || d2 === 0n) throw new Error("Denominator cannot be zero.");

            let resN: bigint, resD: bigint;

            switch (op) {
                case '+':
                    resN = n1 * d2 + n2 * d1;
                    resD = d1 * d2;
                    break;
                case '-':
                    resN = n1 * d2 - n2 * d1;
                    resD = d1 * d2;
                    break;
                case '×':
                    resN = n1 * n2;
                    resD = d1 * d2;
                    break;
                case '÷':
                    resN = n1 * d2;
                    resD = d1 * n2;
                    if (resD === 0n) throw new Error("Division by zero fraction.");
                    break;
                default:
                    throw new Error("Invalid operator");
            }
            
            const commonDivisor = gcd(resN, resD);
            setResult({ n: resN / commonDivisor, d: resD / commonDivisor });

        } catch (e: any) {
            toast({ variant: 'destructive', title: 'Error', description: e.message });
        }
    };
    
    return (
        <Card>
            <CardContent className="pt-6">
                <div className="flex items-center justify-center gap-2">
                    <FractionInput n={f1.n} d={f1.d} onNChange={v => setF1({...f1, n: v})} onDChange={v => setF1({...f1, d: v})} />
                    <Select value={op} onValueChange={setOp}>
                        <SelectTrigger className="w-[60px]"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="+">+</SelectItem>
                            <SelectItem value="-">-</SelectItem>
                            <SelectItem value="×">×</SelectItem>
                            <SelectItem value="÷">÷</SelectItem>
                        </SelectContent>
                    </Select>
                    <FractionInput n={f2.n} d={f2.d} onNChange={v => setF2({...f2, n: v})} onDChange={v => setF2({...f2, d: v})} />
                    <Button onClick={calculate}>=</Button>
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold">{result ? '?' : '?'}</span>
                        {result && <FractionInput n={String(result.n)} d={String(result.d)} readOnly />}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

// --- Mixed Numbers Calculator ---
function MixedNumbersCalculator() {
    const { toast } = useToast();
    const [m1, setM1] = useState({ w: '-2', n: '3', d: '4' });
    const [m2, setM2] = useState({ w: '3', n: '5', d: '7' });
    const [op, setOp] = useState('+');
    const [result, setResult] = useState<{ w: bigint, n: bigint, d: bigint } | null>(null);

    const calculate = () => {
        try {
            const w1 = BigInt(m1.w || '0'), n1 = BigInt(m1.n), d1 = BigInt(m1.d);
            const w2 = BigInt(m2.w || '0'), n2 = BigInt(m2.n), d2 = BigInt(m2.d);
            if (d1 === 0n || d2 === 0n) throw new Error("Denominator cannot be zero.");

            const sign1 = w1 < 0n ? -1n : 1n;
            const sign2 = w2 < 0n ? -1n : 1n;

            const improperN1 = (w1 * d1) + (sign1 * n1);
            const improperN2 = (w2 * d2) + (sign2 * n2);
            
            let resN: bigint, resD: bigint;
            
            switch (op) {
                case '+': resN = improperN1 * d2 + improperN2 * d1; resD = d1 * d2; break;
                case '-': resN = improperN1 * d2 - improperN2 * d1; resD = d1 * d2; break;
                case '×': resN = improperN1 * improperN2; resD = d1 * d2; break;
                case '÷': resN = improperN1 * d2; resD = d1 * improperN2; if (resD === 0n) throw new Error("Division by zero."); break;
                default: throw new Error("Invalid operator");
            }
            
            const commonDivisor = gcd(resN, resD);
            let finalN = resN / commonDivisor;
            let finalD = resD / commonDivisor;
            
            if (finalD < 0n) {
                finalN = -finalN;
                finalD = -finalD;
            }

            const finalW = finalN / finalD;
            const finalRemainderN = finalN % finalD;

            setResult({ w: finalW, n: finalRemainderN < 0n ? -finalRemainderN : finalRemainderN, d: finalD });

        } catch (e: any) {
            toast({ variant: 'destructive', title: 'Error', description: e.message });
        }
    };
    
     return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">Mixed Numbers Calculator</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center gap-2">
                <MixedNumberInput w={m1.w} n={m1.n} d={m1.d} onWChange={v=>setM1({...m1,w:v})} onNChange={v=>setM1({...m1,n:v})} onDChange={v=>setM1({...m1,d:v})}/>
                <Select value={op} onValueChange={setOp}><SelectTrigger className="w-[60px]"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="+">+</SelectItem><SelectItem value="-">-</SelectItem><SelectItem value="×">×</SelectItem><SelectItem value="÷">÷</SelectItem></SelectContent></Select>
                <MixedNumberInput w={m2.w} n={m2.n} d={m2.d} onWChange={v=>setM2({...m2,w:v})} onNChange={v=>setM2({...m2,n:v})} onDChange={v=>setM2({...m2,d:v})}/>
                <Button onClick={calculate}>=</Button>
                <span className="text-2xl font-bold">?</span>
                {result && <MixedNumberInput w={String(result.w)} n={String(result.n)} d={String(result.d)} readOnly />}
            </CardContent>
        </Card>
    );
}

// --- Other Calculators ---

function SimplifyFractionCalculator() {
    const { toast } = useToast();
    const [frac, setFrac] = useState({ n: '2', d: '21' });
    const [result, setResult] = useState<{ n: bigint, d: bigint } | null>(null);

    const calculate = () => {
        try {
            const n = BigInt(frac.n), d = BigInt(frac.d);
            if (d === 0n) throw new Error("Denominator cannot be zero.");
            const common = gcd(n, d);
            setResult({ n: n / common, d: d / common });
        } catch (e: any) {
            toast({ variant: 'destructive', title: 'Error', description: e.message });
        }
    };

    return (
        <Card>
            <CardHeader><CardTitle className="text-xl">Simplify Fractions Calculator</CardTitle></CardHeader>
            <CardContent className="flex items-center justify-center gap-2">
                <FractionInput n={frac.n} d={frac.d} onNChange={v=>setFrac({...frac, n:v})} onDChange={v=>setFrac({...frac, d:v})} />
                <Button onClick={calculate}>=</Button>
                 <span className="text-2xl font-bold">?</span>
                {result && <FractionInput n={String(result.n)} d={String(result.d)} readOnly />}
            </CardContent>
        </Card>
    );
}


function DecimalToFraction() {
    const [dec, setDec] = useState('1.375');
    const [result, setResult] = useState<{ n: string, d: string } | null>(null);

    const calculate = () => {
        const num = parseFloat(dec);
        if (isNaN(num)) return;
        const len = dec.substring(dec.indexOf('.') + 1).length;
        const denominator = 10 ** len;
        const numerator = num * denominator;
        const common = gcd(BigInt(numerator), BigInt(denominator));
        setResult({ n: String(BigInt(numerator) / common), d: String(BigInt(denominator) / common) });
    };

    return (
        <Card>
            <CardHeader><CardTitle className="text-xl">Decimal to Fraction</CardTitle></CardHeader>
            <CardContent className="flex items-center justify-center gap-2">
                <Input value={dec} onChange={e => setDec(e.target.value)} type="number" className="w-24" />
                <Button onClick={calculate}>=</Button>
                 <span className="text-2xl font-bold">?</span>
                {result && <FractionInput n={result.n} d={result.d} readOnly />}
            </CardContent>
        </Card>
    )
}

function FractionToDecimal() {
    const [frac, setFrac] = useState({ n: '2', d: '7' });
    const [result, setResult] = useState('');

    const calculate = () => {
        const n = parseFloat(frac.n), d = parseFloat(frac.d);
        if (isNaN(n) || isNaN(d) || d === 0) return;
        setResult((n / d).toFixed(8));
    };

    return (
        <Card>
            <CardHeader><CardTitle className="text-xl">Fraction to Decimal</CardTitle></CardHeader>
            <CardContent className="flex items-center justify-center gap-2">
                <FractionInput n={frac.n} d={frac.d} onNChange={v=>setFrac({...frac,n:v})} onDChange={v=>setFrac({...frac,d:v})} />
                <Button onClick={calculate}>=</Button>
                <span className="text-2xl font-bold">?</span>
                {result && <Input value={result} readOnly className="w-24" />}
            </CardContent>
        </Card>
    )
}

function BigNumberFractionCalculator() {
    // This is a simplified version. True big number support would require a dedicated library.
    const { toast } = useToast();
    const [f1, setF1] = useState({ n: '1234', d: '748892928829' });
    const [f2, setF2] = useState({ n: '33434421132232234333', d: '8877277388288288288' });
    const [op, setOp] = useState('+');
    const [result, setResult] = useState<{ n: bigint, d: bigint } | null>(null);

    const calculate = () => {
        try {
            const n1 = BigInt(f1.n), d1 = BigInt(f1.d);
            const n2 = BigInt(f2.n), d2 = BigInt(f2.d);
            if (d1 === 0n || d2 === 0n) throw new Error("Denominator cannot be zero.");

            let resN: bigint, resD: bigint;

            switch (op) {
                case '+': resN = n1 * d2 + n2 * d1; resD = d1 * d2; break;
                case '-': resN = n1 * d2 - n2 * d1; resD = d1 * d2; break;
                default: throw new Error("Only + and - supported for this demo.");
            }
            const commonDivisor = gcd(resN, resD);
            setResult({ n: resN / commonDivisor, d: resD / commonDivisor });
        } catch (e: any) {
            toast({ variant: 'destructive', title: 'Error', description: e.message });
        }
    };
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">Big Number Fraction Calculator</CardTitle>
                <CardDescription>Uses BigInt for large number calculations.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center gap-2">
                <FractionInput n={f1.n} d={f1.d} onNChange={v=>setF1({...f1,n:v})} onDChange={v=>setF1({...f1,d:v})} wide />
                <Select value={op} onValueChange={setOp}><SelectTrigger className="w-[60px]"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="+">+</SelectItem><SelectItem value="-">-</SelectItem></SelectContent></Select>
                <FractionInput n={f2.n} d={f2.d} onNChange={v=>setF2({...f2,n:v})} onDChange={v=>setF2({...f2,d:v})} wide/>
                <Button onClick={calculate}>=</Button>
                <span className="text-2xl font-bold">?</span>
            </CardContent>
            {result && (
                 <CardContent>
                    <FractionInput n={String(result.n)} d={String(result.d)} readOnly wide />
                 </CardContent>
            )}
        </Card>
    );
}

// --- Reusable UI Components ---

const FractionInput = ({ n, d, onNChange, onDChange, readOnly, wide }: { n: string, d: string, onNChange?: (v: string) => void, onDChange?: (v: string) => void, readOnly?: boolean, wide?: boolean }) => (
    <div className={`grid gap-1 ${wide ? 'w-48' : 'w-20'}`}>
        <Input type="text" value={n} onChange={e => onNChange?.(e.target.value)} readOnly={readOnly} className="h-8 text-center" aria-label="Numerator" />
        <div className="h-[2px] bg-foreground" />
        <Input type="text" value={d} onChange={e => onDChange?.(e.target.value)} readOnly={readOnly} className="h-8 text-center" aria-label="Denominator" />
    </div>
);

const MixedNumberInput = ({ w, n, d, onWChange, onNChange, onDChange, readOnly }: { w:string, n:string, d:string, onWChange?: (v:string)=>void, onNChange?: (v:string)=>void, onDChange?: (v:string)=>void, readOnly?:boolean}) => (
    <div className="flex items-center gap-1">
        <Input type="text" value={w} onChange={e => onWChange?.(e.target.value)} readOnly={readOnly} className="w-16 h-12 text-center text-2xl" aria-label="Whole number" />
        <FractionInput n={n} d={d} onNChange={onNChange} onDChange={onDChange} readOnly={readOnly} />
    </div>
);


export default function FractionCalculators() {
    return (
        <div className="space-y-8">
            <BasicFractionCalculator />
            <MixedNumbersCalculator />
            <SimplifyFractionCalculator />
            <DecimalToFraction />
            <FractionToDecimal />
            <BigNumberFractionCalculator />
        </div>
    );
}
