
import { PageHeader } from '@/components/page-header';
import DistanceCalculator from '@/components/calculators/distance-calculator';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const metadata: Metadata = {
    title: 'Distance Calculator',
    description: 'Calculate the distance between two points in 2D, 3D, or on the Earth\'s surface using latitude and longitude.',
};

const HowToUseGuide = () => (
    <Card>
        <CardHeader>
            <CardTitle>How to Use the Distance Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground">
            <div>
                <h3 className="text-xl font-semibold text-foreground">2D Distance Calculator</h3>
                <p className="mt-2">This tool finds the straight-line distance between two points on a flat plane.</p>
                <ol className="list-decimal list-inside pl-4 mt-2">
                    <li>Enter the X and Y coordinates for both Point 1 and Point 2.</li>
                    <li>The calculator will automatically compute the distance, slope, angle, and the equation of the line connecting the points.</li>
                </ol>
            </div>
            <div>
                <h3 className="text-xl font-semibold text-foreground">3D Distance Calculator</h3>
                <p className="mt-2">This extends the 2D calculator to three dimensions.</p>
                <ol className="list-decimal list-inside pl-4 mt-2">
                    <li>Enter the X, Y, and Z coordinates for both Point 1 and Point 2.</li>
                    <li>The calculator will display the direct distance between the points in 3D space.</li>
                </ol>
            </div>
            <div>
                <h3 className="text-xl font-semibold text-foreground">Latitude & Longitude Distance</h3>
                <p className="mt-2">This calculates the great-circle distance (shortest path) between two points on the Earth's surface.</p>
                 <ol className="list-decimal list-inside pl-4 mt-2">
                    <li>Input the latitude and longitude for two different geographical locations.</li>
                    <li>The result will be the distance in both kilometers and miles.</li>
                </ol>
            </div>
        </CardContent>
    </Card>
);

const EducationalContent = () => (
    <Card>
        <CardHeader>
            <CardTitle>Understanding Distance Formulas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground">
            <div>
                <h3 className="text-xl font-semibold text-foreground">Distance in a 2D Coordinate Plane</h3>
                <p className="mt-2">The distance between two points in a two-dimensional plane is found using the Euclidean distance formula, which is a direct application of the Pythagorean theorem. It treats the straight line connecting two points as the hypotenuse of a right-angled triangle.</p>
                <p className="font-mono bg-muted p-2 rounded-md my-2 text-center">d = √[(x₂ - x₁)² + (y₂ - y₁)²]</p>
                <p>Here, (x₁, y₁) and (x₂, y₂) represent the coordinates of the two points. The formula squares the change in the horizontal (x) and vertical (y) distances, adds them together, and then takes the square root to find the length of the hypotenuse.</p>
            </div>
            <div>
                <h3 className="text-xl font-semibold text-foreground">Distance in 3D Coordinate Space</h3>
                <p className="mt-2">The concept extends seamlessly into three dimensions. The distance formula for 3D space incorporates the change along the z-axis, accounting for depth.</p>
                <p className="font-mono bg-muted p-2 rounded-md my-2 text-center">d = √[(x₂ - x₁)² + (y₂ - y₁)² + (z₂ - z₁)²]</p>
                <p>This is a natural extension of the 2D formula, adding the squared difference of the z-coordinates to the sum before taking the square root.</p>
            </div>
            <div>
                <h3 className="text-xl font-semibold text-foreground">Distance on the Earth's Surface</h3>
                <p className="mt-2">Calculating the distance between two geographical locations is more complex because the Earth is an oblate spheroid (a slightly flattened sphere). Two primary methods are used for this.</p>
                <div className="mt-4 space-y-4">
                    <div>
                        <h4 className="font-semibold text-foreground">The Haversine Formula</h4>
                        <p>This formula is widely used to calculate the great-circle distance—the shortest path between two points along the surface of a sphere. While it's a very good approximation, it treats the Earth as a perfect sphere, which can lead to errors of up to 0.5%.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-foreground">Lambert's Formula for Ellipsoids</h4>
                        <p>For higher accuracy, Lambert's formula is used. It calculates the shortest distance (geodesic) on the surface of an ellipsoid, which is a more accurate model of the Earth. This method significantly reduces the error found in the Haversine formula, often providing precision within a few meters over vast distances. Our calculator utilizes this more accurate approach for geographical calculations.</p>
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
                    <AccordionTrigger>What is the difference between 2D and 3D distance?</AccordionTrigger>
                    <AccordionContent>
                        2D distance is measured on a flat plane (like a map) and only considers X and Y coordinates. 3D distance is measured in space and includes a Z coordinate, which accounts for height or depth.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Why is the latitude/longitude distance different from a straight line?</AccordionTrigger>
                    <AccordionContent>
                        The Earth is a sphere, so the shortest distance between two points is a "great-circle" path along the curve of the Earth, not a straight line through it. Our calculator uses the Haversine formula to compute this curved distance.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>What units can I use for the 2D and 3D calculators?</AccordionTrigger>
                    <AccordionContent>
                        The 2D and 3D calculators are unit-agnostic. The distance result will be in the same units that you use for the coordinates (e.g., if you input coordinates in meters, the distance will be in meters).
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger>How do I find the latitude and longitude of a location?</AccordionTrigger>
                    <AccordionContent>
                        You can easily find the latitude and longitude of any location using online mapping services like Google Maps. Simply right-click on a location on the map, and its coordinates will be displayed.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                    <AccordionTrigger>What does the "Equation of the line" in the 2D result mean?</AccordionTrigger>
                    <AccordionContent>
                        This is the algebraic formula (`y = mx + b`) that describes the straight line connecting your two points. 'm' is the slope, and 'b' is the y-intercept (the point where the line crosses the vertical y-axis).
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
    </Card>
);

export default function DistancePage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Distance Calculator" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-4xl space-y-12">
            <section className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                    Distance Calculator
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Find the distance between two points in a 2D plane, 3D space, or between two latitude-longitude coordinates on Earth.
                </p>
            </section>
            
            <DistanceCalculator />

            <HowToUseGuide />
            
            <EducationalContent />
            <FaqSection />
        </div>
      </main>
    </div>
  );
}
