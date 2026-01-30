import { type FieldPath, type FieldValues } from 'react-hook-form'

import { type IInputProps } from '@/components/ui/input'
import { type IBaseInputFormProps } from '@/types/form'

export type IInputFormProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = IBaseInputFormProps<TFieldValues, TName> & IInputProps
