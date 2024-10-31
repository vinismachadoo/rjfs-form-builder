/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { FormField } from '@/components/form-field';
import { SortableField } from '@/components/sortable-field';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { FormRJSF as Form } from '@/components/form-rjsf';
import validator from '@rjsf/validator-ajv8';
import { Code, PlusCircle } from 'lucide-react';
import { useState } from 'react';

const FIELD_TYPES = [
  { type: 'string', title: 'Text Input', icon: 'type' },
  { type: 'number', title: 'Number Input', icon: 'hash' },
  { type: 'boolean', title: 'Checkbox', icon: 'check-square' },
  { type: 'array', title: 'Multi Select', icon: 'list' },
  { type: 'object', title: 'Object', icon: 'box' },
];

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
      items: {},
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
      const { id, type, title, description, isRequired, propertyName, ...rest } = field;
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
              <SortableField field={field} onUpdate={updateField} onRemove={removeField}>
                <FormField field={field} onUpdate={updateField} onRemove={removeField} />
              </SortableField>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-3">
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4">Field Types</h2>
          <div className="space-y-2">
            {FIELD_TYPES.map((fieldType) => (
              <Button
                key={fieldType.type}
                variant="outline"
                className="w-full justify-start"
                onClick={() => addField(fieldType.type)}
              >
                <PlusCircle className="w-4 h-4 mr-2" />
                {fieldType.title}
              </Button>
            ))}
          </div>
        </Card>
      </div>

      <div className="lg:col-span-9">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="builder">Form Builder</TabsTrigger>
            <TabsTrigger value="preview">Preview & JSON</TabsTrigger>
          </TabsList>

          <TabsContent value="builder">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-4">
                <ScrollArea className="h-[600px] pr-4">
                  <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={fields} strategy={verticalListSortingStrategy}>
                      {renderFields()}
                    </SortableContext>
                  </DndContext>

                  {fields.length === 0 && (
                    <div className="text-center py-12 text-gray-500">Drag and drop fields here to build your form</div>
                  )}
                </ScrollArea>
              </Card>

              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-4">Form Preview</h3>
                {schema && <Form schema={schema} validator={validator} className="space-y-4" />}
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
                {JSON.stringify(schema, null, 2)}
              </pre>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
