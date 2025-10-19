
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '../ui/separator';

interface TwoDResult {
    distance: number;
    deltaX: number;
    deltaY: number;
    slope: number | 'undefined';
    angleDeg: number | 'N/A';
    equation: string;
    yIntercept: number | string;
    xIntercept: number | string;
}

// 2D Calculator
const TwoDCalculator = () => {
    const { toast } = useToast();
    const [p1, setP1] = useState({ x: '2', y: '3' });
    const [p2, setP2] = useState({ x: '8', y: '7' });
    const [result, setResult] = useState<TwoDResult | null>(null);

    const calculate = () => {
        const x1 = parseFloat(p1.x);
        const y1 = parseFloat(p1.y);
        const x2 = parseFloat(p2.x);
        const y2 = parseFloat(p2.y);

        if ([x1, y1, x2, y2].some(isNaN)) {
            setResult(null);
            if (p1.x || p1.y || p2.x || p2.y) {
                 toast({ variant: 'destructive', title: 'Invalid Input', description: 'Please enter valid numbers for all coordinates.' });
            }
            return;
        }

        const deltaX = x2 - x1;
        const deltaY = y2 - y1;
        const distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));

        let slope: number | 'undefined' = 'undefined';
        let angleDeg: number | 'N/A' = 'N/A';
        let equation = `x = ${x1.toFixed(2)}`;
        let yIntercept: number | string = 'none';
        let xIntercept: number | string = x1;

        if (Math.abs(deltaX) > 1e-9) {
            slope = deltaY / deltaX;
            angleDeg = Math.atan(slope) * (180 / Math.PI);
            yIntercept = y1 - slope * x1;
            equation = `y = ${slope.toFixed(4)}x + ${yIntercept.toFixed(4)}`;
            xIntercept = Math.abs(slope) > 1e-9 ? -yIntercept / slope : 'none';
        }

        setResult({
            distance,
            deltaX,
            deltaY,
            slope,
            angleDeg,
            equation,
            yIntercept,
            xIntercept,
        });
    };

    useEffect(() => {
        calculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Card>
            <CardHeader>
                <CardTitle>2D Distance Calculator</CardTitle>
                <CardDescription>Find the distance between two points on a 2D plane.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <fieldset className="border p-4 rounded-md">
                        <legend className="text-sm font-medium px-1">Point 1</legend>
                        <div className="flex gap-2">
                           <div className="space-y-1">
                             <Label htmlFor="x1">X1</Label>
                             <Input id="x1" type="number" value={p1.x} onChange={e => setP1({ ...p1, x: e.target.value })} />
                           </div>
                           <div className="space-y-1">
                             <Label htmlFor="y1">Y1</Label>
                             <Input id="y1" type="number" value={p1.y} onChange={e => setP1({ ...p1, y: e.target.value })} />
                           </div>
                        </div>
                    </fieldset>
                     <fieldset className="border p-4 rounded-md">
                        <legend className="text-sm font-medium px-1">Point 2</legend>
                        <div className="flex gap-2">
                           <div className="space-y-1">
                             <Label htmlFor="x2">X2</Label>
                             <Input id="x2" type="number" value={p2.x} onChange={e => setP2({ ...p2, x: e.target.value })} />
                           </div>
                           <div className="space-y-1">
                            <Label htmlFor="y2">Y2</Label>
                            <Input id="y2" type="number" value={p2.y} onChange={e => setP2({ ...p2, y: e.target.value })} />
                           </div>
                        </div>
                    </fieldset>
                </div>
                <Button onClick={calculate} className="w-full">Calculate</Button>
            </CardContent>
            {result !== null && (
                <CardFooter className="flex-col items-start gap-4">
                    <div className="w-full p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-md space-y-3">
                        <h4 className="font-semibold">Distance Result</h4>
                        <p className="font-mono text-lg"><b>Distance (d):</b> {result.distance.toFixed(4)}</p>
                        <div>
                            <h5 className="font-medium text-sm mt-2">Steps:</h5>
                            <div className="font-mono text-xs space-y-1 bg-background/50 p-2 rounded-md">
                                <p>d = √(({p2.x}) - ({p1.x}))² + (({p2.y}) - ({p1.y}))²</p>
                                <p>d = √({result.deltaX})² + ({result.deltaY})²</p>
                                <p>d = √({Math.pow(result.deltaX, 2).toFixed(4)} + {Math.pow(result.deltaY, 2).toFixed(4)})</p>
                                <p>d = √{Math.pow(result.distance, 2).toFixed(4)}</p>
                                <p>d = {result.distance.toFixed(4)}</p>
                            </div>
                        </div>
                    </div>
                     <div className="w-full p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-md space-y-3">
                        <h4 className="font-semibold">Line Properties</h4>
                        <p className="font-mono text-sm"><b>ΔX = </b> {p2.x} - {p1.x} = {result.deltaX}</p>
                        <p className="font-mono text-sm"><b>ΔY = </b> {p2.y} - {p1.y} = {result.deltaY}</p>
                        <p className="font-mono text-sm"><b>Slope (m) = </b> ΔY/ΔX = {result.deltaY.toFixed(4)}/{result.deltaX.toFixed(4)} = {typeof result.slope === 'number' ? result.slope.toFixed(4) : result.slope}</p>
                        <p className="font-mono text-sm"><b>Angle (θ) = </b> {typeof result.angleDeg === 'number' ? `${result.angleDeg.toFixed(4)}°` : result.angleDeg}</p>
                        <Separator className="my-2 bg-blue-200 dark:bg-blue-800" />
                        <h5 className="font-medium text-sm">Equation of the line:</h5>
                        <p className="font-mono text-sm">{result.equation}</p>
                        <p className="font-mono text-sm"><b>Y-Intercept (b): </b>{typeof result.yIntercept === 'number' ? result.yIntercept.toFixed(4) : result.yIntercept}</p>
                        <p className="font-mono text-sm"><b>X-Intercept: </b>{typeof result.xIntercept === 'number' ? result.xIntercept.toFixed(4) : result.xIntercept}</p>
                    </div>
                </CardFooter>
            )}
        </Card>
    );
};

