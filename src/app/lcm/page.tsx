
import { PageHeader } from '@/components/page-header';
import LcmCalculator from '@/components/calculators/lcm-calculator';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Least Common Multiple (LCM) Calculator',
    description: 'A free online calculator to find the least common multiple (LCM) of a set of numbers. Includes step-by-step solutions using prime factorization.',
};


const EducationalContent = () => (
    <Card>
        <CardHeader>
            <CardTitle>Understanding the Least Common Multiple (LCM)</CardTitle>
            <CardDescription>The smallest positive integer that is divisible by all numbers in a set.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div>
                <h3 className="text-xl font-semibold text-foreground">What is the LCM?</h3>
                <p className="text-muted-foreground mt-2">
                    In mathematics, the least common multiple (LCM), also known as the lowest common multiple, of two or more integers is the smallest positive integer that is divisible by all of them. It is commonly denoted as LCM(a, b).
                </p>
            </div>
            
            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">How to Find the LCM</h3>
                <p className="text-muted-foreground">There are several methods to find the LCM. Here are three common approaches:</p>
                
                <Card>
                    <CardHeader>
                        <CardTitle>1. The Brute Force Method</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <p className="text-muted-foreground">This basic method involves listing the multiples of each integer until you find the first common multiple. While intuitive, it can be tedious for larger numbers.</p>
                        <div className="p-4 bg-muted rounded-md text-sm mt-2 font-mono">
                            <b>Example: Find LCM(18, 26)</b><br/>
                            <p className="mt-2">Multiples of 18: 18, 36, 54, 72, 90, 108, 126, 144, 162, 180, 198, 216, <b>234</b>, ...</p>
                            <p>Multiples of 26: 26, 52, 78, 104, 130, 156, 182, 208, <b>234</b>, ...</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>2. The Prime Factorization Method</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">A more systematic way is to break down each number into its prime factors. The LCM is the product of the highest power of each prime number that appears in any of the factorizations.</p>
                         <div className="p-4 bg-muted rounded-md text-sm mt-2 font-mono">
                            <b>Example: Find LCM(21, 14, 38)</b><br/>
                            <p className="mt-2">Prime factorization of 21: 3 × 7</p>
                            <p>Prime factorization of 14: 2 × 7</p>
                            <p>Prime factorization of 38: 2 × 19</p>
                            <p className="mt-2">The LCM is found by taking the highest power of each prime factor present (2, 3, 7, 19):<br/> 2 × 3 × 7 × 19 = <b>798</b>.</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>3. The Greatest Common Divisor (GCD) Method</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">A third method uses the greatest common divisor (GCD). For two numbers, the formula is: <code className="font-mono text-xs bg-muted p-1 rounded-md">LCM(a, b) = (|a × b|) / GCD(a, b)</code>.</p>
                        <p className="text-muted-foreground mt-2">To find the LCM of more than two numbers, you can apply this method iteratively.</p>
                         <div className="p-4 bg-muted rounded-md text-sm mt-2 font-mono">
                            <b>Example: Find LCM(21, 14, 38)</b><br/>
                            <p className="mt-2">First, find LCM(14, 38). The GCD(14, 38) is 2.</p>
                            <p>LCM(14, 38) = (14 × 38) / 2 = <b>266</b>.</p>
                            <p className="mt-2">Next, find LCM of the result and the next number: LCM(21, 266). The GCD(21, 266) is 7.</p>
                            <p>LCM(21, 266) = (21 × 266) / 7 = <b>798</b>.</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </CardContent>
    </Card>
);

export default function LcmPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Least Common Multiple Calculator" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-2xl space-y-8">
            <section className="text-center">
                 <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Least Common Multiple Calculator
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Please provide numbers separated by a comma "," and click the "Calculate" button to find the LCM.
                </p>
            </section>
          <LcmCalculator />
          <EducationalContent />
          <section className="text-center">
            <h2 className="text-2xl font-bold text-foreground">Related Calculators</h2>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
                <Button asChild variant="outline">
                    <Link href="/basic">Basic Calculators</Link>
                </Button>
                 <Button asChild variant="outline">
                    <Link href="/fraction">Fraction Calculator</Link>
                </Button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
