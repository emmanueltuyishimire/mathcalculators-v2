
"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Plus, X, Rows, Columns, FunctionSquare, Replace } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  if (n !== (matrix[0]?.length || 0)) throw new Error("Matrix must be square for determinant.");
  if (n === 1) return matrix[0][0];
  if (n === 2) return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];

  let det = 0;
  for (let j = 0; j < n; j++) {
    det += matrix[0][j] * Math.pow(-1, j) * determinant(getMinor(matrix, 0, j));
  }
  return det;
};

const cofactor = (matrix: Matrix): Matrix => {
    if (matrix.length !== (matrix[0]?.length || 0)) throw new Error("Matrix must be square for cofactor.");
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
    if (colsA !== rowsB) throw new Error("Columns of first matrix must match rows of second matrix.");
    
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
  if (a.length !== b.length || (a[0]?.length || 0) !== (b[0]?.length || 0)) throw new Error("Matrices must have the same dimensions for addition.");
  return a.map((row, r) => row.map((cell, c) => cell + b[r][c]));
}

const subtractMatrices = (a: Matrix, b: Matrix): Matrix => {
  if (a.length !== b.length || (a[0]?.length || 0) !== (b[0]?.length || 0)) throw new Error("Matrices must have the same dimensions for subtraction.");
  return a.map((row, r) => row.map((cell, c) => cell - b[r][c]));
}

const scalarMultiply = (matrix: Matrix, scalar: number): Matrix => {
  return matrix.map(row => row.map(cell => cell * scalar));
}
// #endregion

