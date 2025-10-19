
import { PageHeader } from '@/components/page-header';
import BinaryCalculator from '@/components/calculators/binary-calculator';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const metadata: Metadata = {
    title: 'Binary Calculator',
    description: 'Perform binary arithmetic, and convert between binary and decimal values with ease. Supports addition, subtraction, multiplication, and division of binary numbers.',
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Binary Calculator",
  "operatingSystem": "All",
  "applicationCategory": "EducationalApplication",
  "description": "Perform binary arithmetic (add, subtract, multiply, divide) and convert between binary and decimal values.",
  "url": "https://maths.calculation.site/binary",
  "publisher": {
    "@type": "Organization",
    "name": "Math Calculators",
    "url": "https://maths.calculation.site"
  },
  "inLanguage": "en",
  "datePublished": "2024-07-26",
  "softwareVersion": "1.0.0"
};

const HowToUseGuide = () => (
    <Card>
        <CardHeader>
            <CardTitle>How to Use the Binary Calculators</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
            <ol className="list-decimal list-inside space-y-2">
                <li>
                    <strong>Binary Arithmetic:</strong> Enter two binary numbers in the first calculator, select an operation (+, -, ×, ÷), and click "Calculate". The results will be shown in both binary and decimal form.
                </li>
                <li>
                    <strong>Binary to Decimal:</strong> Enter a binary number in the second calculator to see its decimal equivalent instantly.
                </li>
                <li>
                    <strong>Decimal to Binary:</strong> Enter a decimal number in the third calculator to get its binary representation.
                </li>
            </ol>
        </CardContent>
    </Card>
);

