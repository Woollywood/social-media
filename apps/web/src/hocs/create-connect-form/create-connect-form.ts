import { type FieldValues } from 'react-hook-form'

import { ConnectForm } from '@/components/shared/inputs/connect-form'

export const createConnectForm = <
  TFieldValues extends FieldValues,
  TContext = unknown,
  TTransformedValues = TFieldValues,
>() => ConnectForm<TFieldValues, TContext, TTransformedValues>
