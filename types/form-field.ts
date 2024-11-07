export interface BaseField {
  id: string;
  type: string;
  title: string;
  description: string;
  propertyName: string;
  default?: string;
}

export enum FieldTypes {
  string = 'string',
  number = 'number',
  checkbox = 'checkbox',
}

export interface NumberField extends BaseField {
  minimum: number;
  maximum: number;
}

export interface ArrayField extends BaseField {
  items: { type: string; enum: string[]; enumNames: string[] };
}

export interface ObjectField extends BaseField {
  properties: FormField;
}

export type FormField = (NumberField | ArrayField) & { layout: { width: string } };
