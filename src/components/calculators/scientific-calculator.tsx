
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

// Helper for factorial
const factorial = (n: number): number => {
  if (n < 0 || n % 1 !== 0) return NaN;
  if (n === 0) return 1;
  let result = 1;
  for (let i = n; i > 1; i--) {
    result *= i;
  }
  return result;
};

export default function ScientificCalculator() {
  const [displayValue, setDisplayValue] = useState('0');
  const [isResult, setIsResult] = useState(false);
  const [isRadians, setIsRadians] = useState(true);
  const [memory, setMemory] = useState(0);
  const [show2nd, setShow2nd] = useState(false);
  const { toast } = useToast();

  const handleButtonClick = (value: string) => {
    if (isResult) {
      setDisplayValue(value);
      setIsResult(false);
      return;
    }
    setDisplayValue(prev => (prev === '0' && value !== '.' ? value : prev + value));
  };

  const handleOperatorClick = (operator: string) => {
    setIsResult(false);
    setDisplayValue(prev => {
        const lastChar = prev.trim().slice(-1);
        if (['+', '-', '×', '÷', '^', '%'].includes(lastChar)) {
            return prev.trim().slice(0, -1) + ` ${operator} `;
        }
        return `${prev} ${operator} `;
    });
  };

  const handleClear = () => {
    setDisplayValue('0');
    setIsResult(false);
  };
  
  const handleAllClear = () => {
    handleClear();
    setMemory(0);
  };

  const handleBackspace = () => {
    if (isResult) {
      handleClear();
      return;
    }
    setDisplayValue(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
  };

  const handleFunctionClick = (func: string) => {
     if (isResult) {
      setDisplayValue(`${func}(`);
      setIsResult(false);
    } else {
       setDisplayValue(prev => (prev === '0' ? `${func}(` : `${prev}${func}(`));
    }
  };

  const calculate = (expression: string): number => {
    const toRad = (deg: number) => deg * (Math.PI / 180);
    const fromRad = (rad: number) => rad * (180 / Math.PI);
    
    // This is a safer version than eval.
    // It handles basic arithmetic, parenthesis, and functions.
    // A more robust solution would involve a proper parsing library.
    const func = new Function('return ' + expression
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/π/g, 'Math.PI')
      .replace(/e/g, 'Math.E')
      .replace(/φ/g, '1.61803398875')
      .replace(/\^/g, '**')
      .replace(/√\(/g, 'Math.sqrt(')
      .replace(/sin\(/g, 'Math.sin(' + (isRadians ? '' : 'Math.PI/180*'))
      .replace(/cos\(/g, 'Math.cos(' + (isRadians ? '' : 'Math.PI/180*'))
      .replace(/tan\(/g, 'Math.tan(' + (isRadians ? '' : 'Math.PI/180*'))
      .replace(/asin\(/g, 'Math.asin(')
      .replace(/acos\(/g, 'Math.acos(')
      .replace(/atan\(/g, 'Math.atan(')
      .replace(/sec\(/g, '1/Math.cos(' + (isRadians ? '' : 'Math.PI/180*'))
      .replace(/csc\(/g, '1/Math.sin(' + (isRadians ? '' : 'Math.PI/180*'))
      .replace(/cot\(/g, '1/Math.tan(' + (isRadians ? '' : 'Math.PI/180*'))
      .replace(/sinh\(/g, 'Math.sinh(')
      .replace(/cosh\(/g, 'Math.cosh(')
      .replace(/tanh\(/g, 'Math.tanh(')
      .replace(/log\(/g, 'Math.log10(')
      .replace(/ln\(/g, 'Math.log(')
      .replace(/log_(\d+)\((.*?)\)/g, '(Math.log($2)/Math.log($1))')
      .replace(/(\d+)!/g, (match, n) => `factorial(${n})`)
    );

    (window as any).factorial = factorial;

    let result = func();
    if (!isRadians && ['asin', 'acos', 'atan'].some(f => expression.includes(f))) {
      result = fromRad(result);
    }
    
    delete (window as any).factorial;
    return result;
  };
  
  const applyImmediateFunction = (fn: (x: number) => number, funcName?: string) => {
    try {
        const currentValStr = displayValue.split(/[\s()]+/).pop() || displayValue;
        const currentVal = parseFloat(currentValStr);
        if (isNaN(currentVal)) {
            throw new Error("Invalid number for function.");
        }

        let result: number;
        if (funcName === "!") {
           result = factorial(currentVal);
        } else {
           result = fn(currentVal);
        }
        
        if(isNaN(result) || !isFinite(result)) throw new Error("Invalid result from function");

        const newDisplay = displayValue.substring(0, displayValue.length - currentValStr.length) + String(result);
        setDisplayValue(newDisplay);
        setIsResult(false); // To allow further calculations
    } catch (e: any) {
        toast({
            variant: "destructive",
            title: "Function Error",
            description: e.message || `Could not apply ${funcName || 'function'}.`,
        });
        setIsResult(true);
    }
  };


  const handleEquals = () => {
    try {
      if (displayValue.split('(').length !== displayValue.split(')').length) {
        throw new Error("Mismatched parentheses");
      }
      const result = calculate(displayValue);
      setDisplayValue(String(result));
      setIsResult(true);
    } catch (error: any) {
       toast({
        variant: "destructive",
        title: "Invalid Expression",
        description: error.message || "Please check your input.",
      });
      setIsResult(true);
    }
  };

  const handleMemory = (type: 'M+' | 'M-' | 'MR' | 'MC') => {
    const currentVal = parseFloat(displayValue);
    if (isNaN(currentVal) && type !== 'MC' && type !== 'MR') return;
    
    switch (type) {
      case 'M+':
        setMemory(memory + currentVal);
        break;
      case 'M-':
        setMemory(memory - currentVal);
        break;
      case 'MR':
        setDisplayValue(String(memory));
        setIsResult(false);
        break;
      case 'MC':
        setMemory(0);
        break;
    }
    setIsResult(true); // Indicate that a memory action was performed.
  };

  const handleToggleSign = () => {
    if (isResult) {
      setDisplayValue(prev => (prev.startsWith('-') ? prev.substring(1) : '-' + prev));
    } else {
      const parts = displayValue.split(/(\s)/);
      const lastPartIndex = parts.findLastIndex(p => p.trim() !== '');
      if (lastPartIndex > -1) {
        const lastPart = parts[lastPartIndex];
        if (!isNaN(parseFloat(lastPart))) {
          parts[lastPartIndex] = lastPart.startsWith('-') ? lastPart.substring(1) : '-' + lastPart;
          setDisplayValue(parts.join(''));
        }
      }
    }
  };
  
  const functionButtons = [
    { label: show2nd ? 'x³' : 'x²', type: 'func_imm', fn: (x: number) => show2nd ? x**3 : x**2 },
    { label: show2nd ? '∛x' : '√x', type: 'func_imm', fn: (x: number) => show2nd ? Math.cbrt(x) : Math.sqrt(x) },
    { label: 'xʸ', type: 'op', value: '^' },
    { label: '10ˣ', type: 'func_imm', fn: (x: number) => 10**x },
    { label: 'log', type: 'func', value: 'log' },
    { label: 'ln', type: 'func', value: 'ln' },
    { label: '(', type: 'char' },
    { label: ')', type: 'char' },
    { label: '1/x', type: 'func_imm', fn: (x:number) => 1/x },
    { label: '%', type: 'op' },
    { label: 'n!', type: 'func_imm', fn: (x:number) => factorial(x) },
    { label: 'C', type: 'clear' },
  ];
  
  const trigButtons = [
    { label: 'sin', type: 'func', second: 'sin⁻¹', secondValue: 'asin' },
    { label: 'cos', type: 'func', second: 'cos⁻¹', secondValue: 'acos' },
    { label: 'tan', type: 'func', second: 'tan⁻¹', secondValue: 'atan' },
  ];
  
  const hyperbolicButtons = [
    { label: 'sinh', type: 'func' },
    { label: 'cosh', type: 'func' },
    { label: 'tanh', type: 'func' },
  ];

  const constantButtons = [
     { label: 'π', type: 'char' },
     { label: 'e', type: 'char' },
     { label: 'φ', type: 'char' }
  ];
  
  const memoryButtons = ['MC', 'M+', 'M-', 'MR'];

  const basicButtons = [ '7', '8', '9', '4', '5', '6', '1', '2', '3'];
  const operatorButtons = ['÷', '×', '-', '+'];

  const renderButton = (
      label: string, 
      onClick: () => void,
      className: string = "",
      ariaLabel?: string
    ) => (
    <Button key={label} size="sm" className={cn('h-9 text-base', className)} onClick={onClick} aria-label={ariaLabel || label}>{label}</Button>
  );

  return (
    <Card id="scientific-calculator" className="shadow-lg max-w-md mx-auto bg-gray-800 text-white p-2 border-4 border-gray-700 rounded-2xl">
      <CardContent className="flex flex-col items-center gap-2 p-0">
        <div className="w-full mb-2 rounded-lg border-2 border-gray-900 bg-gray-900/80 p-2 text-right text-4xl font-mono text-green-300 break-all h-20 flex items-end justify-end shadow-inner">
          <span>{displayValue}</span>
        </div>
        
        <div className="w-full grid grid-cols-6 gap-1">
          {/* First Row */}
          {renderButton('2nd', () => setShow2nd(!show2nd), show2nd ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-600 hover:bg-gray-700')}
          {constantButtons.map(btn => renderButton(btn.label, () => handleButtonClick(btn.value || btn.label), 'bg-gray-600 hover:bg-gray-700'))}
          {renderButton('⌫', handleBackspace, 'bg-red-600 hover:bg-red-700 text-white col-span-2')}

          {/* Second Row */}
          {functionButtons.slice(0, 6).map(btn => renderButton(btn.label, () => btn.type === 'func' ? handleFunctionClick(btn.value || btn.label) : btn.type === 'func_imm' ? applyImmediateFunction(btn.fn, btn.label) : handleOperatorClick(btn.value || btn.label), 'bg-gray-600 hover:bg-gray-700'))}

          {/* Third Row */}
          {functionButtons.slice(6).map(btn => renderButton(btn.label, () => btn.type === 'func' ? handleFunctionClick(btn.value || btn.label) : btn.type === 'func_imm' ? applyImmediateFunction(btn.fn, btn.label) : btn.type === 'op' ? handleOperatorClick(btn.label) : handleButtonClick(btn.label), 'bg-gray-600 hover:bg-gray-700'))}
          {renderButton('AC', handleAllClear, 'bg-red-600 hover:bg-red-700 text-white')}

          {/* Trig and Memory */}
          {trigButtons.map(btn => renderButton(show2nd ? btn.second : btn.label, () => handleFunctionClick(show2nd ? btn.secondValue : btn.label), 'bg-gray-600 hover:bg-gray-700'))}
          {memoryButtons.map(label => renderButton(label, () => handleMemory(label as 'M+' | 'M-' | 'MR' | 'MC'), 'bg-purple-600 hover:bg-purple-700'))}
          {hyperbolicButtons.map(btn => renderButton(btn.label, () => handleFunctionClick(btn.label), 'bg-gray-600 hover:bg-gray-700'))}

          {/* Number Pad and Operators */}
          <div className="col-span-3 grid grid-cols-3 gap-1">
            {basicButtons.map(label => renderButton(label, () => handleButtonClick(label), 'bg-gray-700 hover:bg-gray-600'))}
            {renderButton('0', () => handleButtonClick('0'), 'col-span-2 bg-gray-700 hover:bg-gray-600')}
            {renderButton('.', () => handleButtonClick('.'), 'bg-gray-700 hover:bg-gray-600')}
          </div>
          
          <div className="col-span-3 grid grid-cols-2 gap-1">
             <Button className="col-span-2 bg-gray-600 hover:bg-gray-700 h-9 text-base" onClick={() => setIsRadians(!isRadians)}>
                {isRadians ? 'RAD' : 'DEG'}
            </Button>
            {renderButton('±', handleToggleSign, 'bg-gray-700 hover:bg-gray-600')}
            {renderButton('=', handleEquals, 'bg-blue-600 hover:bg-blue-700 text-white')}
            {operatorButtons.map(op => renderButton(op, () => handleOperatorClick(op), 'bg-orange-500 hover:bg-orange-600 text-white'))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
