/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { FormField, formFieldOptions } from '@/components/form-field';
import { FormRJSF } from '@/components/form-rjsf/form-rjsf';
import { SortableField, sortableFieldVariants } from '@/components/sortable-field';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Code } from 'lucide-react';
import { useState } from 'react';

export default function FormBuilder() {
  const [fields, setFields] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('builder');

  const addField = (type: string) => {
    const timestamp = Date.now();
    const newField = {
      id: `field-${timestamp}`,
      propertyName: `field_${timestamp}`,
      type,
      title: 'Title',
      description: 'Description',
      layout: { width: 'full' },
      items: {} as any,
    };

    if (type === 'array') {
      newField.items = {
        type: 'string',
        enum: ['option_1'],
        enumNames: ['Option 1'],
      };
    }

    setFields([...fields, newField]);
  };

  const updateField = (id: string, updates: any) => {
    setFields(fields.map((field) => (field.id === id ? { ...field, ...updates } : field)));
  };

  const removeField = (id: string) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setFields((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const generateSchema = () => {
    const properties: any = {};
    const required: string[] = [];

    fields.forEach((field) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, type, title, description, isRequired, propertyName, layout, ...rest } = field;
      const name = propertyName || id;
      properties[name] = {
        type,
        title,
        description,
        ...rest,
      };
      if (isRequired) {
        required.push(name);
      }
    });

    return (
      fields.length > 0 && {
        type: 'object',
        properties,
        required: required.length ? required : undefined,
      }
    );
  };

  const schema = generateSchema();

  const renderFields = () => {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-12 gap-4">
          {fields.map((field) => (
            <div
              key={field.id}
              className={`${
                field.layout?.width === 'half'
                  ? 'col-span-6'
                  : field.layout?.width === 'third'
                  ? 'col-span-4'
                  : 'col-span-12'
              }`}
            >
              <SortableField variant={field.type} field={field} onUpdate={updateField} onRemove={removeField}>
                <FormField field={field} onUpdate={updateField} onRemove={removeField} />
              </SortableField>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="h-full grid grid-cols-1 lg:grid-cols-12">
      <div className="flex flex-col p-4 h-full border-r gap-y-2 lg:col-span-2">
        {formFieldOptions.map((fieldType) => (
          <Button
            key={`${fieldType.type}-${fieldType.title}`}
            variant="ghost"
            className={cn('w-full justify-start', sortableFieldVariants({ variant: fieldType.type as any }))}
            onClick={() => addField(fieldType.type)}
            disabled={fieldType.disabled}
          >
            <fieldType.icon className="w-4 h-4 mr-2" />
            {fieldType.title}
            {fieldType.badge && <Badge>{fieldType.badge}</Badge>}
          </Button>
        ))}
      </div>

      <div className="lg:col-span-10 p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="builder">Form Builder</TabsTrigger>
            <TabsTrigger value="preview">JSON Schema</TabsTrigger>
          </TabsList>

          <TabsContent value="builder">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className={cn('p-4', fields.length === 0 && 'border-dashed')}>
                <ScrollArea className="h-full">
                  <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={fields} strategy={verticalListSortingStrategy}>
                      {renderFields()}
                    </SortableContext>
                  </DndContext>

                  {fields.length === 0 && (
                    <div className="flex items-center justify-center h-full text-xs text-muted-foreground">
                      Drag and drop fields here to build your form
                    </div>
                  )}
                </ScrollArea>
              </Card>

              <Card className="p-4">
                <h3 className="font-semibold mb-4">Your form</h3>
                {schema && <FormRJSF schema={schema} />}
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="preview">
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">JSON Schema</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(schema, null, 2));
                  }}
                >
                  <Code className="w-4 h-4 mr-2" />
                  Copy
                </Button>
              </div>
              <pre className="bg-muted p-4 rounded-sm text-xs overflow-auto max-h-[500px]">
                {schema && JSON.stringify(schema, null, 2)}
              </pre>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
