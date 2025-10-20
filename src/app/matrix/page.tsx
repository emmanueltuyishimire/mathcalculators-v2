
"use client";
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, Sigma } from 'lucide-react';
import React from 'react';

const matrixTools = [
  {
    href: '/matrix/calculator',
    label: 'Matrix Calculator',
    icon: Table,
    description: 'Perform basic matrix operations like addition, multiplication, and transpose.',
  },
  {
    href: '/rref',
    label: 'RREF Calculator',
    icon: Sigma,
    description: 'Solve systems of linear equations using Row Echelon Form.',
  },
  {
    href: '/desmos-matrix',
    label: 'Desmos Matrix',
    icon: Table,
    description: 'A Desmos-style matrix calculator for interactive operations.',
  },
  {
    href: '/diagonalize-matrix',
    label: 'Diagonalize Matrix',
    icon: Table,
    description: 'Find eigenvalues, eigenvectors, and diagonalize matrices.',
  },
];

export default function MatrixCategoryPage() {
  return (
    <div className="flex flex-1 flex-col">
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-4xl space-y-8">
            <section className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                    Matrix Calculators
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    A collection of powerful tools for all your linear algebra needs.
                </p>
            </section>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {matrixTools.map((tool, index) => (
                 <React.Fragment key={tool.href}>
                    <Link href={tool.href} className="group">
                      <Card className="h-full transition-all group-hover:shadow-lg group-hover:-translate-y-1">
                        <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                           <div className="rounded-full bg-primary/10 p-3 text-primary">
                            <tool.icon className="h-6 w-6" />
                          </div>
                          <CardTitle>{tool.label}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">{tool.description}</p>
                        </CardContent>
                      </Card>
                    </Link>
                </React.Fragment>
              ))}
            </div>
        </div>
      </main>
    </div>
  );
}
