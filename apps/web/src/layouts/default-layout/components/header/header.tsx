import { AvatarImage } from '@radix-ui/react-avatar'
import React from 'react'

import { useAuthControllerMe } from '@/api/generated'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export const Header: React.FC = () => {
  const { data: user } = useAuthControllerMe()

  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 border-b border-border bg-background/90 backdrop-blur transition-shadow ${
        isScrolled ? 'shadow-sm' : ''
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4">
        <div>
          <p className="text-xs text-muted-foreground">
            Социальная сеть
          </p>
          <p className="text-base font-semibold">
            Общайтесь и оставайтесь на связи
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold">{user?.username}</p>
            <p className="text-xs text-muted-foreground">
              Статус: онлайн
            </p>
          </div>
          <Avatar className="size-10">
            {user?.avatarUrl && <AvatarImage src={user.avatarUrl} />}
            <AvatarFallback className="text-sm font-semibold">
              {user?.username[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
