"use client";
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Plus, X, Trash2, Rows, Columns, FunctionSquare, Pilcrow, Replace } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Matrix = number[][];
type MatrixObject = {
  id: string;
  name: string;
  matrix: Matrix;
};

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

const addMatrices = (a: Matrix, b: Matrix): Matrix => {
  if (a.length !== b.length || a[0].length !== b[0].length) throw new Error("Matrices must have the same dimensions for addition.");
  return a.map((row, r) => row.map((cell, c) => cell + b[r][c]));
}

const subtractMatrices = (a: Matrix, b: Matrix): Matrix => {
  if (a.length !== b.length || a[0].length !== b[0].length) throw new Error("Matrices must have the same dimensions for subtraction.");
  return a.map((row, r) => row.map((cell, c) => cell - b[r][c]));
}
// #endregion

const NewMatrixButton = ({ onClick }: { onClick: () => void }) => (
  <Button variant="outline" onClick={onClick} className="w-full min-h-[160px] border-dashed">
    <Plus className="mr-2 h-4 w-4" /> New Matrix
  </Button>
);

const MatrixView = ({
  matrixObj,
  updateMatrix,
  removeMatrix,
  fillMatrix,
  applyUnaryOperation
}: {
  matrixObj: MatrixObject;
  updateMatrix: (id: string, newMatrix: Matrix) => void;
  removeMatrix: (id: string) => void;
  fillMatrix: (id: string, value: number | 'random' | 'identity') => void;
  applyUnaryOperation: (id: string, operation: 'transpose' | 'inverse') => void;
}) => {
  const { id, name, matrix } = matrixObj;
  const { toast } = useToast();

  const handleCellChange = (r: number, c: number, value: string) => {
    const newMatrix = matrix.map((row, rowIndex) =>
      row.map((cell, colIndex) =>
        rowIndex === r && colIndex === c ? parseFloat(value) || 0 : cell
      )
    );
    updateMatrix(id, newMatrix);
  };

  const addRow = () => {
    if (matrix.length >= 8) return;
    const newRow = Array(matrix[0]?.length || 1).fill(0);
    updateMatrix(id, [...matrix, newRow]);
  };

  const addCol = () => {
    if (matrix[0]?.length >= 8) return;
    const newMatrix = matrix.map(row => [...row, 0]);
    updateMatrix(id, newMatrix);
  };
  
  const removeRow = () => {
    if (matrix.length > 1) {
      updateMatrix(id, matrix.slice(0, -1));
    }
  };

  const removeCol = () => {
     if (matrix[0]?.length > 1) {
      const newMatrix = matrix.map(row => row.slice(0, -1));
      updateMatrix(id, newMatrix);
    }
  };
  
  const handleUnaryOperation = (op: 'transpose' | 'inverse') => {
      try {
        applyUnaryOperation(id, op);
      } catch (e: any) {
        toast({ variant: "destructive", title: "Operation Error", description: e.message });
      }
  }

  const handleDet = () => {
      try {
        const det = determinant(matrix);
        toast({ title: `Determinant of ${name}`, description: `${det}`});
      } catch(e: any) {
         toast({ variant: "destructive", title: "Determinant Error", description: e.message });
      }
  }

  return (
    <Card className="relative flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between p-2">
        <div className="font-bold text-lg p-2">{name}</div>
        <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8"><FunctionSquare className="h-4 w-4" /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleUnaryOperation('transpose')}>Transpose</DropdownMenuItem>
                <DropdownMenuItem onClick={handleDet}>Determinant</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleUnaryOperation('inverse')}>Inverse</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeMatrix(id)}>
              <X className="h-4 w-4" />
            </Button>
        </div>
      </CardHeader>
      <CardContent className="p-2 pt-0 flex-1">
        <div className="flex gap-2">
            <div className="grid flex-1 gap-1" style={{ gridTemplateColumns: `repeat(${matrix[0]?.length || 1}, 1fr)` }}>
              {matrix.map((row, r) =>
                row.map((cell, c) => (
                  <Input
                    key={`${r}-${c}`}
                    type="number"
                    value={cell}
                    onChange={(e) => handleCellChange(r, c, e.target.value)}
                    className="h-9 text-center"
                  />
                ))
              )}
            </div>
            <div className="flex flex-col gap-1">
                <Button variant="outline" size="icon" className="h-9 w-9" onClick={addCol}><Columns className="h-4 w-4" /></Button>
                <Button variant="outline" size="icon" className="h-9 w-9" onClick={removeCol}><Columns className="h-4 w-4 opacity-50" /></Button>
            </div>
        </div>
         <div className="flex gap-1 mt-1">
            <Button variant="outline" size="icon" className="h-9 w-9" onClick={addRow}><Rows className="h-4 w-4" /></Button>
            <Button variant="outline" size="icon" className="h-9 w-9" onClick={removeRow}><Rows className="h-4 w-4 opacity-50" /></Button>
        </div>
      </CardContent>
       <CardFooter className="p-2 flex-wrap gap-1">
         <Button size="xs" variant="outline" onClick={() => fillMatrix(id, 0)}>Clear</Button>
         <Button size="xs" variant="outline" onClick={() => fillMatrix(id, 1)}>1s</Button>
         <Button size="xs" variant="outline" onClick={() => fillMatrix(id, 'random')}>Rand</Button>
         <Button size="xs" variant="outline" onClick={() => fillMatrix(id, 'identity')}>Identity</Button>
       </CardFooter>
    </Card>
  );
};


