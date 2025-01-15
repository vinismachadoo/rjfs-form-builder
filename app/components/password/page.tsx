'use client';

import { FormRJSF } from '@/components/form-rjsf/form-rjsf';
import { SchemaCode } from '@/components/schema-code';
import { toast } from 'sonner';

const page = () => {
  const schema = {
    type: 'object',
    properties: {
      password: {
        type: 'string',
        title: 'Password',
        format: 'password',
        widget: 'password',
      },
      confirmPassword: {
        type: 'string',
        title: 'Confirm password',
        description: 'Passwords must match',
        format: 'password',
        widget: 'password',
      },
    },
    required: ['password', 'confirmPassword'],
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
