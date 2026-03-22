import * as React from 'react';

import { cn } from '@/lib/cn';

type Variant = 'default' | 'secondary' | 'outline' | 'ghost';
type Size = 'sm' | 'default' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variantClasses: Record<Variant, string> = {
  default:
    'bg-primary text-primary-foreground shadow-[0_12px_36px_rgba(205,83,52,0.24)] hover:bg-primary/90',
  secondary: 'border border-primary/20 bg-primary/8 text-foreground hover:bg-primary/12',
  outline: 'border border-primary/20 bg-white/80 text-foreground hover:bg-primary/8',
  ghost: 'bg-transparent text-foreground hover:bg-primary/8',
};

const sizeClasses: Record<Size, string> = {
  sm: 'h-9 px-3 text-sm',
  default: 'h-10 px-4',
  lg: 'h-11 px-5 text-sm',
};

export function Button({
  className,
  variant = 'default',
  size = 'default',
  type = 'button',
  ...props
}: ButtonProps): React.JSX.Element {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  );
}