const OperationPanel = ({ matrices, onNewMatrix }: { matrices: MatrixObject[], onNewMatrix: (m: Matrix, name?: string) => void }) => {
    const [inputA, setInputA] = useState('A');
    const [inputB, setInputB] = useState('A');
    const { toast } = useToast();

    const handleOperation = (op: 'add' | 'subtract' | 'multiply') => {
        const matrixA = matrices.find(m => m.name === inputA);
        const matrixB = matrices.find(m => m.name === inputB);

        if (!matrixA || !matrixB) {
            toast({ variant: 'destructive', title: "Error", description: "Matrix not found" });
            return;
        }

        try {
            let result: Matrix;
            let resultName: string;
            switch(op) {
                case 'add': 
                  result = addMatrices(matrixA.matrix, matrixB.matrix);
                  resultName = `${inputA}+${inputB}`;
                  break;
                case 'subtract': 
                  result = subtractMatrices(matrixA.matrix, matrixB.matrix);
                  resultName = `${inputA}-${inputB}`;
                  break;
                case 'multiply': 
                  result = multiplyMatrices(matrixA.matrix, matrixB.matrix);
                  resultName = `${inputA}×${inputB}`;
                  break;
            }
            onNewMatrix(result, resultName);
        } catch(e: any) {
            toast({ variant: 'destructive', title: "Operation Error", description: e.message });
        }
    }

    return (
        <Card>
            <CardHeader><CardTitle>Operations</CardTitle></CardHeader>
            <CardContent className="flex flex-wrap items-center gap-2">
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild><Button variant="outline">{inputA}</Button></DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {matrices.map(m => <DropdownMenuItem key={m.id} onSelect={() => setInputA(m.name)}>{m.name}</DropdownMenuItem>)}
                    </DropdownMenuContent>
                </DropdownMenu>

                <Button variant="ghost" size="icon" onClick={() => handleOperation('add')}>+</Button>
                <Button variant="ghost" size="icon" onClick={() => handleOperation('subtract')}>-</Button>
                <Button variant="ghost" size="icon" onClick={() => handleOperation('multiply')}>×</Button>

                 <DropdownMenu>
                    <DropdownMenuTrigger asChild><Button variant="outline">{inputB}</Button></DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {matrices.map(m => <DropdownMenuItem key={m.id} onSelect={() => setInputB(m.name)}>{m.name}</DropdownMenuItem>)}
                    </DropdownMenuContent>
                </DropdownMenu>
                
                 <Button onClick={() => handleOperation('add')}>A+B</Button>
                 <Button onClick={() => handleOperation('subtract')}>A-B</Button>
                 <Button onClick={() => handleOperation('multiply')}>A×B</Button>

                 <Button variant="outline" onClick={() => { const temp = inputA; setInputA(inputB); setInputB(temp); }}>
                    <Replace className="h-4 w-4" />
                 </Button>

            </CardContent>
        </Card>
    )
}


