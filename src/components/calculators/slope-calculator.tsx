
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface TwoPointResult {
    slope: number | 'undefined';
    angle: number | 'N/A';
    distance: number;
    equation: string;
    yIntercept: number | string;
    xIntercept: number | string;
}

const TwoPointsCalculator = () => {
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

    if (deltaX === 0) {
        setResult({
            slope: 'undefined',
            angle: 'N/A',
            distance,
            equation: `x = ${x1}`,
            yIntercept: 'none',
            xIntercept: x1,
        });
    } else {
      const slope = deltaY / deltaX;
      const yIntercept = y1 - slope * x1;
      const xIntercept = slope === 0 ? 'none' : -yIntercept / slope;
      const angle = Math.atan(slope) * (180 / Math.PI);

      setResult({
        slope,
        angle,
        distance,
        equation: `y = ${slope.toFixed(4)}x + ${yIntercept.toFixed(4)}`,
        yIntercept: yIntercept,
        xIntercept: xIntercept,
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
        <Button onClick={calculate} className="w-full">Calculate</Button>
      </CardContent>
      {result && (
        <CardFooter className="p-0 mt-4">
          <div className="w-full p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-md space-y-2">
            <p className="font-mono text-sm">Slope (m) = {typeof result.slope === 'number' ? result.slope.toFixed(4) : result.slope}</p>
            <p className="font-mono text-sm">Angle (θ) = {typeof result.angle === 'number' ? `${result.angle.toFixed(4)}°` : result.angle}</p>
            <p className="font-mono text-sm">Distance (d) = {result.distance.toFixed(4)}</p>
            <p className="font-mono text-sm">Equation: {result.equation}</p>
            <p className="font-mono text-sm">Y-Intercept (b): {typeof result.yIntercept === 'number' ? result.yIntercept.toFixed(4) : result.yIntercept}</p>
            <p className="font-mono text-sm">X-Intercept: {typeof result.xIntercept === 'number' ? result.xIntercept.toFixed(4) : result.xIntercept}</p>
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
        <p className="font-mono text-sm">X2 = {data.x2.toFixed(4)}</p>
        <p className="font-mono text-sm">Y2 = {data.y2.toFixed(4)}</p>
        <p className="font-mono text-sm">ΔX = {data.deltaX.toFixed(4)}</p>
        <p className="font-mono text-sm">ΔY = {data.deltaY.toFixed(4)}</p>
        <p className="font-mono text-sm">θ = {data.angle.toFixed(4)}°</p>
        <p className="font-mono text-sm">Equation of the line: {equation}</p>
        <p className="font-mono text-sm">When x=0, y = {typeof yIntercept === 'number' ? yIntercept.toFixed(4) : yIntercept}</p>
        <p className="font-mono text-sm">When y=0, x = {typeof xIntercept === 'number' ? xIntercept.toFixed(4) : xIntercept}</p>
    </div>
);


const OnePointSlopeCalculator = () => {
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
        if(inputType === 'slope') {
            m = parseFloat(slope);
        } else {
            const angleDeg = parseFloat(angle);
            if(isNaN(angleDeg)) {
                toast({ variant: 'destructive', title: 'Invalid Input', description: 'Please enter a valid angle.'});
                return;
            }
            m = Math.tan(angleDeg * Math.PI / 180);
            setSlope(m.toFixed(4));
        }

        if ([x1, y1, d, m].some(isNaN)) {
             toast({ variant: 'destructive', title: 'Invalid Input', description: 'Please fill all required fields with valid numbers.' });
             return;
        }

        const deltaX = d / Math.sqrt(1 + m*m);
        const deltaY = m * deltaX;

        const posRes: OnePointResultData = {
            x2: x1 + deltaX,
            y2: y1 + deltaY,
            deltaX: deltaX,
            deltaY: deltaY,
            angle: Math.atan(m) * (180 / Math.PI)
        };

        const negRes: OnePointResultData = {
            x2: x1 - deltaX,
            y2: y1 - deltaY,
            deltaX: -deltaX,
            deltaY: -deltaY,
            angle: (Math.atan(m) * (180 / Math.PI)) + 180
        };

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

        <Button onClick={calculate} className="w-full">Calculate</Button>
      </CardContent>
       {result && (
        <CardFooter className="p-0 mt-4 flex-col">
          <ResultBlock 
            title="Result"
            data={result.positive}
            equation={result.equation}
            yIntercept={result.yIntercept}
            xIntercept={result.xIntercept}
          />
          <ResultBlock 
            title="OR"
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
  return (
    <Card className="shadow-lg">
      <CardContent className="p-6">
        <Tabs defaultValue="two-points" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="two-points">2 Points</TabsTrigger>
                <TabsTrigger value="one-point-slope">1 Point & Slope</TabsTrigger>
            </TabsList>
            <TabsContent value="two-points" className="mt-6">
                <TwoPointsCalculator />
            </TabsContent>
            <TabsContent value="one-point-slope" className="mt-6">
                <OnePointSlopeCalculator />
            </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
