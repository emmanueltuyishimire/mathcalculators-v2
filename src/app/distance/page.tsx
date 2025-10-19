
import { PageHeader } from '@/components/page-header';
import DistanceCalculator from '@/components/calculators/distance-calculator';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Distance Calculator',
    description: 'Calculate the distance between two points in 2D, 3D, or on the Earth\'s surface using latitude and longitude.',
};

const EducationalContent = () => (
    <Card>
        <CardHeader>
            <CardTitle>Understanding Distance Formulas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground">
            <div>
                <h3 className="text-xl font-semibold text-foreground">Distance in a 2D Coordinate Plane</h3>
                <p className="mt-2">The distance between two points in a two-dimensional plane is found using the Euclidean distance formula, derived from the Pythagorean theorem.</p>
                <p className="font-mono bg-muted p-2 rounded-md my-2 text-center">d = √[(x₂ - x₁)² + (y₂ - y₁)²]</p>
                <p>Here, (x₁, y₁) and (x₂, y₂) are the coordinates of the two points. The formula calculates the length of the hypotenuse of a right triangle formed by the points.</p>
            </div>
            <div>
                <h3 className="text-xl font-semibold text-foreground">Distance in 3D Coordinate Space</h3>
                <p className="mt-2">The concept extends naturally to three dimensions. The distance between two points in 3D space includes the change along the z-axis.</p>
                <p className="font-mono bg-muted p-2 rounded-md my-2 text-center">d = √[(x₂ - x₁)² + (y₂ - y₁)² + (z₂ - z₁)²]</p>
                <p>This formula is a straightforward extension of the 2D version, accounting for depth.</p>
            </div>
            <div>
                <h3 className="text-xl font-semibold text-foreground">Distance on the Earth's Surface</h3>
                <p className="mt-2">Calculating the distance between two geographical points is more complex because the Earth is a sphere (an ellipsoid, more accurately). Two common methods are the Haversine and Lambert's formulas.</p>
                <div className="mt-4 space-y-4">
                    <div>
                        <h4 className="font-semibold text-foreground">Haversine Formula</h4>
                        <p>This formula determines the great-circle distance between two points on a sphere. A great circle is the shortest path along the surface. While very common, it can have an error of up to 0.5% because it treats the Earth as a perfect sphere.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-foreground">Lambert's Formula</h4>
                        <p>This more advanced formula calculates the shortest distance on the surface of an ellipsoid. It is significantly more accurate than the Haversine formula for Earth calculations, often with precision down to a few meters over thousands of kilometers. Our calculator uses Lambert's formula for greater accuracy.</p>
                    </div>
                </div>
            </div>
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
            
            <EducationalContent />

            <Card>
              <CardHeader>
                <CardTitle>Distance on a Map</CardTitle>
                <CardDescription>Click two points on the map to find the shortest distance between them.</CardDescription>
              </CardHeader>
              <CardContent>
                 <div className="relative h-[400px] w-full bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Interactive map coming soon!</p>
                     <Image src="https://picsum.photos/seed/map/1200/800" alt="Map placeholder" layout="fill" objectFit="cover" className="rounded-lg opacity-20" />
                </div>
              </CardContent>
            </Card>
        </div>
      </main>
    </div>
  );
}
