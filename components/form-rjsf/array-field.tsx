/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { ArrayFieldTemplateProps } from '@rjsf/utils';
import * as React from 'react';

// array schema
export function ArrayFieldTemplate(props: ArrayFieldTemplateProps) {
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
