
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// 2D Calculator
const TwoDCalculator = () => {
    const { toast } = useToast();
    const [p1, setP1] = useState({ x: '1', y: '1' });
    const [p2, setP2] = useState({ x: '4', y: '5' });
    const [distance, setDistance] = useState<number | null>(null);

    const calculate = () => {
        const x1 = parseFloat(p1.x);
        const y1 = parseFloat(p1.y);
        const x2 = parseFloat(p2.x);
        const y2 = parseFloat(p2.y);

        if ([x1, y1, x2, y2].some(isNaN)) {
            toast({ variant: 'destructive', title: 'Invalid Input', description: 'Please enter valid numbers for all coordinates.' });
            return;
        }

        const dist = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        setDistance(dist);
    };

    useEffect(calculate, []);

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
            {distance !== null && (
                <CardFooter>
                    <p className="font-mono text-center w-full">Distance: {distance.toFixed(4)}</p>
                </CardFooter>
            )}
        </Card>
    );
};

// 3D Calculator
const ThreeDCalculator = () => {
    const { toast } = useToast();
    const [p1, setP1] = useState({ x: '1', y: '1', z: '1' });
    const [p2, setP2] = useState({ x: '2', y: '2', z: '2' });
    const [distance, setDistance] = useState<number | null>(null);

    const calculate = () => {
        const x1 = parseFloat(p1.x);
        const y1 = parseFloat(p1.y);
        const z1 = parseFloat(p1.z);
        const x2 = parseFloat(p2.x);
        const y2 = parseFloat(p2.y);
        const z2 = parseFloat(p2.z);

        if ([x1, y1, z1, x2, y2, z2].some(isNaN)) {
            toast({ variant: 'destructive', title: 'Invalid Input', description: 'Please enter valid numbers for all coordinates.' });
            return;
        }

        const dist = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2));
        setDistance(dist);
    };

    useEffect(calculate, []);

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
            {distance !== null && (
                <CardFooter>
                    <p className="font-mono text-center w-full">Distance: {distance.toFixed(4)}</p>
                </CardFooter>
            )}
        </Card>
    );
};

// Latitude/Longitude Calculator
const LatLongCalculator = () => {
    const { toast } = useToast();
    const [p1, setP1] = useState({ lat: '38.8976', lon: '-77.0366' }); // White House
    const [p2, setP2] = useState({ lat: '39.9496', lon: '-75.1503' }); // Independence Hall
    const [distance, setDistance] = useState<{ km: number, miles: number } | null>(null);

    const calculate = () => {
        const lat1 = parseFloat(p1.lat);
        const lon1 = parseFloat(p1.lon);
        const lat2 = parseFloat(p2.lat);
        const lon2 = parseFloat(p2.lon);

        if ([lat1, lon1, lat2, lon2].some(isNaN)) {
            toast({ variant: 'destructive', title: 'Invalid Input', description: 'Please enter valid latitude/longitude values.' });
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

    useEffect(calculate, []);

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
                <CardFooter className="flex-col items-start gap-1">
                    <p className="font-mono">Distance: {distance.km.toFixed(2)} km</p>
                    <p className="font-mono">Distance: {distance.miles.toFixed(2)} miles</p>
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
