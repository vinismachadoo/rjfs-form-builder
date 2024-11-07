/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { ChevronsUpDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';

interface ComboboxOption {
  label: React.ReactNode;
  value: string;
  filterValue: string;
  [key: string]: any;
}

interface ComboboxProps {
  value?: string | null;
  onValueChange(value: ComboboxOption): void;
  options: ComboboxOption[] | undefined;
  placeholder?: string;
  searchPlaceholder: string;
  emptyState?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  popoverContentClassName?: string;
  deselectable?: boolean;
  hasErrorInput?: boolean;
}

const Combobox = React.forwardRef<HTMLButtonElement, ComboboxProps>(
  (
    {
      options,
      value = '',
      onValueChange,
      placeholder = 'Placeholder',
      searchPlaceholder = 'Buscar opção',
      emptyState = 'Nenhum resultado',
      disabled,
      className,
      popoverContentClassName,
      hasErrorInput = false,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger disabled={disabled} asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              'h-9 w-[200px] justify-between hover:bg-background hover:border-ring/30',
              hasErrorInput && 'border-destructive ring ring-destructive/30',
              {
                'hover:text-muted-foreground': !value,
              },
              className
            )}
            disabled={disabled}
            ref={ref}
          >
            <span className={cn('shrink text-left font-normal', !value && 'text-muted-foreground')}>
              {value ? options?.find((option) => option.value === value)?.label : placeholder}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className={cn('p-0', popoverContentClassName)}>
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandEmpty>{emptyState}</CommandEmpty>
            <CommandGroup className="max-h-[300px] overflow-y-auto">
              {options?.map((option) => (
                <CommandItem
                  value={option.filterValue || ''}
                  key={option.value}
                  onSelect={() => {
                    // deselectable ?
                    // onValueChange(currentValue === value ? '' : currentValue);
                    onValueChange(option);
                    setOpen(false);
                  }}
                >
                  <Check className={cn('mr-2 h-4 w-4', value === option.value ? 'opacity-100' : 'opacity-0')} />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);
Combobox.displayName = 'Combobox';

export default Combobox;
