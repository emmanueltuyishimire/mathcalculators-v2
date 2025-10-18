"use client";
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { X, ArrowRight, RefreshCw, Replace } from 'lucide-react';

type Matrix = number[][];

const MatrixInput = ({
  matrix,
  onMatrixChange,
  rows,
  cols,
  onRowsChange,
  onColsChange,
  title,
}: {
  matrix: Matrix;
  onMatrixChange: (matrix: Matrix) => void;
  rows: number;
  cols: number;
  onRowsChange: (rows: number) => void;
  onColsChange: (cols: number) => void;
  title: string;
}) => {
  const handleInputChange = (rowIndex: number, colIndex: number, value: string) => {
    const newMatrix = matrix.map((row) => [...row]);
    newMatrix[rowIndex][colIndex] = parseFloat(value) || 0;
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
      <CardHeader>
        <CardTitle>{title} Input</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Label htmlFor={`${title}-rows`}>Rows</Label>
          <Input
            id={`${title}-rows`}
            type="number"
            min="1"
            max="8"
            value={rows}
            onChange={(e) => onRowsChange(parseInt(e.target.value))}
            className="w-20"
          />
          <X className="h-4 w-4" />
          <Label htmlFor={`${title}-cols`}>Columns</Label>
          <Input
            id={`${title}-cols`}
            type="number"
            min="1"
            max="8"
            value={cols}
            onChange={(e) => onColsChange(parseInt(e.target.value))}
            className="w-20"
          />
        </div>
        <div className="grid gap-1 overflow-x-auto" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
          {matrix.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <Input
                key={`${rowIndex}-${colIndex}`}
                type="number"
                value={cell}
                onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                className="min-w-[4rem] text-center"
              />
            ))
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => fillMatrix(0)}>Clear</Button>
          <Button variant="outline" size="sm" onClick={() => fillMatrix(0)}>All 0</Button>
          <Button variant="outline" size="sm" onClick={() => fillMatrix(1)}>All 1</Button>
          <Button variant="outline" size="sm" onClick={() => fillMatrix('random')}>Random</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default function MatrixCalculator() {
  const { toast } = useToast();
  const [rowsA, setRowsA] = useState(4);
  const [colsA, setColsA] = useState(4);
  const [matrixA, setMatrixA] = useState<Matrix>(Array(4).fill(Array(4).fill(0)));

  const [rowsB, setRowsB] = useState(4);
  const [colsB, setColsB] = useState(4);
  const [matrixB, setMatrixB] = useState<Matrix>(Array(4).fill(Array(4).fill(0)));
  
  const [resultMatrix, setResultMatrix] = useState<Matrix | null>(null);
  const [resultScalar, setResultScalar] = useState<number | null>(null);

  const updateMatrixA = (setter: (prev: Matrix) => Matrix) => setMatrixA(setter);
  const updateMatrixB = (setter: (prev: Matrix) => Matrix) => setMatrixB(setter);

  const handleRowsAChange = (newRows: number) => {
    if (newRows > 0 && newRows <= 8) {
      setRowsA(newRows);
      setMatrixA(Array(newRows).fill(Array(colsA).fill(0)));
    }
  };
  const handleColsAChange = (newCols: number) => {
    if (newCols > 0 && newCols <= 8) {
      setColsA(newCols);
      setMatrixA(Array(rowsA).fill(Array(newCols).fill(0)));
    }
  };

  const handleRowsBChange = (newRows: number) => {
    if (newRows > 0 && newRows <= 8) {
      setRowsB(newRows);
      setMatrixB(Array(newRows).fill(Array(colsB).fill(0)));
    }
  };
  const handleColsBChange = (newCols: number) => {
    if (newCols > 0 && newCols <= 8) {
      setColsB(newCols);
      setMatrixB(Array(rowsB).fill(Array(newCols).fill(0)));
    }
  };
  
  const handleSwap = () => {
    const tempMatrixA = matrixA;
    const tempRowsA = rowsA;
    const tempColsA = colsA;

    setMatrixA(matrixB);
    setRowsA(rowsB);
    setColsA(colsB);

    setMatrixB(tempMatrixA);
    setRowsB(tempRowsA);
    setColsB(tempColsA);
  };
  
  const handleOperation = (operation: 'add' | 'subtract' | 'multiply') => {
      setResultMatrix(null);
      setResultScalar(null);
      // Mock operation
      toast({ title: "Operation not implemented", description: "This is a UI demo." });
  }

  const handleUnaryOperation = (matrix: 'A' | 'B', operation: 'transpose' | 'power' | 'determinant' | 'inverse') => {
    setResultMatrix(null);
    setResultScalar(null);
    // Mock operation
    toast({ title: "Operation not implemented", description: "This is a UI demo." });
  }


  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className='space-y-4'>
            <MatrixInput
              title="Matrix A"
              matrix={matrixA}
              onMatrixChange={setMatrixA}
              rows={rowsA}
              cols={colsA}
              onRowsChange={handleRowsAChange}
              onColsChange={handleColsAChange}
            />
            <div className="flex flex-wrap gap-2">
                <Button variant="secondary" onClick={() => handleUnaryOperation('A', 'transpose')}>Transpose</Button>
                <Button variant="secondary" onClick={() => handleUnaryOperation('A', 'power')}>Power of 2</Button>
                <Button variant="secondary" onClick={() => handleUnaryOperation('A', 'determinant')}>Determinant</Button>
                <Button variant="secondary" onClick={() => handleUnaryOperation('A', 'inverse')}>Inverse</Button>
            </div>
        </div>
        <div className='space-y-4'>
            <MatrixInput
              title="Matrix B"
              matrix={matrixB}
              onMatrixChange={setMatrixB}
              rows={rowsB}
              cols={colsB}
              onRowsChange={handleRowsBChange}
              onColsChange={handleColsBChange}
            />
            <div className="flex flex-wrap gap-2">
                <Button variant="secondary" onClick={() => handleUnaryOperation('B', 'transpose')}>Transpose</Button>
                <Button variant="secondary" onClick={() => handleUnaryOperation('B', 'power')}>Power of 2</Button>
                <Button variant="secondary" onClick={() => handleUnaryOperation('B', 'determinant')}>Determinant</Button>
                <Button variant="secondary" onClick={() => handleUnaryOperation('B', 'inverse')}>Inverse</Button>
            </div>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Operations</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
            <Button onClick={() => handleOperation('add')}>A + B</Button>
            <Button onClick={() => handleOperation('subtract')}>A - B</Button>
            <Button onClick={() => handleOperation('multiply')}>A × B</Button>
            <Button onClick={handleSwap} variant="outline"><Replace className="mr-2 h-4 w-4" /> A ↔ B</Button>
        </CardContent>
      </Card>
      
      {(resultMatrix || resultScalar !== null) && (
        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent>
            {resultMatrix && (
              <div className="grid gap-1 overflow-x-auto" style={{ gridTemplateColumns: `repeat(${resultMatrix[0].length}, minmax(0, 1fr))` }}>
                {resultMatrix.map((row, rowIndex) =>
                  row.map((cell, colIndex) => (
                    <Input
                      key={`result-${rowIndex}-${colIndex}`}
                      type="text"
                      readOnly
                      value={cell.toFixed(2)}
                      className="min-w-[4rem] text-center bg-muted"
                    />
                  ))
                )}
              </div>
            )}
            {resultScalar !== null && (
                <p className="text-2xl font-bold">{resultScalar.toFixed(4)}</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
