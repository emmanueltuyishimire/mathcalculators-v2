
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function AlgebraCalculator() {
  const [equation, setEquation] = useState('3x - 5 = 16');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSolve = () => {
    setIsLoading(true);
    setResult('');
    // Mock API call or complex calculation
    setTimeout(() => {
      // A real implementation would parse and solve the equation.
      // For this demo, we'll return a placeholder result based on the example.
      if (equation === '3x - 5 = 16') {
        setResult('Solution: x = 7');
      } else if (equation) {
        setResult('Could not solve equation. Please use a simple linear format like "ax + b = c".');
      }
      setIsLoading(false);
    }, 1000);
  };
  
  // Initial calculation on mount
  useEffect(() => {
    if (equation) {
        handleSolve();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Equation Solver</CardTitle>
        <CardDescription>Enter a linear equation to solve for 'x'.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="equation">Equation</Label>
          <Input
            id="equation"
            value={equation}
            onChange={(e) => setEquation(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSolve()}
            placeholder="e.g., 3x - 5 = 16"
            className="text-lg font-mono"
          />
        </div>
        <Button onClick={handleSolve} disabled={isLoading || !equation} className="w-full bg-accent hover:bg-accent/90">
          {isLoading ? 'Solving...' : 'Solve for x'}
        </Button>
      </CardContent>
      {result && (
        <CardFooter>
          <div className="mt-4 w-full rounded-lg border border-green-500/50 bg-green-50 p-4 text-green-800 dark:bg-green-950 dark:text-green-300">
            <h4 className="font-semibold">Result</h4>
            <p className="font-mono transition-opacity duration-300">{result}</p>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
