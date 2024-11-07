'use client';

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check, Minus } from 'lucide-react';

import { cn } from '@/lib/utils';

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ checked, className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer group transition-colors duration-150 h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      // checked and enabled
      'enabled:data-[state=checked]:bg-primary enabled:data-[state=checked]:ring-0 enabled:data-[state=checked]:ring-transparent enabled:data-[state=checked]:text-primary-foreground',
      // indeterminate
      'enabled:data-[state=indeterminate]:bg-primary enabled:data-[state=indeterminate]:ring-0 enabled:data-[state=indeterminate]:ring-transparent enabled:data-[state=indeterminate]:text-primary-foreground',
      className
    )}
    checked={checked}
    {...props}
  >
    <CheckboxPrimitive.Indicator className={cn('flex items-center justify-center text-current h-full')}>
      {checked === 'indeterminate' ? (
        <Minus className="h-4 w-4" />
      ) : (
        <Check className="h-4 w-4 [&_path]:[transition:stroke-dashoffset_0.2s_ease-in_0.2s] [&_path]:[stroke-dasharray:23] [&_path]:[stroke-dashoffset:23] group-data-[state=checked]:[&_path]:[stroke-dashoffset:46]" />
      )}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
