
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mail, MessageSquare, User, Send } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the MathMaster team. We welcome your feedback, suggestions, and inquiries.',
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact MathMaster",
  "description": "Contact page for MathMaster calculators. Reach out for support, feedback, or inquiries.",
  "url": "https://mathmaster-studio-5398649656-398ca.web.app/contact",
  "publisher": {
    "@type": "Organization",
    "name": "MathMaster",
    "url": "https://mathmaster-studio-5398649656-398ca.web.app"
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://mathmaster-studio-5398649656-398ca.web.app/contact"
  }
};

const ContactForm = () => {
    // Note: This is a visual-only form. A real implementation would require a backend or a service like Formspree.
    return (
        <Card>
            <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center"><User className="mr-2 h-4 w-4 text-muted-foreground" />Name</Label>
                    <Input id="name" placeholder="Your Name" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center"><Mail className="mr-2 h-4 w-4 text-muted-foreground" />Email Address</Label>
                    <Input id="email" type="email" placeholder="your.email@example.com" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="subject" className="flex items-center"><MessageSquare className="mr-2 h-4 w-4 text-muted-foreground" />Subject</Label>
                    <Input id="subject" placeholder="What is your message about?" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="message" className="flex items-center"><MessageSquare className="mr-2 h-4 w-4 text-muted-foreground" />Message</Label>
                    <Textarea id="message" placeholder="Write your message here..." rows={6} />
                </div>
                <Button className="w-full" onClick={() => alert('This is a demo form.')}>
                    <Send className="mr-2 h-4 w-4" /> Send Message
                </Button>
            </CardContent>
        </Card>
    );
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

              <ContactForm />
          </div>
        </main>
      </div>
    </>
  );
}
