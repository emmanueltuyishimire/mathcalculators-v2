
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Square, Waves, Volume } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Geometry Calculators',
  description: 'A comprehensive set of geometry calculators for calculating area, volume, surface area and other geometric properties.',
};

const geometryTools = [
  {
    href: '/geometry/volume',
    label: 'Volume Calculator',
    icon: Volume,
    description: 'Calculate the volume of common 3D shapes.',
  },
  {
    href: '#', // Placeholder for Surface Area Calculator
    label: 'Surface Area Calculator',
    icon: Waves,
    description: 'Calculate the surface area of common 3D shapes. (Coming Soon)',
  },
    {
    href: '#', // Placeholder for Area Calculator
    label: 'Area Calculator',
    icon: Square,
    description: 'Calculate the area of common 2D shapes. (Coming Soon)',
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
              {geometryTools.map((tool) => (
                <Link href={tool.href} key={tool.label} className="group">
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
              ))}
            </div>
        </div>
      </main>
    </div>
  );
}
