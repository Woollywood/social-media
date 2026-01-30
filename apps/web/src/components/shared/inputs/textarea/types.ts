import { type FieldPath, type FieldValues } from 'react-hook-form'

import { type ITextareaProps } from '@/components/ui/textarea'
import { type IBaseInputFormProps } from '@/types/form'

export type ITextareaFormProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = IBaseInputFormProps<TFieldValues, TName> & ITextareaProps
