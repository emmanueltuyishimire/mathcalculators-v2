
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppLayout } from '@/components/app-layout';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { cn } from '@/lib/utils';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://maths.calculation.site'),
  title: {
    default: 'Math Calculators | Free Online Tools for Math, Algebra, & Geometry',
    template: '%s | Math Calculators',
  },
  description: 'Explore a comprehensive suite of free online math calculators for algebra, geometry, statistics, and more. Get instant, accurate results for everything from basic arithmetic to advanced calculus and matrix operations.',
  openGraph: {
    title: 'Math Calculators | Free Online Tools for Math, Algebra, & Geometry',
    description: 'Explore a comprehensive suite of free online math calculators for algebra, geometry, statistics, and more. Get instant, accurate results for everything from basic arithmetic to advanced calculus and matrix operations.',
    images: [`/math%20calculator%20background%20image%201.webp`],
    url: 'https://maths.calculation.site',
    siteName: 'Math Calculators',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Math Calculators | Free Online Tools for Math, Algebra, & Geometry',
    description: 'Explore a comprehensive suite of free online math calculators for algebra, geometry, statistics, and more. Get instant, accurate results for everything from basic arithmetic to advanced calculus and matrix operations.',
    images: [`/math%20calculator%20background%20image%201.webp`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://ep1.adtrafficquality.google.com" crossOrigin="anonymous" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3042243846300811"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        ></script>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={cn(inter.variable, "font-sans antialiased")} suppressHydrationWarning>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AppLayout>{children}</AppLayout>
            <Toaster />
          </ThemeProvider>

        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-5VPXQ1TJ3X"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-5VPXQ1TJ3X');
          `}
        </Script>
      </body>
    </html>
  );
}
