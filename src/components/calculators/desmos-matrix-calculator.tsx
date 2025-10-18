"use client";
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Plus, X, Trash2, Rows, Columns } from 'lucide-react';

type Matrix = number[][];
type MatrixObject = {
  id: string;
  name: string;
  matrix: Matrix;
};

const NewMatrixButton = ({ onClick }: { onClick: () => void }) => (
  <Button variant="outline" onClick={onClick} className="w-full">
    <Plus className="mr-2 h-4 w-4" /> New Matrix
  </Button>
);

const MatrixView = ({
  matrixObj,
  updateMatrix,
  removeMatrix,
}: {
  matrixObj: MatrixObject;
  updateMatrix: (id: string, newMatrix: Matrix) => void;
  removeMatrix: (id: string) => void;
}) => {
  const { id, name, matrix } = matrixObj;

  const handleCellChange = (r: number, c: number, value: string) => {
    const newMatrix = matrix.map((row, rowIndex) =>
      row.map((cell, colIndex) =>
        rowIndex === r && colIndex === c ? parseFloat(value) || 0 : cell
      )
    );
    updateMatrix(id, newMatrix);
  };

  const addRow = () => {
    const newRow = Array(matrix[0]?.length || 1).fill(0);
    updateMatrix(id, [...matrix, newRow]);
  };

  const addCol = () => {
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

  return (
    <Card className="relative">
      <CardHeader className="flex flex-row items-center justify-between p-4">
        <CardTitle className="text-lg font-bold">{name}</CardTitle>
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeMatrix(id)}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-4 pt-0">
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
    </Card>
  );
};

export default function DesmosMatrixCalculator() {
  const [matrices, setMatrices] = useState<MatrixObject[]>([
    { id: 'A', name: 'A', matrix: [[1, 2], [3, 4]] },
  ]);
  const { toast } = useToast();

  const addMatrix = () => {
    const nextChar = String.fromCharCode(65 + matrices.length);
    const newName = matrices.some(m => m.name === nextChar) ? `M${matrices.length + 1}` : nextChar;
    const newMatrix: MatrixObject = {
      id: newName,
      name: newName,
      matrix: [[0, 0], [0, 0]],
    };
    setMatrices([...matrices, newMatrix]);
  };

  const updateMatrix = (id: string, newMatrixData: Matrix) => {
    setMatrices(
      matrices.map(m => (m.id === id ? { ...m, matrix: newMatrixData } : m))
    );
  };
  
  const removeMatrix = (id: string) => {
    setMatrices(matrices.filter(m => m.id !== id));
  };


  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {matrices.map(matrixObj => (
          <MatrixView
            key={matrixObj.id}
            matrixObj={matrixObj}
            updateMatrix={updateMatrix}
            removeMatrix={removeMatrix}
          />
        ))}
        <NewMatrixButton onClick={addMatrix} />
      </div>
       {/* Future area for operations and results */}
    </div>
  );
}
