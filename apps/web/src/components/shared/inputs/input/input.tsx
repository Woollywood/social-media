import { type FieldPath, type FieldValues } from 'react-hook-form'

import { FormControl } from '@/components/shared/form/form-control'
import { FormDescription } from '@/components/shared/form/form-description'
import { FormField } from '@/components/shared/form/form-field'
import { FormItem } from '@/components/shared/form/form-item'
import { FormLabel } from '@/components/shared/form/form-label'
import { FormMessage } from '@/components/shared/form/form-message'
import { Input as UInput } from '@/components/ui/input'

import { type IInputFormProps } from './types'

export const Input = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  isRequired,
  label,
  description,
  name,
  control,
  controllerProps,
  ...props
}: IInputFormProps<TFieldValues, TName>) => {
  return (
    <FormField
      name={name}
      control={control}
      {...controllerProps}
      render={({ field }) => (
        <FormItem>
          <FormLabel
            isRequired={isRequired}
            aria-required={isRequired}
            label={label}
          />
          <FormControl>
            <UInput {...props} {...field} />
          </FormControl>
          <FormDescription description={description} />
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
