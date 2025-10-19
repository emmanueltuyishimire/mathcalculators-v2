
"use client";

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '../ui/separator';

const ThreeFieldCalculator = () => {
    const { toast } = useToast();
    const [part, setPart] = useState('');
    const [whole, setWhole] = useState('150');
    const [percent, setPercent] = useState('25');

    const calculate = () => {
        const numPart = parseFloat(part);
        const numWhole = parseFloat(whole);
        const numPercent = parseFloat(percent);

        const knownValues = [!isNaN(numPart), !isNaN(numWhole), !isNaN(numPercent)].filter(Boolean).length;
        if (knownValues !== 2) {
            toast({
                variant: 'destructive',
                title: 'Invalid Input',
                description: 'Please provide exactly two values to calculate the third.',
            });
            return;
        }

        try {
            if (isNaN(numPart)) {
                if (numPercent < 0 || numWhole < 0) throw new Error("Percentage and whole must be non-negative.");
                setPart(((numPercent / 100) * numWhole).toFixed(2));
            } else if (isNaN(numPercent)) {
                if (numPart < 0 || numWhole <= 0) throw new Error("Part must be non-negative and whole must be positive.");
                setPercent(((numPart / numWhole) * 100).toFixed(2));
            } else { // isNaN(numWhole)
                if (numPart < 0 || numPercent <= 0) throw new Error("Part must be non-negative and percentage must be positive.");
                setWhole((numPart / (numPercent / 100)).toFixed(2));
            }
        } catch(e: any) {
             toast({ variant: 'destructive', title: 'Error', description: e.message });
        }
    };
    
    const handleClear = () => {
        setPart('');
        setWhole('');
        setPercent('');
    }

    return (
        <Card className="w-full">
            <CardHeader>
                 <CardTitle>Percentage Calculator</CardTitle>
                 <CardDescription>Provide any two values below to find the third.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-wrap items-center gap-2 text-lg">
                    <Input className="flex-1 min-w-[60px]" type="number" placeholder="Percentage" value={percent} onChange={e => setPercent(e.target.value)} aria-label="Percentage" />
                     <span className="font-semibold">% of</span>
                    <Input className="flex-1 min-w-[60px]" type="number" placeholder="Whole" value={whole} onChange={e => setWhole(e.target.value)} aria-label="Whole value" />
                     <span className="font-semibold">=</span>
                    <Input className="flex-1 min-w-[60px]" type="number" placeholder="Part" value={part} onChange={e => setPart(e.target.value)} aria-label="Part value" />
                </div>
                <div className="flex gap-2">
                    <Button onClick={calculate} className="w-full">Calculate</Button>
                    <Button onClick={handleClear} variant="outline" className="w-full">Clear</Button>
                </div>
            </CardContent>
        </Card>
    )
};


const CommonPhrasesCalculator = () => {
    const [val1, setVal1] = useState({p: '25', w: '150', r: ''});
    const [val2, setVal2] = useState({part: '37.5', whole: '150', r: ''});
    const [val3, setVal3] = useState({part: '37.5', p: '25', r: ''});
    
    const calc1 = () => {
        const p = parseFloat(val1.p);
        const w = parseFloat(val1.w);
        if(!isNaN(p) && !isNaN(w)) setVal1({...val1, r: ((p/100) * w).toFixed(2)});
    }
    const calc2 = () => {
        const part = parseFloat(val2.part);
        const whole = parseFloat(val2.whole);
        if(!isNaN(part) && !isNaN(whole) && whole !== 0) setVal2({...val2, r: ((part/whole) * 100).toFixed(2)});
    }
     const calc3 = () => {
        const part = parseFloat(val3.part);
        const p = parseFloat(val3.p);
        if(!isNaN(part) && !isNaN(p) && p !== 0) setVal3({...val3, r: (part / (p/100)).toFixed(2)});
    }

    return (
        <Card className="w-full">
            <CardHeader>
                 <CardTitle>Percentage in Common Phrases</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Calculator 1 */}
                <div className="space-y-2">
                     <div className="flex flex-wrap items-center gap-2">
                        <span>What is</span>
                        <Input className="w-24" type="number" value={val1.p} onChange={e => setVal1({...val1, p: e.target.value})} aria-label="Percentage for what is phrase" />
                        <span>% of</span>
                        <Input className="w-24" type="number" value={val1.w} onChange={e => setVal1({...val1, w: e.target.value})} aria-label="Whole for what is phrase" />
                        <span>?</span>
                    </div>
                     <div className="flex items-center gap-2">
                        <Button size="sm" onClick={calc1}>Calculate</Button>
                        <Input readOnly value={val1.r} className="bg-muted w-28" aria-label="Result for what is phrase" />
                    </div>
                </div>

                <Separator />
                
                {/* Calculator 2 */}
                <div className="space-y-2">
                     <div className="flex flex-wrap items-center gap-2">
                        <Input className="w-24" type="number" value={val2.part} onChange={e => setVal2({...val2, part: e.target.value})} aria-label="Part for is what percent phrase" />
                        <span>is what % of</span>
                        <Input className="w-24" type="number" value={val2.whole} onChange={e => setVal2({...val2, whole: e.target.value})} aria-label="Whole for is what percent phrase" />
                        <span>?</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button size="sm" onClick={calc2}>Calculate</Button>
                        <Input readOnly value={val2.r} className="bg-muted w-28" aria-label="Result for is what percent phrase" />
                    </div>
                </div>

                <Separator />
                
                {/* Calculator 3 */}
                <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                        <Input className="w-24" type="number" value={val3.part} onChange={e => setVal3({...val3, part: e.target.value})} aria-label="Part for is percent of what phrase" />
                        <span>is</span>
                        <Input className="w-24" type="number" value={val3.p} onChange={e => setVal3({...val3, p: e.target.value})} aria-label="Percentage for is percent of what phrase" />
                        <span>% of what?</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button size="sm" onClick={calc3}>Calculate</Button>
                        <Input readOnly value={val3.r} className="bg-muted w-28" aria-label="Result for is percent of what phrase" />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default function PercentageCalculator() {
    return (
        <div className="space-y-8">
            <ThreeFieldCalculator />
            <CommonPhrasesCalculator />
        </div>
    );
}
