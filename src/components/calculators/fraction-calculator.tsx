
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

// Helper function for GCD using BigInt for large number support
const gcd = (a: bigint, b: bigint): bigint => {
    a = a > 0n ? a : -a; // absolute value
    b = b > 0n ? b : -b; // absolute value
    return b === 0n ? a : gcd(b, a % b);
};

// --- Basic Fraction Calculator ---
interface BasicCalcResult {
  n: bigint;
  d: bigint;
  decimal: string;
  steps: {
    step1: string;
    step2: string;
    step3: string;
    step4: string;
    result: string;
  };
}
function BasicFractionCalculator() {
    const { toast } = useToast();
    const [f1, setF1] = useState({ n: '1', d: '2' });
    const [f2, setF2] = useState({ n: '3', d: '4' });
    const [op, setOp] = useState('+');
    const [result, setResult] = useState<BasicCalcResult | null>(null);

    const calculate = () => {
        try {
            if (!f1.n || !f1.d || !f2.n || !f2.d) {
                setResult(null);
                return;
            }

            const n1 = BigInt(f1.n);
            let d1 = BigInt(f1.d);
            const n2 = BigInt(f2.n);
            let d2 = BigInt(f2.d);

            if (d1 === 0n || d2 === 0n) throw new Error("Denominator cannot be zero.");
            
            if (d1 < 0n) { d1 = -d1; }
            if (d2 < 0n) { d2 = -d2; }


            let resN: bigint, resD: bigint;
            let step1 = '', step2 = '', step3 = '', step4 = '', finalResultStep = '';

            const n1_str = f1.n;
            const d1_str = f1.d;
            const n2_str = f2.n;
            const d2_str = f2.d;
            
            step1 = `${n1_str}/${d1_str} ${op} ${n2_str}/${d2_str}`;

            switch (op) {
                case '+':
                    resN = n1 * d2 + n2 * d1;
                    resD = d1 * d2;
                    step2 = `= (${n1_str} × ${d2_str}) / (${d1_str} × ${d2_str}) + (${n2_str} × ${d1_str}) / (${d2_str} × ${d1_str})`;
                    step3 = `= ${n1*d2}/${resD} + ${n2*d1}/${resD}`;
                    step4 = `= (${n1*d2} + ${n2*d1})/${resD}`;
                    finalResultStep = `= ${resN}/${resD}`;
                    break;
                case '-':
                    resN = n1 * d2 - n2 * d1;
                    resD = d1 * d2;
                    step2 = `= (${n1_str} × ${d2_str}) / (${d1_str} × ${d2_str}) - (${n2_str} × ${d1_str}) / (${d2_str} × ${d1_str})`;
                    step3 = `= ${n1*d2}/${resD} - ${n2*d1}/${resD}`;
                    step4 = `= (${n1*d2} - ${n2*d1})/${resD}`;
                    finalResultStep = `= ${resN}/${resD}`;
                    break;
                case '×':
                    resN = n1 * n2;
                    resD = d1 * d2;
                    step2 = `= (${n1_str} × ${n2_str}) / (${d1_str} × ${d2_str})`;
                    step3 = `= ${resN}/${resD}`;
                    step4 = ``;
                    finalResultStep = `= ${resN}/${resD}`;
                    break;
                case '÷':
                    resN = n1 * d2;
                    resD = d1 * n2;
                    if (resD === 0n) throw new Error("Division by zero fraction.");
                    step2 = `= ${n1_str}/${d1_str} × ${d2_str}/${n2_str}`;
                    step3 = `= (${n1_str} × ${d2_str}) / (${d1_str} × ${n2_str})`;
                    step4 = `= ${resN}/${resD}`;
                    finalResultStep = `= ${resN}/${resD}`;
                    break;
                default:
                    throw new Error("Invalid operator");
            }
            
            let finalN = resN;
            let finalD = resD;
            
            if (resN !== 0n) {
                const commonDivisor = gcd(resN, resD);
                finalN = resN / commonDivisor;
                finalD = resD / commonDivisor;
            } else {
              finalD = 1n;
            }

            if(finalD < 0n) {
                finalN = -finalN;
                finalD = -finalD;
            }
            
            if (resN !== finalN || resD !== finalD) {
                finalResultStep += ` = ${finalN}/${finalD}`;
            }

            const decimal = (Number(resN) / Number(resD)).toFixed(14);

            setResult({ n: finalN, d: finalD, decimal, steps: {step1, step2, step3, step4, result: finalResultStep} });

        } catch (e: any) {
            toast({ variant: 'destructive', title: 'Error', description: e.message });
        }
    };
    
    useEffect(() => {
        calculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [op]);

    return (
        <Card>
            <CardContent className="pt-6">
                <div className="flex flex-wrap items-center justify-center gap-2">
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
                        {result ? <FractionInput n={String(result.n)} d={String(result.d)} readOnly /> : <FractionInput n="?" d="?" readOnly />}
                    </div>
                </div>
            </CardContent>
             {result && (
                <CardFooter className="flex-col items-start gap-4">
                    <div className="w-full p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-md">
                        <p>Result in decimals: <b>{result.decimal}</b></p>
                    </div>
                     <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Show Calculation Steps</AccordionTrigger>
                            <AccordionContent>
                                <div className="p-4 bg-muted rounded-md font-mono text-sm break-words space-y-2">
                                    <p>{result.steps.step1}</p>
                                    {result.steps.step2 && <p>{result.steps.step2}</p>}
                                    {result.steps.step3 && <p>{result.steps.step3}</p>}
                                    {result.steps.step4 && <p>{result.steps.step4}</p>}
                                    {result.steps.result && <p>{result.steps.result}</p>}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardFooter>
            )}
        </Card>
    );
}

// --- Mixed Numbers Calculator ---
interface MixedCalcResult {
  w: bigint;
  n: bigint;
  d: bigint;
  decimal: string;
  steps: string[];
  explanation: string[];
}
function MixedNumbersCalculator() {
    const { toast } = useToast();
    const [m1, setM1] = useState({ w: '1', n: '1', d: '2' });
    const [m2, setM2] = useState({ w: '2', n: '3', d: '4' });
    const [op, setOp] = useState('+');
    const [result, setResult] = useState<MixedCalcResult | null>(null);

    const calculate = () => {
        try {
             if (!m1.w || !m1.n || !m1.d || !m2.w || !m2.n || !m2.d) {
                setResult(null);
                return;
            }

            const w1 = BigInt(m1.w || '0'), n1 = BigInt(m1.n), d1 = BigInt(m1.d);
            const w2 = BigInt(m2.w || '0'), n2 = BigInt(m2.n), d2 = BigInt(m2.d);
            if (d1 === 0n || d2 === 0n) throw new Error("Denominator cannot be zero.");

            const sign1 = w1 < 0n || m1.w.startsWith('-') ? -1n : 1n;
            const sign2 = w2 < 0n || m2.w.startsWith('-') ? -1n : 1n;
            
            const m1Str = `${m1.w} ${m1.n}/${m1.d}`;
            const m2Str = `${m2.w} ${m2.n}/${m2.d}`;

            let resN: bigint, resD: bigint;
            let steps: string[] = [];
            let explanation: string[] = [];

            if (op === '+' || op === '-') {
                steps.push(`${m1Str} ${op} ${m2Str}`);
                steps.push(`= (${m1.w} ${op} ${m2.w}) + (${sign1 < 0 ? `-${m1.n}/${m1.d}` : `${m1.n}/${m1.d}`} ${op} ${sign2 < 0 ? `-${m2.n}/${m2.d}` : `${m2.n}/${m2.d}`})`);
                
                const wholeSum = op === '+' ? w1 + w2 : w1 - w2;
                const fracN1 = n1 * sign1;
                const fracN2 = n2 * sign2;
                const fracResD = d1 * d2; // LCM can be used here for efficiency
                const commonFracN1 = fracN1 * d2;
                const commonFracN2 = fracN2 * d1;

                steps.push(`= ${wholeSum} + (${commonFracN1}/${fracResD} ${op} ${commonFracN2}/${fracResD})`);
                
                const fracResN = op === '+' ? commonFracN1 + commonFracN2 : commonFracN1 - commonFracN2;
                steps.push(`= ${wholeSum} + (${fracResN}/${fracResD})`);

                resN = wholeSum * fracResD + fracResN;
                resD = fracResD;
                
                explanation.push(`For the problem: ${m1Str} ${op} ${m2Str} = ?`);
                explanation.push(`Combine the whole numbers and fractions together: (${m1.w} ${op} ${m2.w}) + (${sign1 < 0 ? `-${m1.n}/${m1.d}` : `${m1.n}/${m1.d}`} ${op} ${sign2 < 0 ? `-${m2.n}/${m2.d}` : `${m2.n}/${m2.d}`})`);
                explanation.push(`The whole numbers part is: ${m1.w} ${op} ${m2.w} = ${wholeSum}`);
                explanation.push(`For the fractions part: The Least Common Multiple (LCM) of ${d1} and ${d2} is ${fracResD}. Multiply the numerator and denominator of each fraction by whatever value will result in the denominator of each fraction being equal to the LCM:`);
                explanation.push(`${fracN1}/${d1} ${op} ${fracN2}/${d2} = ${commonFracN1}/${fracResD} ${op} ${commonFracN2}/${fracResD}`);
                explanation.push(`Now that the fractions have like denominators, perform the operation on the numerators: ${commonFracN1}/${fracResD} ${op} ${commonFracN2}/${fracResD} = ${fracResN}/${fracResD}`);
                explanation.push(`Put the whole number and fraction together: ${wholeSum} + (${fracResN}/${fracResD}) = ${resN}/${resD}`);

            } else { // Multiplication and Division
                 const improperN1 = ( (w1 > 0n ? w1 : -w1) * d1 + n1) * sign1;
                 const improperN2 = ( (w2 > 0n ? w2 : -w2) * d2 + n2) * sign2;
                 resN = op === '×' ? improperN1 * improperN2 : improperN1 * d2;
                 resD = op === '×' ? d1 * d2 : d1 * improperN2;
                 if (op === '÷' && resD === 0n) throw new Error("Division by zero.");

                 steps.push(`${m1Str} ${op} ${m2Str}`);
                 steps.push(`= ${improperN1}/${d1} ${op} ${improperN2}/${d2}`);
                 explanation.push(`First, convert mixed numbers to improper fractions:`);
                 explanation.push(`${m1Str} = ${improperN1}/${d1}`);
                 explanation.push(`${m2Str} = ${improperN2}/${d2}`);
                 if (op === '÷') {
                    steps.push(`= ${improperN1}/${d1} × ${d2}/${improperN2}`);
                    explanation.push(`Then, to divide, multiply by the reciprocal:`);
                 } else {
                    explanation.push(`Then, multiply the fractions:`);
                 }
                 explanation.push(`(${improperN1} × ${op === '×' ? improperN2 : d2}) / (${d1} × ${op === '×' ? d2 : improperN2}) = ${resN}/${resD}`);
            }
            
            const commonDivisor = gcd(resN, resD);
            let finalN = resN / commonDivisor;
            let finalD = resD / commonDivisor;
            
            if (finalD < 0n) {
                finalN = -finalN;
                finalD = -finalD;
            }

            const finalW = finalN / finalD;
            const finalRemainderN = finalN >= 0n ? finalN % finalD : -(finalN % finalD);

            explanation.push(`The simplified improper fraction is: ${finalN}/${finalD}`);

            if (finalW !== 0n && finalRemainderN !== 0n) {
                explanation.push(`The result as a mixed number is: ${finalW} ${finalRemainderN}/${finalD}`);
            }
            
            steps.push(`= ${resN}/${resD}`);
            if (resN !== finalN || resD !== finalD) {
                steps.push(`= ${finalN}/${finalD}`);
            }
            if (finalW !== 0n && finalRemainderN !== 0n) {
                steps.push(`= ${finalW} ${finalRemainderN}/${finalD}`);
            }

            setResult({ w: finalW, n: finalRemainderN, d: finalD, decimal: (Number(resN)/Number(resD)).toFixed(14), steps, explanation });

        } catch (e: any) {
            toast({ variant: 'destructive', title: 'Error', description: e.message });
        }
    };
    
    useEffect(() => {
        calculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [op]);

     return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">Mixed Numbers Calculator</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap items-center justify-center gap-2">
                <MixedNumberInput w={m1.w} n={m1.n} d={m1.d} onWChange={v=>setM1({...m1,w:v})} onNChange={v=>setM1({...m1,n:v})} onDChange={v=>setM1({...m1,d:v})}/>
                <Select value={op} onValueChange={setOp}><SelectTrigger className="w-[60px]"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="+">+</SelectItem><SelectItem value="-">-</SelectItem><SelectItem value="×">×</SelectItem><SelectItem value="÷">÷</SelectItem></SelectContent></Select>
                <MixedNumberInput w={m2.w} n={m2.n} d={m2.d} onWChange={v=>setM2({...m2,w:v})} onNChange={v=>setM2({...m2,n:v})} onDChange={v=>setM2({...m2,d:v})}/>
                <Button onClick={calculate}>=</Button>
                {result ? <MixedNumberInput w={String(result.w)} n={String(result.n)} d={String(result.d)} readOnly /> : <MixedNumberInput w="?" n="?" d="?" readOnly />}
            </CardContent>
             {result && (
                <CardFooter className="flex-col items-start gap-4">
                     <div className="w-full p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-md">
                        <p>Result in decimals: <b>{result.decimal}</b></p>
                    </div>
                     <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Show Calculation Steps</AccordionTrigger>
                            <AccordionContent>
                                <div className="p-4 bg-muted rounded-md font-mono text-sm break-words space-y-2">
                                   {result.steps.map((step, i) => <p key={i}>{step}</p>)}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                         <AccordionItem value="item-2">
                            <AccordionTrigger>Show Further Explanation</AccordionTrigger>
                            <AccordionContent>
                                <div className="p-4 bg-muted rounded-md text-sm break-words space-y-2">
                                   {result.explanation.map((exp, i) => <p key={i}>{exp}</p>)}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardFooter>
            )}
        </Card>
    );
}

// --- Other Calculators ---

function SimplifyFractionCalculator() {
    const { toast } = useToast();
    const [frac, setFrac] = useState({ n: '12', d: '18' });
    const [result, setResult] = useState<{ n: bigint, d: bigint } | null>(null);

    const calculate = () => {
        try {
            if (!frac.n || !frac.d) {
                setResult(null);
                return;
            }
            const n = BigInt(frac.n);
            let d = BigInt(frac.d);
            if (d === 0n) throw new Error("Denominator cannot be zero.");

            let finalN = n;
            let finalD = d;

            if (d < 0n) {
              finalN = -n;
              finalD = -d;
            }

            const common = gcd(finalN, finalD);
            setResult({ n: finalN / common, d: finalD / common });
        } catch (e: any) {
            toast({ variant: 'destructive', title: 'Error', description: e.message });
        }
    };
    
     useEffect(() => {
        calculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Card>
            <CardHeader><CardTitle className="text-xl">Simplify Fractions Calculator</CardTitle></CardHeader>
            <CardContent className="flex items-center justify-center gap-2">
                <FractionInput n={frac.n} d={frac.d} onNChange={v=>setFrac({...frac, n:v})} onDChange={v=>setFrac({...frac, d:v})} />
                <Button onClick={calculate}>=</Button>
                {result ? <FractionInput n={String(result.n)} d={String(result.d)} readOnly /> : <FractionInput n="?" d="?" readOnly />}
            </CardContent>
        </Card>
    );
}


function DecimalToFraction() {
    const { toast } = useToast();
    const [dec, setDec] = useState('0.75');
    const [result, setResult] = useState<{ n: bigint; d: bigint; w: bigint; rem: bigint; steps: string[] } | null>(null);

    const calculate = () => {
      try {
        if (!dec) {
            setResult(null);
            return;
        }
        const num = parseFloat(dec);
        if (isNaN(num)) {
          setResult(null);
          return;
        }

        const str = dec.toString();
        const decimalPart = str.split('.')[1] || '';
        const p = decimalPart.length;

        const multiplier = 10 ** p;
        const initialNum = BigInt(Math.round(num * multiplier));
        const initialDen = BigInt(multiplier);

        const common = gcd(initialNum, initialDen);
        const finalN = initialNum / common;
        const finalD = initialDen / common;

        const w = finalN / finalD;
        const rem = finalN % finalD;
        
        let steps = [
            `${dec} = (${dec} × ${multiplier}) / (1 × ${multiplier}) = ${initialNum}/${initialDen}`
        ];

        if (common > 1) {
            steps.push(`= (${initialNum} ÷ ${common}) / (${initialDen} ÷ ${common}) = ${finalN}/${finalD}`);
        }

        if (w > 0n && rem !== 0n) {
            steps.push(`= ${w} ${rem}/${finalD}`);
        }

        setResult({ n: finalN, d: finalD, w, rem, steps });
      } catch (e: any) {
         toast({ variant: 'destructive', title: 'Error', description: 'Could not convert decimal.' });
      }
    };
    
    useEffect(() => {
        calculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dec]);
    
    return (
        <Card>
            <CardHeader><CardTitle className="text-xl">Decimal to Fraction</CardTitle></CardHeader>
            <CardContent className="flex items-center justify-center gap-2">
                <Input value={dec} onChange={e => setDec(e.target.value)} type="number" className="w-24" />
                <Button onClick={calculate}>=</Button>
                {result ? (
                    <div className="flex items-center gap-2">
                        <FractionInput n={String(result.n)} d={String(result.d)} readOnly />
                         {result.w > 0 && result.rem !== 0n && (
                            <>
                                <span>=</span>
                                <MixedNumberInput w={String(result.w)} n={String(result.rem)} d={String(result.d)} readOnly />
                            </>
                        )}
                    </div>
                ) : <FractionInput n="?" d="?" readOnly />}
            </CardContent>
            {result && (
                <CardFooter>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Show Calculation Steps</AccordionTrigger>
                            <AccordionContent>
                                <div className="p-4 bg-muted rounded-md font-mono text-sm break-words space-y-2">
                                   {result.steps.map((step, i) => <p key={i}>{step}</p>)}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardFooter>
            )}
        </Card>
    )
}

function FractionToDecimal() {
    const { toast } = useToast();
    const [frac, setFrac] = useState({ n: '3', d: '4' });
    const [result, setResult] = useState('');

    const calculate = () => {
      try {
        if (!frac.n || !frac.d) {
            setResult('');
            return;
        }
        const n = parseFloat(frac.n), d = parseFloat(frac.d);
        if (isNaN(n) || isNaN(d) || d === 0) {
            if(d === 0) throw new Error("Denominator cannot be zero.");
            setResult('');
            return;
        }
        setResult((n / d).toFixed(6));
      } catch (e: any) {
        toast({ variant: 'destructive', title: 'Error', description: e.message });
      }
    };
    
    useEffect(() => {
        calculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [frac]);

    return (
        <Card>
            <CardHeader><CardTitle className="text-xl">Fraction to Decimal</CardTitle></CardHeader>
            <CardContent className="flex items-center justify-center gap-2">
                <FractionInput n={frac.n} d={frac.d} onNChange={v=>setFrac({...frac,n:v})} onDChange={v=>setFrac({...frac,d:v})} />
                <Button onClick={calculate}>=</Button>
                {result ? <Input value={result} readOnly className="w-24" /> : <Input value="?" readOnly className="w-24" />}
            </CardContent>
        </Card>
    )
}

function BigNumberFractionCalculator() {
    const { toast } = useToast();
    const [f1, setF1] = useState({ n: '98765432109876543210', d: '12345678901234567890' });
    const [f2, setF2] = useState({ n: '1', d: '2' });
    const [op, setOp] = useState('+');
    const [result, setResult] = useState<{ n: bigint, d: bigint, w: bigint, rem: bigint } | null>(null);

    const calculate = () => {
        try {
            if (!f1.n || !f1.d || !f2.n || !f2.d) {
                setResult(null);
                return;
            }
            const n1 = BigInt(f1.n), d1 = BigInt(f1.d);
            const n2 = BigInt(f2.n), d2 = BigInt(f2.d);
            if (d1 === 0n || d2 === 0n) throw new Error("Denominator cannot be zero.");

            let resN: bigint, resD: bigint;

            switch (op) {
                case '+': resN = n1 * d2 + n2 * d1; resD = d1 * d2; break;
                case '-': resN = n1 * d2 - n2 * d1; resD = d1 * d2; break;
                case '×': resN = n1 * n2; resD = d1 * d2; break;
                case '÷': resN = n1 * d2; resD = d1 * n2; if (resD === 0n) throw new Error("Division by zero."); break;
                default: throw new Error("Invalid operator");
            }
            
            const commonDivisor = gcd(resN, resD);
            const finalN = resN / commonDivisor;
            const finalD = resD / commonDivisor;
            
            const finalW = finalN / finalD;
            const finalRem = finalN >= 0n ? finalN % finalD : -(finalN % finalD);


            setResult({ n: finalN, d: finalD, w: finalW, rem: finalRem });
        } catch (e: any) {
            toast({ variant: 'destructive', title: 'Error', description: 'Could not calculate. Ensure inputs are valid integers.' });
        }
    };
    
    useEffect(() => {
        calculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [op]);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">Big Number Fraction Calculator</CardTitle>
                <CardDescription>Uses BigInt for large number calculations.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap items-center justify-center gap-2">
                <FractionInput n={f1.n} d={f1.d} onNChange={v=>setF1({...f1,n:v})} onDChange={v=>setF1({...f1,d:v})} wide />
                <Select value={op} onValueChange={setOp}>
                  <SelectTrigger className="w-[60px]"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="+">+</SelectItem>
                    <SelectItem value="-">-</SelectItem>
                    <SelectItem value="×">×</SelectItem>
                    <SelectItem value="÷">÷</SelectItem>
                  </SelectContent>
                </Select>
                <FractionInput n={f2.n} d={f2.d} onNChange={v=>setF2({...f2,n:v})} onDChange={v=>setF2({...f2,d:v})} wide/>
                <Button onClick={calculate}>=</Button>
            </CardContent>
            {result && (
                 <CardContent className="flex flex-col items-center justify-center gap-4">
                    <FractionInput n={String(result.n)} d={String(result.d)} readOnly wide />
                    {result.w !== 0n && result.rem !== 0n && (
                        <>
                            <span>=</span>
                            <MixedNumberInput w={String(result.w)} n={String(result.rem)} d={String(result.d)} readOnly wide />
                        </>
                    )}
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

const MixedNumberInput = ({ w, n, d, onWChange, onNChange, onDChange, readOnly, wide }: { w:string, n:string, d:string, onWChange?: (v:string)=>void, onNChange?: (v:string)=>void, onDChange?: (v:string)=>void, readOnly?:boolean, wide?: boolean}) => (
    <div className="flex items-center gap-1">
        <Input type="text" value={w} onChange={e => onWChange?.(e.target.value)} readOnly={readOnly} className={`h-12 text-center text-2xl ${wide ? 'w-48' : 'w-16'}`} aria-label="Whole number" />
        <FractionInput n={n} d={d} onNChange={onNChange} onDChange={onDChange} readOnly={readOnly} wide={wide} />
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
