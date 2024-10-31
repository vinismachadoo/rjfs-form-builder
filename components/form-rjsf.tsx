/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Form from '@rjsf/core';
import {
  ArrayFieldTemplateProps,
  BaseInputTemplateProps,
  DescriptionFieldProps,
  FieldErrorProps,
  FieldTemplateProps,
  ObjectFieldTemplateProps,
  ValidatorType,
  getInputProps,
  FieldProps,
  WidgetProps,
  SubmitButtonProps,
  getSubmitButtonOptions,
} from '@rjsf/utils';
import v8Validator from '@rjsf/validator-ajv8';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { NumberInput } from '@/components/ui/number-input';

// based on https://rjsf-team.github.io/react-jsonschema-form/

// this is the complete field so you can customize positioning and rendering of elements
function FieldTemplate(props: FieldTemplateProps) {
  const {
    id,
    classNames,
    style,
    label,
    displayLabel,
    required,
    description,
    errors,
    rawErrors,
    hideError,
    readonly,
    disabled,
    schema,
    children,
  } = props;

  if (readonly) return;

  const hasError = rawErrors && rawErrors.length > 0 && !hideError;
  //root has no title
  // must remove title from boolean cause it is rendered in custom field

  return (
    <div className={cn('flex flex-col gap-y-2', classNames)} style={style}>
      {schema?.title && displayLabel ? (
        <Label
          className={cn(hasError && 'text-destructive', disabled && 'text-muted-foreground', 'flex gap-x-1')}
          htmlFor={id}
        >
          {label}
          {required ? <span className="text-[theme(colors.red.500)]">*</span> : null}
        </Label>
      ) : null}
      {children}
      {schema?.description && description}
      {errors}
    </div>
  );
}

// basic description
function DescriptionFieldTemplate(props: DescriptionFieldProps) {
  const { description, id } = props;
  return (
    <p id={id} className={cn('text-xs text-muted-foreground')}>
      {description}
    </p>
  );
}

// error message
function FieldErrorTemplate(props: FieldErrorProps) {
  const { errors } = props;

  if (errors && errors?.length > 0) {
    return (
      <React.Fragment>
        {errors.map((error, idx) => (
          <p key={idx} className={cn('text-xs font-medium text-destructive')}>
            {error}
          </p>
        ))}
      </React.Fragment>
    );
  }
}

// basic input string
function BaseInputTemplate(props: BaseInputTemplateProps) {
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
        placeholder={schema?.examples?.[0] || 0}
        step={1}
        // onChange={onChangeOverride || onTextChange}
        // onBlur={onTextBlur}
        // onFocus={onTextFocus}
      />
    );
  }

  return (
    <Input
      {...inputProps}
      id={id}
      value={value || schema?.default || ''}
      placeholder={schema?.examples?.[0] || ''}
      onChange={onChangeOverride || onTextChange}
      onBlur={onTextBlur}
      onFocus={onTextFocus}
    />
  );
}

const CustomBooleanField = (props: FieldProps) => {
  const {
    idSchema: { $id },
    formData,
    required,
    rawErrors,
    hideError,
    readonly,
    disabled,
    schema,
    onChange,
  } = props;

  const hasError = rawErrors && rawErrors.length > 0 && !hideError;

  return (
    <div className="flex items-center justify-between rounded-sm border p-4">
      <div className="flex flex-col gap-y-1">
        <Label
          className={cn(hasError && 'text-destructive', disabled && 'text-muted-foreground', 'flex gap-x-1')}
          htmlFor={$id}
        >
          {schema?.title}
          {required ? <span className="text-[theme(colors.red.500)]">*</span> : null}
        </Label>
        <p className={cn('text-xs text-muted-foreground')}>
          {schema?.oneOf.find((o: Record<string, any>) => o.const === formData)?.title}
        </p>
      </div>
      <Switch id={$id} checked={formData} onCheckedChange={onChange} />
    </div>
  );
};

