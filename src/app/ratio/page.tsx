
import { PageHeader } from '@/components/page-header';
import RatioCalculator from '@/components/calculators/ratio-calculator';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const metadata: Metadata = {
    title: 'Ratio Calculator',
    description: 'A free online calculator for solving ratio problems (A:B = C:D) and scaling ratios up or down.',
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

export default function RatioPage() {
    return (
        <div className="flex flex-1 flex-col">
            <PageHeader title="Ratio Calculator" />
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                <div className="mx-auto max-w-2xl space-y-8">
                    <section className="text-center">
                        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                            Ratio Calculator
                        </h1>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Solve for missing values in proportions or scale ratios up and down with ease. Modify the values and click "Calculate" to use.
                        </p>
                    </section>
                    
                    <RatioCalculator />

                    <EducationalContent />

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
                </div>
            </main>
        </div>
    );
}
