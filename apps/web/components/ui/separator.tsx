import * as React from 'react';

import { cn } from '@/lib/cn';

export function Separator({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element {
  return <div className={cn('h-px w-full bg-white/10', className)} role="separator" {...props} />;
}
