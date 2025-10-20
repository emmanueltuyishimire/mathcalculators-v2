
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Target, Zap } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about Math Calculators, our mission, and our commitment to providing free, high-quality mathematical calculators for everyone.',
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About Math Calculators",
  "description": "Learn about the mission and vision of Math Calculators, a free online resource for mathematical calculators.",
  "url": "https://maths.calculation.site/about",
  "publisher": {
    "@type": "Organization",
    "name": "Math Calculators",
    "url": "https://maths.calculation.site"
  }
};

export default function AboutPage() {
  return (
    <>
       <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <div className="flex flex-1 flex-col">
        <PageHeader title="About Math Calculators" />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-4xl space-y-12">
            <section className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                    Welcome to Math Calculators
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Your trusted source for free, powerful, and easy-to-use online calculators.
                </p>
            </section>

            <Card>
                <CardHeader>
                    <CardTitle>
                        <div className="flex items-center gap-2">
                            <Target className="h-6 w-6 text-primary" />
                            <span>Our Mission</span>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                    <p>
                        At Math Calculators, our mission is to make mathematics accessible and understandable for everyone. We believe that powerful tools for calculation and learning should be free and available to all, whether you are a student tackling homework, a professional in need of a quick calculation, or simply a curious mind exploring the world of numbers.
                    </p>
                    <p>
                        We strive to create calculators that are not only accurate and reliable but also intuitive and educational. Each tool is designed to provide clear explanations, formulas, and step-by-step solutions to help you understand the concepts behind the calculations.
                    </p>
                </CardContent>
            </Card>

            <div className="my-6 h-24 bg-muted/50 flex items-center justify-center text-muted-foreground text-sm">[Ad Placeholder]</div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <Card>
                    <CardHeader>
                        <CardTitle>
                             <div className="flex items-center gap-2">
                                <Users className="h-6 w-6 text-primary" />
                                <span>Who We Are For</span>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                       <p>Math Calculators is built for a diverse audience:</p>
                        <ul className="list-disc list-inside space-y-2">
                            <li><b>Students:</b> To assist with homework, exam preparation, and understanding complex mathematical concepts.</li>
                            <li><b>Teachers:</b> As a resource for classroom examples, demonstrations, and helping students visualize problems.</li>
                            <li><b>Professionals:</b> For engineers, scientists, financial analysts, and others who need quick and accurate calculations in their daily work.</li>
                            <li><b>Curious Individuals:</b> For anyone who loves to learn and explore the logical beauty of mathematics.</li>
                        </ul>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>
                            <div className="flex items-center gap-2">
                                <Zap className="h-6 w-6 text-primary" />
                                <span>Our Commitment</span>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                        <p>We are committed to maintaining a high standard of quality and accuracy across all our calculators. Our goals include:</p>
                        <ul className="list-disc list-inside space-y-2">
                            <li><b>Accuracy:</b> Ensuring all our calculators are rigorously tested and based on established mathematical formulas.</li>
                            <li><b>Usability:</b> Creating a clean, simple, and mobile-friendly user experience.</li>
                            <li><b>Education:</b> Providing valuable content, including formulas, examples, and FAQs, to support learning.</li>
                            <li><b>Accessibility:</b> Keeping our tools free and accessible to users worldwide.</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Get in Touch</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        We are always looking to improve and expand our offerings. If you have any feedback, suggestions for new calculators, or questions, please do not hesitate to <a href="/contact" className="text-primary hover:underline">contact us</a>. Your input is invaluable as we continue to build Math Calculators into the best possible resource for the community.
                    </p>
                </CardContent>
            </Card>

          </div>
        </main>
      </div>
    </>
  );
}
