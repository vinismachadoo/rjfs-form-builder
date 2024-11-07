'use client';

import { FormRJSF } from '@/components/form-rjsf/form-rjsf';

const page = () => {
  const schema = {
    type: 'object',
    properties: {
      datetime: {
        type: 'string',
        format: 'date-time',
        title: 'Schedule event',
        description: 'Tell us when should the event run',
      },
    },
    required: ['datetime'],
  };

  return (
    <div className="grid grid-cols-2 gap-x-4 p-4">
      <div className="border rounded-sm p-4 overflow-hidden overflow-x-auto">
        <pre className="text-xs">
          <code>{JSON.stringify(schema, null, 2)}</code>
        </pre>
      </div>
      <FormRJSF schema={schema} onSubmit={() => console.log('vini')} />
    </div>
  );
};

export default page;
