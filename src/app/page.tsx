import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, FunctionSquare, InfinityIcon, BarChartHorizontal, Milestone } from 'lucide-react';
import BasicCalculator from '@/components/calculators/basic-calculator';

const tools = [
  {
    href: '/algebra',
    label: 'Algebra',
    icon: FunctionSquare,
    description: 'Solve linear equations with ease.',
  },
  {
    href: '/calculus',
    label: 'Calculus',
    icon: InfinityIcon,
    description: 'Derivatives, integrals, and limits.',
  },
  {
    href: '/statistics',
    label: 'Statistics',
    icon: BarChartHorizontal,
    description: 'Mean, median, mode, and more.',
  },
  {
    href: '/converter',
    label: 'Converter',
    icon: Milestone,
    description: 'Convert units of measurement.',
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Math Calculators
            </h1>
            <p className="mx-auto max-w-[700px] text-primary-foreground/80 md:text-xl">
              Your one-stop solution for all mathematical calculations. From basic arithmetic to advanced calculus.
            </p>
            <Button asChild variant="secondary" size="lg">
              <Link href="#basic-calculator">Get Started</Link>
            </Button>
          </div>
        </div>
      </section>

      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <section id="basic-calculator" className="mx-auto max-w-4xl py-12">
            <h2 className="text-3xl font-bold text-center mb-8">Basic Arithmetic</h2>
            <BasicCalculator />
        </section>

        <section id="tools" className="py-12">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-8">Discover Our Tools</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {tools.map((tool) => (
                <Link href={tool.href} key={tool.href} className="group">
                  <Card className="h-full transition-all group-hover:shadow-lg group-hover:-translate-y-1">
                    <CardHeader className="flex flex-col items-center text-center">
                      <div className="mb-4 rounded-full bg-primary/10 p-4 text-primary">
                        <tool.icon className="h-8 w-8" />
                      </div>
                      <CardTitle>{tool.label}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-muted-foreground">{tool.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
