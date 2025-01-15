/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { DatePicker } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';
import { NumberInput } from '@/components/ui/number-input';
import { TimeInput } from '@/components/ui/time-input';
import { onlyDigitsInput } from '@/lib/utils';
import { parseDate, parseTime } from '@internationalized/date';
import { BaseInputTemplateProps, getInputProps } from '@rjsf/utils';

export function BaseInputTemplate(props: BaseInputTemplateProps) {
  const {
    schema,
    id,
    options,
    // label,
    value,
    defaultValue,
    type,
    // required,
    // disabled,
    onChange,
    onChangeOverride,
    onBlur,
    onFocus,
    // registry,
    // DOM error if we don't destruct them
    rawErrors,
    hideError,
    autofocus,
    hideLabel,
    uiSchema,
    readonly,
    formContext,
    ...rest
  } = props;

  console.log('cro', props);

  const onTextChange = ({ target: { value: val } }: React.ChangeEvent<HTMLInputElement>) => {
    // Use the options.emptyValue if it is specified and newVal is also an empty string
    onChange(val === '' ? options.emptyValue || '' : val);
  };
  const onTextBlur = ({ target: { value: val } }: React.FocusEvent<HTMLInputElement>) => onBlur(id, val);
  const onTextFocus = ({ target: { value: val } }: React.FocusEvent<HTMLInputElement>) => onFocus(id, val);

  const inputProps = { ...rest, ...getInputProps(schema, type) };

  if (schema.type === 'number') {
    return (
      <NumberInput
        {...inputProps}
        id={id}
        value={value || schema?.default || ''}
        placeholder={schema?.placeholder || 0}
        step={schema.step || 1}
        minValue={inputProps.min}
        maxValue={inputProps.max}
        onChange={onChange}
      />
    );
  }

  if (schema.style === 'numeric') {
    return (
      <Input
        {...inputProps}
        id={id}
        value={value || schema?.default || ''}
        placeholder={schema?.placeholder || ''}
        onChange={(e) => {
          const transformedValue = onlyDigitsInput(e.target.value, true);
          onChange(transformedValue);
        }}
        onBlur={onTextBlur}
        onFocus={onTextFocus}
      />
    );
  }

  if (type === 'date') {
    return (
      <DatePicker
        {...inputProps}
        id={id}
        value={value ? parseDate(value) : undefined}
        placeholder={schema?.placeholder || ''}
        onChange={(date) => {
          // Convert DateValue to ISO string format
          onChange(date ? date.toString() : undefined);
        }}
      />
    );
  }

  if (type === 'time') {
    return (
      <TimeInput
        {...inputProps}
        id={id}
        hourCycle={24}
        granularity="minute"
        // Convert string value to Time object if exists
        value={value ? parseTime(value) : undefined}
        placeholder={schema?.placeholder || ''}
        onChange={(time) => {
          onChange(time ? `${time.toString().split(':').slice(0, 2).join(':')}` : undefined);
        }}
      />
    );
  }

  return (
    <Input
      {...inputProps}
      id={id}
      value={value || schema?.default || ''}
      placeholder={schema?.placeholder || ''}
      onChange={onChangeOverride || onTextChange}
      onBlur={onTextBlur}
      onFocus={onTextFocus}
    />
  );
}
