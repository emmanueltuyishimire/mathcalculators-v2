
import { PageHeader } from '@/components/page-header';
import RatioCalculator from '@/components/calculators/ratio-calculator';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Ratio Calculator',
    description: 'A free online calculator for solving ratio problems (A:B = C:D) and scaling ratios up or down.',
};

const aspectRatios = [
    { name: "480p", ratio: "3:2", width: 720, height: 480 },
    { name: "576p", ratio: "5:4", width: 720, height: 576 },
    { name: "720p", ratio: "16:9", width: 1280, height: 720 },
    { name: "1080p", ratio: "16:9", width: 1920, height: 1080 },
    { name: "2160p (4K UHD)", ratio: "16:9", width: 3840, height: 2160 },
    { name: "4320p (8K UHD)", ratio: "16:9", width: 7680, height: 4320 },
    { name: "8640p", ratio: "16:9", width: 15360, height: 8640 },
    { name: "SVGA", ratio: "4:3", width: 800, height: 600 },
    { name: "WSVGA", ratio: "~17:10", width: 1024, height: 600 },
    { name: "XGA", ratio: "4:3", width: 1024, height: 768 },
    { name: "XGA+", ratio: "4:3", width: 1152, height: 864 },
    { name: "WXGA", ratio: "16:9", width: 1280, height: 720 },
    { name: "WXGA", ratio: "5:3", width: 1280, height: 768 },
    { name: "WXGA", ratio: "16:10", width: 1280, height: 800 },
    { name: "SXGA (UVGA)", ratio: "4:3", width: 1280, height: 960 },
    { name: "SXGA", ratio: "5:4", width: 1280, height: 1024 },
    { name: "HD", ratio: "~16:9", width: 1360, height: 768 },
    { name: "HD", ratio: "~16:9", width: 1366, height: 768 },
    { name: "SXGA+", ratio: "4:3", width: 1400, height: 1050 },
    { name: "WXGA+", ratio: "16:10", width: 1440, height: 900 },
    { name: "HD+", ratio: "16:9", width: 1600, height: 900 },
    { name: "UXGA", ratio: "4:3", width: 1600, height: 1200 },
    { name: "WSXGA+", ratio: "16:10", width: 1680, height: 1050 },
    { name: "FHD", ratio: "16:9", width: 1920, height: 1080 },
    { name: "WUXGA", ratio: "16:10", width: 1920, height: 1200 },
    { name: "QWXGA", ratio: "16:9", width: 2048, height: 1152 },
    { name: "WQHD", ratio: "16:9", width: 2560, height: 1440 },
    { name: "WQXGA", ratio: "16:10", width: 2560, height: 1600 },
];

const EducationalContent = () => (
    <Card>
        <CardHeader>
            <CardTitle>Understanding Ratios</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground">
            <div>
                <h3 className="text-xl font-semibold text-foreground">What is a Ratio?</h3>
                <p className="mt-2">A ratio is a quantitative relationship between two numbers that describe how many times one value can contain another. Applications of ratios are fairly ubiquitous, and the concept of ratios is quite intuitive. This could likely be demonstrated by giving a child half as many cookies as his sister. While the child may not be able to voice the injustice using ratios, the raucous protestations that would most likely ensue should make it immediately obvious that he is well aware he has received 1:2 as many cookies as his sister, conceptually, if not mathematically.</p>
                <p className="mt-2">As shown above, ratios are often expressed as two numbers separated by a colon. They can also be written as "1 to 2" or as a fraction ½. The ratio represents the number that needs to be multiplied by the denominator in order to yield the numerator. In this case, ½. This is clearer if the first number is larger than the second, i.e. with the ratio 2:1, 2 can contain 1, 2 times. It is also possible to have ratios that have more than two terms.</p>
                <p className="mt-2">Ratios are common in many daily applications including: aspect ratios for screens, describing maps and models as a scaled-down version of their actual size, in baking and cooking, when discussing the odds of something occurring, or to describe rates, such as in finance. If, for example, a person wanted to make 5 cakes, each of which required a 1:2:3 ratio of butter:sugar:flour, and wanted to determine the total amount of butter, sugar, and flour that is necessary, it would be simple to compute given the ratio. Increasing the ratio by five times yields a 5:10:15 ratio, and this can be multiplied by whatever the actual amount of sugar, flour, and butter are used in the actual cake recipe.</p>
            </div>
            <div>
                <h3 className="text-xl font-semibold text-foreground">Typical Aspect Ratios and Sizes of Screens and Videos</h3>
                <p className="mt-2">The aspect ratio is the ratio of a geometric shape's sizes in different dimensions. In the case of a rectangle, the aspect ratio is that of its width to its height. Although aspect ratios are widely used in applications such as tire sizing, paper sizing, and standard photographic print sizes, some of the most frequent uses of aspect ratios involve computer screen dimensions, mobile phone screens, and video sizes. As such, below is a list of typical computer screen/video resolutions and aspect ratios.</p>
                 <div className="overflow-x-auto mt-4 rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Aspect ratio</TableHead>
                                <TableHead>Width (pixel)</TableHead>
                                <TableHead>Height (pixel)</TableHead>
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
            </div>
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
                            Modify the values and click the calculate button to use.
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
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
