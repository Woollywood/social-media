import { type FieldPath, type FieldValues } from 'react-hook-form'

import { type ISelectProps } from '@/components/ui/select'
import { type IBaseInputFormProps } from '@/types/form'

export type ISelectFormProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = IBaseInputFormProps<TFieldValues, TName> &
  ISelectProps & { options: ISelectOption[] }

export interface ISelectOption {
  label: string
  value: string
}
