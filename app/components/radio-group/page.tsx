import { FormRJSF } from '@/components/form-rjsf/form-rjsf';

const page = () => {
  const schema = {
    type: 'object',
    properties: {
      notify: {
        type: 'string',
        default: 'all',
        title: 'Notify me about...',
        enum: ['all', 'mentions', 'none'],
        enumNames: ['All new messages', 'Direct messages and mentions', 'Nothing'],
        widget: 'radio',
        options: {
          inline: true,
        },
      },
      package: {
        type: 'string',
        default: 'default',
        title: 'Package type',
        enum: ['default', 'comfortable', 'compact'],
        enumNames: ['Default', 'Comfortable', 'Compact'],
        widget: 'radio',
      },
    },
    required: ['package'],
    order: ['package', 'notify'],
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
