
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppLayout } from '@/components/app-layout';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { cn } from '@/lib/utils';
import { FirebaseClientProvider } from '@/firebase';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  metadataBase: new URL('https://maths.calculation.site'),
  title: {
    default: 'Math Calculators - Free Online Tools for Math, Geometry, Statistics',
    template: '%s – Math Calculators',
  },
  description: 'A comprehensive web application featuring a wide range of free online calculators for mathematics, from basic arithmetic and algebra to advanced calculus, statistics, and matrix operations.',
  openGraph: {
    title: 'Math Calculators - Free Online Tools for Math, Geometry, Statistics',
    description: 'A comprehensive web application featuring a wide range of free online calculators for mathematics, from basic arithmetic and algebra to advanced calculus, statistics, and matrix operations.',
    images: ['/math%20calculator%20background%20image%201.webp'],
    url: 'https://maths.calculation.site',
    siteName: 'Math Calculators',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Math Calculators - Free Online Tools for Math, Geometry, Statistics',
    description: 'A comprehensive web application featuring a wide range of free online calculators for mathematics, from basic arithmetic and algebra to advanced calculus, statistics, and matrix operations.',
    images: ['/math%20calculator%20background%20image%201.webp'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning style={{scrollBehavior:'smooth'}}>
      <head>
        {/* Google AdSense Auto Ads */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3042243846300811" crossOrigin="anonymous"></script>
        <meta name="google-adsense-account" content="ca-pub-3042243846300811" />
        <link rel="icon" href="favicon.ico" sizes="any" />
      </head>
      <body className={cn(inter.variable, "font-body antialiased")} suppressHydrationWarning>
        <FirebaseClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AppLayout>{children}</AppLayout>
            <Toaster />
          </ThemeProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
