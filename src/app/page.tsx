
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, FunctionSquare, BarChartHorizontal, FlaskConical, Square, MoreVertical, Table, Type, Sigma, Replace, Star, TrendingUp, Move3d, Triangle, Divide, Percent, Shuffle, AlertTriangle, Superscript, Binary, Code, Atom, Proportions, Radical, Gavel, Hand, CheckCircle, InfinityIcon, Waves, Volume, ShieldCheck, Milestone, Circle } from 'lucide-react';

function HeroSection() {
  return (
    <section
      className="relative w-full h-[60vh] min-h-[400px] bg-cover bg-center"
      aria-labelledby="hero-heading"
    >
       <Image
        src="/math%20calculator%20background%20image%201.webp"
        alt="Abstract mathematical background with glowing formulas"
        fill
        priority
        className="object-cover"
        />
      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-4">
        <h1 id="hero-heading" className="text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl" style={{ textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)' }}>
          Unlock the Power of Numbers
        </h1>
        <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl mt-4" style={{ textShadow: '1px 1px 4px rgba(0, 0, 0, 0.8)' }}>
          Struggling with complex equations or need a quick calculation? Our free, user-friendly calculators provide instant, accurate answers for everything from basic arithmetic to advanced calculus. Master math with tools designed for students and professionals alike. Start solving now!
        </p>
           <Button asChild variant="secondary" size="lg" className="mt-6">
            <Link href="/calculators">Explore Calculators</Link>
          </Button>
      </div>
    </section>
  );
}

const calculatorCategories = [
    {
        title: "Basic & Algebra",
        image: "/math%20calculator%20background%20image6.webp",
        tools: [
            { href: '/basic', label: 'Basic Calculators', icon: Calculator },
            { href: '/scientific', label: 'Scientific Calculator', icon: FlaskConical },
            { href: '/algebra', label: 'Algebra Calculator', icon: Type },
            { href: '/fraction', label: 'Fraction Calculator', icon: Divide },
            { href: '/percentage', label: 'Percentage Calculator', icon: Percent },
            { href: '/exponent', label: 'Exponent Calculator', icon: Superscript },
            { href: '/log', label: 'Logarithm Calculator', icon: FunctionSquare },
            { href: '/root', label: 'Root Calculator', icon: Radical },
            { href: '/rounding', label: 'Rounding Calculator', icon: CheckCircle },
            { href: '/factor', label: 'Factor Calculator', icon: Gavel },
            { href: '/gcf', label: 'GCF Calculator', icon: Hand },
            { href: '/lcm', label: 'LCM Calculator', icon: Proportions },
            { href: '/binary', label: 'Binary Calculator', icon: Binary },
            { href: '/hex', label: 'Hexadecimal Calculator', icon: Code },
            { href: '/big-number', label: 'Big Number Calculator', icon: InfinityIcon },
        ]
    },
    {
        title: "Geometry & Trigonometry",
        image: "/math%20calculator%20background%20image7.webp",
        tools: [
            { href: '/geometry', label: 'Geometry Calculators', icon: Square },
            { href: '/trigonometry', label: 'Trigonometry Calculator', icon: Sigma },
            { href: '/pythagorean', label: 'Pythagorean Theorem Calculator', icon: Sigma },
            { href: '/right-triangle', label: 'Right Triangle Calculator', icon: Triangle },
            { href: '/slope', label: 'Slope Calculator', icon: TrendingUp },
            { href: '/distance', label: 'Distance Calculator', icon: Move3d },
            { href: '/geometry/area', label: 'Area Calculator', icon: Square },
            { href: '/geometry/volume', label: 'Volume Calculator', icon: Volume },
            { href: '/geometry/surface-area', label: 'Surface Area Calculator', icon: Waves },
            { href: '/geometry/circle', label: 'Circle Calculator', icon: Circle },
        ]
    },
    {
        title: "Statistics & Probability",
        image: "/math%20calculator%20background%20image6.webp",
        tools: [
            { href: '/statistics', label: 'Statistics Calculators', icon: BarChartHorizontal },
            { href: '/statistics/mean-median-mode', label: 'Mean, Median, Mode Calculator', icon: BarChartHorizontal },
            { href: '/statistics/standard-deviation', label: 'Standard Deviation Calculator', icon: Sigma },
            { href: '/statistics/sample-size', label: 'Sample Size Calculator', icon: Percent },
            { href: '/statistics/probability', label: 'Probability Calculator', icon: Percent },
            { href: '/statistics/permutation-combination', label: 'Permutation & Combination Calculator', icon: FunctionSquare },
            { href: '/statistics/z-score', label: 'Z-Score Calculator', icon: Sigma },
            { href: '/statistics/confidence-interval', label: 'Confidence Interval Calculator', icon: ShieldCheck },
            { href: '/statistics/sequences', label: 'Sequence Calculators', icon: Milestone },
             { href: '/random', label: 'Random Number Generator', icon: Shuffle },
        ]
    },
    {
        title: "Advanced & Specialty",
        image: "/math%20calculator%20background%20image4.webp",
        tools: [
            { href: '/calculus', label: 'Calculus Calculator', icon: Sigma },
            { href: '/matrix', label: 'Matrix Calculators', icon: Table },
            { href: '/rref', label: 'RREF Calculator', icon: Sigma },
            { href: '/desmos-matrix', label: 'Desmos Matrix Calculator', icon: Table },
            { href: '/diagonalize-matrix', label: 'Diagonalize Matrix Calculator', icon: Table },
            { href: '/converter', label: 'Unit Converter', icon: Replace },
            { href: '/half-life', label: 'Half-Life Calculator', icon: Atom },
            { href: '/percent-error', label: 'Percent Error Calculator', icon: AlertTriangle },
            { href: '/ratio', label: 'Ratio Calculator', icon: Proportions },
            { href: '/destiny-matrix', label: 'Destiny Matrix Calculator', icon: Star },
        ]
    }
];


export default function Home() {
  return (
    <>
      <HeroSection />

      <main className="flex-1 p-4 md:p-6 lg:p-12">
        <section id="tools" className="space-y-16">
            {calculatorCategories.map(category => (
                <div key={category.title}>
                    <div className="relative h-48 w-full rounded-xl overflow-hidden mb-8 shadow-lg" role="presentation">
                        <Image
                            src={category.image}
                            alt={`${category.title} category background`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                         <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <h2 className="text-3xl md:text-4xl font-bold text-center text-white" style={{ textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)' }}>{category.title}</h2>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                        {category.tools.map((tool) => (
                            <Link href={tool.href} key={tool.label} className="group" aria-label={`Go to ${tool.label} calculator`}>
                            <Card className="h-full transition-all group-hover:shadow-lg group-hover:-translate-y-1">
                                <CardHeader className="flex flex-col items-center text-center p-4">
                                <div className="mb-2 rounded-full bg-primary/10 p-3 text-primary">
                                    <tool.icon className="h-6 w-6" aria-hidden="true" />
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
