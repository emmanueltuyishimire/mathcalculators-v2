
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
  Heart,
  Landmark,
  BookOpen,
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

const navItems = [
  { href: '/scientific', label: 'Scientific', icon: FlaskConical },
  { href: '/basic', label: 'Basic', icon: Calculator },
  { href: '/matrix', label: 'Matrix', icon: Table },
  { href: '/geometry', label: 'Geometry', icon: Square },
  { href: '/statistics', label: 'Statistics', icon: BarChartHorizontal },
];

const externalLinks = [
    { href: "https://math.calculation.site", label: "Math Calculators", description: "A wide range of calculators for all your mathematical needs.", icon: Sigma },
    { href: "https://health.calculation.site", label: "Health & Fitness", description: "Calculators for BMI, BMR, TDEE, and other health metrics.", icon: Heart },
    { href: "https://finance.calculation.site", label: "Financial Calculators", description: "Tools for loans, investments, mortgages, and more.", icon: Landmark },
    { href: "https://unit-convertor.calculation.site", label: "Unit Converter", description: "A comprehensive tool for converting between various units.", icon: MoreVertical },
    { href: "https://calculation.site", label: "Blog", description: "Read articles and guides about calculations and our tools.", icon: BookOpen },
]

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
                 <NavigationMenu orientation="vertical" className="w-full">
                    <NavigationMenuList className="flex-col items-start space-x-0 space-y-1 w-full">
                        <NavigationMenuItem className="w-full">
                        <NavigationMenuTrigger className="w-full justify-start">More</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[250px] gap-3 p-4">
                                {externalLinks.map((link) => (
                                    <ListItem
                                        key={link.label}
                                        title={link.label}
                                        href={link.href}
                                        target="_blank"
                                    >
                                        {link.description}
                                    </ListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
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
                        <Link href={item.href} legacyBehavior passHref>
                            <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), pathname.startsWith(item.href) ? "text-foreground bg-accent/50" : "text-muted-foreground")}>
                            {item.label}
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                ))}
                <NavigationMenuItem>
                    <NavigationMenuTrigger>More</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                             {externalLinks.map((link) => (
                                <ListItem
                                    key={link.label}
                                    title={link.label}
                                    href={link.href}
                                    target="_blank"
                                >
                                    {link.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center justify-end gap-2 ml-auto">
          <ThemeToggle />
        </div>
      </header>
      <div className="flex flex-1 flex-col">{children}</div>
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
