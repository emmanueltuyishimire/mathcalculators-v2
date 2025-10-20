
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

// #region Helper Functions
const factorial = (n: number): number => {
  if (n < 0 || n % 1 !== 0) return NaN;
  if (n > 170) return Infinity;
  if (n === 0) return 1;
  let result = 1;
  for (let i = n; i > 1; i--) {
    result *= i;
  }
  return result;
};

const evaluateExpression = (expr: string): number => {
    // This is a safer, more robust evaluator than `eval` or `new Function`.
    // It respects operator precedence (PEMDAS/BODMAS).
    try {
        // Replace visual operators with JS operators
        let sanitizedExpr = expr.replace(/×/g, '*').replace(/÷/g, '/').replace(/--/g, '+').replace(/\+-/g, '-');
        
        // This regex finds numbers (including scientific notation) and operators
        const tokens = sanitizedExpr.match(/(\d+\.?\d*e[+-]?\d+)|(\d+\.?\d*)|([+*/^])|(-)/g);

        if (!tokens) return 0;
        
        // Handle unary minus at the beginning or after an operator
        const processedTokens: (string|number)[] = [];
        for (let i = 0; i < tokens.length; i++) {
            if (tokens[i] === '-' && (i === 0 || ['+', '-', '*', '/', '^'].includes(tokens[i-1]))) {
                processedTokens.push(parseFloat(tokens[i] + tokens[i+1]));
                i++; // Skip the next token as it's part of the negative number
            } else {
                const num = parseFloat(tokens[i]);
                processedTokens.push(isNaN(num) ? tokens[i] : num);
            }
        }

        const applyOp = (operators: string[], values: number[]) => {
            const op = operators.pop();
            const right = values.pop();
            const left = values.pop();
            if (left === undefined || right === undefined) throw new Error("Invalid expression");
            switch (op) {
                case '+': values.push(left + right); break;
                case '-': values.push(left - right); break;
                case '*': values.push(left * right); break;
                case '/':
                    if (right === 0) throw new Error("Division by zero");
                    values.push(left / right);
                    break;
                case '^': values.push(Math.pow(left, right)); break;
            }
        };

        const precedence = (op: string) => {
            if (op === '+' || op === '-') return 1;
            if (op === '*' || op === '/') return 2;
            if (op === '^') return 3;
            return 0;
        };

        const values: number[] = [];
        const operators: string[] = [];

        for (const token of processedTokens) {
            if (typeof token === 'number') {
                values.push(token);
            } else {
                while (operators.length > 0 && precedence(operators[operators.length - 1]) >= precedence(token)) {
                    applyOp(operators, values);
                }
                operators.push(token);
            }
        }

        while (operators.length > 0) {
            applyOp(operators, values);
        }

        if (values.length !== 1 || operators.length !== 0) throw new Error("Invalid expression format");
        return values[0];
    } catch (error) {
        throw new Error("Invalid expression");
    }
};
// #endregion

