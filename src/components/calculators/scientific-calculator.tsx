"use client";

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

  const handleButtonClick = (value: string) => {
    if (isResult) {
      setDisplayValue(value);
      setIsResult(false);
      return;
    }
    setDisplayValue(prev => (prev === '0' && !['.','('].includes(value) ? value : prev + value));
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
  
  const functionButtons1 = [
    { label: show2nd ? 'x³' : 'x²', type: 'func_imm', fn: (x: number) => show2nd ? x**3 : x**2 },
    { label: show2nd ? '∛x' : '√x', type: 'func_imm', fn: (x: number) => show2nd ? Math.cbrt(x) : Math.sqrt(x) },
    { label: 'xʸ', type: 'op', value: '^' },
    { label: show2nd ? 'y√x' : '10ˣ', type: 'func', value: 'x^(1/' },
    { label: '1/x', type: 'func_imm', fn: (x: number) => 1/x },
    { label: show2nd ? '2ˣ' : 'eˣ', type: 'func_imm', fn: (x: number) => show2nd ? 2**x : Math.exp(x) },
    { label: 'log', type: 'func', value: 'log' },
    { label: 'ln', type: 'func', value: 'ln'},
  ];
  
  const trigButtons = [
    { label: show2nd ? 'sin⁻¹' : 'sin', type: 'func', value: show2nd ? 'asin' : 'sin' },
    { label: show2nd ? 'cos⁻¹' : 'cos', type: 'func', value: show2nd ? 'acos' : 'cos' },
    { label: show2nd ? 'tan⁻¹' : 'tan', type: 'func', value: show2nd ? 'atan' : 'tan' },
    { label: show2nd ? 'sinh⁻¹' : 'sinh', type: 'func', value: show2nd ? 'asinh' : 'sinh' },
    { label: show2nd ? 'cosh⁻¹' : 'cosh', type: 'func', value: show2nd ? 'acosh' : 'cosh' },
    { label: show2nd ? 'tanh⁻¹' : 'tanh', type: 'func', value: show2nd ? 'atanh' : 'tanh' },
  ];

  const basicButtons = [
    '7', '8', '9',
    '4', '5', '6',
    '1', '2', '3',
    '0', '.', '±',
  ];
  
  const operatorButtons = ['÷', '×', '-', '+'];
  
  const renderButton = (btnConfig: any, variant: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link" | null | undefined = 'outline', className: string = "") => {
    const isString = typeof btnConfig === 'string';
    const label = isString ? btnConfig : btnConfig.label;
    const type = isString ? 'char' : btnConfig.type;
    
    let onClick;
    switch (type) {
      case 'op': onClick = () => handleOperatorClick(isString ? btnConfig : btnConfig.value || label); break;
      case 'char': onClick = () => handleButtonClick(label); break;
      case 'func': onClick = () => handleFunctionClick(isString ? btnConfig : btnConfig.value || label); break;
      case 'func_imm': onClick = () => applyImmediateFunction(btnConfig.fn, btnConfig.label); break;
      case 'mem': onClick = () => handleMemory(label); break;
      case 'clear': onClick = handleClear; break;
      case 'all-clear': onClick = handleAllClear; break;
      case 'backspace': onClick = handleBackspace; break;
      case 'equals': onClick = handleEquals; break;
      case 'toggle-sign': onClick = handleToggleSign; break;
      default: onClick = () => handleButtonClick(label);
    }

    return <Button key={label} variant={variant} className={`text-lg h-12 ${className}`} onClick={onClick}>{label}</Button>;
  }

  return (
    <Card className="shadow-lg max-w-2xl mx-auto">
      <CardContent className="flex flex-col items-center gap-2 p-4">
        <div className="w-full mb-2 rounded-lg border bg-muted p-4 text-right text-4xl font-mono text-foreground break-all h-24 flex items-end justify-end">
          {displayValue}
        </div>
        
        <div className="w-full grid grid-cols-7 gap-2">
            <Button variant="outline" className="h-10 text-sm" onClick={() => setIsRadians(!isRadians)}>{isRadians ? 'RAD' : 'DEG'}</Button>
            <Button variant="outline" className="h-10 text-sm" onClick={() => setShow2nd(!show2nd)}>2nd</Button>
            {['MC', 'MR', 'M+', 'M-'].map(mem => renderButton({ label: mem, type: 'mem' }, 'secondary', 'h-10 text-sm'))}
            <Button variant="destructive" className="h-10 text-sm" onClick={handleBackspace}>⌫</Button>
        </div>

        <div className="w-full grid grid-cols-7 gap-2">
            {functionButtons1.slice(0, 4).map(btn => renderButton(btn, 'secondary', 'h-10 text-sm'))}
            <Button variant="secondary" className="h-10 text-sm" onClick={() => handleButtonClick('(')}>(</Button>
            <Button variant="secondary" className="h-10 text-sm" onClick={() => handleButtonClick(')')}>)</Button>
            <Button variant="secondary" className="h-10 text-sm" onClick={() => applyImmediateFunction(x => x, '!')}>n!</Button>
        </div>
        
        <div className="w-full grid grid-cols-7 gap-2">
            {functionButtons1.slice(4, 8).map(btn => renderButton(btn, 'secondary', 'h-10 text-sm'))}
             {trigButtons.slice(0, 3).map(btn => renderButton(btn, 'secondary', 'h-10 text-sm'))}
        </div>

        <div className="grid grid-cols-5 gap-2 w-full">
            <div className="col-span-3 grid grid-cols-3 gap-2">
                {basicButtons.map(b => {
                    if (b === '±') return renderButton({ label: '±', type: 'toggle-sign' }, 'outline');
                    return renderButton(b, 'outline');
                })}
            </div>
            <div className="col-span-1 grid grid-cols-1 gap-2">
                {operatorButtons.map(op => renderButton({ label: op, value: op, type: 'op' }, 'accent', 'bg-accent text-accent-foreground hover:bg-accent/90'))}
            </div>
             <div className="col-span-1 grid grid-cols-1 gap-2">
                <Button variant="destructive" className="h-full text-lg" onClick={handleAllClear}>AC</Button>
                {renderButton({ label: '=', type: 'equals' }, 'default', 'h-full bg-primary hover:bg-primary/90')}
            </div>
        </div>
         <div className="w-full grid grid-cols-7 gap-2 mt-2">
            {trigButtons.slice(3, 6).map(btn => renderButton(btn, 'secondary', 'h-10 text-sm'))}
            {['sec', 'csc', 'cot'].map(op => renderButton({ label: op, type: 'func', value: op }, 'secondary', 'h-10 text-sm'))}
            {renderButton({ label: 'π', type: 'char' }, 'secondary', 'h-10 text-sm')}
        </div>


      </CardContent>
    </Card>
  );
}
