import { Link } from '@tanstack/react-router'
import { ChevronLeft, X } from 'lucide-react'

import { iconButtonVariants, Logo } from '~/shared/ui'

/*
 * Шапка полноэкранной подписки до lg (на десктопе есть сайдбар). Ведёт обратно в профиль:
 * на планшете — круглая кнопка «назад» и логотип по центру, под шапкой граница;
 * на мобильном — крестик и «Восстановить покупки».
 */
export function SubscriptionTopBar() {
  return (
    <header className="flex items-center justify-between px-5 pt-3.5 md:border-b md:border-navy-700 md:px-10 md:py-7 lg:hidden">
      <Link
        aria-label="Вернуться в профиль"
        className={iconButtonVariants({
          className: 'border-transparent bg-transparent text-white hover:bg-white/10 md:border-navy-500',
        })}
        to="/profile"
      >
        <X aria-hidden className="md:hidden" />
        <ChevronLeft aria-hidden className="max-md:hidden" />
      </Link>
      <Logo className="max-md:hidden" size={30} />
      <button
        className="cursor-pointer rounded-6 text-13 font-bold text-navy-200 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald md:hidden"
        type="button"
      >
        Восстановить покупки
      </button>
      {/* Пустое место размером с кнопку «назад», чтобы логотип стоял по центру. */}
      <span aria-hidden className="size-11 max-md:hidden" />
    </header>
  )
}
