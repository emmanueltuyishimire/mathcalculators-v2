
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { RightTriangleDiagram } from '../right-triangle-diagram';
import { Button } from '@/components/ui/button';


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

const TwoPointsCalculator = () => {
  const { toast } = useToast();
  const [p1, setP1] = useState({ x: '2', y: '3' });
  const [p2, setP2] = useState({ x: '8', y: '7' });
  const [result, setResult] = useState<TwoPointResult | null>(null);

  const calculate = () => {
    const x1 = parseFloat(p1.x);
    const y1 = parseFloat(p1.y);
    const x2 = parseFloat(p2.x);
    const y2 = parseFloat(p2.y);

    if ([x1, y1, x2, y2].some(isNaN)) {
      setResult(null);
      if (p1.x || p1.y || p2.x || p2.y) {
        toast({ variant: 'destructive', title: 'Invalid Input', description: 'Please enter valid numbers for all points.' });
      }
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
            <Input id="x1" type="number" value={p1.x} onChange={e => setP1({ ...p1, x: e.target.value })} aria-label="X1 coordinate"/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="y1">Y1</Label>
            <Input id="y1" type="number" value={p1.y} onChange={e => setP1({ ...p1, y: e.target.value })} aria-label="Y1 coordinate"/>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="x2">X2</Label>
            <Input id="x2" type="number" value={p2.x} onChange={e => setP2({ ...p2, x: e.target.value })} aria-label="X2 coordinate"/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="y2">Y2</Label>
            <Input id="y2" type="number" value={p2.y} onChange={e => setP2({ ...p2, y: e.target.value })} aria-label="Y2 coordinate"/>
          </div>
        </div>
         <Button onClick={calculate} className="w-full">Calculate Slope</Button>
      </CardContent>
      {result && (
        <CardFooter className="p-0 mt-4">
          <div className="w-full p-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-md space-y-2">
             <p className="font-mono text-xs"><b>Slope (m):</b> {typeof result.slope === 'number' ? result.slope.toFixed(4) : result.slope}</p>
            <p className="font-mono text-xs"><b>Angle (θ):</b> {typeof result.angleDeg === 'number' ? `${result.angleDeg.toFixed(4)}°` : result.angleDeg}</p>
            <p className="font-mono text-xs"><b>Distance (d):</b> {result.distance.toFixed(4)}</p>
            <Separator className="my-2 bg-green-200 dark:bg-green-800" />
            <h4 className="font-semibold text-sm">Line Equation</h4>
            <p className="font-mono text-xs">{result.equation}</p>
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

const OnePointSlopeCalculator = () => {
    const { toast } = useToast();
    const [point, setPoint] = useState({ x: '1', y: '1' });
    const [distance, setDistance] = useState('5');
    const [slope, setSlope] = useState('2');
    const [angle, setAngle] = useState('');
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
            if (isNaN(m)) {
                if (slope) toast({ variant: 'destructive', title: 'Invalid Input', description: 'Please enter a valid slope.'});
                setResult(null);
                return;
            };
            finalAngle = Math.atan(m) * (180 / Math.PI);
            setAngle(finalAngle.toFixed(4));
        } else {
            const angleDeg = parseFloat(angle);
            if(isNaN(angleDeg)) {
                if (angle) toast({ variant: 'destructive', title: 'Invalid Input', description: 'Please enter a valid angle.'});
                setResult(null);
                return;
            }
            m = Math.tan(angleDeg * Math.PI / 180);
            finalAngle = angleDeg;
            setSlope(m.toFixed(4));
        }

        if ([x1, y1, d].some(isNaN)) {
             if (point.x || point.y || distance) toast({ variant: 'destructive', title: 'Invalid Input', description: 'Please fill all required fields with valid numbers.' });
             setResult(null);
             return;
        }

        const deltaX = d / Math.sqrt(1 + m*m);
        const deltaY = m * deltaX;

        const posRes: OnePointResultData = { x2: x1 + deltaX, y2: y1 + deltaY, deltaX, deltaY, angle: finalAngle };
        const negRes: OnePointResultData = { x2: x1 - deltaX, y2: y1 - deltaY, deltaX: -deltaX, deltaY: -deltaY, angle: finalAngle + 180 };

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
        <div className="flex justify-center">
            <RightTriangleDiagram />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="x1_single">X1</Label>
            <Input id="x1_single" type="number" value={point.x} onChange={e => setPoint({ ...point, x: e.target.value })} aria-label="X1 coordinate"/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="y1_single">Y1</Label>
            <Input id="y1_single" type="number" value={point.y} onChange={e => setPoint({ ...point, y: e.target.value })} aria-label="Y1 coordinate"/>
          </div>
        </div>
        <div className="space-y-2">
            <Label htmlFor="distance">Distance (d)</Label>
            <Input id="distance" type="number" value={distance} onChange={e => setDistance(e.target.value)} aria-label="Distance"/>
        </div>
        
        <RadioGroup value={inputType} onValueChange={(val) => setInputType(val as 'slope' | 'angle')} className="my-4">
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="slope" id="r_slope" />
                <Label htmlFor="r_slope" className="flex-1">Slope (m)</Label>
                <Input type="number" value={slope} onChange={e => setSlope(e.target.value)} disabled={inputType !== 'slope'} className="max-w-[150px]" aria-label="Slope"/>
            </div>
             <div className="text-center text-xs text-muted-foreground">OR</div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="angle" id="r_angle" />
                <Label htmlFor="r_angle" className="flex-1">Angle of Incline (θ)</Label>
                <Input type="number" value={angle} onChange={e => setAngle(e.target.value)} disabled={inputType !== 'angle'} className="max-w-[150px]" aria-label="Angle of Incline"/>
                <span className="text-sm">°</span>
            </div>
        </RadioGroup>
        <Button onClick={calculate} className="w-full">Calculate Point</Button>
      </CardContent>
       {result && (
        <CardFooter className="p-0 mt-4 flex-col gap-4">
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

const ResultBlock = ({ title, data, equation, yIntercept, xIntercept }: { title: string, data: OnePointResultData, equation: string, yIntercept: number | string, xIntercept: number | string }) => (
    <div className="w-full p-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-md space-y-2">
        <h4 className="font-bold">{title}</h4>
        <p className="font-mono text-xs"><b>Second Point (x₂, y₂):</b> ({data.x2.toFixed(4)}, {data.y2.toFixed(4)})</p>
        <Separator className="my-2 bg-green-200 dark:bg-green-800" />
        <h4 className="font-semibold text-sm">Line Properties</h4>
        <p className="font-mono text-xs"><b>Equation:</b> {equation}</p>
    </div>
);

export default function SlopeCalculator() {

  return (
    <Card className="shadow-lg">
      <CardContent className="p-4">
        <Tabs defaultValue="two-points" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="two-points">2 Points</TabsTrigger>
                <TabsTrigger value="one-point-slope">1 Point & Slope</TabsTrigger>
            </TabsList>
            <TabsContent value="two-points" className="mt-4">
                <TwoPointsCalculator />
            </TabsContent>
            <TabsContent value="one-point-slope" className="mt-4">
                <OnePointSlopeCalculator />
            </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
