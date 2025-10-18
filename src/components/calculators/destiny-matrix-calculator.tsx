
"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

type Matrix = number[][];

const sumDigits = (numStr: string): number => {
  let num = parseInt(numStr, 10);
  if (isNaN(num)) return 0;
  
  while (num > 9) {
    if ([11, 22, 33].includes(num)) break; // Master numbers
    num = String(num).split('').reduce((sum, digit) => sum + parseInt(digit, 10), 0);
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

const MatrixCell = ({ value }: { value: number }) => (
    <div className="flex items-center justify-center h-16 w-16 md:h-20 md:w-20 border bg-primary/10 text-primary text-2xl font-bold rounded-lg">
        {value}
    </div>
);

export default function DestinyMatrixCalculator() {
  const { toast } = useToast();
  const [birthDate, setBirthDate] = useState('1990-08-15');
  const [matrix, setMatrix] = useState<Matrix | null>(null);
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

      const dayNum = sumDigits(day);
      const monthNum = sumDigits(month);
      const yearString = String(parseInt(year));
      const yearNum = sumDigits(yearString);
      
      const lifePathNum = sumDigits(String(dayNum + monthNum + yearNum));

      // Simplified matrix construction based on common numerology patterns
      const a = dayNum;
      const b = monthNum;
      const c = yearNum;
      const d = lifePathNum;
      
      const e = sumDigits(String(a + b + c + d));
      
      // More derived points
      const p1 = sumDigits(String(a+e));
      const p2 = sumDigits(String(b+e));
      const p3 = sumDigits(String(c+e));
      const p4 = sumDigits(String(d+e));

      const newMatrix: Matrix = [
        [a, p1, b],
        [p3, e, p2],
        [c, p4, d]
      ];
      setMatrix(newMatrix);
      
      const newAnalysis = {
        "Life Path Number": `${lifePathNum}: ${numberInterpretations[lifePathNum] || 'Your unique path.'}`,
        "Day Number": `${dayNum}: ${numberInterpretations[dayNum] || 'Your personal essence.'}`,
        "Month Number": `${monthNum}: ${numberInterpretations[monthNum] || 'Your emotional nature.'}`,
        "Year Number": `${yearNum}: ${numberInterpretations[yearNum] || 'Your life\'s theme.'}`
      };
      setAnalysis(newAnalysis);

      toast({ title: "Matrix Calculated", description: "Your Destiny Matrix has been generated." });

    } catch (e: any) {
      toast({ variant: 'destructive', title: "Error", description: e.message });
      setMatrix(null);
      setAnalysis({});
    }
  };

  const handleClear = () => {
    setBirthDate('');
    setMatrix(null);
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
      
      {matrix && (
        <Card>
          <CardHeader>
            <CardTitle>Your Destiny Matrix</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="grid grid-cols-3 gap-2">
              {matrix.flat().map((num, index) => (
                <MatrixCell key={index} value={num} />
              ))}
            </div>
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
