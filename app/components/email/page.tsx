import { FormRJSF } from '@/components/form-rjsf/form-rjsf';
import { toast } from 'sonner';

const page = () => {
  const schema = {
    type: 'object',
    properties: {
      emailInput: {
        type: 'string',
        title: 'Email',
        description: 'Tell us how to reach out to you',
        format: 'email',
      },
    },
    required: ['emailInput'],
  };

  return (
    <div className="grid grid-cols-2 gap-x-4 p-4">
      <div className="border rounded-sm p-4">
        <pre className="text-xs">
          <code>{JSON.stringify(schema, null, 2)}</code>
        </pre>
      </div>
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
