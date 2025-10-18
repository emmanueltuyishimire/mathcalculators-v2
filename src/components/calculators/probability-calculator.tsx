
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { jStat } from 'jstat';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

function TwoEventsCalculator() {
  const { toast } = useToast();
  const [pA, setPA] = useState('0.5');
  const [pB, setPB] = useState('0.4');
  const [results, setResults] = useState<any>(null);

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
    const pAnotB = pA_num * pBnot;
    const pBnotA = pAnot * pB_num;

    setResults({ pA_num, pB_num, pAnot, pBnot, pAandB, pAorB, pXorB, pNeither, pAnotB, pBnotA });
  };

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
           <Card className="w-full">
            <CardHeader><CardTitle>Results</CardTitle></CardHeader>
            <CardContent>
                 <Table>
                    <TableBody>
                        <TableRow><TableCell>Probability of A NOT occuring: P(A')</TableCell><TableCell className="text-right font-mono">{results.pAnot.toFixed(4)}</TableCell></TableRow>
                        <TableRow><TableCell>Probability of B NOT occuring: P(B')</TableCell><TableCell className="text-right font-mono">{results.pBnot.toFixed(4)}</TableCell></TableRow>
                        <TableRow><TableCell>Probability of A and B both occuring: P(A∩B)</TableCell><TableCell className="text-right font-mono">{results.pAandB.toFixed(4)}</TableCell></TableRow>
                        <TableRow><TableCell>Probability that A or B or both occur: P(A∪B)</TableCell><TableCell className="text-right font-mono">{results.pAorB.toFixed(4)}</TableCell></TableRow>
                        <TableRow><TableCell>Probability that A or B occurs but NOT both: P(AΔB)</TableCell><TableCell className="text-right font-mono">{results.pXorB.toFixed(4)}</TableCell></TableRow>
                        <TableRow><TableCell>Probability of neither A nor B occuring: P((A∪B)')</TableCell><TableCell className="text-right font-mono">{results.pNeither.toFixed(4)}</TableCell></TableRow>
                        <TableRow><TableCell>Probability of A occuring but NOT B</TableCell><TableCell className="text-right font-mono">{results.pAnotB.toFixed(4)}</TableCell></TableRow>
                        <TableRow><TableCell>Probability of B occuring but NOT A</TableCell><TableCell className="text-right font-mono">{results.pBnotA.toFixed(4)}</TableCell></TableRow>
                    </TableBody>
                </Table>
            </CardContent>
           </Card>
           <Card className="w-full">
               <CardHeader><CardTitle>Steps</CardTitle></CardHeader>
               <CardContent className="font-mono text-sm space-y-2">
                   <div>P(A') = 1 - P(A) = 1 - {results.pA_num} = {results.pAnot.toFixed(4)}</div>
                   <div>P(B') = 1 - P(B) = 1 - {results.pB_num} = {results.pBnot.toFixed(4)}</div>
                   <div>P(A∩B) = P(A) × P(B) = {results.pA_num} × {results.pB_num} = {results.pAandB.toFixed(4)}</div>
                   <div>P(A∪B) = P(A) + P(B) - P(A∩B) = {results.pA_num} + {results.pB_num} - {results.pAandB.toFixed(4)} = {results.pAorB.toFixed(4)}</div>
                   <div>P(AΔB) = P(A) + P(B) - 2P(A∩B) = {results.pA_num} + {results.pB_num} - 2×{results.pAandB.toFixed(4)} = {results.pXorB.toFixed(4)}</div>
                   <div>P((A∪B)') = 1 - P(A∪B) = 1 - {results.pAorB.toFixed(4)} = {results.pNeither.toFixed(4)}</div>
                   <div>P(A not B) = P(A) × (1- P(B)) = {results.pA_num} × (1 - {results.pB_num}) = {results.pAnotB.toFixed(4)}</div>
                   <div>P(B not A) = (1 - P(A)) × P(B) = (1 - {results.pA_num}) × {results.pB_num} = {results.pBnotA.toFixed(4)}</div>
               </CardContent>
           </Card>
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

function NormalDistributionCalculator() {
    const { toast } = useToast();
    const [mean, setMean] = useState('0');
    const [std, setStd] = useState('1');
    const [lb, setLb] = useState('-1');
    const [rb, setRb] = useState('1');
    const [result, setResult] = useState<string | null>(null);

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

        const cdfLB = (lb_num === -Infinity) ? 0 : jStat.normal.cdf(lb_num, mean_num, std_num);
        const cdfRB = (rb_num === Infinity) ? 1 : jStat.normal.cdf(rb_num, mean_num, std_num);
        
        const prob = cdfRB - cdfLB;

        setResult(`Probability between ${lb} and ${rb}: ${prob.toFixed(4)}`);
    }


    return (
        <Card>
            <CardHeader>
                <CardTitle>Normal Distribution Probability</CardTitle>
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
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="rb">Right Bound (Rb)</Label>
                        <Input id="rb" value={rb} onChange={e => setRb(e.target.value)} placeholder="inf" />
                    </div>
                 </div>
                 <Button onClick={calculate}>Calculate</Button>
            </CardContent>
            {result && (
                <CardFooter>
                    <p>{result}</p>
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
