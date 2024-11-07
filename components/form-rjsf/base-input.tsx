/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Input } from '@/components/ui/input';
import { NumberInput } from '@/components/ui/number-input';
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
