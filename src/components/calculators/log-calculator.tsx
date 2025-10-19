"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

const ScientificCalculator = () => {
  const [displayValue, setDisplayValue] = useState('log_2(8)');
  const [isResult, setIsResult] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    handleEquals();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    setDisplayValue(prev => `${prev} ${operator} `);
  };

  const handleClear = () => {
    setDisplayValue('0');
    setIsResult(false);
  };
  
  const handleAllClear = () => {
    handleClear();
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

  const applyImmediateFunction = (fn: (x: number) => number | string, funcName: string) => {
    try {
        const result = fn(parseFloat(displayValue));
        if (isNaN(Number(result)) || !isFinite(Number(result))) throw new Error(`Invalid result from ${funcName}`);
        setDisplayValue(String(result));
        setIsResult(true);
    } catch (e: any) {
        toast({
            variant: "destructive",
            title: "Function Error",
            description: e.message || `Could not apply ${funcName}.`,
        });
        setIsResult(true);
    }
  };

  const handleEquals = () => {
    try {
      let expression = displayValue
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/\^/g, '**')
        .replace(/log\(/g, 'Math.log10(')
        .replace(/ln\(/g, 'Math.log(');

      // Handle custom log_b(x) using change of base: log_b(x) = log(x)/log(b)
      expression = expression.replace(/log_(\d+)\((.*?)\)/g, '(Math.log($2)/Math.log($1))');
      
      if (displayValue.split('(').length !== displayValue.split(')').length) {
        throw new Error("Mismatched parentheses");
      }
      
      const result = new Function('return ' + expression)();
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

  const buttonLayout = [
    { label: '(', type: 'char', variant: 'secondary' },
    { label: ')', type: 'char', variant: 'secondary' },
    { label: 'C', type: 'clear', variant: 'destructive' },
    { label: 'AC', type: 'all-clear', variant: 'destructive' },
    { label: '⌫', type: 'backspace', variant: 'destructive' },

    { label: 'xʸ', type: 'op', value: '^', variant: 'secondary' },
    { label: 'log', type: 'func', variant: 'secondary' },
    { label: '7', type: 'char' },
    { label: '8', type: 'char' },
    { label: '9', type: 'char' },

    { label: 'eˣ', type: 'func_imm', fn: (x:number) => Math.exp(x), variant: 'secondary' },
    { label: 'ln', type: 'func', variant: 'secondary' },
    { label: '4', type: 'char' },
    { label: '5', type: 'char' },
    { label: '6', type: 'char' },

    { label: '1/x', type: 'func_imm', fn: (x:number) => 1/x, variant: 'secondary' },
    { label: 'log_b', type: 'func', value: 'log_', variant: 'secondary' },
    { label: '1', type: 'char' },
    { label: '2', type: 'char' },
    { label: '3', type: 'char' },
    
    { label: '÷', type: 'op', variant: 'accent' },
    { label: '×', type: 'op', variant: 'accent' },
    { label: '-', type: 'op', variant: 'accent' },
    { label: '+', type: 'op', variant: 'accent' },
    { label: '=', type: 'equals', variant: 'default' },

    { label: '0', type: 'char' },
    { label: '.', type: 'char' },
  ];

  const renderButton = (btnConfig: any) => {
    const { label, type, value, variant, fn } = btnConfig;

    let onClick;
    switch (type) {
      case 'op': onClick = () => handleOperatorClick(value || label); break;
      case 'char': onClick = () => handleButtonClick(label); break;
      case 'func': onClick = () => handleFunctionClick(value || label); break;
      case 'func_imm': onClick = () => applyImmediateFunction(fn, label); break;
      case 'clear': onClick = handleClear; break;
      case 'all-clear': onClick = handleAllClear; break;
      case 'backspace': onClick = handleBackspace; break;
      case 'equals': onClick = handleEquals; break;
      default: onClick = () => handleButtonClick(label);
    }
    
    return <Button key={label} variant={variant || 'outline'} className="h-12 text-base" onClick={onClick}>{label}</Button>;
  }

  return (
    <Card className="shadow-lg max-w-md mx-auto">
        <CardContent className="p-2">
            <Input 
                readOnly 
                value={displayValue} 
                className="mb-2 h-16 text-right text-4xl font-mono bg-muted" 
                aria-label="Calculator display"
            />
            <div className="grid grid-cols-5 gap-2">
                {buttonLayout.map(renderButton)}
                <div className="col-span-2">{renderButton({ label: '0', type: 'char' })}</div>
                {renderButton({ label: '.', type: 'char' })}
            </div>
        </CardContent>
    </Card>
  );
};

export default ScientificCalculator;
