
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
    sampleSize?: number;
    marginOfError?: number;
    z: number;
    p: number;
    N: number | string;
}

export default function SampleSizeCalculator() {
    const { toast } = useToast();
    const [confidence, setConfidence] = useState("1.96");
    const [marginError, setMarginError] = useState("");
    const [sampleSize, setSampleSize] = useState("100");
    const [popProp, setPopProp] = useState("60");
    const [popSize, setPopSize] = useState("");
    const [result, setResult] = useState<ResultState | null>(null);

    const calculate = () => {
        const z = parseFloat(confidence);
        const p = parseFloat(popProp) / 100;
        const N = popSize ? parseFloat(popSize) : Infinity;

        if (isNaN(z) || isNaN(p) || p < 0 || p > 1) {
            toast({
                variant: 'destructive',
                title: "Invalid Input",
                description: "Please check your proportion. It must be between 0-100.",
            });
            return;
        }

        if (sampleSize && !marginError) {
            // Calculate Margin of Error
            const n = parseFloat(sampleSize);
            if(isNaN(n) || n <= 0) {
                 toast({ variant: 'destructive', title: "Invalid Sample Size", description: "Sample size must be a positive number."});
                 return;
            }

            let e;
            if (N === Infinity) {
                e = z * Math.sqrt((p * (1 - p)) / n);
            } else {
                e = z * Math.sqrt((p * (1 - p)) / n) * Math.sqrt((N - n) / (N - 1));
            }
            
            setResult({
                marginOfError: e * 100,
                z,
                p: p * 100,
                N: N === Infinity ? 'Unlimited' : N,
                sampleSize: n,
            });

        } else if (marginError && !sampleSize) {
            // Calculate Sample Size
            const e = parseFloat(marginError) / 100;
            if(isNaN(e) || e <= 0) {
                 toast({ variant: 'destructive', title: "Invalid Margin of Error", description: "Margin of error must be a positive number."});
                 return;
            }
            
            const n0 = (Math.pow(z, 2) * p * (1 - p)) / Math.pow(e, 2);
            let n = N !== Infinity ? (n0 * N) / (n0 + N - 1) : n0;
            n = Math.ceil(n);
            
            setResult({
                sampleSize: n,
                z,
                marginOfError: e * 100,
                p: p * 100,
                N: N === Infinity ? 'Unlimited' : N,
            });
        } else {
            toast({
                variant: 'destructive',
                title: "Invalid Input",
                description: "Please fill either 'Sample Size' or 'Margin of Error', but not both.",
            });
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Calculator</CardTitle>
                <CardDescription>Enter details to find sample size or margin of error.</CardDescription>
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
                        <Label htmlFor="sampleSize">Sample Size</Label>
                        <Input id="sampleSize" type="number" value={sampleSize} onChange={(e) => setSampleSize(e.target.value)} placeholder="e.g., 100" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="marginError">Margin of Error (%)</Label>
                        <Input id="marginError" type="number" value={marginError} onChange={(e) => setMarginError(e.target.value)} placeholder="e.g., 5" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="popProp">Population Proportion (%)</Label>
                        <Input id="popProp" type="number" value={popProp} onChange={(e) => setPopProp(e.target.value)} />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="popSize">Population Size (optional)</Label>
                        <Input id="popSize" type="number" value={popSize} onChange={(e) => setPopSize(e.target.value)} placeholder="Leave blank if unlimited" />
                    </div>
                </div>
                <Button onClick={calculate} className="w-full">Calculate</Button>
            </CardContent>
            {result && (
                <CardFooter>
                    <div className="w-full p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-md">
                        {result.sampleSize && !result.marginOfError && (
                             <h3 className="font-bold text-lg">Required Sample Size: <span className="text-primary">{result.sampleSize}</span></h3>
                        )}
                        {result.marginOfError && (
                             <h3 className="font-bold text-lg">Margin of Error: <span className="text-primary">±{result.marginOfError.toFixed(2)}%</span></h3>
                        )}
                        <div className="text-sm text-muted-foreground mt-2 space-y-1">
                             {result.sampleSize && <p>Sample Size: {result.sampleSize}</p>}
                            <p>Confidence Level: {confidenceLevels.find(c => c.value === String(result.z))?.label} (z={result.z})</p>
                             {result.marginOfError && <p>Margin of Error: {result.marginOfError.toFixed(2)}%</p>}
                            <p>Population Proportion: {result.p}%</p>
                            <p>Population Size: {result.N}</p>
                        </div>
                    </div>
                </CardFooter>
            )}
        </Card>
    );
}
