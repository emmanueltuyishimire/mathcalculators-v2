
"use client";

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, FunctionSquare, BarChartHorizontal, FlaskConical, Square, MoreVertical, Table, Type, Sigma, Replace, Star, TrendingUp, Move3d, Triangle } from 'lucide-react';
import ScientificCalculator from '@/components/calculators/scientific-calculator';

const tools = [
  {
    href: '/scientific',
    label: 'Scientific',
    icon: FlaskConical,
    description: 'Advanced functions and operations.',
  },
  {
    href: '/pythagorean',
    label: 'Pythagorean',
    icon: Triangle,
    description: 'Solve right-angled triangles.',
  },
  {
    href: '/algebra',
    label: 'Algebra',
    icon: Type,
    description: 'Solve equations and inequalities.',
  },
  {
    href: '/calculus',
    label: 'Calculus',
    icon: Sigma,
    description: 'Derivatives, integrals, and limits.',
  },
    {
    href: '/slope',
    label: 'Slope',
    icon: TrendingUp,
    description: 'Calculate slope from two points.',
  },
   {
    href: '/distance',
    label: 'Distance',
    icon: Move3d,
    description: 'Distance between points.',
  },
  {
    href: '/geometry',
    label: 'Geometry',
    icon: Square,
    description: 'Calculate area, volume, and more.',
  },
  {
    href: '/trigonometry',
    label: 'Trigonometry',
    icon: MoreVertical,
    description: 'Sine, cosine, tangent, and more.',
  },
  {
    href: '/statistics',
    label: 'Statistics',
    icon: BarChartHorizontal,
    description: 'Mean, median, mode, and more.',
  },
  {
    href: '/matrix',
    label: 'Matrix',
    icon: Table,
    description: 'Matrix operations and calculations.',
  },
  {
    href: '/converter',
    label: 'Unit Converter',
    icon: Replace,
    description: 'Convert between different units.',
  },
  {
    href: '/destiny-matrix',
    label: 'Destiny Matrix',
    icon: Star,
    description: 'Numerology and personality insights.',
  },
];


export default function Home() {
  return (
    <>
      <section 
        className="relative w-full h-[60vh] min-h-[400px] bg-cover bg-center"
        style={{ backgroundImage: "url('/math%20calculator%20background%20image2.webp')" }}
        data-ai-hint="geometric shapes"
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="container relative z-10 flex h-full flex-col items-center justify-center space-y-4 text-center text-primary-foreground">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
            Math Calculators
          </h1>
          <p className="mx-auto max-w-[700px] text-primary-foreground/80 md:text-xl">
            Your trusted source for free, powerful, and easy-to-use online calculators for mathematics.
          </p>
          <Button asChild variant="secondary" size="lg">
            <Link href="#tools">Explore Tools</Link>
          </Button>
        </div>
      </section>

      <main className="flex-1 p-4 md:p-6">
        <section id="tools" className="py-12">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-8">Discover Our Tools</h2>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {tools.map((tool) => (
                <Link href={tool.href} key={tool.href} className="group" aria-label={`Go to ${tool.label} calculator`}>
                  <Card className="h-full transition-all group-hover:shadow-lg group-hover:-translate-y-1">
                    <CardHeader className="flex flex-col items-center text-center p-2">
                      <div className="mb-1 rounded-full bg-primary/10 p-2 text-primary">
                        <tool.icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-sm">{tool.label}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center p-2 pt-0">
                      <p className="text-xs text-muted-foreground">{tool.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        <section className="w-full py-12">
            <div className="container px-4 md:px-6">
                <div className="mx-auto max-w-4xl space-y-12">
                    <h2 className="text-3xl font-bold text-center">Featured Calculator</h2>
                    <ScientificCalculator />
                </div>
            </div>
        </section>
      </main>
    </>
  );
}
