import { type FieldPath, type FieldValues } from 'react-hook-form'

import { FormControl } from '@/components/shared/form/form-control'
import { FormDescription } from '@/components/shared/form/form-description'
import { FormField } from '@/components/shared/form/form-field'
import { FormItem } from '@/components/shared/form/form-item'
import { FormLabel } from '@/components/shared/form/form-label'
import { FormMessage } from '@/components/shared/form/form-message'
import { Checkbox as UCheckbox } from '@/components/ui/checkbox'

import { type ICheckboxFormProps } from './types'

export const Checkbox = <
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
}: ICheckboxFormProps<TFieldValues, TName>) => {
  return (
    <FormField
      name={name}
      control={control}
      {...controllerProps}
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center gap-1">
            <FormControl>
              <UCheckbox {...props} {...field} />
            </FormControl>
            <FormLabel
              isRequired={isRequired}
              aria-required={isRequired}
              label={label}
            />
          </div>
          <FormDescription description={description} />
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
