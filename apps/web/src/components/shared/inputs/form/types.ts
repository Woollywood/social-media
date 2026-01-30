import {
  type FieldValues,
  type SubmitHandler,
  type UseFormProps,
  type UseFormReturn,
} from 'react-hook-form'

export interface IFormProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown,
  TTransformedValues = TFieldValues,
>
  extends
    React.PropsWithChildren,
    Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  useFormProps?: UseFormProps<
    TFieldValues,
    TContext,
    TTransformedValues
  >
  onSubmit: SubmitHandler<TTransformedValues>
}

export interface IFormRef<
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown,
  TTransformedValues = TFieldValues,
> extends UseFormReturn<TFieldValues, TContext, TTransformedValues> {
  formRef: React.Ref<HTMLFormElement | null>
}
