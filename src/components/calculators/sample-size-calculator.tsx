
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const confidenceLevels = [
    { label: "70%", value: "1.04" },
    { label: "75%", value: "1.15" },
    { label: "80%", value: "1.28" },
    { label: "85%", value: "1.44" },
    { label: "90%", value: "1.645" },
    { label: "92%", value: "1.75" },
    { label: "95%", value: "1.96" },
    { label: "96%", value: "2.05" },
    { label: "98%", value: "2.33" },
    { label: "99%", value: "2.58" },
    { label: "99.9%", value: "3.29" },
    { label: "99.99%", value: "3.89" },
    { label: "99.999%", value: "4.42" },
];

function FindSampleSize() {
    const { toast } = useToast();
    const [confidence, setConfidence] = useState("1.96");
    const [marginError, setMarginError] = useState('');
    const [popProp, setPopProp] = useState("50");
    const [popSize, setPopSize] = useState("");
    const [result, setResult] = useState<number | null>(null);

    const calculate = () => {
        const z = parseFloat(confidence);
        const e = parseFloat(marginError) / 100;
        const p = parseFloat(popProp) / 100;
        const N = popSize ? parseFloat(popSize) : Infinity;

        if (isNaN(z) || isNaN(e) || isNaN(p) || p < 0 || p > 1 || e <= 0) {
            if(marginError) {
                toast({
                    variant: 'destructive',
                    title: "Invalid Input",
                    description: "Please check your inputs. Margin of error must be positive and proportion between 0-100.",
                });
            }
            setResult(null);
            return;
        }

        const n0 = (Math.pow(z, 2) * p * (1 - p)) / Math.pow(e, 2);
        let n = N !== Infinity ? (n0 * N) / (n0 + N - 1) : n0;
        n = Math.ceil(n);

        setResult(n);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Find Out The Sample Size</CardTitle>
                <CardDescription>This calculator computes the minimum number of necessary samples to meet the desired statistical constraints.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="ss-confidence">Confidence Level</Label>
                    <Select value={confidence} onValueChange={setConfidence}>
                        <SelectTrigger id="ss-confidence"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            {confidenceLevels.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="ss-marginError">Margin of Error (%)</Label>
                    <Input id="ss-marginError" type="number" value={marginError} onChange={(e) => setMarginError(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="ss-popProp">Population Proportion (%)</Label>
                    <Input id="ss-popProp" type="number" value={popProp} onChange={(e) => setPopProp(e.target.value)} />
                    <p className="text-xs text-muted-foreground">Use 50% if not sure</p>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="ss-popSize">Population Size</Label>
                    <Input id="ss-popSize" type="number" value={popSize} onChange={(e) => setPopSize(e.target.value)} placeholder="Leave blank if unlimited" />
                </div>
                <Button onClick={calculate} className="w-full">Calculate Sample Size</Button>
            </CardContent>
            {result !== null && (
                <CardFooter>
                    <div className="w-full p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-md">
                        <h3 className="font-bold text-lg">Required Sample Size: <span className="text-primary">{result}</span></h3>
                    </div>
                </CardFooter>
            )}
        </Card>
    );
}

function FindMarginOfError() {
    const { toast } = useToast();
    const [confidence, setConfidence] = useState("1.96");
    const [sampleSize, setSampleSize] = useState("");
    const [popProp, setPopProp] = useState("50");
    const [popSize, setPopSize] = useState("");
    const [result, setResult] = useState<number | null>(null);

    const calculate = () => {
        const z = parseFloat(confidence);
        const n = parseFloat(sampleSize);
        const p = parseFloat(popProp) / 100;
        const N = popSize ? parseFloat(popSize) : Infinity;

        if (isNaN(z) || isNaN(n) || isNaN(p) || p < 0 || p > 1 || n <= 0) {
             if (sampleSize) {
                toast({
                    variant: 'destructive',
                    title: "Invalid Input",
                    description: "Please check your inputs. Sample size must be positive and proportion between 0-100.",
                });
            }
            setResult(null);
            return;
        }

        let e;
        if (N === Infinity) {
            e = z * Math.sqrt((p * (1 - p)) / n);
        } else {
            if (n > N) {
                toast({ variant: 'destructive', title: "Invalid Input", description: "Sample size cannot be larger than population size."});
                return;
            }
            e = z * Math.sqrt(((p * (1 - p)) / n) * ((N - n) / (N - 1)));
        }

        setResult(e * 100);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Find Out the Margin of Error</CardTitle>
                <CardDescription>This calculator gives out the margin of error or confidence interval of observation or survey.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="space-y-2">
                    <Label htmlFor="moe-confidence">Confidence Level</Label>
                    <Select value={confidence} onValueChange={setConfidence}>
                        <SelectTrigger id="moe-confidence"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            {confidenceLevels.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="moe-sampleSize">Sample Size</Label>
                    <Input id="moe-sampleSize" type="number" value={sampleSize} onChange={(e) => setSampleSize(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="moe-popProp">Population Proportion (%)</Label>
                    <Input id="moe-popProp" type="number" value={popProp} onChange={(e) => setPopProp(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="moe-popSize">Population Size</Label>
                    <Input id="moe-popSize" type="number" value={popSize} onChange={(e) => setPopSize(e.target.value)} placeholder="Leave blank if unlimited" />
                </div>
                <Button onClick={calculate} className="w-full">Calculate Margin of Error</Button>
            </CardContent>
            {result !== null && (
                <CardFooter>
                    <div className="w-full p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-md">
                        <h3 className="font-bold text-lg">Margin of Error: <span className="text-primary">±{result.toFixed(2)}%</span></h3>
                    </div>
                </CardFooter>
            )}
        </Card>
    );
}

export default function SampleSizeCalculator() {
    return (
        <div className="space-y-8">
            <FindSampleSize />
            <FindMarginOfError />
        </div>
    )
}
