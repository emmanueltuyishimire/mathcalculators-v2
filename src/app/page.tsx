
"use client";

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, FunctionSquare, BarChartHorizontal, FlaskConical, Square, MoreVertical, Table, Type, Sigma, Replace, Star, TrendingUp, Move3d, Triangle, Divide, Percent, Shuffle, AlertTriangle, Superscript, Binary, Code, Atom, Proportions, Radical, Gavel, Hand, CheckCircle, InfinityIcon, Waves, Volume, Milestone, ShieldCheck, Circle } from 'lucide-react';

function HeroSection() {
  return (
    <section
      className="relative w-full h-[60vh] min-h-[400px] bg-cover bg-center"
      style={{
        backgroundImage: "url('/math%20calculator%20background%20image%201.webp')",
      }}
    >
      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}>
            Unlock Your Potential with Our Free Calculators
        </h1>
        <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl mt-4" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}>
            From basic arithmetic to advanced calculus, our comprehensive suite of calculators is designed to provide instant, accurate solutions. Whether you're a student, professional, or just curious, find the right tool for your needs — all for free.
        </p>
           <Button asChild variant="secondary" size="lg" className="mt-6">
            <Link href="#tools">Explore Calculators</Link>
          </Button>
      </div>
    </section>
  );
}

const calculatorCategories = [
    {
        title: "Basic & Algebra",
        tools: [
            { href: '/basic', label: 'Basic Calculators', icon: Calculator },
            { href: '/scientific', label: 'Scientific', icon: FlaskConical },
            { href: '/algebra', label: 'Algebra', icon: Type },
            { href: '/fraction', label: 'Fraction', icon: Divide },
            { href: '/percentage', label: 'Percentage', icon: Percent },
            { href: '/exponent', label: 'Exponent', icon: Superscript },
            { href: '/log', label: 'Logarithm', icon: FunctionSquare },
            { href: '/root', label: 'Root', icon: Radical },
            { href: '/rounding', label: 'Rounding', icon: CheckCircle },
            { href: '/factor', label: 'Factor', icon: Gavel },
            { href: '/gcf', label: 'GCF', icon: Hand },
            { href: '/lcm', label: 'LCM', icon: Proportions },
            { href: '/binary', label: 'Binary', icon: Binary },
            { href: '/hex', label: 'Hexadecimal', icon: Code },
            { href: '/big-number', label: 'Big Number', icon: InfinityIcon },
        ]
    },
    {
        title: "Geometry & Trigonometry",
        tools: [
            { href: '/geometry', label: 'Geometry', icon: Square },
            { href: '/trigonometry', label: 'Trigonometry', icon: MoreVertical },
            { href: '/pythagorean', label: 'Pythagorean', icon: Sigma },
            { href: '/right-triangle', label: 'Right Triangle', icon: Triangle },
            { href: '/slope', label: 'Slope', icon: TrendingUp },
            { href: '/distance', label: 'Distance', icon: Move3d },
            { href: '/geometry/area', label: 'Area', icon: Square },
            { href: '/geometry/volume', label: 'Volume', icon: Volume },
            { href: '/geometry/surface-area', label: 'Surface Area', icon: Waves },
            { href: '/geometry/circle', label: 'Circle', icon: Circle },
        ]
    },
    {
        title: "Statistics & Probability",
        tools: [
            { href: '/statistics', label: 'Statistics', icon: BarChartHorizontal },
            { href: '/statistics/mean-median-mode', label: 'Mean, Median, Mode', icon: BarChartHorizontal },
            { href: '/statistics/standard-deviation', label: 'Standard Deviation', icon: Sigma },
            { href: '/statistics/sample-size', label: 'Sample Size', icon: Percent },
            { href: '/statistics/probability', label: 'Probability', icon: Percent },
            { href: '/statistics/permutation-combination', label: 'Permutation & Combination', icon: FunctionSquare },
            { href: '/statistics/z-score', label: 'Z-Score', icon: Sigma },
            { href: '/statistics/confidence-interval', label: 'Confidence Interval', icon: ShieldCheck },
            { href: '/statistics/sequences', label: 'Sequences', icon: Milestone },
             { href: '/random', label: 'Random Number', icon: Shuffle },
        ]
    },
    {
        title: "Advanced & Specialty",
        tools: [
            { href: '/calculus', label: 'Calculus', icon: Sigma },
            { href: '/matrix', label: 'Matrix', icon: Table },
            { href: '/rref', label: 'RREF', icon: Sigma },
            { href: '/desmos-matrix', label: 'Desmos Matrix', icon: Table },
            { href: '/diagonalize-matrix', label: 'Diagonalize Matrix', icon: Table },
            { href: '/converter', label: 'Unit Converter', icon: Replace },
            { href: '/half-life', label: 'Half-Life', icon: Atom },
            { href: '/percent-error', label: 'Percent Error', icon: AlertTriangle },
            { href: '/ratio', label: 'Ratio', icon: Proportions },
            { href: '/destiny-matrix', label: 'Destiny Matrix', icon: Star },
        ]
    }
];


export default function Home() {
  return (
    <>
      <HeroSection />

      <main className="flex-1 p-4 md:p-6 lg:p-12">
        <section id="tools" className="space-y-12">
            {calculatorCategories.map(category => (
                <div key={category.title}>
                    <h2 className="text-3xl font-bold text-center mb-8">{category.title}</h2>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                        {category.tools.map((tool) => (
                            <Link href={tool.href} key={tool.label} className="group" aria-label={`Go to ${tool.label} calculator`}>
                            <Card className="h-full transition-all group-hover:shadow-lg group-hover:-translate-y-1">
                                <CardHeader className="flex flex-col items-center text-center p-4">
                                <div className="mb-2 rounded-full bg-primary/10 p-3 text-primary">
                                    <tool.icon className="h-6 w-6" />
                                </div>
                                <CardTitle className="text-base">{tool.label}</CardTitle>
                                </CardHeader>
                            </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            ))}
        </section>
      </main>
    </>
  );
}
