
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Calculator,
  Square,
  Menu,
  BarChartHorizontal,
  Table,
  Home,
  Replace,
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme-toggle';
import { AppFooter } from './app-footer';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/algebra', label: 'Algebra Calculators', icon: Calculator },
  { href: '/matrix', label: 'Matrix Calculators', icon: Table },
  { href: '/geometry', label: 'Geometry Calculators', icon: Square },
  { href: '/statistics', label: 'Statistics Calculators', icon: BarChartHorizontal },
  { href: '/unit-converter', label: 'Unit Converter', icon: Replace },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-50">
        {/* Mobile Menu */}
        <nav className="flex md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0"
                aria-label="Toggle navigation menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-4">
              <nav className="grid gap-2 text-base font-medium">
                <Link
                  href="/"
                  className="flex items-center gap-4 px-2.5 py-2 text-lg font-semibold"
                  onClick={() => setOpen(false)}
                  aria-label="Math Calculators Home"
                >
                  <Image src="/logo.webp" alt="Math Calculators Logo" width={56} height={56} priority />
                  <span className="sr-only">Math Calculators</span>
                </Link>
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-4 px-2.5 py-2 rounded-lg hover:text-foreground",
                      pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href)) ? "bg-muted text-foreground" : "text-muted-foreground"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </nav>
        
        {/* Desktop Header Content */}
        <div className="flex w-full items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold"
              aria-label="Math Calculators Home"
            >
              <Image src="/logo.webp" alt="Math Calculators Logo" width={56} height={56} priority />
              <span className="hidden sm:inline-block">Math Calculators</span>
            </Link>

          {/* Desktop Navigation */}
          <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <NavigationMenu>
              <NavigationMenuList>
                  {navItems.map((item) => (
                  <NavigationMenuItem key={item.href}>
                      <Link href={item.href} legacyBehavior passHref>
                        <NavigationMenuLink
                            className={navigationMenuTriggerStyle()}
                            active={pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))}>
                            {item.label}
                        </NavigationMenuLink>
                      </Link>
                  </NavigationMenuItem>
                  ))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <AppFooter />
    </div>
  );
}
