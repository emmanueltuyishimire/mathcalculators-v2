
"use client";

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Percent, Divide, X, Minus, Plus, Equal, Eraser } from 'lucide-react';

export default function BasicCalculator() {
  const [displayValue, setDisplayValue] = useState('0');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
  const { toast } = useToast();

  const handleDigitClick = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplayValue(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? digit : displayValue + digit);
    }
  };

  const handleDecimalClick = () => {
    if (waitingForSecondOperand) {
        setDisplayValue('0.');
        setWaitingForSecondOperand(false);
        return;
    }
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  const handleOperatorClick = (nextOperator: string) => {
    const inputValue = parseFloat(displayValue);

    if (operator && waitingForSecondOperand) {
      setOperator(nextOperator);
      return;
    }

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = performCalculation();
      if (result === null) return;
      setDisplayValue(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };
  
  const performCalculation = () => {
      if (firstOperand === null || operator === null) return parseFloat(displayValue);
      
      const secondOperand = parseFloat(displayValue);
      let result = 0;
      switch (operator) {
          case '+': result = firstOperand + secondOperand; break;
          case '-': result = firstOperand - secondOperand; break;
          case '×': result = firstOperand * secondOperand; break;
          case '÷':
              if (secondOperand === 0) {
                  toast({ variant: 'destructive', title: "Error", description: "Cannot divide by zero."});
                  return null;
              }
              result = firstOperand / secondOperand;
              break;
      }
      return result;
  }

  const handleEquals = () => {
    if (!operator) return;
    const result = performCalculation();
    if (result === null) return;
    setDisplayValue(String(result));
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const handleAllClear = () => {
    setDisplayValue('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const handleClearEntry = () => {
    setDisplayValue('0');
  }

  const handleBackspace = () => {
      if (waitingForSecondOperand) return;
      setDisplayValue(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
  }
  
  const handlePercent = () => {
      const currentValue = parseFloat(displayValue);
      if (firstOperand !== null && operator) {
           setDisplayValue(String((firstOperand * currentValue) / 100));
      } else {
          setDisplayValue(String(currentValue/100));
      }
  }

  const buttons = [
    { id: 'clear-entry', label: 'CE', onClick: handleClearEntry, variant: 'destructive' },
    { id: 'all-clear', label: 'C', onClick: handleAllClear, variant: 'destructive' },
    { id: 'percent', label: '%', icon: Percent, onClick: handlePercent, variant: 'secondary' },
    { id: 'divide', label: '÷', icon: Divide, onClick: () => handleOperatorClick('÷'), variant: 'accent' },
    { id: '7', label: '7', onClick: () => handleDigitClick('7'), variant: 'outline' },
    { id: '8', label: '8', onClick: () => handleDigitClick('8'), variant: 'outline' },
    { id: '9', label: '9', onClick: () => handleDigitClick('9'), variant: 'outline' },
    { id: 'multiply', label: '×', icon: X, onClick: () => handleOperatorClick('×'), variant: 'accent' },
    { id: '4', label: '4', onClick: () => handleDigitClick('4'), variant: 'outline' },
    { id: '5', label: '5', onClick: () => handleDigitClick('5'), variant: 'outline' },
    { id: '6', label: '6', onClick: () => handleDigitClick('6'), variant: 'outline' },
    { id: 'subtract', label: '-', icon: Minus, onClick: () => handleOperatorClick('-'), variant: 'accent' },
    { id: '1', label: '1', onClick: () => handleDigitClick('1'), variant: 'outline' },
    { id: '2', label: '2', onClick: () => handleDigitClick('2'), variant: 'outline' },
    { id: '3', label: '3', onClick: () => handleDigitClick('3'), variant: 'outline' },
    { id: 'add', label: '+', icon: Plus, onClick: () => handleOperatorClick('+'), variant: 'accent' },
    { id: 'backspace', label: '⌫', icon: Eraser, onClick: handleBackspace, variant: 'secondary' },
    { id: '0', label: '0', onClick: () => handleDigitClick('0'), variant: 'outline' },
    { id: 'decimal', label: '.', onClick: handleDecimalClick, variant: 'outline' },
    { id: 'equals', label: '=', icon: Equal, onClick: handleEquals, variant: 'default' },
  ];

  return (
    <Card className="shadow-lg max-w-xs mx-auto">
      <CardContent className="flex flex-col items-center gap-2 p-3">
        <div className="w-full rounded-lg border bg-muted p-4 text-right text-3xl font-mono text-foreground break-all">
          {displayValue}
        </div>
        <div className="grid w-full grid-cols-4 gap-2">
          {buttons.map((btn) => (
            <Button
              key={btn.id}
              variant={btn.variant as any}
              className={cn("text-xl h-14", btn.id === 'equals' && 'bg-primary hover:bg-primary/90')}
              onClick={btn.onClick}
              aria-label={btn.label}
            >
              {btn.icon ? <btn.icon className="h-5 w-5" /> : btn.label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
