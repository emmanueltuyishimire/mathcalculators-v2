"use client";
import React, { useState, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { X, ArrowRight, RefreshCw, Replace, Copy } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type Matrix = number[][];

// #region Matrix Logic
const getMinor = (matrix: Matrix, row: number, col: number): Matrix =>
  matrix.filter((_, r) => r !== row).map(r => r.filter((_, c) => c !== col));

const determinant = (matrix: Matrix): number => {
  const n = matrix.length;
  if (n === 0) return 1;
  if (n !== matrix[0].length) throw new Error("Matrix must be square.");
  if (n === 1) return matrix[0][0];
  if (n === 2) return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];

  let det = 0;
  for (let j = 0; j < n; j++) {
    det += matrix[0][j] * Math.pow(-1, j) * determinant(getMinor(matrix, 0, j));
  }
  return det;
};

const cofactor = (matrix: Matrix): Matrix => {
    if (matrix.length !== matrix[0].length) throw new Error("Matrix must be square.");
    return matrix.map((row, r) =>
        row.map((_, c) => Math.pow(-1, r + c) * determinant(getMinor(matrix, r, c)))
    );
};

const transpose = (matrix: Matrix): Matrix => {
  if (matrix.length === 0) return [];
  return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
};

const multiplyMatrices = (a: Matrix, b: Matrix): Matrix => {
    const rowsA = a.length, colsA = a[0].length, rowsB = b.length, colsB = b[0].length;
    if (colsA !== rowsB) throw new Error("Columns of A must match rows of B.");
    
    let result: Matrix = Array(rowsA).fill(0).map(() => Array(colsB).fill(0));
    for (let i = 0; i < rowsA; i++) {
        for (let j = 0; j < colsB; j++) {
            for (let k = 0; k < colsA; k++) {
                result[i][j] += a[i][k] * b[k][j];
            }
        }
    }
    return result;
};
// #endregion