export default function DesmosMatrixCalculator() {
  const [matrices, setMatrices] = useState<MatrixObject[]>([
    { id: 'A', name: 'A', matrix: [[1, 2], [3, 4]] },
  ]);
  const { toast } = useToast();

  const getNextMatrixName = () => {
    let i = 0;
    let nextChar: string;
    do {
      nextChar = String.fromCharCode(65 + i);
      i++;
    } while(matrices.some(m => m.name === nextChar));
    return nextChar;
  }

  const addMatrix = (matrix?: Matrix, name?: string) => {
    const newName = name || getNextMatrixName();
    const newMatrix: MatrixObject = {
      id: newName,
      name: newName,
      matrix: matrix || [[0, 0], [0, 0]],
    };
    setMatrices(prev => [...prev, newMatrix]);
  };

  const updateMatrix = (id: string, newMatrixData: Matrix) => {
    setMatrices(
      matrices.map(m => (m.id === id ? { ...m, matrix: newMatrixData } : m))
    );
  };
  
  const removeMatrix = (id: string) => {
    setMatrices(matrices.filter(m => m.id !== id));
  };
  
  const fillMatrix = (id: string, value: number | 'random' | 'identity') => {
    const matrixToFill = matrices.find(m => m.id === id);
    if (!matrixToFill) return;
    
    const { matrix } = matrixToFill;
    const rows = matrix.length;
    const cols = matrix[0]?.length || 0;

    let newMatrix: Matrix;
    if (value === 'identity') {
      if (rows !== cols) {
        toast({ variant: "destructive", title: "Error", description: "Identity matrix must be square."});
        return;
      }
      newMatrix = Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) => (r === c ? 1 : 0))
      );
    } else {
      newMatrix = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () =>
          value === 'random' ? Math.floor(Math.random() * 10) : value
        )
      );
    }
    updateMatrix(id, newMatrix);
  };
  
  const applyUnaryOperation = (id: string, operation: 'transpose' | 'inverse') => {
      const matrixToTransform = matrices.find(m => m.id === id);
      if (!matrixToTransform) return;

      const { matrix, name } = matrixToTransform;
      let newMatrix: Matrix;
      let newName: string;

      if (operation === 'transpose') {
          newMatrix = transpose(matrix);
          newName = `${name}ᵀ`;
      } else { // inverse
          const det = determinant(matrix);
          if (det === 0) throw new Error("Matrix is not invertible (determinant is 0).");
          const adj = transpose(cofactor(matrix));
          newMatrix = adj.map(row => row.map(cell => cell / det));
          newName = `${name}⁻¹`;
      }
      addMatrix(newMatrix, newName);
  }


  return (
    <div className="space-y-4">
      <OperationPanel matrices={matrices} onNewMatrix={addMatrix} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {matrices.map(matrixObj => (
          <MatrixView
            key={matrixObj.id}
            matrixObj={matrixObj}
            updateMatrix={updateMatrix}
            removeMatrix={removeMatrix}
            fillMatrix={fillMatrix}
            applyUnaryOperation={applyUnaryOperation}
          />
        ))}
        <NewMatrixButton onClick={() => addMatrix()} />
      </div>
    </div>
  );
}
