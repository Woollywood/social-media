import { type FieldPath, type FieldValues } from 'react-hook-form'

import { type IRadioGroupProps } from '@/components/ui/radio-group'
import { type IBaseInputFormProps } from '@/types/form'

export interface IRadioGroupItem<T> {
  label: string
  value: T
}

export type IRadioGroupFormProps<
  ItemValue extends string,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<
  IBaseInputFormProps<TFieldValues, TName>,
  'isRequired' | 'label'
> &
  IRadioGroupProps & { items: IRadioGroupItem<ItemValue>[] }
