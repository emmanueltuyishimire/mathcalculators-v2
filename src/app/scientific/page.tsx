
import { PageHeader } from '@/components/page-header';
import ScientificCalculator from '@/components/calculators/scientific-calculator';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Scientific Calculator Online – Free & Accurate',
  description: 'Use our free online scientific calculator to solve math problems. Supports fractions, trig, logs, exponents, and more. Casio & TI features included.',
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a scientific calculator?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A scientific calculator is a tool designed to solve complex mathematical problems, including trigonometry, logarithms, exponents, fractions, and statistical calculations. Unlike a basic calculator, it provides advanced functions for students, engineers, and professionals."
      }
    },
    {
      "@type": "Question",
      "name": "How do I use a scientific calculator online?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "To use a scientific calculator online, simply enter numbers using the keypad, choose the operation or function, use parentheses for complex calculations, and press = to see the result. You can also use memory functions (M+, M-, MR, MC) to store values."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use a scientific calculator for fractions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! Many online and app-based scientific calculators support fractions and mixed numbers. You can enter fractions directly or use the division / key, and the calculator can display the result as a fraction or decimal."
      }
    },
    {
        "@type": "Question",
        "name": "Which is better: Casio or TI scientific calculators?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Both Casio and Texas Instruments (TI) are reliable brands. Casio calculators are often simpler and more affordable, while TI calculators like the TI-84 or TI-36X Pro offer advanced functions and graphing capabilities."
        }
    },
    {
        "@type": "Question",
        "name": "Do I need to switch between degrees and radians?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, when performing trigonometric calculations, you must select the correct angle mode (Degrees or Radians) depending on your problem. Most online calculators have a toggle for this."
        }
    },
    {
        "@type": "Question",
        "name": "Is this online scientific calculator free to use?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely! Our online scientific calculator is completely free and does not require any downloads. It supports a wide range of mathematical functions."
        }
    },
    {
        "@type": "Question",
        "name": "Can I use memory functions on the calculator?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, memory functions (M+, M-, MR, MC) allow you to store, recall, add to, or subtract from a stored value, which is useful for multi-step calculations."
        }
    },
    {
        "@type": "Question",
        "name": "Can I use this scientific calculator on mobile devices?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! The calculator is fully responsive, meaning it works seamlessly on mobile phones, tablets, and desktops. You can solve calculations anywhere without downloading an app."
        }
    },
    {
        "@type": "Question",
        "name": "What types of calculations can I do with a scientific calculator?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can perform basic arithmetic, trigonometric functions, logarithms, exponentials, roots, factorials, fractions, and memory-based calculations."
        }
    },
    {
        "@type": "Question",
        "name": "Is this scientific calculator safe and accurate?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! Our online scientific calculator is accurate, reliable, and safe to use. All calculations happen directly in your browser, so no personal data is stored."
        }
    }
  ]
};

