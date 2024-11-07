'use client';

import { FormRJSF } from '@/components/form-rjsf/form-rjsf';
import { toast } from 'sonner';

const page = () => {
  const schema = {
    type: 'object',
    properties: {
      textInput: {
        type: 'string',
        title: 'First name',
        description: 'Last name: Norris',
        placeholder: 'Chuck',
        minLength: 3,
      },
    },
    required: ['textInput'],
  };

  return (
    <div className="grid grid-cols-2 gap-x-4 p-4">
      <div className="border rounded-sm p-4">
        <pre className="text-xs">
          <code>{JSON.stringify(schema, null, 2)}</code>
        </pre>
      </div>
      <FormRJSF schema={schema} onSubmit={() => toast('Event has been created.')} />
    </div>
  );
};

export default page;