interface ThreeDResult {
    distance: number;
    deltaX: number;
    deltaY: number;
    deltaZ: number;
}

// 3D Calculator
const ThreeDCalculator = () => {
    const { toast } = useToast();
    const [p1, setP1] = useState({ x: '1', y: '2', z: '3' });
    const [p2, setP2] = useState({ x: '4', y: '5', z: '6' });
    const [result, setResult] = useState<ThreeDResult | null>(null);

    const calculate = () => {
        const x1 = parseFloat(p1.x);
        const y1 = parseFloat(p1.y);
        const z1 = parseFloat(p1.z);
        const x2 = parseFloat(p2.x);
        const y2 = parseFloat(p2.y);
        const z2 = parseFloat(p2.z);

        if ([x1, y1, z1, x2, y2, z2].some(isNaN)) {
             if (p1.x || p1.y || p1.z || p2.x || p2.y || p2.z) {
                toast({ variant: 'destructive', title: 'Invalid Input', description: 'Please enter valid numbers for all coordinates.' });
            }
            setResult(null);
            return;
        }

        const deltaX = x2 - x1;
        const deltaY = y2 - y1;
        const deltaZ = z2 - z1;
        const distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2) + Math.pow(deltaZ, 2));
        setResult({ distance, deltaX, deltaY, deltaZ });
    };

    useEffect(() => {
        calculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Card>
            <CardHeader>
                <CardTitle>3D Distance Calculator</CardTitle>
                <CardDescription>Find the distance between two points in 3D space.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <fieldset className="border p-4 rounded-md">
                        <legend className="text-sm font-medium px-1">Point 1</legend>
                        <div className="flex gap-2">
                           <Input aria-label="X1" type="number" value={p1.x} onChange={e => setP1({ ...p1, x: e.target.value })} placeholder="X1" />
                           <Input aria-label="Y1" type="number" value={p1.y} onChange={e => setP1({ ...p1, y: e.target.value })} placeholder="Y1" />
                           <Input aria-label="Z1" type="number" value={p1.z} onChange={e => setP1({ ...p1, z: e.target.value })} placeholder="Z1" />
                        </div>
                    </fieldset>
                     <fieldset className="border p-4 rounded-md">
                        <legend className="text-sm font-medium px-1">Point 2</legend>
                        <div className="flex gap-2">
                           <Input aria-label="X2" type="number" value={p2.x} onChange={e => setP2({ ...p2, x: e.target.value })} placeholder="X2" />
                           <Input aria-label="Y2" type="number" value={p2.y} onChange={e => setP2({ ...p2, y: e.target.value })} placeholder="Y2" />
                           <Input aria-label="Z2" type="number" value={p2.z} onChange={e => setP2({ ...p2, z: e.target.value })} placeholder="Z2" />
                        </div>
                    </fieldset>
                </div>
                <Button onClick={calculate} className="w-full">Calculate</Button>
            </CardContent>
            {result !== null && (
                <CardFooter>
                    <div className="w-full p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-md space-y-3">
                        <h4 className="font-semibold">Distance Result</h4>
                        <p className="font-mono text-lg"><b>Distance (d):</b> {result.distance.toFixed(4)}</p>
                        <div>
                            <h5 className="font-medium text-sm mt-2">Steps:</h5>
                            <div className="font-mono text-xs space-y-1 bg-background/50 p-2 rounded-md">
                                <p>d = √(({p2.x}) - ({p1.x}))² + (({p2.y}) - ({p1.y}))² + (({p2.z}) - ({p1.z}))²</p>
                                <p>d = √({result.deltaX})² + ({result.deltaY})² + ({result.deltaZ})²</p>
                                <p>d = √({Math.pow(result.deltaX, 2).toFixed(4)} + {Math.pow(result.deltaY, 2).toFixed(4)} + {Math.pow(result.deltaZ, 2).toFixed(4)})</p>
                                <p>d = √{Math.pow(result.distance, 2).toFixed(4)}</p>
                                <p>d = {result.distance.toFixed(4)}</p>
                            </div>
                        </div>
                    </div>
                </CardFooter>
            )}
        </Card>
    );
};

