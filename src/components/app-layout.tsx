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
} from 'lucide-react';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from '@/components/ui/sidebar';

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
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="border-b border-sidebar-border">
          <Link href="/" className="flex items-center gap-2.5">
            <SigmaSquare className="size-7 text-sidebar-foreground" />
            <h2 className="text-xl font-semibold tracking-tight text-sidebar-foreground">
              MathMaster
            </h2>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={item.tooltip}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
