
import { PageHeader } from '@/components/page-header';
import RootCalculator from '@/components/calculators/root-calculator';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Root Calculator',
    description: 'Calculate square roots, cube roots, and nth roots of any number. Includes examples and explanations on how to estimate roots.',
};

const EducationalContent = () => (
    <Card>
        <CardHeader>
            <CardTitle>Understanding Roots</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground">
            <div>
                <p>In mathematics, the general root, or the <strong>nth root</strong> of a number <em>a</em> is another number <em>b</em> that when multiplied by itself <em>n</em> times, equals <em>a</em>. In equation format:</p>
                <p className="font-mono bg-muted p-4 rounded-md text-center text-lg my-2"><sup>n</sup>√a = b  &nbsp;&nbsp;which means&nbsp;&nbsp;  bⁿ = a</p>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-foreground">Estimating a Square Root</h3>
                <p>Some common roots include the square root, where n = 2, and the cubed root, where n = 3. Calculating square roots and nth roots is fairly intensive. It requires estimation and trial and error. There exist more precise and efficient ways to calculate square roots, but below is a method that does not require a significant understanding of more complicated math concepts. To calculate √a:</p>
                <ol className="list-decimal list-inside mt-2 space-y-2">
                    <li>Estimate a number <em>b</em>.</li>
                    <li>Divide <em>a</em> by <em>b</em>. If the number <em>c</em> returned is precise to the desired decimal place, stop.</li>
                    <li>Average <em>b</em> and <em>c</em> and use the result as a new guess.</li>
                    <li>Repeat step two.</li>
                </ol>
                <div className="p-4 border-l-4 border-primary/50 bg-muted/50 rounded-r-lg mt-2">
                  <h4 className="font-semibold">Example: Find √27 to 3 decimal places</h4>
                  <ul className="font-mono text-sm mt-2 space-y-1">
                    <li>Guess: 5.125</li>
                    <li>27 ÷ 5.125 = 5.268</li>
                    <li>(5.125 + 5.268)/2 = 5.197</li>
                    <li>27 ÷ 5.197 = 5.195</li>
                    <li>(5.195 + 5.197)/2 = 5.196</li>
                    <li>27 ÷ 5.196 = 5.196. The result is <b>5.196</b>.</li>
                  </ul>
                </div>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-foreground">Estimating an nth Root</h3>
                <p>Calculating nth roots can be done using a similar method, with modifications to deal with n. For a simpler, but less efficient method, follow these steps:</p>
                 <ol className="list-decimal list-inside mt-2 space-y-2">
                    <li>Estimate a number <em>b</em>.</li>
                    <li>Divide <em>a</em> by b<sup>n-1</sup>. If the number <em>c</em> returned is precise to the desired decimal place, stop.</li>
                    <li>Average: [b × (n-1) + c] / n</li>
                    <li>Repeat step two.</li>
                </ol>
                 <div className="p-4 border-l-4 border-primary/50 bg-muted/50 rounded-r-lg mt-2">
                  <h4 className="font-semibold">Example: Find ⁸√15 to 3 decimal places</h4>
                   <ul className="font-mono text-sm mt-2 space-y-1">
                    <li>Guess: 1.432</li>
                    <li>15 ÷ 1.432⁷ = 1.405</li>
                    <li>(1.432 × 7 + 1.405)/8 = 1.388</li>
                    <li>15 ÷ 1.388⁷ = 1.403</li>
                    <li>(1.403 × 7 + 1.388)/8 = 1.402</li>
                  </ul>
                  <p className="mt-2">It should then be clear that computing any further will result in a number that would round to 1.403, making 1.403 the final estimate to 3 decimal places.</p>
                </div>
            </div>
        </CardContent>
    </Card>
);

export default function RootPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Root Calculator" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-2xl space-y-8">
            <RootCalculator />
            <EducationalContent />
            <section className="text-center">
                <h2 className="text-2xl font-bold text-foreground">Related Calculators</h2>
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                    <Button asChild variant="outline">
                        <Link href="/exponent">Exponent Calculator</Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link href="/scientific">Scientific Calculator</Link>
                    </Button>
                     <Button asChild variant="outline">
                        <Link href="/log">Log Calculator</Link>
                    </Button>
                </div>
            </section>
        </div>
      </main>
    </div>
  );
}
