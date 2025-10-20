
"use client";

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function BasicCalculator() {
  const [displayValue, setDisplayValue] = useState('0');
  const [isResult, setIsResult] = useState(false);

  const handleButtonClick = (value: string) => {
    if (isResult) {
      setDisplayValue(value);
      setIsResult(false);
      return;
    }
    setDisplayValue(prev => (prev === '0' ? value : prev + value));
  };

  const handleOperatorClick = (operator: string) => {
    setIsResult(false);
    setDisplayValue(prev => `${prev} ${operator} `);
  };

  const handleClear = () => {
    setDisplayValue('0');
    setIsResult(false);
  };

  const handleEquals = () => {
    try {
      const expression = displayValue.replace(/×/g, '*').replace(/÷/g, '/');
      if (/[+\-*/]$/.test(expression.trim())) {
        throw new Error("Invalid expression");
      }
      // Note: Using eval() is insecure for production apps.
      // This is a simplified example. A real app should use a safe math expression parser.
      const result = new Function('return ' + expression)();
      setDisplayValue(String(result));
      setIsResult(true);
    } catch (error) {
      setDisplayValue('Error');
      setIsResult(true);
    }
  };

  const buttons = [
    '7', '8', '9', '÷',
    '4', '5', '6', '×',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
  ];

  return (
    <Card className="shadow-lg">
      <CardContent className="flex flex-col items-center gap-2 p-4">
        <div className="w-full rounded-lg border bg-muted p-3 text-right text-2xl font-mono text-foreground transition-all duration-300">
          {displayValue}
        </div>
        <div className="grid w-full grid-cols-4 gap-2">
          <Button variant="destructive" className="col-span-2 text-lg" onClick={handleClear}>C</Button>
          {buttons.map((btn) => {
            const isOperator = ['÷', '×', '-', '+'].includes(btn);
            const isEquals = btn === '=';
            return (
              <Button
                key={btn}
                variant={isOperator ? 'secondary' : isEquals ? 'default' : 'outline'}
                className={`text-lg h-14 ${isEquals ? 'bg-primary hover:bg-primary/90' : isOperator ? 'bg-accent text-accent-foreground hover:bg-accent/90' : ''}`}
                onClick={() => {
                  if (isEquals) handleEquals();
                  else if (isOperator) handleOperatorClick(btn);
                  else handleButtonClick(btn);
                }}
              >
                {btn}
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
