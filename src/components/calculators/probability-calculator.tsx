
"use client";

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { jStat } from 'jstat';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface TwoEventResult {
    pAnot: number;
    pBnot: number;
    pAandB: number;
    pAorB: number;
    pXorB: number;
    pNeither: number;
    pAnotB: number;
    pBnotA: number;
}

function TwoEventsCalculator() {
  const { toast } = useToast();
  const [pA, setPA] = useState('0.5');
  const [pB, setPB] = useState('0.4');
  const [results, setResults] = useState<TwoEventResult | null>(null);

  const calculate = () => {
    const pA_num = parseFloat(pA);
    const pB_num = parseFloat(pB);

    if (isNaN(pA_num) || isNaN(pB_num) || pA_num < 0 || pA_num > 1 || pB_num < 0 || pB_num > 1) {
      toast({ variant: 'destructive', title: 'Invalid Input', description: 'Please input valid probabilities between 0 and 1.' });
      return;
    }

    const pAnot = 1 - pA_num;
    const pBnot = 1 - pB_num;
    const pAandB = pA_num * pB_num;
    const pAorB = pA_num + pB_num - pAandB;
    const pXorB = pA_num + pB_num - 2 * pAandB;
    const pNeither = pAnot * pBnot;
    const pAnotB = pA_num * (1 - pB_num);
    const pBnotA = (1 - pA_num) * pB_num;


    setResults({ pAnot, pBnot, pAandB, pAorB, pXorB, pNeither, pAnotB, pBnotA });
  };
  
  const resultEntries = results ? [
      { label: "Probability of A NOT occuring: P(A')", value: results.pAnot, formula: `1 - P(A) = 1 - ${pA} = ${results.pAnot.toFixed(4)}`},
      { label: "Probability of B NOT occuring: P(B')", value: results.pBnot, formula: `1 - P(B) = 1 - ${pB} = ${results.pBnot.toFixed(4)}`},
      { label: "Probability of A and B both occuring: P(A∩B)", value: results.pAandB, formula: `P(A) × P(B) = ${pA} × ${pB} = ${results.pAandB.toFixed(4)}`},
      { label: "Probability that A or B or both occur: P(A∪B)", value: results.pAorB, formula: `P(A) + P(B) - P(A∩B) = ${pA} + ${pB} - ${results.pAandB.toFixed(4)} = ${results.pAorB.toFixed(4)}`},
      { label: "Probability that A or B occurs but NOT both: P(AΔB)", value: results.pXorB, formula: `P(A) + P(B) - 2P(A∩B) = ${pA} + ${pB} - 2×${results.pAandB.toFixed(4)} = ${results.pXorB.toFixed(4)}`},
      { label: "Probability of neither A nor B occuring: P((A∪B)')", value: results.pNeither, formula: `1 - P(A∪B) = 1 - ${results.pAorB.toFixed(4)} = ${results.pNeither.toFixed(4)}`},
      { label: "Probability of A occuring but NOT B:", value: results.pAnotB, formula: `P(A) × (1- P(B)) = ${pA} × (1 - ${pB}) = ${results.pAnotB.toFixed(4)}`},
      { label: "Probability of B occuring but NOT A:", value: results.pBnotA, formula: `(1 - P(A)) × P(B) = (1 - ${pA}) × ${pB} = ${results.pBnotA.toFixed(4)}`},
  ] : [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Probability of Two Independent Events</CardTitle>
        <CardDescription>To find out the union, intersection, and other related probabilities of two independent events.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4">
          <div className="space-y-2">
            <Label htmlFor="pA">P(A)</Label>
            <Input id="pA" type="number" step="0.01" min="0" max="1" value={pA} onChange={e => setPA(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pB">P(B)</Label>
            <Input id="pB" type="number" step="0.01" min="0" max="1" value={pB} onChange={e => setPB(e.target.value)} />
          </div>
        </div>
        <Button onClick={calculate}>Calculate</Button>
      </CardContent>
      {results && (
        <CardFooter className="flex-col items-start gap-4">
            <div>
                <h3 className="font-semibold text-lg mb-2">Result</h3>
                 <Table>
                    <TableBody>
                        {resultEntries.map(entry => (
                             <TableRow key={entry.label}>
                                <TableCell className="font-medium">{entry.label}</TableCell>
                                <TableCell className="text-right">{entry.value.toFixed(4)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div>
                <h3 className="font-semibold text-lg mb-2">Steps</h3>
                <div className="font-mono text-sm space-y-2 bg-muted p-4 rounded-md">
                     {resultEntries.map(entry => (
                        <p key={entry.label}><b>{entry.label.split(':')[0]}:</b> {entry.formula}</p>
                    ))}
                </div>
            </div>
        </CardFooter>
      )}
    </Card>
  );
}

function SeriesEventsCalculator() {
    const { toast } = useToast();
    const [pA, setPA] = useState('0.6');
    const [nA, setNA] = useState('5');
    const [pB, setPB] = useState('0.3');
    const [nB, setNB] = useState('3');
    const [results, setResults] = useState<any>(null);

    const calculate = () => {
        const pA_num = parseFloat(pA);
        const nA_num = parseInt(nA, 10);
        const pB_num = parseFloat(pB);
        const nB_num = parseInt(nB, 10);

        if (isNaN(pA_num) || isNaN(nA_num) || pA_num < 0 || pA_num > 1 || nA_num < 1 || isNaN(pB_num) || isNaN(nB_num) || pB_num < 0 || pB_num > 1 || nB_num < 1) {
            toast({ variant: 'destructive', title: 'Invalid Input', description: 'Please check your inputs.' });
            return;
        }
        
        const pAllA = Math.pow(pA_num, nA_num);
        const pAllB = Math.pow(pB_num, nB_num);

        setResults({ pAllA, pAllB });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Probability of Series of Independent Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="seriesA">Event A Probability</Label>
                        <Input id="seriesA" type="number" step="0.01" min="0" max="1" value={pA} onChange={e => setPA(e.target.value)} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="repeatA">Repeat Times</Label>
                        <Input id="repeatA" type="number" step="1" min="1" value={nA} onChange={e => setNA(e.target.value)} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="seriesB">Event B Probability</Label>
                        <Input id="seriesB" type="number" step="0.01" min="0" max="1" value={pB} onChange={e => setPB(e.target.value)} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="repeatB">Repeat Times</Label>
                        <Input id="repeatB" type="number" step="1" min="1" value={nB} onChange={e => setNB(e.target.value)} />
                    </div>
                </div>
                 <Button onClick={calculate}>Calculate</Button>
            </CardContent>
            {results && (
                 <CardFooter className="flex-col items-start gap-2">
                    <p>Probability all Event A occur: {results.pAllA.toFixed(4)}</p>
                    <p>Probability all Event B occur: {results.pAllB.toFixed(4)}</p>
                </CardFooter>
            )}
        </Card>
    );
}

interface NormalDistResult {
    probBetween: number;
    probOutside: number;
    probLeft: number;
    probRight: number;
}
const confidenceIntervals = [
    { level: 0.6828, z: 1.0 },
    { level: 0.80, z: 1.28155 },
    { level: 0.90, z: 1.64485 },
    { level: 0.95, z: 1.95996 },
    { level: 0.98, z: 2.32635 },
    { level: 0.99, z: 2.57583 },
    { level: 0.995, z: 2.80703 },
    { level: 0.998, z: 3.09023 },
    { level: 0.999, z: 3.29053 },
    { level: 0.9999, z: 3.89059 },
    { level: 0.99999, z: 4.41717 },
];

function NormalDistributionCalculator() {
    const { toast } = useToast();
    const [mean, setMean] = useState('0');
    const [std, setStd] = useState('1');
    const [lb, setLb] = useState('-1');
    const [rb, setRb] = useState('1');
    const [result, setResult] = useState<NormalDistResult | null>(null);

    const calculate = () => {
        const mean_num = parseFloat(mean);
        const std_num = parseFloat(std);

        if (isNaN(mean_num) || isNaN(std_num) || std_num <= 0) {
            toast({ variant: 'destructive', title: 'Invalid Input', description: 'Mean must be a number and Standard Deviation must be positive.' });
            return;
        }

        const lb_num = lb.toLowerCase() === '-inf' ? -Infinity : parseFloat(lb);
        const rb_num = rb.toLowerCase() === 'inf' ? Infinity : parseFloat(rb);

        if (isNaN(lb_num) || isNaN(rb_num) || lb_num > rb_num) {
            toast({ variant: 'destructive', title: 'Invalid Bounds', description: 'Left bound cannot be greater than right bound.' });
            return;
        }

        const probLeft = (lb_num === -Infinity) ? 0 : jStat.normal.cdf(lb_num, mean_num, std_num);
        const probRightCDF = (rb_num === Infinity) ? 1 : jStat.normal.cdf(rb_num, mean_num, std_num);
        
        const probBetween = probRightCDF - probLeft;
        const probOutside = 1 - probBetween;
        const probRight = 1 - probRightCDF;

        setResult({ probBetween, probOutside, probLeft, probRight });
    }
    
    const confidenceTable = useMemo(() => {
        const mean_num = parseFloat(mean);
        const std_num = parseFloat(std);
        if (isNaN(mean_num) || isNaN(std_num) || std_num <= 0) return [];

        return confidenceIntervals.map(({ level, z }) => {
            const lower = mean_num - z * std_num;
            const upper = mean_num + z * std_num;
            return { level, range: `${lower.toFixed(5)}–${upper.toFixed(5)}`, z: z };
        });
    }, [mean, std]);


    return (
        <Card>
            <CardHeader>
                <CardTitle>Normal Distribution Probability</CardTitle>
                 <CardDescription>Find the area under the normal distribution curve and see confidence intervals.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="mean">Mean (μ)</Label>
                        <Input id="mean" type="number" value={mean} onChange={e => setMean(e.target.value)} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="std">Std Dev (σ)</Label>
                        <Input id="std" type="number" value={std} onChange={e => setStd(e.target.value)} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="lb">Left Bound (Lb)</Label>
                        <Input id="lb" value={lb} onChange={e => setLb(e.target.value)} placeholder="-inf" />
                         <p className="text-xs text-muted-foreground">For negative infinity, use -inf</p>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="rb">Right Bound (Rb)</Label>
                        <Input id="rb" value={rb} onChange={e => setRb(e.target.value)} placeholder="inf" />
                         <p className="text-xs text-muted-foreground">For positive infinity, use inf</p>
                    </div>
                 </div>
                 <Button onClick={calculate}>Calculate</Button>
            </CardContent>
            {result && (
                <CardFooter className="flex-col items-start gap-4">
                    <div>
                        <h3 className="font-semibold text-lg mb-2">Result</h3>
                        <div className="space-y-1 font-mono text-sm p-4 bg-muted rounded-md">
                            <p>The probability between {lb} and {rb} is <b>{result.probBetween.toFixed(5)}</b></p>
                            <p>The probability outside of {lb} and {rb} is <b>{result.probOutside.toFixed(5)}</b></p>
                            <p>The probability of {lb} or less (≤ {lb}) is <b>{result.probLeft.toFixed(5)}</b></p>
                            <p>The probability of {rb} or more (≥ {rb}) is <b>{result.probRight.toFixed(5)}</b></p>
                        </div>
                    </div>
                    {confidenceTable.length > 0 && (
                        <div>
                            <h3 className="font-semibold text-lg mb-2">Confidence Intervals Table</h3>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Confidence</TableHead>
                                        <TableHead>Range</TableHead>
                                        <TableHead className="text-right">Z-score</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {confidenceTable.map(item => (
                                        <TableRow key={item.level}>
                                            <TableCell>{(item.level * 100).toFixed(4)}%</TableCell>
                                            <TableCell>{item.range}</TableCell>
                                            <TableCell className="text-right">{item.z.toFixed(5)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardFooter>
            )}
        </Card>
    );
}


export default function ProbabilityCalculator() {
  return (
    <Tabs defaultValue="two-events" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="two-events">Two Events</TabsTrigger>
        <TabsTrigger value="series">Series</TabsTrigger>
        <TabsTrigger value="normal">Normal Dist.</TabsTrigger>
      </TabsList>
      <TabsContent value="two-events" className="mt-6">
        <TwoEventsCalculator />
      </TabsContent>
      <TabsContent value="series" className="mt-6">
        <SeriesEventsCalculator />
      </TabsContent>
      <TabsContent value="normal" className="mt-6">
        <NormalDistributionCalculator />
      </TabsContent>
    </Tabs>
  );
}

    