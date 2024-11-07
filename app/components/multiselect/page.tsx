import { FormRJSF } from '@/components/form-rjsf/form-rjsf';

const page = () => {
  const schema = {
    type: 'object',
    properties: {
      multipleChoicesList: {
        type: 'array',
        title: 'Select the items you want to display in the sidebar.',
        items: {
          type: 'string',
          enum: ['Recents', 'Home', 'Applications', 'Desktop', 'Downloads', 'Documents'],
          enumNames: ['Recents', 'Home', 'Applications', 'Desktop', 'Downloads', 'Documents'],
        },
        uniqueItems: true,
      },
    },
  };

  return (
    <div className="grid grid-cols-2 gap-x-4 p-4">
      <div className="border rounded-sm p-4">
        <pre className="text-xs">
          <code>{JSON.stringify(schema, null, 2)}</code>
        </pre>
      </div>
      <FormRJSF schema={schema} />
    </div>
  );
};

export default page;
