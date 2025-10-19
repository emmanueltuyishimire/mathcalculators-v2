
import HalfLifeCalculator from '@/components/calculators/half-life-calculator';
import { PageHeader } from '@/components/page-header';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const metadata: Metadata = {
  title: 'Half-Life Calculator',
  description: 'Calculate half-life, initial quantity, remaining quantity, or time elapsed. Also convert between half-life, mean lifetime, and decay constant.',
};

const HowToUseGuide = () => (
    <Card>
        <CardHeader>
            <CardTitle>How to Use the Half-Life Calculators</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground">
            <div>
                <h3 className="text-xl font-semibold text-foreground">Half-Life Decay Formula Calculator</h3>
                 <ol className="list-decimal list-inside space-y-2 mt-2">
                    <li>This calculator solves the equation: `Nt = N0 × (1/2)^(t/t½)`.</li>
                    <li>Enter any three of the four values: Remaining Quantity (Nt), Initial Quantity (N0), Time Elapsed (t), or Half-Life (t½).</li>
                    <li>Leave the field you want to solve for empty.</li>
                    <li>Click "Calculate" to find the missing value.</li>
                </ol>
            </div>
             <div>
                <h3 className="text-xl font-semibold text-foreground">Conversion Calculator</h3>
                 <ol className="list-decimal list-inside space-y-2 mt-2">
                    <li>This tool converts between Half-Life (t½), Mean Lifetime (τ), and Decay Constant (λ).</li>
                    <li>Enter any one of the three values.</li>
                    <li>The other two values will be calculated and displayed automatically.</li>
                </ol>
            </div>
        </CardContent>
    </Card>
);

const CalculatorLogic = () => (
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

const EducationalContent = () => (
    <Card>
        <CardHeader>
            <CardTitle>What is Half-Life?</CardTitle>
            <CardDescription>A deeper look into the concept of half-life and its applications.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div>
                <h3 className="text-xl font-semibold text-foreground">Definition and Core Concept</h3>
                <p className="text-muted-foreground mt-2"><b>Half-life</b> is the time it takes for a substance to reduce to half of its initial amount. While commonly associated with the radioactive decay of atoms, it applies to any quantity that follows an exponential decay pattern.</p>
                <p className="text-muted-foreground mt-2">One of its most famous applications is <b>carbon-14 dating</b>. Carbon-14, which has a half-life of about 5,730 years, is constantly created in the atmosphere and absorbed by plants and, in turn, by animals. When an organism dies, it stops absorbing carbon-14, and the existing amount begins to decay. By measuring the remaining carbon-14, scientists can date organic remains up to around 50,000 years old.</p>
            </div>
            <div>
                <h3 className="text-xl font-semibold text-foreground">The Three Exponential Decay Formulas</h3>
                <p className="text-muted-foreground mt-2">Exponential decay can be described using three equivalent formulas, where <b>N₀</b> is the initial quantity, and <b>N(t)</b> is the quantity remaining after time <b>t</b>.</p>
                 <div className="space-y-4 font-mono bg-muted p-4 rounded-md text-sm">
                    <p>1. Using Half-Life (t½): <b>N(t) = N₀ × (1/2)^(t/t½)</b></p>
                    <p>2. Using Mean Lifetime (τ): <b>N(t) = N₀ × e^(-t/τ)</b></p>
                    <p>3. Using Decay Constant (λ): <b>N(t) = N₀ × e^(-λt)</b></p>
                </div>
            </div>
            <div>
                <h3 className="text-xl font-semibold text-foreground">Example: Carbon-Dating a Fossil</h3>
                <p className="text-muted-foreground mt-2">Imagine an archaeologist finds a fossil with 25% of the carbon-14 found in a living sample. Given that N(t)/N₀ = 0.25 and the half-life of carbon-14 is 5,730 years, we can find the age (t):</p>
                 <div className="space-y-2 font-mono bg-background p-4 rounded-md text-xs border">
                    <p>0.25 = (1/2)^(t / 5730)</p>
                    <p>ln(0.25) = (t / 5730) × ln(0.5)</p>
                    <p>t = 5730 × (ln(0.25) / ln(0.5))</p>
                    <p>t = 5730 × (-1.386 / -0.693)</p>
                    <p>t = 5730 × 2</p>
                    <p className="font-semibold">t = 11,460 years</p>
                </div>
                <p className="text-muted-foreground mt-2">This calculation indicates the fossil is approximately 11,460 years old.</p>
            </div>
             <div>
                <h3 className="text-xl font-semibold text-foreground">Connecting Half-Life, Mean Lifetime, and Decay Constant</h3>
                <p className="text-muted-foreground mt-2">By setting the formulas equal to each other, we can derive the relationship between these three key constants. Starting with N(t) = N₀ × (1/2)^(t/t½) and N(t) = N₀ × e^(-λt):</p>
                 <div className="space-y-2 font-mono bg-muted p-4 rounded-md text-sm">
                    <p>(1/2)^(t/t½) = e^(-λt)</p>
                    <p>(t/t½) × ln(0.5) = -λt</p>
                    <p>- (t/t½) × ln(2) = -λt</p>
                    <p><b>λ = ln(2) / t½</b></p>
                </div>
                <p className="text-muted-foreground mt-2">Since mean lifetime <b>τ = 1/λ</b>, we get:</p>
                 <div className="space-y-2 font-mono bg-muted p-4 rounded-md text-sm">
                     <p><b>τ = t½ / ln(2)</b></p>
                </div>
                 <p className="text-muted-foreground mt-2">These relationships allow you to convert between all three values, which the second calculator on this page does automatically.</p>
            </div>
        </CardContent>
    </Card>
);

const FaqSection = () => (
    <Card>
        <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>Is half-life only for radioactive decay?</AccordionTrigger>
                    <AccordionContent>
                        No. While it's most famously used for radioactive decay, the concept of half-life applies to any quantity that undergoes exponential decay. This includes the elimination of drugs from the body, the decay of a sound in a room, or the depreciation of certain assets.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>What is the difference between half-life, mean lifetime, and decay constant?</AccordionTrigger>
                    <AccordionContent>
                        - **Half-Life (t½):** The time it takes for half of the substance to decay.<br/>
                        - **Mean Lifetime (τ):** The average lifetime of a particle before it decays. It is always longer than the half-life (τ ≈ 1.44 × t½).<br/>
                        - **Decay Constant (λ):** Represents the probability of decay per unit of time. A larger decay constant means a faster decay. It is the reciprocal of the mean lifetime (λ = 1/τ).
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>Can I use any units for time and quantity?</AccordionTrigger>
                    <AccordionContent>
                        Yes, as long as you are consistent. If you enter the half-life in years, the elapsed time will also be in years. Similarly, the units for initial and remaining quantity (e.g., grams, %, number of atoms) must be the same.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger>Why can't I use negative numbers for quantities or half-life?</AccordionTrigger>
                    <AccordionContent>
                        Physical quantities like amount of substance and time cannot be negative. Additionally, the mathematical formulas for decay involve logarithms, which are not defined for non-positive numbers. The calculator requires positive values for these inputs to ensure a meaningful result.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
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
          <HowToUseGuide />
          <CalculatorLogic />
          <EducationalContent />
          <FaqSection />
        </div>
      </main>
    </div>
  );
}
