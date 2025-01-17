/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { WidgetProps } from '@rjsf/utils';

export const CustomRadioWidget = (props: WidgetProps) => {
  const { label, rawErrors, hideError, readonly, defaultValue, disabled, options, schema, value, onChange, ...rest } =
    props;

  return (
    <RadioGroup
      defaultValue={schema.default}
      value={value}
      onValueChange={onChange}
      className={cn(options.inline && 'flex')}
    >
      {options.enumOptions?.map((opt) => (
        <div key={opt.value} className="flex items-center space-x-2">
          <RadioGroupItem value={opt.value} id={opt.value} />
          <Label className="text-xs font-normal" htmlFor={opt.value}>
            {opt.label}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};
