
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

// #region Helper Functions & Types
type Token = string | number;
type AngleMode = 'RAD' | 'DEG';

const precedence: { [key: string]: number } = {
  '+': 1, '-': 1, '×': 2, '÷': 2, '%': 2, '^': 3,
};
const associativity: { [key: string]: 'left' | 'right' } = {
  '+': 'left', '-': 'left', '×': 'left', '÷': 'left', '%': 'left', '^': 'right',
};

const isOperator = (token: Token): token is string => typeof token === 'string' && ['+', '-', '×', '÷', '^', '%'].includes(token);
const isFunction = (token: Token): token is string => typeof token === 'string' && !!trigFunctions[token as keyof typeof trigFunctions];
const isNumber = (token: Token): token is number => typeof token === 'number';
const isLeftParen = (token: Token): token is string => token === '(';
const isRightParen = (token: Token): token is string => token === ')';
// #endregion

// #region RPN Evaluation
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
                operatorStack[operatorStack.length - 1] !== '(' &&
                (
                    precedence[operatorStack[operatorStack.length - 1]] > precedence[token] ||
                    (precedence[operatorStack[operatorStack.length - 1]] === precedence[token] && associativity[token] === 'left')
                )
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

const trigFunctions: { [key: string]: (...args: number[]) => number } = {
    sin: Math.sin, cos: Math.cos, tan: Math.tan,
    asin: Math.asin, acos: Math.acos, atan: Math.atan,
    sinh: Math.sinh, cosh: Math.cosh, tanh: Math.tanh,
};


const evaluateRPN = (rpnQueue: Token[], angleMode: AngleMode): number => {
    const stack: number[] = [];
    rpnQueue.forEach(token => {
        if (isNumber(token)) {
            stack.push(token);
        } else if (isOperator(token)) {
            if (stack.length < 2) throw new Error("Syntax Error");
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
                case '%': stack.push((a / 100) * b); break;
            }
        } else if (isFunction(token)) {
             if (stack.length < 1) throw new Error("Syntax Error for function");
            let a = stack.pop()!;
            const func = trigFunctions[token as keyof typeof trigFunctions];
            if (!func) throw new Error(`Unknown function: ${token}`);
            
            const isInverse = token.startsWith('a') && !token.startsWith('asinh');

            let result;
            if (isInverse) {
                result = func(a);
                if (angleMode === 'DEG') result = result * 180 / Math.PI;
            } else {
                let angle = a;
                const isHyperbolic = ['sinh', 'cosh', 'tanh'].includes(token);
                if (!isHyperbolic && angleMode === 'DEG') {
                  angle = angle * Math.PI / 180;
                }
                result = func(angle);
            }
            
            if (isNaN(result)) throw new Error("Domain Error");
            stack.push(result);
        }
    });
    if (stack.length !== 1) throw new Error("Syntax Error at evaluation end");
    return stack[0];
};

const formatResult = (num: number): string => {
    if (Math.abs(num) > 1e15 || (Math.abs(num) < 1e-9 && num !== 0)) {
        return num.toExponential(9);
    }
    const str = String(num);
    if (str.length > 15) {
        return String(parseFloat(num.toPrecision(15)));
    }
    return str;
};

const factorial = (n: number): number => {
    if (n < 0 || !Number.isInteger(n)) throw new Error("Invalid input");
    if (n > 170) throw new Error("Overflow");
    if (n === 0) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
};
// #endregion

