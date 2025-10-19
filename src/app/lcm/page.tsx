
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
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground">
            <div>
                <h3 className="text-xl font-semibold text-foreground">What is the Least Common Multiple (LCM)?</h3>
                <p className="mt-2">
                    In mathematics, the least common multiple, also known as the lowest common multiple of two (or more) integers a and b, is the smallest positive integer that is divisible by both. It is commonly denoted as LCM(a, b).
                </p>
            </div>
            
            <div>
                <h3 className="text-xl font-semibold text-foreground">How to Find the LCM</h3>
                <p className="mt-2">There are multiple ways to find a least common multiple. Here are a few common methods:</p>
                
                <div className="mt-4 space-y-6">
                    <div>
                        <h4 className="font-semibold text-foreground">Brute Force Method</h4>
                         <p className="mt-1">This basic method involves listing the multiples of each integer until you find the first common multiple.</p>
                        <p className="p-2 bg-muted rounded-md text-sm mt-2">
                            <b>Example: Find LCM(18, 26)</b><br/>
                            18: 18, 36, 54, 72, 90, 108, 126, 144, 162, 180, 198, 216, <b>234</b>, ...<br/>
                            26: 26, 52, 78, 104, 130, 156, 182, 208, <b>234</b>, ...<br/>
                            As can be seen, this method can be fairly tedious, and is far from ideal.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-foreground">Prime Factorization Method</h4>
                        <p className="mt-1">A more systematic way to find the LCM is to use prime factorization. This involves breaking down each number into its product of prime numbers. The LCM is then determined by multiplying the highest power of each prime number together.</p>
                         <p className="p-2 bg-muted rounded-md text-sm mt-2">
                            <b>Example: Find LCM(21, 14, 38)</b><br/>
                            Prime factorization of 21: 3 × 7<br/>
                            Prime factorization of 14: 2 × 7<br/>
                            Prime factorization of 38: 2 × 19<br/>
                            The LCM is therefore: 3 × 7 × 2 × 19 = <b>798</b>.
                        </p>
                        <p className="mt-2 text-xs">Note that computing the LCM this way, while more efficient than using the "brute force" method, is still limited to smaller numbers.</p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-foreground">Greatest Common Divisor (GCD) Method</h4>
                        <p className="mt-1">A third viable method for finding the LCM is using the greatest common divisor (also known as GCF). The procedure for finding the LCM of two numbers (a, b) is to divide their product by their GCF: <code className="font-mono text-xs bg-muted p-1 rounded-md">(a × b) / GCF(a, b)</code>.</p>
                        <p className="mt-2">When finding the LCM of more than two numbers, you can apply this method iteratively. For example, for LCM(a, b, c), you would first find the LCM of a and b, let's call it q, and then find the LCM of q and c.</p>
                         <p className="p-2 bg-muted rounded-md text-sm mt-2">
                            <b>Example: Find LCM(21, 14, 38)</b><br/>
                            First, find LCM(14, 38). GCF(14, 38) = 2.<br/>
                            LCM(14, 38) = (14 × 38) / 2 = 266.<br/>
                            Next, find LCM(21, 266). GCF(21, 266) = 7.<br/>
                            LCM(21, 266) = (21 × 266) / 7 = <b>798</b>.
                        </p>
                        <p className="mt-2 text-xs">It is not important which LCM is calculated first as long as all numbers are used. Depending on the particular situation, each method has its own merits.</p>
                    </div>
                </div>
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
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
