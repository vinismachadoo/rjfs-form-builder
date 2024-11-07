/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Checkbox } from '@/components/ui/checkbox';
import { WidgetProps } from '@rjsf/utils';

export const CustomCheckboxesWidget = (props: WidgetProps) => {
  const { label, rawErrors, hideError, readonly, disabled, options, schema, value, onChange, multiple, ...rest } =
    props;

  return options.enumOptions?.map((opt) => {
    return (
      <div key={opt.value} className="flex items-start gap-x-2">
        <Checkbox
          checked={value.includes(opt.value)}
          onCheckedChange={() => {
            if (value.includes(opt.value)) {
              onChange(value.filter((v: string) => v !== opt.value));
            } else {
              onChange([...value, opt.value]);
            }
          }}
        />
        <span className="text-xs">{opt.label}</span>
      </div>
    );
  });
};