const MatrixInput = ({
  matrix,
  onMatrixChange,
  rows,
  cols,
  onRowsChange,
  onColsChange,
  title,
  idPrefix
}: {
  matrix: Matrix;
  onMatrixChange: (matrix: Matrix) => void;
  rows: number;
  cols: number;
  onRowsChange: (rows: number) => void;
  onColsChange: (cols: number) => void;
  title: string;
  idPrefix: string;
}) => {
  const handleInputChange = (rowIndex: number, colIndex: number, value: string) => {
    const newMatrix = matrix.map((row, rIdx) => 
      rIdx === rowIndex ? row.map((cell, cIdx) => cIdx === colIndex ? (parseFloat(value) || 0) : cell) : row
    );
    onMatrixChange(newMatrix);
  };
  
  const fillMatrix = (value: number | 'random') => {
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
      </CardHeader>
      <CardContent className="space-y-2 p-2 md:p-4">
        <div className="flex items-center gap-1 md:gap-2">
          <Label htmlFor={`${idPrefix}-rows`} className="text-xs">Rows</Label>
          <Input
            id={`${idPrefix}-rows`}
            type="number"
            min="1"
            max="8"
            value={rows}
            onChange={(e) => onRowsChange(parseInt(e.target.value))}
            className="w-12 h-8 md:w-16"
          />
          <X className="h-4 w-4 text-muted-foreground" />
          <Label htmlFor={`${idPrefix}-cols`} className="text-xs">Cols</Label>
          <Input
            id={`${idPrefix}-cols`}
            type="number"
            min="1"
            max="8"
            value={cols}
            onChange={(e) => onColsChange(parseInt(e.target.value))}
            className="w-12 h-8 md:w-16"
          />
        </div>
        <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
          {matrix.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <Input
                key={`${rowIndex}-${colIndex}`}
                type="number"
                value={cell}
                onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                className="min-w-[2.5rem] h-8 text-center text-sm md:min-w-[3.5rem] md:h-9"
              />
            ))
          )}
        </div>
        <div className="flex flex-wrap gap-1 md:gap-2">
          <Button variant="outline" size="xs" onClick={() => fillMatrix(0)}>Clear</Button>
          <Button variant="outline" size="xs" onClick={() => fillMatrix(1)}>All 1s</Button>
          <Button variant="outline" size="xs" onClick={() => fillMatrix('random')}>Rand</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default function MatrixCalculator() {
  const { toast } = useToast();
  const [rowsA, setRowsA] = useState(3);
  const [colsA, setColsA] = useState(3);
  const [matrixA, setMatrixA] = useState<Matrix>(() => Array(3).fill(0).map(() => Array(3).fill(0)));

  const [rowsB, setRowsB] = useState(3);
  const [colsB, setColsB] = useState(3);
  const [matrixB, setMatrixB] = useState<Matrix>(() => Array(3).fill(0).map(() => Array(3).fill(0)));
  
  const [resultMatrix, setResultMatrix] = useState<Matrix | null>(null);
  const [resultScalar, setResultScalar] = useState<number | string | null>(null);

  const resizeMatrix = (newRows: number, newCols: number, currentMatrix: Matrix): Matrix => {
      newRows = Math.max(1, Math.min(newRows, 8));
      newCols = Math.max(1, Math.min(newCols, 8));
      const newMatrix = Array(newRows).fill(0).map(() => Array(newCols).fill(0));
      for(let i=0; i<Math.min(newRows, currentMatrix.length); i++) {
        for (let j = 0; j < Math.min(newCols, currentMatrix[0]?.length || 0); j++) {
            newMatrix[i][j] = currentMatrix[i][j];
        }
      }
      return newMatrix;
  };
  
  const handleRowsAChange = (newRows: number) => {
    setRowsA(newRows);
    setMatrixA(resizeMatrix(newRows, colsA, matrixA));
  };
  const handleColsAChange = (newCols: number) => {
    setColsA(newCols);
    setMatrixA(resizeMatrix(rowsA, newCols, matrixA));
  };

  const handleRowsBChange = (newRows: number) => {
    setRowsB(newRows);
    setMatrixB(resizeMatrix(newRows, colsB, matrixB));
  };
  const handleColsBChange = (newCols: number) => {
    setColsB(newCols);
    setMatrixB(resizeMatrix(rowsB, newCols, matrixB));
  };
  
  const handleSwap = () => {
    const tempMatrixA = JSON.parse(JSON.stringify(matrixA));
    const tempRowsA = rowsA;
    const tempColsA = colsA;

    setMatrixA(JSON.parse(JSON.stringify(matrixB)));
    setRowsA(rowsB);
    setColsA(colsB);

    setMatrixB(tempMatrixA);
    setRowsB(tempRowsA);
    setColsB(tempColsA);
  };

  const handleOperation = (operation: 'add' | 'subtract' | 'multiply') => {
      setResultMatrix(null);
      setResultScalar(null);
      
      try {
        let result: Matrix;
        if (operation === 'add' || operation === 'subtract') {
            if (rowsA !== rowsB || colsA !== colsB) {
                throw new Error("Matrices must have the same dimensions for addition/subtraction.");
            }
            result = Array(rowsA).fill(0).map((_, i) =>
                Array(colsA).fill(0).map((_, j) =>
                    operation === 'add' ? matrixA[i][j] + matrixB[i][j] : matrixA[i][j] - matrixB[i][j]
                )
            );
        } else { // multiply
            result = multiplyMatrices(matrixA, matrixB);
        }
        setResultMatrix(result);
      } catch (e: any) {
        toast({ variant: "destructive", title: "Operation Error", description: e.message });
      }
  }

  const handleUnaryOperation = (matrixRef: 'A' | 'B', operation: 'transpose' | 'power' | 'determinant' | 'inverse', powerValue?: number) => {
    setResultMatrix(null);
    setResultScalar(null);
    const matrix = matrixRef === 'A' ? matrixA : matrixB;

    try {
        if (['determinant', 'inverse', 'power'].includes(operation) && matrix.length !== matrix[0]?.length) {
            throw new Error("Matrix must be square for this operation.");
        }

        switch (operation) {
            case 'transpose':
                setResultMatrix(transpose(matrix));
                break;
            case 'power':
                if (powerValue === undefined || !Number.isInteger(powerValue) || powerValue < 0) {
                    throw new Error("Power must be a non-negative integer.");
                }
                if (powerValue === 0) {
                    // Identity matrix
                    const identity = Array(matrix.length).fill(0).map((_, i) => Array(matrix.length).fill(0).map((_, j) => i === j ? 1 : 0));
                    setResultMatrix(identity);
                    return;
                }
                let res = matrix;
                for (let i = 1; i < powerValue; i++) {
                    res = multiplyMatrices(res, matrix);
                }
                setResultMatrix(res);
                break;
            case 'determinant':
                setResultScalar(`Determinant: ${determinant(matrix)}`);
                break;
            case 'inverse':
                const det = determinant(matrix);
                if (det === 0) {
                    throw new Error("Matrix is not invertible (determinant is 0).");
                }
                const adj = transpose(cofactor(matrix));
                const inv = adj.map(row => row.map(cell => cell / det));
                setResultMatrix(inv);
                break;
        }
    } catch(e: any) {
         toast({ variant: "destructive", title: "Operation Error", description: e.message });
    }
  }

  const handleCopyToA = () => {
    if (resultMatrix) {
      setMatrixA(resultMatrix);
      setRowsA(resultMatrix.length);
      setColsA(resultMatrix[0]?.length || 0);
      toast({ title: "Result copied to Matrix A" });
    }
  };

  const handleCopyToB = () => {
    if (resultMatrix) {
      setMatrixB(resultMatrix);
      setRowsB(resultMatrix.length);
      setColsB(resultMatrix[0]?.length || 0);
      toast({ title: "Result copied to Matrix B" });
    }
  };
  
  const PowerDialog = ({matrixRef}: {matrixRef: 'A' | 'B'}) => {
    const [power, setPower] = useState(2);
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="secondary" size="xs">Power</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle>Raise Matrix {matrixRef} to Power</DialogTitle>
                <DialogDescription>
                    Enter an integer exponent. The matrix must be square.
                </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="exponent" className="text-right">
                        Exponent
                        </Label>
                        <Input
                        id="exponent"
                        type="number"
                        value={power}
                        onChange={(e) => setPower(parseInt(e.target.value))}
                        className="col-span-3"
                        step="1"
                        min="0"
                        />
                    </div>
                </div>
                <DialogFooter>
                  <DialogTrigger asChild>
                    <Button onClick={() => handleUnaryOperation(matrixRef, 'power', power)}>Calculate</Button>
                   </DialogTrigger>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2 md:gap-4">
        <div className='space-y-2'>
            <MatrixInput
              title="Matrix A"
              idPrefix="A"
              matrix={matrixA}
              onMatrixChange={setMatrixA}
              rows={rowsA}
              cols={colsA}
              onRowsChange={handleRowsAChange}
              onColsChange={handleColsAChange}
            />
            <div className="flex flex-wrap gap-1 md:gap-2">
                <Button variant="secondary" size="xs" onClick={() => handleUnaryOperation('A', 'transpose')}>Transpose</Button>
                <PowerDialog matrixRef="A" />
                <Button variant="secondary" size="xs" onClick={() => handleUnaryOperation('A', 'determinant')}>Det</Button>
                <Button variant="secondary" size="xs" onClick={() => handleUnaryOperation('A', 'inverse')}>Inverse</Button>
            </div>
        </div>
        <div className='space-y-2'>
            <MatrixInput
              title="Matrix B"
              idPrefix="B"
              matrix={matrixB}
              onMatrixChange={setMatrixB}
              rows={rowsB}
              cols={colsB}
              onRowsChange={handleRowsBChange}
              onColsChange={handleColsBChange}
            />
            <div className="flex flex-wrap gap-1 md:gap-2">
                <Button variant="secondary" size="xs" onClick={() => handleUnaryOperation('B', 'transpose')}>Transpose</Button>
                <PowerDialog matrixRef="B" />
                <Button variant="secondary" size="xs" onClick={() => handleUnaryOperation('B', 'determinant')}>Det</Button>
                <Button variant="secondary" size="xs" onClick={() => handleUnaryOperation('B', 'inverse')}>Inverse</Button>
            </div>
        </div>
      </div>
      
      <Card>
        <CardHeader className="p-2 md:p-4">
          <CardTitle className="text-base md:text-lg">Operations</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-1 md:gap-2 p-2 md:p-4">
            <Button size="xs" onClick={() => handleOperation('add')}>A + B</Button>
            <Button size="xs" onClick={() => handleOperation('subtract')}>A - B</Button>
            <Button size="xs" onClick={() => handleOperation('multiply')}>A × B</Button>
            <Button size="xs" onClick={handleSwap} variant="outline"><Replace className="mr-1 h-3 w-3 md:mr-2 md:h-4 md:w-4" /> A ↔ B</Button>
        </CardContent>
      </Card>
      
      {(resultMatrix || resultScalar !== null) && (
        <Card>
          <CardHeader className="p-2 md:p-4">
            <CardTitle className="text-base md:text-lg">Result</CardTitle>
          </CardHeader>
          <CardContent className="p-2 md:p-4">
            {resultMatrix && (
              <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${resultMatrix[0].length}, minmax(0, 1fr))` }}>
                {resultMatrix.map((row, rowIndex) =>
                  row.map((cell, colIndex) => (
                    <Input
                      key={`result-${rowIndex}-${colIndex}`}
                      type="text"
                      readOnly
                      value={cell.toFixed(3)}
                      className="min-w-[2.5rem] h-8 text-center bg-muted text-sm md:min-w-[3.5rem] md:h-9"
                      aria-label={`Result matrix cell at row ${rowIndex+1} column ${colIndex+1}`}
                    />
                  ))
                )}
              </div>
            )}
            {resultScalar !== null && (
                <p className="text-lg font-mono p-2 bg-muted rounded-md">{resultScalar}</p>
            )}
          </CardContent>
           {resultMatrix && (
            <CardFooter className="flex flex-wrap gap-2 p-2 md:p-4">
                <Button variant="outline" size="sm" onClick={handleCopyToA}><Copy className="mr-2 h-4 w-4"/> Copy to A</Button>
                <Button variant="outline" size="sm" onClick={handleCopyToB}><Copy className="mr-2 h-4 w-4"/> Copy to B</Button>
            </CardFooter>
           )}
        </Card>
      )}
    </div>
  );
}
