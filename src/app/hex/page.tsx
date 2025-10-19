
import { PageHeader } from '@/components/page-header';
import HexCalculator from '@/components/calculators/hex-calculator';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const metadata: Metadata = {
    title: 'Hexadecimal Calculator',
    description: 'Perform hexadecimal arithmetic (add, subtract, multiply, divide) and convert between hexadecimal and decimal values with ease.',
};

const EducationalContent = () => (
    <Card>
        <CardHeader>
            <CardTitle>Understanding the Hexadecimal System</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground">
            <div>
                <h3 className="text-xl font-semibold text-foreground">What is Hexadecimal?</h3>
                <p className="mt-2">The hexadecimal number system (hex) functions similarly to the decimal and binary systems but uses a base of 16. It includes digits 0-9 and letters A-F to represent values 10-15. Each hex digit corresponds to four binary digits (a nibble), which simplifies the representation of large binary numbers.</p>
                <p className="mt-2">For example, the binary value 110110101110 can be represented as DAE in hex. This helps computers compress large binary values in a way that is easily convertible between the two systems.</p>
            </div>

            <div>
                 <h3 className="text-xl font-semibold text-foreground">Hex, Binary, and Decimal Conversions</h3>
                <Table className="mt-2">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Hex</TableHead><TableHead>Binary</TableHead><TableHead>Decimal</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[...Array(16).keys()].map(i => (
                            <TableRow key={i}>
                                <TableCell>{i.toString(16).toUpperCase()}</TableCell>
                                <TableCell>{i.toString(2).padStart(4, '0')}</TableCell>
                                <TableCell>{i}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            
            <div>
                <h3 className="text-xl font-semibold text-foreground">Hex to Decimal Conversion</h3>
                <p className="mt-2">Converting from hex to decimal involves understanding place values. Each position in a hex number represents a power of 16. For example, to convert 3BC:</p>
                <p className="font-mono bg-muted p-2 rounded-md my-2 text-center">3BC₁₆ = (3 × 16²) + (11 × 16¹) + (12 × 16⁰) = 768 + 176 + 12 = 956₁₀</p>
            </div>

             <div>
                <h3 className="text-xl font-semibold text-foreground">Decimal to Hex Conversion</h3>
                <p className="mt-2">To convert a decimal number to hex, follow these steps:</p>
                 <ol className="list-decimal list-inside mt-2 space-y-2">
                    <li>Find the largest power of 16 that fits into your number.</li>
                    <li>Divide your number by this power of 16 and note the whole number part.</li>
                    <li>Multiply that whole number by the power of 16 and subtract it from your original number to get a remainder.</li>
                    <li>Repeat with the remainder until it is less than 16.</li>
                </ol>
                <p className="mt-2">For example, to convert decimal 956 to hex:</p>
                 <ul className="list-disc list-inside mt-2 space-y-1 font-mono text-sm bg-muted p-4 rounded-md">
                    <li>956 ÷ 256 (16²) = 3 with a remainder. So, the first digit is 3.</li>
                    <li>956 - (3 × 256) = 188.</li>
                    <li>188 ÷ 16 (16¹) = 11 (B) with a remainder. The second digit is B.</li>
                    <li>188 - (11 × 16) = 12 (C). The last digit is C.</li>
                </ul>
                <p className="mt-2">Result: 3BC₁₆.</p>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-foreground">Hexadecimal Arithmetic</h3>
                <div className="space-y-4 mt-2">
                    <div>
                        <h4 className="font-semibold text-foreground">Addition</h4>
                        <p>Hex addition works like decimal addition. When a sum exceeds 15, you find how many 16s are in it, carry that over, and write down the remainder.</p>
                        <p className="font-mono bg-muted p-2 rounded-md my-2">Example: 1A + C = 26 + 12 = 38.  38 is 2 × 16 + 6, so the result is 26₁₆.</p>
                    </div>
                     <div>
                        <h4 className="font-semibold text-foreground">Subtraction</h4>
                        <p>When "borrowing" in hex subtraction, you borrow a value of 16, not 10.</p>
                    </div>
                     <div>
                        <h4 className="font-semibold text-foreground">Multiplication & Division</h4>
                        <p>These operations follow the same principles as their decimal counterparts but require conversions between hex and decimal at each step.</p>
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
);


export default function HexPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Hexadecimal Calculator" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-2xl space-y-8">
            <section className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                    Hex Calculator
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Use the following calculators to perform the addition, subtraction, multiplication, or division of two hexadecimal values, as well as convert hex values to decimal values, and vice versa.
                </p>
            </section>
            
            <HexCalculator />

            <EducationalContent />
        </div>
      </main>
    </div>
  );
}
