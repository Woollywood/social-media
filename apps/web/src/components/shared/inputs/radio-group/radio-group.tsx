import { type FieldPath, type FieldValues } from 'react-hook-form'

import { FormControl } from '@/components/shared/form/form-control'
import { FormDescription } from '@/components/shared/form/form-description'
import { FormField } from '@/components/shared/form/form-field'
import { FormItem } from '@/components/shared/form/form-item'
import { FormMessage } from '@/components/shared/form/form-message'
import { Label } from '@/components/ui/label'
import {
  RadioGroup as URadioGroup,
  RadioGroupItem as URadioGroupItem,
} from '@/components/ui/radio-group'

import { type IRadioGroupFormProps } from './types'

export const RadioGroup = <
  ItemValue extends string,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  description,
  name,
  control,
  controllerProps,
  items,
  ...props
}: IRadioGroupFormProps<ItemValue, TFieldValues, TName>) => {
  return (
    <FormField
      name={name}
      control={control}
      {...controllerProps}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <URadioGroup {...props} {...field}>
              <div className="space-y-2">
                {items.map(({ label, value }) => (
                  <div
                    key={value}
                    className="flex items-center gap-1"
                  >
                    <URadioGroupItem
                      id={value}
                      value={value}
                      onClick={() => field.onChange(value)}
                    />
                    <Label htmlFor={value}>{label}</Label>
                  </div>
                ))}
              </div>
            </URadioGroup>
          </FormControl>
          <FormDescription description={description} />
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
