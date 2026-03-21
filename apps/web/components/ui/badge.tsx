import * as React from 'react';

import { cn } from '@/lib/cn';

type BadgeVariant = 'default' | 'secondary' | 'success' | 'warning' | 'danger' | 'outline';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'border border-primary/20 bg-primary/10 text-primary',
  secondary: 'border border-primary/20 bg-white/5 text-foreground',
  success: 'border border-primary/30 bg-primary/12 text-foreground',
  warning: 'border border-primary/35 bg-primary/16 text-foreground',
  danger: 'border border-primary/40 bg-primary/20 text-foreground',
  outline: 'border border-primary/20 bg-transparent text-foreground',
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
