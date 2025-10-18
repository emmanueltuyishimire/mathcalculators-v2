"use client";

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Helper for factorial
const factorial = (n: number): number => {
  if (n < 0) return NaN; // Or throw an error
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
  
  const handleClearEntry = () => {
    if (isResult) {
      handleClear();
    } else {
        const parts = displayValue.split(' ');
        if (parts.length > 1) {
            setDisplayValue(parts.slice(0, -1).join(' '));
        } else {
            setDisplayValue('0');
        }
    }
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
        const currentVal = calculate(displayValue);
        let result: number;
        if (funcName === "!") {
           result = factorial(currentVal);
        } else {
           result = fn(currentVal);
        }
        
        if(isNaN(result) || !isFinite(result)) throw new Error("Invalid result");

        setDisplayValue(String(result));
        setIsResult(true);
    } catch (e) {
        toast({
            variant: "destructive",
            title: "Error applying function",
            description: `Could not apply ${funcName || 'function'} to the current value.`,
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
  };

  const handleToggleSign = () => {
    if (displayValue !== '0') {
      setDisplayValue(prev => prev.startsWith('-') ? prev.substring(1) : '-' + prev);
    }
  };
  
  const functionButtons1 = [
    { label: show2nd ? 'x³' : 'x²', type: 'func_imm', fn: (x: number) => show2nd ? x*x*x : x*x },
    { label: show2nd ? '∛x' : '√x', type: 'func_imm', fn: (x: number) => show2nd ? Math.cbrt(x) : Math.sqrt(x) },
    { label: show2nd ? 'xʸ' : 'x^y', type: 'op', value: '^' },
    { label: show2nd ? 'eˣ' : '10ˣ', type: 'func_imm', fn: (x: number) => show2nd ? Math.exp(x) : 10**x },
    { label: '1/x', type: 'func_imm', fn: (x: number) => 1/x },
    { label: show2nd ? 'logᵧ(x)' : 'log', type: 'func', value: 'log' },
    { label: 'ln', type: 'func', value: 'ln'},
    { label: '(', type: 'char' }, { label: ')', type: 'char' },
    { label: 'n!', type: 'func_imm', fn: (x: number) => x, funcName: "!" },
  ];
  
  const trigButtons = [
    { label: 'sin', type: 'func' }, { label: 'cos', type: 'func' }, { label: 'tan', type: 'func' },
    { label: 'asin', type: 'func' }, { label: 'acos', type: 'func' }, { label: 'atan', type: 'func' },
    { label: 'sec', type: 'func' }, { label: 'csc', type: 'func' }, { label: 'cot', type: 'func' },
    { label: 'sinh', type: 'func' }, { label: 'cosh', type: 'func' }, { label: 'tanh', type: 'func' },
  ];

  const basicButtons = [
    '7', '8', '9', '÷',
    '4', '5', '6', '×',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
  ];
  
  const constantButtons = [
      { label: 'π', type: 'char'}, { label: 'e', type: 'char'}, { label: 'φ', type: 'char'},
  ];
  
  const memoryButtons = [
      { label: 'MC', type: 'mem' }, { label: 'MR', type: 'mem' }, { label: 'M+', type: 'mem' }, { label: 'M-', type: 'mem' },
  ];

  const renderButton = (btnConfig: any, index: number, variant: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link" | null | undefined = 'outline') => {
    const isString = typeof btnConfig === 'string';
    const label = isString ? btnConfig : btnConfig.label;
    const type = isString ? 'char' : btnConfig.type;
    
    let onClick;
    switch (type) {
      case 'op': onClick = () => handleOperatorClick(isString ? btnConfig : btnConfig.value || label); break;
      case 'char': onClick = () => handleButtonClick(label); break;
      case 'func': onClick = () => handleFunctionClick(isString ? btnConfig : btnConfig.value || label); break;
      case 'func_imm': onClick = () => applyImmediateFunction(btnConfig.fn, btnConfig.funcName); break;
      case 'mem': onClick = () => handleMemory(label); break;
      default: onClick = () => {};
    }

    if (label === '=') {
        return <Button key={label} variant="default" className="text-lg h-12 bg-primary hover:bg-primary/90" onClick={handleEquals}>{label}</Button>;
    }

    return <Button key={index} variant={variant || "outline"} className="text-sm h-10" onClick={onClick}>{label}</Button>
  }

  return (
    <Card className="shadow-lg max-w-lg mx-auto">
      <CardContent className="flex flex-col items-center gap-2 p-4">
        <div className="w-full mb-2 rounded-lg border bg-muted p-4 text-right text-4xl font-mono text-foreground break-all">
          {displayValue}
        </div>
        
        <div className="w-full grid grid-cols-5 gap-2">
            {memoryButtons.map((btn, i) => renderButton(btn, i, 'secondary'))}
            <Button variant="destructive" className="text-md h-10" onClick={handleBackspace}>⌫</Button>
        </div>
        
        <Tabs defaultValue="functions" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="functions">Functions</TabsTrigger>
                <TabsTrigger value="trig">Trigonometry</TabsTrigger>
            </TabsList>
            <TabsContent value="functions" className="mt-2">
                <div className="grid grid-cols-5 gap-2">
                    <Button variant={show2nd ? "secondary" : "outline"} className="text-sm h-10" onClick={() => setShow2nd(!show2nd)}>2nd</Button>
                    {functionButtons1.map((btn, i) => renderButton(btn, i, 'secondary'))}
                </div>
            </TabsContent>
            <TabsContent value="trig" className="mt-2">
                 <div className="grid grid-cols-5 gap-2">
                    {trigButtons.slice(0, 3).map((btn, i) => renderButton(btn, i, 'secondary'))}
                     {constantButtons.map((btn,i) => renderButton(btn, i+3, 'secondary'))}
                     {trigButtons.slice(3, 5).map((btn, i) => renderButton(btn, i+6, 'secondary'))}
                     
                     {trigButtons.slice(5, 8).map((btn, i) => renderButton(btn, i+8, 'secondary'))}
                     
                     {trigButtons.slice(8, 10).map((btn, i) => renderButton(btn, i+11, 'secondary'))}
                     
                     {trigButtons.slice(10).map((btn, i) => renderButton(btn, i+13, 'secondary'))}
                 </div>
            </TabsContent>
        </Tabs>
        
        <div className="grid w-full grid-cols-5 gap-2 mt-2">
             <Button size="sm" variant="ghost" className="h-12" onClick={() => setIsRadians(!isRadians)}>
                {isRadians ? 'RAD' : 'DEG'}
            </Button>
            <Button className="text-lg h-12" variant="outline" onClick={handleToggleSign}>±</Button>
            <Button variant="destructive" className="text-lg h-12" onClick={handleClearEntry}>CE</Button>
            <Button variant="destructive" className="text-lg h-12 col-span-2" onClick={handleClear}>C</Button>
        </div>

        <div className="grid w-full grid-cols-4 gap-2">
          {basicButtons.map((btn) => {
            const isOperator = ['÷', '×', '-', '+'].includes(btn);
            const isEquals = btn === '=';
            return (
              <Button
                key={btn}
                variant={isOperator ? 'secondary' : isEquals ? 'default' : 'outline'}
                className={`text-lg h-12 ${isEquals ? 'bg-primary hover:bg-primary/90' : isOperator ? 'bg-accent text-accent-foreground hover:bg-accent/90' : ''}`}
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
