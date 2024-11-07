import { FormRJSF } from '@/components/form-rjsf/form-rjsf';

const page = () => {
  const schema = {
    type: 'object',
    properties: {
      terms: {
        type: 'boolean',
        title: 'Accept terms and conditions',
      },
      termsAndConditions: {
        type: 'boolean',
        title: 'Accept terms and conditions',
        description: 'You agree to our Terms of Service and Privacy Policy.',
      },
    },
    required: ['terms'],
  };

  return (
    <div className="grid grid-cols-2 gap-x-4 p-4">
      <div className="border rounded-sm p-4 overflow-hidden overflow-x-auto">
        <pre className="text-xs">
          <code>{JSON.stringify(schema, null, 2)}</code>
        </pre>
      </div>
      <FormRJSF schema={schema} />
    </div>
  );
};

export default page;
