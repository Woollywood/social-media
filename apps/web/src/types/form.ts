import {
  type Control,
  type FieldPath,
  type FieldValues,
  type UseControllerProps,
} from 'react-hook-form'

export interface IBaseDisplayInputFormProps {
  label?: string
  description?: string
  isRequired?: boolean
}

export interface IBaseInputFormProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> extends IBaseDisplayInputFormProps {
  name: TName
  control?: Control<TFieldValues, unknown, TTransformedValues>
  controllerProps?: Omit<
    UseControllerProps<TFieldValues, TName, TTransformedValues>,
    'name' | 'control'
  >
}
