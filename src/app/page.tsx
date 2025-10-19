"use client";

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, FunctionSquare, BarChartHorizontal, FlaskConical, Square, MoreVertical, Table, Type, Sigma, Replace, Star, TrendingUp, Move3d, Triangle } from 'lucide-react';
import { useState, useEffect } from 'react';
import ScientificCalculator from '@/components/calculators/scientific-calculator';

const carouselSlides = [
  {
    imageUrl: "/math-calculator-background-image1.webp",
    title: "Precision in Every Calculation",
    description: "From basic arithmetic to complex calculus, find the right tool for your needs.",
    dataAiHint: "abstract geometric"
  },
  {
    imageUrl: "/math-calculator-background-image2.webp",
    title: "Master Geometry",
    description: "Calculate area, volume, slope, and more with our intuitive geometry tools.",
    dataAiHint: "geometric shapes"
  },
  {
    imageUrl: "/math-calculator-background-image3.webp",
    title: "Unlock Statistical Insights",
    description: "Analyze data with our mean, median, mode, and standard deviation calculators.",
    dataAiHint: "data charts"
  },
    {
    imageUrl: "/math-calculator-background-image4.webp",
    title: "Solve Complex Algebra",
    description: "Tackle equations and explore algebraic concepts with ease.",
    dataAiHint: "formulas equations"
  },
  {
    imageUrl: "/math-calculator-background-image5.webp",
    title: "Explore Trigonometry",
    description: "Sine, cosine, tangent, and more for all your angular calculation needs.",
    dataAiHint: "trigonometry waves"
  },
  {
    imageUrl: "/math-calculator-background-image6.webp",
    title: "Dive into Calculus",
    description: "Derivatives, integrals, and limits made simple with our calculus tools.",
    dataAiHint: "calculus graph"
  },
  {
    imageUrl: "/math-calculator-background-image7.webp",
    title: "Matrix Operations Simplified",
    description: "Perform matrix addition, multiplication, and transformations effortlessly.",
    dataAiHint: "matrix numbers"
  },
  {
    imageUrl: "/math-calculator-background-image8.webp",
    title: "Convert Units Instantly",
    description: "A versatile unit converter for length, mass, temperature, and more.",
    dataAiHint: "measurements units"
  },
  {
    imageUrl: "/math-calculator-background-image9.webp",
    title: "For Students & Professionals",
    description: "Reliable and accurate tools for both academic and professional use.",
    dataAiHint: "learning education"
  },
   {
    imageUrl: "/math-calculator-background-image10.webp",
    title: "Free and Accessible to All",
    description: "Our mission is to make powerful mathematical tools available to everyone.",
    dataAiHint: "community people"
  },
   {
    imageUrl: "/math-calculator-background-image11.webp",
    title: "Advanced Scientific Functions",
    description: "Logarithms, exponents, and more in our full-featured scientific calculator.",
    dataAiHint: "science technology"
  },
   {
    imageUrl: "/math-calculator-background-image12.webp",
    title: "Discover Your Path",
    description: "Explore numerology and personal insights with the Destiny Matrix calculator.",
    dataAiHint: "destiny abstract"
  }
];

function Slideshow() {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % carouselSlides.length);
    }, 5000); // Change image every 5 seconds

    return () => clearTimeout(timer);
  }, [slideIndex]);

  return (
    <section 
      className="slideshow-container"
    >
      {carouselSlides.map((slide, index) => (
        <div
          key={index}
          className="mySlides fade"
          style={{ display: index === slideIndex ? 'block' : 'none' }}
        >
          <img src={slide.imageUrl.replace(/ /g, '%20')} alt={slide.title} data-ai-hint={slide.dataAiHint} />
        </div>
      ))}
      
      <div className="hero-text-overlay">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
            {carouselSlides[slideIndex].title}
          </h1>
          <p className="mx-auto max-w-[700px] text-primary-foreground/80 md:text-xl">
            {carouselSlides[slideIndex].description}
          </p>
           <Button asChild variant="secondary" size="lg">
            <Link href="#tools">Explore Tools</Link>
          </Button>
      </div>

      <div style={{ textAlign: 'center', position: 'absolute', bottom: '20px', width: '100%' }}>
        {carouselSlides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === slideIndex ? 'active' : ''}`}
            onClick={() => setSlideIndex(index)}
          ></span>
        ))}
      </div>
    </section>
  );
}


const tools = [
  { href: '/scientific', label: 'Scientific', icon: FlaskConical, description: 'Advanced functions and operations.' },
  { href: '/basic', label: 'Basic', icon: Calculator, description: 'Essential arithmetic tools.' },
  { href: '/algebra', label: 'Algebra', icon: Type, description: 'Solve equations and inequalities.' },
  { href: '/calculus', label: 'Calculus', icon: Sigma, description: 'Derivatives, integrals, and limits.' },
  { href: '/geometry', label: 'Geometry', icon: Square, description: 'Calculate area, volume, and more.' },
  { href: '/trigonometry', label: 'Trigonometry', icon: MoreVertical, description: 'Sine, cosine, tangent, and more.' },
  { href: '/statistics', label: 'Statistics', icon: BarChartHorizontal, description: 'Mean, median, mode, and more.' },
  { href: '/matrix', label: 'Matrix', icon: Table, description: 'Matrix operations and calculations.' },
  { href: '/converter', label: 'Unit Converter', icon: Replace, description: 'Convert between different units.' },
  { href: '/pythagorean', label: 'Pythagorean', icon: Triangle, description: 'Solve right-angled triangles.' },
  { href: '/slope', label: 'Slope', icon: TrendingUp, description: 'Calculate slope from two points.' },
  { href: '/distance', label: 'Distance', icon: Move3d, description: 'Distance between points.' },
  { href: '/destiny-matrix', label: 'Destiny Matrix', icon: Star, description: 'Numerology and personality insights.' },
];


export default function Home() {
  return (
    <>
      <Slideshow />

      <main className="flex-1 p-4 md:p-6">
        <section id="tools" className="py-12">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-8">Discover Our Tools</h2>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {tools.map((tool) => (
                <Link href={tool.href} key={tool.href} className="group" aria-label={`Go to ${tool.label} calculator`}>
                  <Card className="h-full transition-all group-hover:shadow-lg group-hover:-translate-y-1">
                    <CardHeader className="flex flex-col items-center text-center p-2">
                      <div className="mb-1 rounded-full bg-primary/10 p-2 text-primary">
                        <tool.icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-sm">{tool.label}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center p-2 pt-0">
                      <p className="text-xs text-muted-foreground">{tool.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        <section className="w-full py-12">
            <div className="container px-4 md:px-6">
                <div className="mx-auto max-w-4xl space-y-12">
                    <h2 className="text-3xl font-bold text-center">Featured Calculator</h2>
                    <ScientificCalculator />
                </div>
            </div>
        </section>
      </main>
    </>
  );
}
