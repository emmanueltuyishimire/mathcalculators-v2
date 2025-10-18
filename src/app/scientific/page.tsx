import { PageHeader } from '@/components/page-header';
import ScientificCalculator from '@/components/calculators/scientific-calculator';
import type { Metadata } from 'next';
import Image from 'next/image';
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

                <h2 className="text-3xl font-bold">How to Use the Scientific Calculator Online</h2>
                <p className="text-muted-foreground">
                    Using our scientific calculator is straightforward. You can either use your keyboard to type in your equation or click the buttons on the calculator interface. The display shows your current input, and the result appears after you press the equals (=) button. For more complex operations, you can use parentheses to group parts of your equation and ensure correct order of operations. Our online tool is designed to feel intuitive, much like a physical calculator from Casio or TI.
                </p>
                <div className="my-6">
                    <Image 
                        src="https://picsum.photos/seed/calculator-ui/800/450" 
                        alt="Online scientific calculator with trigonometry and logarithms"
                        data-ai-hint="calculator user interface"
                        width={800}
                        height={450}
                        className="rounded-lg shadow-lg mx-auto"
                    />
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
