import React from 'react'
import { Outlet } from 'react-router'

export const DefaultLayout: React.FC = () => {
  return (
    <div>
      <Outlet />
    </div>
  )
}
