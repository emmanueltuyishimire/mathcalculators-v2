
"use client";
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

type Matrix = number[][];
type Vector = number[];

// A placeholder for a real numeric.js library
const numeric = {
  // Function to find eigenvalues and eigenvectors.
  // This is a very simplified implementation and may not work for all matrices.
  // A robust solution would use a library like numeric.js or similar.
  eig: (matrix: Matrix): { E: { x: Vector, y: Vector }, V: { x: Matrix, y: Matrix } } => {
    // This is a dummy implementation.
    // For a 2x2 matrix [[a, b], [c, d]]
    if (matrix.length === 2 && matrix[0].length === 2) {
      const [[a, b], [c, d]] = matrix;
      const trace = a + d;
      const det = a * d - b * c;
      const discriminant = trace * trace - 4 * det;

      if (discriminant < 0) {
        throw new Error("Matrix has complex eigenvalues, which are not supported in this demo.");
      }

      const eig1 = (trace + Math.sqrt(discriminant)) / 2;
      const eig2 = (trace - Math.sqrt(discriminant)) / 2;

      let vec1: Vector, vec2: Vector;

      if (Math.abs(c) > 1e-9) {
        vec1 = [eig1 - d, c];
        vec2 = [eig2 - d, c];
      } else if (Math.abs(b) > 1e-9) {
        vec1 = [b, eig1 - a];
        vec2 = [b, eig2 - a];
      } else { // Diagonal matrix
        vec1 = [1, 0];
        vec2 = [0, 1];
      }
      
      const norm1 = Math.sqrt(vec1[0]**2 + vec1[1]**2);
      const norm2 = Math.sqrt(vec2[0]**2 + vec2[1]**2);
      
      vec1 = vec1.map(v => v/norm1);
      vec2 = vec2.map(v => v/norm2);

      // Check if eigenvectors are linearly independent
      if (Math.abs(vec1[0] * vec2[1] - vec1[1] * vec2[0]) < 1e-9) {
          throw new Error("Matrix is not diagonalizable (eigenvectors are not linearly independent).");
      }


      return {
        E: { x: [eig1, eig2], y: [0, 0] },
        V: { x: [[vec1[0], vec2[0]], [vec1[1], vec2[1]]], y: [[0,0],[0,0]] },
      };
    }
    
    throw new Error("Eigenvalue calculation is only supported for 2x2 matrices in this demo.");
  }
};


