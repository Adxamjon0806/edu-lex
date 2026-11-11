import type { ReactNode } from 'react'

import { Link } from '@tanstack/react-router'

import { classNames } from '~/shared/lib'

type MentorLinkProps = Readonly<{
  children: ReactNode
  className?: string
  /**
   * Дублирующая ссылка (аватар рядом с именем-ссылкой): вне порядка Tab и скрыта от скринридера,
   * чтобы одна и та же ссылка не звучала дважды. Мышью по ней можно перейти.
   */
  duplicate?: boolean
  mentorId: string
}>

/*
 * Ссылка на карточку ментора: аватар или имя. Hover в макете не нарисован: имя подчёркивается
 * (классы hover:underline у ссылки с именем задаёт место использования).
 */
export function MentorLink({ children, className, duplicate = false, mentorId }: MentorLinkProps) {
  return (
    <Link
      aria-hidden={duplicate || undefined}
      className={classNames(
        'rounded-8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald',
        className,
      )}
      params={{ mentorId }}
      tabIndex={duplicate ? -1 : undefined}
      to="/mentors/$mentorId"
    >
      {children}
    </Link>
  )
}
