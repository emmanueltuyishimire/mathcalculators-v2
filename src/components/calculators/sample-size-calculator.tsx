
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

interface ResultState {
    sampleSize: number;
    z: number;
    e: number;
    p: number;
    N: number | string;
}

export default function SampleSizeCalculator() {
    const { toast } = useToast();
    const [confidence, setConfidence] = useState("1.96");
    const [marginError, setMarginError] = useState("5");
    const [popProp, setPopProp] = useState("50");
    const [popSize, setPopSize] = useState("");
    const [result, setResult] = useState<ResultState | null>(null);

    const calculateSampleSize = () => {
        const z = parseFloat(confidence);
        const e = parseFloat(marginError) / 100;
        const p = parseFloat(popProp) / 100;
        const N = popSize ? parseFloat(popSize) : Infinity;

        if (isNaN(z) || isNaN(e) || isNaN(p) || e <= 0 || p < 0 || p > 1) {
            toast({
                variant: 'destructive',
                title: "Invalid Input",
                description: "Please check your inputs. Margin of error must be > 0 and proportion between 0-100.",
            });
            return;
        }

        // Initial sample size for infinite population
        const n0 = (Math.pow(z, 2) * p * (1 - p)) / Math.pow(e, 2);

        // Adjust for finite population if size is given
        let n = N !== Infinity ? (n0 * N) / (n0 + N - 1) : n0;
        
        n = Math.ceil(n);

        setResult({
            sampleSize: n,
            z,
            e: e * 100,
            p: p * 100,
            N: N === Infinity ? 'Unlimited' : N,
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Sample Size Calculator</CardTitle>
                <CardDescription>Fill in the details to find the required sample size.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="confidence">Confidence Level</Label>
                        <Select value={confidence} onValueChange={setConfidence}>
                            <SelectTrigger id="confidence"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                {confidenceLevels.map(c => (
                                    <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="marginError">Margin of Error (%)</Label>
                        <Input id="marginError" type="number" value={marginError} onChange={(e) => setMarginError(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="popProp">Population Proportion (%)</Label>
                        <Input id="popProp" type="number" value={popProp} onChange={(e) => setPopProp(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="popSize">Population Size (optional)</Label>
                        <Input id="popSize" type="number" value={popSize} onChange={(e) => setPopSize(e.target.value)} placeholder="Leave blank if unlimited" />
                    </div>
                </div>
                <Button onClick={calculateSampleSize} className="w-full">Calculate Sample Size</Button>
            </CardContent>
            {result && (
                <CardFooter>
                    <div className="w-full p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-md">
                        <h3 className="font-bold text-lg">Required Sample Size: <span className="text-primary">{result.sampleSize}</span></h3>
                        <div className="text-sm text-muted-foreground mt-2">
                            <p>Confidence Level (z-score): {result.z}</p>
                            <p>Margin of Error: {result.e}%</p>
                            <p>Population Proportion: {result.p}%</p>
                            <p>Population Size: {result.N}</p>
                        </div>
                    </div>
                </CardFooter>
            )}
        </Card>
    );
}
