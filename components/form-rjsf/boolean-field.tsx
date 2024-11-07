/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { FieldProps, getSchemaType } from '@rjsf/utils';

export const CustomBooleanField = (props: FieldProps) => {
  const {
    idSchema: { $id },
    formData,
    required,
    rawErrors,
    hideError,
    readonly,
    disabled,
    schema,
    uiSchema,
    onChange,
  } = props;

  const hasError = rawErrors && rawErrors.length > 0 && !hideError;

  if (schema?.['renderAs'] === 'switch') {
    return (
      <div className="flex items-center justify-between rounded-sm border p-4">
        <div className="flex flex-col gap-y-2">
          <Label
            className={cn(hasError && 'text-destructive', disabled && 'text-muted-foreground', 'flex gap-x-1')}
            htmlFor={$id}
          >
            {schema?.title}
            {required ? <span className="text-[theme(colors.red.500)]">*</span> : null}
          </Label>
          {/* <p className={cn('text-xs text-muted-foreground')}>
          {schema?.oneOf.find((o: Record<string, any>) => o.const === formData)?.title}
          </p> */}
          {schema?.description && <p className={cn('text-xs text-muted-foreground')}>{schema?.description}</p>}
        </div>
        <Switch id={$id} checked={formData} onCheckedChange={onChange} />
      </div>
    );
  }

  return (
    <div className="flex items-start gap-x-2">
      <Checkbox id={$id} checked={formData} onCheckedChange={onChange} />
      <div className="flex flex-col gap-y-2">
        <Label
          className={cn(hasError && 'text-destructive', disabled && 'text-muted-foreground', 'flex gap-x-1')}
          htmlFor={$id}
        >
          {schema?.title}
          {required ? <span className="text-[theme(colors.red.500)]">*</span> : null}
        </Label>
        {schema?.description && <p className={cn('text-xs text-muted-foreground')}>{schema?.description}</p>}
      </div>
    </div>
  );
};
