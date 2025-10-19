
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
        <Link
          href="/"
          className="mr-4 flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Image src="/logo.png" alt="Math Calculators Logo" width={56} height={56} />
          <span className="sr-only">Math Calculators</span>
        </Link>
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
             {navItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                <Link href={item.href} passHref>
                  <NavigationMenuLink active={pathname.startsWith(item.href)} className={navigationMenuTriggerStyle()}>
                    {item.label}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
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
              >
                <Image src="/logo.png" alt="Math Calculators Logo" width={56} height={56} className="dark:bg-white dark:p-1 dark:rounded-sm" />
                <span>Math Calculators</span>
              </Link>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "hover:text-foreground",
                    pathname.startsWith(item.href) ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4 justify-end">
             <ThemeToggle />
        </div>
      </header>
      <div className="flex flex-1 flex-col">{children}</div>
      <AppFooter />
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
