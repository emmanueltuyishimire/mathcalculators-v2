
import { PageHeader } from '@/components/page-header';
import VolumeCalculator from '@/components/calculators/volume-calculator';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const metadata: Metadata = {
    title: 'Volume Calculator',
    description: 'A list of volume calculators for several common shapes. Please fill in the corresponding fields and click the "Calculate" button.',
};

const EducationalContent = () => (
    <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
            <AccordionTrigger className="text-xl font-semibold">Understanding Volume</AccordionTrigger>
            <AccordionContent className="space-y-4 text-muted-foreground">
                <p>Volume is the measure of the three-dimensional space that an object or substance occupies. The standard international (SI) unit for volume is the cubic meter (m³). When we talk about the volume of a container, we usually refer to its capacity—how much fluid it can hold—rather than the space the container itself displaces.</p>
                <p>For many common geometric shapes, volume can be determined using specific formulas. More complex shapes can often be broken down into these simpler forms, and their total volume can be found by summing the volumes of each part. For even more intricate shapes where a formula isn't available, advanced methods like integral calculus or computational techniques such as the finite element method are used. Additionally, if a substance has a known and uniform density, its volume can be derived from its weight. This page provides calculators for some of the most common geometric shapes.</p>
            </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
            <AccordionTrigger className="text-xl font-semibold">About the Shapes</AccordionTrigger>
            <AccordionContent className="space-y-6">
                <div>
                    <h4 className="font-semibold text-foreground">Sphere</h4>
                    <p>A sphere is a perfectly round, three-dimensional object, representing the 3D equivalent of a two-dimensional circle. Mathematically, it consists of all points in space that are at an equal distance (the radius 'r') from a central point. The most familiar example is a perfectly round ball. In mathematics, a "ball" refers to the space contained within a sphere, but both share the same radius, center, and diameter, and their volumes are calculated identically. The diameter 'd' is the longest line segment connecting two points on the sphere and passing through its center.</p>
                    <p className="font-mono bg-muted p-2 rounded-md my-2 text-sm">Example: To find the volume of a spherical water balloon with a radius of 0.15 ft, you would use the formula: volume = 4/3 × π × (0.15)³ ≈ 0.0141 ft³.</p>
                </div>
                <div>
                    <h4 className="font-semibold text-foreground">Cone</h4>
                    <p>A cone is a three-dimensional shape that tapers smoothly from a flat, typically circular base to a single point called the apex or vertex. It is formed by a set of line segments connecting the base to the apex. This calculator focuses on the right circular cone, where the apex is directly above the center of the base. The volume is calculated based on its radius 'r' and height 'h'.</p>
                    <p className="font-mono bg-muted p-2 rounded-md my-2 text-sm">Example: A waffle cone with a base radius of 1.5 inches and a height of 5 inches has a volume of: volume = 1/3 × π × (1.5)² × 5 ≈ 11.781 in³.</p>
                </div>
                <div>
                    <h4 className="font-semibold text-foreground">Cube</h4>
                    <p>A cube is the three-dimensional version of a square, featuring six identical square faces. Three faces meet at each vertex, and every face is perpendicular to its adjacent ones. It's a special type of shape, fitting into categories like square parallelepiped and equilateral cuboid. The volume is found by cubing the length of one of its edges 'a'.</p>
                    <p className="font-mono bg-muted p-2 rounded-md my-2 text-sm">Example: A cubic suitcase with an edge length of 2 feet can hold a volume of soil calculated as: volume = 2³ = 8 ft³.</p>
                </div>
                <div>
                    <h4 className="font-semibold text-foreground">Cylinder</h4>
                    <p>In its basic form, a cylinder is a surface created by points at a fixed distance from a central straight line or axis. Commonly, this refers to a right circular cylinder, which has two parallel circular bases connected by an axis perpendicular to their centers. Its volume is determined by its radius 'r' and height 'h'.</p>
                     <p className="font-mono bg-muted p-2 rounded-md my-2 text-sm">Example: A cylindrical barrel with a radius of 3 ft and a height of 4 ft can hold a volume of: volume = π × 3² × 4 ≈ 113.097 ft³.</p>
                </div>
                 <div>
                    <h4 className="font-semibold text-foreground">Rectangular Tank</h4>
                    <p>A rectangular tank, or rectangular prism, is a variant of a cube where the edges can have different lengths. It is enclosed by six rectangular faces, with three meeting at each vertex. Each face is perpendicular to those adjacent to it.</p>
                     <p className="font-mono bg-muted p-2 rounded-md my-2 text-sm">Example: A rectangular pack with dimensions of 4 ft (length), 3 ft (width), and 2 ft (height) has a volume of: volume = 4 × 3 × 2 = 24 ft³.</p>
                </div>
                <div>
                    <h4 className="font-semibold text-foreground">Capsule</h4>
                    <p>A capsule is a 3D shape composed of a cylinder with a hemisphere (half of a sphere) at each end. Its volume is the sum of the volume of the central cylinder and the two hemispherical ends, which together form a full sphere.</p>
                     <p className="font-mono bg-muted p-2 rounded-md my-2 text-sm">Example: A time capsule with a radius of 1.5 ft and a cylinder height of 3 ft has a total volume of: volume = (π × 1.5² × 3) + (4/3 × π × 1.5³) ≈ 35.343 ft³.</p>
                </div>
                 <div>
                    <h4 className="font-semibold text-foreground">Spherical Cap</h4>
                    <p>A spherical cap is a section of a sphere cut off by a plane. If the plane cuts through the sphere's center, it creates a hemisphere. The volume can be calculated if you know any two of the following: the radius of the cap's base (r), the radius of the sphere (R), or the height of the cap (h).</p>
                     <p className="font-mono bg-muted p-2 rounded-md my-2 text-sm">Example: If you cut a spherical cap of height 0.3 inches from a golf ball with a radius of 1.68 inches, the cap's volume is: volume = 1/3 × π × 0.3² × (3 × 1.68 - 0.3) ≈ 0.447 in³.</p>
                </div>
                <div>
                    <h4 className="font-semibold text-foreground">Conical Frustum</h4>
                    <p>A conical frustum is what remains of a cone when its top is cut off by a plane parallel to the base. Common examples include lampshades and buckets. The volume is calculated based on the height 'h' and the radii of its two circular bases (r and R).</p>
                    <p className="font-mono bg-muted p-2 rounded-md my-2 text-sm">Example: A conical frustum of ice cream with a height of 4 inches, a top radius of 0.2 inches, and a bottom radius of 1.5 inches has a volume of: volume = 1/3 × π × 4 × (0.2² + 0.2×1.5 + 1.5²) ≈ 10.849 in³.</p>
                </div>
                 <div>
                    <h4 className="font-semibold text-foreground">Ellipsoid</h4>
                    <p>An ellipsoid is the three-dimensional counterpart to an ellipse, resembling a sphere that has been stretched or compressed along its axes. The three perpendicular axes of symmetry are known as the principal axes (a, b, c). If these axes have different lengths, the ellipsoid is called tri-axial.</p>
                    <p className="font-mono bg-muted p-2 rounded-md my-2 text-sm">Example: An ellipsoid-shaped sandwich bun with axes of 1.5, 2, and 5 inches can hold a volume of meat calculated as: volume = 4/3 × π × 1.5 × 2 × 5 ≈ 62.832 in³.</p>
                </div>
                 <div>
                    <h4 className="font-semibold text-foreground">Square Pyramid</h4>
                    <p>A pyramid is a three-dimensional solid with a polygonal base and an apex. A square pyramid has a square as its base. In a right pyramid, the apex is directly above the center of the base. The volume is determined by the area of the base 'b' and the perpendicular height 'h' from the base to the apex.</p>
                    <p className="font-mono bg-muted p-2 rounded-md my-2 text-sm">Example: A pyramid of mud with a square base edge of 5 feet and a height of 12 feet has a volume of: volume = 1/3 × 5² × 12 = 100 ft³.</p>
                </div>
                <div>
                    <h4 className="font-semibold text-foreground">Tube (Hollow Cylinder)</h4>
                    <p>A tube or pipe is a hollow cylinder used for transferring fluids or gases. Its volume is calculated by finding the volume of the outer cylinder and subtracting the volume of the inner hollow space. The calculation uses the outer diameter (d1), inner diameter (d2), and length (l).</p>
                    <p className="font-mono bg-muted p-2 rounded-md my-2 text-sm">Example: A concrete pipe with an outer diameter of 3 ft, an inner diameter of 2.5 ft, and a length of 10 ft requires a volume of: volume = (π × (3² - 2.5²) / 4) × 10 ≈ 21.6 ft³ of concrete.</p>
                </div>
            </AccordionContent>
        </AccordionItem>
         <AccordionItem value="item-3">
            <AccordionTrigger className="text-xl font-semibold">Common Volume Units</AccordionTrigger>
            <AccordionContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Unit</TableHead>
                            <TableHead>Cubic Meters</TableHead>
                            <TableHead>Milliliters</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow><TableCell>Milliliter (cubic cm)</TableCell><TableCell>0.000001</TableCell><TableCell>1</TableCell></TableRow>
                        <TableRow><TableCell>Cubic inch</TableCell><TableCell>0.00001639</TableCell><TableCell>16.39</TableCell></TableRow>
                        <TableRow><TableCell>Pint (US)</TableCell><TableCell>0.000473</TableCell><TableCell>473</TableCell></TableRow>
                        <TableRow><TableCell>Quart (US)</TableCell><TableCell>0.000946</TableCell><TableCell>946</TableCell></TableRow>
                        <TableRow><TableCell>Liter</TableCell><TableCell>0.001</TableCell><TableCell>1,000</TableCell></TableRow>
                        <TableRow><TableCell>Gallon (US)</TableCell><TableCell>0.003785</TableCell><TableCell>3,785</TableCell></TableRow>
                        <TableRow><TableCell>Cubic foot</TableCell><TableCell>0.028317</TableCell><TableCell>28,317</TableCell></TableRow>
                        <TableRow><TableCell>Cubic yard</TableCell><TableCell>0.764555</TableCell><TableCell>764,555</TableCell></TableRow>
                        <TableRow><TableCell>Cubic meter</TableCell><TableCell>1</TableCell><TableCell>1,000,000</TableCell></TableRow>
                        <TableRow><TableCell>Cubic kilometer</TableCell><TableCell>1,000,000,000</TableCell><TableCell>10¹⁵</TableCell></TableRow>
                    </TableBody>
                </Table>
            </AccordionContent>
        </AccordionItem>
    </Accordion>
);

export default function VolumePage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Volume Calculator" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-4xl space-y-12">
            <section className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                    Volume Calculator
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    The following is a list of volume calculators for several common shapes. Please fill in the corresponding fields and click the "Calculate" button.
                </p>
            </section>
            
            <VolumeCalculator />
            
            <EducationalContent />

             <section className="text-center">
                <h2 className="text-2xl font-bold text-foreground">Related Calculators</h2>
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                    <Button asChild variant="outline">
                        <Link href="/geometry">Geometry Calculators</Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link href="/statistics/mean-median-mode">Mean, Median, Mode Calculator</Link>
                    </Button>
                </div>
            </section>
        </div>
      </main>
    </div>
  );
}
