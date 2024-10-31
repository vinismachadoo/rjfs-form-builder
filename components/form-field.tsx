/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Trash2, Plus, Minus, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React from 'react';

interface FormFieldProps {
  field: any;
  onUpdate: (id: string, updates: any) => void;
  onRemove: (id: string) => void;
  parentField?: any;
}

export function FormField({ field, onUpdate, onRemove, parentField }: FormFieldProps) {
  const handlePropertyNameChange = (value: string) => {
    const validName = value.toLowerCase().replace(/[^a-z0-9_]/g, '_');
    onUpdate(field.id, { propertyName: validName });
  };

  const addArrayOption = () => {
    const options = field.items?.enum || [];
    const optionLabels = field.items?.enumNames || [];
    onUpdate(field.id, {
      items: {
        ...field.items,
        enum: [...options, `option_${options.length + 1}`],
        enumNames: [...optionLabels, `Option ${options.length + 1}`],
      },
    });
  };

  const updateArrayOption = (index: number, value: string, isLabel = false) => {
    const options = [...(field.items?.enum || [])];
    const optionLabels = [...(field.items?.enumNames || [])];

    if (isLabel) {
      optionLabels[index] = value;
    } else {
      options[index] = value;
    }

    onUpdate(field.id, {
      items: {
        ...field.items,
        enum: options,
        enumNames: optionLabels,
      },
    });
  };

  const removeArrayOption = (index: number) => {
    const options = field.items?.enum || [];
    const optionLabels = field.items?.enumNames || [];
    onUpdate(field.id, {
      items: {
        ...field.items,
        enum: options.filter((_: any, i: number) => i !== index),
        enumNames: optionLabels.filter((_: any, i: number) => i !== index),
      },
    });
  };

  const addNestedProperty = () => {
    const timestamp = Date.now();
    const properties = field.properties || {};
    onUpdate(field.id, {
      properties: {
        ...properties,
        [`field_${timestamp}`]: {
          type: 'string',
          title: 'New Field',
        },
      },
    });
  };

  return (
    <Card className="p-4 mb-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 flex items-center justify-end">
          <div className="flex items-center space-x-2">
            {!parentField && (
              <Select
                value={field.layout?.width || 'full'}
                onValueChange={(value) =>
                  onUpdate(field.id, {
                    layout: { ...field.layout, width: value },
                  })
                }
              >
                <SelectTrigger className="w-[140px] flex gap-x-2">
                  <LayoutGrid className="size-4" />
                  <SelectValue placeholder="Layout" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full">Full Width</SelectItem>
                  <SelectItem value="half">Half Width</SelectItem>
                  <SelectItem value="third">One Third</SelectItem>
                </SelectContent>
              </Select>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemove(field.id)}
              className="text-[theme(colors.red.500)] hover:text-[theme(colors.red.700)]"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <Label>Property Name</Label>
        <Input
          value={field.propertyName || ''}
          onChange={(e) => handlePropertyNameChange(e.target.value)}
          placeholder="Enter property name (e.g., first_name)"
        />

        <Label>Field Title</Label>
        <Input
          value={field.title || ''}
          onChange={(e) => onUpdate(field.id, { title: e.target.value })}
          placeholder="Enter field title"
        />

        <Label>Description</Label>
        <Textarea
          value={field.description || ''}
          onChange={(e) => onUpdate(field.id, { description: e.target.value })}
          placeholder="Enter field description"
        />

        {field.type === 'string' && (
          <React.Fragment>
            <Label>Default Value</Label>
            <Input
              value={field.default || ''}
              onChange={(e) => onUpdate(field.id, { default: e.target.value })}
              placeholder="Default value"
            />
          </React.Fragment>
        )}

        {field.type === 'number' && (
          <React.Fragment>
            <Label>Minimum Value</Label>
            <Input
              type="number"
              value={field.minimum || ''}
              onChange={(e) => onUpdate(field.id, { minimum: Number(e.target.value) })}
              placeholder="Minimum value"
            />

            <Label>Maximum Value</Label>
            <Input
              type="number"
              value={field.maximum || ''}
              onChange={(e) => onUpdate(field.id, { maximum: Number(e.target.value) })}
              placeholder="Maximum value"
            />
          </React.Fragment>
        )}

        {field.type === 'array' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Options</Label>
              <Button variant="outline" size="sm" onClick={addArrayOption}>
                <Plus className="w-4 h-4 mr-2" />
                Add Option
              </Button>
            </div>
            {(field.items?.enum || []).map((option: string, index: number) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="flex-1 space-y-2">
                  <Input
                    value={field.items.enumNames?.[index] || ''}
                    onChange={(e) => updateArrayOption(index, e.target.value, true)}
                    placeholder="Option Label"
                  />
                  <Input
                    value={option}
                    onChange={(e) => updateArrayOption(index, e.target.value)}
                    placeholder="Option Value"
                  />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeArrayOption(index)}
                  className="text-[theme(colors.red.500)] hover:text-[theme(colors.red.700)]"
                >
                  <Minus className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {field.type === 'object' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Nested Properties</Label>
              <Button variant="outline" size="sm" onClick={addNestedProperty}>
                <Plus className="w-4 h-4 mr-2" />
                Add Property
              </Button>
            </div>
            <div className="pl-4 border-l-2 border-gray-200">
              {Object.entries(field.properties || {}).map(([key, value]: [string, any]) => (
                <FormField
                  key={key}
                  field={{ ...value, id: key, propertyName: key }}
                  onUpdate={(_, updates) => {
                    const newProperties = { ...field.properties };
                    newProperties[key] = { ...value, ...updates };
                    onUpdate(field.id, { properties: newProperties });
                  }}
                  onRemove={() => {
                    const newProperties = { ...field.properties };
                    delete newProperties[key];
                    onUpdate(field.id, { properties: newProperties });
                  }}
                  parentField={field}
                />
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center space-x-2">
          <Switch
            id={`required-${field.id}`}
            checked={field.isRequired || false}
            onCheckedChange={(checked) => onUpdate(field.id, { isRequired: checked })}
          />
          <Label htmlFor={`required-${field.id}`}>Required field</Label>
        </div>
      </div>
    </Card>
  );
}
