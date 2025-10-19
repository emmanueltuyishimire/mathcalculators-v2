
"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { DestinyMatrixDiagram } from './destiny-matrix-diagram';

type Matrix = number[][];

const sumDigits = (numStr: string): number => {
  let num = parseInt(numStr, 10);
  if (isNaN(num)) return 0;
  if ([11, 22, 33].includes(num)) return num;

  while (num > 9) {
    num = String(num).split('').reduce((sum, digit) => sum + parseInt(digit, 10), 0);
    if ([11, 22, 33].includes(num)) break;
  }
  return num;
};


const numberInterpretations: { [key: number]: string } = {
  1: "Leader, independent, pioneer, original.",
  2: "Cooperative, diplomatic, peacemaker, sensitive.",
  3: "Creative, communicative, optimistic, expressive.",
  4: "Practical, organized, hardworking, disciplined.",
  5: "Adventurous, versatile, freedom-loving, dynamic.",
  6: "Nurturing, responsible, harmonious, loving.",
  7: "Analytical, spiritual, introspective, wise.",
  8: "Ambitious, authoritative, powerful, materialistic.",
  9: "Compassionate, humanitarian, idealistic, selfless.",
  11: "Visionary, intuitive, idealistic, inspiring.",
  22: "Master builder, practical, powerful, disciplined.",
  33: "Master teacher, compassionate, spiritual, healing."
};


export default function DestinyMatrixCalculator() {
  const { toast } = useToast();
  const [birthDate, setBirthDate] = useState('1990-08-15');
  const [matrixPoints, setMatrixPoints] = useState<{[key:string]: number} | null>(null);
  const [analysis, setAnalysis] = useState<{ [key: string]: string }>({});

  const calculateMatrix = () => {
    try {
      if (!birthDate) {
        throw new Error("Please enter a valid birth date.");
      }
      const [year, month, day] = birthDate.split('-');
      if (!year || !month || !day || isNaN(parseInt(day)) || isNaN(parseInt(month)) || isNaN(parseInt(year))) {
        throw new Error("Invalid date format. Please use YYYY-MM-DD.");
      }

      const a = sumDigits(day);
      const b = sumDigits(month);
      const c = sumDigits(String(parseInt(year)));
      
      const d = sumDigits(String(a + b + c));
      
      const e = sumDigits(String(a + b + c + d));
      
      const f = sumDigits(String(a+e));
      const g = sumDigits(String(b+e));
      const h = sumDigits(String(c+e));
      const i = sumDigits(String(d+e));

      const points = { a, b, c, d, e, f, g, h, i };
      setMatrixPoints(points);
      
      const newAnalysis = {
        "Life Path Number": `${d}: ${numberInterpretations[d] || 'Your unique path.'}`,
        "Day Number": `${a}: ${numberInterpretations[a] || 'Your personal essence.'}`,
        "Month Number": `${b}: ${numberInterpretations[b] || 'Your emotional nature.'}`,
        "Year Number": `${c}: ${numberInterpretations[c] || 'Your life\'s theme.'}`
      };
      setAnalysis(newAnalysis);

      toast({ title: "Matrix Calculated", description: "Your Destiny Matrix has been generated." });

    } catch (e: any) {
      toast({ variant: 'destructive', title: "Error", description: e.message });
      setMatrixPoints(null);
      setAnalysis({});
    }
  };

  const handleClear = () => {
    setBirthDate('');
    setMatrixPoints(null);
    setAnalysis({});
    toast({ title: "Cleared", description: "Inputs and results have been cleared." });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Enter Your Details</CardTitle>
          <CardDescription>Your birth date is used to calculate your personal numerology matrix.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 space-y-2">
            <Label htmlFor="birthdate">Date of Birth</Label>
            <Input
              id="birthdate"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="h-10"
            />
          </div>
          <div className="flex items-end gap-2">
            <Button onClick={calculateMatrix} className="w-full sm:w-auto">Calculate Matrix</Button>
            <Button variant="outline" onClick={handleClear} className="w-full sm:w-auto">Clear</Button>
          </div>
        </CardContent>
      </Card>

       <Card>
        <CardHeader>
          <CardTitle>How to Use This Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
            <ol className="list-decimal list-inside space-y-2">
                <li>
                    <b>Enter Birth Date:</b> Use the date picker to select your date of birth. The calculations are based on the numbers from your birth day, month, and year.
                </li>
                <li>
                    <b>Calculate Matrix:</b> Click the "Calculate Matrix" button. The tool will instantly generate your personal Destiny Matrix based on numerological principles.
                </li>
                <li>
                    <b>Analyze Your Results:</b> The results will appear below the calculator, showing your Destiny Matrix diagram and providing interpretations for key numbers like your Life Path Number.
                </li>
            </ol>
        </CardContent>
      </Card>
      
      {matrixPoints && (
        <Card>
          <CardHeader>
            <CardTitle>Your Destiny Matrix Diagram</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center items-center">
            <DestinyMatrixDiagram points={matrixPoints} />
          </CardContent>
        </Card>
      )}

      {Object.keys(analysis).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Analysis & Interpretation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(analysis).map(([key, value]) => (
                <div key={key}>
                    <h4 className="font-semibold text-primary">{key}</h4>
                    <p className="text-sm text-muted-foreground">{value}</p>
                </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
