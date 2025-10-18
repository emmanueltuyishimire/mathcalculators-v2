"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Calculator,
  Square,
  SigmaSquare,
  Menu,
  MoreVertical,
  BarChartHorizontal,
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme-toggle';

const navItems = [
  { href: '/', label: 'Simple', icon: Calculator, tooltip: 'Simple Calculators' },
  { href: '/geometry', label: 'Geometry', icon: Square, tooltip: 'Geometry Calculators' },
  { href: '/trigonometry', label: 'Trigonometry', icon: MoreVertical, tooltip: 'Trigonometry Calculator' },
  { href: '/statistics', label: 'Statistics', icon: BarChartHorizontal, tooltip: 'Statistics Calculator' },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isHome = pathname === '/';

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-50">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <SigmaSquare className="h-6 w-6" />
            <span className="">MathMaster</span>
          </Link>
          {navItems.map((item) => (
             <Link
              key={item.href}
              href={item.href}
              className={cn("transition-colors hover:text-foreground", (pathname === item.href || (item.href === "/" && isHome)) ? "text-foreground" : "text-muted-foreground")}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <SigmaSquare className="h-6 w-6" />
                <span className="">MathMaster</span>
              </Link>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn("hover:text-foreground", (pathname === item.href || (item.href === "/" && isHome)) ? "text-foreground" : "text-muted-foreground")}

                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <ThemeToggle />
        </div>
      </header>
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
}
