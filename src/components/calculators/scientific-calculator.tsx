
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

// #region Helper Functions & Types
type AngleMode = 'RAD' | 'DEG';
type Token = string | number;

const factorial = (n: number): number => {
  if (n < 0 || n % 1 !== 0) throw new Error("Invalid input");
  if (n > 170) throw new Error("Overflow"); 
  if (n === 0) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
};

const precedence: { [key: string]: number } = {
  '+': 1, '-': 1, '×': 2, '÷': 2, '^': 3,
};

const associativity: { [key: string]: 'left' | 'right' } = {
    '^': 'right', '+': 'left', '-': 'left', '×': 'left', '÷': 'left',
};

const functions: { [key: string]: (a: number) => number } = {
    sin: Math.sin, cos: Math.cos, tan: Math.tan,
    asin: Math.asin, acos: Math.acos, atan: Math.atan,
    sinh: Math.sinh, cosh: Math.cosh, tanh: Math.tanh,
    asinh: Math.asinh, acosh: Math.acosh, atanh: Math.atanh,
    log: Math.log10, ln: Math.log,
    sqrt: Math.sqrt, cbrt: Math.cbrt,
};

const isOperator = (token: Token): token is string => typeof token === 'string' && ['+', '-', '×', '÷', '^'].includes(token);
const isFunction = (token: Token): boolean => typeof token === 'string' && !!functions[token];
const isNumber = (token: Token): token is number => typeof token === 'number';
const isLeftParen = (token: Token): boolean => token === '(';
const isRightParen = (token: Token): boolean => token === ')';

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

const evaluateRPN = (rpnQueue: Token[]): number => {
    const stack: number[] = [];
    rpnQueue.forEach(token => {
        if (isNumber(token)) {
            stack.push(token);
        } else if (isOperator(token)) {
            if (stack.length < 2) throw new Error("Syntax error");
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
            const result = functions[token as keyof typeof functions](a);
            if (isNaN(result)) throw new Error("Domain error");
            stack.push(result);
        }
    });
    if (stack.length !== 1) throw new Error("Syntax error");
    return stack[0];
};

const formatResult = (num: number): string => {
  if (Math.abs(num) > 1e12 || (Math.abs(num) < 1e-9 && num !== 0)) {
    return num.toExponential(9);
  }
  return num.toPrecision(15).replace(/\.?0+$/, '').replace(/(\.\d*?[1-9])0+$/, '$1');
};
// #endregion

