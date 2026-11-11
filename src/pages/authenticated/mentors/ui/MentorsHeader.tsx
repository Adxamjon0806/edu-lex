import { Search, SlidersHorizontal } from 'lucide-react'

import { IconButton, TextField } from '~/shared/ui'

import { MENTORS_TEXTS } from '../config/mentors'

type MentorsHeaderProps = Readonly<{
  onQueryChange: (query: string) => void
  query: string
}>

/*
 * Заголовок и поиск. На десктопе поиск 360px справа от заголовка с подзаголовком, ниже — во всю ширину
 * под заголовком, с кнопкой фильтров внутри поля (на десктопе фильтры видны рядом с направлениями).
 * Подсказка в поле одна на всех ширинах: короткое «Поиск» из мобильного макета ничего не объясняет.
 */
export function MentorsHeader({ onQueryChange, query }: MentorsHeaderProps) {
  return (
    <header className="flex flex-col gap-3.5 md:gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="font-serif text-26 font-semibold text-heading md:text-30 lg:text-32">{MENTORS_TEXTS.title}</h1>
        <p className="text-14 font-medium text-muted max-lg:hidden">{MENTORS_TEXTS.subtitle}</p>
      </div>
      <TextField
        className="lg:w-90 lg:shrink-0"
        icon={Search}
        label="Поиск менторов"
        labelHidden
        onChange={(event) => {
          onQueryChange(event.target.value)
        }}
        placeholder={MENTORS_TEXTS.searchPlaceholder}
        size="sm"
        trailing={
          <IconButton
            aria-label="Фильтры"
            className="border-transparent bg-transparent text-body lg:hidden"
            icon={SlidersHorizontal}
            size={40}
          />
        }
        type="search"
        value={query}
      />
    </header>
  )
}
