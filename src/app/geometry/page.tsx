
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Square, Waves, Volume, Circle, Triangle, TrendingUp, Move3d, Sigma } from 'lucide-react';
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Geometry Calculators',
  description: 'A comprehensive set of geometry calculators for calculating area, volume, surface area, slope, distance, and other geometric properties.',
};

const geometryTools = [
  {
    href: '/geometry/area',
    label: 'Area Calculator',
    icon: Square,
    description: 'Calculate the area of common 2D shapes.',
  },
  {
    href: '/geometry/volume',
    label: 'Volume Calculator',
    icon: Volume,
    description: 'Calculate the volume of common 3D shapes.',
  },
  {
    href: '/geometry/surface-area',
    label: 'Surface Area Calculator',
    icon: Waves,
    description: 'Calculate the surface area of common 3D shapes.',
  },
  {
    href: '/geometry/circle',
    label: 'Circle Calculator',
    icon: Circle,
    description: 'Calculate radius, diameter, circumference, and area.',
  },
  {
    href: '/pythagorean',
    label: 'Pythagorean',
    icon: Sigma,
    description: 'Solve for sides of a right-angled triangle.',
  },
  {
    href: '/right-triangle',
    label: 'Right Triangle',
    icon: Triangle,
    description: 'Solve right triangles from any two values.',
  },
  {
    href: '/slope',
    label: 'Slope Calculator',
    icon: TrendingUp,
    description: 'Calculate slope from two points or one point and an angle.',
  },
  {
    href: '/distance',
    label: 'Distance Calculator',
    icon: Move3d,
    description: 'Calculate distance between points in 2D, 3D, and on Earth.',
  },
];


export default function GeometryPage() {
  return (
    <div className="flex flex-1 flex-col">
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-4xl space-y-8">
            <section className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                    Geometry Calculators
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    A comprehensive set of geometry calculators for calculating area, volume, surface area and other geometric properties.
                </p>
            </section>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {geometryTools.map((tool, index) => (
                 <React.Fragment key={tool.label}>
                    <Link href={tool.href} className="group">
                      <Card className="h-full transition-all group-hover:shadow-lg group-hover:-translate-y-1">
                        <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                           <div className="rounded-full bg-primary/10 p-3 text-primary">
                            <tool.icon className="h-6 w-6" />
                          </div>
                          <CardTitle>{tool.label}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">{tool.description}</p>
                        </CardContent>
                      </Card>
                    </Link>
                    {(index + 1) % 6 === 0 && (
                      <div className="h-40 bg-muted/50 flex items-center justify-center text-muted-foreground text-sm my-4 sm:col-span-2 lg:col-span-3">[Ad Placeholder]</div>
                    )}
                 </React.Fragment>
              ))}
            </div>
        </div>
      </main>
    </div>
  );
}
