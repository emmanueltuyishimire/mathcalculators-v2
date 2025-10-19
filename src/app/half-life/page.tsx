
import HalfLifeCalculator from '@/components/calculators/half-life-calculator';
import { PageHeader } from '@/components/page-header';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const metadata: Metadata = {
  title: 'Half-Life Calculator',
  description: 'Calculate half-life, initial quantity, remaining quantity, or time elapsed. Also convert between half-life, mean lifetime, and decay constant.',
};

const EducationalContent = () => (
    <Card>
        <CardHeader>
            <CardTitle>Half-Life Formulas and Logic</CardTitle>
            <CardDescription>Understanding the calculations behind the Half-Life Calculator.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
            <div>
                <h3 className="text-xl font-semibold text-foreground">Part 1: Half-Life Decay Formula</h3>
                <p className="text-muted-foreground mt-2">The fundamental formula for exponential decay is:</p>
                <p className="font-mono bg-muted p-4 rounded-md text-center text-lg my-2">Nₜ = N₀ × (1/2)^(t/t½)</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                    <li><b>Nₜ</b> = remaining quantity</li>
                    <li><b>N₀</b> = initial quantity</li>
                    <li><b>t</b> = elapsed time</li>
                    <li><b>t½</b> = half-life</li>
                </ul>
                <div className="mt-4 space-y-2">
                    <p>This formula can be rearranged to solve for any of the four variables:</p>
                    <ol className="list-decimal list-inside space-y-4 text-sm">
                        <li><b>Solve for Remaining Quantity (Nₜ):</b> <code className="font-mono bg-muted p-1 rounded-md">Nₜ = N₀ × (1/2)^(t/t½)</code></li>
                        <li><b>Solve for Initial Quantity (N₀):</b> <code className="font-mono bg-muted p-1 rounded-md">N₀ = Nₜ / (1/2)^(t/t½)</code></li>
                        <li><b>Solve for Time (t):</b> <code className="font-mono bg-muted p-1 rounded-md">t = t½ × ln(Nₜ/N₀) / ln(1/2)</code></li>
                        <li><b>Solve for Half-Life (t½):</b> <code className="font-mono bg-muted p-1 rounded-md">t½ = t × ln(1/2) / ln(Nₜ/N₀)</code></li>
                    </ol>
                </div>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-foreground">Part 2: Conversions</h3>
                <p className="text-muted-foreground mt-2">Half-life (t½), mean lifetime (τ), and decay constant (λ) are all related through exponential decay principles.</p>
                <p className="font-mono bg-muted p-2 rounded-md my-2">λ = ln(2) / t½</p>
                <p className="font-mono bg-muted p-2 rounded-md my-2">τ = 1 / λ = t½ / ln(2)</p>

                <h4 className="font-semibold mt-4">Summary Table:</h4>
                <Table className="mt-2">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Known Value</TableHead>
                            <TableHead>Formula for Mean Lifetime (τ)</TableHead>
                            <TableHead>Formula for Decay Constant (λ)</TableHead>
                            <TableHead>Formula for Half-Life (t½)</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>Half-Life (t½)</TableCell>
                            <TableCell>τ = t½ / ln(2)</TableCell>
                            <TableCell>λ = ln(2) / t½</TableCell>
                            <TableCell>—</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Mean Lifetime (τ)</TableCell>
                            <TableCell>—</TableCell>
                            <TableCell>λ = 1 / τ</TableCell>
                            <TableCell>t½ = τ × ln(2)</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Decay Constant (λ)</TableCell>
                            <TableCell>τ = 1 / λ</TableCell>
                            <TableCell>—</TableCell>
                            <TableCell>t½ = ln(2) / λ</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </CardContent>
    </Card>
);

export default function HalfLifePage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Half-Life Calculator" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-2xl space-y-8">
            <section className="text-center">
                 <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                    Half-Life Calculator
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                   The following tools can generate any one of the values from the other three in the half-life formula for a substance undergoing decay to decrease by half.
                </p>
            </section>
          <HalfLifeCalculator />
          <EducationalContent />
        </div>
      </main>
    </div>
  );
}
