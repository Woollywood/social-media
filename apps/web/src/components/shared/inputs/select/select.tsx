import { type FieldPath, type FieldValues } from 'react-hook-form'

import { FormControl } from '@/components/shared/form/form-control'
import { FormDescription } from '@/components/shared/form/form-description'
import { FormField } from '@/components/shared/form/form-field'
import { FormItem } from '@/components/shared/form/form-item'
import { FormLabel } from '@/components/shared/form/form-label'
import { FormMessage } from '@/components/shared/form/form-message'
import {
  Select as USelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { type ISelectFormProps } from './types'

export const Select = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  isRequired,
  label,
  description,
  name,
  control,
  controllerProps,
  options,
  ...props
}: ISelectFormProps<TFieldValues, TName>) => {
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
            <USelect
              {...props}
              onValueChange={(value) => field.onChange(value)}
              {...field}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                {options.map(({ label, value }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </USelect>
          </FormControl>
          <FormDescription description={description} />
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
