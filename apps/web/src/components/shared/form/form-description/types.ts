export interface IFormDescriptionProps extends Omit<
  React.ComponentProps<'p'>,
  'children'
> {
  description?: string
}
