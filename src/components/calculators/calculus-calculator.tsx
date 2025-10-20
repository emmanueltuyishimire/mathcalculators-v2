
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function CalculatorTab({
  title,
  description,
  inputLabel,
  initialValue,
  placeholder,
  resultPrefix,
  mockResult
}: {
  title: string;
  description: string;
  inputLabel: string;
  initialValue: string;
  placeholder: string;
  resultPrefix: string;
  mockResult: string;
}) {
  const [expression, setExpression] = useState(initialValue);
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCalculate = () => {
    setIsLoading(true);
    setResult('');
    setTimeout(() => {
      setResult(mockResult);
      setIsLoading(false);
    }, 1000);
  };
  
  useEffect(() => {
    if (initialValue) {
      handleCalculate();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-4">
      <CardHeader className="p-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <div className="space-y-2">
        <Label htmlFor={title}>{inputLabel}</Label>
        <Input
          id={title}
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          placeholder={placeholder}
          className="font-mono"
        />
      </div>
      <Button onClick={handleCalculate} disabled={isLoading || !expression} className="w-full bg-accent hover:bg-accent/90">
        {isLoading ? 'Calculating...' : 'Calculate'}
      </Button>
      {result && (
        <CardFooter className="p-0">
          <div className="mt-4 w-full rounded-lg border border-green-500/50 bg-green-50 p-3 text-green-800 dark:bg-green-950 dark:text-green-300">
            <p className="font-mono transition-opacity duration-300"><span className="font-semibold">{resultPrefix}:</span> {result}</p>
          </div>
        </CardFooter>
      )}
    </div>
  );
}

export default function CalculusCalculator() {
  return (
    <Card className="shadow-lg">
      <CardContent className="p-4">
        <Tabs defaultValue="derivative">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="derivative">Derivative</TabsTrigger>
            <TabsTrigger value="integral">Integral</TabsTrigger>
            <TabsTrigger value="limit">Limit</TabsTrigger>
          </TabsList>
          <TabsContent value="derivative" className="mt-4">
            <CalculatorTab
              title="Derivative"
              description="Find the derivative of a function with respect to x."
              inputLabel="f(x) ="
              initialValue="x^3 + 2x"
              placeholder="e.g., x^3 + 2x"
              resultPrefix="d/dx"
              mockResult="3x^2 + 2"
            />
          </TabsContent>
          <TabsContent value="integral" className="mt-4">
             <CalculatorTab
              title="Integral"
              description="Find the indefinite integral of a function with respect to x."
              inputLabel="∫ f(x) dx"
              initialValue="3x^2"
              placeholder="e.g., 3x^2"
              resultPrefix="∫"
              mockResult="x^3 + C"
            />
          </TabsContent>
          <TabsContent value="limit" className="mt-4">
             <CalculatorTab
              title="Limit"
              description="Find the limit of a function as x approaches a value."
              inputLabel="lim x→a f(x)"
              initialValue="(x^2 - 4)/(x - 2) as x->2"
              placeholder="e.g., (sin(x)/x) as x->0"
              resultPrefix="lim"
              mockResult="4"
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
