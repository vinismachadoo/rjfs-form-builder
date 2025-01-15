import React from 'react';

import { DateInput, DateSegment, TimeField, TimeFieldProps, TimeValue } from 'react-aria-components';

interface TimeInputProps<T extends TimeValue> extends TimeFieldProps<T> {
  placeholder?: T;
}

const TimeInput = React.forwardRef<HTMLInputElement, TimeInputProps<TimeValue>>(({ ...props }, ref) => {
  return (
    <TimeField {...props} ref={ref}>
      <DateInput className="relative inline-flex h-8 w-full items-center overflow-hidden whitespace-nowrap rounded-sm border border-input bg-background px-3 py-2 text-xs data-[focus-within]:border-ring data-[disabled]:opacity-50 data-[focus-within]:outline-none data-[focus-within]:ring-[3px] data-[focus-within]:ring-ring/20">
        {(segment) => (
          <DateSegment
            segment={segment}
            className="inline rounded p-0.5 text-foreground caret-transparent outline outline-0 data-[disabled]:cursor-not-allowed data-[focused]:bg-accent data-[invalid]:data-[focused]:bg-destructive data-[type=literal]:px-0 data-[focused]:data-[placeholder]:text-foreground data-[focused]:text-foreground data-[invalid]:data-[focused]:data-[placeholder]:text-destructive-foreground data-[invalid]:data-[focused]:text-destructive-foreground data-[invalid]:data-[placeholder]:text-destructive data-[invalid]:text-destructive data-[placeholder]:text-muted-foreground/70 data-[type=literal]:text-muted-foreground/70 data-[disabled]:opacity-50"
          />
        )}
      </DateInput>
    </TimeField>
  );
});
TimeInput.displayName = 'TimeInput';

export { TimeInput };
