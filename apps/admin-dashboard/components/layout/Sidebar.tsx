"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@janprashna/ui';

const navItems = [
  { href: '/', label: 'Overview', exact: true },
  { href: '/questions', label: 'Questions' },
  { href: '/clusters', label: 'AI Clusters' },
  { href: '/reports', label: 'Reports' },
  { href: '/email/recipients', label: 'Email Scheduler' },
  { href: '/users', label: 'Users' },
  { href: '/audit', label: 'Audit Logs' },
  { href: '/settings', label: 'Settings' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-paper border-r border-border/50 h-screen sticky top-0 flex-col hidden md:flex shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-border/50">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center">
            <span className="text-primary-foreground font-bold font-display text-lg">J</span>
          </div>
          <span className="font-display font-bold text-xl">Admin</span>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navItems.map(({ href, label, exact }) => {
          const isActive = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'block px-3 py-2 rounded-md font-ui font-medium text-sm transition-colors',
                isActive
                  ? 'bg-primary/10 text-primary border-l-2 border-primary pl-[10px]'
                  : 'text-muted-foreground hover:bg-background hover:text-foreground'
              )}
            >
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border/50">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-background flex items-center justify-center font-display font-bold border border-border">
            DA
          </div>
          <div className="text-sm min-w-0">
            <p className="font-medium font-ui truncate">Dept Admin</p>
            <p className="text-muted-foreground text-xs truncate">admin@wb.gov.in</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