const CustomSelectWidget = (props: WidgetProps) => {
  const { label, rawErrors, hideError, readonly, disabled, options, schema, value, onChange, ...rest } = props;
  // const hasError = rawErrors && rawErrors.length > 0 && !hideError;

  return (
    <Combobox
      {...rest}
      disabled={disabled}
      options={options.enumOptions?.map((opt) => ({
        ...opt,
        filterValue: opt.label,
      }))}
      placeholder={label}
      searchPlaceholder="Procure..."
      emptyState="Nenhuma resultado"
      value={value}
      onValueChange={(v) => onChange(v.value)}
      className={cn('w-full justify-between font-normal')}
    />
  );
};

// array schema
function ArrayFieldTemplate(props: ArrayFieldTemplateProps) {
  const {
    idSchema: { $id },
    title,
    disabled,
    required,
    rawErrors,
    hideError,
    schema,
    items,
    canAdd,
    onAddClick,
  } = props;

  const hasError = rawErrors && rawErrors.length > 0 && !hideError;

  return (
    <React.Fragment>
      <Label
        className={cn(hasError && 'text-destructive', disabled && 'text-muted-foreground', 'flex gap-x-1')}
        htmlFor={$id}
      >
        {title}
        {required ? <span className="text-[theme(colors.red.500)]">*</span> : null}
      </Label>
      <div className="flex flex-col gap-y-2 p-4 rounded-sm border">
        <div className="flex flex-col gap-y-4">
          {items &&
            items.map((element) => (
              <React.Fragment key={element.key}>
                {element.children}
                {element.index + 1 > schema?.minItems && (
                  <button onClick={element.onDropIndexClick(element.index)}>Delete</button>
                )}
              </React.Fragment>
            ))}
        </div>
        {/* {canAdd && (
          <div className="flex w-full justify-center">
            <Button variant="outline" className="" onClick={onAddClick}>
              <Plus className="w-4 h-4" />
              Adicionar
            </Button>
          </div>
        )} */}
      </div>
    </React.Fragment>
  );
}

// object schema
function ObjectFieldTemplate(props: ObjectFieldTemplateProps) {
  return (
    <div className="flex flex-col gap-y-4 p-4 rounded-sm border">
      {props.schema.title && <Label>{props.schema.title}</Label>}
      {props.properties.map((element, idx) => {
        if (element.content.props.schema.readOnly) return;
        return <div key={idx}>{element.content}</div>;
      })}
    </div>
  );
}

function SubmitButton(props: SubmitButtonProps) {
  const { uiSchema } = props;
  const { norender } = getSubmitButtonOptions(uiSchema);
  if (norender) {
    return null;
  }
  return <Button type="submit">Submit</Button>;
}

export interface FormRJSFProps extends Omit<React.ComponentPropsWithoutRef<typeof Form>, 'validator'> {
  validator?: ValidatorType<any, any, any>;
  renderSubmitButton?: boolean;
}

const FormRJSF = React.forwardRef<React.ElementRef<typeof Form>, FormRJSFProps>(
  ({ formData, schema, renderSubmitButton = true, ...props }, ref) => {
    return (
      <Form
        ref={ref}
        {...props}
        formData={formData}
        validator={v8Validator}
        noHtml5Validate={true}
        showErrorList={false}
        fields={{ BooleanField: CustomBooleanField }}
        widgets={{ SelectWidget: CustomSelectWidget }}
        templates={{
          FieldTemplate,
          BaseInputTemplate,
          DescriptionFieldTemplate,
          FieldErrorTemplate,
          ArrayFieldTemplate,
          ObjectFieldTemplate,
          ButtonTemplates: { SubmitButton },
        }}
        schema={schema}
        uiSchema={{
          'ui:order': schema.order,
          'ui:submitButtonOptions': {
            norender: !renderSubmitButton,
          },
        }}
      />
    );
  }
);
FormRJSF.displayName = 'FormRJSF';

export { FormRJSF };
