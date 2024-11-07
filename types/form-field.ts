export interface BaseField {
  id: string;
  type: string;
  title: string;
  description: string;
  propertyName: string;
  default?: string;
  isRequired?: boolean;
}

export enum FieldTypes {
  string = 'string',
  number = 'number',
  array = 'array',
  object = 'object',
}

export interface StringField extends BaseField {
  type: FieldTypes.string;
}

export interface NumberField extends BaseField {
  type: FieldTypes.number;
  minimum: number;
  maximum: number;
}

export interface ArrayField extends BaseField {
  type: FieldTypes.array;
  items: { type: string; enum: string[]; enumNames: string[] };
}

export interface ObjectField extends BaseField {
  type: FieldTypes.object;
  properties: FormField;
}

export type FormField = (StringField | NumberField | ArrayField | ObjectField) & { layout: { width: string } };
