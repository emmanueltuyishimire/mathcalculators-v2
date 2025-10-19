
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, FunctionSquare, BarChartHorizontal, FlaskConical, Square, MoreVertical, Table, Type, Sigma, Replace, Star, TrendingUp, Move3d, Triangle } from 'lucide-react';
import Image from 'next/image';
import ScientificCalculator from '@/components/calculators/scientific-calculator';

const tools = [
  {
    href: '/scientific',
    label: 'Scientific',
    icon: FlaskConical,
    description: 'Advanced functions and operations.',
  },
  {
    href: '/pythagorean',
    label: 'Pythagorean',
    icon: Triangle,
    description: 'Solve right-angled triangles.',
  },
  {
    href: '/algebra',
    label: 'Algebra',
    icon: Type,
    description: 'Solve equations and inequalities.',
  },
  {
    href: '/calculus',
    label: 'Calculus',
    icon: Sigma,
    description: 'Derivatives, integrals, and limits.',
  },
    {
    href: '/slope',
    label: 'Slope',
    icon: TrendingUp,
    description: 'Calculate slope from two points.',
  },
   {
    href: '/distance',
    label: 'Distance',
    icon: Move3d,
    description: 'Distance between points.',
  },
  {
    href: '/geometry',
    label: 'Geometry',
    icon: Square,
    description: 'Calculate area, volume, and more.',
  },
  {
    href: '/trigonometry',
    label: 'Trigonometry',
    icon: MoreVertical,
    description: 'Sine, cosine, tangent, and more.',
  },
  {
    href: '/statistics',
    label: 'Statistics',
    icon: BarChartHorizontal,
    description: 'Mean, median, mode, and more.',
  },
  {
    href: '/matrix',
    label: 'Matrix',
    icon: Table,
    description: 'Matrix operations and calculations.',
  },
  {
    href: '/converter',
    label: 'Unit Converter',
    icon: Replace,
    description: 'Convert between different units.',
  },
  {
    href: '/destiny-matrix',
    label: 'Destiny Matrix',
    icon: Star,
    description: 'Numerology and personality insights.',
  },
];

const carouselSlides = [
  {
    title: 'Powerful Scientific Calculator',
    description: 'From basic arithmetic to advanced functions, solve any problem with ease.',
    link: '/scientific',
    buttonText: 'Get Started',
    imageUrl: '/math-calculator-background-image1.webp',
    dataAiHint: 'abstract science',
  },
  {
    title: 'Geometry at Your Fingertips',
    description: 'Calculate area, volume, surface area and more for common geometric shapes.',
    link: '/geometry',
    buttonText: 'Explore Geometry',
    imageUrl: '/math-calculator-background-image2.webp',
    dataAiHint: 'geometric shapes',
  },
  {
    title: 'Master Your Statistics',
    description: 'Analyze data with our tools for mean, median, mode, standard deviation, and more.',
    link: '/statistics',
    buttonText: 'Analyze Data',
    imageUrl: '/math-calculator-background-image3.webp',
    dataAiHint: 'data chart',
  },
   {
    title: 'Solve Complex Matrices',
    description: 'Perform matrix operations like addition, multiplication, inverse, and transpose effortlessly.',
    link: '/matrix',
    buttonText: 'Open Matrix Calculator',
    imageUrl: '/math-calculator-background-image4.webp',
    dataAiHint: 'digital matrix',
  },
   {
    title: 'Fraction Calculations Made Easy',
    description: 'Add, subtract, multiply, and divide fractions with our simple and intuitive fraction calculator.',
    link: '/fraction',
    buttonText: 'Use Fraction Calculator',
    imageUrl: '/math-calculator-background-image5.webp',
    dataAiHint: 'mathematical fractions',
  },
  {
    title: 'Pythagorean Theorem Solver',
    description: 'Quickly find the missing side of any right-angled triangle using the Pythagorean theorem.',
    link: '/pythagorean',
    buttonText: 'Solve Triangles',
    imageUrl: '/math-calculator-background-image6.webp',
    dataAiHint: 'triangle geometry',
  },
  {
    title: 'Convert Units Instantly',
    description: 'Seamlessly convert between various units of length, mass, temperature, and more.',
    link: '/converter',
    buttonText: 'Open Converter',
    imageUrl: '/math-calculator-background-image7.webp',
    dataAiHint: 'measurement units',
  },
  {
    title: 'Find Percentages with Ease',
    description: 'Our percentage calculator helps you with all your percentage-related calculations effortlessly.',
    link: '/percentage',
    buttonText: 'Calculate Percentages',
    imageUrl: '/math-calculator-background-image8.webp',
    dataAiHint: 'percentage sign',
  },
  {
    title: 'Uncover Your Destiny Matrix',
    description: 'Explore the world of numerology and gain insights into your personality and life path.',
    link: '/destiny-matrix',
    buttonText: 'Discover Your Matrix',
    imageUrl: '/math-calculator-background-image9.webp',
    dataAiHint: 'mystical symbols',
  },
  {
    title: 'Explore Trigonometry',
    description: 'Solve trigonometric equations with functions like sine, cosine, and tangent.',
    link: '/trigonometry',
    buttonText: 'Use Trig Calculator',
    imageUrl: '/math-calculator-background-image10.webp',
    dataAiHint: 'trigonometry waves',
  },
  {
    title: 'Simplify Algebra',
    description: 'Solve linear equations and algebraic expressions with our intuitive calculator.',
    link: '/algebra',
    buttonText: 'Solve Algebra',
    imageUrl: '/math-calculator-background-image11.webp',
    dataAiHint: 'algebra equations',
  },
  {
    title: 'Conquer Calculus',
    description: 'Find derivatives, integrals, and limits for complex functions in seconds.',
    link: '/calculus',
    buttonText: 'Try Calculus Tools',
    imageUrl: '/math-calculator-background-image12.webp',
    dataAiHint: 'calculus graph',
  },
];

const Slideshow = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % carouselSlides.length);
    }, 5000); // Change image every 5 seconds
    return () => clearTimeout(timer);
  }, [slideIndex]);

  const currentSlide = carouselSlides[slideIndex];

  return (
    <div className="slideshow-container">
      {carouselSlides.map((slide, index) => (
        <div
          key={index}
          className="mySlides fade"
          style={{ display: index === slideIndex ? 'block' : 'none' }}
        >
          {/* Using standard img tag for simplicity and reliability */}
          <img
            src={slide.imageUrl}
            alt={slide.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            data-ai-hint={slide.dataAiHint}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-black/50" />
      <div className="container relative z-10 flex h-full flex-col items-center justify-center space-y-4 text-center text-primary-foreground">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
          {currentSlide.title}
        </h1>
        <p className="mx-auto max-w-[700px] text-primary-foreground/80 md:text-xl">
          {currentSlide.description}
        </p>
        <Button asChild variant="secondary" size="lg">
          <Link href={currentSlide.link}>{currentSlide.buttonText}</Link>
        </Button>
      </div>

      <div style={{ textAlign: 'center', position: 'absolute', bottom: '20px', width: '100%', zIndex: 20 }}>
        {carouselSlides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === slideIndex ? 'active' : ''}`}
            onClick={() => setSlideIndex(index)}
            onKeyDown={(e) => e.key === 'Enter' && setSlideIndex(index)}
            role="button"
            tabIndex={0}
            aria-label={`Go to slide ${index + 1}`}
          ></span>
        ))}
      </div>
    </div>
  );
};


export default function Home() {
  return (
    <>
      <section className="w-full">
        <Slideshow />
      </section>

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
