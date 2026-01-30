import { type FieldPath, type FieldValues } from 'react-hook-form'

import { type ICheckboxProps } from '@/components/ui/checkbox'
import { type IBaseInputFormProps } from '@/types/form'

export type ICheckboxFormProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = IBaseInputFormProps<TFieldValues, TName> & ICheckboxProps
