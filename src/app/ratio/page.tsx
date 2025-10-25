
"use client";

import { PageHeader } from '@/components/page-header';
import RatioCalculator from '@/components/calculators/ratio-calculator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Ratio Calculator",
  "operatingSystem": "All",
  "applicationCategory": "EducationalApplication",
  "description": "A free online ratio calculator for solving ratio proportion problems (A:B = C:D) and scaling ratios up or down.",
  "url": "https://maths.calculation.site/ratio",
  "publisher": {
    "@type": "Organization",
    "name": "Math Calculators",
    "url": "https://maths.calculation.site"
  },
  "inLanguage": "en",
  "datePublished": "2024-07-26",
  "softwareVersion": "1.0.0",
  "offers": {
    "@type": "Offer",
    "price": "0"
  }
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [{
    "@type": "ListItem",
    "position": 1,
    "name": "Home",
    "item": "https://maths.calculation.site"
  },{
    "@type": "ListItem",
    "position": 2,
    "name": "Calculators",
    "item": "https://maths.calculation.site/calculators"
  },{
    "@type": "ListItem",
    "position": 3,
    "name": "Ratio Calculator",
    "item": "https://maths.calculation.site/ratio"
  }]
};

const aspectRatios = [
    { name: "480p", ratio: "3:2", width: 720, height: 480 },
    { name: "576p", ratio: "5:4", width: 720, height: 576 },
    { name: "720p (HD)", ratio: "16:9", width: 1280, height: 720 },
    { name: "1080p (Full HD)", ratio: "16:9", width: 1920, height: 1080 },
    { name: "2160p (4K UHD)", ratio: "16:9", width: 3840, height: 2160 },
    { name: "4320p (8K UHD)", ratio: "16:9", width: 7680, height: 4320 },
    { name: "SVGA", ratio: "4:3", width: 800, height: 600 },
    { name: "XGA", ratio: "4:3", width: 1024, height: 768 },
    { name: "WXGA", ratio: "16:10", width: 1280, height: 800 },
    { name: "HD+", ratio: "16:9", width: 1600, height: 900 },
    { name: "WUXGA", ratio: "16:10", width: 1920, height: 1200 },
    { name: "WQHD (2K)", ratio: "16:9", width: 2560, height: 1440 },
    { name: "WQXGA", ratio: "16:10", width: 2560, height: 1600 },
];

const HowToUseGuide = () => (
    <Card>
        <CardHeader>
            <CardTitle>How to Use the Ratio Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground">
            <div>
                <h3 className="text-xl font-semibold text-foreground">Ratio Proportion Calculator (A:B = C:D)</h3>
                 <ol className="list-decimal list-inside space-y-2 mt-2">
                    <li>Enter any three of the four values (A, B, C, or D) into their respective fields.</li>
                    <li>Leave the field you want to solve for empty.</li>
                    <li>Click "Calculate" to find the missing value that makes the two ratios equivalent.</li>
                </ol>
            </div>
             <div>
                <h3 className="text-xl font-semibold text-foreground">Ratio Scaling Calculator</h3>
                 <ol className="list-decimal list-inside space-y-2 mt-2">
                    <li>Enter the two parts of your original ratio (e.g., 3 and 4 for a 3:4 ratio).</li>
                    <li>Choose whether you want to "Shrink" or "Enlarge" the ratio.</li>
                    <li>Enter the factor by which you want to scale it (e.g., enter 2 to double it).</li>
                    <li>Click "Calculate" to see the new, scaled ratio.</li>
                </ol>
            </div>
        </CardContent>
    </Card>
);

