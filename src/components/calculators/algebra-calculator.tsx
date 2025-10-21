
"use client";

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type AngleMode = 'DEG' | 'RAD';

export default function AlgebraCalculator() {
  const [display, setDisplay] = useState('d/dx(x^3)');
  const { toast } = useToast();
  const [angleMode, setAngleMode] = useState<AngleMode>('DEG');

  const handleKeyClick = (key: string) => {
    if (key === 'AC') {
      setDisplay('');
      return;
    }
    if (key === 'DEL') {
      setDisplay(prev => prev.slice(0, -1));
      return;
    }
    if (key === '=') {
      evaluate();
      return;
    }
    // For mocked functions, just append the function name
    if (['SOLVE', 'EXPAND', 'FACTOR', 'SIMP', 'SUBS', 'd/dx', '∫dx', 'lim'].includes(key)) {
       setDisplay(`${key}(`);
       return;
    }
     if (key === 'DEG/RAD') {
      setAngleMode(prev => prev === 'DEG' ? 'RAD' : 'DEG');
      toast({ title: `Mode changed to ${angleMode === 'DEG' ? 'Radians' : 'Degrees'}`});
      return;
    }

    setDisplay(prev => prev + key);
  };
  
  const evaluate = () => {
    // This is a mock evaluation for demonstration purposes.
    // A real implementation would require a full computer algebra system (CAS).
    const expression = display.toLowerCase().replace(/\s/g, '');
    
    // Mocked symbolic functions
    const mockSymbolic: {[key: string]: string} = {
        'expand((x+2)*(x+3))': 'x^2 + 5x + 6',
        'factor(x^2+5x+6)': '(x+2)*(x+3)',
        'd/dx(x^3)': '3x^2',
        'd/dx(x^2+2x)': '2x+2',
        '∫dx(3x^2)': 'x^3 + C',
        'lim(sin(x)/x,x->0)': '1',
        'subs(x^2+3x,x=4)': '28',
    }

    if (mockSymbolic[expression]) {
        setDisplay(mockSymbolic[expression]);
        toast({title: "Symbolic Evaluation", description: "This is a mocked result."});
        return;
    }

    // Mocked equation solver
    const solveMatch = expression.match(/solve\((.*)=(.+),([a-z])\)/);
    if (solveMatch) {
        // Example: solve(x^2-4=0,x)
        if(solveMatch[1] === 'x^2-4' && solveMatch[2] === '0') {
            setDisplay('x = ±2');
            toast({title: "Equation Solved", description: "This is a mocked solver result."});
            return;
        }
        // Basic linear solver: ax+b=c
        const eq = solveMatch[1];
        const result = parseFloat(solveMatch[2]);
        const variable = solveMatch[3];
        const xMatch = eq.match(new RegExp(`(-?\\d*\\.?\\d*)${variable}`));
        const bMatch = eq.match(/[+\-]\s*(\d+\.?\d*)/);
        if (xMatch && bMatch && !isNaN(result)) {
            const a = xMatch[1] ? parseFloat(xMatch[1]) : 1;
            const b = parseFloat(bMatch[0].replace(/\s/g, ''));
            const x = (result - b) / a;
            setDisplay(`${variable} = ${x}`);
            toast({title: "Equation Solved", description: "This is a mocked linear solver."});
            return;
        }
    }

    try {
      // Fallback to numeric evaluation for simple arithmetic
      const numericExpression = expression.replace(/\^/g, '**').replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-');
      // Using new Function for safer eval
      const result = new Function('return ' + numericExpression)();
      setDisplay(String(result));
    } catch (e) {
      toast({ variant: 'destructive', title: 'Error', description: 'Could not evaluate expression.' });
    }
  };


  const buttonLayout = [
    ['SHIFT', 'ALPHA', 'MODE', 'SETUP', 'ON'],
    ['x', 'y', 'z', 'f(x)', 'SOLVE', 'EXPAND', 'FACTOR', 'SIMP'],
    ['(', ')', '=', '→', 'SUBS', 'd/dx', '∫dx', 'lim'],
    ['7', '8', '9', '÷', 'x²', 'x³', 'xʸ', '√x'],
    ['4', '5', '6', '×', 'nCr', 'nPr', 'x!', 'mod'],
    ['1', '2', '3', '−', 'A', 'B', 'C', 'D'],
    ['0', '.', ',', '+', 'ANS', 'STO', 'RCL', 'EXP'],
    ['AC', 'DEL', 'GRAPH', '↑', '↓', '←', '►', 'DEG/RAD'],
  ];

  const colorMap: { [key: string]: string } = {
    'ON': 'bg-red-600', 'AC': 'bg-red-600', 'DEL': 'bg-red-600',
    'SHIFT': 'bg-yellow-500 text-black', 'ALPHA': 'bg-purple-500',
    '÷': 'bg-gray-500', '×': 'bg-gray-500', '−': 'bg-gray-500', '+': 'bg-gray-500', '=': 'bg-blue-600',
    'SOLVE': 'bg-blue-500', 'EXPAND': 'bg-blue-500', 'FACTOR': 'bg-blue-500', 'SIMP': 'bg-blue-500',
    'DEG/RAD': 'bg-green-600'
  };

  const disabledKeys = ['SHIFT', 'ALPHA', 'MODE', 'SETUP', 'ON', 'GRAPH', '↑', '↓', '←', '►', 'STO', 'RCL', 'nCr', 'nPr', 'mod', '→', 'f(x)', 'SIMP', 'ANS', 'EXP', 'x²', 'x³', 'xʸ', '√x', 'x!'];


  return (
    <Card className="shadow-lg p-2 bg-gray-800 border border-gray-700">
      <CardContent className="p-1">
        <div className="w-full h-16 bg-gray-900 rounded-md mb-2 p-2 text-right text-2xl font-mono text-white flex items-center justify-end relative overflow-x-auto">
          <span className="absolute top-1 left-2 text-xs font-bold text-green-400">{angleMode}</span>
          {display}
        </div>
        <div className="grid grid-cols-8 gap-1">
          {buttonLayout.flat().map((key, index) => (
            <Button
              key={`${key}-${index}`}
              onClick={() => handleKeyClick(key)}
              disabled={disabledKeys.includes(key)}
              className={cn(
                'h-9 text-xs font-sans',
                colorMap[key] || 'bg-gray-700',
                'text-white hover:bg-gray-600 active:bg-gray-500',
                (key === '=' || key === 'AC' || key === 'DEL') && 'col-span-1',
              )}
            >
              {key}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
