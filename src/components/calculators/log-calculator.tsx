
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
        // Silently add closing parentheses
        const open = displayValue.split('(').length - 1;
        const close = displayValue.split(')').length - 1;
        expression += ')'.repeat(open - close);
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
    
    return <Button key={label} variant={variant || 'outline'} size="sm" className="h-10 text-base" onClick={onClick}>{label}</Button>;
  }

  return (
    <Card className="shadow-lg max-w-sm mx-auto">
        <CardContent className="p-2">
            <Input 
                readOnly 
                value={displayValue} 
                className="mb-2 h-14 text-right text-3xl font-mono bg-muted" 
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


const LogEquationCalculator = () => {
    const { toast } = useToast();
    const [base, setBase] = useState('');
    const [number, setNumber] = useState('8');
    const [result, setResult] = useState('3');
    
    const calculate = () => {
        const baseVal = base.toLowerCase() === 'e' ? Math.E : parseFloat(base);
        const numberVal = parseFloat(number);
        const resultVal = parseFloat(result);

        const knownValues = [!isNaN(baseVal), !isNaN(numberVal), !isNaN(resultVal)].filter(Boolean).length;

        if (knownValues !== 2) {
            if (base || number || result) {
                toast({
                    variant: 'destructive',
                    title: 'Invalid Input',
                    description: 'Please provide exactly two values to solve for the third.',
                });
            }
            return;
        }

        try {
            if (result === '') { // Calculate result (y)
                if(isNaN(baseVal) || isNaN(numberVal)) return;
                if(baseVal <= 0 || baseVal === 1 || numberVal <= 0) throw new Error("Logarithm requires base > 0 (and not 1) and number > 0.");
                setResult((Math.log(numberVal) / Math.log(baseVal)).toString());
            } else if (number === '') { // Calculate number (x)
                if(isNaN(baseVal) || isNaN(resultVal)) return;
                setNumber(Math.pow(baseVal, resultVal).toString());
            } else { // Calculate base (b)
                if(isNaN(numberVal) || isNaN(resultVal)) return;
                if(numberVal < 0 && resultVal % 2 === 0) throw new Error("Cannot take an even root of a negative number.");
                if(numberVal === 1 && resultVal !== 0) throw new Error("If number is 1, result must be 0.");
                if(numberVal !== 1 && resultVal === 0) throw new Error("If result is 0, number must be 1.");
                setBase(Math.pow(numberVal, 1 / resultVal).toString());
            }
        } catch (e: any) {
            toast({
                variant: 'destructive',
                title: 'Calculation Error',
                description: e.message,
            });
        }
    };
    
    useEffect(() => {
        const knownCount = [base, number, result].filter(v => v !== '').length;
        if (knownCount === 2) {
            calculate();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [base, number, result]);

    const handleClear = () => {
        setBase('');
        setNumber('');
        setResult('');
    }

    return (
        <Card>
            <CardHeader className="p-4">
                <CardTitle>Logarithm Equation Solver</CardTitle>
                <CardDescription>Solves for any variable in the equation log<sub>b</sub>(x) = y. Provide any two values.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-4">
                <div className="flex flex-wrap items-end gap-2 text-lg font-semibold">
                    <span className="mb-2">log</span>
                    <div className="relative">
                        <Input id="base" value={base} onChange={(e) => setBase(e.target.value)} className="w-20 text-sm text-center pt-5"/>
                        <Label htmlFor="base" className="absolute text-xs left-1/2 -translate-x-1/2 top-1 text-muted-foreground">base (b)</Label>
                    </div>
                     <div className="relative">
                        <Input id="number" value={number} onChange={(e) => setNumber(e.target.value)} className="w-24 text-center"/>
                        <Label htmlFor="number" className="absolute text-xs left-1/2 -translate-x-1/2 -top-4 text-muted-foreground">number (x)</Label>
                    </div>
                    <span>=</span>
                     <div className="relative">
                        <Input id="result" value={result} onChange={(e) => setResult(e.target.value)} className="w-24 text-center"/>
                        <Label htmlFor="result" className="absolute text-xs left-1/2 -translate-x-1/2 -top-4 text-muted-foreground">result (y)</Label>
                    </div>
                </div>
                 <div className="flex gap-2">
                    <Button onClick={calculate} className="w-full">Calculate</Button>
                    <Button onClick={handleClear} variant="outline" className="w-full">Clear</Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default function LogCalculator() {
    return (
        <div className="space-y-4">
            <ScientificCalculator />
            <div className="py-4">
                <LogEquationCalculator />
            </div>
        </div>
    )
}
