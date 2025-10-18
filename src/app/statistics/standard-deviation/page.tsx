
import { PageHeader } from '@/components/page-header';
import StandardDeviationCalculator from '@/components/calculators/standard-deviation-calculator';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function StandardDeviationPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Standard Deviation Calculator" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-2xl space-y-8">
          <section className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Standard Deviation Calculator
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Please provide numbers separated by commas to calculate the standard deviation, variance, mean, sum, and margin of error.
            </p>
          </section>

          <StandardDeviationCalculator />

          <section className="space-y-6 text-muted-foreground">
            <h2 className="text-2xl font-bold text-foreground">How to Use the Standard Deviation Calculator</h2>
            <p>This calculator helps you compute standard deviation, variance, mean, sum, and margin of error from a list of numbers.</p>
            
            <div>
                <h3 className="text-xl font-semibold text-foreground">Step 1: Enter Your Numbers</h3>
                <p>Type or paste your data into the input box, separating each number with a comma.</p>
                <p className="font-mono bg-muted p-2 rounded-md my-2 text-center">10, 12, 23, 23, 16, 23, 21, 16</p>
                <p>You can enter as many numbers as you like — just make sure they’re separated by commas.</p>
            </div>
            
            <div>
                <h3 className="text-xl font-semibold text-foreground">Step 2: Choose Data Type</h3>
                <p>Select whether your numbers represent a:</p>
                <ul className="list-disc list-inside pl-4 mt-2">
                    <li><strong>Population</strong> — if you have data for everyone in the group.</li>
                    <li><strong>Sample</strong> — if your numbers are just a subset of a larger population.</li>
                </ul>
                <p>This affects the variance and standard deviation formulas.</p>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-foreground">Step 3: Click “Calculate”</h3>
                <p>Press the Calculate button. The calculator will instantly show all the computed values below.</p>
            </div>
            
             <div>
                <h3 className="text-xl font-semibold text-foreground">Step 4: Read the Results</h3>
                <p>You’ll see:</p>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Statistic</TableHead>
                            <TableHead>Description</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>Standard Deviation (σ)</TableCell>
                            <TableCell>How spread out your data is.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Count (N)</TableCell>
                            <TableCell>How many numbers you entered.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Sum (Σx)</TableCell>
                            <TableCell>The total of all your numbers.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Mean (μ)</TableCell>
                            <TableCell>The average value.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Variance (σ²)</TableCell>
                            <TableCell>The square of the standard deviation.</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
            
             <div>
                <h3 className="text-xl font-semibold text-foreground">Step 5: Understand the Steps</h3>
                <p>The “Steps” section shows the formula and exact calculations used to get the variance and standard deviation — perfect if you want to check or learn the math behind it.</p>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-foreground">Step 6: Check the Margin of Error</h3>
                <p>Below the steps, you’ll see Margin of Error (Confidence Intervals) for various confidence levels (68%, 90%, 95%, etc.). This tells you how much your sample mean might differ from the true population mean.</p>
                <p className="font-mono bg-muted p-2 rounded-md my-2">95%, 1.960σx̄ → 18 ±3.395 (±18.86%)</p>
                <p>This means the true mean is likely between 14.605 and 21.395 with 95% confidence.</p>
            </div>

             <div>
                <h3 className="text-xl font-semibold text-foreground">Step 7: Review the Frequency Table</h3>
                <p>Finally, the Frequency Table shows how many times each unique value appears in your data, along with its percentage share.</p>
                 <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Value</TableHead>
                        <TableHead>Frequency</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow><TableCell>10</TableCell><TableCell>1 (12.5%)</TableCell></TableRow>
                        <TableRow><TableCell>12</TableCell><TableCell>1 (12.5%)</TableCell></TableRow>
                        <TableRow><TableCell>16</TableCell><TableCell>2 (25%)</TableCell></TableRow>
                        <TableRow><TableCell>21</TableCell><TableCell>1 (12.5%)</TableCell></TableRow>
                        <TableRow><TableCell>23</TableCell><TableCell>3 (37.5%)</TableCell></TableRow>
                    </TableBody>
                </Table>
            </div>
          </section>
          
          <section className="text-center text-sm text-muted-foreground">
            <h3 className="font-semibold text-foreground">Related</h3>
            <div className="flex justify-center gap-4 mt-2">
                <Link href="/statistics" className="text-primary hover:underline">Statistics Calculator</Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
