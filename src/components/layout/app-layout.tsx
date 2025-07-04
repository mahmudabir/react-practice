'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { PanelLeft, Rocket } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { SidebarNav } from './sidebar-nav';

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link
              href="/"
              className="flex items-center gap-2 font-semibold"
            >
              <Rocket className="h-6 w-6 text-primary" />
              <span className="">ReactDash</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <SidebarNav />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0"
              >
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col p-0 w-full max-w-xs">
               <div className="flex h-14 items-center border-b px-4">
                 <Link href="/" className="flex items-center gap-2 font-semibold">
                   <Rocket className="h-6 w-6 text-primary" />
                   <span className="">ReactDash</span>
                 </Link>
               </div>
               <div className="overflow-auto">
                <SidebarNav />
               </div>
            </SheetContent>
          </Sheet>
        </header>
        <main className="flex flex-1 flex-col">
          {children}
        </main>
      </div>
    </div>
  );
}
