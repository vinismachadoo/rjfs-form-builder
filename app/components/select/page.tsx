'use client';

import { FormRJSF } from '@/components/form-rjsf/form-rjsf';
import { SchemaCode } from '@/components/schema-code';
import { toast } from 'sonner';

const page = () => {
  const schema = {
    type: 'object',
    properties: {
      fruits: {
        type: 'string',
        title: 'Fruits',
        placeholder: 'Select one',
        description: 'Select your favorite fruit',
        enum: ['apple', 'banana', 'cherry'],
        enumNames: ['🍎 Apple', '🍌 Banana', '🍒 Cherry'],
      },
    },
    required: ['fruits'],
  };

  return (
    <div className="grid grid-cols-2 gap-x-4 p-4 h-full">
      <SchemaCode schema={schema} />
      <FormRJSF
        schema={schema}
        onSubmit={({ formData }) =>
          toast('You submitted the following values:', {
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-muted-foreground p-4">
                <code className="text-white">{JSON.stringify(formData, null, 2)}</code>
              </pre>
            ),
          })
        }
      />
    </div>
  );
};

export default page;
