
import BigNumberCalculator from '@/components/calculators/big-number-calculator';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const metadata: Metadata = {
    title: 'Big Number Calculator',
    description: 'A calculator for performing arithmetic on very large numbers. Supports standard integers and E-notation.',
};

const largeNumberNames = [
    { power: "10⁹", name: "Billion" },
    { power: "10¹²", name: "Trillion" },
    { power: "10¹⁵", name: "Quadrillion" },
    { power: "10¹⁸", name: "Quintillion" },
    { power: "10²¹", name: "Sextillion" },
    { power: "10²⁴", name: "Septillion" },
    { power: "10²⁷", name: "Octillion" },
    { power: "10³⁰", name: "Nonillion" },
    { power: "10³³", name: "Decillion" },
    { power: "10³⁶", name: "Undecillion" },
    { power: "10³⁹", name: "Duodecillion" },
    { power: "10⁴²", name: "Tredecillion" },
    { power: "10⁴⁵", name: "Quattuordecillion" },
    { power: "10⁴⁸", name: "Quindecillion" },
    { power: "10⁵¹", name: "Sexdecillion" },
    { power: "10⁵⁴", name: "Septendecillion" },
    { power: "10⁵⁷", name: "Octodecillion" },
    { power: "10⁶⁰", name: "Novemdecillion" },
    { power: "10⁶³", name: "Vigintillion" },
    { power: "10¹⁰⁰", name: "Googol" },
    { power: "10³⁰³", name: "Centillion" },
    { power: "10^googol", name: "Googolplex" },
];

const HowToUseGuide = () => (
    <Card>
        <CardHeader>
            <CardTitle>How to Use the Big Number Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
            <ol className="list-decimal list-inside space-y-2">
                <li>
                    <strong>Enter Numbers:</strong> Input your large numbers into the 'X' and 'Y' fields. The calculator accepts standard integers (e.g., 123456789...) and E-notation (e.g., 1.23e45).
                </li>
                <li>
                    <strong>Choose an Operation:</strong> Click one of the buttons (e.g., "X + Y", "X!", "GCD") to perform the desired calculation.
                </li>
                <li>
                    <strong>View the Result:</strong> The result will appear in the text area at the bottom. You can copy it from there.
                </li>
            </ol>
            <div className="p-4 bg-accent/50 rounded-lg">
                <h4 className="font-semibold text-accent-foreground">💡 Note on Decimals</h4>
                <p className="text-sm text-muted-foreground mt-2">This calculator is optimized for large integer arithmetic. It will parse the integer part of decimal inputs but will not perform high-precision decimal calculations.</p>
            </div>
        </CardContent>
    </Card>
);

const EducationalContent = () => (
    <Card>
        <CardHeader>
            <CardTitle>Why Use a Big Number Calculator?</CardTitle>
            <CardDescription>Exploring numbers beyond the limits of standard calculators.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground">
            <p>Most standard calculators can only handle numbers up to a certain size, typically around 10-15 decimal places. While sufficient for daily use, this limitation is problematic in fields requiring extreme precision, such as cosmology, astronomy, mathematics, and cryptography. Big number calculators exist to overcome this, providing far higher levels of accuracy.</p>
            
            <div>
                <h3 className="text-xl font-semibold text-foreground">Real-World Applications</h3>
                <p className="mt-2">Big numbers appear in many real-world contexts, from the number of atoms in the universe to the vast number of combinations in cryptographic keys. Here are a few examples:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                    <li><b>Cosmology:</b> Estimating the number of atoms in the observable universe (around 10⁸⁰).</li>
                    <li><b>Cryptography:</b> Modern encryption relies on the difficulty of factoring very large numbers, often with hundreds of digits.</li>
                    <li><b>Combinatorics:</b> Calculating the number of possible arrangements, such as the number of ways to shuffle a deck of cards (52!, which is approximately 8 x 10⁶⁷).</li>
                </ul>
            </div>
            
            <div>
                <h3 className="text-xl font-semibold text-foreground">A Journey into Large Number Names</h3>
                <p className="mt-2">Beyond practical applications, exploring the names of large numbers is a fascinating journey into the scale of the universe and imagination. Below is a table showing the names of some very large numbers based on powers of 10.</p>
                <div className="overflow-x-auto mt-4 rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Power of 10</TableHead>
                                <TableHead>Name</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {largeNumberNames.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-mono">{item.power}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </CardContent>
    </Card>
);

export default function BigNumberPage() {
  return (
    <div className="flex flex-1 flex-col">
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-2xl space-y-8">
            <section className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Big Number Calculator
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    A calculator that can compute very large numbers with high precision.
                </p>
            </section>
            
            <BigNumberCalculator />
            <HowToUseGuide />
            <EducationalContent />
        </div>
      </main>
    </div>
  );
}
