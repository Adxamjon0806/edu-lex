import { useState } from 'react'

import { getStoredRole } from '~/entities/session'

import { Badge, Logo } from '~/shared/ui'

import { NAVIGATION_ITEMS } from '../config/navigation'
import { NavigationLink } from './NavigationLink'
import { PremiumPromo } from './PremiumPromo'

/*
 * Навигация приложения на тёмно-синем фоне. Пункты зависят от роли из онбординга (студент или преподаватель);
 * без роли маршрут _authenticated сюда не пускает, поэтому запасное значение — студент.
 * Вид зависит от ширины (значения из макета):
 * - до md — нижняя панель (отступы 10/6/22px), без логотипа; если пункты не помещаются, она прокручивается;
 * - md–lg — узкая колонка 88px: знак и плитки пунктов;
 * - от lg — боковая панель 248px: логотип с названием и пункты. У студента внизу карточка Premium,
 *   у преподавателя под логотипом метка «EXPERT».
 * Колонку задаёт AuthenticatedLayout; здесь — только содержимое.
 */
export function AuthenticatedSidebar() {
  // Роль читаем один раз при монтировании: она меняется только в онбординге, после которого лейаут монтируется заново.
  const [role] = useState(() => getStoredRole() ?? 'student')
  const isTeacher = role === 'teacher'

  return (
    <aside className="bg-navy md:flex md:h-full md:flex-col md:items-center md:gap-8 md:px-3 md:py-6 lg:items-stretch lg:gap-9 lg:px-4.5 lg:py-7">
      {/* В макете логотип не ссылка: на главную ведёт первый пункт навигации. */}
      <div className="hidden flex-col gap-2.5 md:flex lg:px-1.5">
        <Logo nameClassName="max-lg:sr-only" size={38} />
        {isTeacher && (
          <Badge className="max-lg:hidden" size="sm" tone="gold-outline">
            EXPERT
          </Badge>
        )}
      </div>
      <nav aria-label="Основная навигация" className="overflow-x-auto md:overflow-visible">
        <ul className="flex justify-around px-1.5 pt-2.5 pb-5.5 md:flex-col md:gap-2 md:p-0 lg:gap-1.5">
          {NAVIGATION_ITEMS[role].map((item, index) => (
            <li key={item.key}>
              {/* Первый пункт — сама главная. Пункты без своей страницы пока ведут туда же с hash (см. NavigationLink). */}
              <NavigationLink
                hash={item.to !== undefined || index === 0 ? undefined : item.key}
                item={item}
                smallRailLabels={isTeacher}
              />
            </li>
          ))}
        </ul>
      </nav>
      {!isTeacher && (
        <div className="mt-auto hidden lg:block">
          <PremiumPromo />
        </div>
      )}
    </aside>
  )
}
