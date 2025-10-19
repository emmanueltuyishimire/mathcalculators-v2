
"use client";

import Link from 'next/link';
import { Sigma } from 'lucide-react';

export function AppFooter() {
    return (
        <footer className="border-t bg-background">
            <div className="container mx-auto py-8 px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
                            <Sigma className="h-6 w-6" />
                            <span>Math Calculators</span>
                        </Link>
                        <p className="text-sm text-muted-foreground">
                            Providing free, powerful, and easy-to-use online calculators for everyone.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Calculators</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/scientific" className="text-muted-foreground hover:text-primary">Scientific</Link></li>
                            <li><Link href="/geometry" className="text-muted-foreground hover:text-primary">Geometry</Link></li>
                            <li><Link href="/statistics" className="text-muted-foreground hover:text-primary">Statistics</Link></li>
                             <li><Link href="/matrix" className="text-muted-foreground hover:text-primary">Matrix</Link></li>
                        </ul>
                    </div>
                     <div>
                        <h4 className="font-semibold mb-4">Company</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/about" className="text-muted-foreground hover:text-primary">About Us</Link></li>
                            <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/privacy-policy" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
                            <li><Link href="/terms-of-service" className="text-muted-foreground hover:text-primary">Terms of Service</Link></li>
                            <li><Link href="/disclaimer" className="text-muted-foreground hover:text-primary">Disclaimer</Link></li>
                            <li><Link href="/sitemap.xml" className="text-muted-foreground hover:text-primary">Sitemap</Link></li>
                        </ul>
                    </div>
                </div>
                 <div className="mt-8 border-t pt-4 text-center text-xs text-muted-foreground">
                    © {new Date().getFullYear()} Math Calculators. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
