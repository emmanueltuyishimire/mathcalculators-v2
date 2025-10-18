import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, FunctionSquare, InfinityIcon, BarChartHorizontal, Milestone, FlaskConical, Square, MoreVertical, Table, Type, Sigma, Replace } from 'lucide-react';
import BasicCalculator from '@/components/calculators/basic-calculator';

const tools = [
  {
    href: '/scientific',
    label: 'Scientific',
    icon: FlaskConical,
    description: 'Advanced functions and operations.',
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
    href: '/rref',
    label: 'RREF',
    icon: Sigma,
    description: 'Solve systems of linear equations.',
  },
  {
    href: '/converter',
    label: 'Unit Converter',
    icon: Replace,
    description: 'Convert between different units.',
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              MathMaster: Simple & Powerful Calculators
            </h1>
            <p className="mx-auto max-w-[700px] text-primary-foreground/80 md:text-xl">
              Your one-stop solution for all mathematical calculations. From basic arithmetic to advanced functions.
            </p>
            <Button asChild variant="secondary" size="lg">
              <Link href="#tools">Get Started</Link>
            </Button>
          </div>
        </div>
      </section>

      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <section id="tools" className="py-12">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-8">Discover Our Tools</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