export default function ScientificCalculator() {
  const [displayValue, setDisplayValue] = useState('0');
  const [expressionTokens, setExpressionTokens] = useState<Token[]>([]);
  const [currentNumber, setCurrentNumber] = useState('');
  const [isResult, setIsResult] = useState(false);
  const [lastResult, setLastResult] = useState(0);
  const [angleMode, setAngleMode] = useState<AngleMode>('DEG');
  const [memory, setMemory] = useState(0);
  const [errorState, setErrorState] = useState<string | null>(null);
  const [show2nd, setShow2nd] = useState(false);
  
  useEffect(() => {
    const exprString = expressionTokens.map(t => {
        if (typeof t === 'number') return formatResult(t);
        if (isFunction(t)) return `${t}(`;
        return t;
    }).join(' ');

    const fullDisplay = `${exprString} ${currentNumber}`.trim();
    setDisplayValue(errorState || (fullDisplay || '0'));
  }, [expressionTokens, currentNumber, errorState]);
  
  const resetError = () => {
    if (errorState) {
        handleAllClear();
        return true;
    }
    return false;
  };

  const handleDigit = (digit: string) => {
    if(resetError()) {
      setCurrentNumber(digit);
      return;
    };

    if (isResult) {
      setCurrentNumber(digit);
      setExpressionTokens([]);
      setIsResult(false);
    } else {
      if (currentNumber.length > 15) return;
      setCurrentNumber(prev => (prev === '0' && digit !== '.' ? digit : prev + digit));
    }
  };

  const handleDecimal = () => {
    if(resetError()) {
      setCurrentNumber('0.');
      return;
    }
    if (isResult) {
      setCurrentNumber('0.');
      setExpressionTokens([]);
      setIsResult(false);
    } else if (!currentNumber.includes('.')) {
      setCurrentNumber(prev => prev === '' ? '0.' : prev + '.');
    }
  };

  const handleOperator = (op: string) => {
    if(resetError()) return;
    
    let newTokens = [...expressionTokens];
    if (currentNumber !== '') {
      newTokens.push(parseFloat(currentNumber));
      setCurrentNumber('');
    } else if (isResult) {
      newTokens = [lastResult];
    }
    setIsResult(false);

    const lastToken = newTokens[newTokens.length - 1];
    
    if (op === '-' && (newTokens.length === 0 || isOperator(lastToken) || isLeftParen(lastToken))) {
        setCurrentNumber('-');
        return;
    }

    if (isOperator(lastToken)) {
      newTokens[newTokens.length - 1] = op;
    } else if (newTokens.length > 0 || lastToken === 0) {
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
    if (currentNumber !== '' && currentNumber !== '-') {
      finalTokens.push(parseFloat(currentNumber));
    }
    
    const openParens = finalTokens.filter(t => t === '(').length;
    const closeParens = finalTokens.filter(t => t === ')').length;
    for (let i = 0; i < openParens - closeParens; i++) {
        finalTokens.push(')');
    }

    try {
      const rpn = shuntingYard(finalTokens);
      const result = evaluateRPN(rpn, angleMode);
      
      const resultString = formatResult(result);
      setCurrentNumber(resultString);
      setLastResult(result);
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
  };
  
  const handleAllClear = () => {
    setErrorState(null);
    setExpressionTokens([]);
    setCurrentNumber('');
    setDisplayValue('0');
    setIsResult(false);
    setLastResult(0);
  };

  const handleBackspace = () => {
    if(resetError()) return;
    if (isResult) {
      handleAllClear();
      return;
    }
    if (currentNumber.length > 0) {
      setCurrentNumber(prev => prev.slice(0, -1) || (expressionTokens.length > 0 ? '' : '0'));
    } else if (expressionTokens.length > 0) {
      const lastToken = expressionTokens[expressionTokens.length - 1];
       setExpressionTokens(prev => prev.slice(0, -1));
      if (isNumber(lastToken)) {
        setCurrentNumber(String(lastToken));
      }
    }
  };

  const handleToggleSign = () => {
    if(resetError()) return;
    if (isResult) {
        const value = lastResult;
        const newValue = formatResult(-value);
        setCurrentNumber(newValue);
        setExpressionTokens([]);
        setIsResult(false);
    } else if (currentNumber !== '') {
        setCurrentNumber(prev => (prev.startsWith('-') ? prev.substring(1) : '-' + prev));
    } else {
        setCurrentNumber('-');
    }
  };
  
  const handleMemory = (type: 'M+' | 'M-' | 'MR' | 'MC') => {
    if(resetError()) return;
    
    let newMemory = memory;
    const value = parseFloat(currentNumber) || (isResult ? lastResult : 0);
    switch (type) {
      case 'M+': 
        newMemory += value; 
        break;
      case 'M-': 
        newMemory -= value; 
        break;
      case 'MR':
        if(isResult) setExpressionTokens([]);
        setIsResult(false);
        setCurrentNumber(String(memory));
        return;
      case 'MC': newMemory = 0; break;
    }
    setMemory(newMemory);
  };

  const handleUnaryFunction = (fn: (x: number) => number, funcName: string) => {
    if(resetError()) return;
    
    const valueStr = currentNumber || (isResult ? String(lastResult) : '');
    if (valueStr === '' || valueStr === '-') return;

    try {
      let value = parseFloat(valueStr);
      let result = fn(value);
      
      if (isNaN(result) || !isFinite(result)) {
        throw new Error("Domain Error");
      }

      const formattedResult = formatResult(result);
      setCurrentNumber(formattedResult);
      if(isResult) setExpressionTokens([]);
      setLastResult(result);
      setIsResult(true);

    } catch (e: any) {
      setErrorState(`Error: ${e.message}`);
      setCurrentNumber('');
      setExpressionTokens([]);
      setIsResult(true);
    }
  };

  const handleTrigFunction = (funcName: string) => {
    const valueStr = currentNumber || (isResult ? String(lastResult) : '');
    if (valueStr === '' || valueStr === '-') {
      handleFunctionCall(funcName);
    } else {
        handleUnaryFunction((val) => {
          const isInverse = funcName.startsWith('a');
          const func = trigFunctions[funcName as keyof typeof trigFunctions];
          if (!func) throw new Error("Unknown function");

          if (isInverse) {
            let result = func(val);
            return angleMode === 'DEG' ? result * 180 / Math.PI : result;
          }
          
          const angleInRads = angleMode === 'DEG' ? val * Math.PI / 180 : val;
          return func(angleInRads);
        }, funcName);
    }
  }

  const handleFunctionCall = (func: string) => {
    if(resetError()) return;
    setIsResult(false);
    let newTokens = [...expressionTokens];

    if(currentNumber !== '' && currentNumber !== '-') {
        newTokens.push(parseFloat(currentNumber));
        newTokens.push('×');
        setCurrentNumber('');
    }
    
    newTokens.push(func);
    newTokens.push('(');
    setExpressionTokens(newTokens);
  };
  
  const handleParenthesis = (p: '(' | ')') => {
    if(resetError()) return;
    setIsResult(false);
    let newTokens = [...expressionTokens];

    if(p === '(') {
      const lastToken = newTokens[newTokens.length - 1];
      if(currentNumber !== '' && currentNumber !== '-') {
          newTokens.push(parseFloat(currentNumber));
          newTokens.push('×');
          setCurrentNumber('');
      } else if (isNumber(lastToken) || isRightParen(lastToken)) {
          newTokens.push('×');
      }
      newTokens.push('(');
    } else { // p === ')'
       if(currentNumber !== '' && currentNumber !== '-') {
           newTokens.push(parseFloat(currentNumber));
           setCurrentNumber('');
       }
       const openParens = newTokens.filter(t => t === '(').length;
       const closeParens = newTokens.filter(t => t === ')').length;
       if (openParens > closeParens) {
            newTokens.push(')');
       }
    }
    setExpressionTokens(newTokens);
  };
  
  const handleConstant = (constant: 'π' | 'e' | 'φ') => {
    if(resetError()) return;
    const values = { 'π': Math.PI, 'e': Math.E, 'φ': (1 + Math.sqrt(5)) / 2 };
    const constantValue = values[constant];
    
    if (isResult) {
      setExpressionTokens([]);
      setIsResult(false);
    }
    
    if (currentNumber !== '' && currentNumber !== '0' && currentNumber !== '-') {
        let newTokens = [...expressionTokens, parseFloat(currentNumber), '×'];
        setExpressionTokens(newTokens);
    }
    setCurrentNumber(String(constantValue));
  };

  const handlePercent = () => {
    if(resetError() || currentNumber === '') return;
    
    let numCurrent = parseFloat(currentNumber);
    if(isNaN(numCurrent)) return;

    if (expressionTokens.length >= 2) {
      const lastOp = expressionTokens[expressionTokens.length - 1] as string;
      const prevNumToken = expressionTokens[expressionTokens.length - 2];

      if ((lastOp === '+' || lastOp === '-') && isNumber(prevNumToken)) {
        numCurrent = prevNumToken * (numCurrent / 100);
      } else {
        numCurrent = numCurrent / 100;
      }
    } else {
      numCurrent = numCurrent / 100;
    }
    
    setCurrentNumber(formatResult(numCurrent));
  };

  const buttonRows = [
    [
      { label: "2nd", onClick: () => setShow2nd(!show2nd), color: "blue", active: show2nd },
      { label: "(", onClick: () => handleParenthesis('('), color: "gray-dark" },
      { label: ")", onClick: () => handleParenthesis(')'), color: "gray-dark" },
      { label: "%", onClick: handlePercent, color: "gray-dark" },
      { label: "AC", onClick: handleAllClear, color: "red" },
      { label: "DEL", onClick: handleBackspace, color: "red" },
    ],
    [
      { label: show2nd ? "x³" : "x²", onClick: () => handleUnaryFunction(x => show2nd ? x**3 : x**2, show2nd ? "x³" : "x²"), color: "blue" },
      { label: "1/x", onClick: () => handleUnaryFunction(x => 1/x, "1/x"), color: "blue" },
      { label: show2nd ? "y√x" : "√x", onClick: () => show2nd ? handleOperator('^') : handleUnaryFunction(x => Math.sqrt(x), '√x'), color: "blue" },
      { label: "xʸ", onClick: () => handleOperator('^'), color: "blue" },
      { label: "n!", onClick: () => handleUnaryFunction(factorial, 'n!'), color: "blue" },
      { label: "÷", onClick: () => handleOperator('÷'), color: "orange" },
    ],
    [
      { label: show2nd ? "sin⁻¹" : "sin", onClick: () => handleTrigFunction(show2nd ? 'asin' : 'sin'), color: "blue" },
      { label: "7", onClick: () => handleDigit('7'), color: "gray" },
      { label: "8", onClick: () => handleDigit('8'), color: "gray" },
      { label: "9", onClick: () => handleDigit('9'), color: "gray" },
      { label: "×", onClick: () => handleOperator('×'), color: "orange" },
    ],
    [
      { label: show2nd ? "cos⁻¹" : "cos", onClick: () => handleTrigFunction(show2nd ? 'acos' : 'cos'), color: "blue" },
      { label: "4", onClick: () => handleDigit('4'), color: "gray" },
      { label: "5", onClick: () => handleDigit('5'), color: "gray" },
      { label: "6", onClick: () => handleDigit('6'), color: "gray" },
      { label: "-", onClick: () => handleOperator('-'), color: "orange" },
    ],
    [
      { label: show2nd ? "tan⁻¹" : "tan", onClick: () => handleTrigFunction(show2nd ? 'atan' : 'tan'), color: "blue" },
      { label: "1", onClick: () => handleDigit('1'), color: "gray" },
      { label: "2", onClick: () => handleDigit('2'), color: "gray" },
      { label: "3", onClick: () => handleDigit('3'), color: "gray" },
      { label: "+", onClick: () => handleOperator('+'), color: "orange" },
    ],
    [
      { label: "log", onClick: () => handleUnaryFunction(x => Math.log10(x), 'log'), color: "blue" },
      { label: "ln", onClick: () => handleUnaryFunction(x => Math.log(x), 'ln'), color: "blue" },
      { label: "0", onClick: () => handleDigit('0'), color: "gray" },
      { label: ".", onClick: handleDecimal, color: "gray" },
      { label: "±", onClick: handleToggleSign, color: "gray" },
      { label: "=", onClick: handleEquals, color: "orange" },
    ],
    [
      { label: "RAD", onClick: () => setAngleMode(p => p === 'DEG' ? 'RAD' : 'DEG'), color: "green", active: angleMode === 'RAD' },
      { label: "M+", onClick: () => handleMemory('M+'), color: "green" },
      { label: "M-", onClick: () => handleMemory('M-'), color: "green" },
      { label: "MR", onClick: () => handleMemory('MR'), color: "green" },
      { label: "MC", onClick: () => handleMemory('MC'), color: "green" },
      { label: "π", onClick: () => handleConstant('π'), color: "yellow" },
    ]
  ];

  const colorVariants: {[key: string]: string} = {
    blue: "bg-blue-600 border-blue-800 hover:bg-blue-700",
    gray: "bg-gray-600 border-gray-800 hover:bg-gray-700",
    "gray-dark": "bg-gray-700 border-gray-900 hover:bg-gray-800",
    orange: "bg-orange-500 border-orange-700 hover:bg-orange-600",
    red: "bg-red-600 border-red-800 hover:bg-red-700",
    green: "bg-green-600 border-green-800 hover:bg-green-700",
    yellow: "bg-yellow-500 border-yellow-700 hover:bg-yellow-600",
  }

  return (
    <Card id="scientific-calculator" className="shadow-2xl max-w-sm mx-auto bg-gray-800 text-white p-2 border-t-2 border-l-2 border-gray-900 rounded-xl">
      <CardContent className="flex flex-col items-center gap-2 p-1">
        <div className="relative w-full mb-1 rounded-md border-b-4 border-gray-950 bg-gray-900/80 p-2 text-right break-words h-16 flex items-end justify-end shadow-inner">
          <div className="absolute top-1 left-2 text-xs text-green-400/70 flex gap-2">
            {angleMode === 'DEG' && <span className="font-bold">DEG</span>}
            {memory !== 0 && <span className="font-bold">M</span>}
          </div>
          <span className="text-2xl font-mono text-green-300">{displayValue}</span>
        </div>
        
        <div className="w-full grid grid-cols-6 gap-1">
          {buttonRows.flat().map((btn, i) => (
            <Button 
                key={`${btn.label}-${i}`} 
                size="sm" 
                className={cn(
                    'h-9 text-xs rounded-md relative transition-all duration-100 ease-in-out',
                    'border-b-4 active:border-b-0 active:translate-y-1',
                    'text-white',
                    colorVariants[btn.color as keyof typeof colorVariants] || 'bg-gray-700 border-gray-800',
                    btn.active && 'ring-2 ring-cyan-400 ring-inset',
                    btn.className
                )}
                onClick={btn.onClick as React.MouseEventHandler<HTMLButtonElement>}
                disabled={(btn as any).disabled}
            >
              {btn.label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
