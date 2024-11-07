import { Button } from '@/components/ui/button';
import { getSubmitButtonOptions, SubmitButtonProps } from '@rjsf/utils';

export function SubmitButton(props: SubmitButtonProps) {
  const { uiSchema } = props;
  const { norender } = getSubmitButtonOptions(uiSchema);
  if (norender) {
    return null;
  }
  return <Button type="submit">Submit</Button>;
}