export default function ScientificCalculator() {
  const [displayValue, setDisplayValue] = useState('0');
  const [expressionTokens, setExpressionTokens] = useState<Token[]>([]);
  const [currentNumber, setCurrentNumber] = useState('');
  const [isResult, setIsResult] = useState(false);
  const [angleMode, setAngleMode] = useState<AngleMode>('RAD');
  const [memory, setMemory] = useState(0);
  const [show2nd, setShow2nd] = useState(false);
  const [errorState, setErrorState] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (errorState) {
      setDisplayValue(errorState);
      return;
    }
    const exprString = expressionTokens.map(t => (typeof t === 'number') ? formatResult(t) : t).join(' ');
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
      handleAllClear();
      setCurrentNumber(digit === '0' ? '0' : digit);
      setIsResult(false);
      return;
    }
    if (currentNumber.length > 15) return;
    setCurrentNumber(prev => (prev === '0' && digit !== '.' ? digit : prev + digit));
  };
  
  const handleDecimal = () => {
    resetError();
    if (isResult) {
        handleAllClear();
        setCurrentNumber('0.');
        setIsResult(false);
        return;
    }
    if (!currentNumber.includes('.')) {
      setCurrentNumber(prev => (prev === '' ? '0.' : prev + '.'));
    }
  };

  const handleOperator = (op: string) => {
    resetError();
    setIsResult(false);
    
    let newTokens = [...expressionTokens];
    if (currentNumber !== '') {
      newTokens.push(parseFloat(currentNumber));
      setCurrentNumber('');
    }

    const lastToken = newTokens[newTokens.length - 1];
    if (isOperator(lastToken) && op !== '-' && !isLeftParen(newTokens[newTokens.length-2])) {
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
      
      const resultString = formatResult(result);
      setDisplayValue(resultString);
      setCurrentNumber(resultString);
      setExpressionTokens([]);
      setIsResult(true);

    } catch (e: any) {
      setErrorState(`Error: ${e.message}`);
      setExpressionTokens([]);
      setCurrentNumber('');
      setIsResult(true);
    }
  };

  const handleClearEntry = () => {
    if(errorState) {
        handleAllClear();
        return;
    }
    setCurrentNumber('');
    setIsResult(false);
    setDisplayValue(expressionTokens.join(' ') || '0');
  };
  
  const handleAllClear = () => {
    setErrorState(null);
    setDisplayValue('0');
    setExpressionTokens([]);
    setCurrentNumber('');
    // Not clearing memory on AC as per typical calculator behavior
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
      const lastToken = expressionTokens[expressionTokens.length - 1];
      if (typeof lastToken === 'string' && lastToken.length > 1) {
        // e.g. function name
        setExpressionTokens(prev => prev.slice(0, -1));
      } else {
        setExpressionTokens(prev => prev.slice(0, -1));
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
    const value = parseFloat(currentNumber || (isResult ? displayValue : '0'));
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
      let value: number;
      if (currentNumber !== '') {
        value = parseFloat(currentNumber);
      } else if (isResult) {
        value = parseFloat(displayValue);
      } else {
        throw new Error("No number to apply function to.");
      }

      if (['sin', 'cos', 'tan'].includes(funcName) && angleMode === 'DEG') {
        value = value * (Math.PI / 180);
      }

      let result = fn(value);
      
      if (['asin', 'acos', 'atan'].includes(funcName) && angleMode === 'DEG') {
        result = result * (180 / Math.PI);
      }

      if (isNaN(result)) throw new Error("Domain");
      if (!isFinite(result)) throw new Error("Overflow");

      setCurrentNumber(formatResult(result));
      setIsResult(true);
      setExpressionTokens([]);
    } catch (e: any) {
      setErrorState(`Error: ${e.message}`);
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
      } else if (isRightParen(newTokens[newTokens.length - 1]) || isNumber(newTokens[newTokens.length-1])) {
          newTokens.push('×');
      }
      newTokens.push('(');
    } else {
       if(currentNumber !== '') {
           newTokens.push(parseFloat(currentNumber));
           setCurrentNumber('');
       }
       if (newTokens.length > 0 && isLeftParen(newTokens[newTokens.length-1])) {
           // Handle empty parens `()`
           newTokens.push(0);
       }
       newTokens.push(')');
    }
    setExpressionTokens(newTokens);
  };
  
  const handleConstant = (constant: 'π' | 'e' | 'φ') => {
    resetError();
    const values = { 'π': Math.PI, 'e': Math.E, 'φ': (1 + Math.sqrt(5)) / 2 };
    
    if (isResult) handleAllClear();
    
    if (currentNumber !== '' && currentNumber !== '0' && currentNumber !== '-') {
        let newTokens = [...expressionTokens];
        newTokens.push(parseFloat(currentNumber));
        newTokens.push('×');
        setExpressionTokens(newTokens);
    }
    setCurrentNumber(String(values[constant]));
    setIsResult(false);
  };

  const handlePercent = () => {
    resetError();
    const numCurrent = parseFloat(currentNumber);
    if (isNaN(numCurrent)) return;

    if (expressionTokens.length >= 2) {
      const op = expressionTokens[expressionTokens.length - 1];
      const prevNumToken = expressionTokens[expressionTokens.length - 2];
      if (isOperator(op) && isNumber(prevNumToken)) {
          const prevNum = prevNumToken as number;
        if (op === '+' || op === '-') {
            setCurrentNumber(String(prevNum * (numCurrent / 100)));
            return;
        }
      }
    }
    setCurrentNumber(String(numCurrent / 100));
  };
  // #endregion

  const buttonLayout = [
    { label: '2nd', onClick: () => setShow2nd(!show2nd), className: cn('bg-gray-600 hover:bg-gray-700', show2nd && 'bg-blue-600 hover:bg-blue-700 text-white')},
    { label: '(', onClick: () => handleParenthesis('('), className: 'bg-gray-600 hover:bg-gray-700' },
    { label: ')', onClick: () => handleParenthesis(')'), className: 'bg-gray-600 hover:bg-gray-700' },
    { label: 'MC', onClick: () => handleMemory('MC'), className: 'bg-purple-600 hover:bg-purple-700' },
    { label: 'M+', onClick: () => handleMemory('M+'), className: 'bg-purple-600 hover:bg-purple-700' },
    { label: 'M-', onClick: () => handleMemory('M-'), className: 'bg-purple-600 hover:bg-purple-700' },
    { label: 'MR', onClick: () => handleMemory('MR'), className: 'bg-purple-600 hover:bg-purple-700' },
    { label: 'AC', onClick: handleAllClear, className: 'bg-orange-600 hover:bg-orange-700' },
    { label: '±', onClick: handleToggleSign, className: 'bg-gray-600 hover:bg-gray-700'},
    { label: '÷', onClick: () => handleOperator('÷'), className: 'bg-gray-500 hover:bg-gray-600' },
    
    show2nd ? { label: 'x³', onClick: () => handleUnaryFunction((x) => x ** 3, 'x³'), className: 'bg-gray-600 hover:bg-gray-700' } : { label: 'x²', onClick: () => handleUnaryFunction((x) => x ** 2, 'x²'), className: 'bg-gray-600 hover:bg-gray-700' },
    show2nd ? { label: '∛x', onClick: () => handleUnaryFunction(Math.cbrt, 'cbrt'), className: 'bg-gray-600 hover:bg-gray-700' } : { label: '√x', onClick: () => handleUnaryFunction(Math.sqrt, 'sqrt'), className: 'bg-gray-600 hover:bg-gray-700' },
    { label: 'xʸ', onClick: () => handleOperator('^'), className: 'bg-gray-600 hover:bg-gray-700' },
    { label: '1/x', onClick: () => handleUnaryFunction((x) => 1 / x, '1/x'), className: 'bg-gray-600 hover:bg-gray-700' },
    { label: '7', onClick: () => handleDigit('7'), className: 'bg-gray-700 hover:bg-gray-800' },
    { label: '8', onClick: () => handleDigit('8'), className: 'bg-gray-700 hover:bg-gray-800' },
    { label: '9', onClick: () => handleDigit('9'), className: 'bg-gray-700 hover:bg-gray-800' },
    { label: '×', onClick: () => handleOperator('×'), className: 'bg-gray-500 hover:bg-gray-600' },

    show2nd ? { label: 'sinh⁻¹', onClick: () => handleUnaryFunction(Math.asinh, 'asinh'), className: 'bg-gray-600 hover:bg-gray-700' } : { label: 'sinh', onClick: () => handleUnaryFunction(Math.sinh, 'sinh'), className: 'bg-gray-600 hover:bg-gray-700' },
    show2nd ? { label: 'cosh⁻¹', onClick: () => handleUnaryFunction(Math.acosh, 'acosh'), className: 'bg-gray-600 hover:bg-gray-700' } : { label: 'cosh', onClick: () => handleUnaryFunction(Math.cosh, 'cosh'), className: 'bg-gray-600 hover:bg-gray-700' },
    show2nd ? { label: 'tanh⁻¹', onClick: () => handleUnaryFunction(Math.atanh, 'atanh'), className: 'bg-gray-600 hover:bg-gray-700' } : { label: 'tanh', onClick: () => handleUnaryFunction(Math.tanh, 'tanh'), className: 'bg-gray-600 hover:bg-gray-700' },
    { label: 'e', onClick: () => handleConstant('e'), className: 'bg-gray-600 hover:bg-gray-700' },
    { label: '4', onClick: () => handleDigit('4'), className: 'bg-gray-700 hover:bg-gray-800' },
    { label: '5', onClick: () => handleDigit('5'), className: 'bg-gray-700 hover:bg-gray-800' },
    { label: '6', onClick: () => handleDigit('6'), className: 'bg-gray-700 hover:bg-gray-800' },
    { label: '-', onClick: () => handleOperator('-'), className: 'bg-gray-500 hover:bg-gray-600' },

    show2nd ? { label: 'sin⁻¹', onClick: () => handleUnaryFunction(Math.asin, 'asin'), className: 'bg-gray-600 hover:bg-gray-700' } : { label: 'sin', onClick: () => handleUnaryFunction(Math.sin, 'sin'), className: 'bg-gray-600 hover:bg-gray-700' },
    show2nd ? { label: 'cos⁻¹', onClick: () => handleUnaryFunction(Math.acos, 'acos'), className: 'bg-gray-600 hover:bg-gray-700' } : { label: 'cos', onClick: () => handleUnaryFunction(Math.cos, 'cos'), className: 'bg-gray-600 hover:bg-gray-700' },
    show2nd ? { label: 'tan⁻¹', onClick: () => handleUnaryFunction(Math.atan, 'atan'), className: 'bg-gray-600 hover:bg-gray-700' } : { label: 'tan', onClick: () => handleUnaryFunction(Math.tan, 'tan'), className: 'bg-gray-600 hover:bg-gray-700' },
    { label: 'π', onClick: () => handleConstant('π'), className: 'bg-gray-600 hover:bg-gray-700' },
    { label: '1', onClick: () => handleDigit('1'), className: 'bg-gray-700 hover:bg-gray-800' },
    { label: '2', onClick: () => handleDigit('2'), className: 'bg-gray-700 hover:bg-gray-800' },
    { label: '3', onClick: () => handleDigit('3'), className: 'bg-gray-700 hover:bg-gray-800' },
    { label: '+', onClick: () => handleOperator('+'), className: 'bg-gray-500 hover:bg-gray-600' },

    { label: angleMode, onClick: () => setAngleMode(m => m === 'RAD' ? 'DEG' : 'RAD'), className: 'bg-gray-600 hover:bg-gray-700' },
    { label: 'log', onClick: () => handleUnaryFunction(Math.log10, 'log'), className: 'bg-gray-600 hover:bg-gray-700' },
    { label: 'ln', onClick: () => handleUnaryFunction(Math.log, 'ln'), className: 'bg-gray-600 hover:bg-gray-700' },
    { label: 'n!', onClick: () => handleUnaryFunction(factorial, 'n!'), className: 'bg-gray-600 hover:bg-gray-700' },
    { label: '0', onClick: () => handleDigit('0'), className: 'col-span-2 bg-gray-700 hover:bg-gray-800' },
    { label: '.', onClick: handleDecimal, className: 'bg-gray-700 hover:bg-gray-800' },
    { label: '=', onClick: handleEquals, className: 'bg-blue-600 hover:bg-blue-700' },
  ].filter(Boolean);

  return (
    <Card id="scientific-calculator" className="shadow-lg max-w-lg mx-auto bg-gray-800 text-white p-2 border-2 border-gray-900 rounded-xl">
      <CardContent className="flex flex-col items-center gap-1 p-0">
        <div className="relative w-full mb-1 rounded-md border-2 border-gray-950 bg-gray-900/80 p-2 text-right text-3xl font-mono text-green-300 break-words h-16 flex items-end justify-end shadow-inner">
          <div className="absolute top-1 left-2 text-xs text-green-500/70 flex gap-2">
            {angleMode === 'DEG' && <span className="font-bold">DEG</span>}
            {memory !== 0 && <span className="font-bold">M</span>}
          </div>
          <span>{displayValue}</span>
        </div>
        
        <div className="w-full grid grid-cols-10 gap-1">
          {buttonLayout.map((btn, i) => (
            <Button 
                key={`${btn.label}-${i}`} 
                size="sm" 
                className={cn('h-9 text-xs rounded-md', btn.className, btn.label === '0' && 'col-span-2')} 
                onClick={btn.onClick as React.MouseEventHandler<HTMLButtonElement>}
            >
              {btn.label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

    