const OperationDialog = ({matrix, onNewMatrix, operation}: {matrix: MatrixObject, onNewMatrix: (m: Matrix, name?: string) => void, operation: 'scalar'}) => {
    const {toast} = useToast();
    const [value, setValue] = useState(2);
    
    const opDetails = {
        scalar: { title: 'Scalar Multiplication', description: 'Enter a number to multiply the matrix by.', label: 'Scalar' }
    }
    const currentOp = opDetails[operation];

    const handleCalculate = () => {
        try {
            let newMatrix: Matrix;
            let newName: string;
            switch(operation) {
                case 'scalar':
                    newMatrix = scalarMultiply(matrix.matrix, value);
                    newName = `${value}×${matrix.name}`;
                    break;
            }
            onNewMatrix(newMatrix, newName);
        } catch(e: any) {
             toast({ variant: "destructive", title: "Operation Error", description: e.message });
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Scalar Multiply</DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle>{currentOp.title}</DialogTitle>
                <DialogDescription>{currentOp.description}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="scalar-value" className="text-right">
                        {currentOp.label}
                        </Label>
                        <Input
                        id="scalar-value"
                        type="number"
                        value={value}
                        onChange={(e) => setValue(parseFloat(e.target.value) || 0)}
                        className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                  <DialogTrigger asChild>
                    <Button onClick={handleCalculate}>Calculate</Button>
                   </DialogTrigger>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
  }

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
  applyUnaryOperation,
  onNewMatrix,
}: {
  matrixObj: MatrixObject;
  updateMatrix: (id: string, newMatrix: Matrix) => void;
  removeMatrix: (id: string) => void;
  fillMatrix: (id: string, value: number | 'random' | 'identity') => void;
  applyUnaryOperation: (id: string, operation: 'transpose' | 'inverse') => void;
  onNewMatrix: (m: Matrix, name?: string) => void;
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
    if ((matrix[0]?.length || 0) >= 8) return;
    const newMatrix = matrix.map(row => [...row, 0]);
    updateMatrix(id, newMatrix);
  };
  
  const removeRow = () => {
    if (matrix.length > 1) {
      updateMatrix(id, matrix.slice(0, -1));
    }
  };

  const removeCol = () => {
     if ((matrix[0]?.length || 0) > 1) {
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
                <Button variant="ghost" size="icon" className="h-8 w-8" aria-label={`Matrix ${name} functions`}><FunctionSquare className="h-4 w-4" /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleUnaryOperation('transpose')}>Transpose</DropdownMenuItem>
                <DropdownMenuItem onClick={handleDet}>Determinant</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleUnaryOperation('inverse')}>Inverse</DropdownMenuItem>
                <OperationDialog matrix={matrixObj} onNewMatrix={onNewMatrix} operation="scalar" />
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeMatrix(id)} aria-label={`Remove matrix ${name}`}>
              <X className="h-4 w-4" />
            </Button>
        </div>
      </CardHeader>
      <CardContent className="p-2 pt-0 flex-1">
        <div className="flex gap-2">
            <div className="grid flex-1 gap-1" style={{ gridTemplateColumns: `repeat(${matrix[0]?.length || 1}, minmax(0, 1fr))` }}>
              {matrix.map((row, r) =>
                row.map((cell, c) => (
                  <Input
                    key={`${r}-${c}`}
                    type="number"
                    value={cell}
                    onChange={(e) => handleCellChange(r, c, e.target.value)}
                    className="h-9 text-center"
                    aria-label={`Matrix ${name}, row ${r+1}, column ${c+1}`}
                  />
                ))
              )}
            </div>
            <div className="flex flex-col gap-1">
                <Button variant="outline" size="icon" className="h-9 w-9" onClick={addCol} aria-label="Add column"><Columns className="h-4 w-4" /></Button>
                <Button variant="outline" size="icon" className="h-9 w-9" onClick={removeCol} aria-label="Remove column"><Columns className="h-4 w-4 opacity-50" /></Button>
            </div>
        </div>
         <div className="flex gap-1 mt-1">
            <Button variant="outline" size="icon" className="h-9 w-9" onClick={addRow} aria-label="Add row"><Rows className="h-4 w-4" /></Button>
            <Button variant="outline" size="icon" className="h-9 w-9" onClick={removeRow} aria-label="Remove row"><Rows className="h-4 w-4 opacity-50" /></Button>
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
    const [inputA, setInputA] = useState(matrices[0]?.name || 'A');
    const [inputB, setInputB] = useState(matrices[0]?.name || 'A');
    const { toast } = useToast();

    useEffect(() => {
        if (matrices.length > 0 && !matrices.some(m => m.name === inputA)) {
            setInputA(matrices[0].name);
        }
        if (matrices.length > 0 && !matrices.some(m => m.name === inputB)) {
            setInputB(matrices[0].name);
        }
        if (matrices.length === 0) {
            setInputA('A');
            setInputB('A');
        }
    }, [matrices, inputA, inputB]);

    const handleOperation = (op: 'add' | 'subtract' | 'multiply') => {
        const matrixAObj = matrices.find(m => m.name === inputA);
        const matrixBObj = matrices.find(m => m.name === inputB);

        if (!matrixAObj || !matrixBObj) {
            toast({ variant: 'destructive', title: "Error", description: "Matrix not found" });
            return;
        }
        
        const matrixA = matrixAObj.matrix;
        const matrixB = matrixBObj.matrix;

        try {
            let result: Matrix;
            let resultName: string;
            switch(op) {
                case 'add': 
                  result = addMatrices(matrixA, matrixB);
                  resultName = `${inputA}+${inputB}`;
                  break;
                case 'subtract': 
                  result = subtractMatrices(matrixA, matrixB);
                  resultName = `${inputA}-${inputB}`;
                  break;
                case 'multiply': 
                  result = multiplyMatrices(matrixA, matrixB);
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
                    <DropdownMenuTrigger asChild><Button variant="outline" disabled={matrices.length === 0}>{inputA}</Button></DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {matrices.map(m => <DropdownMenuItem key={m.id} onSelect={() => setInputA(m.name)}>{m.name}</DropdownMenuItem>)}
                    </DropdownMenuContent>
                </DropdownMenu>

                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" onClick={() => handleOperation('add')} aria-label="Add matrices">+</Button>
                  <Button variant="ghost" size="sm" onClick={() => handleOperation('subtract')} aria-label="Subtract matrices">-</Button>
                  <Button variant="ghost" size="sm" onClick={() => handleOperation('multiply')} aria-label="Multiply matrices">×</Button>
                </div>

                 <DropdownMenu>
                    <DropdownMenuTrigger asChild><Button variant="outline" disabled={matrices.length === 0}>{inputB}</Button></DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {matrices.map(m => <DropdownMenuItem key={m.id} onSelect={() => setInputB(m.name)}>{m.name}</DropdownMenuItem>)}
                    </DropdownMenuContent>
                </DropdownMenu>
                
                <Button variant="outline" onClick={() => { const temp = inputA; setInputA(inputB); setInputB(temp); }} disabled={matrices.length === 0} aria-label="Swap A and B">
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
  const nextIdCounter = React.useRef(0);

  const getNextMatrixName = () => {
    let i = 0;
    let nextChar: string;
    const existingNames = new Set(matrices.map(m => m.name));
    do {
      nextChar = String.fromCharCode(65 + i);
      i++;
    } while(existingNames.has(nextChar));
    return nextChar;
  }
  
  const getUniqueId = (prefix: string) => {
    let newId = `${prefix}-${nextIdCounter.current++}`;
    if (matrices.some(m => m.id === newId || m.name === newId)) {
        newId = `${newId}-${Date.now()}`;
    }
    return newId;
  }

  const addMatrix = (matrix?: Matrix, name?: string) => {
    let newName = name;
    if (!newName) {
      newName = getNextMatrixName();
    }
    
    if (matrices.some(m => m.name === newName)) {
      // If name is not unique, create a unique one
      const uniqueName = `${newName}'`;
      addMatrix(matrix, uniqueName);
      return;
    }
    
    const newId = getUniqueId(newName);

    const newMatrix: MatrixObject = {
      id: newId,
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
    if (matrices.length === 1) {
        toast({
            variant: "destructive",
            title: "Cannot remove last matrix",
            description: "You must have at least one matrix."
        });
        return;
    }
    setMatrices(matrices.filter(m => m.id !== id));
  };
  
  const fillMatrix = (id: string, value: number | 'random' | 'identity') => {
    const matrixToFill = matrices.find(m => m.id === id);
    if (!matrixToFill) return;
    
    const { matrix } = matrixToFill;
    const rows = matrix.length;
    const cols = (matrix[0]?.length || 0);

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
          if (matrix.length !== matrix[0].length) {
              throw new Error("Matrix must be square for inverse.");
          }
          const det = determinant(matrix);
          if (Math.abs(det) < 1e-9) throw new Error("Matrix is not invertible (determinant is 0).");
          
          if (matrix.length === 1) {
            newMatrix = [[1/matrix[0][0]]];
          } else {
            const adj = transpose(cofactor(matrix));
            newMatrix = adj.map(row => row.map(cell => cell / det));
          }
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
            onNewMatrix={addMatrix}
          />
        ))}
        <NewMatrixButton onClick={() => addMatrix()} />
      </div>
    </div>
  );
}
