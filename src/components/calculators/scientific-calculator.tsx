
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

// #region Helper Functions & Types
type AngleMode = 'RAD' | 'DEG';
type Operator = '+' | '-' | '×' | '÷' | '^';

const factorial = (n: number): number => {
  if (n < 0 || n % 1 !== 0) return NaN;
  if (n > 170) return Infinity; // Standard limit for IEEE 754 double precision
  if (n === 0) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
};

const precedence: { [key in Operator]: number } = {
  '+': 1,
  '-': 1,
  '×': 2,
  '÷': 2,
  '^': 3,
};

const applyOp = (op: Operator, b: number, a: number): number => {
    switch (op) {
        case '+': return a + b;
        case '-': return a - b;
        case '×': return a * b;
        case '÷': 
            if (b === 0) throw new Error("Division by zero");
            return a / b;
        case '^': return Math.pow(a, b);
    }
};

const evaluate = (tokens: (string | number)[]): number => {
  const values: number[] = [];
  const ops: Operator[] = [];

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (typeof token === 'number') {
      values.push(token);
    } else if (token === '(') {
      ops.push(token as any);
    } else if (token === ')') {
      while (ops[ops.length - 1] !== '(') {
        if(ops.length === 0) throw new Error("Mismatched parentheses");
        values.push(applyOp(ops.pop()!, values.pop()!, values.pop()!));
      }
      ops.pop(); // Pop the '('
    } else { // Operator
      while (
        ops.length > 0 &&
        precedence[ops[ops.length - 1] as Operator] >= precedence[token as Operator] &&
        token !== '^' // Handle right-associativity for power
      ) {
        values.push(applyOp(ops.pop()!, values.pop()!, values.pop()!));
      }
      ops.push(token as Operator);
    }
  }

  while (ops.length > 0) {
    const op = ops.pop()!;
     if (op === '(') throw new Error("Mismatched parentheses");
    values.push(applyOp(op, values.pop()!, values.pop()!));
  }

  if (values.length !== 1 || ops.length !== 0) {
      throw new Error("Invalid expression");
  }

  return values[0];
};

// #endregion