const EducationalContent = () => (
    <Card>
        <CardHeader>
            <CardTitle>Mastering Ratios: A Practical Guide</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground">
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="text-xl font-semibold">What is a Ratio?</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                        <p>A ratio is a way to compare two or more quantities, showing their relative sizes. It tells you how much of one thing there is compared to another. For instance, if a recipe calls for 1 cup of sugar for every 2 cups of flour, the ratio of sugar to flour is 1:2.</p>
                        <p>Ratios can be expressed in several ways:</p>
                        <ul className="list-disc list-inside pl-4 space-y-1">
                            <li><b>Using a colon:</b> 1:2</li>
                            <li><b>Using the word "to":</b> 1 to 2</li>
                            <li><b>As a fraction:</b> 1/2</li>
                        </ul>
                        <p>Ratios are fundamental in many fields, from cooking and engineering to finance and art, helping us scale recipes, build models, and understand financial metrics.</p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className="text-xl font-semibold">Real-World Applications of Ratios</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                        <div>
                            <h4 className="font-semibold text-foreground">Cooking and Baking</h4>
                            <p>Recipes are all about ratios. If a recipe for 4 people requires a 2:1 ratio of flour to water, you can easily scale it for 8 people by doubling both parts of the ratio to 4:2, ensuring the taste and texture remain consistent.</p>
                        </div>
                         <div>
                            <h4 className="font-semibold text-foreground">Maps and Models</h4>
                            <p>A map's scale, such as 1:100,000, is a ratio. It means that 1 unit of distance on the map represents 100,000 of the same units in reality. This allows for accurate representation of large areas in a small space.</p>
                        </div>
                         <div>
                            <h4 className="font-semibold text-foreground">Finance and Business</h4>
                            <p>Financial ratios like the debt-to-equity ratio (e.g., 0.5:1) help investors assess a company's health. It compares what a company owes to what it owns, providing a snapshot of its financial leverage.</p>
                        </div>
                    </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="item-3">
                    <AccordionTrigger className="text-xl font-semibold">Understanding Aspect Ratios</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                       <p>An aspect ratio describes the proportional relationship between an image's width and its height. It's written as two numbers separated by a colon, like 16:9. This doesn't define the image's actual size, but rather its shape.</p>
                        <p>The <b>16:9</b> ratio is the standard for high-definition television (HDTV), modern computer monitors, and cinematic videos, providing a wide, immersive viewing experience. Older televisions and computer screens often used a more square-like <b>4:3</b> ratio.</p>
                        <p>The table below lists common screen resolutions and their corresponding aspect ratios, which are crucial in digital media, graphic design, and video production to ensure content is displayed correctly without distortion.</p>
                        <div className="overflow-x-auto mt-4 rounded-lg border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Aspect ratio</TableHead>
                                        <TableHead>Width (px)</TableHead>
                                        <TableHead>Height (px)</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {aspectRatios.map((ar, i) => (
                                        <TableRow key={i}>
                                            <TableCell>{ar.name}</TableCell>
                                            <TableCell>{ar.ratio}</TableCell>
                                            <TableCell>{ar.width}</TableCell>
                                            <TableCell>{ar.height}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
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
                    <AccordionTrigger>What is a proportion?</AccordionTrigger>
                    <AccordionContent>
                        A proportion is a statement that two ratios are equal. For example, the statement 1:2 = 2:4 is a proportion. The proportion calculator helps you find a missing value in such a statement.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>How does the proportion calculator solve for the missing value?</AccordionTrigger>
                    <AccordionContent>
                        It uses cross-multiplication. In the proportion A:B = C:D, which is the same as A/B = C/D, the product of the means equals the product of the extremes (A × D = B × C). The calculator rearranges this formula to solve for the unknown value.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>Can I simplify a ratio?</AccordionTrigger>
                    <AccordionContent>
                        Yes. To simplify a ratio, you find the greatest common divisor (GCD) of the numbers in the ratio and divide all parts by it. For example, the ratio 10:15 can be simplified to 2:3 by dividing both numbers by their GCD, which is 5.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger>Can I use ratios with more than two numbers?</AccordionTrigger>
                    <AccordionContent>
                        Yes, ratios can compare more than two quantities (e.g., 1:2:3). However, these calculators are designed to work with two-part ratios.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
    </Card>
);

export default function RatioPage() {
    return (
        <>
          <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
          />
          <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
          />
          <div className="flex flex-1 flex-col">
              <PageHeader title="Ratio Calculator" />
              <main className="flex-1 p-4 md:p-6 lg:p-8">
                  <div className="mx-auto max-w-2xl space-y-8">
                      <section className="text-center">
                          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                              Ratio Calculator
                          </h1>
                          <p className="mt-4 text-lg text-muted-foreground">
                              A free online calculator for solving ratio proportions and scaling ratios up or down with ease.
                          </p>
                      </section>
                      
                      <RatioCalculator />

                      <HowToUseGuide />

                      <section className="text-center">
                          <h2 className="text-2xl font-bold text-foreground">Related Calculators</h2>
                          <div className="flex flex-wrap justify-center gap-2 mt-4">
                              <Button asChild variant="outline">
                                  <Link href="/fraction">Fraction Calculator</Link>
                              </Button>
                               <Button asChild variant="outline">
                                  <Link href="/percentage">Percentage Calculator</Link>
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
