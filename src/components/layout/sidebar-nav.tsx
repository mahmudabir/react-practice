'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Hospital, LayoutDashboard } from 'lucide-react';

import { cn } from '@/lib/utils';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

const links = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/hospitals', label: 'Hospitals', icon: Hospital },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {links.map((link) => {
        const isActive =
          link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
        return (
          <SidebarMenuItem key={link.href}>
            <SidebarMenuButton
              asChild
              isActive={isActive}
              className={cn(
                'group-data-[collapsible=icon]:justify-center',
                isActive &&
                  'bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90'
              )}
              tooltip={{
                children: link.label,
                className:
                  'bg-sidebar-primary text-sidebar-primary-foreground',
              }}
            >
              <Link href={link.href}>
                <link.icon className="size-4" />
                <span className="group-data-[collapsible=icon]:hidden">
                  {link.label}
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
