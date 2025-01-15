import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';

interface MultiSelectOption {
  value: string;
  label: React.ReactNode;
}

interface MultiSelectProps {
  className?: string;
  contentClassName?: string;
  contentAlign?: 'end' | 'center' | 'start' | undefined;
  value: string[];
  title?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyState?: React.ReactNode;
  onValueChange: (value: string[]) => void;
  options: MultiSelectOption[] | undefined;
  disabled?: boolean;
}

const MultiSelect = ({
  onValueChange,
  options,
  value,
  title,
  placeholder = 'Select an option',
  searchPlaceholder = 'Search...',
  emptyState = 'No results',
  className,
  contentClassName,
  contentAlign = 'center',
  disabled,
}: MultiSelectProps) => {
  const [open, setOpen] = React.useState(false);
  const selectedValues = new Set(
    options?.filter((option) => value.includes(option.value)).map((v) => v.value) as string[]
  );
  const selectedLabels = options?.filter((option) => value.includes(option.value)).map((v) => v.label);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            'w-[200px] justify-between h-auto font-normal',
            {
              'text-muted-foreground': selectedLabels?.length === 0,
            },
            className
          )}
          disabled={disabled}
        >
          {title}
          {selectedLabels && selectedLabels?.length > 0 && (
            <React.Fragment>
              {title && <Separator orientation="vertical" className="h-4" />}
              <div className="hidden space-x-1 lg:flex">
                {selectedLabels.length > 1 ? (
                  <Badge variant="secondary" className="rounded-sm px-1 font-normal whitespace-nowrap">
                    {selectedLabels.length} selected
                  </Badge>
                ) : (
                  selectedLabels
                )}
              </div>
            </React.Fragment>
          )}
          {selectedLabels?.length === 0 && placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn('w-[200px] p-0', contentClassName)} align={contentAlign}>
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandEmpty>{emptyState}</CommandEmpty>
          <CommandGroup className="max-h-[300px] overflow-y-auto">
            {options?.map((option) => {
              const isSelected = selectedValues.has(option.value);
              return (
                <CommandItem
                  key={option.value}
                  onSelect={() => {
                    if (value.includes(option.value)) {
                      onValueChange(value.filter((v) => v !== option.value));
                    } else {
                      onValueChange([...value, option.value]);
                    }
                  }}
                >
                  <div
                    className={cn(
                      'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                      isSelected ? 'bg-primary text-primary-foreground' : 'opacity-50 [&_svg]:invisible'
                    )}
                  >
                    <Check className={cn('size-4')} />
                  </div>
                  {option.label}
                </CommandItem>
              );
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export { MultiSelect };
