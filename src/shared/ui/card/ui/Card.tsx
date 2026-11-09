import type { HTMLAttributes } from 'react'

import { classNames } from '~/shared/lib'

/*
 * Варианты из дизайна:
 * - default — белая карточка с рамкой (основной контейнер на всех экранах);
 * - navy — тёмно-синяя карточка с белым текстом (активный курс, премиум, подсказки).
 * Радиус по умолчанию 18px — самый частый в макете; отступы внутри разные (14–56px), их задаёт место использования.
 */
const variantClasses = {
  default: 'border-line bg-surface',
  navy: 'border-transparent bg-navy text-white',
} as const

export type CardVariant = keyof typeof variantClasses

// Атрибуты без ref: тег меняется через as, а ref у div и li разных типов.
type CardProps = HTMLAttributes<HTMLElement> &
  Readonly<{
    /** Семантический тег: карточка в списке — li, самостоятельный блок с заголовком — section или article. */
    as?: 'article' | 'aside' | 'div' | 'li' | 'section'
    variant?: CardVariant
  }>

export function Card({ as: Tag = 'div', className, variant = 'default', ...props }: CardProps) {
  return <Tag className={classNames('rounded-18 border', variantClasses[variant], className)} {...props} />
}
