
"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Replace, Copy } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Matrix = number[][];

// #region Matrix Logic
const getMinor = (matrix: Matrix, row: number, col: number): Matrix =>
  matrix.filter((_, r) => r !== row).map(r => r.filter((_, c) => c !== col));

const determinant = (matrix: Matrix): number => {
  const n = matrix.length;
  if (n === 0) return 1;
  if (n !== (matrix[0]?.length || 0)) throw new Error("Matrix must be square.");
  if (n === 1) return matrix[0][0];
  if (n === 2) return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];

  let det = 0;
  for (let j = 0; j < n; j++) {
    det += matrix[0][j] * Math.pow(-1, j) * determinant(getMinor(matrix, 0, j));
  }
  return det;
};

const cofactor = (matrix: Matrix): Matrix => {
    if (matrix.length !== (matrix[0]?.length || 0)) throw new Error("Matrix must be square.");
    return matrix.map((row, r) =>
        row.map((_, c) => Math.pow(-1, r + c) * determinant(getMinor(matrix, r, c)))
    );
};

const transpose = (matrix: Matrix): Matrix => {
  if (matrix.length === 0) return [];
  return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
};

const multiplyMatrices = (a: Matrix, b: Matrix): Matrix => {
    const rowsA = a.length, colsA = a[0]?.length || 0, rowsB = b.length, colsB = b[0]?.length || 0;
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
      <CardHeader className="p-3">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 p-3">
        <div className="flex items-center gap-2">
          <Label htmlFor={`${idPrefix}-rows`} className="text-xs">Rows</Label>
          <Input
            id={`${idPrefix}-rows`}
            type="number"
            min="1"
            max="8"
            value={rows}
            onChange={(e) => onRowsChange(parseInt(e.target.value))}
            className="h-8 w-14 text-xs"
          />
          <Label htmlFor={`${idPrefix}-cols`} className="text-xs">Cols</Label>
          <Input
            id={`${idPrefix}-cols`}
            type="number"
            min="1"
            max="8"
            value={cols}
            onChange={(e) => onColsChange(parseInt(e.target.value))}
             className="h-8 w-14 text-xs"
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
                className="h-8 text-center text-xs"
              />
            ))
          )}
        </div>
        <div className="flex flex-wrap gap-1">
          <Button variant="outline" size="xs" onClick={() => fillMatrix(0)}>Clear</Button>
          <Button variant="outline" size="xs" onClick={() => fillMatrix(1)}>1s</Button>
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
  const [matrixA, setMatrixA] = useState<Matrix>(() => Array(3).fill(0).map(() => Array(3).fill(1)));

  const [rowsB, setRowsB] = useState(3);
  const [colsB, setColsB] = useState(3);
  const [matrixB, setMatrixB] = useState<Matrix>(() => Array(3).fill(0).map(() => Array(3).fill(0)));
  
  const [resultMatrix, setResultMatrix] = useState<Matrix | null>(null);
  const [resultScalar, setResultScalar] = useState<string | null>(null);
  const [resultTitle, setResultTitle] = useState<string>('Result');

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
    const parsedRows = Math.max(1, Math.min(newRows, 8))
    setRowsA(parsedRows);
    setMatrixA(resizeMatrix(parsedRows, colsA, matrixA));
  };
  const handleColsAChange = (newCols: number) => {
    const parsedCols = Math.max(1, Math.min(newCols, 8));
    setColsA(parsedCols);
    setMatrixA(resizeMatrix(rowsA, parsedCols, matrixA));
  };

  const handleRowsBChange = (newRows: number) => {
    const parsedRows = Math.max(1, Math.min(newRows, 8));
    setRowsB(parsedRows);
    setMatrixB(resizeMatrix(parsedRows, colsB, matrixB));
  };
  const handleColsBChange = (newCols: number) => {
    const parsedCols = Math.max(1, Math.min(newCols, 8));
    setColsB(parsedCols);
    setMatrixB(resizeMatrix(rowsB, parsedCols, matrixB));
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
        let title = '';
        if (operation === 'add' || operation === 'subtract') {
            if (rowsA !== rowsB || colsA !== colsB) {
                throw new Error("Matrices must have the same dimensions for addition/subtraction.");
            }
            result = Array(rowsA).fill(0).map((_, i) =>
                Array(colsA).fill(0).map((_, j) =>
                    operation === 'add' ? matrixA[i][j] + matrixB[i][j] : matrixA[i][j] - matrixB[i][j]
                )
            );
            title = operation === 'add' ? 'A + B' : 'A - B';
        } else { // multiply
            result = multiplyMatrices(matrixA, matrixB);
            title = 'A × B';
        }
        setResultMatrix(result);
        setResultTitle(title);
      } catch (e: any) {
        toast({ variant: "destructive", title: "Operation Error", description: e.message });
      }
  }

  const handleUnaryOperation = (matrixRef: 'A' | 'B', operation: 'transpose' | 'power' | 'determinant' | 'inverse' | 'scalar', value?: number) => {
    setResultMatrix(null);
    setResultScalar(null);
    const matrix = matrixRef === 'A' ? matrixA : matrixB;

    try {
        if (['determinant', 'inverse', 'power'].includes(operation) && matrix.length !== (matrix[0]?.length || 0)) {
            throw new Error("Matrix must be square for this operation.");
        }

        let title = '';
        switch (operation) {
            case 'transpose':
                setResultMatrix(transpose(matrix));
                title = `(${matrixRef})ᵀ`;
                break;
            case 'power':
                if (value === undefined || !Number.isInteger(value) || value < 0) {
                    throw new Error("Power must be a non-negative integer.");
                }
                if (value === 0) {
                    const identity = Array(matrix.length).fill(0).map((_, i) => Array(matrix.length).fill(0).map((_, j) => i === j ? 1 : 0));
                    setResultMatrix(identity);
                } else {
                    let res = matrix;
                    for (let i = 1; i < value; i++) {
                        res = multiplyMatrices(res, matrix);
                    }
                    setResultMatrix(res);
                }
                title = `${matrixRef}^${value}`;
                break;
            case 'determinant':
                setResultScalar(`${determinant(matrix)}`);
                title = `det(${matrixRef})`;
                break;
            case 'inverse':
                const det = determinant(matrix);
                if (Math.abs(det) < 1e-9) {
                    throw new Error("Matrix is not invertible (determinant is 0).");
                }
                const adj = transpose(cofactor(matrix));
                const inv = adj.map(row => row.map(cell => cell / det));
                setResultMatrix(inv);
                title = `${matrixRef}⁻¹`;
                break;
            case 'scalar':
                 if (value === undefined) throw new Error("Scalar value is required.");
                 setResultMatrix(matrix.map(row => row.map(cell => cell * value)));
                 title = `${value} × ${matrixRef}`;
                 break;
        }
        setResultTitle(title);
    } catch(e: any) {
         toast({ variant: "destructive", title: "Operation Error", description: e.message });
    }
  }

  const handleCopyTo = (matrixRef: 'A' | 'B') => {
    if (resultMatrix) {
      if (matrixRef === 'A') {
        setMatrixA(resultMatrix);
        setRowsA(resultMatrix.length);
        setColsA(resultMatrix[0]?.length || 0);
        toast({ title: "Result copied to Matrix A" });
      } else {
        setMatrixB(resultMatrix);
        setRowsB(resultMatrix.length);
        setColsB(resultMatrix[0]?.length || 0);
        toast({ title: "Result copied to Matrix B" });
      }
    }
  };
  
  const OperationDialog = ({matrixRef, operation}: {matrixRef: 'A' | 'B', operation: 'power' | 'scalar'}) => {
    const [value, setValue] = useState(2);
    const opDetails = {
        power: { title: 'Raise to Power', description: 'Enter an integer exponent.', label: 'Exponent', unit: '' },
        scalar: { title: 'Scalar Multiplication', description: 'Enter a number to multiply the matrix by.', label: 'Scalar', unit: '×' }
    }
    const currentOp = opDetails[operation];

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="secondary" size="xs">{operation === 'power' ? 'Power' : 'Scalar ×'}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle>{currentOp.title}</DialogTitle>
                <DialogDescription>{currentOp.description}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="exponent" className="text-right">
                        {currentOp.label}
                        </Label>
                        <Input
                        id="exponent"
                        type="number"
                        value={value}
                        onChange={(e) => setValue(parseFloat(e.target.value) || 0)}
                        className="col-span-3"
                        step={operation === 'power' ? "1" : "any"}
                        min={operation === 'power' ? "0" : undefined}
                        />
                    </div>
                </div>
                <DialogFooter>
                  <DialogTrigger asChild>
                    <Button onClick={() => handleUnaryOperation(matrixRef, operation, value)}>Calculate</Button>
                   </DialogTrigger>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
  }

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
            <div className="flex flex-wrap gap-1">
                <Button variant="secondary" size="xs" onClick={() => handleUnaryOperation('A', 'transpose')}>Transpose</Button>
                <OperationDialog matrixRef="A" operation="power" />
                <OperationDialog matrixRef="A" operation="scalar" />
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
             <div className="flex flex-wrap gap-1">
                <Button variant="secondary" size="xs" onClick={() => handleUnaryOperation('B', 'transpose')}>Transpose</Button>
                <OperationDialog matrixRef="B" operation="power" />
                <OperationDialog matrixRef="B" operation="scalar" />
                <Button variant="secondary" size="xs" onClick={() => handleUnaryOperation('B', 'determinant')}>Det</Button>
                <Button variant="secondary" size="xs" onClick={() => handleUnaryOperation('B', 'inverse')}>Inverse</Button>
            </div>
        </div>
      </div>
      
      <Card>
        <CardHeader className="p-3">
          <CardTitle className="text-base">Operations</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-2 p-3">
            <Button size="sm" onClick={() => handleOperation('add')}>A + B</Button>
            <Button size="sm" onClick={() => handleOperation('subtract')}>A - B</Button>
            <Button size="sm" onClick={() => handleOperation('multiply')}>A × B</Button>
            <Button size="sm" onClick={handleSwap} variant="outline"><Replace className="mr-1 h-3 w-3" /> A ↔ B</Button>
        </CardContent>
      </Card>
      
      {(resultMatrix || resultScalar !== null) && (
        <Card>
          <CardHeader className="p-3">
            <CardTitle className="text-base">{resultTitle}</CardTitle>
          </CardHeader>
          <CardContent className="p-3">
            {resultMatrix && (
              <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${resultMatrix[0].length}, minmax(0, 1fr))` }}>
                {resultMatrix.map((row, rowIndex) =>
                  row.map((cell, colIndex) => (
                    <Input
                      key={`result-${rowIndex}-${colIndex}`}
                      type="text"
                      readOnly
                      value={Number.isInteger(cell) ? String(cell) : cell.toFixed(3)}
                      className="h-8 text-center bg-muted text-xs"
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
            <CardFooter className="flex flex-wrap gap-2 p-3">
                <Button variant="outline" size="sm" onClick={() => handleCopyTo('A')}><Copy className="mr-2 h-4 w-4"/> Copy to A</Button>
                <Button variant="outline" size="sm" onClick={() => handleCopyTo('B')}><Copy className="mr-2 h-4 w-4"/> Copy to B</Button>
            </CardFooter>
           )}
        </Card>
      )}
    </div>
  );
}
