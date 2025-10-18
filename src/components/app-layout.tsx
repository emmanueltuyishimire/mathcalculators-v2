"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Calculator,
  FunctionSquare,
  InfinityIcon,
  BarChartHorizontal,
  Milestone,
  SigmaSquare,
  Menu,
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Basic', icon: Calculator, tooltip: 'Basic Arithmetic' },
  { href: '/algebra', label: 'Algebra', icon: FunctionSquare, tooltip: 'Algebra Solver' },
  { href: '/calculus', label: 'Calculus', icon: InfinityIcon, tooltip: 'Calculus Tools' },
  { href: '/statistics', label: 'Statistics', icon: BarChartHorizontal, tooltip: 'Statistics Calculator' },
  { href: '/converter', label: 'Converter', icon: Milestone, tooltip: 'Unit Converter' },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <SigmaSquare className="h-6 w-6" />
            <span className="">Math Calculators</span>
          </Link>
          {navItems.map((item) => (
             <Link
              key={item.href}
              href={item.href}
              className={cn("transition-colors hover:text-foreground", pathname === item.href ? "text-foreground" : "text-muted-foreground")}
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
                <span className="">Math Calculators</span>
              </Link>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn("hover:text-foreground", pathname === item.href ? "text-foreground" : "text-muted-foreground")}

                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
          {/* Future user-related items can go here */}
        </div>
      </header>
      <main className="flex flex-1 flex-col">{children}</main>
    </div>
  );
}
