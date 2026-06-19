import { cn } from "@janprashna/ui";

type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'primary';

const variantClasses: Record<BadgeVariant, string> = {
  success: 'bg-green-50 text-green-700 border-green-200',
  warning: 'bg-amber-50 text-amber-700 border-amber-200',
  error: 'bg-red-50 text-red-700 border-red-200',
  info: 'bg-blue-50 text-blue-700 border-blue-200',
  neutral: 'bg-paper text-muted-foreground border-border',
  primary: 'bg-primary/10 text-primary border-primary/20',
};

interface StatusBadgeProps {
  label: string;
  variant: BadgeVariant;
  className?: string;
}

export function StatusBadge({ label, variant, className }: StatusBadgeProps) {
  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium font-ui border', variantClasses[variant], className)}>
      {label}
    </span>
  );
}

export function aiStatusBadge(status: string) {
  const map: Record<string, { label: string; variant: BadgeVariant }> = {
    completed: { label: 'Processed', variant: 'success' },
    processing: { label: 'Processing', variant: 'warning' },
    unprocessed: { label: 'Pending AI', variant: 'neutral' },
    failed: { label: 'Failed', variant: 'error' },
  };
  return map[status] ?? { label: status, variant: 'neutral' };
}

export function trendBadge(trend: string) {
  const map: Record<string, { label: string; variant: BadgeVariant }> = {
    rising: { label: '↑ Rising', variant: 'error' },
    stable: { label: '→ Stable', variant: 'info' },
    declining: { label: '↓ Declining', variant: 'success' },
  };
  return map[trend] ?? { label: trend, variant: 'neutral' };
}

export function userRoleBadge(role: string) {
  const map: Record<string, { label: string; variant: BadgeVariant }> = {
    super_admin: { label: 'Super Admin', variant: 'primary' },
    department_admin: { label: 'Dept Admin', variant: 'info' },
    viewer: { label: 'Viewer', variant: 'neutral' },
    auditor: { label: 'Auditor', variant: 'warning' },
  };
  return map[role] ?? { label: role, variant: 'neutral' };
}
