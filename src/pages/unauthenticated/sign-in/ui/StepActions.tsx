import type { ReactNode } from 'react'

import { classNames } from '~/shared/lib'
import { Button } from '~/shared/ui'

type StepActionsProps = Readonly<{
  /** На шаге входа в макете нет кнопки «Назад» на мобильном: вернуться можно через «Изменить» у роли. */
  hideBackOnMobile?: boolean
  /** Возврат на предыдущий шаг. Без него основная кнопка на десктопе прижата вправо. */
  onBack?: () => void
  /** Основная кнопка или ссылка: получает классы ширины и отступов для текущей раскладки. */
  renderPrimary: (className: string) => ReactNode
  /** Растянуть основную кнопку и на десктопе (шаги входа и кода), иначе она по содержимому. */
  stretchOnDesktop?: boolean
}>

/*
 * Кнопки внизу шага по макету:
 * - мобильный — основная кнопка на всю ширину (радиус 14), под ней текстовая «Назад»;
 * - планшет — «Назад» с рамкой слева, основная растянута на остаток;
 * - десктоп — «Назад» слева, основная справа по содержимому (или растянута на шагах входа и кода).
 */
export function StepActions({
  hideBackOnMobile = false,
  onBack,
  renderPrimary,
  stretchOnDesktop = false,
}: StepActionsProps) {
  const primaryClassName = classNames(
    'w-full rounded-14 py-3.75 md:w-auto md:flex-1 md:rounded-12 md:py-4 lg:py-3.5',
    !stretchOnDesktop && 'lg:flex-none lg:px-8',
  )

  return (
    <div
      className={classNames(
        'flex flex-col gap-1 md:flex-row md:gap-3',
        onBack ? 'lg:justify-between' : 'lg:justify-end',
      )}
    >
      {renderPrimary(primaryClassName)}
      {onBack && (
        <>
          <Button
            className="px-6 py-3.5 text-15 max-md:hidden md:order-first md:py-4 lg:py-3.5"
            onClick={onBack}
            size="lg"
            variant="outline"
          >
            Назад
          </Button>
          {!hideBackOnMobile && (
            <Button className="py-2 text-15 md:hidden" onClick={onBack} size="lg" variant="ghost">
              Назад
            </Button>
          )}
        </>
      )}
    </div>
  )
}
