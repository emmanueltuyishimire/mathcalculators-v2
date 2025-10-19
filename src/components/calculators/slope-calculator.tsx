
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { useFirestore, useUser } from '@/firebase';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { collection, serverTimestamp } from 'firebase/firestore';

interface TwoPointResult {
    slope: number | 'undefined';
    angleDeg: number | 'N/A';
    angleRad: number | 'N/A';
    distance: number;
    equation: string;
    yIntercept: number | string;
    xIntercept: number | string;
    deltaX: number;
    deltaY: number;
}

const TwoPointsCalculator = ({ onCalculate }: { onCalculate: (data: any) => void }) => {
  const { toast } = useToast();
  const [p1, setP1] = useState({ x: '1', y: '1' });
  const [p2, setP2] = useState({ x: '2', y: '2' });
  const [result, setResult] = useState<TwoPointResult | null>(null);

  const calculate = () => {
    const x1 = parseFloat(p1.x);
    const y1 = parseFloat(p1.y);
    const x2 = parseFloat(p2.x);
    const y2 = parseFloat(p2.y);

    if ([x1, y1, x2, y2].some(isNaN)) {
      toast({ variant: 'destructive', title: 'Invalid Input', description: 'Please enter valid numbers for all points.' });
      return;
    }

    const deltaX = x2 - x1;
    const deltaY = y2 - y1;
    const distance = Math.sqrt(deltaX**2 + deltaY**2);
    let slope: number | 'undefined' = 'undefined';
    let angleDeg: number | 'N/A' = 90;
    let angleRad: number | 'N/A' = Math.PI / 2;

    if (Math.abs(deltaX) > 1e-9) {
        slope = deltaY / deltaX;
        angleRad = Math.atan(slope);
        angleDeg = angleRad * (180 / Math.PI);
    }
    
    onCalculate({
        x1, y1, x2, y2, slope: slope === 'undefined' ? Infinity : slope, angle: angleDeg === 'N/A' ? 90 : angleDeg
    });

    if (slope === 'undefined') {
        setResult({
            slope: 'undefined',
            angleDeg: 90,
            angleRad: 'N/A',
            distance,
            equation: `x = ${x1.toFixed(2)}`,
            yIntercept: 'none',
            xIntercept: x1,
            deltaX,
            deltaY,
        });
    } else {
      const yIntercept = y1 - slope * x1;
      const xIntercept = Math.abs(slope) < 1e-9 ? 'none' : -yIntercept / slope;
      
      setResult({
        slope,
        angleDeg,
        angleRad,
        distance,
        equation: `y = ${slope.toFixed(4)}x + ${yIntercept.toFixed(4)}`,
        yIntercept: yIntercept,
        xIntercept: xIntercept,
        deltaX,
        deltaY,
      });
    }
  };

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="p-0 mb-4">
        <CardTitle>If 2 Points are Known</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-0">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="x1">X1</Label>
            <Input id="x1" type="number" value={p1.x} onChange={e => setP1({ ...p1, x: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="y1">Y1</Label>
            <Input id="y1" type="number" value={p1.y} onChange={e => setP1({ ...p1, y: e.target.value })} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="x2">X2</Label>
            <Input id="x2" type="number" value={p2.x} onChange={e => setP2({ ...p2, x: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="y2">Y2</Label>
            <Input id="y2" type="number" value={p2.y} onChange={e => setP2({ ...p2, y: e.target.value })} />
          </div>
        </div>
         <Button onClick={calculate} className="w-full">Calculate Slope</Button>
      </CardContent>
      {result && (
        <CardFooter className="p-0 mt-4">
          <div className="w-full p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-md space-y-3">
             <p className="font-mono text-sm"><b>Slope (m)</b> = (y₂-y₁)/(x₂-x₁) = {result.deltaY.toFixed(4)}/{result.deltaX.toFixed(4)} = <b>{typeof result.slope === 'number' ? result.slope.toFixed(4) : result.slope}</b></p>
            <p className="font-mono text-sm"><b>Angle (θ)</b> = arctan(m) = <b>{typeof result.angleDeg === 'number' ? `${result.angleDeg.toFixed(4)}°` : result.angleDeg}</b> or <b>{typeof result.angleRad === 'number' ? result.angleRad.toFixed(4) : result.angleRad} rad</b></p>
            <p className="font-mono text-sm"><b>Distance (d)</b> = √((x₂-x₁)² + (y₂-y₁)²)= <b>{result.distance.toFixed(4)}</b></p>
            <Separator className="my-2 bg-green-200 dark:bg-green-800" />
            <h4 className="font-semibold">Line Equation</h4>
            <p className="font-mono text-sm"><b>Full Equation:</b> {result.equation}</p>
            <p className="font-mono text-sm"><b>Y-Intercept (b):</b> {typeof result.yIntercept === 'number' ? result.yIntercept.toFixed(4) : result.yIntercept}</p>
            <p className="font-mono text-sm"><b>X-Intercept:</b> {typeof result.xIntercept === 'number' ? result.xIntercept.toFixed(4) : result.xIntercept}</p>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};


interface OnePointResultData {
  x2: number;
  y2: number;
  deltaX: number;
  deltaY: number;
  angle: number;
}

interface OnePointResult {
    positive: OnePointResultData;
    negative: OnePointResultData;
    equation: string;
    yIntercept: number | string;
    xIntercept: number | string;
}

const ResultBlock = ({ title, data, equation, yIntercept, xIntercept }: { title: string, data: OnePointResultData, equation: string, yIntercept: number | string, xIntercept: number | string }) => (
    <div className="w-full p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-md space-y-2 mt-4">
        <h4 className="font-bold">{title}</h4>
        <p className="font-mono text-sm"><b>Second Point (x₂, y₂):</b> ({data.x2.toFixed(4)}, {data.y2.toFixed(4)})</p>
        <p className="font-mono text-sm"><b>Change in X (ΔX):</b> {data.deltaX.toFixed(4)}</p>
        <p className="font-mono text-sm"><b>Change in Y (ΔY):</b> {data.deltaY.toFixed(4)}</p>
         <Separator className="my-2 bg-green-200 dark:bg-green-800" />
        <h4 className="font-semibold">Line Properties</h4>
        <p className="font-mono text-sm"><b>Equation:</b> {equation}</p>
        <p className="font-mono text-sm"><b>Y-Intercept:</b> {typeof yIntercept === 'number' ? yIntercept.toFixed(4) : yIntercept}</p>
        <p className="font-mono text-sm"><b>X-Intercept:</b> {typeof xIntercept === 'number' ? xIntercept.toFixed(4) : xIntercept}</p>
    </div>
);


const OnePointSlopeCalculator = ({ onCalculate }: { onCalculate: (data: any) => void }) => {
    const { toast } = useToast();
    const [point, setPoint] = useState({ x: '1', y: '1' });
    const [distance, setDistance] = useState('5');
    const [slope, setSlope] = useState('0.75');
    const [angle, setAngle] = useState('36.87');
    const [inputType, setInputType] = useState<'slope' | 'angle'>('slope');
    const [result, setResult] = useState<OnePointResult | null>(null);

    const calculate = () => {
        const x1 = parseFloat(point.x);
        const y1 = parseFloat(point.y);
        const d = parseFloat(distance);
        
        let m: number;
        let finalAngle: number;
        if(inputType === 'slope') {
            m = parseFloat(slope);
            if (isNaN(m)) return;
            finalAngle = Math.atan(m) * (180 / Math.PI);
            setAngle(finalAngle.toFixed(4));
        } else {
            const angleDeg = parseFloat(angle);
            if(isNaN(angleDeg)) {
                toast({ variant: 'destructive', title: 'Invalid Input', description: 'Please enter a valid angle.'});
                return;
            }
            m = Math.tan(angleDeg * Math.PI / 180);
            finalAngle = angleDeg;
            setSlope(m.toFixed(4));
        }

        if ([x1, y1, d, m].some(isNaN)) {
             toast({ variant: 'destructive', title: 'Invalid Input', description: 'Please fill all required fields with valid numbers.' });
             return;
        }

        const deltaX = d / Math.sqrt(1 + m*m);
        const deltaY = m * deltaX;

        const posRes: OnePointResultData = { x2: x1 + deltaX, y2: y1 + deltaY, deltaX, deltaY, angle: finalAngle };
        const negRes: OnePointResultData = { x2: x1 - deltaX, y2: y1 - deltaY, deltaX: -deltaX, deltaY: -deltaY, angle: finalAngle + 180 };

        onCalculate({ x1, y1, x2: posRes.x2, y2: posRes.y2, slope: m, angle: finalAngle });

        const yIntercept = y1 - m * x1;
        const xIntercept = m === 0 ? 'none' : -yIntercept / m;
        const equation = `y = ${m.toFixed(4)}x + ${yIntercept.toFixed(4)}`;
        
        setResult({
            positive: posRes,
            negative: negRes,
            equation,
            yIntercept,
            xIntercept
        });
    }

    return (
    <Card className="border-none shadow-none">
      <CardHeader className="p-0 mb-4">
        <CardTitle>If 1 Point and Slope are Known</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-0">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="x1_single">X1</Label>
            <Input id="x1_single" type="number" value={point.x} onChange={e => setPoint({ ...point, x: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="y1_single">Y1</Label>
            <Input id="y1_single" type="number" value={point.y} onChange={e => setPoint({ ...point, y: e.target.value })} />
          </div>
        </div>
        <div className="space-y-2">
            <Label htmlFor="distance">Distance (d)</Label>
            <Input id="distance" type="number" value={distance} onChange={e => setDistance(e.target.value)} />
        </div>
        
        <RadioGroup value={inputType} onValueChange={(val) => setInputType(val as 'slope' | 'angle')} className="my-4">
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="slope" id="r_slope" />
                <Label htmlFor="r_slope" className="flex-1">Slope (m)</Label>
                <Input type="number" value={slope} onChange={e => setSlope(e.target.value)} disabled={inputType !== 'slope'} className="max-w-[150px]" />
            </div>
             <div className="text-center text-xs text-muted-foreground">OR</div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="angle" id="r_angle" />
                <Label htmlFor="r_angle" className="flex-1">Angle of Incline (θ)</Label>
                <Input type="number" value={angle} onChange={e => setAngle(e.target.value)} disabled={inputType !== 'angle'} className="max-w-[150px]" />
                <span className="text-sm">°</span>
            </div>
        </RadioGroup>
        <Button onClick={calculate} className="w-full">Calculate Point</Button>
      </CardContent>
       {result && (
        <CardFooter className="p-0 mt-4 flex-col">
          <ResultBlock 
            title="Result (Positive Direction)"
            data={result.positive}
            equation={result.equation}
            yIntercept={result.yIntercept}
            xIntercept={result.xIntercept}
          />
          <ResultBlock 
            title="Result (Negative Direction)"
            data={result.negative}
            equation={result.equation}
            yIntercept={result.yIntercept}
            xIntercept={result.xIntercept}
          />
        </CardFooter>
      )}
    </Card>
    );
};

export default function SlopeCalculator() {
  const firestore = useFirestore();
  const { user } = useUser();

  const handleCalculate = (data: any) => {
    if (!firestore || !user) return;
    
    const calculationData = {
      ...data,
      userId: user.uid, // Add user ID to the document
      timestamp: serverTimestamp()
    };
    
    const calculationsCollection = collection(firestore, 'slope_calculations');
    addDocumentNonBlocking(calculationsCollection, calculationData);
  };

  return (
    <Card className="shadow-lg">
      <CardContent className="p-6">
        <Tabs defaultValue="two-points" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="two-points">2 Points</TabsTrigger>
                <TabsTrigger value="one-point-slope">1 Point & Slope</TabsTrigger>
            </TabsList>
            <TabsContent value="two-points" className="mt-6">
                <TwoPointsCalculator onCalculate={handleCalculate} />
            </TabsContent>
            <TabsContent value="one-point-slope" className="mt-6">
                <OnePointSlopeCalculator onCalculate={handleCalculate} />
            </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