const MatrixInput = ({
  matrix,
  onMatrixChange,
  size,
  onSizeChange,
  title,
  idPrefix
}: {
  matrix: Matrix;
  onMatrixChange: (matrix: Matrix) => void;
  size: number;
  onSizeChange: (size: number) => void;
  title: string;
  idPrefix: string;
}) => {
  const handleInputChange = (rowIndex: number, colIndex: number, value: string) => {
    const newMatrix = matrix.map((row, rIdx) => 
      rIdx === rowIndex ? row.map((cell, cIdx) => cIdx === colIndex ? (parseFloat(value) || 0) : cell) : row
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
          <Label htmlFor={`${idPrefix}-size`} className="text-xs">Size (n x n)</Label>
          <Input
            id={`${idPrefix}-size`}
            type="number"
            min="2"
            max="4"
            value={size}
            onChange={(e) => onSizeChange(parseInt(e.target.value))}
            className="h-8 w-16 text-xs"
          />
        </div>
        <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}>
          {matrix.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <Input
                key={`${rowIndex}-${colIndex}`}
                type="number"
                value={cell}
                onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                className="h-9 min-w-[2rem] text-center text-xs"
              />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};


const MatrixDisplay = ({ matrix, title }: { matrix: Matrix | null, title: string }) => {
  if (!matrix) return null;
  return (
    <Card>
      <CardHeader><CardTitle className="text-base">{title}</CardTitle></CardHeader>
      <CardContent>
         <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${matrix[0]?.length || 1}, minmax(0, 1fr))` }}>
          {matrix.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <Input
                key={`${rowIndex}-${colIndex}`}
                type="text"
                readOnly
                value={Number.isInteger(cell) ? String(cell) : cell.toFixed(3)}
                className="h-8 min-w-[2rem] text-center bg-muted text-xs"
              />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const VectorDisplay = ({ vector, title }: { vector: number[] | null, title: string }) => {
  if (!vector) return null;
  return (
    <Card>
      <CardHeader><CardTitle className="text-base">{title}</CardTitle></CardHeader>
      <CardContent>
        <p className="font-mono bg-muted p-2 rounded">[{vector.map(v => v.toFixed(3)).join(', ')}]</p>
      </CardContent>
    </Card>
  );
};


export default function DiagonalizeMatrixCalculator() {
  const { toast } = useToast();
  const [size, setSize] = useState(2);
  const [matrixA, setMatrixA] = useState<Matrix>(() => [[5, -1], [3, 1]]);

  const [eigenvalues, setEigenvalues] = useState<number[] | null>(null);
  const [eigenvectors, setEigenvectors] = useState<Matrix | null>(null);
  const [matrixP, setMatrixP] = useState<Matrix | null>(null);
  const [matrixD, setMatrixD] = useState<Matrix | null>(null);

  const resizeMatrix = useCallback((newSize: number, currentMatrix: Matrix): Matrix => {
      newSize = Math.max(2, Math.min(newSize, 4));
      const newMatrix = Array(newSize).fill(0).map(() => Array(newSize).fill(0));
      for(let i=0; i<Math.min(newSize, currentMatrix.length); i++) {
        for (let j = 0; j < Math.min(newSize, currentMatrix[0]?.length || 0); j++) {
            newMatrix[i][j] = currentMatrix[i][j];
        }
      }
      return newMatrix;
  }, []);
  
  const handleSizeChange = (newSize: number) => {
    const parsedSize = Math.max(2, Math.min(newSize, 4));
    setSize(parsedSize);
    setMatrixA(m => resizeMatrix(parsedSize, m));
    // Reset results on size change
    setEigenvalues(null);
    setEigenvectors(null);
    setMatrixP(null);
    setMatrixD(null);
  };
  
  const handleDiagonalize = () => {
    try {
      if (matrixA.length !== size || matrixA[0].length !== size) {
        throw new Error("Matrix must be square.");
      }
      
      const { E, V } = numeric.eig(matrixA);
      
      const eigs = E.x;
      const p = V.x;
      const d = Array(size).fill(0).map((_, i) => Array(size).fill(0).map((_, j) => i === j ? eigs[i] : 0));
      
      setEigenvalues(eigs);
      setEigenvectors(p); // Eigenvectors are the columns of P
      setMatrixP(p);
      setMatrixD(d);

      toast({ title: "Diagonalization Successful", description: "Matrices P and D have been calculated." });

    } catch (e: any) {
      toast({ variant: 'destructive', title: "Error", description: e.message });
      setEigenvalues(null);
      setEigenvectors(null);
      setMatrixP(null);
      setMatrixD(null);
    }
  }

  const handleClear = () => {
    setMatrixA(resizeMatrix(size, []));
    setEigenvalues(null);
    setEigenvectors(null);
    setMatrixP(null);
    setMatrixD(null);
    toast({ title: "Cleared", description: "All inputs and results have been cleared." });
  };


  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MatrixInput
          title="Matrix A"
          idPrefix="A"
          matrix={matrixA}
          onMatrixChange={setMatrixA}
          size={size}
          onSizeChange={handleSizeChange}
        />
        <Card>
            <CardHeader>
                <CardTitle>Actions</CardTitle>
                <CardDescription>Calculate the diagonalization of matrix A.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
                <Button onClick={handleDiagonalize}>Diagonalize A</Button>
                <Button variant="outline" onClick={handleClear}>Clear</Button>
            </CardContent>
        </Card>
      </div>
      
      {(eigenvalues || matrixP || matrixD) && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <VectorDisplay vector={eigenvalues} title="Eigenvalues (λ)" />
              <MatrixDisplay matrix={eigenvectors} title="Eigenvectors (columns)" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <MatrixDisplay matrix={matrixP} title="Matrix P (Eigenvectors)" />
                  <MatrixDisplay matrix={matrixD} title="Matrix D (Diagonal)" />
              </div>
              <p className="text-sm text-muted-foreground pt-2">Verification: P⁻¹AP = D</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