const EducationalContent = () => (
    <Card>
        <CardHeader>
            <CardTitle>Understanding the Binary System</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground">
            <div>
                <h3 className="text-xl font-semibold text-foreground">What is Binary?</h3>
                <p className="mt-2">The binary system is a numerical system that functions almost identically to the decimal system we use daily. The key difference is its base. While the decimal system uses base 10 (with digits 0-9), the binary system uses base 2, employing only the digits 0 and 1. Each digit in a binary number is called a <strong>bit</strong>.</p>
                <p className="mt-2">Despite its simplicity, operations like addition, subtraction, multiplication, and division follow the same fundamental rules as the decimal system. This simplicity is its strength, making it the backbone of modern computers and digital technology. Hardware is much easier to design when it only needs to detect two states: on/off, true/false, or present/absent, which correspond perfectly to 1 and 0.</p>
            </div>
            
            <div>
                <h3 className="text-xl font-semibold text-foreground">Binary to Decimal Conversion</h3>
                <p className="mt-2">Just as each decimal place represents a power of 10 (10⁰, 10¹, 10², etc.), each binary place value represents a power of 2 (2⁰, 2¹, 2², etc.). To convert a binary number to decimal, you sum the values of the positions where a '1' appears.</p>
                <p className="mt-2">For example, let's convert the binary number <strong>10110</strong>:</p>
                <p className="font-mono bg-muted p-2 rounded-md my-2 text-sm">10110₂ = (1 × 2⁴) + (0 × 2³) + (1 × 2²) + (1 × 2¹) + (0 × 2⁰) = 16 + 0 + 4 + 2 + 0 = 22₁₀</p>
            </div>

             <div>
                <h3 className="text-xl font-semibold text-foreground">Decimal to Binary Conversion</h3>
                <p className="mt-2">To convert a decimal number to binary, follow these steps:</p>
                 <ol className="list-decimal list-inside mt-2 space-y-2">
                    <li>Find the largest power of 2 that is less than or equal to your number.</li>
                    <li>Subtract this value from your number to get a remainder.</li>
                    <li>Find the largest power of 2 that fits within the remainder.</li>
                    <li>Repeat until the remainder is 0.</li>
                    <li>Place a '1' in each binary position for the powers of 2 you found, and a '0' in the others.</li>
                </ol>
                <p className="mt-2">Let's convert the decimal number <strong>22</strong>:</p>
                 <ul className="list-disc list-inside mt-2 space-y-1 font-mono text-sm bg-muted p-4 rounded-md">
                    <li>22 - 16 (2⁴) = 6</li>
                    <li>6 - 4 (2²) = 2</li>
                    <li>2 - 2 (2¹) = 0</li>
                </ul>
                <p className="mt-2">So, we place 1s at the 2⁴, 2², and 2¹ positions: <strong>10110₂</strong>.</p>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-foreground">Binary Arithmetic</h3>
                <div className="space-y-4 mt-2">
                    <div>
                        <h4 className="font-semibold text-foreground">Addition</h4>
                        <p>Binary addition follows rules similar to decimal addition. When the sum of a column is 2, you write down 0 and carry over a 1.</p>
                         <ul className="list-disc list-inside font-mono text-sm pl-4 mt-1">
                            <li>0 + 0 = 0</li>
                            <li>0 + 1 = 1</li>
                            <li>1 + 0 = 1</li>
                            <li>1 + 1 = 0, carry 1 (which is 10₂)</li>
                        </ul>
                    </div>
                     <div>
                        <h4 className="font-semibold text-foreground">Subtraction</h4>
                        <p>When subtracting 1 from 0, you must borrow from the next column, which turns the 0 into a "2" (or 10₂).</p>
                    </div>
                     <div>
                        <h4 className="font-semibold text-foreground">Multiplication</h4>
                        <p>Binary multiplication is simpler than decimal. You either multiply by 0 (giving 0) or by 1 (giving the original number), then add the results.</p>
                    </div>
                     <div>
                        <h4 className="font-semibold text-foreground">Division</h4>
                        <p>This works like decimal long division, but it involves binary subtraction instead.</p>
                    </div>
                </div>
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
                    <AccordionTrigger>Why do computers use binary?</AccordionTrigger>
                    <AccordionContent>
                        Computers use binary (base-2) because it's a simple and reliable way to represent data electronically. The two digits, 0 and 1, can be represented by two distinct states, such as "on" or "off," "high voltage" or "low voltage." This makes the underlying hardware much simpler to design and build compared to a system that would need to handle ten different states for decimal numbers.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>What is a bit, a byte, and a nibble?</AccordionTrigger>
                    <AccordionContent>
                        - A <strong>bit</strong> is the smallest unit of data in a computer and can have a value of either 0 or 1.<br/>
                        - A <strong>nibble</strong> is a group of 4 bits.<br/>
                        - A <strong>byte</strong> is a group of 8 bits. It's the standard unit of memory size in most modern computers.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>How do I perform binary addition?</AccordionTrigger>
                    <AccordionContent>
                        Binary addition follows four simple rules:<br/>
                        - 0 + 0 = 0<br/>
                        - 0 + 1 = 1<br/>
                        - 1 + 0 = 1<br/>
                        - 1 + 1 = 0, with a carry-over of 1 to the next column.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger>Can this calculator handle negative binary numbers?</AccordionTrigger>
                    <AccordionContent>
                        This calculator primarily works with unsigned (positive) integers. The arithmetic calculator can produce a negative result in decimal, but representing negative numbers in binary typically requires methods like Two's Complement, which is a more advanced topic not covered by this basic tool.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                    <AccordionTrigger>Is there a limit to the size of the numbers I can convert?</AccordionTrigger>
                    <AccordionContent>
                        The calculator can handle any integer that JavaScript's standard number type can safely represent (up to `Number.MAX_SAFE_INTEGER`, which is 2⁵³ - 1). For larger numbers, you might need a BigInt-based calculator.
                    </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="item-6">
                    <AccordionTrigger>Why is my division result different than expected?</AccordionTrigger>
                    <AccordionContent>
                        The binary arithmetic calculator performs integer division, just like many low-level computer operations. This means it discards any fractional part or remainder. For example, 7 ÷ 3 (binary 111 ÷ 11) will result in 2 (binary 10), not 2.33.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
    </Card>
);

export default function BinaryPage() {
  return (
    <>
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <div className="flex flex-1 flex-col">
        <PageHeader title="Binary Calculator" />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-2xl space-y-8">
              <section className="text-center">
                  <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                      Binary Calculator
                  </h1>
                  <p className="mt-4 text-lg text-muted-foreground">
                      Use the following calculators to perform the addition, subtraction, multiplication, or division of two binary values, as well as convert binary values to decimal values, and vice versa.
                  </p>
              </section>
              
              <BinaryCalculator />
              <HowToUseGuide />
              <section className="text-center">
                  <h2 className="text-2xl font-bold text-foreground">Related Calculators</h2>
                  <div className="flex flex-wrap justify-center gap-2 mt-4">
                      <Button asChild variant="outline">
                          <Link href="/hex">Hex Calculator</Link>
                      </Button>
                      <Button asChild variant="outline">
                          <Link href="/basic">Basic Calculators</Link>
                      </Button>
                  </div>
              </section>
              <EducationalContent />
              <FaqSection />
          </div>
        </main>
      </div>
    </>
  );
}
