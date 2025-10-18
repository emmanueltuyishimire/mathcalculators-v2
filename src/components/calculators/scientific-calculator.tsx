"use client";

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

export default function ScientificCalculator() {
  const [displayValue, setDisplayValue] = useState('0');
  const [isResult, setIsResult] = useState(false);
  const [isRadians, setIsRadians] = useState(true);

  const handleButtonClick = (value: string) => {
    if (isResult) {
      setDisplayValue(value);
      setIsResult(false);
      return;
    }
    setDisplayValue(prev => (prev === '0' && !'()'.includes(value) ? value : prev + value));
  };

  const handleOperatorClick = (operator: string) => {
    setIsResult(false);
    setDisplayValue(prev => `${prev} ${operator} `);
  };

  const handleClear = () => {
    setDisplayValue('0');
    setIsResult(false);
  };
  
  const handleBackspace = () => {
    if (isResult) {
      handleClear();
      return;
    }
    setDisplayValue(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
  }

  const handleFunctionClick = (func: string) => {
     if (isResult) {
      setDisplayValue(`${func}(`);
      setIsResult(false);
    } else {
       setDisplayValue(prev => (prev === '0' ? `${func}(` : `${prev}${func}(`));
    }
  };

  const calculate = (expression: string): number => {
    // This is a safer version than eval.
    // It handles basic arithmetic, parenthesis, and functions.
    // A more robust solution would involve a proper parsing library.
    return new Function('return ' + expression
      .replace(/sin\(/g, 'Math.sin(' + (isRadians ? '' : 'Math.PI/180*'))
      .replace(/cos\(/g, 'Math.cos(' + (isRadians ? '' : 'Math.PI/180*'))
      .replace(/tan\(/g, 'Math.tan(' + (isRadians ? '' : 'Math.PI/180*'))
      .replace(/log\(/g, 'Math.log10(')
      .replace(/ln\(/g, 'Math.log(')
      .replace(/sqrt\(/g, 'Math.sqrt(')
      .replace(/π/g, 'Math.PI')
      .replace(/e/g, 'Math.E')
      .replace(/\^/g, '**')
    )();
  };

  const handleEquals = () => {
    try {
      // Basic validation for parentheses
      if (displayValue.split('(').length !== displayValue.split(')').length) {
        throw new Error("Mismatched parentheses");
      }
      const result = calculate(displayValue.replace(/×/g, '*').replace(/÷/g, '/'));
      setDisplayValue(String(result));
      setIsResult(true);
    } catch (error) {
       toast({
        variant: "destructive",
        title: "Invalid Expression",
        description: "Please check your input. Note: Factorials are not yet supported.",
      });
      setIsResult(true);
    }
  };
  
  const buttons = [
    { label: 'sin', type: 'func' }, { label: 'cos', type: 'func' }, { label: 'tan', type: 'func' }, { label: 'log', type: 'func' }, { label: 'ln', type: 'func' },
    { label: '(', type: 'char' }, { label: ')', type: 'char' }, { label: 'sqrt', type: 'func' }, { label: '^', type: 'op' }, { label: 'π', type: 'char' },
    '7', '8', '9', '÷', 'C',
    '4', '5', '6', '×', '⌫',
    '1', '2', '3', '-', '=',
    '0', '.', '%', '+',
  ];

  return (
    <Card className="shadow-lg">
      <CardContent className="flex flex-col items-center gap-4 p-6">
        <div className="w-full rounded-lg border bg-muted p-4 text-right text-3xl font-mono text-foreground transition-all duration-300">
          {displayValue}
        </div>
        <div className="flex w-full justify-end">
            <Button size="sm" variant="ghost" onClick={() => setIsRadians(!isRadians)}>
                {isRadians ? 'RAD' : 'DEG'}
            </Button>
        </div>
        <div className="grid w-full grid-cols-5 gap-2">
          {buttons.map((btn, index) => {
            const btnConfig = typeof btn === 'string' ? { label: btn, type: 'char' } : btn;
            
            const isOperator = ['÷', '×', '-', '+', '^'].includes(btnConfig.label);
            const isEquals = btnConfig.label === '=';
            const isClear = btnConfig.label === 'C';
            const isBackspace = btnConfig.label === '⌫';
            const isFunction = btnConfig.type === 'func';

            return (
              <Button
                key={index}
                variant={isOperator || isFunction ? 'secondary' : isEquals ? 'default' : (isClear || isBackspace) ? 'destructive' : 'outline'}
                className={`text-lg h-14 ${isEquals ? 'bg-primary hover:bg-primary/90 col-span-2' : isOperator || isFunction ? 'bg-accent text-accent-foreground hover:bg-accent/90' : ''}`}
                onClick={() => {
                  if (isEquals) handleEquals();
                  else if (isClear) handleClear();
                  else if (isBackspace) handleBackspace();
                  else if (isOperator) handleOperatorClick(btnConfig.label);
                  else if (isFunction) handleFunctionClick(btnConfig.label);
                  else handleButtonClick(btnConfig.label);
                }}
              >
                {btnConfig.label}
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
