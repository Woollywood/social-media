import React from 'react'

import { Button } from './components/ui/button'

export const App: React.FC = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Button size="lg">Click me</Button>
    </div>
  )
}
