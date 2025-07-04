'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Hospital, LayoutDashboard } from 'lucide-react';

import { cn } from '@/lib/utils';

const links = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/hospitals', label: 'Hospitals', icon: Hospital },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {links.map((link) => {
        const isActive =
          link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
              isActive && 'bg-muted text-primary'
            )}
          >
            <link.icon className="h-4 w-4" />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
