
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

// #region Helper Functions & Types
type AngleMode = 'RAD' | 'DEG';
type Operator = '+' | '-' | '×' | '÷' | '^';
type Token = string | number;

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

const precedence: { [key: string]: number } = {
  '+': 1,
  '-': 1,
  '×': 2,
  '÷': 2,
  '^': 3,
};

const associativity: { [key: string]: 'left' | 'right' } = {
    '^': 'right',
    '+': 'left',
    '-': 'left',
    '×': 'left',
    '÷': 'left',
};

const functions: { [key: string]: (a: number) => number } = {
    'sin': Math.sin, 'cos': Math.cos, 'tan': Math.tan,
    'asin': Math.asin, 'acos': Math.acos, 'atan': Math.atan,
    'sinh': Math.sinh, 'cosh': Math.cosh, 'tanh': Math.tanh,
    'log': Math.log10, 'ln': Math.log,
};

const isOperator = (token: Token): token is Operator => typeof token === 'string' && ['+', '-', '×', '÷', '^'].includes(token);
const isFunction = (token: Token): boolean => typeof token === 'string' && !!functions[token];
const isNumber = (token: Token): token is number => typeof token === 'number';
const isLeftParen = (token: Token): boolean => token === '(';
const isRightParen = (token: Token): boolean => token === ')';

// Shunting-yard algorithm
const shuntingYard = (tokens: Token[]): Token[] => {
    const outputQueue: Token[] = [];
    const operatorStack: string[] = [];

    tokens.forEach(token => {
        if (isNumber(token)) {
            outputQueue.push(token);
        } else if (isFunction(token)) {
            operatorStack.push(token);
        } else if (isOperator(token)) {
            while (
                operatorStack.length > 0 &&
                isOperator(operatorStack[operatorStack.length - 1]) &&
                ((associativity[token] === 'left' && precedence[token] <= precedence[operatorStack[operatorStack.length - 1]]) ||
                 (associativity[token] === 'right' && precedence[token] < precedence[operatorStack[operatorStack.length - 1]]))
            ) {
                outputQueue.push(operatorStack.pop()!);
            }
            operatorStack.push(token);
        } else if (isLeftParen(token)) {
            operatorStack.push(token);
        } else if (isRightParen(token)) {
            while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(') {
                outputQueue.push(operatorStack.pop()!);
            }
            if (operatorStack.length === 0) throw new Error("Mismatched parentheses");
            operatorStack.pop(); // Pop '('
            if (operatorStack.length > 0 && isFunction(operatorStack[operatorStack.length - 1])) {
                outputQueue.push(operatorStack.pop()!);
            }
        }
    });

    while (operatorStack.length > 0) {
        const op = operatorStack.pop()!;
        if (op === '(') throw new Error("Mismatched parentheses");
        outputQueue.push(op);
    }
    return outputQueue;
};

// RPN evaluator
const evaluateRPN = (rpnQueue: Token[]): number => {
    const stack: number[] = [];
    rpnQueue.forEach(token => {
        if (isNumber(token)) {
            stack.push(token);
        } else if (isOperator(token)) {
            if (stack.length < 2) throw new Error("Invalid expression");
            const b = stack.pop()!;
            const a = stack.pop()!;
            switch (token) {
                case '+': stack.push(a + b); break;
                case '-': stack.push(a - b); break;
                case '×': stack.push(a * b); break;
                case '÷':
                    if (b === 0) throw new Error("Division by zero");
                    stack.push(a / b);
                    break;
                case '^': stack.push(Math.pow(a, b)); break;
            }
        } else if (isFunction(token)) {
            if (stack.length < 1) throw new Error("Invalid function call");
            const a = stack.pop()!;
            const result = functions[token](a);
            if (isNaN(result)) throw new Error("Domain error");
            stack.push(result);
        }
    });
    if (stack.length !== 1) throw new Error("Invalid expression format");
    return stack[0];
};
// #endregion

