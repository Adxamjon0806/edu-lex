import { Link } from '@tanstack/react-router'

import { classNames } from '~/shared/lib'

import type { NavigationItem } from '../config/navigation'

type NavigationLinkProps = Readonly<{
  /** Пока страниц нет, все пункты ведут на главную и различаются hash: так подсвечивается выбранный пункт. */
  hash?: string
  item: NavigationItem
  /** Мелкие подписи в узкой колонке (10px вместо 11px), как в навигации преподавателя в макете. */
  smallRailLabels?: boolean
}>

/*
 * Один пункт навигации в трёх видах по ширине экрана (значения из макета):
 * - до md — вкладка нижней панели: иконка 21px над короткой подписью 10px, ширина от 60px, без фона
 *   (компактный вариант из навигации преподавателя: так помещаются и шесть пунктов студента);
 * - md–lg — плитка 64px узкой колонки: иконка 21px над короткой подписью;
 * - от lg — строка боковой панели: иконка 19px слева от полной подписи.
 * Активный пункт: текст emerald-400, фон emerald 16% (кроме нижней панели) и свечение иконки.
 * Hover в макете не нарисован: неактивный пункт светлеет до белого, в колонке и панели появляется лёгкий фон.
 */
export function NavigationLink({
  hash,
  item: { icon: Icon, label, shortLabel },
  smallRailLabels = false,
}: NavigationLinkProps) {
  return (
    <Link
      activeOptions={{ includeHash: true }}
      className={classNames(
        'flex min-w-15 flex-col items-center gap-1 py-1.5 text-10 font-semibold text-navy-200 transition-colors',
        'hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald',
        'data-[status=active]:text-emerald-400 data-[status=active]:[&_svg]:drop-shadow-glow',
        'md:w-16 md:rounded-12 md:py-2.5 md:hover:bg-white/5 md:data-[status=active]:bg-emerald/16',
        !smallRailLabels && 'md:text-11',
        'lg:w-auto lg:flex-row lg:gap-3 lg:rounded-10 lg:px-3.5 lg:py-3 lg:text-15',
      )}
      hash={hash}
      to="/"
    >
      <Icon aria-hidden className="size-5.25 shrink-0 lg:size-4.75" />
      <span className="lg:hidden">{shortLabel}</span>
      <span className="hidden lg:inline">{label}</span>
    </Link>
  )
}