const HowToUseGuide = () => (
    <Card>
        <CardHeader>
            <CardTitle>How to Use the Scientific Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
            <ol className="list-decimal list-inside space-y-2">
                <li>
                    <strong>Entering Numbers & Operators:</strong> Use the number and operator buttons (+, -, ×, ÷) to build your expression in the display.
                </li>
                <li>
                    <strong>Using Functions:</strong> Click a function button (e.g., sin, log, √x) to apply it. For functions like `sin(`, type the number afterward and close the parenthesis.
                </li>
                 <li>
                    <strong>Angle Mode:</strong> Toggle between <strong>RAD</strong> (Radians) and <strong>DEG</strong> (Degrees) for trigonometric calculations.
                </li>
                <li>
                    <strong>Second Functions:</strong> Click the <strong>2nd</strong> button to access alternative functions like x³, ∛x, and inverse trig functions (sin⁻¹, cos⁻¹, tan⁻¹).
                </li>
                 <li>
                    <strong>Memory:</strong> Use <strong>M+</strong>, <strong>M-</strong>, <strong>MR</strong>, and <strong>MC</strong> to store, subtract from, recall, and clear memory.
                </li>
                 <li>
                    <strong>Equals:</strong> Press the <strong>=</strong> button to evaluate the expression.
                </li>
                 <li>
                    <strong>Clearing:</strong>
                     <ul className="list-disc list-inside pl-6 mt-1">
                        <li><strong>⌫ (Backspace):</strong> Deletes the last character.</li>
                        <li><strong>AC (All Clear):</strong> Clears the display and resets memory.</li>
                    </ul>
                </li>
            </ol>
             <div className="p-4 bg-accent/50 rounded-lg">
                <h4 className="font-semibold text-accent-foreground">✅ Example Problem</h4>
                <p className="text-sm text-muted-foreground mt-2">
                    To calculate <strong>(5 + 3) × sin(30°)</strong>:
                </p>
                <ol className="list-decimal list-inside text-sm text-muted-foreground mt-2 pl-4">
                    <li>Ensure you are in <strong>DEG</strong> mode.</li>
                    <li>Press: `(`, `5`, `+`, `3`, `)`, `×`, `sin(`, `3`, `0`, `)`, `=`.</li>
                    <li>The result will be `4`.</li>
                </ol>
            </div>
        </CardContent>
    </Card>
);