export default function ScientificCalculator() {
  // State Management
  const [displayValue, setDisplayValue] = useState('0');
  const [expressionTokens, setExpressionTokens] = useState<Token[]>([]);
  const [currentNumber, setCurrentNumber] = useState('');
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
    setDisplayValue(`${exprString} ${currentNumber}`.trim() || '0');
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
    setCurrentNumber(prev => (prev === '0' && digit !== '.' ? digit : prev + prev));
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
    
    let newTokens = [...expressionTokens];
    if (currentNumber !== '') {
      newTokens.push(parseFloat(currentNumber));
      setCurrentNumber('');
    }

    const lastToken = newTokens[newTokens.length - 1];
    if (isOperator(lastToken)) {
        // Replace last operator
        newTokens[newTokens.length - 1] = op;
    } else {
        newTokens.push(op);
    }
    setExpressionTokens(newTokens);
  };
  
  const handleEquals = () => {
    if (errorState) {
        handleAllClear();
        return;
    }
    if (expressionTokens.length === 0 && currentNumber === '') return;

    let finalTokens = [...expressionTokens];
    if (currentNumber !== '') {
      finalTokens.push(parseFloat(currentNumber));
    }
    
    try {
      const rpn = shuntingYard(finalTokens);
      const result = evaluateRPN(rpn);
      
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
    setCurrentNumber('');
    setIsResult(false);
    setDisplayValue(expressionTokens.join(' ') || '0');
  };
  
  const handleAllClear = () => {
    setErrorState(null);
    setDisplayValue('0');
    setExpressionTokens([]);
    setCurrentNumber('');
    setMemory(0);
    setIsResult(false);
  };

  const handleBackspace = () => {
    resetError();
    if (isResult) {
      handleAllClear();
      return;
    }
    if (currentNumber.length > 0) {
      setCurrentNumber(prev => prev.slice(0, -1));
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
    if (currentNumber !== '') {
        setCurrentNumber(prev => (prev.startsWith('-') ? prev.substring(1) : '-' + prev));
    } else if (isResult) {
        const currentVal = parseFloat(displayValue);
        if (!isNaN(currentVal)) {
            const newVal = String(-currentVal);
            setDisplayValue(newVal);
            setCurrentNumber(newVal);
        }
    }
  };
  
  const handleMemory = (type: 'M+' | 'M-' | 'MR' | 'MC') => {
    resetError();
    const value = parseFloat(currentNumber || displayValue);
    
    let newMemory = memory;
    switch (type) {
      case 'M+': 
        if (isNaN(value)) return;
        newMemory += value; 
        break;
      case 'M-': 
        if (isNaN(value)) return;
        newMemory -= value; 
        break;
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
      if (isNaN(value)) {
        if (isResult) {
            value = parseFloat(displayValue);
        } else {
            throw new Error("No number to apply function to.");
        }
      }
      
      // Handle trig functions with angle mode
      if (['sin', 'cos', 'tan'].includes(funcName) && angleMode === 'DEG') {
        value = value * (Math.PI / 180);
      }

      let result = fn(value);
      
      if (['asin', 'acos', 'atan'].includes(funcName) && angleMode === 'DEG') {
        result = result * (180 / Math.PI);
      }

      if (isNaN(result)) {
        if (funcName === 'n!') throw new Error("Error: Invalid input");
        throw new Error("Error: Domain");
      }
      if (!isFinite(result)) {
          throw new Error("Error: Overflow");
      }

      const resultStr = String(result);
      setCurrentNumber(resultStr);
      setDisplayValue(resultStr);
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
    let newTokens = [...expressionTokens];

    if(p === '(') {
      if(currentNumber !== '') {
          newTokens.push(parseFloat(currentNumber));
          newTokens.push('×');
          setCurrentNumber('');
      } else if (isRightParen(newTokens[newTokens.length - 1])) {
          newTokens.push('×');
      }
      newTokens.push('(');
    } else { // ')'
       if(currentNumber !== '') {
           newTokens.push(parseFloat(currentNumber));
           setCurrentNumber('');
       }
       newTokens.push(')');
    }
    setExpressionTokens(newTokens);
  };
  
  const handleConstant = (constant: 'π' | 'e' | 'φ') => {
    resetError();
    const values = {
      'π': Math.PI,
      'e': Math.E,
      'φ': (1 + Math.sqrt(5)) / 2,
    };
    if (currentNumber !== '' && currentNumber !== '0' && currentNumber !== '-') {
        handleOperator('×');
    }
    setCurrentNumber(String(values[constant]));
    setIsResult(false);
  };

  const handlePercent = () => {
    resetError();
    const numCurrent = parseFloat(currentNumber);
    if (isNaN(numCurrent)) return;
    
    const lastOpIndex = expressionTokens.map(t => isOperator(t)).lastIndexOf(true);
    const lastOperator = lastOpIndex > -1 ? expressionTokens[lastOpIndex] : null;
    
    if (lastOperator === '+' || lastOperator === '-') {
        const leftOperandToken = expressionTokens[lastOpIndex - 1];
        if (typeof leftOperandToken === 'number') {
            setCurrentNumber(String(leftOperandToken * (numCurrent / 100)));
        } else {
            setCurrentNumber(String(numCurrent / 100));
        }
    } else {
        setCurrentNumber(String(numCurrent / 100));
    }
  }
  // #endregion

  // #region Button Layout
  const buttonLayout = [
    { label: '2nd', onClick: () => setShow2nd(!show2nd), className: cn('bg-gray-600 hover:bg-gray-700', show2nd && 'bg-blue-600 hover:bg-blue-700 text-white')},
    { label: 'π', onClick: () => handleConstant('π'), className: 'bg-gray-600 hover:bg-gray-700' },
    { label: 'e', onClick: () => handleConstant('e'), className: 'bg-gray-600 hover:bg-gray-700' },
    { label: 'C', onClick: handleClearEntry, className: 'bg-red-600 hover:bg-red-700' },
    { label: '⌫', onClick: handleBackspace, className: 'bg-red-600 hover:bg-red-700' },
    
    show2nd ? { label: 'x³', onClick: () => handleUnaryFunction((x) => x ** 3, 'x³'), className: 'bg-gray-600 hover:bg-gray-700' } : { label: 'x²', onClick: () => handleUnaryFunction((x) => x ** 2, 'x²'), className: 'bg-gray-600 hover:bg-gray-700' },
    { label: '1/x', onClick: () => handleUnaryFunction((x) => 1 / x, '1/x'), className: 'bg-gray-600 hover:bg-gray-700' },
    { label: '(', onClick: () => handleParenthesis('('), className: 'bg-gray-600 hover:bg-gray-700' },
    { label: ')', onClick: () => handleParenthesis(')'), className: 'bg-gray-600 hover:bg-gray-700' },
    { label: 'n!', onClick: () => handleUnaryFunction(factorial, 'n!'), className: 'bg-gray-600 hover:bg-gray-700' },
    
    show2nd ? { label: '∛x', onClick: () => handleUnaryFunction(Math.cbrt, '∛x'), className: 'bg-gray-600 hover:bg-gray-700' } : { label: '√x', onClick: () => handleUnaryFunction(Math.sqrt, '√x'), className: 'bg-gray-600 hover:bg-gray-700' },
    { label: '7', onClick: () => handleDigit('7'), className: 'bg-gray-700 hover:bg-gray-800' },
    { label: '8', onClick: () => handleDigit('8'), className: 'bg-gray-700 hover:bg-gray-800' },
    { label: '9', onClick: () => handleDigit('9'), className: 'bg-gray-700 hover:bg-gray-800' },
    { label: '÷', onClick: () => handleOperator('÷'), className: 'bg-orange-500 hover:bg-orange-600' },

    { label: 'xʸ', onClick: () => handleOperator('^'), className: 'bg-gray-600 hover:bg-gray-700' },
    { label: '4', onClick: () => handleDigit('4'), className: 'bg-gray-700 hover:bg-gray-800' },
    { label: '5', onClick: () => handleDigit('5'), className: 'bg-gray-700 hover:bg-gray-800' },
    { label: '6', onClick: () => handleDigit('6'), className: 'bg-gray-700 hover:bg-gray-800' },
    { label: '×', onClick: () => handleOperator('×'), className: 'bg-orange-500 hover:bg-orange-600' },

    { label: '10ˣ', onClick: () => handleUnaryFunction((x) => 10 ** x, '10ˣ'), className: 'bg-gray-600 hover:bg-gray-700' },
    { label: '1', onClick: () => handleDigit('1'), className: 'bg-gray-700 hover:bg-gray-800' },
    { label: '2', onClick: () => handleDigit('2'), className: 'bg-gray-700 hover:bg-gray-800' },
    { label: '3', onClick: () => handleDigit('3'), className: 'bg-gray-700 hover:bg-gray-800' },
    { label: '-', onClick: () => handleOperator('-'), className: 'bg-orange-500 hover:bg-orange-600' },

    { label: 'log', onClick: () => handleUnaryFunction(Math.log10, 'log'), className: 'bg-gray-600 hover:bg-gray-700' },
    { label: '0', onClick: () => handleDigit('0'), className: 'bg-gray-700 hover:bg-gray-800' },
    { label: '.', onClick: handleDecimal, className: 'bg-gray-700 hover:bg-gray-800' },
    { label: '=', onClick: handleEquals, className: 'bg-blue-600 hover:bg-blue-700' },
    { label: '+', onClick: () => handleOperator('+'), className: 'bg-orange-500 hover:bg-orange-600' },
    
    // Bottom row for second functions
    { label: 'ln', onClick: () => handleUnaryFunction(Math.log, 'ln'), className: 'bg-gray-600 hover:bg-gray-700' },
    show2nd ? { label: 'sin⁻¹', onClick: () => handleUnaryFunction(Math.asin, 'asin'), className: 'bg-gray-600 hover:bg-gray-700' } : { label: 'sin', onClick: () => handleUnaryFunction(Math.sin, 'sin'), className: 'bg-gray-600 hover:bg-gray-700' },
    show2nd ? { label: 'cos⁻¹', onClick: () => handleUnaryFunction(Math.acos, 'acos'), className: 'bg-gray-600 hover:bg-gray-700' } : { label: 'cos', onClick: () => handleUnaryFunction(Math.cos, 'cos'), className: 'bg-gray-600 hover:bg-gray-700' },
    show2nd ? { label: 'tan⁻¹', onClick: () => handleUnaryFunction(Math.atan, 'atan'), className: 'bg-gray-600 hover:bg-gray-700' } : { label: 'tan', onClick: () => handleUnaryFunction(Math.tan, 'tan'), className: 'bg-gray-600 hover:bg-gray-700' },
    { label: angleMode, onClick: () => setAngleMode(m => m === 'RAD' ? 'DEG' : 'RAD'), className: 'bg-gray-600 hover:bg-gray-700' },
    
    // Memory and other functions
    { label: 'AC', onClick: handleAllClear, className: 'bg-red-600 hover:bg-red-700' },
    { label: '±', onClick: handleToggleSign, className: 'bg-gray-600 hover:bg-gray-700'},
    { label: '%', onClick: handlePercent, className: 'bg-gray-600 hover:bg-gray-700' },
    { label: 'φ', onClick: () => handleConstant('φ'), className: 'bg-gray-600 hover:bg-gray-700' },
    { label: 'MR', onClick: () => handleMemory('MR'), className: 'bg-purple-600 hover:bg-purple-700' },
    { label: 'MC', onClick: () => handleMemory('MC'), className: 'bg-purple-600 hover:bg-purple-700' },
    { label: 'M+', onClick: () => handleMemory('M+'), className: 'bg-purple-600 hover:bg-purple-700' },
    { label: 'M-', onClick: () => handleMemory('M-'), className: 'bg-purple-600 hover:bg-purple-700' },
    show2nd ? { label: 'sinh', onClick: () => handleUnaryFunction(Math.sinh, 'sinh'), className: 'bg-gray-600 hover:bg-gray-700' } : { label: 'sinh⁻¹', onClick: () => handleUnaryFunction(Math.asinh, 'asinh'), className: 'bg-gray-600 hover:bg-gray-700' },
    show2nd ? { label: 'cosh', onClick: () => handleUnaryFunction(Math.cosh, 'cosh'), className: 'bg-gray-600 hover:bg-gray-700' } : { label: 'cosh⁻¹', onClick: () => handleUnaryFunction(Math.acosh, 'acosh'), className: 'bg-gray-600 hover:bg-gray-700' },
    show2nd ? { label: 'tanh', onClick: () => handleUnaryFunction(Math.tanh, 'tanh'), className: 'bg-gray-600 hover:bg-gray-700' } : { label: 'tanh⁻¹', onClick: () => handleUnaryFunction(Math.atanh, 'atanh'), className: 'bg-gray-600 hover:bg-gray-700' },
  ].filter(Boolean);

const mainPadLayout = [
    '2nd', 'π', 'e', 'C', '⌫',
    show2nd ? 'x³' : 'x²', '1/x', '(', ')', 'n!',
    show2nd ? '∛x' : '√x', '7', '8', '9', '÷',
    'xʸ', '4', '5', '6', '×',
    '10ˣ', '1', '2', '3', '-',
    'log', '0', '.', '=', '+'
];

const sidePadLayout = [
    'AC', '%', '±',
    'sin', 'cos', 'tan',
    'ln', 'log', angleMode,
    'M+', 'M-', 'MR', 'MC'
];
  // #endregion

  return (
    <Card id="scientific-calculator" className="shadow-lg max-w-md mx-auto bg-gray-900 text-white p-2 border-4 border-gray-700 rounded-2xl">
      <CardContent className="flex flex-col items-center gap-1 p-0">
        <div className="relative w-full mb-1 rounded-lg border-2 border-gray-950 bg-gray-950/80 p-2 text-right text-3xl font-mono text-green-300 break-words h-20 flex items-end justify-end shadow-inner">
          <div className="absolute top-1 left-2 text-xs text-green-500/70 flex gap-2">
            {angleMode === 'DEG' && <span className="font-bold">DEG</span>}
            {memory !== 0 && <span className="font-bold">M</span>}
          </div>
          <span>{displayValue}</span>
        </div>
        
        <div className="w-full grid grid-cols-5 gap-1">
          {buttonLayout.slice(0, 30).map((btn, i) => (
            <Button 
                key={`${btn.label}-${i}`} 
                size="sm" 
                className={cn('h-12 text-base rounded-md', btn.className)} 
                onClick={btn.onClick}
            >
              {btn.label}
            </Button>
          ))}
        </div>
         <div className="w-full grid grid-cols-5 gap-1 mt-1">
           {buttonLayout.slice(30).map((btn, i) => (
            <Button 
                key={`${btn.label}-${i}`} 
                size="sm" 
                className={cn('h-10 text-xs rounded-md', btn.className)} 
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
