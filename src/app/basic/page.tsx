
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, Divide, Percent, Shuffle, AlertTriangle, Superscript, Binary, Code, Atom, Sigma, Proportions, Radical, Gavel, Hand, CheckCircle, Table, Type, InfinityIcon } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Basic Calculators',
  description: 'A collection of basic calculators for everyday use, including scientific, fraction, percentage, and more.',
};

const basicTools = [
  { href: '/scientific', label: 'Scientific Calculator', icon: Atom },
  { href: '/fraction', label: 'Fraction Calculator', icon: Divide },
  { href: '/percentage', label: 'Percentage Calculator', icon: Percent },
  { href: '/random', label: 'Random Number Generator', icon: Shuffle },
  { href: '/percent-error', label: 'Percent Error Calculator', icon: AlertTriangle },
  { href: '/exponent', label: 'Exponent Calculator', icon: Superscript },
  { href: '/binary', label: 'Binary Calculator', icon: Binary },
  { href: '#', label: 'Hex Calculator', icon: Code },
  { href: '#', label: 'Half-Life Calculator', icon: Atom },
  { href: '#', label: 'Quadratic Formula', icon: Sigma },
  { href: '#', label: 'Log Calculator', icon: Calculator },
  { href: '#', label: 'Ratio Calculator', icon: Proportions },
  { href: '#', label: 'Root Calculator', icon: Radical },
  { href: '#', label: 'Least Common Multiple', icon: Gavel },
  { href: '#', label: 'Greatest Common Factor', icon: Hand },
  { href: '#', label: 'Factor Calculator', icon: Gavel },
  { href: '#', label: 'Rounding Calculator', icon: CheckCircle },
  { href: '/matrix', label: 'Matrix Calculator', icon: Table },
  { href: '#', label: 'Scientific Notation', icon: Type },
  { href: '#', label: 'Big Number Calculator', icon: InfinityIcon },
];

export default function BasicCategoryPage() {
  return (
    <div className="flex flex-1 flex-col">
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-4xl space-y-8">
            <section className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                    Basic Calculators
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    A collection of essential calculators for everyday math and science problems.
                </p>
            </section>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {basicTools.map((tool) => (
                <Link href={tool.href} key={tool.label} className="group">
                  <Card className="h-full transition-all group-hover:shadow-lg group-hover:-translate-y-1">
                    <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                       <div className="rounded-full bg-primary/10 p-3 text-primary">
                        <tool.icon className="h-6 w-6" />
                      </div>
                      <CardTitle>{tool.label}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">An essential calculation tool.</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
        </div>
      </main>
    </div>
  );
}
