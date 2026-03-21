import * as React from 'react';

import { cn } from '@/lib/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className, ...props }: InputProps): React.JSX.Element {
  return (
    <input
      className={cn(
        'flex h-11 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-foreground shadow-sm outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/20 placeholder:text-slate-400',
        className,
      )}
      {...props}
    />
  );
}
