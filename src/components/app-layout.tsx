
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Calculator,
  Square,
  Sigma,
  Menu,
  MoreVertical,
  BarChartHorizontal,
  Table,
  FlaskConical,
  Info,
  Mail,
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme-toggle';
import { AppFooter } from './app-footer';

const navItems = [
  { href: '/scientific', label: 'Scientific', icon: FlaskConical },
  { href: '/basic', label: 'Basic', icon: Calculator },
  { href: '/matrix', label: 'Matrix', icon: Table },
  { href: '/geometry', label: 'Geometry', icon: Square },
  { href: '/statistics', label: 'Statistics', icon: BarChartHorizontal },
  { href: '/about', label: 'About', icon: Info },
  { href: '/contact', label: 'Contact', icon: Mail },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-50">
        <div className="flex items-center">
            <Sheet>
            <SheetTrigger asChild>
                <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
                aria-label="Toggle navigation menu"
                >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <nav className="grid gap-6 text-lg font-medium">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-lg font-semibold"
                >
                    <Sigma className="h-6 w-6" />
                    <span className="">MathMaster</span>
                </Link>
                {navItems.map((item) => (
                    <Link
                    key={item.href}
                    href={item.href}
                    className={cn("hover:text-foreground", pathname.startsWith(item.href) ? "text-foreground" : "text-muted-foreground")}

                    >
                    {item.label}
                    </Link>
                ))}
                </nav>
            </SheetContent>
            </Sheet>
            <Link
                href="/"
                className="flex items-center gap-2 text-lg font-semibold md:text-base ml-4 md:ml-0"
            >
                <Sigma className="h-6 w-6" />
                <span className="hidden sm:inline-block">MathMaster</span>
            </Link>
        </div>
        <NavigationMenu className="hidden md:flex mx-auto">
            <NavigationMenuList>
                 {navItems.map((item) => (
                    <NavigationMenuItem key={item.href}>
                         <Link href={item.href}>
                          <NavigationMenuLink
                            className={cn(
                              navigationMenuTriggerStyle(),
                              pathname.startsWith(item.href)
                                ? "bg-accent"
                                : ""
                            )}
                          >
                            {item.label}
                          </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center justify-end gap-2 ml-auto">
          <ThemeToggle />
        </div>
      </header>
      <div className="flex flex-1 flex-col">{children}</div>
      <AppFooter />
    </div>
  );
}
