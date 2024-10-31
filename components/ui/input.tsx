'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { FieldError } from 'react-hook-form';

type AddonProps = {
  children: React.ReactNode;
  className?: string;
  error?: boolean;
  onClickAddon?: () => void;
};

const Addon = ({ children, className, error, onClickAddon }: AddonProps) => (
  <div
    onClick={onClickAddon && onClickAddon}
    className={cn(
      'addon-wrapper border-default [input:hover_+_&]:border-[theme(colors.red.500)] [input:hover_+_&]:border-l-default [&:has(+_input:hover)]:border-emphasis [&:has(+_input:hover)]:border-r-default h-full border px-0 overflow-hidden shrink-0 group-hover:border-ring/30 disabled:group-hover:border-border',
      onClickAddon && 'cursor-pointer disabled:hover:cursor-not-allowed',
      className
    )}
  >
    <div className={cn('flex flex-col justify-center items-center text-xs h-full', error && 'text-destructive')}>
      <span className="flex whitespace-nowrap h-full items-center">{children}</span>
    </div>
  </div>
);

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError;
  addOnLeading?: React.ReactNode;
  addOnLeadingClassname?: string;
  addOnSuffix?: React.ReactNode;
  addOnSuffixClassname?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      error,
      addOnLeading,
      addOnSuffix,
      addOnLeadingClassname,
      addOnSuffixClassname,
      ...props
    },
    ref
  ) => {
    return (
      <div className="group relative flex items-center rounded-sm h-8">
        {addOnLeading && (
          <Addon className={cn('rounded-l-sm h-full text-xs', addOnLeadingClassname)}>{addOnLeading}</Addon>
        )}
        <input
          type={type}
          className={cn(
            'flex h-full w-full rounded-sm border border-input bg-background px-3 py-2 text-xs ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 group-hover:border-ring/30 disabled:group-hover:border-border',
            error && 'focus-visible:ring-destructive',
            addOnLeading && 'rounded-l-none border-l-0',
            addOnSuffix && 'rounded-r-none border-r-0',
            className
          )}
          ref={ref}
          {...props}
        />
        {addOnSuffix && (
          <Addon className={cn('rounded-r-sm h-full text-xs', addOnSuffixClassname)}>{addOnSuffix}</Addon>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
