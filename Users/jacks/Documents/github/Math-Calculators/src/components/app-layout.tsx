
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
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();

  // Render a consistent header on the server and during initial client render
  // before the isMobile hook has determined the screen size.
  if (isMobile === null) {
    return (
      <div className="flex min-h-screen w-full flex-col">
         <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-50">
           <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold"
              aria-label="Math Calculators Home"
            >
              <Image src="/logo.webp" alt="Math Calculators Logo" width={56} height={56} priority />
              <span>Math Calculators</span>
            </Link>
            <div className="flex w-full items-center justify-end gap-4">
              <ThemeToggle />
            </div>
         </header>
         <div className="flex flex-1 flex-col">{children}</div>
         <AppFooter />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-50">
        <div className="flex items-center gap-2">
          {isMobile && (
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
              <SheetContent side="left">
                <nav className="grid gap-6 text-lg font-medium">
                  <Link
                    href="/"
                    className="flex items-center gap-2 text-lg font-semibold"
                    onClick={() => setOpen(false)}
                    aria-label="Math Calculators Home"
                  >
                    <Image src="/logo.webp" alt="Math Calculators Logo" width={56} height={56} priority />
                     <span>Math Calculators</span>
                  </Link>
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "hover:text-foreground",
                        pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href)) || (item.href === '/algebra' && pathname === '/basic') ? "text-foreground" : "text-muted-foreground"
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          )}
           <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold"
            aria-label="Math Calculators Home"
          >
            <Image src="/logo.webp" alt="Math Calculators Logo" width={56} height={56} priority />
            <span>Math Calculators</span>
          </Link>
        </div>
        
        <div className="flex w-full items-center justify-end gap-4">
             {!isMobile && (
              <NavigationMenu>
                  <NavigationMenuList>
                      {navItems.map((item) => (
                      <NavigationMenuItem key={item.href}>
                          <NavigationMenuLink asChild active={pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href)) || (item.href === '/algebra' && pathname === '/basic')}>
                              <Link href={item.href} className={navigationMenuTriggerStyle()}>
                                  {item.label}
                              </Link>
                          </NavigationMenuLink>
                      </NavigationMenuItem>
                      ))}
                  </NavigationMenuList>
              </NavigationMenu>
             )}
            <ThemeToggle />
        </div>
      </header>
      <div className="flex flex-1 flex-col">{children}</div>
      <AppFooter />
    </div>
  );
}
