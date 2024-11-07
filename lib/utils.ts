import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { RJSFSchema } from '@rjsf/utils';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractUIPropsFromSchema(schema: RJSFSchema, props: string[]) {
  const result = {};

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function traverseProperties(properties: Record<string, any>, parent: Record<string, any>) {
    for (const key in properties) {
      const property = properties[key];

      if (property.type === 'object' && property.properties) {
        // Nested property: initialize nested object and call recursively
        parent[key] = {};
        traverseProperties(property.properties, parent[key]);
      } else {
        // Direct property: add 'ui:xxx' if 'xxx' exists
        props.forEach((prop) => {
          if (property[prop]) {
            if (parent[key]) {
              parent[key][`ui:${prop}`] = property[prop];
            } else {
              parent[key] = { [`ui:${prop}`]: property[prop] };
            }
          }
        });
      }
    }
  }

  if (schema.type === 'object' && schema.properties) {
    traverseProperties(schema.properties, result);
  }

  return result;
}