export default function ScientificPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="flex flex-1 flex-col">
        <PageHeader title="Scientific Calculator" />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-4xl space-y-12">
            <section className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                    Scientific Calculator Online – Free & Accurate
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Your go-to free online scientific calculator for complex math problems. It's fast, accurate, and easy to use.
                </p>
            </section>
            
            <ScientificCalculator />

            <HowToUseGuide />

            <section className="space-y-8">
                <h2 className="text-3xl font-bold">What is a Scientific Calculator?</h2>
                <p className="text-muted-foreground">
                    A scientific calculator is an essential tool for students, engineers, and professionals who need to perform complex mathematical calculations. Unlike a <Link href="/basic" className="text-primary hover:underline">basic calculator</Link>, a scientific calculator includes functions for <Link href="/trigonometry" className="text-primary hover:underline">trigonometry</Link>, logarithms, exponents, and more. Our free scientific calculator app provides a powerful and easy-to-use interface right in your browser, with features comparable to leading brands like Casio and Texas Instruments (TI). Whether you're tackling homework or complex engineering problems, this tool is designed to be your reliable companion. The primary benefit of an online calculator is its accessibility—no need to buy a physical device when you have a powerful tool available for free. For more specialized trigonometric functions, you can also use our dedicated <Link href="/trigonometry" className="text-primary hover:underline">Trigonometry Calculator</Link>.
                </p>

                <h2 className="text-3xl font-bold">How to Use a Scientific Calculator Online</h2>
                <div className="space-y-6 text-muted-foreground">
                    <p>
                        Using a scientific calculator may seem intimidating at first, but with a few simple steps, you can perform basic and advanced math calculations, including trigonometry, logarithms, exponents, and fractions.
                    </p>
                    <ol className="list-decimal list-inside space-y-4">
                        <li>
                            <h3 className="inline font-semibold text-foreground">Entering Numbers</h3>
                            <ul className="list-disc list-inside pl-4 mt-2">
                                <li>Use the number keys (0–9) to input values.</li>
                                <li>Use the decimal point (.) for fractions or decimal numbers.</li>
                                <li>To input negative numbers, use the ± key.</li>
                                <li><strong>Example:</strong> Input -12.5 by pressing 1, 2, ., 5, then ±.</li>
                            </ul>
                        </li>
                        <li>
                            <h3 className="inline font-semibold text-foreground">Basic Arithmetic</h3>
                            <ul className="list-disc list-inside pl-4 mt-2">
                                <li>Use + for addition, - for subtraction, * for multiplication, and / for division.</li>
                                <li>Parentheses () can be used to control order of operations.</li>
                                <li><strong>Example:</strong> To calculate (5 + 3) × 2, press (, 5, +, 3, ), *, 2, then =.</li>
                            </ul>
                        </li>
                        <li>
                            <h3 className="inline font-semibold text-foreground">Advanced Functions</h3>
                            <ul className="list-disc list-inside pl-4 mt-2">
                                <li>Exponents: Use x^y to raise a number to a power.</li>
                                <li>Roots: √x for square roots, ∛x for cube roots, and x^(1/n) for nth roots.</li>
                                <li>Factorials: Use ! to calculate n!.</li>
                                <li><strong>Example:</strong> To calculate 5! (factorial of 5), press 5, then !, then =.</li>
                            </ul>
                        </li>
                        <li>
                            <h3 className="inline font-semibold text-foreground">Trigonometric Calculations</h3>
                             <ul className="list-disc list-inside pl-4 mt-2">
                                <li>Select angle mode (Degrees or Radians) using the θ toggle.</li>
                                <li>Use sin, cos, tan, cot, sec, or csc keys for calculations.</li>
                                <li>Use asin, acos, or atan for inverse trigonometric functions.</li>
                                <li><strong>Example:</strong> To calculate sin(30°), switch to Degrees, press 3, 0, then sin.</li>
                            </ul>
                        </li>
                         <li>
                            <h3 className="inline font-semibold text-foreground">Logarithms and Exponentials</h3>
                            <ul className="list-disc list-inside pl-4 mt-2">
                                <li>ln(x) calculates the natural logarithm (base e).</li>
                                <li>log(x) calculates the base-10 logarithm.</li>
                                <li>e^x calculates the exponential function.</li>
                                <li><strong>Example:</strong> To calculate log10(1000), press 1, 0, 0, 0, then log. Result = 3.</li>
                            </ul>
                        </li>
                        <li>
                            <h3 className="inline font-semibold text-foreground">Fractions and Mixed Numbers</h3>
                            <ul className="list-disc list-inside pl-4 mt-2">
                                <li>Many scientific calculators allow fraction input directly.</li>
                                <li>Use / to input a fraction, or dedicated fraction buttons if available.</li>
                                <li><strong>Example:</strong> To calculate 1/2 + 3/4, press 1, /, 2, +, 3, /, 4, then =. Result = 5/4 or 1.25.</li>
                            </ul>
                        </li>
                        <li>
                            <h3 className="inline font-semibold text-foreground">Memory Functions</h3>
                            <ul className="list-disc list-inside pl-4 mt-2">
                                <li>M+ – Add current value to memory</li>
                                <li>M- – Subtract current value from memory</li>
                                <li>MR – Recall stored memory</li>
                                <li>MC – Clear memory</li>
                                <li><strong>Example:</strong> To store 25 in memory: input 25 → press M+.</li>
                            </ul>
                        </li>
                        <li>
                            <h3 className="inline font-semibold text-foreground">Clearing and Correcting Input</h3>
                            <ul className="list-disc list-inside pl-4 mt-2">
                                <li>CE (Clear Entry): Clears current input without affecting memory.</li>
                                <li>AC (All Clear): Clears all input, memory, and operations.</li>
                                <li>Backspace (⌫): Deletes the last digit or operator entered.</li>
                            </ul>
                        </li>
                        <li>
                           <h3 className="inline font-semibold text-foreground">Tips for Using a Scientific Calculator</h3>
                           <ul className="list-disc list-inside pl-4 mt-2">
                               <li>Use parentheses to avoid mistakes in complex calculations.</li>
                               <li>Switch between degrees and radians depending on the problem.</li>
                               <li>Check memory values before performing new calculations.</li>
                               <li>Practice with fractions, roots, and logs to become faster.</li>
                           </ul>
                        </li>
                    </ol>
                    <div className="p-4 bg-muted rounded-md mt-4">
                        <h4 className="font-semibold text-foreground">✅ Example Problem:</h4>
                        <p className="font-mono text-center my-2 text-lg">Calculate: (5 + 3) × sin(30°) + log10(100)</p>
                        <h5 className="font-semibold text-foreground mt-2">Steps:</h5>
                        <ol className="list-decimal list-inside text-sm space-y-1">
                            <li>Switch to <strong>Degrees</strong> mode.</li>
                            <li>Enter <strong>(5 + 3)</strong> → press <code className="bg-card p-1 rounded-sm">(</code>, <code className="bg-card p-1 rounded-sm">5</code>, <code className="bg-card p-1 rounded-sm">+</code>, <code className="bg-card p-1 rounded-sm">3</code>, <code className="bg-card p-1 rounded-sm">)</code>.</li>
                            <li>Multiply by sin(30) → press <code className="bg-card p-1 rounded-sm">×</code>, <code className="bg-card p-1 rounded-sm">3</code>, <code className="bg-card p-1 rounded-sm">0</code>, <code className="bg-card p-1 rounded-sm">sin</code>.</li>
                            <li>Add log10(100) → press <code className="bg-card p-1 rounded-sm">+</code>, <code className="bg-card p-1 rounded-sm">1</code>, <code className="bg-card p-1 rounded-sm">0</code>, <code className="bg-card p-1 rounded-sm">0</code>, <code className="bg-card p-1 rounded-sm">log</code>.</li>
                            <li>Press <code className="bg-card p-1 rounded-sm">=</code> → Result = 5.</li>
                        </ol>
                    </div>
                </div>

                <h2 className="text-3xl font-bold">Key Features of Our Scientific Calculator</h2>
                <div className="space-y-6">
                    <div>
                        <h3 className="text-2xl font-semibold">Trigonometry Functions: sin, cos, tan</h3>
                        <p className="text-muted-foreground mt-2">
                            Perform trigonometric calculations with ease. Our calculator supports sine, cosine, and tangent, along with their inverse functions (asin, acos, atan) and hyperbolic counterparts (sinh, cosh, tanh). You can switch between degrees and radians mode for your calculations.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold">Logarithms & Exponentials: ln, log, e^x</h3>
                        <p className="text-muted-foreground mt-2">
                            Easily work with logarithms and exponentials. We support natural log (ln), base-10 log (log), and the exponential function (e^x). These are crucial for scientific and financial calculations.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold">Fractions & Memory Functions</h3>
                        <p className="text-muted-foreground mt-2">
                            While this calculator handles decimal results, for dedicated fraction work, check our other tools. This scientific calculator also includes memory functions (M+, M-, MR, MC) to store and recall values, making multi-step calculations simpler.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold">Angle Modes: Degrees and Radians</h3>
                        <p className="text-muted-foreground mt-2">
                            Switch between Degrees and Radians with a single click. This is essential for accurate trigonometry calculations, depending on the requirements of your problem. The current mode is always visible on the calculator.
                        </p>
                    </div>
                </div>

                <h2 className="text-3xl font-bold">Best Scientific Calculators: Casio, TI, Desmos</h2>
                <p className="text-muted-foreground">
                    When it comes to physical calculators, models from <a href="https://www.casio.com/us/scientific-calculators/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Casio</a> and <a href="https://education.ti.com/en/products/calculators/scientific-calculators" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Texas Instruments (TI)</a> are industry standards. For online tools, <Link href="/desmos-matrix" className="text-primary hover:underline">Desmos</Link> offers a great graphing calculator. Our goal is to provide a free scientific calculator that combines the most-used features of these powerful tools in a convenient online format. This makes it one of the best scientific calculator app alternatives available online.
                </p>

                <h2 className="text-3xl font-bold">FAQs – Scientific Calculator Online</h2>
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-semibold">Q1: What is a scientific calculator?</h3>
                        <p className="text-muted-foreground">A scientific calculator is a tool designed to solve complex mathematical problems, including trigonometry, logarithms, exponents, fractions, and statistical calculations. Unlike a basic calculator, it provides advanced functions for students, engineers, and professionals.</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">Q2: How do I use a scientific calculator online?</h3>
                        <p className="text-muted-foreground">To use a scientific calculator online, simply:</p>
                        <ul className="list-disc list-inside text-muted-foreground ml-4">
                            <li>Enter numbers using the keypad.</li>
                            <li>Choose the operation or function (addition, sin, log, etc.).</li>
                            <li>Use parentheses () for complex calculations.</li>
                            <li>Press = to see the result.</li>
                            <li>Optional: Use memory functions (M+, M-, MR, MC) to store values.</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">Q3: Can I use a scientific calculator for fractions?</h3>
                        <p className="text-muted-foreground">Yes! Many online and app-based scientific calculators support fractions and mixed numbers. You can enter fractions directly or use the division / key, and the calculator can display the result as a fraction or decimal.</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">Q4: Which is better: Casio or TI scientific calculators?</h3>
                        <p className="text-muted-foreground">Both brands are reliable:</p>
                        <ul className="list-disc list-inside text-muted-foreground ml-4">
                            <li>Casio calculators are simple, affordable, and widely used in schools.</li>
                            <li>Texas Instruments (TI) calculators, like the TI-84 or TI-36X Pro, offer advanced functions and graphing capabilities.</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">Q5: Do I need to switch between degrees and radians?</h3>
                        <p className="text-muted-foreground">Yes, when performing trigonometric calculations, you need to select the correct angle mode:</p>
                         <ul className="list-disc list-inside text-muted-foreground ml-4">
                            <li>Degrees for problems in degrees</li>
                            <li>Radians for problems in radians</li>
                        </ul>
                        <p className="text-muted-foreground mt-2">Most online calculators have a toggle button to switch between these modes.</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">Q6: Is this online scientific calculator free to use?</h3>
                        <p className="text-muted-foreground">Absolutely! Our online scientific calculator is completely free and does not require any downloads. It supports basic arithmetic, advanced math, trigonometry, logarithms, fractions, and more.</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">Q7: Can I use memory functions on the calculator?</h3>
                        <p className="text-muted-foreground">Yes, memory functions allow you to store, recall, add, or subtract values for complex calculations. Use:</p>
                        <ul className="list-disc list-inside text-muted-foreground ml-4">
                            <li>M+ – add to memory</li>
                            <li>M- – subtract from memory</li>
                            <li>MR – recall memory</li>
                            <li>MC – clear memory</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">Q8: Can I use this scientific calculator on mobile devices?</h3>
                        <p className="text-muted-foreground">Yes! The calculator is fully responsive, meaning it works seamlessly on mobile phones, tablets, and desktops. You can solve calculations anywhere without downloading an app.</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">Q9: What types of calculations can I do with a scientific calculator?</h3>
                        <p className="text-muted-foreground">You can perform:</p>
                        <ul className="list-disc list-inside text-muted-foreground ml-4">
                            <li>Basic arithmetic (+ - * / %)</li>
                            <li>Trigonometric functions (sin, cos, tan, cot, sec, csc)</li>
                            <li>Logarithms (ln, log, log base n)</li>
                            <li>Exponentials (x^y, e^x)</li>
                            <li>Roots (√x, ∛x, x^(1/n))</li>
                            <li>Factorials (n!)</li>
                            <li>Fractions and mixed numbers</li>
                            <li>Memory-based calculations</li>
                        </ul>
                    </div>
                     <div>
                        <h3 className="text-xl font-semibold">Q10: Is this scientific calculator safe and accurate?</h3>
                        <p className="text-muted-foreground">Yes! Our online scientific calculator is accurate, reliable, and safe to use. All calculations happen directly in your browser, so no personal data is stored.</p>
                    </div>
                </div>
                <div className="text-center pt-8">
                  <a href="#basic-calculator" className="inline-block bg-primary text-primary-foreground font-bold py-3 px-8 rounded-lg hover:bg-primary/90 transition-colors">
                    Use Scientific Calculator Online Now
                  </a>
                </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}

    