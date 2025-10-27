
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { calculatorCategories } from '@/lib/calculator-categories';

// A more robust category finder
const findCategoryForPath = (pathname: string) => {
    // Exact match for category hub pages
    const hubMatch = calculatorCategories.find(cat => cat.tools.some(tool => tool.href === pathname));
    if (hubMatch) return hubMatch;

    // Match for child pages (e.g., /geometry/area should match Geometry category)
    for (const category of calculatorCategories) {
        if (pathname.startsWith(`/${category.slug}/`)) {
            return category;
        }
        for (const tool of category.tools) {
            if (pathname.startsWith(tool.href) && tool.href !== '/') {
                 return category;
            }
        }
    }
    return null;
}

export function RelatedCalculatorsSidebar() {
    const pathname = usePathname();
    const currentCategory = findCategoryForPath(pathname);

    if (!currentCategory) {
        return null;
    }

    return (
        <aside className="w-full lg:w-64 xl:w-72 flex-shrink-0" aria-labelledby="related-calculators-heading">
            <Card>
                <CardHeader className="p-4">
                    <CardTitle id="related-calculators-heading" className="text-lg">
                        {currentCategory.title}
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                    <nav>
                        <ul className="space-y-1">
                            {currentCategory.tools.map((tool) => (
                                <li key={tool.href}>
                                    <Button
                                        asChild
                                        variant={pathname === tool.href ? 'secondary' : 'ghost'}
                                        className="w-full justify-start text-left h-auto py-2"
                                        aria-current={pathname === tool.href ? 'page' : undefined}
                                    >
                                        <Link href={tool.href}>
                                            <tool.icon className="mr-3 h-4 w-4 flex-shrink-0" />
                                            <span className="flex-1 text-wrap">{tool.label}</span>
                                        </Link>
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </CardContent>
            </Card>
        </aside>
    );
}
