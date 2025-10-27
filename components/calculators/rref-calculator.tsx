
"use client";
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Matrix = (number | string)[][];

const MatrixDisplay = ({
  matrix,
  rows,
  cols,
  title,
  isInput = false,
  onMatrixChange,
  onRowsChange,
  onColsChange,
}: {
  matrix: Matrix;
  rows: number;
  cols: number;
  title: string;
  isInput?: boolean;
  onMatrixChange?: (matrix: Matrix) => void;
  onRowsChange?: (rows: number) => void;
  onColsChange?: (cols: number) => void;
}) => {
  const handleInputChange = (rowIndex: number, colIndex: number, value: string) => {
    if (!onMatrixChange) return;
    const newMatrix = matrix.map((row, rIdx) => 
      rIdx === rowIndex ? row.map((cell, cIdx) => cIdx === colIndex ? value : cell) : row
    );
    onMatrixChange(newMatrix);
  };
  
  const fillMatrix = (value: number | 'random') => {
    if (!onMatrixChange) return;
    const newMatrix = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () =>
        value === 'random' ? Math.floor(Math.random() * 10) : value
      )
    );
    onMatrixChange(newMatrix);
  };

  return (
    <Card>
      <CardHeader className="p-2 md:p-4">
        <CardTitle className="text-base md:text-lg">{title}</CardTitle>
        {isInput && onRowsChange && onColsChange && (
          <div className="flex items-center gap-1 pt-2">
            <Label htmlFor="rows" className="text-xs">Rows</Label>
            <Input id="rows" type="number" min="1" max="8" value={rows} onChange={(e) => onRowsChange(parseInt(e.target.value))} className="h-8 w-14" />
            <Label htmlFor="cols" className="text-xs">Cols</Label>
            <Input id="cols" type="number" min="2" max="9" value={cols} onChange={(e) => onColsChange(parseInt(e.target.value))} className="h-8 w-14" />
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-2 p-2 md:p-4">
        <div className="grid gap-1 overflow-x-auto" style={{ gridTemplateColumns: `repeat(${cols}, minmax(2.5rem, 1fr))` }}>
          {matrix.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <Input
                key={`${rowIndex}-${colIndex}`}
                type="text"
                value={cell}
                readOnly={!isInput}
                onChange={(e) => isInput && handleInputChange(rowIndex, colIndex, e.target.value)}
                className={`h-9 text-center text-xs ${colIndex === cols - 1 ? 'bg-muted border-l-2 border-dashed' : ''} ${!isInput ? 'bg-muted' : ''}`}
                aria-label={`Row ${rowIndex + 1}, Column ${colIndex + 1}`}
              />
            ))
          )}
        </div>
        {isInput && (
          <div className="flex flex-wrap gap-1">
            <Button variant="outline" size="xs" onClick={() => fillMatrix(0)}>Clear</Button>
            <Button variant="outline" size="xs" onClick={() => fillMatrix(1)}>1s</Button>
            <Button variant="outline" size="xs" onClick={() => fillMatrix('random')}>Rand</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};


const parseMatrix = (matrix: Matrix): number[][] => {
    return matrix.map((row, r) => row.map((cell, c) => {
        try {
            const cellStr = String(cell);
            if(cellStr.includes('/')) {
                const parts = cellStr.split('/');
                if(parts.length === 2) {
                    const num = parseFloat(parts[0]);
                    const den = parseFloat(parts[1]);
                    if(den === 0) throw new Error(`Division by zero in cell (${r+1},${c+1}).`);
                    return num / den;
                }
            }
            const val = parseFloat(cellStr);
            if (isNaN(val)) throw new Error(`Invalid number in cell (${r+1},${c+1}).`);
            return val;
        } catch {
             throw new Error(`Invalid expression in cell (${r+1},${c+1}).`);
        }
    }));
}


export default function RrefCalculator() {
  const { toast } = useToast();
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(4);
  const [matrix, setMatrix] = useState<Matrix>(() => Array(3).fill(0).map(() => Array(4).fill('')));
  const [history, setHistory] = useState<Matrix[]>([]);
  const [solution, setSolution] = useState<string>('');
  const [rrefMatrix, setRrefMatrix] = useState<Matrix | null>(null);

  const [row1, setRow1] = useState('1');
  const [row2, setRow2] = useState('2');
  const [scalar, setScalar] = useState('1');

  const resizeMatrix = useCallback((newRows: number, newCols: number, currentMatrix: Matrix): Matrix => {
    newRows = Math.max(1, Math.min(newRows, 8));
    newCols = Math.max(2, Math.min(newCols, 9));
    const newMatrix: Matrix = Array(newRows).fill(0).map(() => Array(newCols).fill(''));
    for (let i = 0; i < Math.min(newRows, currentMatrix.length); i++) {
      for (let j = 0; j < Math.min(newCols, currentMatrix[0]?.length || 0); j++) {
        newMatrix[i][j] = currentMatrix[i][j];
      }
    }
    return newMatrix;
  }, []);

  const handleRowsChange = (newRows: number) => {
    setRows(newRows);
    setMatrix(m => resizeMatrix(newRows, cols, m));
  };
  const handleColsChange = (newCols: number) => {
    setCols(newCols);
    setMatrix(m => resizeMatrix(rows, newCols, m));
  };

  const updateCurrentMatrix = (newMatrix: Matrix, toastTitle: string, toastDescription: string) => {
    setHistory(prev => [...prev, matrix]);
    setMatrix(newMatrix.map(row => row.map(cell => typeof cell === 'number' ? cell.toFixed(4).replace(/\.?0+$/, '') : cell)));
    setRrefMatrix(null);
    setSolution('');
    toast({ title: toastTitle, description: toastDescription });
  };
  
  const handleRowOperation = (op: 'swap' | 'scale' | 'add') => {
    try {
        let numMatrix = parseMatrix(matrix);
        const r1 = parseInt(row1) - 1;
        const r2 = parseInt(row2) - 1;
        const k = parseFloat(scalar);

        if (r1 < 0 || r1 >= rows || (op !== 'scale' && (r2 < 0 || r2 >= rows))) {
            throw new Error("Invalid row index selected.");
        }

        switch (op) {
            case 'swap':
                if (r1 === r2) return;
                [numMatrix[r1], numMatrix[r2]] = [numMatrix[r2], numMatrix[r1]];
                updateCurrentMatrix(numMatrix, "Rows Swapped", `Row ${r1+1} and Row ${r2+1} were exchanged.`);
                break;
            case 'scale':
                if (isNaN(k)) throw new Error("Invalid scalar value.");
                numMatrix[r1] = numMatrix[r1].map(cell => cell * k);
                updateCurrentMatrix(numMatrix, "Row Scaled", `Row ${r1+1} was multiplied by ${k}.`);
                break;
            case 'add':
                if (isNaN(k)) throw new Error("Invalid scalar value.");
                numMatrix[r1] = numMatrix[r1].map((cell, j) => cell + k * numMatrix[r2][j]);
                updateCurrentMatrix(numMatrix, "Row Operation", `${k} * R${r2+1} was added to R${r1+1}.`);
                break;
        }

    } catch (e: any) {
        toast({ variant: "destructive", title: "Operation Error", description: e.message });
    }
  }


  const handleRREF = () => {
    try {
        let numMatrix = parseMatrix(matrix);
        setHistory(prev => [...prev, matrix]);
        
        let lead = 0;
        for (let r = 0; r < rows; r++) {
            if (lead >= cols) break;
            let i = r;
            while (Math.abs(numMatrix[i][lead]) < 1e-9) {
                i++;
                if (i === rows) {
                    i = r;
                    lead++;
                    if (cols === lead) {
                        const finalRrefMatrix = numMatrix.map(row => row.map(cell => Number(cell.toFixed(10))));
                        setRrefMatrix(finalRrefMatrix.map(row => row.map(cell => cell.toString())));
                        analyzeSolution(finalRrefMatrix);
                        toast({ title: "RREF Calculated", description: "The matrix is now in row-reduced echelon form." });
                        return;
                    };
                }
            }
            [numMatrix[i], numMatrix[r]] = [numMatrix[r], numMatrix[i]];
            let val = numMatrix[r][lead];
            for (let j = 0; j < cols; j++) {
                numMatrix[r][j] /= val;
            }
            for (let i = 0; i < rows; i++) {
                if (i === r) continue;
                val = numMatrix[i][lead];
                for (let j = 0; j < cols; j++) {
                    numMatrix[i][j] -= val * numMatrix[r][j];
                }
            }
            lead++;
        }
        
        const finalRrefMatrix = numMatrix.map(row => row.map(cell => parseFloat(cell.toPrecision(10))));
        setRrefMatrix(finalRrefMatrix.map(row => row.map(cell => cell.toString())));
        analyzeSolution(finalRrefMatrix);
        toast({ title: "RREF Calculated", description: "The matrix is now in row-reduced echelon form." });
    } catch(e: any) {
        toast({ variant: "destructive", title: "Calculation Error", description: e.message });
    }
  };

  const analyzeSolution = (rrefMtx: number[][]) => {
    const numVars = cols - 1;
    let inconsistent = false;

    for(const row of rrefMtx) {
        const lhs = row.slice(0, numVars);
        const rhs = row[numVars];
        const isLhsZero = lhs.every(val => Math.abs(val) < 1e-9);
        if (isLhsZero && Math.abs(rhs) > 1e-9) {
            inconsistent = true;
            break;
        }
    }

    if (inconsistent) {
        setSolution("No solution exists (inconsistent system).");
        return;
    }
    
    let pivotCount = 0;
    const pivotCols: boolean[] = Array(numVars).fill(false);
    for(let r=0; r<rows; r++) {
       const firstNonZero = rrefMtx[r].findIndex(val => Math.abs(val) > 1e-9);
       if(firstNonZero !== -1 && firstNonZero < numVars) {
           pivotCount++;
           pivotCols[firstNonZero] = true;
       }
    }

    if (pivotCount < numVars) {
        setSolution(`Infinite solutions. The system has ${numVars - pivotCount} free variable(s).`);
    } else {
        const solParts = [];
        for (let i = 0; i < numVars; i++) {
            solParts.push(`x_${i + 1} = ${rrefMtx[i][numVars].toFixed(4)}`);
        }
        setSolution(`Unique solution: ${solParts.join(', ')}`);
    }
  }

  const handleUndo = () => {
    if (history.length > 0) {
      const lastState = history[history.length - 1];
      setHistory(history.slice(0, -1));
      setMatrix(lastState);
      setRrefMatrix(null);
      setSolution('');
    }
  }

  const rowOptions = Array.from({ length: rows }, (_, i) => String(i + 1));

  return (
    <div className="space-y-2">
      <MatrixDisplay
        matrix={matrix}
        rows={rows}
        cols={cols}
        title="Augmented Matrix [A|b]"
        isInput={true}
        onMatrixChange={setMatrix}
        onRowsChange={handleRowsChange}
        onColsChange={handleColsChange}
      />
      
      <Card>
        <CardHeader className="p-2 md:p-4">
          <CardTitle className="text-base md:text-lg">Operations</CardTitle>
          <CardDescription className="text-xs md:text-sm">Perform automatic or manual row operations.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 p-2 md:p-4">
            <div className="flex flex-wrap items-center gap-2">
                <Button onClick={handleRREF} size="sm" className="bg-accent hover:bg-accent/90" aria-label="Calculate Reduced Row Echelon Form">Calculate RREF</Button>
                <Button onClick={handleUndo} size="sm" variant="outline" disabled={history.length === 0} aria-label="Undo last operation">Undo</Button>
            </div>
            <div className="space-y-2 pt-2">
                <h4 className="font-medium text-sm">Manual Row Operations</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="flex items-center gap-1">
                        <Select value={row1} onValueChange={setRow1}>
                            <SelectTrigger className="w-24 h-9 text-xs" aria-label="Select first row for swap"><SelectValue /></SelectTrigger>
                            <SelectContent>{rowOptions.map(r => <SelectItem key={`r1-${r}`} value={r}>R{r}</SelectItem>)}</SelectContent>
                        </Select>
                        <span className="font-bold">&harr;</span>
                        <Select value={row2} onValueChange={setRow2}>
                            <SelectTrigger className="w-24 h-9 text-xs" aria-label="Select second row for swap"><SelectValue /></SelectTrigger>
                            <SelectContent>{rowOptions.map(r => <SelectItem key={`r2-${r}`} value={r}>R{r}</SelectItem>)}</SelectContent>
                        </Select>
                        <Button variant="secondary" size="sm" onClick={() => handleRowOperation('swap')} aria-label="Swap selected rows">Swap</Button>
                    </div>
                    <div className="flex items-center gap-1">
                        <Input value={scalar} onChange={e => setScalar(e.target.value)} className="w-16 h-9 text-xs" placeholder="k" aria-label="Scalar value for scaling"/>
                        <span className="font-bold">&times;</span>
                         <Select value={row1} onValueChange={setRow1}>
                            <SelectTrigger className="w-24 h-9 text-xs" aria-label="Select row to scale"><SelectValue /></SelectTrigger>
                            <SelectContent>{rowOptions.map(r => <SelectItem key={`r1-scale-${r}`} value={r}>R{r}</SelectItem>)}</SelectContent>
                        </Select>
                         <Button variant="secondary" size="sm" onClick={() => handleRowOperation('scale')} aria-label="Scale selected row">Scale</Button>
                    </div>
                     <div className="flex flex-wrap items-center gap-1 col-span-1 sm:col-span-2">
                        <Select value={row1} onValueChange={setRow1}>
                            <SelectTrigger className="w-24 h-9 text-xs" aria-label="Select target row for addition"><SelectValue /></SelectTrigger>
                            <SelectContent>{rowOptions.map(r => <SelectItem key={`r1-add-${r}`} value={r}>R{r}</SelectItem>)}</SelectContent>
                        </Select>
                        <span className="font-bold"> +</span>
                        <Input value={scalar} onChange={e => setScalar(e.target.value)} className="w-16 h-9 text-xs" placeholder="k" aria-label="Scalar value for addition"/>
                        <span className="font-bold">&times;</span>
                        <Select value={row2} onValueChange={setRow2}>
                            <SelectTrigger className="w-24 h-9 text-xs" aria-label="Select source row for addition"><SelectValue /></SelectTrigger>
                            <SelectContent>{rowOptions.map(r => <SelectItem key={`r2-add-${r}`} value={r}>R{r}</SelectItem>)}</SelectContent>
                        </Select>
                         <span className="font-bold"> &rarr; R{row1}</span>
                        <Button variant="secondary" size="sm" onClick={() => handleRowOperation('add')} aria-label="Add scaled row to another row">Add</Button>
                    </div>
                </div>
            </div>
        </CardContent>
      </Card>

      {rrefMatrix && (
        <MatrixDisplay
          matrix={rrefMatrix}
          rows={rrefMatrix.length}
          cols={rrefMatrix[0]?.length || 0}
          title="Reduced Row Echelon Form (RREF)"
        />
      )}
      
      {solution && (
        <Card>
          <CardHeader className="p-2 md:p-4">
            <CardTitle className="text-base md:text-lg">Solution Analysis</CardTitle>
          </CardHeader>
          <CardContent className="p-2 md:p-4">
            <p className="text-sm font-mono p-2 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-md">{solution}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
