
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

const toRadians = (deg: number) => (deg * Math.PI) / 180;
const toDegrees = (rad: number) => (rad * 180) / Math.PI;

const directTrigFunctions = {
  sin: (angle: number, unit: string) => Math.sin(unit === 'deg' ? toRadians(angle) : angle),
  cos: (angle: number, unit: string) => Math.cos(unit === 'deg' ? toRadians(angle) : angle),
  tan: (angle: number, unit: string) => Math.tan(unit === 'deg' ? toRadians(angle) : angle),
  cot: (angle: number, unit: string) => 1 / Math.tan(unit === 'deg' ? toRadians(angle) : angle),
  sec: (angle: number, unit: string) => 1 / Math.cos(unit === 'deg' ? toRadians(angle) : angle),
  csc: (angle: number, unit: string) => 1 / Math.sin(unit === 'deg' ? toRadians(angle) : angle),
};

const inverseTrigFunctions = {
  asin: (x: number, unit: string) => (unit === 'deg' ? toDegrees(Math.asin(x)) : Math.asin(x)),
  acos: (x: number, unit: string) => (unit === 'deg' ? toDegrees(Math.acos(x)) : Math.acos(x)),
  atan: (x: number, unit: string) => (unit === 'deg' ? toDegrees(Math.atan(x)) : Math.atan(x)),
  acot: (x: number, unit: string) => (unit === 'deg' ? toDegrees(Math.atan(1 / x)) : Math.atan(1 / x)),
  asec: (x: number, unit: string) => (unit === 'deg' ? toDegrees(Math.acos(1 / x)) : Math.acos(1 / x)),
  acsc: (x: number, unit: string) => (unit === 'deg' ? toDegrees(Math.asin(1 / x)) : Math.asin(1 / x)),
};

const allFunctions: Record<string, (val: number, unit: string) => number> = {
  ...directTrigFunctions,
  ...inverseTrigFunctions,
};

export default function TrigonometryCalculator() {
  const [funcName, setFuncName] = useState<string>('sin');
  const [inputValue, setInputValue] = useState<string>('30');
  const [unit, setUnit] = useState<string>('deg');
  const [result, setResult] = useState<string | null>(null);
  const { toast } = useToast();
  
  const isInverse = funcName.startsWith('a');

  const calculateTrig = () => {
    const numValue = parseFloat(inputValue);
    if (isNaN(numValue)) {
      toast({ variant: 'destructive', title: 'Invalid Input', description: 'Please enter a valid number.' });
      setResult(null);
      return;
    }

    try {
      const calculation = allFunctions[funcName];
      if (!calculation) {
        throw new Error(`Unknown function: ${funcName}`);
      }
      const res = calculation(numValue, unit);

      if (isNaN(res) || !isFinite(res)) {
        throw new Error('Invalid input or undefined result for this function.');
      }
      setResult(res.toFixed(10));
    } catch (e: any) {
      toast({ variant: 'destructive', title: 'Calculation Error', description: e.message });
      setResult(null);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Trigonometry Functions</CardTitle>
        <CardDescription>Calculate direct and inverse trigonometric functions.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="function-select">Function</Label>
                <Select value={funcName} onValueChange={setFuncName}>
                    <SelectTrigger id="function-select"><SelectValue/></SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Direct Functions</SelectLabel>
                            {Object.keys(directTrigFunctions).map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                        </SelectGroup>
                        <SelectGroup>
                            <SelectLabel>Inverse Functions</SelectLabel>
                            {Object.keys(inverseTrigFunctions).map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="input-value">{isInverse ? 'Value' : 'Angle'}</Label>
                <Input id="input-value" type="number" value={inputValue} onChange={e => setInputValue(e.target.value)} />
            </div>
        </div>
        <div className="space-y-2">
            <Label>{isInverse ? 'Output Unit' : 'Angle Unit'}</Label>
             <RadioGroup defaultValue="deg" value={unit} onValueChange={setUnit} className="flex gap-4">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="deg" id="r-deg" />
                    <Label htmlFor="r-deg">Degrees</Label>
                </div>
                 <div className="flex items-center space-x-2">
                    <RadioGroupItem value="rad" id="r-rad" />
                    <Label htmlFor="r-rad">Radians</Label>
                </div>
            </RadioGroup>
        </div>
        <Button onClick={calculateTrig} className="w-full">Calculate</Button>
      </CardContent>
      {result !== null && (
        <CardFooter>
            <div className="w-full space-y-2">
                <Label>Result</Label>
                <div className="p-4 bg-muted rounded-md text-center font-mono text-xl font-bold">{result}</div>
            </div>
        </CardFooter>
      )}
    </Card>
  );
}