// Latitude/Longitude Calculator
const LatLongCalculator = () => {
    const { toast } = useToast();
    const [p1, setP1] = useState({ lat: '51.5074', lon: '0.1278' }); // London
    const [p2, setP2] = useState({ lat: '40.7128', lon: '-74.0060' }); // New York
    const [distance, setDistance] = useState<{ km: number, miles: number } | null>(null);

    const calculate = () => {
        const lat1 = parseFloat(p1.lat);
        const lon1 = parseFloat(p1.lon);
        const lat2 = parseFloat(p2.lat);
        const lon2 = parseFloat(p2.lon);

        if ([lat1, lon1, lat2, lon2].some(isNaN)) {
             if (p1.lat || p1.lon || p2.lat || p2.lon) {
                toast({ variant: 'destructive', title: 'Invalid Input', description: 'Please enter valid latitude/longitude values.' });
            }
            setDistance(null);
            return;
        }

        const R = 6371; // Radius of the Earth in km
        const toRad = (deg: number) => deg * Math.PI / 180;
        
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const radLat1 = toRad(lat1);
        const radLat2 = toRad(lat2);

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(radLat1) * Math.cos(radLat2) *
                  Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const km = R * c;
        const miles = km * 0.621371;
        setDistance({ km, miles });
    };

    useEffect(() => {
        calculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Latitude & Longitude Distance</CardTitle>
                <CardDescription>Find the great-circle distance between two points on Earth.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <fieldset className="border p-4 rounded-md">
                        <legend className="text-sm font-medium px-1">Point 1</legend>
                        <div className="flex gap-2">
                            <Input aria-label="Latitude 1" type="number" value={p1.lat} onChange={e => setP1({ ...p1, lat: e.target.value })} placeholder="Latitude 1" />
                            <Input aria-label="Longitude 1" type="number" value={p1.lon} onChange={e => setP1({ ...p1, lon: e.target.value })} placeholder="Longitude 1" />
                        </div>
                    </fieldset>
                     <fieldset className="border p-4 rounded-md">
                        <legend className="text-sm font-medium px-1">Point 2</legend>
                        <div className="flex gap-2">
                           <Input aria-label="Latitude 2" type="number" value={p2.lat} onChange={e => setP2({ ...p2, lat: e.target.value })} placeholder="Latitude 2" />
                           <Input aria-label="Longitude 2" type="number" value={p2.lon} onChange={e => setP2({ ...p2, lon: e.target.value })} placeholder="Longitude 2" />
                        </div>
                    </fieldset>
                </div>
                 <Button onClick={calculate} className="w-full">Calculate</Button>
            </CardContent>
            {distance && (
                <CardFooter>
                    <div className="w-full p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-md">
                        <p className="font-mono text-sm">The distance between [{p1.lat}, {p1.lon}] and [{p2.lat}, {p2.lon}] is:</p>
                        <p className="font-mono text-lg mt-2"><b>{distance.km.toFixed(1)} km</b> or <b>{distance.miles.toFixed(1)} miles</b></p>
                    </div>
                </CardFooter>
            )}
        </Card>
    );
};

export default function DistanceCalculator() {
    return (
        <div className="space-y-8">
            <TwoDCalculator />
            <ThreeDCalculator />
            <LatLongCalculator />
        </div>
    );
}
