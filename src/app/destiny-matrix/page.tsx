
import { PageHeader } from '@/components/page-header';
import DestinyMatrixCalculator from '@/components/calculators/destiny-matrix-calculator';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const metadata: Metadata = {
    title: 'Destiny Matrix Calculator',
    description: 'Discover your personality traits, strengths, and life path with our free Destiny Matrix Calculator. Enter your birth date to get a personalized numerology reading and explore your destiny.',
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Destiny Matrix Calculator",
  "description": "Discover your personality traits, strengths, and life path with our free Destiny Matrix Calculator. Enter your birth date to get a personalized numerology reading and explore your destiny.",
  "mainEntity": {
    "@type": "HowTo",
    "name": "How to Use the Destiny Matrix Calculator",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Step 1: Enter Birth Date",
        "text": "Provide your full date of birth (Day, Month, Year). The calculator will use these numbers to derive key numerological insights."
      },
      {
        "@type": "HowToStep",
        "name": "Step 2: Calculate Matrix",
        "text": "Click the 'Calculate' button. The tool will automatically process your birth date, calculate the core numbers, and arrange them into your personal Destiny Matrix."
      },
      {
        "@type": "HowToStep",
        "name": "Step 3: Analyze Results",
        "text": "The calculator will display your Destiny Matrix and provide an interpretation based on the numbers present. Pay attention to key numbers and their meanings related to personality, challenges, and talents."
      }
    ]
  }
};

const FaqSection = () => (
    <Card>
        <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>What is the Destiny Matrix?</AccordionTrigger>
                    <AccordionContent>
                        The Destiny Matrix is a numerology method that uses your birth date to create a personalized chart. This chart, often visualized as a diagram with key numbers, is believed to reveal insights into your personality, life purpose, talents, challenges, and karmic lessons.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Is this tool based on a specific numerology system?</AccordionTrigger>
                    <AccordionContent>
                        Yes, this calculator is based on the principles of the Destiny Matrix system, which has roots in Pythagorean numerology and other esoteric traditions. It involves specific calculations to derive key "energies" or numbers that are placed at various points on a diagram.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>What is the "Life Path Number"?</AccordionTrigger>
                    <AccordionContent>
                        The Life Path Number (point 'd' in our diagram) is one of the most important numbers in your chart. It represents your life's journey, major themes, and the central mission or purpose you are here to fulfill. The interpretation provided gives you a glimpse into this core energy.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger>How are the numbers calculated?</AccordionTrigger>
                    <AccordionContent>
                        The calculation involves summing the digits of your day, month, and year of birth. Each component (day, month, year) is reduced to a single digit or a master number (11, 22, 33). These numbers are then combined in specific ways to calculate the other points on the matrix.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                    <AccordionTrigger>Can I use my full name with this calculator?</AccordionTrigger>
                    <AccordionContent>
                        This specific Destiny Matrix calculator uses only the birth date. Other numerology systems, like Chaldean or Pythagorean, use the full name to calculate different aspects of your personality, such as the Expression or Soul Urge number.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                    <AccordionTrigger>How should I interpret the results?</AccordionTrigger>
                    <AccordionContent>
                        The interpretations provided are a starting point for self-reflection. They offer insights into your potential strengths and weaknesses. Use them as a guide to understand your natural tendencies and areas for personal growth, not as a definitive prediction of your future.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
    </Card>
);

export default function DestinyMatrixPage() {
  return (
    <>
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <div className="flex flex-1 flex-col">
        <PageHeader title="Destiny Matrix Calculator" />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-2xl space-y-12">
              <section className="text-center">
                  <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                      Destiny Matrix Calculator
                  </h1>
                  <p className="mt-4 text-lg text-muted-foreground">
                      Discover your personality traits, strengths, and life path through the lens of numerology.
                  </p>
              </section>
              
              <DestinyMatrixCalculator />

               <section aria-labelledby="how-to-use-heading" className="space-y-8 text-muted-foreground">
                  <h2 id="how-to-use-heading" className="text-3xl font-bold text-foreground">How to Use the Destiny Matrix Calculator</h2>
                  <p>Follow these steps to generate and understand your Destiny Matrix:</p>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-semibold text-foreground">Step 1: Enter Your Birth Date</h3>
                      <p>Provide your full date of birth (Day, Month, Year). The calculator will use these numbers to derive key numerological insights.</p>
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-foreground">Step 2: Calculate Your Matrix</h3>
                      <p>Click the <strong>Calculate</strong> button. The tool will automatically process your birth date, calculate the core numbers, and arrange them into your personal Destiny Matrix.</p>
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-foreground">Step 3: Analyze the Results</h3>
                      <p>The calculator will display your Destiny Matrix and provide an interpretation based on the numbers present. Pay attention to:</p>
                      <ul className="list-disc list-inside pl-4 mt-2">
                          <li><strong>Key Numbers:</strong> Your Life Path Number and other core numbers that define your journey.</li>
                          <li><strong>Number Meanings:</strong> Each number has a specific meaning related to personality, challenges, and talents.</li>
                      </ul>
                    </div>
                  </div>
              </section>

              <section aria-labelledby="unlocking-potential-heading" className="space-y-4 text-muted-foreground">
                  <h2 id="unlocking-potential-heading" className="text-3xl font-bold text-foreground">Unlocking Your Personal Potential with the Destiny Matrix Calculator</h2>
                  <p>The Destiny Matrix Calculator is more than just an online tool—it’s a window into understanding your personal strengths, weaknesses, and life path through the fascinating lens of numerology. By translating your birth date and full name into a structured matrix of numbers, this calculator offers actionable insights into your personality and potential.</p>
                  <p>Each number in your destiny matrix has a unique meaning. Repeated numbers highlight dominant traits or recurring life themes, while missing numbers can reveal areas of growth or latent abilities waiting to be explored. This combination of analysis allows you to reflect on your personal journey, make informed decisions, and even plan your future with greater clarity.</p>
                  <p>Unlike traditional calculators that only perform numerical operations, the Destiny Matrix Calculator engages users interactively. Step-by-step calculations allow users to follow the logic from input to matrix creation to insightful interpretation. This educational aspect encourages longer page visits, as users explore not just their results but the underlying numerology logic.</p>
                  <p>For enthusiasts of personal development, numerology, or psychology, the Destiny Matrix Calculator serves as a digital mentor, guiding you through self-discovery with a simple, intuitive interface. By exploring multiple inputs—like variations of your name or significant dates—you can compare patterns and understand recurring influences in your life, making the tool both practical and deeply personal.</p>
                  
              </section>
              <FaqSection />
          </div>
        </main>
      </div>
    </>
  );
}
