/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getInputProps, WidgetProps } from '@rjsf/utils';
import { Eye, EyeOff } from 'lucide-react';
import React from 'react';

export const CustomPasswordWidget = (props: WidgetProps) => {
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

  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  const onTextChange = ({ target: { value: val } }: React.ChangeEvent<HTMLInputElement>) => {
    // Use the options.emptyValue if it is specified and newVal is also an empty string
    onChange(val === '' ? options.emptyValue || '' : val);
  };
  const onTextBlur = ({ target: { value: val } }: React.FocusEvent<HTMLInputElement>) => onBlur(id, val);
  const onTextFocus = ({ target: { value: val } }: React.FocusEvent<HTMLInputElement>) => onFocus(id, val);

  const inputProps = { ...rest, ...getInputProps(schema, type) };

  return (
    <Input
      {...inputProps}
      type={isVisible ? 'text' : 'password'}
      id={id}
      value={value || schema?.default || ''}
      placeholder={schema?.placeholder || ''}
      onChange={onChangeOverride || onTextChange}
      onBlur={onTextBlur}
      onFocus={onTextFocus}
      addOnSuffix={
        <Button
          type="button"
          variant="ghost"
          onClick={toggleVisibility}
          aria-label={isVisible ? 'Hide password' : 'Show password'}
          aria-pressed={isVisible}
          aria-controls="password"
          className="hover:bg-transparent"
        >
          {isVisible ? <EyeOff className="size-3" aria-hidden="true" /> : <Eye className="size-3" aria-hidden="true" />}
        </Button>
      }
    />
  );
};
