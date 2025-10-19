
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { calculate } from '@/lib/trig';

const directTrigFunctions = ["sin", "cos", "tan", "cot", "sec", "csc"];
const inverseTrigFunctions = ["asin", "acos", "atan", "acot", "asec", "acsc"];
const hyperbolicFunctions = ["sinh", "cosh", "tanh", "coth", "sech", "csch"];

export default function BasicTrigCalculator() {
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
      const res = calculate(funcName, numValue, unit);
      
      if (typeof res === 'string') {
        throw new Error(res);
      }
      
      setResult(String(res));
    } catch (e: any) {
      toast({ variant: 'destructive', title: 'Calculation Error', description: e.message });
      setResult(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trigonometry Functions</CardTitle>
        <CardDescription>Calculate direct, inverse, and hyperbolic trigonometric functions.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="function-select">Function</Label>
                <Select value={funcName} onValueChange={setFuncName}>
                    <SelectTrigger id="function-select"><SelectValue/></SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Trigonometric</SelectLabel>
                            {directTrigFunctions.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                        </SelectGroup>
                        <SelectGroup>
                            <SelectLabel>Inverse</SelectLabel>
                            {inverseTrigFunctions.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                        </SelectGroup>
                        <SelectGroup>
                            <SelectLabel>Hyperbolic</SelectLabel>
                             {hyperbolicFunctions.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}
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
            <Label>{isInverse || hyperbolicFunctions.includes(funcName) ? 'Output Unit' : 'Angle Unit'}</Label>
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
