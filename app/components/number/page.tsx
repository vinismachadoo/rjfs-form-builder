import { FormRJSF } from '@/components/form-rjsf/form-rjsf';

const page = () => {
  const schema = {
    type: 'object',
    properties: {
      numberInput: {
        type: 'number',
        title: 'Your age',
        description: 'Adds or remover 2 by 2',
        default: 0,
        minimum: 18,
        maximum: 65,
        step: 2,
      },
    },
    required: ['numberInput'],
  };

  return (
    <div className="grid grid-cols-2 gap-x-4 p-4">
      <div className="border rounded-sm p-4">
        <pre className="text-xs">
          <code>{JSON.stringify(schema, null, 2)}</code>
        </pre>
      </div>
      <FormRJSF schema={schema} className="space-y-4" />
    </div>
  );
};

export default page;
