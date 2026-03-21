import * as React from 'react';

import { cn } from '@/lib/cn';

type BadgeVariant = 'default' | 'secondary' | 'success' | 'warning' | 'danger' | 'outline';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'border border-primary/20 bg-primary/10 text-primary',
  secondary: 'border border-white/10 bg-white/10 text-slate-100',
  success: 'border border-emerald-400/25 bg-emerald-400/10 text-emerald-200',
  warning: 'border border-amber-400/25 bg-amber-400/10 text-amber-200',
  danger: 'border border-rose-400/25 bg-rose-400/10 text-rose-200',
  outline: 'border border-white/10 bg-transparent text-slate-100',
};

export function Badge({
  className,
  variant = 'secondary',
  ...props
}: BadgeProps): React.JSX.Element {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium tracking-wide',
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}
