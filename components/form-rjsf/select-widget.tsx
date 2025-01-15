/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Checkbox } from '@/components/ui/checkbox';
import Combobox from '@/components/ui/combobox';
import { Label } from '@/components/ui/label';
import { MultiSelect } from '@/components/ui/multi-select';
import { WidgetProps } from '@rjsf/utils';

export const CustomSelectWidget = (props: WidgetProps) => {
  const {
    label,
    placeholder,
    rawErrors,
    hideError,
    readonly,
    disabled,
    options,
    schema,
    value,
    onChange,
    multiple,
    ...rest
  } = props;
  // const hasError = rawErrors && rawErrors.length > 0 && !hideError;

  if (schema.renderAs === 'checkboxes') {
    return options.enumOptions?.map((opt) => (
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
        <Label className="text-xs font-normal">{opt.label}</Label>
      </div>
    ));
  }

  if (multiple) {
    return (
      <MultiSelect
        options={options.enumOptions?.map((opt) => ({
          ...opt,
        }))}
        placeholder={placeholder}
        searchPlaceholder="Search..."
        emptyState="No results"
        value={value}
        onValueChange={onChange}
        className="w-full"
      />
    );
  }

  return (
    <Combobox
      {...rest}
      disabled={disabled}
      options={options.enumOptions?.map((opt) => ({
        ...opt,
        filterValue: opt.label,
      }))}
      placeholder={placeholder}
      searchPlaceholder="Search..."
      emptyState="No results"
      value={value}
      onValueChange={(v) => onChange(v.value)}
      className="w-full"
    />
  );
};
