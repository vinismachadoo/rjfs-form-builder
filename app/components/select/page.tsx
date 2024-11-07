import { FormRJSF } from '@/components/form-rjsf/form-rjsf';

const page = () => {
  const schema = {
    type: 'object',
    properties: {
      layoutImpressao: {
        type: 'string',
        title: 'Layout impressão',
        placeholder: 'Select one',
        description: 'Layout de impressão da etiqueta Correios',
        enum: ['PADRAO', 'LINEAR_100_150'],
        enumNames: ['Padrao', 'Linear 100 150'],
      },
    },
    required: ['layoutImpressao'],
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
