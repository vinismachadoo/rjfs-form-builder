/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from '@/components/ui/label';
import { ObjectFieldTemplateProps } from '@rjsf/utils';

export function ObjectFieldTemplate(props: ObjectFieldTemplateProps) {
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
