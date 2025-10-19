
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '../ui/textarea';

const SimpleGenerator = () => {
    const { toast } = useToast();
    const [lower, setLower] = useState('1');
    const [upper, setUpper] = useState('100');
    const [result, setResult] = useState('');

    const generate = () => {
        const min = parseInt(lower);
        const max = parseInt(upper);
        if (isNaN(min) || isNaN(max) || min > max) {
            toast({ variant: 'destructive', title: 'Invalid Range', description: 'Please ensure the lower limit is not greater than the upper limit.' });
            return;
        }
        const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
        setResult(randomInt.toString());
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Simple Integer Generator</CardTitle>
                <CardDescription>Generates a single random integer within a specified range.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="simple-lower">Lower Limit</Label>
                        <Input id="simple-lower" type="number" value={lower} onChange={e => setLower(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="simple-upper">Upper Limit</Label>
                        <Input id="simple-upper" type="number" value={upper} onChange={e => setUpper(e.target.value)} />
                    </div>
                </div>
                <Button onClick={generate} className="w-full">Generate</Button>
            </CardContent>
            {result && (
                <CardFooter>
                    <div className="w-full p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-md text-center">
                        <h3 className="font-bold text-2xl font-mono">{result}</h3>
                    </div>
                </CardFooter>
            )}
        </Card>
    );
}

const ComprehensiveGenerator = () => {
    const { toast } = useToast();
    const [lower, setLower] = useState('1');
    const [upper, setUpper] = useState('1000');
    const [count, setCount] = useState('5');
    const [type, setType] = useState<'integer' | 'decimal'>('decimal');
    const [precision, setPrecision] = useState('10');
    const [results, setResults] = useState<string[]>([]);

    const generate = () => {
        const min = parseFloat(lower);
        const max = parseFloat(upper);
        const numCount = parseInt(count);
        const prec = parseInt(precision);

        if (isNaN(min) || isNaN(max) || min > max || isNaN(numCount) || numCount <= 0 || isNaN(prec) || prec < 0) {
            toast({ variant: 'destructive', title: 'Invalid Parameters', description: 'Please check all your inputs for correctness.' });
            return;
        }

        const generated = [];
        for (let i = 0; i < numCount; i++) {
            const randomNum = Math.random() * (max - min) + min;
            if (type === 'integer') {
                generated.push(Math.floor(randomNum).toString());
            } else {
                generated.push(randomNum.toFixed(prec));
            }
        }
        setResults(generated);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Comprehensive Generator</CardTitle>
                <CardDescription>Generate one or many random integers or decimals with specified precision.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="comp-lower">Lower Limit</Label>
                        <Input id="comp-lower" type="number" value={lower} onChange={e => setLower(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="comp-upper">Upper Limit</Label>
                        <Input id="comp-upper" type="number" value={upper} onChange={e => setUpper(e.target.value)} />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="comp-count">Generate how many numbers?</Label>
                    <Input id="comp-count" type="number" value={count} onChange={e => setCount(e.target.value)} min="1" />
                </div>
                <div className="space-y-2">
                    <Label>Type of result to generate?</Label>
                    <RadioGroup value={type} onValueChange={(val) => setType(val as 'integer' | 'decimal')} className="flex gap-4">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="integer" id="r-int" />
                            <Label htmlFor="r-int">Integer</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="decimal" id="r-dec" />
                            <Label htmlFor="r-dec">Decimal</Label>
                        </div>
                    </RadioGroup>
                </div>
                {type === 'decimal' && (
                    <div className="space-y-2">
                        <Label htmlFor="comp-precision">Precision (decimal places)</Label>
                        <Input id="comp-precision" type="number" value={precision} onChange={e => setPrecision(e.target.value)} min="0" />
                    </div>
                )}
                <Button onClick={generate} className="w-full">Generate Numbers</Button>
            </CardContent>
            {results.length > 0 && (
                 <CardFooter>
                    <div className="w-full p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-md">
                        <h3 className="font-bold text-lg mb-2">Generated Numbers</h3>
                        <Textarea readOnly value={results.join(', ')} className="font-mono bg-background" rows={Math.min(5, results.length)} />
                    </div>
                </CardFooter>
            )}
        </Card>
    );
};

export default function RandomNumberGenerator() {
    return (
        <div className="space-y-8">
            <SimpleGenerator />
            <ComprehensiveGenerator />
        </div>
    );
}