export default function ScientificCalculator() {
  // State Management
  const [displayValue, setDisplayValue] = useState('0');
  const [expressionTokens, setExpressionTokens] = useState<(string | number)[]>([]);
  const [currentNumber, setCurrentNumber] = useState('0');
  const [isResult, setIsResult] = useState(false);
  const [angleMode, setAngleMode] = useState<AngleMode>('RAD');
  const [memory, setMemory] = useState(0);
  const [show2nd, setShow2nd] = useState(false);
  const [errorState, setErrorState] = useState<string | null>(null);
  const { toast } = useToast();

  // Update display based on state
  useEffect(() => {
    if (errorState) {
      setDisplayValue(errorState);
      return;
    }
    const exprString = expressionTokens.join(' ');
    setDisplayValue(`${exprString} ${currentNumber === '0' && exprString ? '' : currentNumber}`);
  }, [expressionTokens, currentNumber, errorState]);
  
  const resetError = () => {
    if (errorState) {
        setErrorState(null);
        handleAllClear();
    }
  }

  // #region Key Handlers
  const handleDigit = (digit: string) => {
    resetError();
    if (isResult) {
      setExpressionTokens([]);
      setCurrentNumber(digit);
      setIsResult(false);
      return;
    }
    setCurrentNumber(prev => (prev === '0' ? digit : prev + digit));
  };
  
  const handleDecimal = () => {
    resetError();
    if (isResult) {
      setExpressionTokens([]);
      setCurrentNumber('0.');
      setIsResult(false);
      return;
    }
    if (!currentNumber.includes('.')) {
      setCurrentNumber(prev => (prev === '' ? '0.' : prev + '.'));
    }
  };

  const handleOperator = (op: Operator) => {
    resetError();
    setIsResult(false);
    if (currentNumber !== '' && currentNumber !== '0') {
      setExpressionTokens(prev => [...prev, parseFloat(currentNumber), op]);
      setCurrentNumber('0');
    } else if (expressionTokens.length > 0) {
      const lastToken = expressionTokens[expressionTokens.length - 1];
      if (typeof lastToken === 'string' && ['+', '-', '×', '÷', '^'].includes(lastToken)) {
        // Replace last operator
        setExpressionTokens(prev => [...prev.slice(0, -1), op]);
      } else {
        setExpressionTokens(prev => [...prev, op]);
      }
    }
  };
  
  const handleEquals = () => {
    resetError();
    if (expressionTokens.length === 0 && currentNumber === '0') return;

    let finalTokens = [...expressionTokens];
    if (currentNumber !== '' && currentNumber !== '0') {
      finalTokens.push(parseFloat(currentNumber));
    }
    
    // Auto-close open parentheses
    const openParen = finalTokens.filter(t => t === '(').length;
    const closeParen = finalTokens.filter(t => t === ')').length;
    for(let i=0; i< openParen - closeParen; i++) {
        finalTokens.push(')');
    }

    try {
      const result = evaluate(finalTokens);
      if (isNaN(result) || !isFinite(result)) throw new Error("Invalid result");
      
      const resultString = String(result);
      setDisplayValue(resultString);
      setCurrentNumber(resultString);
      setExpressionTokens([]);
      setIsResult(true);

    } catch (e: any) {
      setErrorState(e.message || "Error");
      setExpressionTokens([]);
      setCurrentNumber('');
      setIsResult(true);
    }
  };

  const handleClearEntry = () => {
    resetError();
    setCurrentNumber('0');
    setIsResult(false);
  };
  
  const handleAllClear = () => {
    resetError();
    setDisplayValue('0');
    setExpressionTokens([]);
    setCurrentNumber('0');
    setMemory(0);
    setIsResult(false);
  };

  const handleBackspace = () => {
    resetError();
    if (isResult) {
      handleAllClear();
      return;
    }
    if (currentNumber.length > 1) {
      setCurrentNumber(prev => prev.slice(0, -1));
    } else if (currentNumber !== '0') {
      setCurrentNumber('0');
    } else if (expressionTokens.length > 0) {
      const newTokens = [...expressionTokens];
      const lastToken = newTokens.pop();
      setExpressionTokens(newTokens);
      if (typeof lastToken === 'number') {
        setCurrentNumber(String(lastToken));
      }
    }
  };

  const handleToggleSign = () => {
    resetError();
    setCurrentNumber(prev => (prev.startsWith('-') ? prev.substring(1) : '-' + prev));
  };
  
  const handleMemory = (type: 'M+' | 'M-' | 'MR' | 'MC') => {
    resetError();
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

  const handleUnaryFunction = (fn: (x: number) => number, funcName: string) => {
    resetError();
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

      if (isNaN(result) || !isFinite(result)) {
        if(funcName === 'n!') throw new Error("Input must be a non-negative integer for factorial.");
        throw new Error(`Domain error for ${funcName}`);
      }

      setCurrentNumber(String(result));
      setIsResult(true);
      setExpressionTokens([]);
    } catch (e: any) {
      setErrorState(e.message || "Error");
      setIsResult(true);
    }
  };
  
  const handleParenthesis = (p: '(' | ')') => {
    resetError();
    setIsResult(false);
    if(p === '(') {
      if(currentNumber !== '' && currentNumber !== '0') {
          setExpressionTokens(prev => [...prev, parseFloat(currentNumber), '×', '(']);
          setCurrentNumber('0');
      } else {
          setExpressionTokens(prev => [...prev, '(']);
      }
    } else { // ')'
       if(currentNumber !== '' && currentNumber !== '0') {
           setExpressionTokens(prev => [...prev, parseFloat(currentNumber), ')']);
           setCurrentNumber('0');
       } else {
           setExpressionTokens(prev => [...prev, ')']);
       }
    }
  };
  
  const handleConstant = (constant: 'π' | 'e' | 'φ') => {
    resetError();
    const values = {
      'π': Math.PI,
      'e': Math.E,
      'φ': (1 + Math.sqrt(5)) / 2,
    };
    setCurrentNumber(String(values[constant]));
    setIsResult(false);
  };

  const handlePercent = () => {
    resetError();
    const numCurrent = parseFloat(currentNumber);
    if (isNaN(numCurrent)) return;
    
    if (expressionTokens.length > 1) {
        const lastOp = expressionTokens[expressionTokens.length - 1];
        const lastNum = expressionTokens[expressionTokens.length - 2];
        if (typeof lastNum === 'number' && (lastOp === '+' || lastOp === '-')) {
            setCurrentNumber(String(lastNum * (numCurrent / 100)));
            return;
        }
    }
    // Default to divide by 100
    setCurrentNumber(String(numCurrent / 100));
  }
  // #endregion

  // #region Button Layout
  const buttonLayout = [
    { label: '2nd', onClick: () => setShow2nd(!show2nd), className: cn('bg-gray-600 hover:bg-gray-700', show2nd && 'bg-blue-600 hover:bg-blue-700 text-white')},
    { label: 'π', onClick: () => handleConstant('π'), className: 'bg-gray-600 hover:bg-gray-700' },
    { label: 'e', onClick: () => handleConstant('e'), className: 'bg-gray-600 hover:bg-gray-700' },
    { label: 'φ', onClick: () => handleConstant('φ'), className: 'bg-gray-600 hover:bg-gray-700' },
    { label: 'C', onClick: handleClearEntry, className: 'bg-red-600 hover:bg-red-700' },
    { label: 'AC', onClick: handleAllClear, className: 'bg-red-600 hover:bg-red-700' },
    { label: '⌫', onClick: handleBackspace, className: 'bg-red-600 hover:bg-red-700' },
    
    show2nd ? { label: 'x³', onClick: () => handleUnaryFunction((x) => x ** 3, 'x³'), className: 'bg-gray-600 hover:bg-gray-700' } : { label: 'x²', onClick: () => handleUnaryFunction((x) => x ** 2, 'x²'), className: 'bg-gray-600 hover:bg-gray-700' },
    show2nd ? { label: '∛x', onClick: () => handleUnaryFunction(Math.cbrt, '∛x'), className: 'bg-gray-600 hover:bg-gray-700' } : { label: '√x', onClick: () => handleUnaryFunction(Math.sqrt, '√x'), className: 'bg-gray-600 hover:bg-gray-700' },
    { label: 'xʸ', onClick: () => handleOperator('^'), className: 'bg-gray-600 hover:bg-gray-700' },
    { label: '10ˣ', onClick: () => handleUnaryFunction((x) => 10 ** x, '10ˣ'), className: 'bg-gray-600 hover:bg-gray-700' },
    { label: 'log', onClick: () => handleUnaryFunction(Math.log10, 'log'), className: 'bg-gray-600 hover:bg-gray-700' },
    { label: 'ln', onClick: () => handleUnaryFunction(Math.log, 'ln'), className: 'bg-gray-600 hover:bg-gray-700' },
    { label: '1/x', onClick: () => handleUnaryFunction((x) => 1 / x, '1/x'), className: 'bg-gray-600 hover:bg-gray-700' },
    
    show2nd ? { label: 'sin⁻¹', onClick: () => handleUnaryFunction(Math.asin, 'asin'), className: 'bg-gray-600 hover:bg-gray-700' } : { label: 'sin', onClick: () => handleUnaryFunction(Math.sin, 'sin'), className: 'bg-gray-600 hover:bg-gray-700' },
    show2nd ? { label: 'cos⁻¹', onClick: () => handleUnaryFunction(Math.acos, 'acos'), className: 'bg-gray-600 hover:bg-gray-700' } : { label: 'cos', onClick: () => handleUnaryFunction(Math.cos, 'cos'), className: 'bg-gray-600 hover:bg-gray-700' },
    show2nd ? { label: 'tan⁻¹', onClick: () => handleUnaryFunction(Math.atan, 'atan'), className: 'bg-gray-600 hover:bg-gray-700' } : { label: 'tan', onClick: () => handleUnaryFunction(Math.tan, 'tan'), className: 'bg-gray-600 hover:bg-gray-700' },
    { label: 'eˣ', onClick: () => handleUnaryFunction(Math.exp, 'eˣ'), className: 'bg-gray-600 hover:bg-gray-700' },
    { label: 'n!', onClick: () => handleUnaryFunction(factorial, 'n!'), className: 'bg-gray-600 hover:bg-gray-700' },
    { label: '%', onClick: handlePercent, className: 'bg-gray-600 hover:bg-gray-700' },
    { label: '÷', onClick: () => handleOperator('÷'), className: 'bg-orange-500 hover:bg-orange-600' },
    
    show2nd ? { label: 'sinh', onClick: () => handleUnaryFunction(Math.sinh, 'sinh'), className: 'bg-gray-600 hover:bg-gray-700' } : { label: 'MC', onClick: () => handleMemory('MC'), className: 'bg-gray-600 hover:bg-gray-700' },
    show2nd ? { label: 'cosh', onClick: () => handleUnaryFunction(Math.cosh, 'cosh'), className: 'bg-gray-600 hover:bg-gray-700' } : { label: 'MR', onClick: () => handleMemory('MR'), className: 'bg-gray-600 hover:bg-gray-700' },
    show2nd ? { label: 'tanh', onClick: () => handleUnaryFunction(Math.tanh, 'tanh'), className: 'bg-gray-600 hover:bg-gray-700' } : { label: 'M+', onClick: () => handleMemory('M+'), className: 'bg-gray-600 hover:bg-gray-700' },
    { label: '7', onClick: () => handleDigit('7'), className: 'bg-gray-700 hover:bg-gray-800' },
    { label: '8', onClick: () => handleDigit('8'), className: 'bg-gray-700 hover:bg-gray-800' },
    { label: '9', onClick: () => handleDigit('9'), className: 'bg-gray-700 hover:bg-gray-800' },
    { label: '×', onClick: () => handleOperator('×'), className: 'bg-orange-500 hover:bg-orange-600' },
    
    { label: '(', onClick: () => handleParenthesis('('), className: 'bg-gray-600 hover:bg-gray-700' },
    { label: ')', onClick: () => handleParenthesis(')'), className: 'bg-gray-600 hover:bg-gray-700' },
    { label: angleMode, onClick: () => setAngleMode(m => m === 'RAD' ? 'DEG' : 'RAD'), className: 'bg-gray-600 hover:bg-gray-700' },
    { label: '4', onClick: () => handleDigit('4'), className: 'bg-gray-700 hover:bg-gray-800' },
    { label: '5', onClick: () => handleDigit('5'), className: 'bg-gray-700 hover:bg-gray-800' },
    { label: '6', onClick: () => handleDigit('6'), className: 'bg-gray-700 hover:bg-gray-800' },
    { label: '-', onClick: () => handleOperator('-'), className: 'bg-orange-500 hover:bg-orange-600' },
    
    { label: '±', onClick: handleToggleSign, className: 'bg-gray-700 hover:bg-gray-800' },
    { label: '1', onClick: () => handleDigit('1'), className: 'bg-gray-700 hover:bg-gray-800' },
    { label: '2', onClick: () => handleDigit('2'), className: 'bg-gray-700 hover:bg-gray-800' },
    { label: '3', onClick: () => handleDigit('3'), className: 'bg-gray-700 hover:bg-gray-800' },
    { label: '+', onClick: () => handleOperator('+'), className: 'bg-orange-500 hover:bg-orange-600' },
    
    { label: '0', onClick: () => handleDigit('0'), className: 'col-span-2 bg-gray-700 hover:bg-gray-800' },
    { label: '.', onClick: handleDecimal, className: 'bg-gray-700 hover:bg-gray-800' },
    { label: '=', onClick: handleEquals, className: 'col-span-2 bg-blue-600 hover:bg-blue-700' },
  ];
  // #endregion

  return (
    <Card id="scientific-calculator" className="shadow-lg max-w-lg mx-auto bg-gray-900 text-white p-2 border-4 border-gray-700 rounded-2xl">
      <CardContent className="flex flex-col items-center gap-1 p-0">
        <div className="relative w-full mb-1 rounded-lg border-2 border-gray-950 bg-gray-950/80 p-2 text-right text-3xl font-mono text-green-300 break-all h-20 flex items-end justify-end shadow-inner">
          <div className="absolute top-1 left-2 text-xs text-green-500/70 flex gap-2">
            {angleMode === 'DEG' && <span>DEG</span>}
            {memory !== 0 && <span>M</span>}
          </div>
          <span>{displayValue}</span>
        </div>
        
        <div className="w-full grid grid-cols-7 gap-1">
          {buttonLayout.map((btn, i) => (
            <Button 
                key={`${btn.label}-${i}`} 
                size="sm" 
                className={cn('h-9 text-sm rounded-md', btn.className, btn.label === '0' && 'col-span-2', btn.label === '=' && 'col-span-2')} 
                onClick={btn.onClick}
            >
              {btn.label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
