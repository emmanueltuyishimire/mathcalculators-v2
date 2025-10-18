"use client";

import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRightLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const unitConfig = {
  Length: {
    Meter: 1,
    Kilometer: 1000,
    Centimeter: 0.01,
    Millimeter: 0.001,
    Mile: 1609.34,
    Yard: 0.9144,
    Foot: 0.3048,
    Inch: 0.0254,
  },
  Mass: {
    Kilogram: 1,
    Gram: 0.001,
    Milligram: 0.000001,
    Pound: 0.453592,
    Ounce: 0.0283495,
  },
  Temperature: {
    Celsius: (c: number) => c,
    Fahrenheit: (f: number) => (f - 32) * 5 / 9,
    Kelvin: (k: number) => k - 273.15,
  },
};

const unitConfigTo = {
  Length: unitConfig.Length,
  Mass: unitConfig.Mass,
  Temperature: {
    Celsius: (c: number) => c,
    Fahrenheit: (c: number) => (c * 9/5) + 32,
    Kelvin: (c: number) => c + 273.15,
  },
}


type UnitCategory = keyof typeof unitConfig;

export default function UnitConverter() {
  const [category, setCategory] = useState<UnitCategory>('Length');
  const [fromUnit, setFromUnit] = useState('Meter');
  const [toUnit, setToUnit] = useState('Foot');
  const [fromValue, setFromValue] = useState('1');
  const [toValue, setToValue] = useState('');

  const units = useMemo(() => Object.keys(unitConfig[category]), [category]);

  useEffect(() => {
    const currentUnits = Object.keys(unitConfig[category]);
    setFromUnit(currentUnits[0]);
    setToUnit(currentUnits[1] || currentUnits[0]);
  }, [category]);
  
  useEffect(() => {
    const fromValNum = parseFloat(fromValue);
    if (isNaN(fromValNum)) {
      setToValue('');
      return;
    }

    const fromUnitConf = unitConfig[category][fromUnit as keyof typeof unitConfig[UnitCategory]];
    const toUnitConf = unitConfigTo[category][toUnit as keyof typeof unitConfigTo[UnitCategory]];

    let baseValue;
    if (typeof fromUnitConf === 'function') {
      baseValue = fromUnitConf(fromValNum);
    } else {
      baseValue = fromValNum * fromUnitConf;
    }

    let convertedValue;
    if (typeof toUnitConf === 'function') {
      convertedValue = toUnitConf(baseValue);
    } else {
      convertedValue = baseValue / toUnitConf;
    }
    
    setToValue(convertedValue.toFixed(4));

  }, [fromValue, fromUnit, toUnit, category]);

  const handleSwap = () => {
    const tempUnit = fromUnit;
    setFromUnit(toUnit);
    setToUnit(tempUnit);
    setFromValue(toValue);
  };
  
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Unit Converter</CardTitle>
        <CardDescription>Convert between different units of measurement.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={(val) => setCategory(val as UnitCategory)}>
                <SelectTrigger id="category" aria-label="Select unit category">
                    <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                    {Object.keys(unitConfig).map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-2">
            <div className="w-full space-y-2">
                <Label htmlFor="from">From</Label>
                <Input id="from" value={fromValue} onChange={(e) => setFromValue(e.target.value)} type="number" />
                <Select value={fromUnit} onValueChange={setFromUnit}>
                    <SelectTrigger aria-label="Select unit to convert from"><SelectValue/></SelectTrigger>
                    <SelectContent>
                        {units.map(unit => <SelectItem key={unit} value={unit}>{unit}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
            
            <div className="pt-8">
                <Button variant="ghost" size="icon" onClick={handleSwap} aria-label="Swap units"><ArrowRightLeft className="size-5"/></Button>
            </div>

            <div className="w-full space-y-2">
                <Label htmlFor="to">To</Label>
                <Input id="to" value={toValue} readOnly type="number" className="bg-muted"/>
                <Select value={toUnit} onValueChange={setToUnit}>
                    <SelectTrigger aria-label="Select unit to convert to"><SelectValue/></SelectTrigger>
                    <SelectContent>
                        {units.map(unit => <SelectItem key={unit} value={unit}>{unit}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
