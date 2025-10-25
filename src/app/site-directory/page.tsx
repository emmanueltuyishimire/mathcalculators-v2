
"use client";
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { PageHeader } from '@/components/page-header';
import { 
    Calculator, FunctionSquare, BarChartHorizontal, FlaskConical, Square, MoreVertical, Table, 
    Type, Sigma, Replace, Star, TrendingUp, Move3d, Triangle, Divide, Percent, Shuffle, 
    AlertTriangle, Superscript, Binary, Code, Atom, Proportions, Radical, Gavel, Hand, 
    CheckCircle, InfinityIcon, Waves, Volume, ShieldCheck, Milestone, Circle, Home, Info, Mail
} from 'lucide-react';
import React from 'react';

const sitemapData = [
    {
        category: "Main Pages",
        icon: Home,
        items: [
            { href: '/', label: 'Homepage', icon: Home },
            { href: '/calculators', label: 'All Calculators', icon: Calculator },
            { href: '/about', label: 'About Us', icon: Info },
            { href: '/contact', label: 'Contact', icon: Mail },
            { href: '/privacy-policy', label: 'Privacy Policy', icon: ShieldCheck },
            { href: '/terms-of-service', label: 'Terms of Service', icon: Gavel },
            { href: '/disclaimer', label: 'Disclaimer', icon: AlertTriangle },
        ]
    },
    {
        category: "Basic & Algebra Calculators",
        icon: FunctionSquare,
        items: [
            { href: '/algebra', label: 'Algebra Calculator', icon: Type },
            { href: '/basic', label: 'Basic Calculators', icon: Calculator },
            { href: '/scientific', label: 'Scientific Calculator', icon: FlaskConical },
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
            { href: '/scientific-notation', label: 'Scientific Notation Calculator', icon: Type },
            { href: '/ratio', label: 'Ratio Calculator', icon: Proportions },
            { href: '/percent-error', label: 'Percent Error Calculator', icon: AlertTriangle },
        ]
    },
    {
        category: "Geometry & Trigonometry",
        icon: Square,
        items: [
            { href: '/geometry', label: 'Geometry Calculators', icon: Square },
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
        category: "Statistics & Probability",
        icon: BarChartHorizontal,
        items: [
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
        category: "Advanced & Specialty",
        icon: Sigma,
        items: [
            { href: '/calculus', label: 'Calculus Calculator', icon: Sigma },
            { href: '/matrix', label: 'Matrix Calculators', icon: Table },
            { href: '/rref', label: 'RREF Calculator', icon: Sigma },
            { href: '/desmos-matrix', label: 'Desmos Matrix Calculator', icon: Table },
            { href: '/diagonalize-matrix', label: 'Diagonalize Matrix Calculator', icon: Table },
            { href: '/half-life', label: 'Half-Life Calculator', icon: Atom },
            { href: '/destiny-matrix', label: 'Destiny Matrix Calculator', icon: Star },
            { href: '/unit-converter', label: 'Unit Converter', icon: Replace },
        ]
    }
];

export default function SitemapPage() {
  return (
    <>
      <div className="flex flex-1 flex-col">
        <PageHeader title="Site Directory" />
        <main className="flex-1 p-4 md:p-6 lg:p-12">
          <div className="mx-auto max-w-6xl space-y-12">
            <section className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Site Directory
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Browse all pages and calculator tools available on our website.
              </p>
            </section>
            
            <div className="space-y-12">
              {sitemapData.map((category) => (
                <div key={category.category}>
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <category.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                        {category.category}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {category.items.map((item) => (
                        <Link href={item.href} key={item.href} className="group">
                           <Card className="h-full transition-all group-hover:shadow-lg group-hover:-translate-y-1">
                             <CardHeader className="flex flex-row items-center gap-3 space-y-0 p-4">
                               <div className="rounded-full bg-primary/10 p-2 text-primary">
                                 <item.icon className="h-5 w-5" aria-hidden="true" />
                               </div>
                               <CardTitle className="text-base">{item.label}</CardTitle>
                             </CardHeader>
                           </Card>
                         </Link>
                      ))}
                    </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
