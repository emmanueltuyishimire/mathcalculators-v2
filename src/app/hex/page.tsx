
"use client";

import { PageHeader } from '@/components/page-header';
import HexCalculator from '@/components/calculators/hex-calculator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const HexMultiplicationTable = () => {
    const headers = [...Array(16).keys()].map(i => i.toString(16).toUpperCase());
    const rows = [...Array(16).keys()].map(i => i.toString(16).toUpperCase());
    const perfectSquares = new Set(['1', '4', '9', '10', '19', '24', '31', '40', '51', '64', '79', '90', 'A9', 'C4', 'E1']);

    return (
        <div>
            <h3 className="text-xl font-semibold text-foreground">Hexadecimal Multiplication Table</h3>
            <div className="overflow-x-auto mt-2 rounded-lg border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-center font-bold text-primary bg-primary/10 sticky left-0">×</TableHead>
                            {headers.map(h => <TableHead key={h} className="text-center font-bold text-primary bg-primary/10">{h}</TableHead>)}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rows.map((row, rowIndex) => (
                            <TableRow key={row}>
                                <TableHead className="text-center font-bold text-primary bg-primary/10 sticky left-0">{row}</TableHead>
                                {headers.map((col, colIndex) => {
                                    const value = (rowIndex * colIndex).toString(16).toUpperCase();
                                    const isPerfectSquare = rowIndex === colIndex;
                                    return (
                                        <TableCell key={`${row}-${col}`} className={`text-center font-mono text-xs ${isPerfectSquare ? 'bg-primary/20 text-primary font-bold' : ''}`}>
                                            {value}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
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
                <p className="mt-2">For example, the binary value for 110110101110 can be written more concisely as DAE in hex. This compression helps computers manage large binary values in a format that is easily convertible between the two systems.</p>
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
                <p className="mt-2">To convert from hexadecimal to decimal, you need to understand its place value system. Each position in a hexadecimal number represents a power of 16. For instance, to convert the hex value 3BC to decimal:</p>
                <p className="font-mono bg-muted p-2 rounded-md my-2 text-center">3BC₁₆ = (3 × 16²) + (11 × 16¹) + (12 × 16⁰) = 768 + 176 + 12 = 956₁₀</p>
            </div>

             <div>
                <h3 className="text-xl font-semibold text-foreground">Decimal to Hex Conversion</h3>
                <p className="mt-2">To convert a decimal number to hexadecimal, you can follow these steps:</p>
                 <ol className="list-decimal list-inside mt-2 space-y-2">
                    <li>Find the largest power of 16 that is less than or equal to your number.</li>
                    <li>Divide your number by this power of 16 and record the whole number part (this will be one of your hex digits).</li>
                    <li>Multiply that whole number by the corresponding power of 16 and subtract the result from your original number to find the remainder.</li>
                    <li>Repeat the process with the remainder until it is less than 16, which will be your final hex digit.</li>
                </ol>
                <p className="mt-2">For example, to convert the decimal number 956 to hex:</p>
                 <ul className="list-disc list-inside mt-2 space-y-1 font-mono text-sm bg-muted p-4 rounded-md">
                    <li>The largest power of 16 less than 956 is 16² (256). 956 ÷ 256 = 3, with a remainder. The first hex digit is 3.</li>
                    <li>Calculate the new remainder: 956 - (3 × 256) = 188.</li>
                    <li>The largest power of 16 less than 188 is 16¹ (16). 188 ÷ 16 = 11, with a remainder. The second hex digit is B (since B represents 11).</li>
                    <li>Calculate the final remainder: 188 - (11 × 16) = 12. The final digit is C (since C represents 12).</li>
                </ul>
                <p className="mt-2">The resulting hex value is 3BC₁₆.</p>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-foreground">Hexadecimal Arithmetic</h3>
                <div className="space-y-4 mt-2">
                    <div>
                        <h4 className="font-semibold text-foreground">Addition</h4>
                        <p>Hexadecimal addition functions just like decimal addition, with the key difference being that a "carry-over" to the next column happens when the sum exceeds 15 (F), not 9. When a sum is 16 or greater, you determine how many 16s are in the total, carry that number over, and write the remainder in the current column.</p>
                        <p className="font-mono bg-muted p-2 rounded-md my-2">For example: 1A + C = 26 + 12 = 38 in decimal. Since 38 contains two 16s with a remainder of 6, the hex result is 26₁₆.</p>
                    </div>
                     <div>
                        <h4 className="font-semibold text-foreground">Subtraction</h4>
                        <p>In hexadecimal subtraction, when you need to "borrow" from the next column, you are borrowing a value of 16, not 10. This is because each place value is 16 times greater than the one to its right.</p>
                    </div>
                     <div>
                        <h4 className="font-semibold text-foreground">Multiplication & Division</h4>
                        <p>These operations follow the same logic as their decimal counterparts but require careful conversion between hex and decimal values at each step. Using a multiplication table can make this much easier.</p>
                    </div>
                </div>
            </div>
             <HexMultiplicationTable />
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