export default function ScientificCalculator() {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [currentNumber, setCurrentNumber] = useState('0');
  const [isResult, setIsResult] = useState(false);
  const [angleMode, setAngleMode] = useState<'RAD' | 'DEG'>('RAD');
  const [memory, setMemory] = useState(0);
  const [show2nd, setShow2nd] = useState(false);
  const { toast } = useToast();
  
  // Update display whenever the expression or current number changes
  useEffect(() => {
    setDisplay(expression + currentNumber);
  }, [expression, currentNumber]);

  // #region Handlers
  const handleDigit = (digit: string) => {
    if (isResult) {
      setExpression('');
      setCurrentNumber(digit);
      setIsResult(false);
      return;
    }
    setCurrentNumber(prev => (prev === '0' ? digit : prev + digit));
  };
  
  const handleDecimal = () => {
    if (isResult) {
      setExpression('');
      setCurrentNumber('0.');
      setIsResult(false);
      return;
    }
    if (!currentNumber.includes('.')) {
      setCurrentNumber(prev => prev + '.');
    }
  }

  const handleOperator = (op: string) => {
    if (currentNumber === '0' && expression === '') return;
    setIsResult(false);
    if (currentNumber !== '') {
      setExpression(prev => prev + currentNumber + ` ${op} `);
      setCurrentNumber('');
    } else {
      // Replace the last operator if expression ends with one
      setExpression(prev => prev.trim().slice(0, -1) + ` ${op} `);
    }
  };

  const handleEquals = () => {
    if (expression === '' && currentNumber === '0') return;
    
    let finalExpression = expression;
    if (currentNumber !== '' && currentNumber !== '0') {
        finalExpression += currentNumber;
    }
    
    try {
      const result = evaluateExpression(finalExpression);
      if (isNaN(result) || !isFinite(result)) throw new Error("Invalid result");
      const resultString = String(result);
      setDisplay(resultString);
      setCurrentNumber(resultString);
      setExpression('');
      setIsResult(true);
    } catch (e: any) {
      setDisplay('Error');
      setCurrentNumber('');
      setExpression('');
      setIsResult(true);
      toast({ variant: 'destructive', title: 'Error', description: e.message });
    }
  };

  const handleClearEntry = () => {
    setCurrentNumber('0');
    setIsResult(false);
  };
  
  const handleAllClear = () => {
    setDisplay('0');
    setExpression('');
    setCurrentNumber('0');
    setMemory(0);
    setIsResult(false);
  };

  const handleBackspace = () => {
    if (isResult) {
      handleAllClear();
      return;
    }
    if (currentNumber.length > 1) {
      setCurrentNumber(prev => prev.slice(0, -1));
    } else if (currentNumber !== '0') {
      setCurrentNumber('0');
    } else if (expression.length > 0) {
      setExpression(prev => prev.trim().slice(0, -1).trim() + ' ');
    }
  };

  const handleToggleSign = () => {
    if (currentNumber !== '0') {
      setCurrentNumber(prev => (prev.startsWith('-') ? prev.substring(1) : '-' + prev));
    }
  };
  
  const handleMemory = (type: 'M+' | 'M-' | 'MR' | 'MC') => {
    const value = parseFloat(currentNumber);
    if (isNaN(value) && type !== 'MC' && type !== 'MR') return;
    
    let newMemory = memory;
    switch (type) {
      case 'M+': newMemory += value; break;
      case 'M-': newMemory -= value; break;
      case 'MR':
        setCurrentNumber(String(memory));
        setIsResult(false);
        return;
      case 'MC': newMemory = 0; break;
    }
    setMemory(newMemory);
    toast({ title: 'Memory Updated', description: `Memory is now ${newMemory}`});
  };

  const handleFunction = (fn: (x: number) => number, funcName: string) => {
    try {
      let value = parseFloat(currentNumber);
      if (isNaN(value)) throw new Error("No number to apply function to.");
      
      // Handle trig functions with angle mode
      if (['sin', 'cos', 'tan'].includes(funcName) && angleMode === 'DEG') {
        value = value * (Math.PI / 180);
      }

      let result = fn(value);
      
      if (['asin', 'acos', 'atan'].includes(funcName) && angleMode === 'DEG') {
        result = result * (180 / Math.PI);
      }

      if (isNaN(result) || !isFinite(result)) throw new Error(`Result of ${funcName} is invalid.`);

      setCurrentNumber(String(result));
      setIsResult(true);
    } catch (e: any) {
      toast({ variant: 'destructive', title: 'Function Error', description: e.message });
      setDisplay('Error');
      setIsResult(true);
    }
  };

  const handleConstant = (constant: 'π' | 'e' | 'φ') => {
    const values = {
      'π': Math.PI,
      'e': Math.E,
      'φ': (1 + Math.sqrt(5)) / 2,
    };
    setCurrentNumber(String(values[constant]));
    setIsResult(false);
  };
  // #endregion

  // #region Button Layout
  const buttonLayout = [
    { label: '2nd', onClick: () => setShow2nd(!show2nd), className: cn('bg-gray-600 hover:bg-gray-700', show2nd && 'bg-blue-600 hover:bg-blue-700 text-white')},
    { label: 'π', onClick: () => handleConstant('π'), className: 'bg-gray-600 hover:bg-gray-700' },
    { label: 'e', onClick: () => handleConstant('e'), className: 'bg-gray-600 hover:bg-gray-700' },
    { label: 'C', onClick: handleClearEntry, className: 'bg-red-600 hover:bg-red-700 text-white' },
    { label: '⌫', onClick: handleBackspace, className: 'bg-red-600 hover:bg-red-700 text-white' },

    show2nd ? { label: 'x³', onClick: () => handleFunction((x) => x ** 3, 'x³'), className: 'bg-gray-600 hover:bg-gray-700' } : { label: 'x²', onClick: () => handleFunction((x) => x ** 2, 'x²'), className: 'bg-gray-600 hover:bg-gray-700' },
    { label: '1/x', onClick: () => handleFunction((x) => 1 / x, '1/x'), className: 'bg-gray-600 hover:bg-gray-700' },
    { label: '(', onClick: () => { setExpression(e => e + '('); setCurrentNumber(''); }, className: 'bg-gray-600 hover:bg-gray-700' },
    { label: ')', onClick: () => { setExpression(e => e + currentNumber + ')'); setCurrentNumber(''); }, className: 'bg-gray-600 hover:bg-gray-700' },
    { label: 'n!', onClick: () => handleFunction(factorial, 'n!'), className: 'bg-gray-600 hover:bg-gray-700' },

    show2nd ? { label: '∛x', onClick: () => handleFunction(Math.cbrt, '∛x'), className: 'bg-gray-600 hover:bg-gray-700' } : { label: '√x', onClick: () => handleFunction(Math.sqrt, '√x'), className: 'bg-gray-600 hover:bg-gray-700' },
    { label: 'xʸ', onClick: () => handleOperator('^'), className: 'bg-gray-600 hover:bg-gray-700' },
    { label: '7', onClick: () => handleDigit('7'), className: 'bg-gray-700 hover:bg-gray-600' },
    { label: '8', onClick: () => handleDigit('8'), className: 'bg-gray-700 hover:bg-gray-600' },
    { label: '9', onClick: () => handleDigit('9'), className: 'bg-gray-700 hover:bg-gray-600' },

    { label: '10ˣ', onClick: () => handleFunction((x) => 10 ** x, '10ˣ'), className: 'bg-gray-600 hover:bg-gray-700' },
    { label: 'log', onClick: () => handleFunction(Math.log10, 'log'), className: 'bg-gray-600 hover:bg-gray-700' },
    { label: '4', onClick: () => handleDigit('4'), className: 'bg-gray-700 hover:bg-gray-600' },
    { label: '5', onClick: () => handleDigit('5'), className: 'bg-gray-700 hover:bg-gray-600' },
    { label: '6', onClick: () => handleDigit('6'), className: 'bg-gray-700 hover:bg-gray-600' },

    { label: 'eˣ', onClick: () => handleFunction(Math.exp, 'eˣ'), className: 'bg-gray-600 hover:bg-gray-700' },
    { label: 'ln', onClick: () => handleFunction(Math.log, 'ln'), className: 'bg-gray-600 hover:bg-gray-700' },
    { label: '1', onClick: () => handleDigit('1'), className: 'bg-gray-700 hover:bg-gray-600' },
    { label: '2', onClick: () => handleDigit('2'), className: 'bg-gray-700 hover:bg-gray-600' },
    { label: '3', onClick: () => handleDigit('3'), className: 'bg-gray-700 hover:bg-gray-600' },

    { label: angleMode, onClick: () => setAngleMode(m => m === 'RAD' ? 'DEG' : 'RAD'), className: 'bg-gray-600 hover:bg-gray-700' },
    { label: '±', onClick: handleToggleSign, className: 'bg-gray-600 hover:bg-gray-700' },
    { label: '0', onClick: () => handleDigit('0'), className: 'bg-gray-700 hover:bg-gray-600' },
    { label: '.', onClick: handleDecimal, className: 'bg-gray-700 hover:bg-gray-600' },
    { label: '=', onClick: handleEquals, className: 'bg-blue-600 hover:bg-blue-700 text-white' },
  ];
  // #endregion

  return (
    <Card id="scientific-calculator" className="shadow-lg max-w-sm mx-auto bg-gray-800 text-white p-2 border-4 border-gray-700 rounded-2xl">
      <CardContent className="flex flex-col items-center gap-2 p-0">
        <div className="relative w-full mb-2 rounded-lg border-2 border-gray-900 bg-gray-900/80 p-2 text-right text-4xl font-mono text-green-300 break-all h-20 flex items-end justify-end shadow-inner">
          <div className="absolute top-1 left-2 text-xs text-green-500/70 flex gap-2">
            <span>{angleMode}</span>
            {memory !== 0 && <span>M</span>}
          </div>
          <span>{display}</span>
        </div>
        
        <div className="w-full grid grid-cols-5 gap-1">
          {buttonLayout.map((btn, i) => (
            <Button key={i} size="sm" className={cn('h-10 text-base', btn.className)} onClick={btn.onClick}>{btn.label}</Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
