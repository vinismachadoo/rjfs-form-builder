/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { ArrayFieldTemplate } from '@/components/form-rjsf/array-field';
import { BaseInputTemplate } from '@/components/form-rjsf/base-input';
import { CustomBooleanField } from '@/components/form-rjsf/boolean-field';
import { CustomCheckboxesWidget } from '@/components/form-rjsf/checkbox-widget';
import { ObjectFieldTemplate } from '@/components/form-rjsf/object-field';
import { CustomPasswordWidget } from '@/components/form-rjsf/password-widget';
import { CustomRadioWidget } from '@/components/form-rjsf/radio-widget';
import { CustomSelectWidget } from '@/components/form-rjsf/select-widget';
import { SubmitButton } from '@/components/form-rjsf/submit-button';
import { Label } from '@/components/ui/label';
import { cn, extractUIPropsFromSchema } from '@/lib/utils';
import Form from '@rjsf/core';
import { DescriptionFieldProps, FieldErrorProps, FieldTemplateProps, ValidatorType } from '@rjsf/utils';
import v8Validator from '@rjsf/validator-ajv8';
import * as React from 'react';

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
      {/* must remove description from boolean type */}
      {schema?.description && schema.type !== 'boolean' && description}
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

export interface FormRJSFProps extends Omit<React.ComponentPropsWithoutRef<typeof Form>, 'validator'> {
  validator?: ValidatorType<any, any, any>;
  renderSubmitButton?: boolean;
}

const FormRJSF = React.forwardRef<React.ElementRef<typeof Form>, FormRJSFProps>(
  ({ formData, schema, renderSubmitButton = true, validator, className, ...props }, ref) => {
    const uiProps = extractUIPropsFromSchema(schema, ['widget', 'options', 'enumNames', 'placeholder', 'order']);

    return (
      <Form
        ref={ref}
        {...props}
        className={cn('space-y-4', className)}
        formData={formData}
        validator={validator || v8Validator}
        noHtml5Validate={true}
        showErrorList={false}
        fields={{ BooleanField: CustomBooleanField }}
        widgets={{
          SelectWidget: CustomSelectWidget,
          CheckboxesWidget: CustomCheckboxesWidget,
          RadioWidget: CustomRadioWidget,
          PasswordWidget: CustomPasswordWidget,
        }}
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
          ...uiProps,
        }}
      />
    );
  }
);
FormRJSF.displayName = 'FormRJSF';

export { FormRJSF };
