import * as React from 'react';

import { cn } from '@/lib/cn';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function Textarea({ className, ...props }: TextareaProps): React.JSX.Element {
  return (
    <textarea
      className={cn(
        'min-h-[10rem] w-full rounded-2xl border border-primary/20 bg-white px-4 py-3 text-sm text-foreground shadow-sm outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/20 placeholder:text-[rgb(108,90,84)]',
        className,
      )}
      {...props}
    />
  );
}
