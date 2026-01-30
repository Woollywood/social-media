import { Eye, EyeOff } from 'lucide-react'
import React, { useState } from 'react'

import { type IInputProps, Input } from './input'

export type IPasswordProps = Omit<IInputProps, 'type'>

export const Password: React.FC<IPasswordProps> = ({ ...props }) => {
  const [isShow, setIsShow] = useState(false)
  const endIcon = isShow ? <EyeOff size={20} /> : <Eye size={20} />
  const type: React.ComponentProps<'input'>['type'] = isShow
    ? undefined
    : 'password'

  const toggleShow = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation()
    setIsShow((prev) => !prev)
  }

  return (
    <Input
      type={type}
      {...props}
      endIcon={
        <button
          type="button"
          className="flex size-5 cursor-pointer items-center justify-center"
          onClick={toggleShow}
        >
          {endIcon}
        </button>
      }
    />
  )
}
