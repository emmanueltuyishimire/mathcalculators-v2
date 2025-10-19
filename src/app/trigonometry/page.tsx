
import { PageHeader } from '@/components/page-header';
import TrigonometryCalculator from '@/components/calculators/trigonometry-calculator';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const metadata: Metadata = {
  title: 'Trigonometry Calculator',
  description: 'Use our free online trigonometry calculator to solve math problems. Supports fractions, trig, logs, exponents, and more. Casio & TI features included.',
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Trigonometry Calculator",
  "operatingSystem": "All",
  "applicationCategory": "EducationalApplication",
  "description": "A free online calculator for trigonometric functions (sin, cos, tan, csc, sec, cot) and their inverses. Supports both degrees and radians.",
  "url": "https://maths.calculation.site/trigonometry",
  "publisher": {
    "@type": "Organization",
    "name": "Math Calculators",
    "url": "https://maths.calculation.site"
  },
  "inLanguage": "en",
  "datePublished": "2024-07-26",
  "softwareVersion": "1.0.0"
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a trigonometry calculator?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A trigonometry calculator is a tool designed to solve complex mathematical problems, including trigonometry, logarithms, exponents, fractions, and statistical calculations. Unlike a basic calculator, it provides advanced functions for students, engineers, and professionals."
      }
    },
    {
      "@type": "Question",
      "name": "How do I use a trigonometry calculator online?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "To use a trigonometry calculator online, simply enter numbers using the keypad, choose the operation or function, use parentheses for complex calculations, and press = to see the result. You can also use memory functions (M+, M-, MR, MC) to store values."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use a trigonometry calculator for fractions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! Many online and app-based trigonometry calculators support fractions and mixed numbers. You can enter fractions directly or use the division / key, and the calculator can display the result as a fraction or decimal."
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
        "name": "Is this online trigonometry calculator free to use?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely! Our online trigonometry calculator is completely free and does not require any downloads. It supports a wide range of mathematical functions."
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
        "name": "Can I use this trigonometry calculator on mobile devices?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! The calculator is fully responsive, meaning it works seamlessly on mobile phones, tablets, and desktops. You can solve calculations anywhere without downloading an app."
        }
    },
    {
        "@type": "Question",
        "name": "What types of calculations can I do with a trigonometry calculator?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can perform basic arithmetic, trigonometric functions, logarithms, exponentials, roots, factorials, fractions, and memory-based calculations."
        }
    },
    {
        "@type": "Question",
        "name": "Is this trigonometry calculator safe and accurate?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! Our online trigonometry calculator is accurate, reliable, and safe to use. All calculations happen directly in your browser, so no personal data is stored."
        }
    }
  ]
};

const HowToUseGuide = () => (
    <Card>
        <CardHeader>
            <CardTitle>How to Use the Trigonometry Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
            <ol className="list-decimal list-inside space-y-2">
                <li>
                    <strong>Select Function:</strong> Choose the trigonometric function you want to use (e.g., sin, cos, asin) from the dropdown menu.
                </li>
                <li>
                    <strong>Enter Value:</strong> Input the number or angle into the input field. For direct functions (sin, cos, etc.), this is an angle. For inverse functions (asin, acos, etc.), this is a numeric ratio.
                </li>
                 <li>
                    <strong>Angle Unit:</strong> Select whether your input (or desired output for inverse functions) is in <strong>Degrees</strong> or <strong>Radians</strong>.
                </li>
                <li>
                    <strong>Calculate:</strong> Press the <strong>Calculate</strong> button to see the result.
                </li>
            </ol>
             <div className="p-4 bg-accent/50 rounded-lg">
                <h4 className="font-semibold text-accent-foreground">✅ Example</h4>
                <p className="text-sm text-muted-foreground mt-2">
                    To find the sine of 30 degrees:
                </p>
                <ol className="list-decimal list-inside text-sm text-muted-foreground mt-2 pl-4">
                    <li>Select "sin" as the function.</li>
                    <li>Enter "30" as the value.</li>
                    <li>Set the unit to "Degrees".</li>
                    <li>Click "Calculate". The result is `0.5`.</li>
                </ol>
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
                    <AccordionTrigger>What is the difference between Degrees and Radians?</AccordionTrigger>
                    <AccordionContent>
                        Degrees and Radians are two different units for measuring angles. A full circle is 360 degrees or 2π radians. You must select the correct mode (DEG or RAD) based on what your problem requires, otherwise your trigonometric calculations will be incorrect.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>What are sin, cos, and tan?</AccordionTrigger>
                    <AccordionContent>
                        Sine (sin), Cosine (cos), and Tangent (tan) are the three primary trigonometric functions. They represent the ratios of the sides of a right-angled triangle. They are fundamental for analyzing waves, circles, and oscillations.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>What are inverse trigonometric functions (sin⁻¹, cos⁻¹, tan⁻¹)?</AccordionTrigger>
                    <AccordionContent>
                        Inverse trigonometric functions (also known as arcsin, arccos, arctan) are used to find the angle when you know the ratio of the sides. For example, if you know `sin(angle) = 0.5`, you can use `sin⁻¹(0.5)` to find that the angle is 30 degrees.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger>What are csc, sec, and cot?</AccordionTrigger>
                    <AccordionContent>
                        These are the reciprocal trigonometric functions:<br/>
                        - **Cosecant (csc)** is the reciprocal of sine (1/sin).<br/>
                        - **Secant (sec)** is the reciprocal of cosine (1/cos).<br/>
                        - **Cotangent (cot)** is the reciprocal of tangent (1/tan).
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
    </Card>
);

export default function TrigonometryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="flex flex-1 flex-col">
        <PageHeader title="Trigonometry Calculator" />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-2xl space-y-12">
            <section className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                    Trigonometry Calculator Online
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Your go-to free online trigonometry calculator for complex math problems. It's fast, accurate, and easy to use.
                </p>
            </section>
            
            <TrigonometryCalculator />

            <HowToUseGuide />

            <section className="space-y-8">
                <h2 className="text-3xl font-bold">What is a Trigonometry Calculator?</h2>
                <p className="text-muted-foreground">
                    A trigonometry calculator is an essential tool for students, engineers, and professionals who need to perform complex mathematical calculations involving angles and side lengths of triangles. This specialized tool provides functions for sine, cosine, tangent, and their inverses. Our free trigonometry calculator app provides a powerful and easy-to-use interface right in your browser. For more general calculations, try our <Link href="/scientific" className="text-primary hover:underline">Scientific Calculator</Link>.
                </p>
            </section>
            <FaqSection />
          </div>
        </main>
      </div>
    </>
  );
}
