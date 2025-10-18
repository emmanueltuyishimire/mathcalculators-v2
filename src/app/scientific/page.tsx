import { PageHeader } from '@/components/page-header';
import ScientificCalculator from '@/components/calculators/scientific-calculator';
import type { Metadata } from 'next';
import Link from 'next/link';

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
        "text": "A scientific calculator is a type of electronic calculator, usually but not always handheld, designed to calculate problems in science, engineering, and mathematics. They have completely replaced slide rules in traditional applications, and are widely used in both education and professional settings."
      }
    },
    {
      "@type": "Question",
      "name": "How do I use a scientific calculator online?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "To use our online scientific calculator, simply type in your expression using your keyboard or click the buttons on the calculator interface. The calculator supports a wide range of functions including basic arithmetic, trigonometric, logarithmic, and exponential functions. Press the '=' button to see the result."
      }
    },
    {
      "@type": "Question",
      "name": "Which is the best scientific calculator for students?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The best scientific calculator for students often depends on their level of study. Popular models include the Casio FX-991EX and the Texas Instruments TI-36X Pro. Our online scientific calculator aims to provide many of the features found in these popular models, making it a great free alternative for students."
      }
    }
  ]
};

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

            <section className="space-y-8">
                <h2 className="text-3xl font-bold">What is a Scientific Calculator?</h2>
                <p className="text-muted-foreground">
                    A scientific calculator is an essential tool for students, engineers, and professionals who need to perform complex mathematical calculations. Unlike a basic calculator, a scientific calculator includes functions for trigonometry, logarithms, exponents, and more. Our free scientific calculator app provides a powerful and easy-to-use interface right in your browser, with features comparable to leading brands like Casio and Texas Instruments (TI). Whether you're tackling homework or complex engineering problems, this tool is designed to be your reliable companion. The primary benefit of an online calculator is its accessibility—no need to buy a physical device when you have a powerful tool available for free.
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
                            While this calculator handles decimal results, for dedicated fraction work, check our <Link href="/fraction-calculator" className="text-primary hover:underline">Fraction Calculator</Link>. This scientific calculator also includes memory functions (M+, M-, MR, MC) to store and recall values, making multi-step calculations simpler.
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
                    When it comes to physical calculators, models from <a href="https://www.casio.com/us/scientific-calculators/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Casio</a> and <a href="https://education.ti.com/en/products/calculators/scientific-calculators" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Texas Instruments (TI)</a> are industry standards. For online tools, Desmos offers a great graphing calculator. Our goal is to provide a free scientific calculator that combines the most-used features of these powerful tools in a convenient online format. This makes it one of the best scientific calculator app alternatives available online.
                </p>

                <h2 className="text-3xl font-bold">FAQs</h2>
                <div className="space-y-4">
                    <div>
                        <h3 className="text-xl font-semibold">What is a scientific calculator?</h3>
                        <p className="text-muted-foreground">A scientific calculator is designed for complex problems in science, engineering, and mathematics, including functions for trigonometry, logarithms, and more.</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">How do I use a scientific calculator online?</h3>
                        <p className="text-muted-foreground">Simply type or click your equation into the input field. The calculator supports keyboard input and clickable buttons. Press '=' to get your answer.</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">Which is the best scientific calculator for students?</h3>
                        <p className="text-muted-foreground">While physical calculators like the Casio FX-991EX or TI-36X Pro are popular, our free online calculator is a powerful and convenient option for students at all levels.</p>
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
