import type * as LabelPrimitive from '@radix-ui/react-label'

export interface IFormLabelProps extends Omit<
  React.ComponentProps<typeof LabelPrimitive.Root>,
  'children'
> {
  label?: string
  isRequired?: boolean
}
