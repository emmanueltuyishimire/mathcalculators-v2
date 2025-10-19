
"use client";

import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Mail, MessageSquare, User, Send, Star, Heart, Handshake } from 'lucide-react';
import type { Metadata } from 'next';

// This component cannot be a server component because it uses an onClick handler
// export const metadata: Metadata = {
//   title: 'Contact Us',
//   description: 'Get in touch with the Math Calculators team. We welcome your feedback, suggestions, and inquiries.',
// };

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Math Calculators",
  "description": "Contact page for Math Calculators. Reach out for support, feedback, or inquiries.",
  "url": "https://maths.calculation.site/contact",
  "publisher": {
    "@type": "Organization",
    "name": "Math Calculators",
    "url": "https://maths.calculation.site"
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://maths.calculation.site/contact"
  }
};

export default function ContactPage() {
  return (
    <>
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <div className="flex flex-1 flex-col">
        <PageHeader title="Contact Us" />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-2xl space-y-12">
              <section className="text-center">
                  <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                      Get in Touch
                  </h1>
                  <p className="mt-4 text-lg text-muted-foreground">
                      We'd love to hear from you! Whether you have a question, feedback, or a suggestion, please don't hesitate to reach out.
                  </p>
              </section>

              <section>
                 <h2 className="text-2xl font-bold text-center mb-6">What can we help you with?</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <Card>
                         <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Handshake className="h-6 w-6 text-primary" />
                                Sponsorship & Partnerships
                            </CardTitle>
                         </CardHeader>
                         <CardContent>
                            <p className="text-muted-foreground">Interested in collaborating or sponsoring our platform? We're open to partnerships that align with our mission of making math accessible.</p>
                         </CardContent>
                     </Card>
                     <Card>
                         <CardHeader>
                             <CardTitle className="flex items-center gap-2">
                                <Heart className="h-6 w-6 text-primary" />
                                Feedback & Suggestions
                             </CardTitle>
                         </CardHeader>
                         <CardContent>
                            <p className="text-muted-foreground">Have an idea for a new calculator or a suggestion to improve our existing tools? Your feedback is invaluable to us.</p>
                         </CardContent>
                     </Card>
                      <Card>
                         <CardHeader>
                             <CardTitle className="flex items-center gap-2">
                                <Star className="h-6 w-6 text-primary" />
                                Special Tools & Feature Requests
                             </CardTitle>
                         </CardHeader>
                         <CardContent>
                            <p className="text-muted-foreground">Looking for a specific calculator that you can't find? Let us know what you need, and we might build it for you.</p>
                         </CardContent>
                     </Card>
                      <Card>
                         <CardHeader>
                             <CardTitle className="flex items-center gap-2">
                                <MessageSquare className="h-6 w-6 text-primary" />
                                Support & General Inquiries
                             </CardTitle>
                         </CardHeader>
                         <CardContent>
                            <p className="text-muted-foreground">If you need help using our calculators, have a question, or want to report an issue, we're here to assist.</p>
                         </CardContent>
                     </Card>
                 </div>
              </section>


              <Card className="text-center">
                <CardHeader>
                  <CardTitle>Our Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">For all inquiries, please email us at:</p>
                  <a href="mailto:calculation250@gmail.com" className="text-lg font-semibold text-primary hover:underline flex items-center justify-center gap-2 mt-2">
                    <Mail className="h-5 w-5"/> calculation250@gmail.com
                  </a>
                </CardContent>
              </Card>
          </div>
        </main>
      </div>
    </>
  );
}
