
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export function AppFooter() {
    const [year, setYear] = useState<number | null>(null);

    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    return (
        <footer className="border-t bg-background">
            <div className="container mx-auto py-8 px-4 md:px-6">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                    <div className="space-y-4 col-span-2 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 text-lg font-semibold" aria-label="Go to homepage">
                            <Image src="/logo.webp" alt="Math Calculators Logo" width={56} height={56} />
                            <span>Math Calculators</span>
                        </Link>
                        <p className="text-sm text-muted-foreground">
                            Providing free, powerful, and easy-to-use online calculators for everyone.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Calculators</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/scientific" className="text-muted-foreground hover:text-primary">Scientific</Link></li>
                            <li><Link href="/geometry" className="text-muted-foreground hover:text-primary">Geometry</Link></li>
                            <li><Link href="/statistics" className="text-muted-foreground hover:text-primary">Statistics</Link></li>
                             <li><Link href="/matrix" className="text-muted-foreground hover:text-primary">Matrix</Link></li>
                        </ul>
                    </div>
                     <div>
                        <h3 className="font-semibold mb-4">Our Network</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="https://health.calculator.site" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">Health & Fitness Calculator</a></li>
                            <li><a href="https://finance.calculator.site" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">Financial Calculators</a></li>
                            <li><a href="https://calculation.site" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">Blog</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Company</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/about" className="text-muted-foreground hover:text-primary">About Us</Link></li>
                            <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/privacy-policy" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
                            <li><Link href="/terms-of-service" className="text-muted-foreground hover:text-primary">Terms of Service</Link></li>
                            <li><Link href="/disclaimer" className="text-muted-foreground hover:text-primary">Disclaimer</Link></li>
                            <li><Link href="/site-directory" className="text-muted-foreground hover:text-primary">Sitemap</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="border-t py-4">
                <div className="container mx-auto text-center text-xs text-muted-foreground">
                    © {year || new Date().getFullYear()}{' '}
                    <a
                        href="https://calculation.site"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                    >
                        calculation.site
                    </a>
                    . All rights reserved.
                </div>
            </div>
        </footer>
    );
}
